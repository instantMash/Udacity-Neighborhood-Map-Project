var locations = [{
        title: "Lewisville Park",
        location: {
            lat: 45.816459,
            lng: -122.541811
        },
        services: ["Boat Ramp", "Hiking", "Swimming", "Kayak/Canoe Access", "Fees Required"]
    },
    {
        title: "Paradise Point State Park",
        location: {
            lat: 45.865752,
            lng: -122.703986
        },
        services: ["Boat Ramp", "Hiking", "Swimming", "Kayak/Canoe Access", "Fees Required"]
    },
    {
        title: "Battle Ground Lake State Park",
        location: {
            lat: 45.802789,
            lng: -122.487089
        },
        services: ["Hiking", "Swimming", "Kayak/Canoe Access", "Fees Required"]
    },
    {
        title: "La Center, Washington",
        location: {
            lat: 45.812618,
            lng: -122.546800
        },
        services: ["Gas Stations", "Food"]
    },
    {
        title: "Battle Ground, Washington",
        location: {
            lat: 45.780700,
            lng: -122.534362
        },
        services: ["Gas Stations", "Food"]
    }
];

var categories = [
    "Hiking",
    "Boat Ramp",
    "Fees Required",
    "Swimming",
    "Kayak/Canoe Access",
    "Gas Stations",
    "Food"
];

// This utility function pushes all the location titles into the visible locations array. We call this when none of the checkboxes are selected.
function initialLocations(self) {
    locations.forEach(function(location) {
        self.visibleLocations.push(location);
    });
}

var map = document.getElementById("map");

var markers = [];

