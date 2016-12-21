// A simple runtime configuration file.  
require.config({
    paths: {
        jquery: './vendors/jquery-3.1.1.min',     
        handlebars: './vendors/handlebars-v4.0.5',
        bootstrap: './vendors/bootstrap-3.3.7.min',      
        globals:'globals',
        text: './vendors/requireLibs/text-2.0.15'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        bootstrap :{
            deps: [
                'jquery'
            ],
            exports: 'Bootstrap'
        }

    }
});

