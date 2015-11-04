# ducky-server

Core backend server for Ducky in Node.js. See all routes in ```./app.js```.

```
npm install
supervisor server.js # Should be running on port 3000
```

## To create a request:

```POST``` to ```/api/requests``` with ```x-www-form-urlencoded``` body with ```requestContent, asker, and location``` as keys and string values.

## To see all requests:

```GET``` to ```/api/requests```. Should return a JSON of all requests available now on duckyapp-dev database in MongoLab.

## To delete a request:

```DELETE``` to ```/api/requests:_id*```. 

## To add a user:

```POST``` to ```/api/users``` with schema below. No need for anything in ```p``` (properties).

Mongoose User Schema:
```
var User = new Schema({
	fn: String, // first name
	fid: Number, // facebook ID
	pp: String // profile picture URL
	p: {
		r: [Request.schema], // IDs of requests
		c: [Conversation.schema] // IDs of conversations
	}
})
```

## To see all users:
```GET``` to ```/api/users```.

## To delete a user:
```DELETE``` to ```/api/users:_id*```. 

## To create a new conversation:
```POST``` to ```/api/conversations``` with following schema below. No need for anything in ```m``` (messages).

```
var Conversation = new Schema({
	i: String, // User ID who initiated
	r: String, // User ID who received
	rid: String, // id of associated request
	m: [Message.schema], // associated messages
	time: { type: Date, default: Date.now }
})
```

## To see all conversations:
```GET``` to ```/api/conversations```.

## To add a message to a conversation:
```POST``` to ```/api/conversations:_id*``` with following message schema:

```
var Message = new Schema({
	f: String, // User ID from
	t: String, // User ID to
	c: String, // message content
	time: { type: Date, default: Date.now }
})
```

## To delete a message from a conversation:
```DELETE``` to ```/api/conversations:_id*```. 

### TODO:
- [ ] Put Objectids of Users instead of strings for Users in Conversation/Messsage/Request schemas instead of strings
- [ ] FB auth


\* The ```_id``` is the Objectid in MongoDB.
