import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependencies';
import 'fullcalendar';
import moment from 'moment';
window.libs = libs;

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function (svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(
  mySVGsToInject,
  afterAllInjectionsFinishedCallback,
  perInjectionCallback
);

// slick carousel
$(".content-carousel").slick({
  // normal options...
  speed: 5000,
	autoplay: true,
	autoplaySpeed: 0,
	cssEase: 'linear',
  slidesToShow: 5,
	slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
	centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }, {
      breakpoint: 300,
      settings: "unslick" // destroys slick
    }]
});

// tablesaw table plugin
$(function () {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
});

// paralax bg
var moveBg = function(el,i) {
  var wHeight = $(window).height();  // Window height
  var elTop = $(el).offset().top;  // Element's top position in page ( Distance from top of page to element's top line )
  var elHeight = $(el).innerHeight();  // Element height
  if(elTop > wHeight) {
    var elReachBottom = elTop - wHeight; // Position of scroll when element appear in page from bottom
  } else {
    var elReachBottom = 0;
  }
  var elReachTop = elTop + elHeight;  // Element's bottom position in page ( Distance from top of the page to element's bottom line )

  $(window).scroll(function() {
    var wScroll = $(this).scrollTop();  // Window top scroll position
    var moveDistance = ( wScroll - elReachBottom )/i; // Distance to move background down
    if (( wScroll > elReachBottom ) && ( wScroll < elReachTop )) {  // Verify if element is in viewport or is out
      $(el).css({"background-position-y":moveDistance, "background-attachment":"fixed"});
    }
  });
};
var initParalaxBg = function(x) {

  $(".paralaxbg").each(function() {
    var x = $(this).attr("data-paralaxbg-speed");
    if(x) {
      moveBg(this,x);
    } else {
      moveBg(this,20);
    }
  });
}
initParalaxBg();

// scroll link
$(document).ready(function (){
  $('.use-scroll-link').on('click', function (){
    $('#nav-modal').foundation('close');// close modal
    let linkTo = $(this).attr('href');
    linkTo = $(linkTo);
    $('html, body').animate({
      scrollTop: linkTo.offset().top
    }, 2000);
    return false;
  });
});

// calendar page
$(document).ready(function (){
  var $calendar = $("#calendar");
  $calendar.fullCalendar({
    defaultView: 'month',
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    header: {
      left: 'title prev,next,today',
      right: ''
    },
    weekends: false,
    height: 400,
    dayClick: function (date, jsEvent, view){
      var customFormat = moment.utc(date.format()).format('LL');
      // console.log('Current view: ' + view.name);

      $('.fc-view-container .fc-body').find('td').removeClass('selected-day');
      $(this).addClass('selected-day');
      $('#date-placeholder').text(customFormat);
    },// dayClick
    handleWindowResize: false
  });// full calendar
});// ready
