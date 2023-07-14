;(function ( $, window, document, undefined ) {
 
    "use strict";
 
    var
    pluginName = "banner",
    defaults = {
        speed: 2000,
        delay: 2000
    },
    _;
 
    function Plugin ( element, options ) {
        _ = this;
        _.banner = $( element );
        _.wrapper = _.banner.find("#wrapper");
        _.slides = _.banner.find(".slide");
        _.count = _.slides.size();
        _.w = _.banner.width();
        _.h = _.banner.height();
        _.settings = $.extend( {}, defaults, options );
        _.init();
    }
 
    $.extend(Plugin.prototype, {
        init: function () {
            _.setDimensions();
            _.play();
        },
        setDimensions: function () {
            _.wrapper.css("width", _.count * _.w);
            _.slides.css("width", _.w);
        },
        play: function () {
            window.setTimeout( function () {
                _.transition();
                _.play();
            }, _.settings.delay + _.settings.speed);
        },
        transition: function () {
 
            var value = "-=" + _.w + "px";
 
            if ( _.wrapper.position().left <= - ( _.w * ( _.count - 1 ))) {
                value = 0;
            }
 
            _.wrapper.animate({
                left: value
            }, _.speed);
        }
    });
 
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };
 
})( jQuery, window, document );
 
// ------------------------------
 
(function ( $ ) {
    $(function () {
        $("#banner").banner({
            speed: 2500,
            delay: 2000
        });
    });
})( jQuery );