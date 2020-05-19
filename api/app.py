from chalice import Chalice
import requests
import os
import json

# TODO: Type annotations before Brian kills you
# TODO: Errors for bad requests

app = Chalice(app_name="api")

LATITUDE = 0
LONGITUDE = 0

@app.route("/set_coords", methods=["POST"], content_types=["application/json"])
def set_coords():
    global LATITUDE 
    global LONGITUDE
    LATITUDE = app.current_request.json_body["lat"]
    LONGITUDE = app.current_request.json_body["lon"]

@app.route("get_trails_card")
def get_trails_card():
    # query DynamoDB for trails instead of hitting API
    payload = { 
        "lat": LATITUDE,
        "lon": LONGITUDE,
        "maxDistance": 50, # default is 30, won't get the faves
        "key": os.getenv("MTBPROJECT_API_KEY")
    }
    #response = requests.get("https://www.mtbproject.com/data/get-trails", params=payload)

    # Temporary to avoid exceeding requests
    response = ''
    with open("mtb_trails.json") as f:
        response = json.loads(f.read())

    # potentially cache the rest based on lat/lon
    return [{ 
        "id": trail["id"], 
        "name": trail["name"], 
        "difficulty": trail["difficulty"], 
        "conditionStatus": trail["conditionStatus"], 
        "conditionDetails": trail["conditionDetails"] } 
        for trail in response["trails"]]


# I don't think this will be very useful beyond testing
# POST some id ?
@app.route("get_trail_by_id", methods=["POST"], content_types=["application/json"])
def get_trails():

    # TODO probably should have a try catch return 40X error couldn't find json_body

    #"3482113, 4458855, 7028712, 7014484" # sandy, stub, gateway, post 
    ids = app.current_request.json_body["ids"]

    payload = {
        "key": os.getenv("MTBPROJECT_API_KEY"),
        "ids": ids
    }

    # response = requests.get("https://www.mtbproject.com/data/get-trails-by-id", params=payload)

    # Temporary to avoid exceeding requests
    response = ''
    with open("mtb_trails.json") as f:
        response = json.loads(f.read())

    # potentially cache the rest based on lat/lon
    return [{ 
        "id": trail["id"], 
        "name": trail["name"], 
        "difficulty": trail["difficulty"], 
        "conditionStatus": trail["conditionStatus"], 
        "conditionDetails": trail["conditionDetails"] } 
        for trail in response["trails"]]
    
# this should probably be form data
@app.route("get_favorites", methods=["POST"], content_types=["application/json"])
def get_favorites():
    payload = {
        "key": os.getenv("MTBPROJECT_API_KEY"),
        "userId": app.current_request.json_body["userId"]
    }