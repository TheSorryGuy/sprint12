This is a **training project**
```
version: 0.3.1
author: Fedor Ganin 
https://github.com/TheSorryGuy/sprint12
```
- use 'npm run start' to start server
- use 'npm run dev' to start server with hot reload

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
