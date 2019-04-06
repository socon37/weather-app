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
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=Seattle&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      
      var date_old, date_new, low, high;
      var unit = "°F";
      low = 99999;
      high = -99999;
      
      var forecast = [];
      var icon = [];
      var forecastDay = {};

      for (i = 0; i < weather.list.length; i++) {
        date_new = new Date(weather.list[i].dt_txt);

        if (date_old != null) {
          if (date_new.getDate() != date_old.getDate() || i == weather.list.length-1 ) {
            // store values
            forecastDay['day'] = dayOfWeek(date_old.getDay()) + " " + date_old.getDate();
            forecastDay['low'] = Math.round(low) + unit;
            forecastDay['high'] = Math.round(high) + unit;
            forecastDay['icon'] = getMode(icon);
            forecast.push(forecastDay);
            var forecastDay = {};

            // reset values
            low = 99999;
            max = -99999;
            description = "";
            icon = [];
            date_old = date_new;
          }
        } 

        if (weather.list[i].main.temp_min < low) {
          low = weather.list[i].main.temp_min;
        }

        if (weather.list[i].main.temp_max > high) {
          high = weather.list[i].main.temp_max;
        }

        icon.push(weather.list[i].weather[0].id);
        
        date_old = new Date(weather.list[i].dt_txt);
      }

      res.render('index', {
        name: weather.city.name + "," + weather.city.country, 
        description:weather.list[0].weather[0].description, 
        icon: weather.list[0].weather[0].id,
        temperature:Math.round(weather.list[0].main.temp), 
        unit:unit, 
        forecast: forecast,
        error: null
      });
    }
  });
})

app.post('/F', function (req, res) {
  console.log("imperial");
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=Seattle&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      
      var date_old, date_new, low, high;
      var unit = "°F";
      low = 99999;
      high = -99999;
      
      var forecast = [];
      var icon = [];
      var forecastDay = {};

      for (i = 0; i < weather.list.length; i++) {
        date_new = new Date(weather.list[i].dt_txt);

        if (date_old != null) {
          if (date_new.getDate() != date_old.getDate() || i == weather.list.length-1 ) {
            // store values
            forecastDay['day'] = dayOfWeek(date_old.getDay()) + " " + date_old.getDate();
            forecastDay['low'] = Math.round(low) + unit;
            forecastDay['high'] = Math.round(high) + unit;
            forecastDay['icon'] = getMode(icon);
            forecast.push(forecastDay);
            var forecastDay = {};

            // reset values
            low = 99999;
            max = -99999;
            description = "";
            icon = [];
            date_old = date_new;
          }
        } 

        if (weather.list[i].main.temp_min < low) {
          low = weather.list[i].main.temp_min;
        }

        if (weather.list[i].main.temp_max > high) {
          high = weather.list[i].main.temp_max;
        }

        icon.push(weather.list[i].weather[0].id);
        
        date_old = new Date(weather.list[i].dt_txt);
      }

      res.render('index', {
        name: weather.city.name + "," + weather.city.country, 
        description:weather.list[0].weather[0].description, 
        icon: weather.list[0].weather[0].id,
        temperature:Math.round(weather.list[0].main.temp), 
        unit:unit, 
        forecast: forecast,
        error: null
      });
    }
  });
})

app.post('/C', function (req, res) {
  console.log("metric!");
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=Seattle&units=metric&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      
      var date_old, date_new, low, high;
      var unit = "°C";
      low = 99999;
      high = -99999;
      
      var forecast = [];
      var icon = [];
      var forecastDay = {};

      for (i = 0; i < weather.list.length; i++) {
        date_new = new Date(weather.list[i].dt_txt);

        if (date_old != null) {
          if (date_new.getDate() != date_old.getDate() || i == weather.list.length-1 ) {
            // store values
            forecastDay['day'] = dayOfWeek(date_old.getDay()) + " " + date_old.getDate();
            forecastDay['low'] = Math.round(low) + unit;
            forecastDay['high'] = Math.round(high) + unit;
            forecastDay['icon'] = getMode(icon);
            forecast.push(forecastDay);
            var forecastDay = {};

            // reset values
            low = 99999;
            max = -99999;
            description = "";
            icon = [];
            date_old = date_new;
          }
        } 

        if (weather.list[i].main.temp_min < low) {
          low = weather.list[i].main.temp_min;
        }

        if (weather.list[i].main.temp_max > high) {
          high = weather.list[i].main.temp_max;
        }

        icon.push(weather.list[i].weather[0].id);
        
        date_old = new Date(weather.list[i].dt_txt);
      }

      res.render('index', {
        name: weather.city.name + "," + weather.city.country, 
        description:weather.list[0].weather[0].description, 
        icon: weather.list[0].weather[0].id,
        temperature:Math.round(weather.list[0].main.temp), 
        unit:unit, 
        forecast: forecast,
        error: null
      });
    }
  });
})

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})

function dayOfWeek(number) {
  switch(number) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tues";
    case 3:
      return "Wed";
    case 4:
      return "Thurs";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
  return "nil";
}

function getMode(array) {
  if(array.length == 0) {
    return null;
  }
  var modeMap = {};
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++){
    var el = array[i];
    if(modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if(modeMap[el] >= maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
