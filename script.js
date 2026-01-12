// 1) Simple animated star background (canvas)
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resize);
resize();

const stars = Array.from({ length: 140 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.6 + 0.2,
  a: Math.random() * 0.8 + 0.1,
  s: Math.random() * 0.25 + 0.05,
}));

function tick() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const st of stars) {
    st.a += (Math.random() - 0.5) * 0.03;
    st.a = Math.max(0.08, Math.min(0.95, st.a));

    st.y += st.s;
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
gsap.from(".card", { opacity: 0, y: 18, duration: 0.8, stagger: 0.12, ease: "power2.out" });

gsap.to(".card", {
  y: -6,
  duration: 2.8,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  stagger: 0.15,
});
