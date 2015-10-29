// to run this code use phantomjs script-1.js
var fs = require('fs');
var outputDir = 'Missing-attribute-list';

//this method takes the input as name of attribute file and return the name of charttype.
var mapWithAliasName = function(newName) {
 
 var aliasName,
 key,
 mappingObj = {
    'Col3DLine': 'MSColumnLine3D',
    'Column2D': 'MSColumn2D',
    'Column3D': 'MSColumn3D',
    'Combi2D' : 'MSCombi2D',
    'Combi2DDY': 'MSCombiDY2D',
    'Combi3D' : 'MSCombi3D',
    'ErrorBar':'ErrorBar2D',
    'Line2D': 'Line',
    'Linear':'HLinearGauge',
    'MSArea2D': 'MSArea',
    'MSCol3DLineDY': 'MSColumn3DLineDY',
    'MSStCol': 'MSStackedColumn2D',
    'MSStColLineDY': 'MSStackedColumn2DLineDY',
    'ScrollStackedCol2D': 'ScrollStackedColumn2D',
    'StArea2D': 'StackedArea2D',
    'StBar2D': 'StackedBar2D',
    'StCol2D': 'StackedColumn2D',
    'StCol2DLine': 'StackedColumn2DLine',
    'StCol3D': 'StackedColumn3D',
    'StCol3DLine': 'StackedColumn3DLine',
    'StCol3DLineDY': 'StackedColumn3DLineDY',
    'Angular': 'AngularGauge',
    'Horizontal': 'HLED',
    'SparkWL': 'SparkWinLoss',
    'Vertical': 'VLED',
    'BoxandWhisker2D': 'BoxAndWhisker2D',
    'Candlestick': 'CandleStick',
    'DragCol2D': 'DragColumn2D',
    'InverseArea': 'InverseMSArea',
    'InverseColumn': 'InverseMSColumn2D',
    'InverseLine': 'InverseMSLine',
    'LogColumn2D': 'LogMSColumn2D',
    'LogLine': 'LogMSLine',
    'MALine': 'MultiAxisLine',
    'Waterfall' : 'waterfall2d'
};

for (key in mappingObj) {
    if (mappingObj.hasOwnProperty(key)) {
        aliasName = mappingObj[key];
        if (newName === String(key)) {
            newName = aliasName;
            break;
        }
    }
}

return newName;

}; 


var check = (function(fileAttrName,fileChartName){

  //gets all the file name from this folder  
  var fcChartData = JSON.parse(fs.read("output/" + fileChartName.toLowerCase() + ".json" ).toLowerCase());
  var chartAttribute = fs.read("attributes/" + fileAttrName).toLowerCase();
  var count = 0, miss = 0, attr = "\n,";
  for(var key in fcChartData.chart)
  {
    var t = chartAttribute.search("\"" + key + "\"");
    //counting total chart attributes
    count ++;

    if(t === -1)
    {
        //counting total miss attributes in dev-center attribute Json files. 
        miss ++; 
        //making format to write the out put in the csv file.  
        attr = attr +  key + '\n,';
    }    
    
}  
    
    fs.write(outputDir +'/' + 'List-Of-Miss-Attribute.csv', fileChartName + ',,' + count + ',' +miss, 'a+'); 
    fs.write(outputDir +'/' + 'List-Of-Miss-Attribute.csv', attr +'\n', 'a+');    


});


(function(){
    //creating a csv file with some heading.
    fs.write(outputDir +'/' + 'List-Of-Miss-Attribute.csv', 'Chart Name,List of Attributes,Total chart attributes,Missing attributes\n', 'a+'); 
    var filesAttr = fs.list('attributes/');

    for(var i=2; i<filesAttr.length; i++)
    {
        var attrName = mapWithAliasName(filesAttr[i].replace(/\.[^/.]+$/, "")); //filesAttr[i] filesAttr[i].match(/[\w]*/)
        check(filesAttr[i],attrName);
    }
    phantom.exit();
})();

