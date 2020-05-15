# Introduction
This app simplifies getting weather reports for my local trails.


## Design
### Frontend
Frontend written in React- currently using function components. Important tech to understand with these: hooks. Hooks are used to saturate the app with information provided from the API. 

Need to learn how to serve these out of Cloudfront or S3 buckets.

Currently working through React tutorials and building the API out simultaneously.

### Backend
Chalice application- not providing any static files from this (as opposed to the dynamoDB guestbook in my other repo). Here we've just got a series of routes that can be hit to further get information from MTBProject. Currently wondering why I don't just hit everything from the React app. Presumably having this backend will be good for combining other APIs (Google Maps and geolocation API), before providing curated data to the frontend.


## Resources
These resources greatly assisted in my understanding:

### Documents
#### Geolocation
* ![MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

#### MTB
* ![MTB](https://www.mtbproject.com/data)

#### Google Maps?

### Blogs
* ![react + flask](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project)
