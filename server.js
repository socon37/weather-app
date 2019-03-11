// set up + dependencies
const express = require('express');                 // create app with express
const bodyParser = require('body-parser');          // pull information from HTML POST (express4)
const request = require('request');
const app = express()

const apiKey = 'b09193ca5233b650c25e7423a2589594';  // open weather map API key

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

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})