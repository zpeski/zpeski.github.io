
(function ($) {
  Drupal.behaviors.choices = {
    attach: function (context) {
      $('.entity-pollim input.choice', context).click(function() {
        var $this = $(this);
        var $container = $this.closest('.entity-pollim');
        var entityId = $this.attr('entityid');
        var url = Drupal.settings['basePath'] + "pollim/ajax/vote/" + entityId;
        var value = $this.val();
        $.cookie('pi-' + entityId, value, { expires: 31, path: '/' });
        $.post(url, {data: value}, function(response) {
          Drupal.detachBehaviors($container);
          $container.replaceWith($(response));
          processRadioButtons($('body'));
        });
      });
      processRadioButtons(context);
    }
  };
  
  var processRadioButtons = function(context) {
    $('.entity-pollim input.choice', context).each(function() {
        var $this = $(this);
        if ($this.attr('entityid')) {
          $this.css('visibility', 'visible');
          var $container = $this.closest('.entity-pollim');
          var cookieVal = $.cookie('pi-' + $this.attr('entityid'));
          
          if (cookieVal) {
            $container.addClass('voted');
            $this.attr('disabled', 'disabled');
            $('input.choice[value=' +cookieVal+ ']', $this.closest('.entity-pollim')).attr('checked', 'checked');
          }
        }
    });
  }
  
      
})(jQuery);
;
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};;
