import $ from 'jquery';
import whatInput from 'what-input';
import { initParalaxBg } from "./lib/paralaxbg";
import { cycle } from "./lib/jquery-cycle";
import { cycleCarousel } from "./lib/jquery-cycle-carousel";
import 'fullcalendar';
import moment from 'moment';

window.$ = $;
cycle();
cycleCarousel();

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependencies';
window.libs = libs;

$(document).foundation();

initParalaxBg()

// scroll link
$(document).ready(function (){
  $('.use-scroll-link').on('click', function (){
    let linkTo = $(this).attr('href');
    if($('#home').length) {
      $('.off-canvas').foundation('close');
      // let linkTo = $(this).attr('href');
      linkTo = $(linkTo);
      $('html, body').animate({
        scrollTop: linkTo.offset().top
      }, 2000);
    } else {
      window.location.replace('landing-page.html'+linkTo)
    }
    return false;
  });

  // calendar
  var $calendar = $("#calendar");
  $calendar.fullCalendar({
    defaultView: 'month',
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    header: {
      left: 'title prev,next today',
      right: ''
    },
    weekends: false,
    height: 400,
    dayClick: function (date, jsEvent, view){
      if (date.month() !=  view.intervalStart.month()) {
        //other month day,  do nothing..
      } else {
        var customFormat = moment.utc(date.format()).format('LL');

        $('.fc-view-container .fc-body').find('td').removeClass('selected-day');
        $(this).addClass('selected-day');
        $('#date-placeholder').text(customFormat);
        $('.sticky-box .button').removeClass('disable');
      }
    },// dayClick
    handleWindowResize: false
  });// full calendar
});