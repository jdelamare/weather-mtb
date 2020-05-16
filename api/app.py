from chalice import Chalice
import requests
import os

# TODO: Type annotations before Brian kills you

app = Chalice(app_name="api")

@app.route("/geolocation", methods=["POST"], content_types=["application/json"])
def get_coordinates():
    # LATITUDE LONGITUDE not working as globals for some reason
    lat = app.current_request.json_body["lat"]
    lon = app.current_request.json_body["lon"]
    print(f"Lat {lat} lon {lon}")
    get_trail_systems(lat, lon)
    # POST this location data to MTBProject
    return {"geo": "works"}


@app.route("/trailsystems")
def index():
    return {"trail": "systems"}


def get_trail_systems(lat, lon):
    payload = { 
        "lat": lat,
        "lon": lon,
        "maxDistance": 50, # default is 30, won't get the faves
        "key": os.getenv('MTBPROJECT_API_KEY')
    }
    response = requests.get("https://www.mtbproject.com/data/get-trails", params=payload)