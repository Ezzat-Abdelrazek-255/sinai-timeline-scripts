document.addEventListener("DOMContentLoaded", function() {
  init();
});

function init() {
  // Define constants (replace with your actual values)
  const SCROLL_PIN_END = "+=2000";
  const SCALE_VALUE = 7;
  const EASE_DURATION = 0.65;
  const SCROLL_TRIGGER_OFFSET = "-=10";

  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Log scroll data
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  // Register GSAP plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero background scale & pin
  gsap.to(".hero-img", {
    scrollTrigger: {
      trigger: document.body, // or another element instead of containerRef
      start: "top top",
      end: SCROLL_PIN_END,
      scrub: 1,
      pin: true,
    },
    scale: SCALE_VALUE,
  });

  // Text animation on scroll
  ScrollTrigger.create({
    trigger: document.body,
    start: `top top${SCROLL_TRIGGER_OFFSET}`,
    end: `top top${SCROLL_TRIGGER_OFFSET}`,
    onLeave: () =>
      gsap.to(".hero-text-wrapper", {
        yPercent: -100,
        opacity: 0,
        duration: EASE_DURATION,
        ease: "power2.out",
      }),
    onEnterBack: () =>
      gsap.to(".hero-text-wrapper", {
        yPercent: -50,
        opacity: 1,
        duration: EASE_DURATION,
        ease: "power2.out",
      }),
  });
}
