// 1) Simple animated star background (canvas)
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let stars = [];
const starCount = 160;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.6 + 0.3,
    a: Math.random() * 0.7 + 0.2,
    s: Math.random() * 0.2 + 0.03,
    t: Math.random() * Math.PI * 2,
  }));
}
window.addEventListener("resize", resize);
resize();

function tick() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const st of stars) {
    st.t += 0.02;
    st.a = 0.3 + Math.abs(Math.sin(st.t)) * 0.6;

    st.y += st.s * (prefersReducedMotion ? 0.4 : 1);
    if (st.y > window.innerHeight + 10) {
      st.y = -10;
      st.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210, 180, 255, ${st.a})`;
    ctx.fill();
  }

  requestAnimationFrame(tick);
}
tick();

// 2) GSAP entrance + gentle floating animation
// (GSAP is loaded in index.html via CDN)
if (!prefersReducedMotion) {
  gsap.from(".card", { opacity: 0, y: 18, duration: 0.8, stagger: 0.12, ease: "power2.out" });

  gsap.to(".card", {
    y: -6,
    duration: 3.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.2,
  });
}
