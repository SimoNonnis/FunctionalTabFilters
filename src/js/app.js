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
  for (i=0; i<filterLinks.length; i++) {
    filterLinks[i].classList.remove('btn-active');
  }

  tab.classList.add('btn-active');
}
// End





loadBeers(beers);






filters.addEventListener('click', function (e) {
  e.preventDefault();

  var clickedTab = e.target;
  var filter = clickedTab.dataset.filter;
  var filteredBeers = [];
  var i;

  setActiveFilter(clickedTab);

  switch (filter) {
    case 'all':
      filteredBeers = beers;
      break;
    case 'domestic':
      for (i=0; i<beers.length; i++) {
        if (beers[i].locale === 'domestic') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'imports':
      for (i=0; i<beers.length; i++) {
        if (beers[i].locale === 'import') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'ale':
      for (i=0; i<beers.length; i++) {
        if (beers[i].type === 'ipa' || beers[i].type === 'ale') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'lager':
      for (i=0; i<beers.length; i++) {
        if (beers[i].type === 'lager') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
    case 'stout':
      for (i=0; i<beers.length; i++) {
        if (beers[i].type === 'stout') {
          filteredBeers.push(beers[i]);
        }
      }
      break;
  }

  loadBeers(filteredBeers);

});
