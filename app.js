// first goal: display a list with location names using Knockout.js (add the map later)

// hard coded Array of location objects
// https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html#L150


var locations = [
    {title: 'Lewisville Park', location: {lat: 45.816459, lng: -122.541811}, services: ["Boat Ramp", "Hiking", "Kayak/Canoe Access", "Restrooms", "Fees Required"], fees: true},
    {title: 'Paradise Point State Park', location: {lat: 45.865752, lng: -122.703986}, services: ["Boat Ramp", "Hiking", "Kayak/Canoe Access", "Restrooms", "Fees Required"], fees:  true},
    {title: 'Daybreak Park', location: {lat: 45.813480, lng: -122.588698}, services: ["Boat Ramp", "Kayak/Canoe Access", "Restrooms"], fees: false},
    {title: 'Sunset Falls Campground', location: {lat: 45.819102, lng: -122.252303}, services: ["Kayak/Canoe Access", "Restrooms", "Camping", "Fees Required"], fees: true},
    {title: 'Moulton Falls Regional Park', location: {lat: 45.831679, lng: -122.389088}, services: ["Hiking", "Restrooms"], fees: false},
    {title: 'Kayak/Canoe Launch 1', location: {lat: 45.821464, lng: -122.236941}, services: ["Kayak/Canoe Access"],  description: "This is a popular put-in for the waterfall run. There is a small pull out here for parking. Follow the trail to the river. It is a steep climb down to the river.", fees: false},
    {title: 'Kayak/Canoe Launch 2', location: {lat: 45.830943, lng: -122.212046}, services: ["Kayak/Canoe Access"], description: "This put-in for the waterfall run is suitable when river level is 1,500 cfs or higher.", fees: false}
  ];

var categories = [
  'Boat Ramp',
  'Camping',
  'Hiking',
  'Kayak/Canoe Access',
  'Restrooms',
  'Fees Required'
];


function initalLocations(self){
  var locationTitles = [];
  locations.forEach(function(location){
    self.visibleLocations.push(location.title);
  });
};

var map;
function initMap() {
        // Make Map
         map = new google.maps.Map(document.getElementById('map'), {
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

        var makeMarkers = function(){
          // Create markers
          for (var i = 0; i < locations.length; i++) {
            // Get the position and title from the location array.
            var position = locations[i].location;
            var title = locations[i].title;

            // If the description is blank, set it to an empty string
            if ( locations[i].description === undefined) {
              var description = "";
            } else {
              var description = locations[i].description;
            }

            var services = locations[i].services;

            var fees = locations[i].fees;


            // Create a marker for each location and put it in the markers array.
            var marker = new google.maps.Marker({
              map: map,
              position: position,
              title: title,
              animation: google.maps.Animation.DROP,
              id: i,
              description: description,
              services: services,
              fees: fees
            });

            // Create and onclick event to open an infowindow at each marker.
            marker.addListener('click', function() {
              populateInfoWindow(this, infowindow);
            });
          }
        };

    makeMarkers();


      } // end initMap


var AppViewModel = function (){
  var self = this;

  this.locations = ko.observableArray(locations);

  this.selectedCategories = ko.observableArray();

  this.visibleLocations = ko.observableArray();

  // If no boxes are checked, show all the locations
  initalLocations(this);

  this.filterLocations = function(){

      // First, we empty the array so we don't get duplicate location titles.
      self.visibleLocations.removeAll();

      // Loop through each location
      self.locations().forEach(function(location){
        // Loop through the the services array of each location. I had to use a regular loop, instead of a forEach loop, so I could use the break statment
        for (i = 0; i < location.services.length; i++) {
          // If the service name is present in the selectedCategories array, add the location title to the visibleLocations array.
          if (self.selectedCategories().indexOf(location.services[i]) !== -1) {
            self.visibleLocations.push(location.title);
            // Break out of the loop if a match is found. That way locations can't get added multiple times to the visibleLocations array.
            break;
          };
        }; // close the for loop
      }); // close the forEach loop

      // If no boxes are checked, show all the locations
      if (self.visibleLocations().length === 0) {
        initalLocations(self);
        };



      // By default, the click binding prevents the default reaction to a click based on the assumption that the JavaScript click event handler will handle everything. We need to return "true" to get the default behavior anyway:
      // https://stackoverflow.com/questions/26355096/checkbox-not-getting-checked-in-knockoutjs
      return true;


      // TODO: Call a function that updates the map markers

  };


}






// Instantiate the ViewModel
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
// The difference between defining the ViewModel as a function expression or defining the viewModel as an object literal:
// https://discussions.udacity.com/t/text-not-updating-with-search-box/182886/6

// Apply the bindings aka activate KO
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models#activating-knockout

var vm = new AppViewModel;
ko.applyBindings(vm);
