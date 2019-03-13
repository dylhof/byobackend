const { thailandData } = require('../../../thailandData');

const createCity = (knex, city) => {
  return knex('cities').insert({
    city_name: city.cityName,
    avg_may_high: city.avgMayHigh,
    avg_may_low: city.avgMayLow,
  }, 'id')
  .then(cityId => {
    let attractionPromises = [];
    city.attractions.forEach(attraction => {
      attractionPromises.push(
        createAttraction(knex, {
          name: attraction.name,
          link: attraction.linkToDetails,
          city_id: cityId[0]
        })
      )
    });
    return Promise.all(attractionPromises);
  })
};

const createAttraction = (knex, attraction) => {
  return knex('attractions').insert(attraction);
};

exports.seed = function(knex, Promise) {
  return knex('attractions').del()
    .then(() => knex('cities').del())
    .then(() => {
      let cityPromises = [];
      thailandData.forEach(city => {
        cityPromises.push(createCity(knex, city));
      });
      return Promise.all(cityPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
