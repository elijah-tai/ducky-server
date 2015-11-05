# ducky-server

Core backend server for Ducky in Node.js. See all routes in ```./app.js```.

```
npm install
supervisor server.js # Should be running on port 3000
```

## To create a request:

```POST``` to ```/api/requests```.

Mongoose Request Schema:
```
var Request = new Schema({
	// need to add date
	rid: Number, // Request ID
	a: Number, // asker user id
	rc: String, // request content
	l: String, // request location - might be lat/long
	c: [Number], // ids of associated conversations
	time: { type: Date, default: Date.now }
})
```

## To see all requests:

```GET``` to ```/api/requests```. Should return a JSON of all requests available now on duckyapp-dev database in MongoLab.

## To delete a request:

```DELETE``` to ```/api/requests:rid*```. 

## To add a user:

```POST``` to ```/api/users``` with schema below. No need for anything in ```p``` (properties).

Mongoose User Schema:
```
var User = new Schema({
	fn: String, // first name
	fid: Number, // facebook ID
	pp: String, // profile picture URL
	p: {
		r: [Number], // IDs of requests
		c: [Number] // IDs of conversations
	}
})
```

## To see all users:
```GET``` to ```/api/users```.

## To see all conversations given a user fid:
```GET``` to ```/api/conversations:fid```

## To delete a user:
```DELETE``` to ```/api/users:fid*```. 

## To create a new conversation:
```POST``` to ```/api/conversations``` with following schema below. No need for anything in ```m``` (messages).

```
var Conversation = new Schema({
	cid: Number, // conversation ID
	i: Number, // User ID who initiated
	r: Number, // User ID who received
	rid: String, // id of associated request
	m: [Message.schema], // associated messages
	time: { type: Date, default: Date.now }
})
```

## To see all conversations:
```GET``` to ```/api/conversations```.

## To add a message to a conversation:
```POST``` to ```/api/conversations:cid*``` with following message schema:

```
var Message = new Schema({
	f: Number, // User ID from
	t: Number, // User ID to
	c: String, // message content
	time: { type: Date, default: Date.now }
})
```

## To delete a message from a conversation:
```DELETE``` to ```/api/conversations:cid*```. 

### TODO:
- [ ] Put Objectids of Users instead of strings for Users in Conversation/Messsage/Request schemas instead of strings
- [ ] FB auth
- [ ] error handling for when no db object exist (see fb convo)


\* The ```_id``` is the Objectid in MongoDB.
