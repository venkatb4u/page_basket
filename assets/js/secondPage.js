'use strict';

require(["config"], function() {
    require(['jquery', 'globals'], // Dependencies declared here would ALONE be loaded for 'secondPage', hence the network load is very less. (page loads much faster)
        function($, g) {
            // secondPage relevant code can reside here.
        });
});