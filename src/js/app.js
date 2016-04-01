var _ = require('lodash');



var beerData = JSON.parse(document.getElementById("beerData").textContent);
var allBeers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var averageAbv = document.getElementById("averageAbv");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");


//Functions
function loadBeers(b) {
  beerList.innerHTML = _.template(beerTemplate)({ beers: b });
  averageAbv.innerHTML = 'Average ABV: ' + getAverageAbv(b) + '%';
}

function setActiveFilter(tab) {
  for (var i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }

  tab.classList.add('btn-active');
}



function filter(collection, callback) {
  var filtered = [];

  for (var i=0; i<collection.length; i++) {
    if (callback(collection[i])) {
      filtered.push(collection[i]);
    }
  }

  return filtered;
}

function makeFilter(collection, property) {
  return function (value) {
    return filter (collection, function (item) {
      return item[property] === value;
    });
  }
}

function map(collection, callback) {
  var mapped = [];

  for (var i=0;i<collection.length; i++) {
    mapped.push(callback(collection[i]));
  }

  return mapped;

}

function reduce(collection, callback, initial) {
  var last = initial;

  for (var i=0;i<collection.length; i++) {
    last = callback(last, collection[i]);
  }

  return last;

}

function add(a, b) {
  return a + b
}

function getAverageAbv(beers) {
  var abvs = map(beers, function (beer) {
    return beer.abv;
  });

  var total = reduce(abvs, add, 0);

  return total = Math.round((total / beers.length) * 10) / 10;
}

var filterByLocale = makeFilter(allBeers, 'locale');
var filterByType = makeFilter(allBeers, 'type');


// End





loadBeers(allBeers);






filters.addEventListener('click', function (e) {
  e.preventDefault();

  var clickedTab = e.target;
  var filterName = clickedTab.dataset.filter;
  var filteredBeers = [];

  setActiveFilter(clickedTab);

  switch (filterName) {
    case 'all':
      filteredBeers = allBeers;
      break;
    case 'domestic':
      filteredBeers = filterByLocale('domestic');
      break;
    case 'imports':
      filteredBeers = filterByLocale('import');
      break;
    case 'ale':
      filteredBeers = filter(allBeers, function (beer) {
        return beer.type === 'ale' || beer.type === 'ipa';
      });
      break;
    case 'lager':
      filteredBeers = filterByType('lager');
      break;
    case 'stout':
      filteredBeers = filterByType('stout');
      break;
  }

  loadBeers(filteredBeers);

});
