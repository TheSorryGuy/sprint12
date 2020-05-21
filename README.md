MESTO project backend part

This is a **training project**
```
version: 0.5.0
author: Fedor Ganin 
github: https://github.com/TheSorryGuy/sprint12
server domain: https://sorryguymesto.gq
server IP: 84.201.138.78
```
Repository name may confuse you, because when i created it, i did not know that this project will have many
iterations for more then one sprint.
This is an API, made with express server and mongo data base.
Most requests require authorization, so you have to create your secret key and user at first.

By default, secret key is string ```secret-key```, it is better to generate random key (use crypto module):
```sh
// console
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

Create ```.env``` file in root folder, it must look like this:
```sh
NODE_ENV=production
JWT_SECRET= // your secret key here
```
After that you can start server
- use ```npm run start``` to start server
By default server starts in ```localhost:3000```, but you can change it in ```config.js```
DB URL by default is ```mongodb://localhost:27017/mestodb``` and you can change it in ```config.js``` too
- use ```npm run dev``` to start server with hot reload

Before start using all the requets, you have to create user and log in:

```sh
'POST /signup' req.body: name, about, avatar (must be valid url), email (must be valid email), password
'POST /signin' req.body: email, password (must occure with created user params)
```
```/signin``` request creates cookie, that contains token, so when you making requests, you need to send it to server by setting ```credentials``` param:
```sh
fetch('/posts', {
    method: 'GET',
    credentials: 'include',
});
```
After that you allow to send all over requests. Remember, that you can delete only cards, created by user, who is now authorized,
same with avatar and profile info refreshing.

Requests you can send:
```sh
'GET /users' returns json with all users
'GET /users/id' returns user by id (or error json, if id does not exist)
'PATCH /users/me' refreshes user name and description, required params in req.body: name, about
'PATCH /users/me/avatar' refreshes user avatar link, required param in req.body - avatar (must be valid url)
'GET /cards' returns json with all cards
'POST /cards' creates new card, required params in req.body: name, link (must be valid url)
'DELETE /cards/id' deletes card by id
'PUT /cards/id/likes' put like to card by card id
'DELETE /cards/id/likes' remove like from card by id
'GET /someUrlThatDoesNotExist' returns error json
```
