import $ from 'jquery';
import whatInput from 'what-input';
import flatpickr from "flatpickr";

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependencies';
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

// import Paralax from './paralaxbg';
// Paralax.initParalaxBg();
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
// datepicker
// $(".reservations-home #date").flatpickr();
flatpickr(".reservations-home #date", {
  // minDate: 'today',
  // enableTime: true,
  dateFormat: "Y-m-d",
});
flatpickr(".reservations-home #time", {
  enableTime: true,
  dateFormat: "H:i",
  noCalendar: true
});
$('.served-menu-message a').on('click', function (){
  var displayValue = $('.menu-page .img-container').css('display');
  if(displayValue == "none") {
    $('.menu-page .img-container').css('display', 'block');
  } else {
    $('.menu-page .img-container').css('display', 'none');
  }
  return false;
});
// order online toggle content
$('.order-online .options-pane button').on('click', function (){
  $(".to-toggle").hide();
  $(this).addClass('active').siblings().removeClass('active');
  if($(this).attr('id') == "starters-toggler-trigger") {
    $("#starters-panel").show();
    return false;
  } else if($(this).attr('id') == "main-toggler-trigger") {
    $("#main-panel").show();
  }
});

function toggleOrderMenu(){
  $('.order-online .toggle-menu p').on('click', function (){
    // $(this).addClass('expanded');
    // $(this).siblings('.options-pane').slideUp('slow');
    if($(this).hasClass('expanded')) {
      $(this).siblings('.options-pane').slideDown('slow');
      $(this).removeClass('expanded');
    } else {
      $(this).addClass('expanded');
      $(this).siblings('.options-pane').slideUp('slow');
    }
  });
};

$(document).ready(function (){
  toggleOrderMenu();
});