const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(listOfBeers => {

  res.render('beers', {listOfBeers: listOfBeers})
    //res.render ('first argument is the path to get to what you want to render', {second argument has to be an object, give it a key and a value, use curly braces})
})

.catch(error => {
  console.log(error)
})


});

app.get('/random-beers', (req, res, next) => {
punkAPI.getRandom()
.then(theRandomBeer => {

  res.render('random', {oneBeer: theRandomBeer})
})
 .catch(error => {
  console.log(error)
})

});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
