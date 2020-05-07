MESTO project backend part

This is a **training project**
```
version: 0.3.2
author: Fedor Ganin 
https://github.com/TheSorryGuy/sprint12
```
This is an API, made with express server and mongo data base.
- use ```npm run start``` to start server
By default server starts in ```localhost:3000```, but you can change it in ```config.js```
DB URL by default is ```mongodb://localhost:27017/mestodb``` and you can change it in ```config.js``` too
- use ```npm run dev``` to start server with hot reload

Some requests require user autorization, but it is not made yet, so instead of autorization, i addad middleware,
so before make other requests, it is necessary to create new user ```POST /users``` and copy _id of created user to middleware

```sh
// app.js
app.use((req, res, next) => {
  req.user = {
    _id: '5ea21dc998352e295cc4ca6c',
  };
  next();
});
```
Requests u can send
```sh
'GET /users' returns json with all users
'GET /users/id' returns user by id (or error json, if id does not exist)
'POST /users' creates new user, required params in req.body: name, about, avatar (must be valid url)
'PATCH /users/me' refreshes user name and description, required params in req.body: name, about
'PATCH /users/me/avatar' refreshes user avatar link, required param in req.body - avatar (must be valid url)
'GET /cards' returns json with all cards
'POST /cards' creates new card, required params in req.body: name, link (must be valid url)
'DELETE /cards/id' deletes card by id
'PUT /cards/id/likes' put like to card by card id
'DELETE /cards/:cardId/likes' remove like from card by id
'GET /someUrlThatDoesNotExist' returns error json
```
