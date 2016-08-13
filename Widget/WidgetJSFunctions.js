/**
 * Created by digibrose on 25/06/2016.
 */
var Q= 0;
var cp = [];
var ct = [];
var PGT = getUrlVars()["PG"];
var logfile = getUrlVars()["login"];
var latFlag = "";
var spnum = 0;
var im2;

window.onload = function() {
    //code to setup page
    //code to set image background and correct position values and types

    var xmlDoc = getXML("questions.xml");
    var PG = xmlDoc.getElementsByTagName("Number");
    var bImage = "";
    for (z=0;z<PG.length;z++){
        if (PG[z].firstChild.nodeValue == PGT) {
            bImage = PG[z].getAttribute("image");
            im2 = PG[z].getAttribute("im2");
            var PGpostions = PG[z].nextElementSibling;
            spnum = parseInt(PGpostions.getAttribute("num"));
            var PGTypes = PGpostions.nextElementSibling;
            var posarray = PGpostions.getElementsByTagName("pos");
            var typearray = PGTypes.getElementsByTagName("type");
            for (y = 0; y < posarray.length; y++) {
                cp.push(posarray[y].firstChild.nodeValue);
                //correction to deal with the lattice tasks
                if (typearray.length != 0) {
                    ct.push(typearray[y].firstChild.nodeValue);
                }
            }
            // code to setup a sprite initialy
            var initialpos = PGTypes.nextElementSibling;
            // code to setup latflag
            if (initialpos != null && initialpos.firstChild != null) {
                objectDropper(initialpos.firstChild.nodeValue);
            }
            // code to read lattice flag if present
            if (initialpos != null) {
            var LF = initialpos.nextElementSibling;
            if (LF != null) {
                latFlag = LF.firstChild.nodeValue;
                latshift();
            }
        }

        }
    }
    //place background image
    document.getElementById("div1").style.backgroundImage = "url(" + bImage + ")";

    //code to setup muse data to be recorded
    var eventCount = 0;
    var eventProperty = [];

    var TrackMouse = function (mouseEvent) {
        //eventProperty[eventCount++] = {
        //    id: mouseEvent.toElement.id,
        //    type: 'mouse',
        //    ts: Date.now(),
        //    x: mouseEvent.x,
        //    y: mouseEvent.y
        //};
       passVal2("Element id: " + mouseEvent.toElement.id + ", , X: " + mouseEvent.x + ", Y: " + mouseEvent.y + ", " + mouseEvent + ", " + Date.now() + "\n", logfile);
    };

 //   document.addEventListener("click", TrackMouse);
    document.addEventListener("mousedown", TrackMouse);
    document.addEventListener("dragstart", TrackMouse);
    document.addEventListener("dragend", TrackMouse);

    $(document).ready(function(){
        $("#proc").click(function(){
            check('#Div1');
        });
    });

};
//function to change setup for the lattice cases
function latshift(){
    document.getElementById("drag1").src = "../DragImages/basic.svg";
    for (i=2;i<=4;i++) {
        elem = document.getElementById("drag" + i);
        elem.parentNode.removeChild(elem);
    }
}

//function to pass data to PHP file
function passVal2(val, filename){
    $.get("../PHPdata/get_data.php", { info: val, file: filename});
}

