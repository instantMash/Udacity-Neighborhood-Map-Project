// first goal: display a list with location names using Knockout.js (add the map later)

// hard coded Array of location objects
// https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html#L150


var locations = [
    {title: 'Lewisville Park', location: {lat: 45.816459, lng: -122.541811}, services: ["Boat Ramp", "Hiking", "Kayak/Canoe Access", "Restrooms"], fees: true},
    {title: 'Paradise Point State Park', location: {lat: 45.865752, lng: -122.703986}, services: ["Boat Ramp", "Hiking", "Kayak/Canoe Access", "Restrooms"], fees:  true},
    {title: 'Daybreak Park', location: {lat: 45.813480, lng: -122.588698}, services: ["Boat Ramp", "Kayak/Canoe Access", "Restrooms"], fees: false},
    {title: 'Sunset Falls Campground', location: {lat: 45.819102, lng: -122.252303}, services: ["Kayak/Canoe Access", "Restrooms", "Camping"], fees: true},
    {title: 'Moulton Falls Regional Park', location: {lat: 45.831679, lng: -122.389088}, services: ["Hiking", "Restrooms"], fees: false},
    {title: 'Kayak/Canoe Launch', location: {lat: 45.821464, lng: -122.236941}, services: ["Kayak/Canoe Access"],  description: "This is a popular put-in for the waterfall run. There is a small pull out here for parking. Follow the trail to the river. It is a steep climb down to the river.", fees: false},
    {title: 'Kayak/Canoe Launch', location: {lat: 45.830943, lng: -122.212046}, services: ["Kayak/Canoe Access"], description: "This put-in for the waterfall run is suitable when river level is 1,500 cfs or higher.", fees: false}
  ];



// initMap function (later)
// https://developers.google.com/maps/documentation/javascript/examples/map-simple

var map;
function initMap() {
        // Make Map
        var map = new google.maps.Map(document.getElementById('map'), {
          styles:
            [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}],
            mapTypeControlOptions: {
           style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
           position: google.maps.ControlPosition.TOP_CENTER
       }
        });

        // Set Bounds
        var swBounds = new google.maps.LatLng(45.822883, -122.719666);
        var neBounds = new google.maps.LatLng(45.866361, -122.163878);
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(swBounds);
        bounds.extend(neBounds);
        map.fitBounds(bounds);

      } // end initMap

// Location constructor similiar to the Cat constructor from the JavaScript Design Patterns course (optional)

// ViewModel constructor
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models
// In the ViewmModel create an observableArray with location objects
// this.camping = ko.observableArray(locations); // if you do not want to use a Camping constructor
// Separating Out the Model video lesson:
// https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/271165859175461/lessons/3406489055/concepts/34284402380923
// Adding More Cats video lesson
// https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/271165859175461/lessons/3406489055/concepts/34648186930923

var AppViewModel = function (){
  this.locations = ko.observableArray(locations);


  this.youClicked = function () {
    console.log("you clicked");

  }
}



// Instantiate the ViewModel
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
// The difference between defining the ViewModel as a function expression or defining the viewModel as an object literal:
// https://discussions.udacity.com/t/text-not-updating-with-search-box/182886/6

// Apply the bindings aka activate KO
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models#activating-knockout

ko.applyBindings(new AppViewModel);
