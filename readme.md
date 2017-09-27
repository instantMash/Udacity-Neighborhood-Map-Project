# Explore the East Fork Lewis River
This website was created for my Udacity Front End Nanodegree Neighborhood Map Project. I created an interactive map to give users the information they need to enjoy the East Fork Lewis River.

## How to view this Project
* Download or clone this repo.
* Open index.html in a browser.
* You will need an Internet connection to view the Google map and USGS data.
* __Note__: To successfully load the USGS API, you will need to run index.html on a web server.
* You can also view this site on GitHub pages [here.](http://gregdavenportdesign.com/Explore-the-East-Fork-Lewis/)

## Location Filtering

The map locations can be filtered by category by selecting the checkboxes. The map will show locations that match any of the checked categories. When no boxes are checked, all the locations are visible. I used Knockout.js to track which categories are currently selected and to refresh the list of locations and map markers.

## Learning Goals

### App Architecture
I used Knockout.js to implement a Model-View-View Model (MVVM) design pattern.

* The __Model__ is a hard-coded array of locations along the river.
* The __View-Model__ is an object managed by Knockout.
* The __View__ is the HTML document with declarative bindings that link it to the view model.

### AJAX
I utilized two third-party APIs that are retrieved in an asynchronous manner.

* __Google Maps Javascript API__ creates the map, markers, and marker pop up windows.
* __Wikipedia API__ supplies information about each location in the Info Window.

## Revisions after Code Review

> Please see Location Details Functionality rubric. Location details must contain unique information from a non-Google API service.

...

> Current river level data is not specific for each location and does not count to meet the project requirement of: Providing unique location detail from a non-Google API service for each location. The current unique details on infowindow are also hard-coded instead of being retrieved from a 3rd party API service. The location details must be unique for each location and should be shown when the location item/marker is clicked.

I am now using the Wikipedia API to add unique location detail for each location.

> Google Map API should be loaded asynchronously.Please re-order script tag to avoid race condition issue as Map is requested asynchronously. Map API must be the last requested script.

...

> Google Map API request needs to be provided with an error handling method

I reordered the script tag, added the async attribute, and provided a fallback error handling method using the onerror attribute.

> Please specifically give detailed instruction on how to set up the local web server.

Now that I am not using the USGS API, a local server is not required. So I left this out.
