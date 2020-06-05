# Introduction
This app simplifies getting weather reports for my local trails. Suprisingly, Portland's bike culture has a history of excluding mountain biking from it's list of "acceptable activities"; I can attest to this first hand. Thankfully, there's a relationship between mountain bikers and logging companies- we're allowed to use the land to ride and in exchange we provide oversight and take responsibility. That is, when they're not logging trees. Because most trails are a fair drive away, the weather can vary. Especially in Oregon where so many different biomes exist. This app aims to give a quick update of the conditions of local trails. By providing your geolocation data through the browser, you can get the condition of 10 different trails within a 50 mile vicinity. 

# Access
I'm still working on getting my domain name set up with AWS. Currently the app is hosted globally with CloudFront. You **must** allow location access for the data to saturate the webapp. Haven't considered a workaround to this.
![https://ditdl6tr6zpd6.cloudfront.net/](https://ditdl6tr6zpd6.cloudfront.net/)

## Design
### Frontend
The frontend technology involved in this app is React, a JavaScript framework which can be used to make single page applications. There's plenty of work left to be done, but the current technologies are listed below.
 
 * `react-bootstrap`
 * `chart.js` && `react-chartjs-2`
 * `react-rating`
  
`react-bootstrap` gives me the ability to make a grid where the info goes. The info is provided by API calls, and organized using `react-chartjs-2` or `react-rating`. Unfortunately `react-rating` did some poor programming which results in an error in the console. 

In TrailList.js you'll see the tech that renders the cards, everything else is in the Details.js file which creates the informative part of the app. I made the mistake of not making it particularly responsive so it flops on mobile. Also, `chart.js` doesn't abide by my container rules and Google Maps doesn't want to shrink particularly well. So some things get hidden when the screen gets smaller. Much more work needs to be done here.

### Backend
Technically for the Front-end Web Tech class I could have just had a hosted webapp on some service. But I chose to write a backend where my API calls happen. This gave me the added advantage of using the Chalice framework. It's a serverless framework that spins up Lambdas and the appropriate IAM policy to work with them. It doesn't support DynamoDB, so there is a need to write a CloudFormation template (`./api/resources.json`) which creates tables upon deployment. The backend is quite similar to the Guestbook app from Wu-chang's cloud course. In `./api/app.py` there functions for each API endpoint that the frontend app will call. These will reach out to the their respective DynamoDB table from `./api/chalicelib/model.py` to check if a response has already been recorded. Currently, I'm caching on a user's favorite trails, and on their latitude and longitude. Since the app generates trails within a 50 mile radius of the device's location, this may be different for the same user in a new place. As I'm writing this, I realize that it's quite good it's not optimized for mobile. Otherwise I would have many many trails logged for one individual (precision is to .2 degrees). If this is the first time they've used the app with that specific database key, and the result is `None`, a request is made to the API proper. This prevents the rate limiting that I was expecting from MTBProject and OpenWeatherAPI. 

### APIs
Four APIs are used in this project:
 * OpenWeatherAPI
 * MTBProject API
 * Geolocation API (accessible from `navigator` object)
 * Google Maps API

API keys will need to be stored in the correct environment variables if you plan to run this app.
 * `MTBPROJECT_API_KEY`
 * `WEATHER_API_KEY`
 * `GOOGLE_MAP_API_KEY`

### Workflow
#### Environment Variables
These will need to be copied into the `config.json` file. Don't worry, `./api/recordresources.py` handles this. Also note that the table names will be written as environment variables to that file as well.

#### Deployment steps
These six steps should get you off the ground (assuming you've got the correct API keys).

 1. `virtualenv -p python3 venv`
 2. `source venv/bin/activate`
 3. `pip install -r requirements.txt`
 4. `aws cloudformation deploy --template-file resources.json --stack-name weathermtb`
 5. `python3 recordresources.py --stack-name weathermtb`
 6. `chalice deploy`

### Local Development
For this to work you'll need to have an AWS account with valid credentials in `~/.aws.credentials`. It can also be simulated with text files (if need be, feel free to email me). But those credentials are necessary to setup the CloudFormation stack. You'll need to add the following line to the very bottom of `./frontend/package.json`:
```
  },
  "proxy": "http://localhost:8000"
}
```

Spawn two shells.
 1. `cd ./frontend`
 2. `npm start`

 1. `virtualenv -p python3 venv`
 2. `source venv/bin/activate`
 3. `pip install -r requirements.txt`
 4. `aws cloudformation deploy --template-file resources.json --stack-name weathermtb`
 5. `chalice local`

Note the difference between this and **Deploy** is that we won't need to setup the IAM and Lambdas which would require `config.json` and `policy-dev.json`.

### Issues
I just realized that I didn't trim the decimal values off of the temperature. It's also pretty poorly responsive. In hindsight I should have focused more on the frontend stacking cards and putting data in them if the app shrinks. Apologies there, but I've got some terrific feedback on version 0.0.1 from friends and family. `chart.js` does not want to cooperate with staying in the `react-boostrap Col`. Not sure what to make of that. Shrinking the Map will necessary in the future.

### Google Maps
I'm explicitly calling out `./frontend/src/GoogleMap.js` because much of that code was adapted from a blog by Kimberly Oleiro which is linked below as `react + map`. I'll also add my code comment here, which is my justification for placing the API key in the code before deployment. Note that to deploy this code as I did, you'll need to host as a static website out of an S3 bucket.

Maps API key:
```
    My take on this particular API key is as follows:
    Yes, it's bad practice to put an API key in the code. It's not in the repository
    where the code is hosted. But the only alternative (when hosting out of S3), would
    be to make a call to the backend to get the API key before use. But that's too much
    overhead. As it stands, unless I ship back the map data (clueless how to), an end 
    user would be able to sniff this key in transit anyways- it's in your plaintext 
    request. So the justification is that it stays here and I rate limit in GCP.
```

## Resources
These resources greatly assisted in my understanding:
#### Geolocation
* ![MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

#### MTB
* ![MTB](https://www.mtbproject.com/data)

#### Grid design
* ![material-ui](https://material-ui.com/components/grid/)

### Blogs
* ![react + flask](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project)
* ![react + geo](https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs)
* ![react + map](https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1)