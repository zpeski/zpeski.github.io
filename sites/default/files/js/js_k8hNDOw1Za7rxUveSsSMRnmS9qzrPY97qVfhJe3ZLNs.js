(function ($) {

/**
 * Attaches language support to the jQuery UI datepicker component.
 */
Drupal.behaviors.localeDatepicker = {
  attach: function(context, settings) {
    // This code accesses Drupal.settings and localized strings via Drupal.t().
    // So this code should run after these are initialized. By placing it in an
    // attach behavior this is assured.
    $.datepicker.regional['drupal-locale'] = $.extend({
      closeText: Drupal.t('Done'),
      prevText: Drupal.t('Prev'),
      nextText: Drupal.t('Next'),
      currentText: Drupal.t('Today'),
      monthNames: [
        Drupal.t('January'),
        Drupal.t('February'),
        Drupal.t('March'),
        Drupal.t('April'),
        Drupal.t('May'),
        Drupal.t('June'),
        Drupal.t('July'),
        Drupal.t('August'),
        Drupal.t('September'),
        Drupal.t('October'),
        Drupal.t('November'),
        Drupal.t('December')
      ],
      monthNamesShort: [
        Drupal.t('Jan'),
        Drupal.t('Feb'),
        Drupal.t('Mar'),
        Drupal.t('Apr'),
        Drupal.t('May'),
        Drupal.t('Jun'),
        Drupal.t('Jul'),
        Drupal.t('Aug'),
        Drupal.t('Sep'),
        Drupal.t('Oct'),
        Drupal.t('Nov'),
        Drupal.t('Dec')
      ],
      dayNames: [
        Drupal.t('Sunday'),
        Drupal.t('Monday'),
        Drupal.t('Tuesday'),
        Drupal.t('Wednesday'),
        Drupal.t('Thursday'),
        Drupal.t('Friday'),
        Drupal.t('Saturday')
      ],
      dayNamesShort: [
        Drupal.t('Sun'),
        Drupal.t('Mon'),
        Drupal.t('Tue'),
        Drupal.t('Wed'),
        Drupal.t('Thu'),
        Drupal.t('Fri'),
        Drupal.t('Sat')
      ],
      dayNamesMin: [
        Drupal.t('Su'),
        Drupal.t('Mo'),
        Drupal.t('Tu'),
        Drupal.t('We'),
        Drupal.t('Th'),
        Drupal.t('Fr'),
        Drupal.t('Sa')
      ],
      dateFormat: Drupal.t('mm/dd/yy'),
      firstDay: 0,
      isRTL: 0
    }, Drupal.settings.jquery.ui.datepicker);
    $.datepicker.setDefaults($.datepicker.regional['drupal-locale']);
  }
};

})(jQuery);
;
/* http://keith-wood.name/timeEntry.html
   Time entry for jQuery v1.5.2.
   Written by Keith Wood (kbwood{at}iinet.com.au) June 2007.
   Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
   Please attribute the author if you use it. */
