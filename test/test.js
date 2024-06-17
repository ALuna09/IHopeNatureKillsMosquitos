var assert = require('assert');
const sinon = require('sinon');
const mongoose = require('mongoose'); 
const WeatherModel = require('../database-mongo/WeatherSchema.js');

describe('GET request to: "/weather/:city/:units"', function () {
  describe('Weather Model', function () {
    beforeEach(function () { 
      sinon.stub(mongoose.Model, 'findOne'); 
    }); 
   
    afterEach(function () { 
      mongoose.Model.findOne.restore(); 
    }); 

    it('Should retrieve city by cityname', async function () { 
      const fakeCity = { city: 'testcity' }; 
      mongoose.Model.findOne.resolves(fakeCity); 
   
      const result = await WeatherModel.findOne('testcity'); 
   
      assert.equal(result, fakeCity)
    }); 

    it('Creates a New City', (done) => {
      const newCity = new WeatherModel({ city: 'Shriyam' });
      newCity.save() // returns a promise after some time
        .then(() => {
          //if the newCity is saved in db and it is not new
          assert(!newCity.isNew);
          done();
        });
    });

    it(`Will not retrieve non-existent data`, async function () {
      assert.equal(await WeatherModel.findOne('ghostCity'), null)
    })
  })

  describe('Should return an object', function () {
    it(':city = Vallejo, :units = metric', async function () {
      const response = await fetch('http://localhost:8080/weather/vallejo/metric');
      const weather = await response.json();
  
      assert.equal(typeof weather === 'object', true)
    })

    it(':city = Vacaville, :units = imperial', async function () {
      const response = await fetch('http://localhost:8080/weather/Vacaville/imperial');
      const weather = await response.json();
  
      assert.equal(typeof weather === 'object', true)
    })

    it('Case sensitivity', async function () {
      const response = await fetch('http://localhost:8080/weather/vacaville/Imperial');
      const weather = await response.json();
  
      assert.equal(typeof weather === 'object', true)
    })
  })

  describe('Should fail to fetch', function (){
    it(':city = baloon, :units = pirate', async function () {
      const response = await fetch('http://localhost:8080/weather/baloon/pirate');
      const weather = await response.json();

      assert.equal(Array.isArray(weather), true)
    })
      
    it('Numbers as queries', async function () {
      const response = await fetch('http://localhost:8080/weather/1/2');
      const weather = await response.json();
      
      assert.equal(Array.isArray(weather), true)
    })

    it('Fantasy locations', async function () {
      const response = await fetch('http://localhost:8080/weather/mordor/imperial');
      const weather = await response.json();
      
      assert.equal(Array.isArray(weather), true)
    })

    it('Excessive Cities', async function () {
      const response = await fetch('http://localhost:8080/weather/VacavilleNapa/metric/');
      const weather = await response.json();
      
      assert.equal(Array.isArray(weather), true)
    })
  })
})