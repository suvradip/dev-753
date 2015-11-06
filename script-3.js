// to run this code use phantomjs script-1.js
var fs = require('fs');
var outputDir = 'Missing-attribute-list';

//this method takes the input as name of attribute file and return the name of charttype.
var mapWithAliasName = function(newName) {
 
 var aliasName,
 key,
 mappingObj = {
    // 'Col3DLine': 'MSColumnLine3D',
    // 'Column2D': 'MSColumn2D',
    // 'Column3D': 'MSColumn3D',
    // 'Combi2D' : 'MSCombi2D',
    // 'Combi2DDY': 'MSCombiDY2D',
    // 'Combi3D' : 'MSCombi3D',
    // 'ErrorBar':'ErrorBar2D',
    // 'Line2D': 'Line',
    // 'Linear':'HLinearGauge',
    // 'MSArea2D': 'MSArea',
    // 'MSCol3DLineDY': 'MSColumn3DLineDY',
    // 'MSStCol': 'MSStackedColumn2D',
    // 'MSStColLineDY': 'MSStackedColumn2DLineDY',
    // 'ScrollStackedCol2D': 'ScrollStackedColumn2D',
    // 'StArea2D': 'StackedArea2D',
    // 'StBar2D': 'StackedBar2D',
    // 'StCol2D': 'StackedColumn2D',
    // 'StCol2DLine': 'StackedColumn2DLine',
    // 'StCol3D': 'StackedColumn3D',
    // 'StCol3DLine': 'StackedColumn3DLine',
    // 'StCol3DLineDY': 'StackedColumn3DLineDY',
    // 'Angular': 'AngularGauge',
    // 'Horizontal': 'HLED',
    // 'SparkWL': 'SparkWinLoss',
    // 'Vertical': 'VLED',
    // 'BoxandWhisker2D': 'BoxAndWhisker2D',
    // 'Candlestick': 'CandleStick',
    // 'DragCol2D': 'DragColumn2D',
    // 'InverseArea': 'InverseMSArea',
    // 'InverseColumn': 'InverseMSColumn2D',
    // 'InverseLine': 'InverseMSLine',
    // 'LogColumn2D': 'LogMSColumn2D',
    // 'LogLine': 'LogMSLine',
    // 'MALine': 'MultiAxisLine',
    // 'Waterfall' : 'waterfall2d'


'Angular':'AngularGauge',
'Area2D':'area2d',
'Bar2D':'bar2d',
'bar3D':'bar3d',
'BoxandWhisker2D': 'boxandwhisker2d',
'Bubble':'bubble',
'Bulb':'bulb',
'Candlestick':'candlestick',
'Col3DLine':'mscolumnline3d',
'Column2D':'column2d',
'Column3D':'column3d',
'Combi2D':'mscombi2d',
'Combi2DDY':'mscombidy2d',
'Combi3D':'mscombi3d',
'Cylinder':'cylinder',
'Doughnut2D':'doughnut2d',
'Doughnut3D':'doughnut3d',
'DragArea':'dragarea',
'DragCol2D':'dragcolumn2d',
'DragLine':'dragline',
'DragNode':'dragnode',
'ErrorBar':'errorbar2d',
'ErrorLine':'errorline',
'ErrorScatter':'errorscatter',
'Funnel':'funnel',
'Gantt':'gantt',
'HBullet':'hbullet',
'HeatMap':'heatmap',
'Horizontal':'hled',
'InverseArea':'InverseMSArea',
'InverseColumn':'InverseMSColumn2D',
'InverseLine':'InverseMSLine',
'Kagi':'kagi',
'Line2D':'line',
'Linear':'HLinearGauge',
'LogColumn2D':'LogMSColumn2D',
'LogLine':'LogMSLine',
'MALine':'MultiAxisLine',
'MSArea2D':'MSArea',
'MSBar2D':'msbar2d',
'MSBar3D':'msbar3d',
'MSCol3DLineDY':'mscolumn3dlinedy',
'MSColumn2D':'mscolumn2d',
'MSColumn3D':'mscolumn3d',
'MSLine':'msline',
'MSSpline':'msspline',
'MSSplineArea':'mssplinearea',
'MSStCol':'msstackedcolumn2d',
'MSStColLineDY':'msstackedcolumn2dlinedy',
'MSStepLine':'msstepline',
'Marimekko':'marimekko',
'MultiLevelPie':'multilevelpie',
'Pareto2D':'pareto2d',
'Pareto3D':'pareto3d',
'Pie2d':'pie2d',
'Pie3d':'pie3d',
'Pyramid':'pyramid',
'Radar':'radar',
'RealTimeArea':'realtimearea',
'RealTimeColumn':'realtimecolumn',
'RealTimeLine':'realtimeline',
'RealTimeLineDY':'realtimelinedy',
'RealTimeStackedArea':'realtimestackedarea',
'RealTimeStackedColumn':'realtimestackedcolumn',
'Scatter':'scatter',
'ScrollArea2D':'scrollarea2d',
'ScrollColumn2D':'scrollcolumn2d',
'ScrollCombi2D':'scrollcombi2d',
'ScrollCombiDY2D':'scrollcombidy2d',
'ScrollLine2D':'scrollline2d',
'ScrollStackedCol2D':'scrollstackedcolumn2d',
'SelectScatter':'selectscatter',
'SparkColumn':'sparkcolumn',
'SparkLine':'sparkline',
'SparkWL':'sparkwinloss',
'Spline':'spline',
'SplineArea':'splinearea',
'StArea2D':'stackedarea2d',
'StBar2D':'stackedbar2d',
'StCol2D':'stackedcolumn2d',
'StCol2DLine':'stackedcolumn2dline',
'StCol3D':'stackedcolumn3d',
'StCol3DLine':'stackedcolumn3dline',
'StCol3DLineDY':'stackedcolumn3dlinedy',
'StackedBar3D':'stackedbar3d',
'Thermometer':'thermometer',
'VBullet':'vbullet',
'Vertical':'vled',
'Waterfall':'waterfall2d',
'ZoomLine':'zoomline'
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

    console.log("Finish");
    phantom.exit();
})();