/* jshint ignore:start */
(function($){function TimeEntry(){this._disabledInputs=[];this.regional=[];this.regional['']={show24Hours:false,separator:':',ampmPrefix:'',ampmNames:['AM','PM'],spinnerTexts:['Now','Previous field','Next field','Increment','Decrement']};this._defaults={appendText:'',showSeconds:false,timeSteps:[1,1,1],initialField:0,noSeparatorEntry:false,useMouseWheel:true,defaultTime:null,minTime:null,maxTime:null,spinnerImage:'spinnerDefault.png',spinnerSize:[20,20,8],spinnerBigImage:'',spinnerBigSize:[40,40,16],spinnerIncDecOnly:false,spinnerRepeat:[500,250],beforeShow:null,beforeSetTime:null};$.extend(this._defaults,this.regional[''])}$.extend(TimeEntry.prototype,{markerClassName:'hasTimeEntry',propertyName:'timeEntry',_appendClass:'timeEntry_append',_controlClass:'timeEntry_control',_expandClass:'timeEntry_expand',setDefaults:function(a){$.extend(this._defaults,a||{});return this},_attachPlugin:function(b,c){var d=$(b);if(d.hasClass(this.markerClassName)){return}var e={options:$.extend({},this._defaults,c),input:d,_field:0,_selectedHour:0,_selectedMinute:0,_selectedSecond:0};d.data(this.propertyName,e).addClass(this.markerClassName).bind('focus.'+this.propertyName,this._doFocus).bind('blur.'+this.propertyName,this._doBlur).bind('click.'+this.propertyName,this._doClick).bind('keydown.'+this.propertyName,this._doKeyDown).bind('keypress.'+this.propertyName,this._doKeyPress).bind('paste.'+this.propertyName,function(a){setTimeout(function(){n._parseTime(e)},1)});this._optionPlugin(b,c)},_optionPlugin:function(a,b,c){a=$(a);var d=a.data(this.propertyName);if(!b||(typeof b=='string'&&c==null)){var e=b;b=(d||{}).options;return(b&&e?b[e]:b)}if(!a.hasClass(this.markerClassName)){return}b=b||{};if(typeof b=='string'){var e=b;b={};b[e]=c}var f=this._extractTime(d);$.extend(d.options,b);d._field=0;if(f){this._setTime(d,new Date(0,0,0,f[0],f[1],f[2]))}a.next('span.'+this._appendClass).remove();a.parent().find('span.'+this._controlClass).remove();if($.fn.mousewheel){a.unmousewheel()}var g=(!d.options.spinnerImage?null:$('<span class="'+this._controlClass+'" style="display: inline-block; '+'background: url(\''+d.options.spinnerImage+'\') 0 0 no-repeat; width: '+d.options.spinnerSize[0]+'px; height: '+d.options.spinnerSize[1]+'px;"></span>'));a.after(d.options.appendText?'<span class="'+this._appendClass+'">'+d.options.appendText+'</span>':'').after(g||'');if(d.options.useMouseWheel&&$.fn.mousewheel){a.mousewheel(this._doMouseWheel)}if(g){g.mousedown(this._handleSpinner).mouseup(this._endSpinner).mouseover(this._expandSpinner).mouseout(this._endSpinner).mousemove(this._describeSpinner)}},_enablePlugin:function(a){this._enableDisable(a,false)},_disablePlugin:function(a){this._enableDisable(a,true)},_enableDisable:function(b,c){var d=$.data(b,this.propertyName);if(!d){return}b.disabled=c;if(b.nextSibling&&b.nextSibling.nodeName.toLowerCase()=='span'){n._changeSpinner(d,b.nextSibling,(c?5:-1))}n._disabledInputs=$.map(n._disabledInputs,function(a){return(a==b?null:a)});if(c){n._disabledInputs.push(b)}},_isDisabledPlugin:function(a){return $.inArray(a,this._disabledInputs)>-1},_destroyPlugin:function(b){b=$(b);if(!b.hasClass(this.markerClassName)){return}b.removeClass(this.markerClassName).removeData(this.propertyName).unbind('.'+this.propertyName);if($.fn.mousewheel){b.unmousewheel()}this._disabledInputs=$.map(this._disabledInputs,function(a){return(a==b[0]?null:a)});b.siblings('.'+this._appendClass+',.'+this._controlClass).remove()},_setTimePlugin:function(a,b){var c=$.data(a,this.propertyName);if(c){if(b===null||b===''){c.input.val('')}else{this._setTime(c,b?(typeof b=='object'?new Date(b.getTime()):b):null)}}},_getTimePlugin:function(a){var b=$.data(a,this.propertyName);var c=(b?this._extractTime(b):null);return(!c?null:new Date(0,0,0,c[0],c[1],c[2]))},_getOffsetPlugin:function(a){var b=$.data(a,this.propertyName);var c=(b?this._extractTime(b):null);return(!c?0:(c[0]*3600+c[1]*60+c[2])*1000)},_doFocus:function(a){var b=(a.nodeName&&a.nodeName.toLowerCase()=='input'?a:this);if(n._lastInput==b||n._isDisabledPlugin(b)){n._focussed=false;return}var c=$.data(b,n.propertyName);n._focussed=true;n._lastInput=b;n._blurredInput=null;$.extend(c.options,($.isFunction(c.options.beforeShow)?c.options.beforeShow.apply(b,[b]):{}));n._parseTime(c);setTimeout(function(){n._showField(c)},10)},_doBlur:function(a){n._blurredInput=n._lastInput;n._lastInput=null},_doClick:function(b){var c=b.target;var d=$.data(c,n.propertyName);var e=d._field;if(!n._focussed){var f=d.options.separator.length+2;d._field=0;if(c.selectionStart!=null){for(var g=0;g<=Math.max(1,d._secondField,d._ampmField);g++){var h=(g!=d._ampmField?(g*f)+2:(d._ampmField*f)+d.options.ampmPrefix.length+d.options.ampmNames[0].length);d._field=g;if(c.selectionStart<h){break}}}else if(c.createTextRange){var i=$(b.srcElement);var j=c.createTextRange();var k=function(a){return{thin:2,medium:4,thick:6}[a]||a};var l=b.clientX+document.documentElement.scrollLeft-(i.offset().left+parseInt(k(i.css('border-left-width')),10))-j.offsetLeft;for(var g=0;g<=Math.max(1,d._secondField,d._ampmField);g++){var h=(g!=d._ampmField?(g*f)+2:(d._ampmField*f)+d.options.ampmPrefix.length+d.options.ampmNames[0].length);j.collapse();j.moveEnd('character',h);d._field=g;if(l<j.boundingWidth){break}}}}if(e!=d._field){d._lastChr=''}n._showField(d);n._focussed=false},_doKeyDown:function(a){if(a.keyCode>=48){return true}var b=$.data(a.target,n.propertyName);switch(a.keyCode){case 9:return(a.shiftKey?n._changeField(b,-1,true):n._changeField(b,+1,true));case 35:if(a.ctrlKey){n._setValue(b,'')}else{b._field=Math.max(1,b._secondField,b._ampmField);n._adjustField(b,0)}break;case 36:if(a.ctrlKey){n._setTime(b)}else{b._field=0;n._adjustField(b,0)}break;case 37:n._changeField(b,-1,false);break;case 38:n._adjustField(b,+1);break;case 39:n._changeField(b,+1,false);break;case 40:n._adjustField(b,-1);break;case 46:n._setValue(b,'');break;default:return true}return false},_doKeyPress:function(a){var b=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);if(b<' '){return true}var c=$.data(a.target,n.propertyName);n._handleKeyPress(c,b);return false},_doMouseWheel:function(a,b){if(n._isDisabledPlugin(a.target)){return}var c=$.data(a.target,n.propertyName);c.input.focus();if(!c.input.val()){n._parseTime(c)}n._adjustField(c,b);a.preventDefault()},_expandSpinner:function(b){var c=n._getSpinnerTarget(b);var d=$.data(n._getInput(c),n.propertyName);if(n._isDisabledPlugin(d.input[0])){return}if(d.options.spinnerBigImage){d._expanded=true;var e=$(c).offset();var f=null;$(c).parents().each(function(){var a=$(this);if(a.css('position')=='relative'||a.css('position')=='absolute'){f=a.offset()}return!f});$('<div class="'+n._expandClass+'" style="position: absolute; left: '+(e.left-(d.options.spinnerBigSize[0]-d.options.spinnerSize[0])/2-(f?f.left:0))+'px; top: '+(e.top-(d.options.spinnerBigSize[1]-d.options.spinnerSize[1])/2-(f?f.top:0))+'px; width: '+d.options.spinnerBigSize[0]+'px; height: '+d.options.spinnerBigSize[1]+'px; background: transparent url('+d.options.spinnerBigImage+') no-repeat 0px 0px; z-index: 10;"></div>').mousedown(n._handleSpinner).mouseup(n._endSpinner).mouseout(n._endExpand).mousemove(n._describeSpinner).insertAfter(c)}},_getInput:function(a){return $(a).siblings('.'+n.markerClassName)[0]},_describeSpinner:function(a){var b=n._getSpinnerTarget(a);var c=$.data(n._getInput(b),n.propertyName);b.title=c.options.spinnerTexts[n._getSpinnerRegion(c,a)]},_handleSpinner:function(a){var b=n._getSpinnerTarget(a);var c=n._getInput(b);if(n._isDisabledPlugin(c)){return}if(c==n._blurredInput){n._lastInput=c;n._blurredInput=null}var d=$.data(c,n.propertyName);n._doFocus(c);var e=n._getSpinnerRegion(d,a);n._changeSpinner(d,b,e);n._actionSpinner(d,e);n._timer=null;n._handlingSpinner=true;if(e>=3&&d.options.spinnerRepeat[0]){n._timer=setTimeout(function(){n._repeatSpinner(d,e)},d.options.spinnerRepeat[0]);$(b).one('mouseout',n._releaseSpinner).one('mouseup',n._releaseSpinner)}},_actionSpinner:function(a,b){if(!a.input.val()){n._parseTime(a)}switch(b){case 0:this._setTime(a);break;case 1:this._changeField(a,-1,false);break;case 2:this._changeField(a,+1,false);break;case 3:this._adjustField(a,+1);break;case 4:this._adjustField(a,-1);break}},_repeatSpinner:function(a,b){if(!n._timer){return}n._lastInput=n._blurredInput;this._actionSpinner(a,b);this._timer=setTimeout(function(){n._repeatSpinner(a,b)},a.options.spinnerRepeat[1])},_releaseSpinner:function(a){clearTimeout(n._timer);n._timer=null},_endExpand:function(a){n._timer=null;var b=n._getSpinnerTarget(a);var c=n._getInput(b);var d=$.data(c,n.propertyName);$(b).remove();d._expanded=false},_endSpinner:function(a){n._timer=null;var b=n._getSpinnerTarget(a);var c=n._getInput(b);var d=$.data(c,n.propertyName);if(!n._isDisabledPlugin(c)){n._changeSpinner(d,b,-1)}if(n._handlingSpinner){n._lastInput=n._blurredInput}if(n._lastInput&&n._handlingSpinner){n._showField(d)}n._handlingSpinner=false},_getSpinnerTarget:function(a){return a.target||a.srcElement},_getSpinnerRegion:function(a,b){var c=this._getSpinnerTarget(b);var d=$(c).offset();var e=[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop];var f=(a.options.spinnerIncDecOnly?99:b.clientX+e[0]-d.left);var g=b.clientY+e[1]-d.top;var h=a.options[a._expanded?'spinnerBigSize':'spinnerSize'];var i=(a.options.spinnerIncDecOnly?99:h[0]-1-f);var j=h[1]-1-g;if(h[2]>0&&Math.abs(f-i)<=h[2]&&Math.abs(g-j)<=h[2]){return 0}var k=Math.min(f,g,i,j);return(k==f?1:(k==i?2:(k==g?3:4)))},_changeSpinner:function(a,b,c){$(b).css('background-position','-'+((c+1)*a.options[a._expanded?'spinnerBigSize':'spinnerSize'][0])+'px 0px')},_parseTime:function(a){var b=this._extractTime(a);if(b){a._selectedHour=b[0];a._selectedMinute=b[1];a._selectedSecond=b[2]}else{var c=this._constrainTime(a);a._selectedHour=c[0];a._selectedMinute=c[1];a._selectedSecond=(a.options.showSeconds?c[2]:0)}a._secondField=(a.options.showSeconds?2:-1);a._ampmField=(a.options.show24Hours?-1:(a.options.showSeconds?3:2));a._lastChr='';a._field=Math.max(0,Math.min(Math.max(1,a._secondField,a._ampmField),a.options.initialField));if(a.input.val()!=''){this._showTime(a)}},_extractTime:function(a,b){b=b||a.input.val();var c=b.split(a.options.separator);if(a.options.separator==''&&b!=''){c[0]=b.substring(0,2);c[1]=b.substring(2,4);c[2]=b.substring(4,6)}if(c.length>=2){var d=!a.options.show24Hours&&(b.indexOf(a.options.ampmNames[0])>-1);var e=!a.options.show24Hours&&(b.indexOf(a.options.ampmNames[1])>-1);var f=parseInt(c[0],10);f=(isNaN(f)?0:f);f=((d||e)&&f==12?0:f)+(e?12:0);var g=parseInt(c[1],10);g=(isNaN(g)?0:g);var h=(c.length>=3?parseInt(c[2],10):0);h=(isNaN(h)||!a.options.showSeconds?0:h);return this._constrainTime(a,[f,g,h])}return null},_constrainTime:function(a,b){var c=(b!=null);if(!c){var d=this._determineTime(a.options.defaultTime,a)||new Date();b=[d.getHours(),d.getMinutes(),d.getSeconds()]}var e=false;for(var i=0;i<a.options.timeSteps.length;i++){if(e){b[i]=0}else if(a.options.timeSteps[i]>1){b[i]=Math.round(b[i]/a.options.timeSteps[i])*a.options.timeSteps[i];e=true}}return b},_showTime:function(a){var b=(this._formatNumber(a.options.show24Hours?a._selectedHour:((a._selectedHour+11)%12)+1)+a.options.separator+this._formatNumber(a._selectedMinute)+(a.options.showSeconds?a.options.separator+this._formatNumber(a._selectedSecond):'')+(a.options.show24Hours?'':a.options.ampmPrefix+a.options.ampmNames[(a._selectedHour<12?0:1)]));this._setValue(a,b);this._showField(a)},_showField:function(a){var b=a.input[0];if(a.input.is(':hidden')||n._lastInput!=b){return}var c=a.options.separator.length+2;var d=(a._field!=a._ampmField?(a._field*c):(a._ampmField*c)-a.options.separator.length+a.options.ampmPrefix.length);var e=d+(a._field!=a._ampmField?2:a.options.ampmNames[0].length);if(b.setSelectionRange){b.setSelectionRange(d,e)}else if(b.createTextRange){var f=b.createTextRange();f.moveStart('character',d);f.moveEnd('character',e-a.input.val().length);f.select()}if(!b.disabled){b.focus()}},_formatNumber:function(a){return(a<10?'0':'')+a},_setValue:function(a,b){if(b!=a.input.val()){a.input.val(b).trigger('change')}},_changeField:function(a,b,c){var d=(a.input.val()==''||a._field==(b==-1?0:Math.max(1,a._secondField,a._ampmField)));if(!d){a._field+=b}this._showField(a);a._lastChr='';return(d&&c)},_adjustField:function(a,b){if(a.input.val()==''){b=0}this._setTime(a,new Date(0,0,0,a._selectedHour+(a._field==0?b*a.options.timeSteps[0]:0)+(a._field==a._ampmField?b*12:0),a._selectedMinute+(a._field==1?b*a.options.timeSteps[1]:0),a._selectedSecond+(a._field==a._secondField?b*a.options.timeSteps[2]:0)))},_setTime:function(a,b){b=this._determineTime(b,a);var c=this._constrainTime(a,b?[b.getHours(),b.getMinutes(),b.getSeconds()]:null);b=new Date(0,0,0,c[0],c[1],c[2]);var b=this._normaliseTime(b);var d=this._normaliseTime(this._determineTime(a.options.minTime,a));var e=this._normaliseTime(this._determineTime(a.options.maxTime,a));if(d&&e&&d>e){if(b<d&&b>e){b=(Math.abs(b-d)<Math.abs(b-e)?d:e)}}else{b=(d&&b<d?d:(e&&b>e?e:b))}if($.isFunction(a.options.beforeSetTime)){b=a.options.beforeSetTime.apply(a.input[0],[this._getTimePlugin(a.input[0]),b,d,e])}a._selectedHour=b.getHours();a._selectedMinute=b.getMinutes();a._selectedSecond=b.getSeconds();this._showTime(a)},_determineTime:function(i,j){var k=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var l=function(a){var b=n._extractTime(j,a);var c=new Date();var d=(b?b[0]:c.getHours());var e=(b?b[1]:c.getMinutes());var f=(b?b[2]:c.getSeconds());if(!b){var g=/([+-]?[0-9]+)\s*(s|S|m|M|h|H)?/g;var h=g.exec(a);while(h){switch(h[2]||'s'){case's':case'S':f+=parseInt(h[1],10);break;case'm':case'M':e+=parseInt(h[1],10);break;case'h':case'H':d+=parseInt(h[1],10);break}h=g.exec(a)}}c=new Date(0,0,10,d,e,f,0);if(/^!/.test(a)){if(c.getDate()>10){c=new Date(0,0,10,23,59,59)}else if(c.getDate()<10){c=new Date(0,0,10,0,0,0)}}return c};return(i?(typeof i=='string'?l(i):(typeof i=='number'?k(i):i)):null)},_normaliseTime:function(a){if(!a){return null}a.setFullYear(1900);a.setMonth(0);a.setDate(0);return a},_handleKeyPress:function(a,b){if(b==a.options.separator){this._changeField(a,+1,false)}else if(b>='0'&&b<='9'){var c=parseInt(b,10);var d=parseInt(a._lastChr+b,10);var e=(a._field!=0?a._selectedHour:(a.options.show24Hours?(d<24?d:c):(d>=1&&d<=12?d:(c>0?c:a._selectedHour))%12+(a._selectedHour>=12?12:0)));var f=(a._field!=1?a._selectedMinute:(d<60?d:c));var g=(a._field!=a._secondField?a._selectedSecond:(d<60?d:c));var h=this._constrainTime(a,[e,f,g]);this._setTime(a,new Date(0,0,0,h[0],h[1],h[2]));if(a.options.noSeparatorEntry&&a._lastChr){this._changeField(a,+1,false)}else{a._lastChr=b}}else if(!a.options.show24Hours){b=b.toLowerCase();if((b==a.options.ampmNames[0].substring(0,1).toLowerCase()&&a._selectedHour>=12)||(b==a.options.ampmNames[1].substring(0,1).toLowerCase()&&a._selectedHour<12)){var i=a._field;a._field=a._ampmField;this._adjustField(a,+1);a._field=i;this._showField(a)}}}});var m=['getOffset','getTime','isDisabled'];function isNotChained(a,b){if(a=='option'&&(b.length==0||(b.length==1&&typeof b[0]=='string'))){return true}return $.inArray(a,m)>-1}$.fn.timeEntry=function(b){var c=Array.prototype.slice.call(arguments,1);if(isNotChained(b,c)){return n['_'+b+'Plugin'].apply(n,[this[0]].concat(c))}return this.each(function(){if(typeof b=='string'){if(!n['_'+b+'Plugin']){throw'Unknown command: '+b;}n['_'+b+'Plugin'].apply(n,[this].concat(c))}else{var a=($.fn.metadata?$(this).metadata():{});n._attachPlugin(this,$.extend({},a,b||{}))}})};var n=$.timeEntry=new TimeEntry()})(jQuery);
/* jshint ignore:end */;
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
/*!
 * jQuery Form Plugin
 * version: 4.2.1
 * Requires jQuery v1.7 or later
 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup
 * Project repository: https://github.com/jquery-form/form
 * Dual licensed under the MIT and LGPLv3 licenses.
 * https://github.com/jquery-form/form#license
 */
