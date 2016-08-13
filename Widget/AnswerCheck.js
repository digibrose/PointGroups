/**
 * Created by digibrose on 27/06/2016.
 */

function check(){
    var boxes = document.getElementById("div1").children;
    var correctbox = [];
    cp.forEach(function(item){correctbox.push(parseInt(item))});
    var correcttypes = ct;


    //Code to Calculate Whether Correct number of Sprites Present
    var spritecounter = 0;
    for (k = 0; k < boxes.length; k++) {
        if (boxes[k].hasChildNodes()) {
            var add = boxes[k].children.length;
       //     alert(boxes[k].childNodes[0].name);
            if (boxes[k].childNodes[0].name === "InverseMinus-Plus" || boxes[k].childNodes[0].name === "InversePlus-Minus"){
                add =2;
            }
            spritecounter = spritecounter + add;
        }
    }
    if (latFlag == "") {
        if (spnum == spritecounter) {
            alert("You got the correct number");
            passVal2("PUID: "+PGT+", Result: correct number chosen, , , ," + Date.now() + "\n", logfile);
        }
        else {
            alert("wrong number, there should be " + spnum + " objects created in this point group, you have "+spritecounter+ ". Try adding the correct number.");
            passVal2("PUID: "+PGT+", Result: wrong number chosen, , , ," + Date.now() + "\n", logfile);
        }
    } //code to give some lattice feedback
    else {
        if (spritecounter == 10) {
            alert("You've placed the correct amount do you see the pattern?");
            passVal2("PUID: "+PGT+", Result: correct number chosen, , , ," + Date.now() + "\n", logfile);
        }
        else if (spritecounter < 10) {
        alert("try a couple more");
            passVal2("PUID: "+PGT+", Result: wrong number chosen, , , ," + Date.now() + "\n", logfile);
        }
    }


    //Code to check whether each correct position has a sprite
    var PosChecker = 0;

    var val = 0;
    for (var i = 0; i < correctbox.length; i++) {
        val = correctbox[i];
        if (boxes[val - 1].hasChildNodes()) {
            PosChecker = PosChecker + 1;
        }
    }
  //  alert(PosChecker);
    if (latFlag== "") {
    var positionCor = false;
    if (PosChecker == correctbox.length && spritecounter == spnum) {
        positionCor = true;
    }
    if (positionCor) {
        alert("You got the right positons");
        passVal2("PUID: "+PGT+ ", Result: correct positions chosen, , , ," + Date.now() + "\n", logfile);
    }

    //Code to see if positions are nearly correct

    var closepositions = [];
    for (l = 0; l < correctbox.length; l++) {
        closepositions.push(correctbox[l]);
        closepositions.push(correctbox[l] + 1, correctbox[l] - 1);
        closepositions.push(correctbox[l] - 41, correctbox[l] - 40, correctbox[l] - 39);
        closepositions.push(correctbox[l] + 39, correctbox[l] + 40, correctbox[l] + 41);
    }
    if (spnum == spritecounter && !positionCor) {
        var closeCheckerArray = [];
        var val2 = 0;
        for (var m = 0; m < closepositions.length; m++) {
            val2 = closepositions[m];
            //   boxes[val2-1].style.backgroundColor = "black";
            if (boxes[val2 - 1].hasChildNodes()) {
                closeCheckerArray.push(true);
            }
        }
        var corr2 = 0;
        for (n = 0; n < closeCheckerArray.length; n++) {
            if (closeCheckerArray[n] == true) {
                corr2++;
            }
        }
        if (corr2 == spnum) {
            alert("Your positions are nearly correct. Here are some markers, correct your mistakes and press 'Result' again");
            passVal2("PUID: "+PGT+", Result: positions nearly correct, , , ," + Date.now() + "\n", logfile);
            for (r = 0; r < correctbox.length; r++) {
                boxes[correctbox[r] - 1].style.backgroundColor = "grey";
            }
        }
        else {
            alert("You seem a bit off on the positioning. Here are some markers, correct your mistakes and press 'Result' again");
            passVal2("PUID: "+PGT+", Result: positions wrong, , , ," + Date.now() + "\n", logfile);
            for (r = 0; r < correctbox.length; r++) {
                boxes[correctbox[r] - 1].style.backgroundColor = "grey";
            }
        }
    }

    //Code to see if the sprites are correct

    if (spnum == spritecounter && positionCor) {
        var val3 = "";
        var typeCheckerArray = [];
        for (o = 0; o < correcttypes.length; o++) {
            val3 = correcttypes[o];
            if (boxes[correctbox[o] - 1].children[0].name == val3) {
                typeCheckerArray.push(true);
            }
        }
        var corr3 = 0;
        for (p = 0; p < typeCheckerArray.length; p++) {
            if (typeCheckerArray[p] == true) {
                corr3++;
            }
        }
        if (corr3 != correcttypes.length) {
            alert("Your object types are incorrect try to see which ones are wrong and press 'Return' again .");
            passVal2("PUID: "+PGT+", Result: types wrong, , , , " + Date.now() + "\n", logfile);
        }
        else {
            alert("You got your types right. Press Return to go to the main page.");
            passVal2("PUID:"+PGT+", Result: Type correct, , , ," + Date.now() + "\n", logfile);
            if (im2!=null){
                alert("There are extra symmetry elements produced by the previous operations click to see them");
                document.getElementById("div1").style.backgroundImage = "url(" + im2 + ")";
            }
        }
    }
}
    //extra code to give some feedback for the lattice questions
    else {
     //   alert(PosChecker);
        if(PGT=="Hlat") {
            var LpositionCor = false;
            if (PosChecker == 10) {
                LpositionCor = true;
            }
            if (LpositionCor) {
                alert("You got the correct Lattice Positions here's a few more");
                passVal2("Result: Lattice Positions correct, PUID: "+PGT+ ", " + Date.now() + "\n", logfile);
                for (r = 0; r < correctbox.length; r++) {
                    boxes[correctbox[r] - 1].style.backgroundColor = "grey";
                }
            }
            else {
                alert("Your positions seem a bit off here are some markers to help, do you see the pattern?");
                passVal2("Result: Lattice positions incorrect, PUID: "+PGT+ ", " + Date.now() + "\n", logfile);
                    for (r = 0; r < correctbox.length; r++) {
                    boxes[correctbox[r] - 1].style.backgroundColor = "grey";
                }
            }
        }
        else{alert("As you can see it isn't possible to create a lattice with 5 fold symmetry");
            passVal2("Result: 5 fold Lattice complete, PUID: "+PGT+ ", " + Date.now() + "\n", logfile);
        }
}

}