// This function creates the map. When the Google Maps API is ready, it calls this function which is specified using the callback parameter.
function initMap() {
    // Make Map
    map = new google.maps.Map(map), {
        styles: [{
            "featureType": "landscape",
            "stylers": [{
                "hue": "#FFBB00"
            }, {
                "saturation": 43.400000000000006
            }, {
                "lightness": 37.599999999999994
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "road.highway",
            "stylers": [{
                "hue": "#FFC200"
            }, {
                "saturation": -61.8
            }, {
                "lightness": 45.599999999999994
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "road.arterial",
            "stylers": [{
                "hue": "#FF0300"
            }, {
                "saturation": -100
            }, {
                "lightness": 51.19999999999999
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "hue": "#FF0300"
            }, {
                "saturation": -100
            }, {
                "lightness": 52
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "hue": "#0078FF"
            }, {
                "saturation": -13.200000000000003
            }, {
                "lightness": 2.4000000000000057
            }, {
                "gamma": 1
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "hue": "#00FF6A"
            }, {
                "saturation": -1.0989010989011234
            }, {
                "lightness": 11.200000000000017
            }, {
                "gamma": 1
            }]
        }],
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    };

    infowindow = new google.maps.InfoWindow();

    // Set Bounds
    var swBounds = new google.maps.LatLng(45.822883, -122.719666);
    var neBounds = new google.maps.LatLng(45.866361, -122.163878);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(swBounds);
    bounds.extend(neBounds);
    map.fitBounds(bounds);

    makeMarkers();
} // end initMap

var makeMarkers = function() {

    vm.visibleLocations().forEach(function(location) {
        var position = location.location;
        var title = location.title;

        // Create a marker for each location
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            id: location.title,
            icon: "http:\/\/maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        location.marker = marker;

        markers.push(marker);

        // Create an onclick event listener to open an infowindow at each marker.
        marker.addListener("click", function() {
            markers.forEach(function(marker) {
                marker.setIcon("http:\/\/maps.google.com/mapfiles/ms/icons/red-dot.png");
            });
            this.setIcon("http:\/\/maps.google.com/mapfiles/ms/icons/blue-dot.png");
            var currentMarker = this; // Store 'this' as a variable so we can pass it to the wikiCall function.
            var markerTitle = marker.title;
            wikiCall(currentMarker, markerTitle);
        });

    });

}; // end of makeMarkers function

function populateInfoWindow(marker, infowindow) {


    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;

        infowindow.setContent(infowindowContent);
        infowindow.open(map, marker);

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener("closeclick", function() {
            infowindow.setMarker = null;
        });
    }
}


// Trigger the markers when their corresponding list item is clicked
var highlightMarker = function(data, event, index) {
    google.maps.event.trigger(markers[index], "click");
};


// Fallback error handling method if Google Maps API does't load
function mapError() {

    // Create a paragraph to hold the error message.
    var mapErrorParagraph = document.createElement("p");

    // Create a text node and add it to the paragraph
    var mapErrorTextNode = document.createTextNode("There was an error loading Google Maps. Please try again later.");
    mapErrorParagraph.appendChild(mapErrorTextNode);

    // Add a class to the paragraph for styling
    mapErrorParagraph.className = "map-load-error";

    map.appendChild(mapErrorParagraph);

}


var AppViewModel = function() {
    var self = this;

    this.selectedCategories = ko.observableArray();

    this.visibleLocations = ko.observableArray();

    // If no boxes are checked, show all the locations
    initialLocations(this);

    // Filter visible locations based on which checkboxes are selected.
    this.filterLocations = function() {

        // First, we empty the array so we don't get duplicate location titles.
        self.visibleLocations.removeAll();

        // Loop through each location
        locations.forEach(function(location) {

            if (self.selectedCategories().length === 0) {
                locations.forEach(function(location) {
                    location.marker.setVisible(true);
                });
            }
            // Loop through the the services array of each location. I had to use a regular loop, instead of a forEach loop, so I could use the break statment
            for (i = 0; i < location.services.length; i++) {
                // If the service name (from the location) is present in the selectedCategories array, add that location title to the visibleLocations array.
                if (self.selectedCategories().indexOf(location.services[i]) !== -1) {
                    self.visibleLocations.push(location);
                    location.marker.setVisible(true);
                    // Break out of the loop if a match is found. That way locations can't get added multiple times to the visibleLocations array.
                    break;
                } else {
                    location.marker.setVisible(false);
                }
            } // close the for loop
        }); // close the forEach loop

        // If no boxes are checked, show all the locations
        if (self.visibleLocations().length === 0) {
            initialLocations(self);
        }

        // By default, the click binding prevents the default reaction to a click based on the assumption that the JavaScript click event handler will handle everything. We need to return "true" to get the default behavior anyway:
        // https://stackoverflow.com/questions/26355096/checkbox-not-getting-checked-in-knockoutjs

        return true;
    };


}; // end of AppViewModel





var wikiPageTitle,
    wikiPageExtract,
    wikiPageURL,
    wikiAttribution,
    infowindowContent;



// Ajax call to Wikipedia API

function wikiCall(currentMarker, markerTitle) {

    // This creates the URL to request the Wikipedia excerpt.
    var wikipediaAPI = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + markerTitle;

    // This creates the URL to the actual Wikipedia article.
    wikiPageURL = "https://en.wikipedia.org/wiki/" + markerTitle;

    // This snippet will go into the infowindow.
     wikiAttribution = "<p><em>Provided by Wikipedia. Read the full article <a href=\"" + wikiPageURL + "\" target=\"_blank\">here</a></em></p>";


    $.ajax({
        url: wikipediaAPI,
        dataType: "jsonp",
        success: function(data) {



            // We need to find out the Wikipedia page id
            wikiQueryId = Object.keys(data.query.pages)[0];

            // Now that we know the page id, we can get deeper into the json object
            wikiPageTitle = data.query.pages[wikiQueryId].title;
            wikiPageExtract = data.query.pages[wikiQueryId].extract;

            infowindowContent = "<h3>" + wikiPageTitle + "</h3>" + "<p>" + wikiPageExtract + "</p>" + wikiAttribution;


            populateInfoWindow(currentMarker, infowindow);


        },

        error: function() {
            infowindowContent = "Sorry. Wikipedia content isn't loading right now.";
            populateInfoWindow(currentMarker, infowindow);

        }

    });


} // end of WikiCall function


var vm = new AppViewModel();
ko.applyBindings(vm);
