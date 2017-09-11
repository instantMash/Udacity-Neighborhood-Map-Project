#Explore the East Fork Lewis River
This website was created for my Udacity Front End Nanodegree Neighborhood Map Project. I created an interactive map to give users the information they need to enjoy the East Fork Lewis River.

##How to view this Project
* Download or clone this repo.
* Open index.html in a browser.
* You will need an Internet connection to view the Google map and USGS data.
* __Note__: To successfully load the USGS API, you will need to run index.html on a web server.
* You can also view this site on GitHub pages [here.](http://gregdavenportdesign.com/Explore-the-East-Fork-Lewis/) 

##Location Filtering

The map locations can be filtered by category by selecting the checkboxes. The map will show locations that match any of the checked categories. When no boxes are checked, all the locations are visible. I used Knockout.js to track which categories are currently selected and to refresh the list of locations and map markers.

##Learning Goals
###App Architecture
I used Knockout.js to implement a Model-View-View Model (MVVM) design pattern.

* The __Model__ is a hard-coded array of locations along the river.
* The __View-Model__ is an object managed by Knockout.
* The __View__ is the HTML document with declarative bindings that link it to the view model.

###AJAX
I utilized two third-party APIs that are retrieved in an asynchronous manner.

* __Google Maps Javascript API__ creates the map, markers, and marker pop up windows.
* __USGS Instantaneous Values Web Service__ supplies the current flow from monitoring stations along the river. I used jQuery for handling the this AJAX request and the success/fail functions.
