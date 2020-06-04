from chalice import Chalice
from chalicelib import model
import requests
import os
import json
import boto3

# TODO: Type annotations before Brian kills you
# TODO: Errors for bad requests

app = Chalice(app_name="api")

from chalice import CORSConfig
cors_config = CORSConfig(
    allow_origin='*',
    allow_headers=['X-Special-Header'],
    max_age=600,
    expose_headers=['X-Special-Header'],
    allow_credentials=True
)

_MTBPROJECT_API_KEY = None
_WEATHER_API_KEY = None
_WEATHERMTB_DB = None
_TRAIL_IDS_TABLE_NAME = None
_BULK_TABLE_NAME = None
_USERID_TABLE_NAME = None
_WEATHER_TABLE_NAME = None

# recordresources.py must have been run by here <---- IMPORTANT
def get_weathermtb_db():
    global _WEATHERMTB_DB
    global _TRAIL_IDS_TABLE_NAME
    global _BULK_TABLE_NAME
    global _USERID_TABLE_NAME
    global _WEATHER_TABLE_NAME

    # Assume that if one table doesn't exist, they all don't exist...
    if _WEATHERMTB_DB is None:

        _TRAIL_IDS_TABLE_NAME = boto3.resource('dynamodb').Table(os.environ['TRAIL_IDS_TABLE_NAME'])
        _BULK_TABLE_NAME = boto3.resource('dynamodb').Table(os.environ['BULK_TABLE_NAME'])
        _USERID_TABLE_NAME = boto3.resource('dynamodb').Table(os.environ['USERID_TABLE_NAME'])
        _WEATHER_TABLE_NAME = boto3.resource('dynamodb').Table(os.environ['WEATHER_TABLE_NAME'])

        tables = {
            "trail_ids_table_resource": _TRAIL_IDS_TABLE_NAME,
            "bulk_table_resource": _BULK_TABLE_NAME,
            "userid_table_resource": _USERID_TABLE_NAME,
            "weather_table_resource": _WEATHER_TABLE_NAME
        }

        _WEATHERMTB_DB = model.model(tables)

    return _WEATHERMTB_DB

def populate_env_vars():
    os.environ['']


@app.route("/get_trails", methods=["POST"], content_types=["application/json"])
def get_trails():
    lat = app.current_request.json_body["lat"]
    lon = app.current_request.json_body["lon"]
    lat_lon = prep_lat_lon(lat, lon)
    model = get_weathermtb_db()

    # query DynamoDB for trails instead of hitting API
    response = model.select(_BULK_TABLE_NAME, lat_lon) # if successful returns a dict

    # call out to the API since this location is not cached
    if not response:
        print("Calling the MTBProject API for bulk trails...")
        params = { 
            "lat": lat,
            "lon": lon,
            "maxDistance": 50, # default is 30, won't get the faves
            "key": os.getenv("MTBPROJECT_API_KEY")
        }

        #by default this returns 10 trails
        response = requests.get("https://www.mtbproject.com/data/get-trails", params=params)
        response = response.json()

        print("Finished getting the response from MTBProject API")

        # cache the data for next time
        response = json.dumps(response) # convert response from JSON to string
        model.insert(_BULK_TABLE_NAME, lat_lon, response)
    else:
        response = json.loads(response)

    return [{ 
        "id": trail["id"], 
        "name": trail["name"],
        "summary": trail["summary"],
        "length": trail["length"],
        "ascent": trail["ascent"],
        "descent": trail["descent"],
        "longitude": trail["longitude"],
        "latitude": trail["latitude"],
        "difficulty": trail["difficulty"],
        "stars": trail["stars"],
        "starVotes": trail["starVotes"],
        "conditionStatus": trail["conditionStatus"], 
        "conditionDetails": trail["conditionDetails"],
        "conditionDate": trail["conditionDate"] } 
        for trail in response["trails"]]


