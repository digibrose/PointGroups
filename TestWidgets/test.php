<!DOCTYPE HTML>
<html>
<head>
    <style>
        #div1 {width:350px;height:70px;padding:10px;border:1px solid #aaaaaa;}
        #div2 {width:70px;height:350px;padding:10px;border:1px solid #aaaaaa;}
        #div3 {width:70px;height:70px;border:1px solid #aaaaaa;}
        #div4 {width:100px;height:100px;border:1px solid #aa0000}
    </style>
    <script>


   //     var test = <?php $_Get['Question'] ?>
   //     document.write("<em>$test</em>: ", document.title);


        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

//        function drop(ev) {
//            ev.preventDefault();
//            var data = ev.dataTransfer.getData("text");
//            ev.target.appendChild(document.getElementById(data));
//        }

        function drop(ev) {
            ev.preventDefault();
            var data=ev.dataTransfer.getData("text/html");
            /* If you use DOM manipulation functions, their default behaviour it not to
             copy but to alter and move elements. By appending a ".cloneNode(true)",
             you will not move the original element, but create a copy. */
            var nodeCopy = document.getElementById(data).cloneNode(true);
            nodeCopy.id = "newId"; /* We cannot use the same ID */
            ev.target.appendChild(nodeCopy);
        }

        function bindrop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var img = document.getElementById(data);
            img.parentNode.removeChild(img);
        }
    </script>
</head>
<body>

<p>Drag the W3Schools image into the rectangle:</p>

<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<br>
<div id="div2" ondrop="drop(event)">
    <div id="div3" ondrop="drop(event)">
<img id="drag1" src="2fold.png" draggable="true" ondragstart="drag(event)" width="70" height="70">
</div>
    </div>
</body>
<div id="div4" ondrop="drop(event)" ondragover="allowDrop(event)">

</div>
</html>
