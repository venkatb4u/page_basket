define([
    'jquery',
    'handlebars',
    'text!templates/roomPod/row.hbs'
], function($, Hbs, rowHbs) {
	
    var Row = function (data) {
    	var rowTemplate = Hbs.compile(rowHbs),
    		rowDOM = $(rowTemplate(data)),
    		 _ = {
			    	delete : function(e) {
			    		var $target = $(this),
				    		row = $target.closest('.podRow'),
				    		pod = $target.closest('.roomPod'),
				    		rows = pod.find('.podRow'),
				    		roomNo = row.data('roomno');
				    	roomNo !== 1 && roomNo === rows.length && row.remove(); // always can delete only the last row
				    	$('.del:disabled').last().prop('disabled', false); // enabling the last disabled item
			    		
			    	},
			    	validate : function () { // TODO: based on validation requirement

			    	},
			    	change : function (e) {
			    		var $target = $(this),
			    			row = $target.closest('.podRow'),
			    			val = +$target.val();
			    		switch($target.data('type')) {
			    			case 'adult': {
			    				// $target.val(val + ' Adult');
			    				break;
			    			}
			    			case 'child': {
			    				var $ageWrap = $('.ageWrap', row);
			    				$ageWrap.empty();
			    				if (val) {
			    					while(val--) 
			    						$('<input type="number" min="0" placeholder="0 yrs" data-type="age" />').appendTo($('.ageWrap', row)); // re-manipulating DOM to prevent using cached value
			    				}
			    				break;
			    			}
			    			case 'age': {
			    				// $target.val(val + ' yrs');
			    				break;
			    			}
			    		}

			    		console.log(val);
			    	}
		    	}
		    	rowDOM.on('click', '.del', _.delete);
		    	rowDOM.on('change', 'input[type=number]', _.change);

		    	return {
		    		dom : rowDOM
		    	}

		    };


    return Row;
});