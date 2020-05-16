from chalice import Chalice
import urllib

app = Chalice(app_name="api")

LATITUDE = 0
LONGITUDE = 0

@app.route("/geolocation", methods=["POST"], content_types=["application/json"])
def get_coordinates():
    LATITUDE = app.current_request.json_body["lat"]
    LONGITUDE = app.current_request.json_body["long"]
    print(f"LATITUDE {LATITUDE}, LONGITUDE {LONGITUDE}")
    return {"geo": "works"}


@app.route("/trailsystems")
def index():
    return {"trail": "systems"}