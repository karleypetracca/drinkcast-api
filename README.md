# drinkcast API

## Summary
This API project supports the drinkcast client app as its back end.

Demo for this API is located at [api.drinkcast.live](https://api.drinkcast.live)

Client repo can be viewed on
[GitHub](https://github.com/karleypetracca/drinkcast-api) or as a demo site at
[drinkcast.live](https://www.drinkcast.live)


## Features

The drinkcast API was built using Node.js, Express and a PostgreSQL database. The drinkcast
Client App gets and posts 'bar' data to the API as well as gets game
questions/responses. The API features 'bar' authentication, input sanitization and automatic
CRON-like database cleaning to remove 'bar' rooms that have not been used in the last
24 hours.


## Installation

### Clone

- Clone this repo to your local machine

### Setup

- Install npm packages

```
$ npm i
```

- Create postgreSQL database based on schema file in models folder (incl. create
  tables and insert tables)
- Connect database info accordingly via .env file

_Sample/template .env below:_

```
DB_HOST=YOUR DB_HOST_HERE
DB_NAME=YOUR_DB_NAME_HERE
PASSWORD=YOUR_DB_PASSWORD_HERE
OT_API=YOUR OPENTOK_API_KEY_HERE
OT_API_SECRET=YOUR OPENTOK_API_SECRET_HERE
PORT=8000
```

- run program (code below requires nodemon)

```
$ npm run dev
```


## Authors

- Lockett Pundt - [GitHub](https://github.com/LockettPundt)
- Joshua Bevers - [GitHub](https://github.com/JoshuaBevers)
- Zach Barbre - [GitHub](https://github.com/ZachBarbre)
- Karley Petracca - [GitHub](https://github.com/karleypetracca)