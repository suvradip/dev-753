// to run this code use phantomjs script-1.js
var page, fs;
var fcResource = {};
fcResource.counter = -1;
page = require('webpage').create();
fs = require('fs');

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


 
var createLocalFiles = (function(urlObject) {
    console.log("****** Start creating local files ******");
    var fs = require('fs');
    if (page.injectJs("jquery.js")) {

        var value = page.evaluate(function() {
           
           var chartData = {};
           chartData.id = Object.keys(FusionCharts.items);
           chartData.name = FusionCharts.items[chartData.id[0]].chartType();  
           chartData.Data =  FusionCharts.items[chartData.id[0]].getJSONData();   
           return  chartData;
        });
     

        /*
        checking the return value is null or not if it
        is null then it will open the same link after 10sec break.
        */
        if(value && value.data!==null)
        {
            //if pass, writing the object in the file.
            var detailsContent  = JSON.stringify(value.Data, null, 4);
            fs.write("output/"+ value.name + ".json", detailsContent, 'w'); 
            startRender();

        }else {
        
            //if fail, opening the same link.
            fcResource.counter -= 1;
            startRender();
        
        }
          
    } //end of if brace

});

var startRender = (function() {
 
     console.log("");
     console.log("Initializing the program");

    fcResource.counter += 1;
    if (fcResource.counter >= fcResource.data.length) {
        phantom.exit();
    }
    console.log("******  Openning "+ (fcResource.counter + 1) +" link " + fcResource.data[fcResource.counter].url + " *****");

    page.open(fcResource.data[fcResource.counter].url, function(status) {
        if (status == 'success') {
            createLocalFiles(fcResource.data[fcResource.counter]);
        } else {
            fcResource.counter -= 1;
            console.log("****** Link cannot be opened may be broken or slow internet connectivity, will retry now ******");
            
            //break of 10sec
             setTimeout(function() {
                startRender();
            }, 10000);      
        }
    });
});


(function(){
   fcResource.data = JSON.parse(fs.read('chart-attribute-data.json'));
   startRender(); 
})();


 