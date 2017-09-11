var locations = [{
        title: "Lewisville Park",
        location: {
            lat: 45.816459,
            lng: -122.541811
        },
        services: ["Boat Ramp", "Hiking", "Kayak/Canoe Access", "Restrooms", "Fees Required"],
        fees: true
    },
    {
        title: "Paradise Point State Park",
        location: {
            lat: 45.865752,
            lng: -122.703986
        },
        services: ["Boat Ramp", "Hiking", "Kayak/Canoe Access", "Restrooms", "Fees Required"],
        fees: true
    },
    {
        title: "Daybreak Park",
        location: {
            lat: 45.813480,
            lng: -122.588698
        },
        services: ["Boat Ramp", "Kayak/Canoe Access", "Restrooms"],
        fees: false
    },
    {
        title: "Sunset Falls Campground",
        location: {
            lat: 45.819102,
            lng: -122.252303
        },
        services: ["Kayak/Canoe Access", "Restrooms", "Camping", "Fees Required"],
        fees: true
    },
    {
        title: "Moulton Falls Regional Park",
        location: {
            lat: 45.831679,
            lng: -122.389088
        },
        services: ["Hiking", "Restrooms"],
        fees: false
    },
    {
        title: "Kayak/Canoe Launch 1",
        location: {
            lat: 45.821464,
            lng: -122.236941
        },
        services: ["Kayak/Canoe Access"],
        description: "This is a popular put-in for the waterfall run. There is a small pull out here for parking. Follow the trail to the river. It is a steep climb down to the river.",
        fees: false
    },
    {
        title: "Kayak/Canoe Launch 2",
        location: {
            lat: 45.830943,
            lng: -122.212046
        },
        services: ["Kayak/Canoe Access"],
        description: "This put-in for the waterfall run is suitable when river level is 1,500 cfs or higher.",
        fees: false
    }
];

var categories = [
    "Boat Ramp",
    "Camping",
    "Hiking",
    "Kayak/Canoe Access",
    "Restrooms",
    "Fees Required"
];

// This utility function pushes all the location titles into the visible locations array. We call this at when none of the checkboxes are selected. For some reason, I was not able to simply assign the visibleLocations array to a variable that contained all the location titles. I have to actually push all the location titles each time. I think this has something to do with Knockout and how observable Arrays work.
function initalLocations(self) {
    locations.forEach(function(location) {
        self.visibleLocations.push(location);
    });
}

var map;
var markers = [];

function initMap() {
    // Make Map
    map = new google.maps.Map(document.getElementById("map"), {
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
    });

    // Set Bounds
    var swBounds = new google.maps.LatLng(45.822883, -122.719666);
    var neBounds = new google.maps.LatLng(45.866361, -122.163878);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(swBounds);
    bounds.extend(neBounds);
    map.fitBounds(bounds);


} // end initMap

initMap();
var infowindow = new google.maps.InfoWindow();

var makeMarkers = function() {

    // Remove any existing markers
    markers.forEach(function(marker) {
        marker.setMap(null); // This removes it from the map, but doesn't delete the marker
    });

    markers.length = 0; // This actually deletes the old markers: https://developers.google.com/maps/documentation/javascript/markers#remove

    vm.visibleLocations().forEach(function(location) {
        var title = location.title;
        var position = location.location;
        var description = location.description;
        var services = location.services;
        var fees = location.fees;

        // If the description is blank, set it to an empty string. This prevents "undefined" from showing up in the info window.
        if (location.description === undefined) {
            description = "";
        }

        // Create a marker for each location
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            id: location.title,
            description: description,
            services: services,
            fees: fees,
            icon: "http:\/\/maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        markers.push(marker);

        // Create an onclick event listener to open an infowindow at each marker.
        marker.addListener("click", function() {
            markers.forEach(function(marker) {
                marker.setIcon("http:\/\/maps.google.com/mapfiles/ms/icons/red-dot.png");
            });
            this.setIcon("http:\/\/maps.google.com/mapfiles/ms/icons/blue-dot.png");
            populateInfoWindow(this, infowindow);
        });

    });

}; // end of makeMarkers function

