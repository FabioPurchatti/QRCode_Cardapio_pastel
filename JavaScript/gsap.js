// Scroll gsap

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  smooth: 1.5,
  smoothTouch: 0.5,
  effects: true,
});
