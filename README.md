# Holiday-Planner Documentation

Hodiday Planner is an application to manage your holiday. This app has : 
* Rapidapi skyscanner
* National Holiday API | Calendaific
* Data Covid-19 in Indonesia updated API
* Airport codes API
* Google Sign-in
* JSON formatted response

# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

## ENDPOINT
### POST /login

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```
{
  "access_token": "<your access token>"
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```

---
### POST /register

> Create new user

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Password is required!, Password must be more than 6 character"
}
```

_Response (400)_
```
{
  "message": "Email is required!, Email must be a format sample@mail.com"
}
```

---
### POST /googleLogin

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
    "token_id": "<token id from google>"
}
```

_Response (200)_
```
{
    "id": "<user id>",
    "email": "<user email>"
    "access_token": "<generated accesss token>"
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```

---
### GET /holidays

> Get all the holidays

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "name": <"Idul Fitri Holiday">,
    "description": <"Idul Fitri Holiday is a public holiday in Indonesia">,
    "date": <"2020-05-25>"
},
{
    "name": <"...">,
    "description": <"...">,
    "date": <"...">
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Invalid Email / Password"
}
```

---
### GET /flights

> Get all flights

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "origin": <"CGK">,
  "destination": <"MDC">,
  "date": <"2020-11-01">
}
```

_Response (200)_
```
"Quotes",
    {
        "Price": <513559>,
        "Direct": <true>,
        "Date": <"2020-11-01T00:00:00">,
        "MaskapaiId": <1284>
    },
    {
        "Price": <...>,
        "Direct": <...>,
        "Date": <"...">,
        "MaskapaiId": <...>
    },
    "Carrier",
    {
        "MaskapaiId": <1284>,
        "MaskapaiName": <"Lion Air">
    },
    "Carrier",
    {
        "MaskapaiId": <...>,
        "MaskapaiName": <"....">
    },
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Invalid Email / Password"
}
```

---
### GET /corona

> Get all data covid-19 in Indonesia

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "Provinsi": "Aceh",
        "Positif": 7373,
        "Sembuh": 5037,
        "Meninggal": 266
    },
    {
        "Provinsi": "Sumatera Utara",
        "Positif": 12925,
        "Sembuh": 10546,
        "Meninggal": 529
    },
]
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Invalid Email / Password"
}
```

---
### GET /airports/:term

> Get all data airports with specific city

_Request Params_
```
{ 
    "term" : <"bali">
}
```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
    "Name": "Ngurah Rai International Airport",
    "City": "Denpasar",
    "Iata": "DPS",
    "Country": "Indonesia"
},
{
    "Name": "Sultan Aji Muhammad Sulaiman Airport",
    "City": "Balikpapan",
    "Iata": "BPN",
    "Country": "Indonesia"
},
{
    "Name": <"...">,
    "City": <"...">,
    "Iata": <"...">,
    "Country": <"...">
},
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Invalid Email / Password"
}
```

---