function populateInfoWindow(marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;


        // Add items from the service array to an HTML list.
        var serviceList = "";
        for (i = 0; i < marker.services.length; i++) {
            var serviceItem = marker.services[i];

            // Create the CSS class name from the service name. Replace spaces and forward slashes with hyphens.
            var serviceItemClass = serviceItem.replace(/\s|\//g, "-").toLowerCase();
            serviceList = serviceList + "<li class=" + serviceItemClass + ">" + serviceItem + "</li>";
        }

        if (marker.fees === true) {
            serviceList = serviceList + "<li class=\"fees-required\">Fees Required</li>";
        }

        infowindow.setContent("<div class=\"info-window\"><h3>" + marker.title + "</h3>" + "<p>" + marker.description + "</p><ul class=\"info-window-services\">" + serviceList + "</ul></div>");
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



var AppViewModel = function() {
    var self = this;

    this.riverFlowMessage = ko.observable();

    this.selectedCategories = ko.observableArray();

    this.visibleLocations = ko.observableArray();

    // If no boxes are checked, show all the locations
    initalLocations(this);

    // Filter visible locations based on which checkboxes are selected.
    this.filterLocations = function() {

        // First, we empty the array so we don't get duplicate location titles.
        self.visibleLocations.removeAll();

        // Loop through each location
        locations.forEach(function(location) {
            // Loop through the the services array of each location. I had to use a regular loop, instead of a forEach loop, so I could use the break statment
            for (i = 0; i < location.services.length; i++) {
                // If the service name (from the location) is present in the selectedCategories array, add that location title to the visibleLocations array.
                if (self.selectedCategories().indexOf(location.services[i]) !== -1) {
                    self.visibleLocations.push(location);
                    // Break out of the loop if a match is found. That way locations can't get added multiple times to the visibleLocations array.
                    break;
                }
            } // close the for loop
        }); // close the forEach loop

        // If no boxes are checked, show all the locations
        if (self.visibleLocations().length === 0) {
            initalLocations(self);
        }

        // By default, the click binding prevents the default reaction to a click based on the assumption that the JavaScript click event handler will handle everything. We need to return "true" to get the default behavior anyway:
        // https://stackoverflow.com/questions/26355096/checkbox-not-getting-checked-in-knockoutjs

        makeMarkers();

        return true;
    };


}; // end of AppViewModel


// Make a call to the USGS River Data API. Get the current flow from the East Fork Lewis guage.
// USGS Instantaneous Values Web Service
var usgsURL = "https:\/\/waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=14222500&parameterCd=00060&siteStatus=all";

var riverFlowMessage;

$.getJSON(usgsURL, function(data) {

        var currentRiverFlow = (data.value.timeSeries[0].values[0].value[0].value);
        var riverFlowCredits = "River level data provided by  <a href=\"https:\/\/waterdata.usgs.gov/nwis/rt\">waterdata.usgs.gov</a>";

        var riverFlowStatus = "low";

        if (currentRiverFlow > 700) {
            riverFlowStatus = "medium";
        }

        if (currentRiverFlow > 1999) {
            riverFlowStatus = "high";
        }

        vm.riverFlowMessage("<h3>Current Flow: " + currentRiverFlow + " cfs" + " &bull; <span>" + riverFlowStatus + "</span></h3>" + riverFlowCredits);

    })

    .fail(function() {

        vm.riverFlowMessage("Check out the latest river flow <a href=\"https:\/\/waterdata.usgs.gov\/wa\/nwis\/uv\/?site_no=14222500&PARAmeter_cd=00060,00065\">here</a>");

    });


var vm = new AppViewModel();
ko.applyBindings(vm);
makeMarkers();
