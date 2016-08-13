/**
 * Created by digibrose on 20/07/2016.
 */
//var fileend="PG=3&file=testname";
var login = "";



window.onload = function(){

    var eventCount = 0;
    var eventProperty = [];

    var TrackMouse = function (mouseEvent) {

        passVal("Element id: " + mouseEvent.toElement.id + ", , X: " + mouseEvent.x + ", Y: " + mouseEvent.y + ", " + mouseEvent + ", " + Date.now() + "\n", login);
    };

    document.addEventListener("click", TrackMouse);
 //   document.addEventListener("mousedown", TrackMouse);
    document.addEventListener("dragstart", TrackMouse);
    document.addEventListener("dragend", TrackMouse);

   // document.getElementById("mainiframe").src = "Widget.html?" + fileend;

    $(document).ready(function() {
        $("#instructions").click(function () {
            $("#instructions").slideToggle("slow");
        });
    });

};

function passVal(val, filename){
    $.get("../PHPdata/get_data.php", { info: val, file: filename });
}

function loginpage(showhide){
    if(showhide == "show"){
        document.getElementById('popupbox').style.visibility="visible";
    }else if(showhide == "hide"){
        document.getElementById('popupbox').style.visibility="hidden";
    }
    login = document.getElementById("username").value;
//    fileend = "PG=3&login=" + login;
    flipLink();
    fillDiv("mainblock","../WebPagesStripped/Intro.html");
 //   document.getElementById("mainiframe").src = "Widget.html?" + fileend;
}

function getXML(myUrl) {
    var xhr = $.ajax({
        url:      myUrl,
        datatype: "html",
        async:    false
    });
    return xhr.responseXML;
}

//code to flip links
function flipLink() {
    if (document.getElementById("testoption").value == "B") {
        document.getElementById("menui").onclick = function(){fillDiv("mainblock","../WebPagesStripped/Intro.html");};
        document.getElementById("menu1").onclick = function(){fillDiv("mainblock","../WebPagesStripped/RotStripped.html");};
        document.getElementById("menu2").onclick = function(){fillDiv("mainblock","../WebPagesStripped/CombSymElstripped.html");};
        document.getElementById("menu3").onclick = function(){fillDiv("mainblock","../WebPagesStripped/SteProjstripped.html");};
        document.getElementById("menu4").onclick = function(){fillDiv("mainblock","../WebPagesStripped/DifSymStripped.html");};
    }
    else{
        document.getElementById("menui").onclick = function(){fillDiv("mainblock","../WebPagesStripped/Intro.html");};
        document.getElementById("menu1").onclick = function(){fillDiv("mainblock","../WebPagesOld/RotstrippedO.html");};
        document.getElementById("menu2").onclick = function(){fillDiv("mainblock","../WebPagesOld/CombSymElstrippedO.html");};
        document.getElementById("menu3").onclick = function(){fillDiv("mainblock","../WebPagesOld/SteProjstrippedO.html");};
        document.getElementById("menu4").onclick = function(){fillDiv("mainblock","../WebPagesOld/DifSymStrippedO.html");};
    }
}


//function to insert correct section

function fillDiv(EDiv, url) {
    $("#"+EDiv).load(url);
}

//function loadIframe(page){
//    var MIframe = document.getElementById("mainiframe");
//    MIframe.src = page;
//}

//function changeInvIframe(){
//    var IIframe = document.getElementById("2fold");
//    IIframe.visibility = visible;
//}




