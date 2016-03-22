var _ = require('lodash');



var beerData = JSON.parse(document.getElementById("beerData").textContent);
var beers = beerData.beers;
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

function filterBeers(property, value) {
  var filteredBeers = [];

  for (var i=0; i<beers.length; i++) {
    if (compareValues(beers[i], property, value)) {
      filteredBeers.push(beers[i]);
    }
  }

  return filteredBeers;
}

function makeFilter(property) {
  return function (value) {
    return filterBeers (property, value);
  }
}

var filterByLocale = makeFilter('locale');
var filterByType = makeFilter('type');

function compareValues(item, property, value) {
  if (!Array.isArray(value)) {
      return item[property] === value;
  }
  for (var i=0; i<value.length; i++) {
    if (item[property] === value[i]) {
      return true;
    }
  }
  return false;
}
// End





loadBeers(beers);






filters.addEventListener('click', function (e) {
  e.preventDefault();

  var clickedTab = e.target;
  var filter = clickedTab.dataset.filter;
  var filteredBeers = [];

  setActiveFilter(clickedTab);

  switch (filter) {
    case 'all':
      filteredBeers = beers;
      break;
    case 'domestic':
      filteredBeers = filterByLocale('domestic');
      break;
    case 'imports':
      filteredBeers = filterByLocale('import');
      break;
    case 'ale':
      filteredBeers = filterByType(['ipa', 'ale']);
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
