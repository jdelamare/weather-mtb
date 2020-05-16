# Introduction
This app simplifies getting weather reports for my local trails.


## Design
### Frontend
Frontend written in React- currently using function components. Important tech to understand with these: hooks. Hooks are used to saturate the app with information provided from the API. 

Need to learn how to serve these out of Cloudfront or S3 buckets.

Currently working through React tutorials and building the API out simultaneously.

#### React notes
Each trail system card is populated by data in a prop (presumably). 
    App should get the data and pass it to the `TrailSystem` function component?
    Remember to forward the proxy field in `package.json` because you'll get a CORS error otherwise.

#### Geolocation
Need to handle the error if the user refuses to provide tracking information.


### Backend
Chalice application- not providing any static files from this (as opposed to the 
dynamoDB guestbook in my other repo). Here we've just got a series of routes that can
be hit to further get information from MTBProject. Currently wondering why I don't 
just hit everything from the React app. 

## Resources
These resources greatly assisted in my understanding:

### Documents
#### Geolocation
* ![MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

#### MTB
* ![MTB](https://www.mtbproject.com/data)

#### Grid design
* ![material-ui](https://material-ui.com/components/grid/)

#### Google Maps?

### Blogs
* ![react + flask](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project)
* ![react + geo](https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs)
