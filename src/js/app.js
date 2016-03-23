var _ = require('lodash');



var beerData = JSON.parse(document.getElementById("beerData").textContent);
var allBeers = beerData.beers;
var beerTemplate = document.getElementById("tmpl-beer").textContent;
var beerList = document.getElementById("beerList");
var filters = document.getElementById("filters");
var filterLinks = filters.querySelectorAll("a");


//Functions
function loadBeers(b) {
  beerList.innerHTML = _.template(beerTemplate)({ beers: b });
}

function setActiveFilter(tab) {
  for (var i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }

  tab.classList.add('btn-active');
}

// function compareValues(item, property, value) {
//   if (!Array.isArray(value)) {
//       return item[property] === value;
//   }
//   for (var i=0; i<value.length; i++) {
//     if (item[property] === value[i]) {
//       return true;
//     }
//   }
//   return false;
// }

function filterBeers(beers, callback) {
  var filteredBeers = [];

  for (var i=0; i<beers.length; i++) {
    if (callback(beers[i])) {
      filteredBeers.push(beers[i]);
    }
  }

  return filteredBeers;
}

function makeFilter(beers, property) {
  return function (value) {
    return filterBeers (beers, function (beer) {
      return beer[property] === value;
    });
  }
}

var filterByLocale = makeFilter(allBeers, 'locale');
var filterByType = makeFilter(allBeers, 'type');


// End





loadBeers(allBeers);






filters.addEventListener('click', function (e) {
  e.preventDefault();

  var clickedTab = e.target;
  var filter = clickedTab.dataset.filter;
  var filteredBeers = [];

  setActiveFilter(clickedTab);

  switch (filter) {
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
      filteredBeers = filterBeers(function (beer) {
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
