const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'b09193ca5233b650c25e7423a2589594';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {name: null, icon: null, temperature: null, error: null});
})

app.get('/temperature', function (req, res) {
    res.render('index', {name: null, icon: null, temperature: null, error: null});
  })

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      console.log(weather);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        console.log(weather.name);
        console.log(weather.main.temp);
        for(i=0; i<weather.weather.length; i++){
            console.log(weather.weather[i].main + ':' + weather.weather[i].description);
        }
        let weatherIcon = `<i class="wi wi-owm-${weather.weather[0].id}"></i>`;
        res.render('index', {name: weather.name, icon:weatherIcon, temperature:weather.main.temp, unit:"°F", error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})