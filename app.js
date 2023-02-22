var layer,map,checkbox,layerUrl,layerName;
var counterLayer=0;
require([
  "esri/map",
  "esri/toolbars/draw",
  "esri/graphic",
  "esri/layers/ArcGISDynamicMapServiceLayer",

  "esri/layers/ImageParameters",
  "dojo/on",
  "dojo/query",
  "esri/dijit/LayerList",

  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",

  "dojo/parser", "dijit/registry",
  "esri/dijit/Scalebar",
  "esri/symbols/Font",
  "esri/Color",
  "esri/geometry/webMercatorUtils",
  "dojo/dom",
  "esri/layers/FeatureLayer",

  "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
  "dijit/form/Button", "dijit/WidgetSet", "dojo/domReady!"
   
  

], function(Map, Draw, Graphic,ArcGISDynamicMapServiceLayer, ImageParameters,on,query,LayerList,
  SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
  parser, registry, Scalebar, Font, Color, webMercatorUtils, dom, FeatureLayer) {

    var visibleLayerId=[];


   map = new Map("map", {
   basemap: "topo-vector",
   center: [-122.45, 37.75],
   zoom: 13,
   
   });

   scalebar = new Scalebar({
      map: map,
      scalebarUnit: "dual",
      attachTo: "bottom-center",


  });


  // layer=new ArcGISDynamicMapServiceLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",{
  //     });

  //     map.addLayer(layer);

    

   map.on("load", function () {

      map.on("mouse-move", showCoordinates);
      map.on("mouse-drag", showCoordinates);  

  });

      var myWidget = new LayerList({
           map: map,
           layers:[] ,
           showOpacitySlider:true,
           showLegend: true
        },"layerList1");
        myWidget.startup();


  function showCoordinates(evt) {
      var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
      //display mause coorinates
      dom.byId("postionCoordinate").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
   }

   document.getElementById('saveButton').onclick = function () {
    layerUrl = document.getElementById("layerUrl").value
    console.log("function", layerUrl)
   
    layerName=document.getElementById("layerName").value

    // var finalString = '&nbsp;&nbsp;<input type="checkbox" style="margin-left: 0px; class = "checkbox" id = "' +  counterLayer +'"> <label for="text" >' + layerName + '</label><br><input type="range" min="1" max="100" value="50" class="slider" id="myRange"><br>';
    // document.getElementById("layerList1").innerHTML += finalString

    // var result = '"' + layerUrl + '"'
    // console.log("quated", result)
    var featureLayer = new FeatureLayer(layerUrl);

    map.addLayer(featureLayer);

    myWidget.layers.push({
      layer: featureLayer,
      title: layerName
  })

    myWidget.startup();
    map.addLayer([myWidget]);
    console.log(myWidget.layers)
    
    document.getElementById("popupWindow").style.display = "none";
};

   
 });
 
 function openLeftMenu() {
   document.getElementById("leftMenu").style.display = "block";
 }

 function closeLeftMenu() {
   document.getElementById("leftMenu").style.display = "none";
 }

 function openRightMenu() {
   document.getElementById("rightMenu").style.display = "block";
 }

 function closeRightMenu() {
   document.getElementById("rightMenu").style.display = "none";
 }
 function addLayersPopup(){
   document.getElementById("popupWindow").style.display = "block";
 }


function addLayersPopup() {
  document.getElementById("popupWindow").style.display = "block";
}
function closePopupWindows() {
  document.getElementById("popupWindow").style.display = "none";
}


if (layerUrl != null) {
  alert(layerUrl);
  console.log("a", layerUrl);
}



function saveLayer() {
             
             
  layerUrl = document.getElementById("layerUrl").value
  console.log("input layerUrl", layerUrl)

  layerName=document.getElementById("layerName").value
  console.log("input layerName",layerName)


  var finalString = '&nbsp;&nbsp;<input type="checkbox" class = "checkbox" id ="text"> <label for="text" >' + layerName + '</label><br><input type="range" min="1" max="100" value="50" class="slider" id="myRange"><br>';
  var final= document.getElementById("layerList1").innerHTML += finalString

  document.getElementById("popupWindow").style.display = "none";

}


