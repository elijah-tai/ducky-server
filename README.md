# ducky-server

Core backend server for Ducky in Node.js.

```
npm install
node server.js # Should be running on port 3000
```

## To create a request:

```POST``` to ```/api/requests``` with ```x-www-form-urlencoded``` body with ```requestContent, asker, and location``` as keys and string values.

## To see all requests:

```GET``` to ```/api/requests```. Should return a JSON of all requests available now on duckyapp-dev database in MongoLab.
