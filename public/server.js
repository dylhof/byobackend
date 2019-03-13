const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.listen(app.get('port'), () => {
  console.log(`App is running on localhost:${app.get('port')}`);
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