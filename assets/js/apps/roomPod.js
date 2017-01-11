define([
    'jquery',
    'handlebars',
    'apps/roomPod/row'
], function($, Hbs, Row) {
	var pod = $('.roomPod');
	var addRoom = $('.addRoom', pod);

    var handlers = new function () {
    	function add (e) {
    		var $target = $(this),
    			data = {
    				roomNo : ++pod.find('.podRow').length
    			};
    		
    		// TODO: precompilation of handlebars is causing issues. Need to handle it.

    		var row = new Row(data);
    		row.dom.insertBefore(addRoom);
    	}
    	(add)(); // an explicit IIFE -- to have one default row on initialisation

    	return {
    		add : add,
	    	done : function(e) {
	    		var $target = $(this);
	    		
	    		// TODO: validation
	    	}

    	}
    	
    };

    $('.add', pod).on('click', handlers.add);
    $('.done', pod).on('click', handlers.done);
});