# this should probably be form data
@app.route("/get_favorites", methods=["POST"], content_types=["application/json"])
def get_favorites():
    userId = app.current_request.json_body["userId"]
    model = get_weathermtb_db()

    # query DynamoDB for favorites instead of hitting API
    response = model.select(_USERID_TABLE_NAME, userId) # if successful returns a dict
    
    if not response:
        print("Calling the MTBProject API for favorites...")
        params = {
            "key": os.getenv("MTBPROJECT_API_KEY"),
            "userId": userId
        }
        response = requests.get("https://www.mtbproject.com/data/get-favorites", params=params)
        response = response.json()

        print("Finished getting the response from MTBProject API")

        # cache the data for next time
        response = json.dumps(response) # convert response from JSON to string
        model.insert(_USERID_TABLE_NAME, userId, response)
    else:
        response = json.loads(response)

    return [
        trail 
        for trail in response["toDos"]
    ]

# TODO probably should have a try catch return 40X error couldn't find json_body
# TODO document that this function is coupled with get_favorites since it only returns trailIds
@app.route("/get_trail_by_id", methods=["POST"], content_types=["application/json"])
def get_trails_by_id():
    ids = app.current_request.json_body["ids"]
    ids = ",".join(str(trail_id) for trail_id in ids)
    model = get_weathermtb_db()

    # query DynamoDB for trails instead of hitting API
    # key is trailId data is for one trail
    response = model.select(_TRAIL_IDS_TABLE_NAME, ids)

    if not response:
        print("Calling the MTBProject API for trails by id...")
        params = {
            "key": os.getenv("MTBPROJECT_API_KEY"),
            "ids": ids
        }

        response = requests.get("https://www.mtbproject.com/data/get-trails-by-id", params=params)
        response = response.json()

        print("Finished getting the response from MTBProject API")

        # cache the data for next time
        response = json.dumps(response) # convert response from JSON to string
        model.insert(_TRAIL_IDS_TABLE_NAME, ids, response)
    else:
        response = json.loads(response)

    return [{ 
        "id": trail["id"], 
        "name": trail["name"],
        "summary": trail["summary"],
        "length": trail["length"],
        "ascent": trail["ascent"],
        "descent": trail["descent"],
        "longitude": trail["longitude"],
        "latitude": trail["latitude"],
        "difficulty": trail["difficulty"],
        "stars": trail["stars"],
        "starVotes": trail["starVotes"],
        "conditionStatus": trail["conditionStatus"], 
        "conditionDetails": trail["conditionDetails"],
        "conditionDate": trail["conditionDate"] } 
        for trail in response["trails"]]

# make POST out to `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&exclude=${PART}&appid=${WEATHER_API_KEY}`
@app.route("/weather", methods=["POST"], content_types=["application/json"])
def weather():
    lat = app.current_request.json_body["lat"]
    lon = app.current_request.json_body["lon"]
    part = app.current_request.json_body["part"]
    lat_lon = prep_lat_lon(lat, lon)
    model = get_weathermtb_db()

    response = model.select(_WEATHER_TABLE_NAME, lat_lon)

    if not response:
        print("Calling the OpenWeather API for weather data...")
        key = os.getenv("WEATHER_API_KEY")
        url = f"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={key}" 

        response = requests.get("https://api.openweathermap.org/data/2.5/onecall", params=params)
        response_data = response.json()

        print("Finished getting data from OpenWeather API")

        # cache the data for next time
        response = json.dumps(response) # convert response from JSON to string
        model.insert(_WEATHER_TABLE_NAME, lat_lon, response)
    else:
        response = json.loads(response)

    # Extract the weather and get the data out
    # TODO: Move this calculation to the frontend
    max_temp_kelvin = response_data["daily"][0]["temp"]["max"]
    max_temp_faren = round((max_temp_kelvin - 273.15) * 9/5 + 32, 2)
    morn_temp_kelvin = response_data["daily"][0]["temp"]["morn"]
    morn_temp_faren = round((max_temp_kelvin - 273.15) * 9/5 + 32, 2)

    weather = response_data["daily"][0]["weather"][0]["main"]
    weather_icon = response_data["daily"][0]["weather"][0]["icon"]

    return {
        "max_temp_faren": max_temp_faren,
        "morn_temp_faren": morn_temp_faren,
        "weather": weather,
        "weather_icon": weather_icon
    }

def prep_lat_lon(lat, lon):
    return f"{lat:.2f},{lon:.2f}"