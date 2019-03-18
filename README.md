# BYOBackend - Thailand Cities API
Dreaming of a trip to Thailand and wondering what to visit while you're there? This API allows users to find and contribute to information about attractions in different cities throughout Thailand. Built with Knex and Express and stored in a PostgreSQL database.  

### Heroku Deployment: 
Cities: https://byobackend.herokuapp.com/api/v1/cities  
Attractions: https://byobackend.herokuapp.com/api/v1/attractions  
## API Calls
## GET
> There are four endpoints to get data, two for cities data and two for attractions data

### ```GET /api/v1/cities```   
**Example Response**
```
[
    {
        "id": 1,
        "city_name": "Bangkok",
        "avg_may_high": 94,
        "avg_may_low": 79,
        "created_at": "2019-03-13T00:44:57.915Z",
        "updated_at": "2019-03-13T00:44:57.915Z"
    },
    {
        "id": 2,
        "city_name": "Chiang Mai",
        "avg_may_high": 94,
        "avg_may_low": 74,
        "created_at": "2019-03-13T00:44:57.922Z",
        "updated_at": "2019-03-13T00:44:57.922Z"
    },
    {
        "id": 3,
        "city_name": "Ko Samui",
        "avg_may_high": 83,
        "avg_may_low": 73,
        "created_at": "2019-03-13T00:44:57.923Z",
        "updated_at": "2019-03-13T00:44:57.923Z"
    }
]
```  
### ```GET /api/v1/attractions```   
**Example Response**
```
[
  {
      "id": 1,
      "name": "Chatuchak Weekend Market",
      "link": "https://www.lonelyplanet.com/thailand/bangkok/attractions/chatuchak-weekend-market/a/poi-sig/407334/357640",
      "city_id": 1,
      "created_at": "2019-03-13T00:44:57.928Z",
      "updated_at": "2019-03-13T00:44:57.928Z"
  },
  {
      "id": 2,
      "name": "Wat Pho",
      "link": "https://www.lonelyplanet.com/thailand/bangkok/attractions/wat-pho/a/poi-sig/1148214/357640",
      "city_id": 1,
      "created_at": "2019-03-13T00:44:57.931Z",
      "updated_at": "2019-03-13T00:44:57.931Z"
  },
  {
      "id": 31,
      "name": "Tan Rua Waterfall",
      "link": "https://www.lonelyplanet.com/thailand/attractions/tan-rua-waterfall/a/poi-sig/1582577/357722",
      "city_id": 3,
      "created_at": "2019-03-13T00:44:57.949Z",
      "updated_at": "2019-03-13T00:44:57.949Z"
  }
]
```    
### ```GET /api/v1/cities/:id```  
Returns information on the specified city   
Request: ```/api/v1/cities/2```  
**Example Response** 
```
[
    {
        "id": 2,
        "city_name": "Chiang Mai",
        "avg_may_high": 94,
        "avg_may_low": 74,
        "created_at": "2019-03-13T00:44:57.922Z",
        "updated_at": "2019-03-13T00:44:57.922Z"
    }
]
```  
### ```GET /api/v1/attractions/:id```  
Returns information on the specified attraction   
Request: ```/api/v1/attractions/14```  
**Example Response**  
```
[
    {
        "id": 14,
        "name": "Wat Chedi Luang",
        "link": "https://www.lonelyplanet.com/thailand/chiang-mai/attractions/wat-chedi-luang/a/poi-sig/1243143/357655",
        "city_id": 2,
        "created_at": "2019-03-13T00:44:57.942Z",
        "updated_at": "2019-03-13T00:44:57.942Z"
    }
]
```
## POST
> There are two endpoints to create new data. One is to create a new city and the other for a new attraction. Upon success, both return the ```id``` of the newly created city or attraction

### ```POST /api/v1/cities```  
**Required Input for Request Body**  

| Name       | Type          | Description  |
| ------------- | ------------- | ----- |
| `city_name`      | `string` | Name of a city in Thailand |
| `avg_may_high`      | `integer`      |   Degrees in farenheit of the city's average high during May |
| `avg_may_low`  | `integer`     |    Degrees in farenheit of the city's average low during May | 
  
**Example Response**
```
{
  "city_name": "Phuket",
  "avg_may_high": 87,
  "avg_may_low": 73
}
```  

### ```POST /api/v1/attractions```   
**Required Input for Request Body**  

| Name       | Type          | Description  |
| ------------- | ------------- | ----- |
| `name`      | `string` | Name of of the attraction |
| `link`      | `string`      |   Link to additional information |
| `city_id`  | `integer`     |    Id of the city the attraction is located in | 
   

**Example Response**
```
{
  "name": "Wat Phra That Doi Suthep",
  "link": "https://www.lonelyplanet.com/thailand/chiang-mai/attractions/wat-phra-that-doi-suthep/a/poi-sig/1243262/357655",
  "city_id": 2
}
```  
## DELETE  
> There are two endpoints to delete data. One to delete an attraction and the other to delete a city — please note, any attractions associated with that city will also be deleted

**Required:**
The id of the city or attraction to be deleted, included in the url provided   
### ```DELETE /api/v1/cities/:id```  
### ```DELETE '/api/v1/attractions/:id```  
**Example Response**
```
Successfully deleted city with id: 4 
```