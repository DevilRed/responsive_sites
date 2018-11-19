import $ from 'jquery';
import whatInput from 'what-input';
import { initParalaxBg } from "./lib/paralaxbg";
import { cycle } from "./lib/jquery-cycle";
import { cycleCarousel } from "./lib/jquery-cycle-carousel";

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
    $('.off-canvas').foundation('close');
    let linkTo = $(this).attr('href');
    linkTo = $(linkTo);
    $('html, body').animate({
      scrollTop: linkTo.offset().top
    }, 2000);
    return false;
  });
});