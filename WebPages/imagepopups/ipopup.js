/**
 * Created by digibrose on 25/07/2016.
 */
var logfile = getUrlVars()["login"];

window.onload = function(){
    var eventCount = 0;
    var eventProperty = [];
    var TrackMouse = function (mouseEvent) {
        passVal2("Element id: " + mouseEvent.toElement.id + ", , X: " + mouseEvent.x + ", Y: " + mouseEvent.y + ", " + mouseEvent + ", " + Date.now() + "\n", logfile);
    };

    document.addEventListener("click", TrackMouse);
    document.addEventListener("mousedown", TrackMouse);
    document.addEventListener("dragstart", TrackMouse);
    document.addEventListener("dragend", TrackMouse);
};

//function to get query string values
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(   /[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}

function passVal2(val, filename){
   // alert(filename);
    $.get("../../PHPdata/get_data.php", { info: val, file: filename});
}