//function to get query string values
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(   /[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}


//function to place a sprite on the backdrop initially to help with the image swapping
function objectDropper(inum) {

    var oD = document.createElement("img");

    oD.name = "plus";
    oD.class = "sprite";
    oD.src = "../DragImages/Inkplus.svg";
    var gridlist = document.getElementById("div1").children;

    for(j=0;j<gridlist.length;j++){
        if(gridlist[j].ID == "div_" + inum){
            gridlist[j].appendChild(oD);
            oD.style = "top: 50%; left:  50%; margin-top: -30px; margin-left: -19px; float:left;";
            oD.id = "oD";
            oD.draggable = "true";
            oD.ondragstart = function(){drag(event)};
        }
    }
}

//functions to implement the drag and drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {
    //code to reset zindex on moving
    var stuff = document.getElementsByClassName("div4low");
    if(stuff.length>0) {
        stuff[0].className = "div4";
    }
    ev.preventDefault();
    var data=ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "div_" + new Date().getTime().toString();
    nodeCopy.class = "sprite";

//code to drop a sprite into the trash
    if (ev.target == document.getElementById("trash")) {
        if(data == "oD"){oD.src = "../DragImages/Inkplus.svg"; oD.name="plus"}
        else if (document.getElementById(data).parentNode.id != "div3") {
            var img = document.getElementById(data);
            img.parentNode.removeChild(img);
        }
    }
    //code to drop initial sprites
    else if(document.getElementById(data).parentNode.id == "div3"){
        ev.target.appendChild(nodeCopy);
        if (ev.target.className == "div4") {
            ev.target.className = "div4low";
        }
        //code to swap images if dropping on an already present sprite
        if(ev.target.class == "sprite"){
            ev.target.parentNode.className= "div4low";
            if ((ev.target.name == "minus" && nodeCopy.name == "InversePlus")||
                ev.target.name == "InversePlus" && nodeCopy.name == "minus") {
                ev.target.src = "../DragImages/Inkinverseplus-minus.svg";
                ev.target.name = "InversePlus-Minus";
            }
            else if ((ev.target.name == "plus" && nodeCopy.name == "InverseMinus")||
                ev.target.name == "InverseMinus" && nodeCopy.name == "plus") {
                ev.target.src = "../DragImages/Inkinverseminus-plus.svg";
                ev.target.name = "InverseMinus-Plus";

            }
            else {
                alert("You can't do that");
            }
        }
    }
    //code to move sprites
    else if(ev.target.class == "div4" || "sprite" && data != "oD"){
        var img = document.getElementById(data);
        if (ev.target.className == "div4") {
            ev.target.className = "div4low";
        }
        ev.target.appendChild(nodeCopy);
        //code to change images if needed for inversions
        if(ev.target.class == "sprite") {
            ev.target.parentNode.className= "div4low";
            if ((ev.target.name == "minus" && nodeCopy.name == "InversePlus") ||
                ev.target.name == "InversePlus" && nodeCopy.name == "minus") {
                ev.target.src = "../DragImages/Inkinverseplus-minus.svg";
                ev.target.name = "InversePlus-Minus";
                img.parentNode.removeChild(img);
            }
            else if ((ev.target.name == "plus" && nodeCopy.name == "InverseMinus") ||
                ev.target.name == "InverseMinus" && nodeCopy.name == "plus") {
                ev.target.src = "../DragImages/Inkinverseminus-plus.svg";
                ev.target.name = "InverseMinus-Plus";
                img.parentNode.removeChild(img);
            }
        }
        //allows image to be dropped on itself
        else  {
            img.parentNode.removeChild(img);
        }
    }
}

//function to setup the grid

function gridsetup(){

    var onclick = function(num){return function(){alert(num.ID)}};
    var gx =10;
    var gy = 9;
    for (i = 1; i < 1281; i++) {
        var divadd = document.createElement("div");
        divadd.ID = "div_" + i;
        divadd.className = "div4";
        divadd.style = "width:11px;height:11px;float: left; position: absolute; top: " + gx + "px; left: " + gy + "px;border:1px solid rgba(100, 100, 100, 0.3);background-color:rgba(255,255,255,0.0);";
        divadd.zIndex = 10;
     //   divadd.onclick = onclick(divadd);
        document.getElementById("div1").appendChild(divadd);
        gy = gy + 12;
        if (gy > 485) {
            gy = 9;
            gx = gx + 12;
        }
    }
}

//function to retieve data from XML file

function getXML(myurl) {
    var xhr = $.ajax({
        url:      myurl,
        datatype: "xml",
        async:    false
    });
    return xhr.responseXML;
}


