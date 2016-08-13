/**
 * Created by digibrose on 20/07/2016.
 */
function loadIframe(page){
    var MIframe = document.getElementById("mainiframe");
    MIframe.src = page;
}

function changeInvIframe(){
    //var IIframe = document.getElementById("2fold");
    //IIframe.style.visibility = "visible";
    //IIframe.style.position = "relative"
   // alert("test");


}



window.onload = function(){
    //    $('body').on("click mousedown dragstart dragend",function(e){
//        console.log(e);
//    });

    var eventCount = 0;
    var eventProperty = [];

    var TrackMouse = function (mouseEvent) {
        eventProperty[eventCount++] = {
            id: mouseEvent.toElement.id,
            type: 'mouse',
            ts: Date.now(),
            x: mouseEvent.x,
            y: mouseEvent.y
        };

        console.log("Element id: " + eventProperty[eventCount - 1].id + ", X: " + mouseEvent.x + ", Y: " + mouseEvent.y + " " + mouseEvent + "\n");
    };

    document.addEventListener("click", TrackMouse);
    document.addEventListener("mousedown", TrackMouse);
    document.addEventListener("dragstart", TrackMouse);
    document.addEventListener("dragend", TrackMouse);
}