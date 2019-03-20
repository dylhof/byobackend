const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();
const cors = require('cors');
app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(cors());
app.listen(app.get('port'), () => {
  console.log(`App is running on localhost:${app.get('port')}`);
});

app.get('/', (request, response) => {
  response.send('API with information about attractions in different cities throughout Thailand ')
});

app.get('/api/v1/cities', (req, res) => {
  database('cities').select()
    .then(cities => {
      return res.status(200).json(cities);
    })
    .catch(error => {
      return res.status(500).json({ error });
    })
});

app.get('/api/v1/attractions', (req, res) => {
  database('attractions').select()
    .then(attractions => {
      return res.status(200).json(attractions);
    })
    .catch(error => {
      return res.status(500).json({ error });
    })
});

app.get('/api/v1/cities/:id', (req, res) => {
  database('cities').where('id', req.params.id).select()
    .then(city => {
      if (city.length) {
        return res.status(200).json(city);
      } else {
        return res.status(404).json({ error: `City not found with id: ${req.params.id}` });  
      }
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
});

app.get('/api/v1/attractions/:id', (req, res) => {
  database('attractions').where('id', req.params.id).select()
    .then(attraction => {
      if (attraction.length) {
        return res.status(200).json(attraction);
      } else {
        return res.status(404).json({ error: `Attraction not found with id: ${req.params.id}` });
      }
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
});

app.post('/api/v1/cities', (req, res) => {
  const city = req.body;
  for (let requiredParameter of ['city_name', 'avg_may_high', 'avg_may_low']) {
    if (!city[requiredParameter]) {
      return res.status(422).send({ error: 
        `Expected format: { 
          city_name: <String>, avg_may_high: <Integer>, avg_may_low: <Integer>
          }. You are missing a "${requiredParameter}" property.`
        }
      );
    }
  }

  database('cities').insert(city, 'id')
    .then(city => {
      res.status(201).json({ id: city[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/v1/attractions', (req, res) => {
  const attraction = req.body;
  for(let requiredParameter of ['name', 'link', 'city_id']) {
    if (!attraction[requiredParameter]) {
      return res.status(422).send({ error: 
        `Expected format: {
          name: <String>, link: <String>, city_id: <Integer>
          }. You are missing a "${requiredParameter}" property.`
        }
      );
    }
  }

  let cityFound = false;
  database('cities').select()
    .then(cities => {
      cities.forEach(city => {
        if (city.id === parseInt(attraction.city_id)) {
          cityFound = true;
        }
      });
      if (!cityFound) {
        return res.status(422).json(
          `Cannot add an attraction without a city. No city exists with an id of: ${attraction.city_id}`
        );
      }
      database('attractions').insert(attraction, 'id')
        .then(attraction => {
          res.status(201).json({ id: attraction[0] });
        })
        .catch(error => {
          res.status(500).json({ error })
        });
    })
});

app.delete('/api/v1/attractions/:id', (req, res) => {
  let found = false;
  database('attractions').select()
    .then(attractions => {
      attractions.forEach(attraction => {
        if (attraction.id === parseInt(req.params.id)) {
          found = true;
        }
      });
      if (!found) {
        return res.status(404).json({
          error: `Not able to delete. Attraction not found with an id: ${req.params.id}.`
        });
      } else {
        database('attractions').where('id', req.params.id).del()
          .then(() => {
            res.status(202).json(
              `Sucessfully deleted attraction with id: ${req.params.id}`
            );
          })
          .catch(error => {
            res.status(500).json({ error });
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.delete('/api/v1/cities/:id', (req, res) => {
  let found = false;
  database('cities').select()
    .then(cities => {
      cities.forEach(city => {
        if (city.id === parseInt(req.params.id)) {
          found = true;
        }
      });
      if (!found) {
        return res.status(404).json({ 
          error: `Not able to delete becuase no city found with an id: ${req.params.id}.`
        });
      } else {
        database('attractions').where('city_id', req.params.id).del()
          .then(() => {
            database('cities').where('id', req.params.id).del()
              .then(() => {
                res.status(200).json(`Successfully deleted city with id: ${req.params.id}`)
              })
              .catch(error => {
                res.status(500).json({ error });
              })
          })
          .catch(error => {
            res.status(500).json({ error });
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});