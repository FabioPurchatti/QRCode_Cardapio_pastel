// Scroll gsap

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  smooth: 1.5,
  smoothTouch: 0.1,
  effects: true,
});

// Descida logo eixo y
gsap.from(".imagem-logo-mae", {
  opacity: 0,
  duration: 3,
});

gsap.from(".imagem-logo-mae", {
  y: 100,
  duration: 3,
});

gsap.from(".container", {
  y: -200,
  duration: 3,
});
