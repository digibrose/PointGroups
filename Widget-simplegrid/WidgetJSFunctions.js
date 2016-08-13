/**
 * Created by digibrose on 25/06/2016.
 */
var Q= 0;
var cp = [];
var ct = [];
var PGT = getUrlVars()["PG"];

window.onload = function() {
    //code to setup page
    //code to set image background and correct position values and types
    var xmlDoc = getXML("questions.xml");
    var PG = xmlDoc.getElementsByTagName("Number");
    var bImage = "";
 //   alert(PGT);

    for (z=0;z<PG.length;z++){
        //  alert(PG[z].firstChild.nodeValue);
        if (PG[z].firstChild.nodeValue == PGT){
            bImage = PG[z].getAttribute("image");
            var PGpostions = PG[z].nextElementSibling;
            var PGTypes = PGpostions.nextElementSibling;
            //   alert("test");
            //   alert(PGpostions.nodeName);
            //  alert(PGTypes.nodeName);
            var posarray = PGpostions.getElementsByTagName("pos");
            var typearray = PGTypes.getElementsByTagName("type");
            //   alert(posarray.length);
            for (y=0;y<posarray.length;y++){
                //    alert(posarray[y].firstChild.nodeValue);
                cp.push(posarray[y].firstChild.nodeValue);
                //   alert(typearray[y].firstChild.nodeValue);
                ct.push(typearray[y].firstChild.nodeValue);
          //      alert(ct[y]);
            }
           // code to setup a sprite when point of inversion present
            var initialpos = PGTypes.nextElementSibling;
          //  alert(initialpos);
            if(initialpos != null){
                objectDropper(initialpos.firstChild.nodeValue);
            }
        }
    }
    document.getElementById("div1").style.backgroundImage = "url(" + bImage + ")";
    //code to setup the arrays


}

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
    oD.ID = "oD";
    oD.name = "plus";
    oD.class = "centered";
    oD.src = "../DragImages/Inkplus.svg";
    oD.draggable = "false";
    var gridlist = document.getElementById("div1").children;

    for(j=0;j<gridlist.length;j++){
        if(gridlist[j].ID == "div_" + inum){
            //  alert(gridlist[j].ID);
            gridlist[j].appendChild(oD);
            //   alert(oD.class);
            oD.style = "top: 50%; left:  50%; margin-top: -30px; margin-left: -19px; float:left;";
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
    ev.preventDefault();
    var data=ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "div_" + new Date().getTime().toString();
    nodeCopy.class = "centered";

//code to drop a sprite into the trash
    if (ev.target == document.getElementById("trash")) {
        if (document.getElementById(data).parentNode.id != "div3") {
            var img = document.getElementById(data);
            img.parentNode.removeChild(img);
        }
    }
    //code to drop initial sprites
    else if(document.getElementById(data).parentNode.id == "div3"){
        ev.target.appendChild(nodeCopy);
        //code to swap images if dropping on an already present sprite
        if(ev.target.class == "centered"){
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
    else if(ev.target.className == "div4" || "centered"){
        var img = document.getElementById(data);
        ev.target.appendChild(nodeCopy);
        if(ev.target.className == "centered") {
            if ((ev.target.name == "minus" && nodeCopy.name == "InversePlus") ||
                ev.target.name == "InversePlus" && nodeCopy.name == "minus") {
                ev.target.src = "../DragImages/Inkinverseplus-minus.svg";
                ev.target.name = "InversePlus-Minus";
            }
            else if ((ev.target.name == "plus" && nodeCopy.name == "InverseMinus") ||
                ev.target.name == "InverseMinus" && nodeCopy.name == "plus") {
                ev.target.src = "../DragImages/Inkinverseminus-plus.svg";
                ev.target.name = "InverseMinus-Plus";
            }
        }
          //  else {
          //      alert("You can't do that");
          //  }
        img.parentNode.removeChild(img);
    }
}

function gridsetup(){

    var onclick = function(num){return function(){alert(num.ID)}};

    for (i = 1; i < 1281; i++) {
        var divadd = document.createElement("div");
        divadd.ID = "div_" + i;
        divadd.className = "div4";
        divadd.style = "float: left";
        divadd.onclick = onclick(divadd);
        document.getElementById("div1").appendChild(divadd);
    }
}

function getXML(myurl) {
    var xhr = $.ajax({
        url:      myurl,
        datatype: "xml",
        async:    false
    });
    return xhr.responseXML;
}

function check(){
    var boxes = document.getElementById("div1").children;
    var correctbox = [];
    cp.forEach(function(item){correctbox.push(parseInt(item))});
    var correcttypes = ct;


    //Code to Calculate Whether Correct number of Sprites Present
    var spritecounter = 0;
    for (k=0;k<boxes.length;k++){
        if(boxes[k].hasChildNodes()){
            var add = boxes[k].children.length;
            spritecounter = spritecounter + add;
        }
    }
    if(correctbox.length == spritecounter){
        alert("You got the correct number");
    }
    else{
        alert("wrong number, there should be " + correctbox.length + " objects created in this point group");
    }


    //Code to check whether each correct position has a sprite
    var PosCheckerArray = [];
    var val = 0;
    for (var i = 0; i<correctbox.length; i++){
        val = correctbox[i];
      //  boxes[val-1].style.backgroundColor = "black";
        if (boxes[val-1].hasChildNodes()){
            PosCheckerArray.push(true);
        }
    //    alert(PosCheckerArray.length);
    }
    var positionCor = false;
        if (PosCheckerArray.length == correctbox.length){
            positionCor = true;
        }
    if (positionCor) {
        alert("You got the right positons");
    }

    //Code to see if positions are nearly correct

    var closepositions = [];
    for (l=0;l<correctbox.length;l++){
        closepositions.push(correctbox[l]);
        closepositions.push(correctbox[l] +1, correctbox[l] -1);
        closepositions.push(correctbox[l] - 41, correctbox[l] - 40, correctbox[l] - 39);
        closepositions.push(correctbox[l] + 39, correctbox[l] + 40, correctbox[l] + 41);
    }
    if(correctbox.length == spritecounter && !positionCor){
        var closeCheckerArray = [];
        var val2 = 0;
        for (var m = 0; m<closepositions.length; m++){
            val2 = closepositions[m];
         //   boxes[val2-1].style.backgroundColor = "black";
            if (boxes[val2-1].hasChildNodes()){
                closeCheckerArray.push(true);
            }
        }
        var corr2 = 0;
        for (n = 0; n <closeCheckerArray.length; n++){
            if (closeCheckerArray[n] == true){
                corr2 ++;
            }
        }
        if (corr2 == correctbox.length) {
            alert("Your positions are nearly correct here are some markers to help");
            for (r = 0; r<correctbox.length;r++){
                boxes[correctbox[r]-1].style.backgroundColor = "grey";
            }
        }
        else {
            alert("You seem a bit off on the positioning here are some markers to help");
            for (r = 0; r<correctbox.length;r++){
                boxes[correctbox[r]-1].style.backgroundColor = "grey";
            }
        }
    }

    //Code to see if the sprites are correct

    if(correctbox.length == spritecounter && positionCor){
        var val3 = "";
        var typeCheckerArray = [];
        for (o=0;o<correcttypes.length;o++){
            val3 = correcttypes[o];
            if(boxes[correctbox[o]-1].children[0].name == val3){
                typeCheckerArray.push(true);
            }
        }
        var corr3 = 0;
        for (p= 0;p<typeCheckerArray.length;p++){
            if (typeCheckerArray[p] == true){
                corr3++;
            }
        }
        if(corr3 != correcttypes.length){
            alert("check your types");
        }
        else {alert("You got your types right");}
    }
}