/* global ActiveXObject */

/* eslint-disable */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function( root, jQuery ) {
      if (typeof jQuery === 'undefined') {
        // require('jQuery') returns a factory that requires window to build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        }
        else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }

}(function ($) {
  /* eslint-enable */
  'use strict';

  /*
   Usage Note:
   -----------
   Do not use both ajaxSubmit and ajaxForm on the same form. These
   functions are mutually exclusive. Use ajaxSubmit if you want
   to bind your own submit handler to the form. For example,

   $(document).ready(function() {
   $('#myForm').on('submit', function(e) {
   e.preventDefault(); // <-- important
   $(this).ajaxSubmit({
   target: '#output'
   });
   });
   });

   Use ajaxForm when you want the plugin to manage all the event binding
   for you. For example,

   $(document).ready(function() {
   $('#myForm').ajaxForm({
   target: '#output'
   });
   });

   You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
   form does not have to exist when you invoke ajaxForm:

   $('#myForm').ajaxForm({
   delegation: true,
   target: '#output'
   });

   When using ajaxForm, the ajaxSubmit function will be invoked for you
   at the appropriate time.
   */

  var rCRLF = /\r?\n/g;

  /**
   * Feature detection
   */
  var feature = {};

  feature.fileapi = $('<input type="file">').get(0).files !== undefined;
  feature.formdata = (typeof window.FormData !== 'undefined');

  var hasProp = !!$.fn.prop;

  // attr2 uses prop when it can but checks the return type for
  // an expected string. This accounts for the case where a form
  // contains inputs with names like "action" or "method"; in those
  // cases "prop" returns the element
  $.fn.attr2 = function() {
    if (!hasProp) {
      return this.attr.apply(this, arguments);
    }

    var val = this.prop.apply(this, arguments);

    if ((val && val.jquery) || typeof val === 'string') {
      return val;
    }

    return this.attr.apply(this, arguments);
  };

  /**
   * ajaxSubmit() provides a mechanism for immediately submitting
   * an HTML form using AJAX.
   *
   * @param	{object|string}	options		jquery.form.js parameters or custom url for submission
   * @param	{object}		data		extraData
   * @param	{string}		dataType	ajax dataType
   * @param	{function}		onSuccess	ajax success callback function
   */
  $.fn.ajaxSubmit = function(options, data, dataType, onSuccess) {
    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
      log('ajaxSubmit: skipping submit process - no element selected');

      return this;
    }

    /* eslint consistent-this: ["error", "$form"] */
    var method, action, url, $form = this;

    if (typeof options === 'function') {
      options = {success: options};

    } else if (typeof options === 'string' || (options === false && arguments.length > 0)) {
      options = {
        'url'      : options,
        'data'     : data,
        'dataType' : dataType
      };

      if (typeof onSuccess === 'function') {
        options.success = onSuccess;
      }

    } else if (typeof options === 'undefined') {
      options = {};
    }

    method = options.method || options.type || this.attr2('method');
    action = options.url || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
      // clean url (don't include hash vaue)
      url = (url.match(/^([^#]+)/) || [])[1];
    }

    options = $.extend(true, {
      url       : url,
      success   : $.ajaxSettings.success,
      type      : method || $.ajaxSettings.type,
      iframeSrc : /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'		// eslint-disable-line no-script-url
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};

    this.trigger('form-pre-serialize', [this, options, veto]);

    if (veto.veto) {
      log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');

      return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
      log('ajaxSubmit: submit aborted via beforeSerialize callback');

      return this;
    }

    var traditional = options.traditional;

    if (typeof traditional === 'undefined') {
      traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements, options.filtering);

    if (options.data) {
      var optionsData = $.isFunction(options.data) ? options.data(a) : options.data;

      options.extraData = optionsData;
      qx = $.param(optionsData, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
      log('ajaxSubmit: submit aborted via beforeSubmit callback');

      return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
      log('ajaxSubmit: submit vetoed via form-submit-validate trigger');

      return this;
    }

    var q = $.param(a, traditional);

    if (qx) {
      q = (q ? (q + '&' + qx) : qx);
    }

    if (options.type.toUpperCase() === 'GET') {
      options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
      options.data = null;	// data is null for 'get'
    } else {
      options.data = q;		// data is the query string for 'post'
    }

    var callbacks = [];

    if (options.resetForm) {
      callbacks.push(function() {
        $form.resetForm();
      });
    }

    if (options.clearForm) {
      callbacks.push(function() {
        $form.clearForm(options.includeHidden);
      });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
      var oldSuccess = options.success || function(){};

      callbacks.push(function(data, textStatus, jqXHR) {
        var successArguments = arguments,
          fn = options.replaceTarget ? 'replaceWith' : 'html';

        $(options.target)[fn](data).each(function(){
          oldSuccess.apply(this, successArguments);
        });
      });

    } else if (options.success) {
      if ($.isArray(options.success)) {
        $.merge(callbacks, options.success);
      } else {
        callbacks.push(options.success);
      }
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
      var context = options.context || this;		// jQuery 1.4+ supports scope context

      for (var i = 0, max = callbacks.length; i < max; i++) {
        callbacks[i].apply(context, [data, status, xhr || $form, $form]);
      }
    };

    if (options.error) {
      var oldError = options.error;

      options.error = function(xhr, status, error) {
        var context = options.context || this;

        oldError.apply(context, [xhr, status, error, $form]);
      };
    }

    if (options.complete) {
      var oldComplete = options.complete;

      options.complete = function(xhr, status) {
        var context = options.context || this;

        oldComplete.apply(context, [xhr, status, $form]);
      };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled', this).filter(function() {
      return $(this).val() !== '';
    });
    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') === mp || $form.attr('encoding') === mp);
    var fileAPI = feature.fileapi && feature.formdata;

    log('fileAPI :' + fileAPI);

    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
      // hack to fix Safari hang (thanks to Tim Molendijk for this)
      // see: http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
      if (options.closeKeepAlive) {
        $.get(options.closeKeepAlive, function() {
          jqxhr = fileUploadIframe(a);
        });

      } else {
        jqxhr = fileUploadIframe(a);
      }

    } else if ((hasFileInputs || multipart) && fileAPI) {
      jqxhr = fileUploadXhr(a);

    } else {
      jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k = 0; k < elements.length; k++) {
      elements[k] = null;
    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);

    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData) {
      var serialized = $.param(extraData, options.traditional).split('&');
      var len = serialized.length;
      var result = [];
      var i, part;

      for (i = 0; i < len; i++) {
        // #252; undo param space replacement
        serialized[i] = serialized[i].replace(/\+/g, ' ');
        part = serialized[i].split('=');
        // #278; use array instead of object storage, favoring array serializations
        result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
      }

      return result;
    }

    // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
      var formdata = new FormData();

      for (var i = 0; i < a.length; i++) {
        formdata.append(a[i].name, a[i].value);
      }

      if (options.extraData) {
        var serializedData = deepSerialize(options.extraData);

        for (i = 0; i < serializedData.length; i++) {
          if (serializedData[i]) {
            formdata.append(serializedData[i][0], serializedData[i][1]);
          }
        }
      }

      options.data = null;

      var s = $.extend(true, {}, $.ajaxSettings, options, {
        contentType : false,
        processData : false,
        cache       : false,
        type        : method || 'POST'
      });

      if (options.uploadProgress) {
        // workaround because jqXHR does not expose upload property
        s.xhr = function() {
          var xhr = $.ajaxSettings.xhr();

          if (xhr.upload) {
            xhr.upload.addEventListener('progress', function(event) {
              var percent = 0;
              var position = event.loaded || event.position;			/* event.position is deprecated */
              var total = event.total;

              if (event.lengthComputable) {
                percent = Math.ceil(position / total * 100);
              }

              options.uploadProgress(event, position, total, percent);
            }, false);
          }

          return xhr;
        };
      }

      s.data = null;

      var beforeSend = s.beforeSend;

      s.beforeSend = function(xhr, o) {
        // Send FormData() provided by user
        if (options.formData) {
          o.data = options.formData;
        } else {
          o.data = formdata;
        }

        if (beforeSend) {
          beforeSend.call(this, xhr, o);
        }
      };

      return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
      var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
      var deferred = $.Deferred();

      // #341
      deferred.abort = function(status) {
        xhr.abort(status);
      };

      if (a) {
        // ensure that every serialized input is still enabled
        for (i = 0; i < elements.length; i++) {
          el = $(elements[i]);
          if (hasProp) {
            el.prop('disabled', false);
          } else {
            el.removeAttr('disabled');
          }
        }
      }

      s = $.extend(true, {}, $.ajaxSettings, options);
      s.context = s.context || s;
      id = 'jqFormIO' + new Date().getTime();
      var ownerDocument = form.ownerDocument;
      var $body = $form.closest('body');

      if (s.iframeTarget) {
        $io = $(s.iframeTarget, ownerDocument);
        n = $io.attr2('name');
        if (!n) {
          $io.attr2('name', id);
        } else {
          id = n;
        }

      } else {
        $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />', ownerDocument);
        $io.css({position: 'absolute', top: '-1000px', left: '-1000px'});
      }
      io = $io[0];


      xhr = { // mock object
        aborted               : 0,
        responseText          : null,
        responseXML           : null,
        status                : 0,
        statusText            : 'n/a',
        getAllResponseHeaders : function() {},
        getResponseHeader     : function() {},
        setRequestHeader      : function() {},
        abort                 : function(status) {
          var e = (status === 'timeout' ? 'timeout' : 'aborted');

          log('aborting upload... ' + e);
          this.aborted = 1;

          try { // #214, #257
            if (io.contentWindow.document.execCommand) {
              io.contentWindow.document.execCommand('Stop');
            }
          } catch (ignore) {}

          $io.attr('src', s.iframeSrc); // abort op in progress
          xhr.error = e;
          if (s.error) {
            s.error.call(s.context, xhr, e, status);
          }

          if (g) {
            $.event.trigger('ajaxError', [xhr, s, e]);
          }

          if (s.complete) {
            s.complete.call(s.context, xhr, e);
          }
        }
      };

      g = s.global;
      // trigger ajax global events so that activity/block indicators work like normal
      if (g && $.active++ === 0) {
        $.event.trigger('ajaxStart');
      }
      if (g) {
        $.event.trigger('ajaxSend', [xhr, s]);
      }

      if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
        if (s.global) {
          $.active--;
        }
        deferred.reject();

        return deferred;
      }

      if (xhr.aborted) {
        deferred.reject();

        return deferred;
      }

      // add submitting element to data if we know it
      sub = form.clk;
      if (sub) {
        n = sub.name;
        if (n && !sub.disabled) {
          s.extraData = s.extraData || {};
          s.extraData[n] = sub.value;
          if (sub.type === 'image') {
            s.extraData[n + '.x'] = form.clk_x;
            s.extraData[n + '.y'] = form.clk_y;
          }
        }
      }

      var CLIENT_TIMEOUT_ABORT = 1;
      var SERVER_ABORT = 2;

      function getDoc(frame) {
        /* it looks like contentWindow or contentDocument do not
         * carry the protocol property in ie8, when running under ssl
         * frame.document is the only valid response document, since
         * the protocol is know but not on the other two objects. strange?
         * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
         */

        var doc = null;

        // IE8 cascading access check
        try {
          if (frame.contentWindow) {
            doc = frame.contentWindow.document;
          }
        } catch (err) {
          // IE8 access denied under ssl & missing protocol
          log('cannot get iframe.contentWindow document: ' + err);
        }

        if (doc) { // successful getting content
          return doc;
        }

        try { // simply checking may throw in ie8 under ssl or mismatched protocol
          doc = frame.contentDocument ? frame.contentDocument : frame.document;
        } catch (err) {
          // last attempt
          log('cannot get iframe.contentDocument: ' + err);
          doc = frame.document;
        }

        return doc;
      }

      // Rails CSRF hack (thanks to Yvan Barthelemy)
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');

      if (csrf_param && csrf_token) {
        s.extraData = s.extraData || {};
        s.extraData[csrf_param] = csrf_token;
      }

      // take a breath so that pending repaints get some cpu time before the upload starts
      function doSubmit() {
        // make sure form attrs are set
        var t = $form.attr2('target'),
          a = $form.attr2('action'),
          mp = 'multipart/form-data',
          et = $form.attr('enctype') || $form.attr('encoding') || mp;

        // update form attrs in IE friendly way
        form.setAttribute('target', id);
        if (!method || /post/i.test(method)) {
          form.setAttribute('method', 'POST');
        }
        if (a !== s.url) {
          form.setAttribute('action', s.url);
        }

        // ie borks in some cases when setting encoding
        if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
          $form.attr({
            encoding : 'multipart/form-data',
            enctype  : 'multipart/form-data'
          });
        }

        // support timout
        if (s.timeout) {
          timeoutHandle = setTimeout(function() {
            timedOut = true; cb(CLIENT_TIMEOUT_ABORT);
          }, s.timeout);
        }

        // look for server aborts
        function checkState() {
          try {
            var state = getDoc(io).readyState;

            log('state = ' + state);
            if (state && state.toLowerCase() === 'uninitialized') {
              setTimeout(checkState, 50);
            }

          } catch (e) {
            log('Server abort: ', e, ' (', e.name, ')');
            cb(SERVER_ABORT);				// eslint-disable-line callback-return
            if (timeoutHandle) {
              clearTimeout(timeoutHandle);
            }
            timeoutHandle = undefined;
          }
        }

        // add "extra" data to form if provided in options
        var extraInputs = [];

        try {
          if (s.extraData) {
            for (var n in s.extraData) {
              if (s.extraData.hasOwnProperty(n)) {
                // if using the $.param format that allows for multiple values with the same name
                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                  extraInputs.push(
                    $('<input type="hidden" name="' + s.extraData[n].name + '">', ownerDocument).val(s.extraData[n].value)
                      .appendTo(form)[0]);
                } else {
                  extraInputs.push(
                    $('<input type="hidden" name="' + n + '">', ownerDocument).val(s.extraData[n])
                      .appendTo(form)[0]);
                }
              }
            }
          }

          if (!s.iframeTarget) {
            // add iframe to doc and submit the form
            $io.appendTo($body);
          }

          if (io.attachEvent) {
            io.attachEvent('onload', cb);
          } else {
            io.addEventListener('load', cb, false);
          }

          setTimeout(checkState, 15);

          try {
            form.submit();

          } catch (err) {
            // just in case form has element with name/id of 'submit'
            var submitFn = document.createElement('form').submit;

            submitFn.apply(form);
          }

        } finally {
          // reset attrs and remove "extra" input elements
          form.setAttribute('action', a);
          form.setAttribute('enctype', et); // #380
          if (t) {
            form.setAttribute('target', t);
          } else {
            $form.removeAttr('target');
          }
          $(extraInputs).remove();
        }
      }

      if (s.forceSync) {
        doSubmit();
      } else {
        setTimeout(doSubmit, 10); // this lets dom updates render
      }

      var data, doc, domCheckCount = 50, callbackProcessed;

      function cb(e) {
        if (xhr.aborted || callbackProcessed) {
          return;
        }

        doc = getDoc(io);
        if (!doc) {
          log('cannot access response document');
          e = SERVER_ABORT;
        }
        if (e === CLIENT_TIMEOUT_ABORT && xhr) {
          xhr.abort('timeout');
          deferred.reject(xhr, 'timeout');

          return;

        } else if (e === SERVER_ABORT && xhr) {
          xhr.abort('server abort');
          deferred.reject(xhr, 'error', 'server abort');

          return;
        }

        if (!doc || doc.location.href === s.iframeSrc) {
          // response not received yet
          if (!timedOut) {
            return;
          }
        }

        if (io.detachEvent) {
          io.detachEvent('onload', cb);
        } else {
          io.removeEventListener('load', cb, false);
        }

        var status = 'success', errMsg;

        try {
          if (timedOut) {
            throw 'timeout';
          }

          var isXml = s.dataType === 'xml' || doc.XMLDocument || $.isXMLDoc(doc);

          log('isXml=' + isXml);

          if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
            if (--domCheckCount) {
              // in some browsers (Opera) the iframe DOM is not always traversable when
              // the onload callback fires, so we loop a bit to accommodate
              log('requeing onLoad callback, DOM not available');
              setTimeout(cb, 250);

              return;
            }
            // let this fall through because server response could be an empty document
            // log('Could not access iframe DOM after mutiple tries.');
            // throw 'DOMException: not available';
          }

          // log('response detected');
          var docRoot = doc.body ? doc.body : doc.documentElement;

          xhr.responseText = docRoot ? docRoot.innerHTML : null;
          xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
          if (isXml) {
            s.dataType = 'xml';
          }
          xhr.getResponseHeader = function(header){
            var headers = {'content-type': s.dataType};

            return headers[header.toLowerCase()];
          };
          // support for XHR 'status' & 'statusText' emulation :
          if (docRoot) {
            xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
            xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
          }

          var dt = (s.dataType || '').toLowerCase();
          var scr = /(json|script|text)/.test(dt);

          if (scr || s.textarea) {
            // see if user embedded response in textarea
            var ta = doc.getElementsByTagName('textarea')[0];

            if (ta) {
              xhr.responseText = ta.value;
              // support for XHR 'status' & 'statusText' emulation :
              xhr.status = Number(ta.getAttribute('status')) || xhr.status;
              xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;

            } else if (scr) {
              // account for browsers injecting pre around json response
              var pre = doc.getElementsByTagName('pre')[0];
              var b = doc.getElementsByTagName('body')[0];

              if (pre) {
                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
              } else if (b) {
                xhr.responseText = b.textContent ? b.textContent : b.innerText;
              }
            }

          } else if (dt === 'xml' && !xhr.responseXML && xhr.responseText) {
            xhr.responseXML = toXml(xhr.responseText);			// eslint-disable-line no-use-before-define
          }

          try {
            data = httpData(xhr, dt, s);						// eslint-disable-line no-use-before-define

          } catch (err) {
            status = 'parsererror';
            xhr.error = errMsg = (err || status);
          }

        } catch (err) {
          log('error caught: ', err);
          status = 'error';
          xhr.error = errMsg = (err || status);
        }

        if (xhr.aborted) {
          log('upload aborted');
          status = null;
        }

        if (xhr.status) { // we've set xhr.status
          status = ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) ? 'success' : 'error';
        }

        // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
        if (status === 'success') {
          if (s.success) {
            s.success.call(s.context, data, 'success', xhr);
          }

          deferred.resolve(xhr.responseText, 'success', xhr);

          if (g) {
            $.event.trigger('ajaxSuccess', [xhr, s]);
          }

        } else if (status) {
          if (typeof errMsg === 'undefined') {
            errMsg = xhr.statusText;
          }
          if (s.error) {
            s.error.call(s.context, xhr, status, errMsg);
          }
          deferred.reject(xhr, 'error', errMsg);
          if (g) {
            $.event.trigger('ajaxError', [xhr, s, errMsg]);
          }
        }

        if (g) {
          $.event.trigger('ajaxComplete', [xhr, s]);
        }

        if (g && !--$.active) {
          $.event.trigger('ajaxStop');
        }

        if (s.complete) {
          s.complete.call(s.context, xhr, status);
        }

        callbackProcessed = true;
        if (s.timeout) {
          clearTimeout(timeoutHandle);
        }

        // clean up
        setTimeout(function() {
          if (!s.iframeTarget) {
            $io.remove();
          } else { // adding else to clean up existing iframe response.
            $io.attr('src', s.iframeSrc);
          }
          xhr.responseXML = null;
        }, 100);
      }

      var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
          if (window.ActiveXObject) {
            doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(s);

          } else {
            doc = (new DOMParser()).parseFromString(s, 'text/xml');
          }

          return (doc && doc.documentElement && doc.documentElement.nodeName !== 'parsererror') ? doc : null;
        };
      var parseJSON = $.parseJSON || function(s) {
          /* jslint evil:true */
          return window['eval']('(' + s + ')');			// eslint-disable-line dot-notation
        };

      var httpData = function(xhr, type, s) { // mostly lifted from jq1.4.4

        var ct = xhr.getResponseHeader('content-type') || '',
          xml = ((type === 'xml' || !type) && ct.indexOf('xml') >= 0),
          data = xml ? xhr.responseXML : xhr.responseText;

        if (xml && data.documentElement.nodeName === 'parsererror') {
          if ($.error) {
            $.error('parsererror');
          }
        }
        if (s && s.dataFilter) {
          data = s.dataFilter(data, type);
        }
        if (typeof data === 'string') {
          if ((type === 'json' || !type) && ct.indexOf('json') >= 0) {
            data = parseJSON(data);
          } else if ((type === 'script' || !type) && ct.indexOf('javascript') >= 0) {
            $.globalEval(data);
          }
        }

        return data;
      };

      return deferred;
    }
  };

  /**
   * ajaxForm() provides a mechanism for fully automating form submission.
   *
   * The advantages of using this method instead of ajaxSubmit() are:
   *
   * 1: This method will include coordinates for <input type="image"> elements (if the element
   *	is used to submit the form).
   * 2. This method will include the submit element's name/value data (for the element that was
   *	used to submit the form).
   * 3. This method binds the submit() method to the form for you.
   *
   * The options argument for ajaxForm works exactly as it does for ajaxSubmit. ajaxForm merely
   * passes the options argument along after properly binding events for submit elements and
   * the form itself.
   */
  $.fn.ajaxForm = function(options, data, dataType, onSuccess) {
    if (typeof options === 'string' || (options === false && arguments.length > 0)) {
      options = {
        'url'      : options,
        'data'     : data,
        'dataType' : dataType
      };

      if (typeof onSuccess === 'function') {
        options.success = onSuccess;
      }
    }

    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
      var o = {s: this.selector, c: this.context};

      if (!$.isReady && o.s) {
        log('DOM not ready, queuing ajaxForm');
        $(function() {
          $(o.s, o.c).ajaxForm(options);
        });

        return this;
      }

      // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
      log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));

      return this;
    }

    if (options.delegation) {
      $(document)
        .off('submit.form-plugin', this.selector, doAjaxSubmit)
        .off('click.form-plugin', this.selector, captureSubmittingElement)
        .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
        .on('click.form-plugin', this.selector, options, captureSubmittingElement);

      return this;
    }

    return this.ajaxFormUnbind()
      .on('submit.form-plugin', options, doAjaxSubmit)
      .on('click.form-plugin', options, captureSubmittingElement);
  };

  // private event handlers
  function doAjaxSubmit(e) {
    /* jshint validthis:true */
    var options = e.data;

    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
      e.preventDefault();
      $(e.target).closest('form').ajaxSubmit(options); // #365
    }
  }

  function captureSubmittingElement(e) {
    /* jshint validthis:true */
    var target = e.target;
    var $el = $(target);

    if (!$el.is('[type=submit],[type=image]')) {
      // is this a child element of the submit el?  (ex: a span within a button)
      var t = $el.closest('[type=submit]');

      if (t.length === 0) {
        return;
      }
      target = t[0];
    }

    var form = target.form;

    form.clk = target;

    if (target.type === 'image') {
      if (typeof e.offsetX !== 'undefined') {
        form.clk_x = e.offsetX;
        form.clk_y = e.offsetY;

      } else if (typeof $.fn.offset === 'function') {
        var offset = $el.offset();

        form.clk_x = e.pageX - offset.left;
        form.clk_y = e.pageY - offset.top;

      } else {
        form.clk_x = e.pageX - target.offsetLeft;
        form.clk_y = e.pageY - target.offsetTop;
      }
    }
    // clear form vars
    setTimeout(function() {
      form.clk = form.clk_x = form.clk_y = null;
    }, 100);
  }


  // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
  $.fn.ajaxFormUnbind = function() {
    return this.off('submit.form-plugin click.form-plugin');
  };

  /**
   * formToArray() gathers form element data into an array of objects that can
   * be passed to any of the following ajax functions: $.get, $.post, or load.
   * Each object in the array has both a 'name' and 'value' property. An example of
   * an array for a simple login form might be:
   *
   * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
   *
   * It is this array that is passed to pre-submit callback functions provided to the
   * ajaxSubmit() and ajaxForm() methods.
   */
  $.fn.formToArray = function(semantic, elements, filtering) {
    var a = [];

    if (this.length === 0) {
      return a;
    }

    var form = this[0];
    var formId = this.attr('id');
    var els = (semantic || typeof form.elements === 'undefined') ? form.getElementsByTagName('*') : form.elements;
    var els2;

    if (els) {
      els = $.makeArray(els); // convert to standard array
    }

    // #386; account for inputs outside the form which use the 'form' attribute
    // FinesseRus: in non-IE browsers outside fields are already included in form.elements.
    if (formId && (semantic || /(Edge|Trident)\//.test(navigator.userAgent))) {
      els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
      if (els2.length) {
        els = (els || []).concat(els2);
      }
    }

    if (!els || !els.length) {
      return a;
    }

    if ($.isFunction(filtering)) {
      els = $.map(els, filtering);
    }

    var i, j, n, v, el, max, jmax;

    for (i = 0, max = els.length; i < max; i++) {
      el = els[i];
      n = el.name;
      if (!n || el.disabled) {
        continue;
      }

      if (semantic && form.clk && el.type === 'image') {
        // handle image inputs on the fly when semantic == true
        if (form.clk === el) {
          a.push({name: n, value: $(el).val(), type: el.type});
          a.push({name: n + '.x', value: form.clk_x}, {name: n + '.y', value: form.clk_y});
        }
        continue;
      }

      v = $.fieldValue(el, true);
      if (v && v.constructor === Array) {
        if (elements) {
          elements.push(el);
        }
        for (j = 0, jmax = v.length; j < jmax; j++) {
          a.push({name: n, value: v[j]});
        }

      } else if (feature.fileapi && el.type === 'file') {
        if (elements) {
          elements.push(el);
        }

        var files = el.files;

        if (files.length) {
          for (j = 0; j < files.length; j++) {
            a.push({name: n, value: files[j], type: el.type});
          }
        } else {
          // #180
          a.push({name: n, value: '', type: el.type});
        }

      } else if (v !== null && typeof v !== 'undefined') {
        if (elements) {
          elements.push(el);
        }
        a.push({name: n, value: v, type: el.type, required: el.required});
      }
    }

    if (!semantic && form.clk) {
      // input type=='image' are not found in elements array! handle it here
      var $input = $(form.clk), input = $input[0];

      n = input.name;

      if (n && !input.disabled && input.type === 'image') {
        a.push({name: n, value: $input.val()});
        a.push({name: n + '.x', value: form.clk_x}, {name: n + '.y', value: form.clk_y});
      }
    }

    return a;
  };

  /**
   * Serializes form data into a 'submittable' string. This method will return a string
   * in the format: name1=value1&amp;name2=value2
   */
  $.fn.formSerialize = function(semantic) {
    // hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
  };

  /**
   * Serializes all field elements in the jQuery object into a query string.
   * This method will return a string in the format: name1=value1&amp;name2=value2
   */
  $.fn.fieldSerialize = function(successful) {
    var a = [];

    this.each(function() {
      var n = this.name;

      if (!n) {
        return;
      }

      var v = $.fieldValue(this, successful);

      if (v && v.constructor === Array) {
        for (var i = 0, max = v.length; i < max; i++) {
          a.push({name: n, value: v[i]});
        }

      } else if (v !== null && typeof v !== 'undefined') {
        a.push({name: this.name, value: v});
      }
    });

    // hand off to jQuery.param for proper encoding
    return $.param(a);
  };

  /**
   * Returns the value(s) of the element in the matched set. For example, consider the following form:
   *
   *	<form><fieldset>
   *		<input name="A" type="text">
   *		<input name="A" type="text">
   *		<input name="B" type="checkbox" value="B1">
   *		<input name="B" type="checkbox" value="B2">
   *		<input name="C" type="radio" value="C1">
   *		<input name="C" type="radio" value="C2">
   *	</fieldset></form>
   *
   *	var v = $('input[type=text]').fieldValue();
   *	// if no values are entered into the text inputs
   *	v === ['','']
   *	// if values entered into the text inputs are 'foo' and 'bar'
   *	v === ['foo','bar']
   *
   *	var v = $('input[type=checkbox]').fieldValue();
   *	// if neither checkbox is checked
   *	v === undefined
   *	// if both checkboxes are checked
   *	v === ['B1', 'B2']
   *
   *	var v = $('input[type=radio]').fieldValue();
   *	// if neither radio is checked
   *	v === undefined
   *	// if first radio is checked
   *	v === ['C1']
   *
   * The successful argument controls whether or not the field element must be 'successful'
   * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
   * The default value of the successful argument is true. If this value is false the value(s)
   * for each element is returned.
   *
   * Note: This method *always* returns an array. If no valid value can be determined the
   *	array will be empty, otherwise it will contain one or more values.
   */
  $.fn.fieldValue = function(successful) {
    for (var val = [], i = 0, max = this.length; i < max; i++) {
      var el = this[i];
      var v = $.fieldValue(el, successful);

      if (v === null || typeof v === 'undefined' || (v.constructor === Array && !v.length)) {
        continue;
      }

      if (v.constructor === Array) {
        $.merge(val, v);
      } else {
        val.push(v);
      }
    }

    return val;
  };

  /**
   * Returns the value of the field element.
   */
  $.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();

    if (typeof successful === 'undefined') {
      successful = true;
    }

    /* eslint-disable no-mixed-operators */
    if (successful && (!n || el.disabled || t === 'reset' || t === 'button' ||
      (t === 'checkbox' || t === 'radio') && !el.checked ||
      (t === 'submit' || t === 'image') && el.form && el.form.clk !== el ||
      tag === 'select' && el.selectedIndex === -1)) {
      /* eslint-enable no-mixed-operators */
      return null;
    }

    if (tag === 'select') {
      var index = el.selectedIndex;

      if (index < 0) {
        return null;
      }

      var a = [], ops = el.options;
      var one = (t === 'select-one');
      var max = (one ? index + 1 : ops.length);

      for (var i = (one ? index : 0); i < max; i++) {
        var op = ops[i];

        if (op.selected && !op.disabled) {
          var v = op.value;

          if (!v) { // extra pain for IE...
            v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
          }

          if (one) {
            return v;
          }

          a.push(v);
        }
      }

      return a;
    }

    return $(el).val().replace(rCRLF, '\r\n');
  };

  /**
   * Clears the form data. Takes the following actions on the form's input fields:
   *  - input text fields will have their 'value' property set to the empty string
   *  - select elements will have their 'selectedIndex' property set to -1
   *  - checkbox and radio inputs will have their 'checked' property set to false
   *  - inputs of type submit, button, reset, and hidden will *not* be effected
   *  - button elements will *not* be effected
   */
  $.fn.clearForm = function(includeHidden) {
    return this.each(function() {
      $('input,select,textarea', this).clearFields(includeHidden);
    });
  };

  /**
   * Clears the selected form elements.
   */
  $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list

    return this.each(function() {
      var t = this.type, tag = this.tagName.toLowerCase();

      if (re.test(t) || tag === 'textarea') {
        this.value = '';

      } else if (t === 'checkbox' || t === 'radio') {
        this.checked = false;

      } else if (tag === 'select') {
        this.selectedIndex = -1;

      } else if (t === 'file') {
        if (/MSIE/.test(navigator.userAgent)) {
          $(this).replaceWith($(this).clone(true));
        } else {
          $(this).val('');
        }

      } else if (includeHidden) {
        // includeHidden can be the value true, or it can be a selector string
        // indicating a special test; for example:
        // $('#myForm').clearForm('.special:hidden')
        // the above would clean hidden inputs that have the class of 'special'
        if ((includeHidden === true && /hidden/.test(t)) ||
          (typeof includeHidden === 'string' && $(this).is(includeHidden))) {
          this.value = '';
        }
      }
    });
  };


  /**
   * Resets the form data or individual elements. Takes the following actions
   * on the selected tags:
   * - all fields within form elements will be reset to their original value
   * - input / textarea / select fields will be reset to their original value
   * - option / optgroup fields (for multi-selects) will defaulted individually
   * - non-multiple options will find the right select to default
   * - label elements will be searched against its 'for' attribute
   * - all others will be searched for appropriate children to default
   */
  $.fn.resetForm = function() {
    return this.each(function() {
      var el = $(this);
      var tag = this.tagName.toLowerCase();

      switch (tag) {
        case 'input':
          this.checked = this.defaultChecked;
        // fall through

        case 'textarea':
          this.value = this.defaultValue;

          return true;

        case 'option':
        case 'optgroup':
          var select = el.parents('select');

          if (select.length && select[0].multiple) {
            if (tag === 'option') {
              this.selected = this.defaultSelected;
            } else {
              el.find('option').resetForm();
            }
          } else {
            select.resetForm();
          }

          return true;

        case 'select':
          el.find('option').each(function(i) {				// eslint-disable-line consistent-return
            this.selected = this.defaultSelected;
            if (this.defaultSelected && !el[0].multiple) {
              el[0].selectedIndex = i;

              return false;
            }
          });

          return true;

        case 'label':
          var forEl = $(el.attr('for'));
          var list = el.find('input,select,textarea');

          if (forEl[0]) {
            list.unshift(forEl[0]);
          }

          list.resetForm();

          return true;

        case 'form':
          // guard against an input with the name of 'reset'
          // note that IE reports the reset function as an 'object'
          if (typeof this.reset === 'function' || (typeof this.reset === 'object' && !this.reset.nodeType)) {
            this.reset();
          }

          return true;

        default:
          el.find('form,input,label,select,textarea').resetForm();

          return true;
      }
    });
  };

  /**
   * Enables or disables any matching elements.
   */
  $.fn.enable = function(b) {
    if (typeof b === 'undefined') {
      b = true;
    }

    return this.each(function() {
      this.disabled = !b;
    });
  };

  /**
   * Checks/unchecks any matching checkboxes or radio buttons and
   * selects/deselects and matching option elements.
   */
  $.fn.selected = function(select) {
    if (typeof select === 'undefined') {
      select = true;
    }

    return this.each(function() {
      var t = this.type;

      if (t === 'checkbox' || t === 'radio') {
        this.checked = select;

      } else if (this.tagName.toLowerCase() === 'option') {
        var $sel = $(this).parent('select');

        if (select && $sel[0] && $sel[0].type === 'select-one') {
          // deselect all other options
          $sel.find('option').selected(false);
        }

        this.selected = select;
      }
    });
  };

  // expose debug var
  $.fn.ajaxSubmit.debug = false;

  // helper fn for console logging
  function log() {
    if (!$.fn.ajaxSubmit.debug) {
      return;
    }

    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');

    if (window.console && window.console.log) {
      window.console.log(msg);

    } else if (window.opera && window.opera.postError) {
      window.opera.postError(msg);
    }
  }
}));
;
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

