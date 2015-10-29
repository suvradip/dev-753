// to run this code use phantomjs script-1.js
var page;
//var fcLink = "http://www.fusioncharts.com/dev/chart-attributes.html?chart=area2d";
var fcLink = "http://127.0.0.1:4000/paradocs/jekyll/out/chart-attributes.html?chart=area2d";

page = require('webpage').create();
// ignoring all console log of the site
page.onConsoleMessage = (function(msg) {
   // console.log("");
});

// ignoring all javascript error of the site
page.onError = (function(msg) {
   // console.log("Javascript error on page");
}); 

// ignoring all javascript alert of the page
page.onAlert = (function(msg) {
  //console.log("");
});


//this function collect all the links according to the need. 
var createLocalFiles = (function(urlObject) {
    console.log("****** Start creating local files ******");
    var fs = require('fs');
    //try to inject jequery in the open page.
    if (page.injectJs("jquery.js")) {

        var value = page.evaluate(function(fcLink) {       
        var resources = []; 
        //select all the links inside the li tag 
        $("#select-chart li a").each(function() {
            
                temp ={};
                temp.name = $(this).text();
                //temp.url = "http://127.0.0.1:4000" + $(this).attr("href");
                temp.url = fcLink.match(/https?:\/\/[\w\.]+(:\d+)?/i)[0] + $(this).attr("href");
                resources.push(temp);   
        });

        return resources;
        },fcLink);
     

        var detailsContent  = JSON.stringify(value, null, 4);
        fs.write("chart-attribute-data.json", detailsContent, 'w');
        
        console.log("****** File write done ******");
        phantom.exit();
    } //end of if

});

// this function opens the link and perform operation
(function() {
 
    console.log("");
    console.log("Initializing the program");

    page.open(fcLink, function(status) {
        if (status == 'success')
            createLocalFiles(fcLink);
         else 
            console.log("****** Link cannot be opened may be broken or slow internet connectivity ******");
        
    });
})();

