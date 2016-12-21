'use strict';

require(["config"], function() {
    require(['jquery'], // Dependencies declared here would ALONE be loaded for 'firstPage', hence the network load is very less. (page loads much faster)
        function($) {
            // firstPage relevant code can reside here.
            console.log('firstPage.js - look at the Sources section in browsers dev tool.');
        });
});