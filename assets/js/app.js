import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power2 } from "gsap"; // Explicitly import Power2.easeInOut

gsap.registerPlugin(ScrollTrigger);

(function () {
  "use strict";

  const $slider = document.querySelector(".scroll-slider");
  const $wrapper = document.querySelector(".scroll-wrapper");
  const $slides = document.querySelectorAll(".scroll-slide");
  const $sliderWrapper = document.querySelector(".scroll-wrapper");
  const $firstSlide = $slides[0];

  console.log($slider);
  console.log($slides);
  console.log($sliderWrapper);
  console.log($firstSlide);

  if (!$slider || !$slides.length || !$sliderWrapper || !$firstSlide) {
    console.error("One or more required elements are not found in the DOM.");
    return;
  }

  var settings = {},
    resizing = false,
    scrollController = null,
    scrollTimeline = null;

  function scrollSlider(options) {
    settings = Object.assign(
      {
        slider: ".scroll-slider",
        sliderWrapper: ".scroll-wrapper",
        slides: ".scroll-slide",
        slideWidth: null,
        slideHeight: null,
      },
      options
    );

    setDimensions();

    // On resize
    window.addEventListener("resize", function () {
      if (!resizing) {
        resizing = true;
        requestAnimationFrame(() => {
          setDimensions();
          resizing = false;
        });
      }
    });
  }

  function setDimensions() {
    settings.slideWidth = $firstSlide.offsetWidth;
    settings.slideHeight = $firstSlide.offsetHeight;

    console.log(settings.slideWidth);
    console.log(settings.slideHeight);

    settings.sliderWidth = Math.ceil(settings.slideWidth * $slides.length);
    settings.sliderHeight = $firstSlide.offsetHeight;

    $sliderWrapper.style.width = settings.sliderWidth + "px";

    setScene();

    resizing = false;
  }

  function setScene() {
    var xDist = -$firstSlide.offsetWidth * ($slides.length - 1);

    // Create Tween
    scrollTimeline = gsap.timeline();
    scrollTimeline.to($sliderWrapper, {
      x: xDist,
      ease: Power2.easeInOut,
      duration: 2,
    });

    // Create ScrollTrigger
    ScrollTrigger.create({
      trigger: $slider,
      start: "top top",
      end: `+=${settings.sliderWidth}`,
      pin: true,
      scrub: true,
      animation: scrollTimeline,
    });
  }
  scrollSlider();
})();
