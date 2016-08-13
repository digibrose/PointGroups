/**
 * Created by digibrose on 17/06/2016.
 */
(function() {

    "use strict";

    var taskItems = document.querySelectorAll(".task");
    var menu = document.querySelector("#context-menu");
    var menuState = 0;
    var active = "context-menu--active";

    for ( var i = 0, len = taskItems.length; i < len; i++ ) {
        var taskItem = taskItems[i];
        contextMenuListener(taskItem);
    }

    function contextMenuListener(el) {
        el.addEventListener( "contextmenu", function(e) {
            e.preventDefault();
            console.log(e, el);
            toggleMenuOn();
        });
    }

    function toggleMenuOn() {
        if ( menuState !== 1 ) {
            menuState = 1;
            menu.classList.add(active);
        }
    }

})();