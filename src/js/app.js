var _ = require('lodash');


//Variables
var beerData = JSON.parse(document.getElementById("beerData").textContent);
var allBeers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer-groups").textContent;
var beerList = document.getElementById("beerList");
var averageAbv = document.getElementById("averageAbv");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");

//Functions
var fp = {};

//filter
fp.filter = function (collection, callback) {
  var filtered = [];

  for (var i=0; i<collection.length; i++) {
    if (callback(collection[i])) {
      filtered.push(collection[i]);
    }
  }

  return filtered;
};

//map
fp.map = function (collection, callback) {
  var mapped = [];

  for (var i=0;i<collection.length; i++) {
    mapped.push(callback(collection[i]));
  }

  return mapped;
};

//reduce
fp.reduce = function (collection, callback, initial) {
  var last = initial;

  for (var i=0;i<collection.length; i++) {
    last = callback(last, collection[i]);
  }

  return last;
};

//add
fp.add = function (a, b) {
  return a + b
};

//groupBy
fp.groupBy = function (collection, callback) {
  var groups = {};
  var key;
  for (var i=0; i<collection.length; i++) {
    key = callback(collection[i]);
    if (groups[key]) {
      groups[key].push(collection[i]);
    } else {
      groups[key] = [collection[i]];
    }
  }
  return groups;
};




function loadBeers(allBeers) {
  var beerGroups = fp.groupBy(allBeers, function (beer) {
    return beer.locale;
  });
  beerList.innerHTML = _.template(beerTemplate)({ beers: beerGroups });
  averageAbv.innerHTML = 'Average ABV: ' + getAverageAbv(allBeers) + '%';
}

function setActiveFilter(tab) {
  for (var i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }

  tab.classList.add('btn-active');
}

//makeFilter
function makeFilter (collection, property) {
  return function (value) {
    return fp.filter (collection, function (item) {
      return item[property] === value;
    });
  }
}




function getAverageAbv(beers) {
  var abvs = fp.map(beers, function (beer) {
    return beer.abv;
  });

  var total = fp.reduce(abvs, fp.add, 0);

  return total = Math.round((total / beers.length) * 10) / 10;
}
// End





var filterByLocale = makeFilter(allBeers, 'locale');
var filterByType = makeFilter(allBeers, 'type');

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
      filteredBeers = fp.filter(allBeers, function (beer) {
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
