from chalice import Chalice
import requests
import os
import json

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

@app.route("/get_trails", methods=["POST"], content_types=["application/json"])
def get_trails():
    lat = app.current_request.json_body["lat"]
    lon = app.current_request.json_body["lon"]

    # query DynamoDB for trails instead of hitting API
    payload = { 
        "lat": lat,
        "lon": lon,
        "maxDistance": 50, # default is 30, won't get the faves
        "key": os.getenv("MTBPROJECT_API_KEY")
    }
    # response = requests.get("https://www.mtbproject.com/data/get-trails", params=payload)
    # response_data = response.json()
  
    # Comment out the next four lines for prod
    # Temporary to avoid exceeding requests
    response_data = ''
    with open("mtb_trails.json") as f:
        response_data = json.loads(f.read())

    # potentially cache the rest based on lat/lon
    return [{ 
        "id": trail["id"], 
        "name": trail["name"],
        "summary": trail["summary"],
        "length": trail["length"],
        "longitude": trail["longitude"],
        "latitude": trail["latitude"],
        "difficulty": trail["difficulty"], 
        "conditionStatus": trail["conditionStatus"], 
        "conditionDetails": trail["conditionDetails"],
        "conditionDate": trail["conditionDate"] } 
        for trail in response_data["trails"]]


# this should probably be form data
@app.route("/get_favorites", methods=["POST"], content_types=["application/json"])
def get_favorites():
    userId = app.current_request.json_body["userId"]
    payload = {
        "key": os.getenv("MTBPROJECT_API_KEY"),
        "userId": userId
    }

    # response = requests.get("https://www.mtbproject.com/data/get-favorites", params=payload)
    # response_data = response.json()

    # Remove the next four lines for prod
    # Temporary to avoid exceeding requests
    response_data = ''
    with open('mtb_trails_fav.json') as f:
        response_data = json.loads(f.read())
    
    return [
        trail 
        for trail in response_data["toDos"]
    ]

@app.route("/get_trail_by_id", methods=["POST"], content_types=["application/json"])
def get_trails_by_id():

    # TODO probably should have a try catch return 40X error couldn't find json_body

    ids = app.current_request.json_body["ids"]
    ids = ",".join(str(trail_id) for trail_id in ids)
    payload = {
        "key": os.getenv("MTBPROJECT_API_KEY"),
        "ids": ids
    }

    # response = requests.get("https://www.mtbproject.com/data/get-trails-by-id", params=payload)
    # response = response.json()

    # Remove the next four lines for prod
    # Temporary to avoid exceeding requests
    response = ''
    with open("mtb_trails_id.json") as f:
        response = json.loads(f.read())

    # potentially cache the rest based on lat/lon
    return [{ 
        "id": trail["id"], 
        "name": trail["name"],
        "summary": trail["summary"],
        "length": trail["length"],
        "longitude": trail["longitude"],
        "latitude": trail["latitude"],
        "difficulty": trail["difficulty"], 
        "conditionStatus": trail["conditionStatus"], 
        "conditionDetails": trail["conditionDetails"],
        "conditionDate": trail["conditionDate"] } 
        for trail in response["trails"]]
    