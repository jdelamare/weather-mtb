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

_WEATHERMTB_DB = None
_MTBPROJECT_API_KEY = None
_WEATHER_API_KEY = None

def get_weathermtb_db():
    global _WEATHERMTB_DB
    global _MTBPROJECT_API_KEY    
    global _WEATHER_API_KEY

    # if a handle doesn't exist, instantiate a table resource object
    if _WEATHERMTB_DB is None:
        _WEATHERMTB_DB = model.model(
            boto3.resource('dynamodb').Table(

                # recordresources.py must have been run by here <---- IMPORTANT
                os.environ['WEATHERMTB_TABLE_NAME'])) 

    return _WEATHERMTB_DB

def populate_env_vars():
    os.environ['']


@app.route("/get_trails", methods=["POST"], content_types=["application/json"])
def get_trails():

    print("_______")
    print(app.current_request.json_body)
    print("_______")


    lat = app.current_request.json_body["lat"]
    lon = app.current_request.json_body["lon"]
    lat_lon = prep_lat_lon(lat, lon)

    # query DynamoDB for trails instead of hitting API
    # response = get_weathermtb_db().select(lat_lon) # if successful returns a dict

    # call out to the API since this location is not cached
    # if len(response) == 0: 
    #     print("Calling the MTBProject API")
    #     params = { 
    #         "lat": lat,
    #         "lon": lon,
    #         "maxDistance": 50, # default is 30, won't get the faves
    #         "key": os.getenv("MTBPROJECT_API_KEY")
    #     }

    #     #by default this returns 10 trails
    #     # response = requests.get("https://www.mtbproject.com/data/get-trails", params=params)
    #     # response = response.json()

    #     # cache the data for next time
    #     response_string = json.dumps(response)
    #     model.insert(lat_lon, response_string)

    # Comment out the next four lines for prod
    # Temporary to avoid exceeding requests
    response = ''
    with open("./data/mtb_trails.json") as f:
        response = json.loads(f.read())

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
    params = {
        "key": os.getenv("MTBPROJECT_API_KEY"),
        "userId": userId
    }

    # response = requests.get("https://www.mtbproject.com/data/get-favorites", params=params)
    # response_data = response.json()

    # Remove the next four lines for prod
    # Temporary to avoid exceeding requests
    response_data = ''
    with open('./data/mtb_trails_fav.json') as f:
        response_data = json.loads(f.read())
    
    return [
        trail 
        for trail in response_data["toDos"]
    ]

@app.route("/get_trail_by_id", methods=["POST"], content_types=["application/json"])
def get_trails_by_id():

    # TODO probably should have a try catch return 40X error couldn't find json_body
    # TODO document that this function is coupled with get_favorites since it only returns trailIds

    ids = app.current_request.json_body["ids"]
    ids = ",".join(str(trail_id) for trail_id in ids)
    params = {
        "key": os.getenv("MTBPROJECT_API_KEY"),
        "ids": ids
    }

    # query DynamoDB for trails instead of hitting API
    # key is trailId data is for one trail

    # response = requests.get("https://www.mtbproject.com/data/get-trails-by-id", params=params)
    # response = response.json()

    # Remove the next four lines for prod
    # Temporary to avoid exceeding requests
    response = ''
    with open("./data/mtb_trails_id.json") as f:
        response = json.loads(f.read())

    # potentially cache the rest based on lat/lon
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

@app.route("/weather", methods=["POST"], content_types=["application/json"])
def weather():
    # make POST out to `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&exclude=${PART}&appid=${WEATHER_API_KEY}`

    lat = app.current_request.json_body["lat"]
    lon = app.current_request.json_body["lon"]
    part = app.current_request.json_body["part"]
    key = os.getenv("WEATHER_API_KEY")
    url = f"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={key}" 

    # DynamoDB table for weather at a lat_lon

    # response = requests.get("https://api.openweathermap.org/data/2.5/onecall", params=params)
    # response_data = response.json()

    # Remove the next four lines for prod
    # Temporary to avoid exceeding requests
    response_data = ''
    with open('./data/weather_daily.json') as f:
        response_data = json.loads(f.read())

    # Extract the weather and get the data out
    # TODO: specify that I want Farenheit at the end of the API call
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
    return f"{lat:.2f},{lon:2f}"