Drupal.settings.urlIsAjaxTrusted = Drupal.settings.urlIsAjaxTrusted || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  // If the 'nojs' version of the URL is trusted, also trust the 'ajax' version.
  if (Drupal.settings.urlIsAjaxTrusted[element_settings.url]) {
    Drupal.settings.urlIsAjaxTrusted[this.url] = true;
  }

  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: ajax.url,
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status, xmlhttprequest) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }

      // Prior to invoking the response's commands, verify that they can be
      // trusted by checking for a response header. See
      // ajax_set_verification_header() for details.
      // - Empty responses are harmless so can bypass verification. This avoids
      //   an alert message for server-generated no-op responses that skip Ajax
      //   rendering.
      // - Ajax objects with trusted URLs (e.g., ones defined server-side via
      //   #ajax) can bypass header verification. This is especially useful for
      //   Ajax with multipart forms. Because IFRAME transport is used, the
      //   response headers cannot be accessed for verification.
      if (response !== null && !Drupal.settings.urlIsAjaxTrusted[ajax.url]) {
        if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
          var customMessage = Drupal.t("The response failed verification so will not be processed.");
          return ajax.error(xmlhttprequest, ajax.url, customMessage);
        }
      }

      return ajax.success(response, status);
    },
    complete: function (xmlhttprequest, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(xmlhttprequest, ajax.url);
      }
    },
    dataType: 'json',
    type: 'POST'
  };

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    if (!Drupal.settings.urlIsAjaxTrusted[ajax.url] && !Drupal.urlIsLocal(ajax.url)) {
      throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {'!url': ajax.url}));
    }
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = Drupal.checkPlain(v);
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response.hasOwnProperty(i) && response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
  Drupal.displayAjaxError(Drupal.ajaxError(xmlhttprequest, uri, customMessage));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  },

  /**
   * Command to add css.
   *
   * Uses the proprietary addImport method if available as browsers which
   * support that method ignore @import statements in dynamically added
   * stylesheets.
   */
  add_css: function (ajax, response, status) {
    // Add the styles in the normal way.
    $('head').prepend(response.data);
    // Add imports in the styles using the addImport method if available.
    var match, importMatch = /^@import url\("(.*)"\);$/igm;
    if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
      importMatch.lastIndex = 0;
      while (match = importMatch.exec(response.data)) {
        document.styleSheets[0].addImport(match[1]);
      }
    }
  },

  /**
   * Command to update a form's build ID.
   */
  updateBuildId: function(ajax, response, status) {
    $('input[name="form_build_id"][value="' + response['old'] + '"]').val(response['new']);
  }
};

})(jQuery);
;
(function (D) {
  var beforeSerialize = D.ajax.prototype.beforeSerialize;
  D.ajax.prototype.beforeSerialize = function (element, options) {
    beforeSerialize.call(this, element, options);
    options.data['ajax_page_state[jquery_version]'] = D.settings.ajaxPageState.jquery_version;
  }
})(Drupal);
;
