
/* ==========================================
   VIPUL'S PORTFOLIO
   COMPLETE JAVASCRIPT
========================================== */

/* ===== 1. SMOOTH 3D BOOK FLIP ===== */

const bookStage = document.querySelector(".book-stage");
const bookCover = document.querySelector("#bookCover");
const bookPages = [...document.querySelectorAll(".page")];

let targetProgress = 0;
let currentProgress = 0;

function calculateBookProgress() {
  if (!bookStage) return;

  const scrollDistance =
    bookStage.offsetHeight - window.innerHeight;

  if (scrollDistance <= 0) {
    targetProgress = 1;
    return;
  }

  const travelled =
    -bookStage.getBoundingClientRect().top;

  targetProgress = Math.max(
    0,
    Math.min(1, travelled / scrollDistance)
  );
}

function animateBook() {
  currentProgress +=
    (targetProgress - currentProgress) * 0.10;

  if (Math.abs(targetProgress - currentProgress) < 0.0003) {
    currentProgress = targetProgress;
  }

  const progress = currentProgress;

  /* BOOK COVER */
  const coverProgress = Math.min(progress / 0.20, 1);

  if (bookCover) {
    bookCover.style.transform =
      `rotateY(${-180 * coverProgress}deg)`;

    bookCover.style.opacity =
      coverProgress >= 1 ? "0" : "1";

    bookCover.style.pointerEvents =
      coverProgress >= 1 ? "none" : "auto";
  }

  /* BOOK PAGES */
  const pageProgress =
    Math.max(0, Math.min(1,
      (progress - 0.20) / 0.80
    )) * bookPages.length;

  bookPages.forEach((page, index) => {
    const localProgress = Math.max(
      0,
      Math.min(1, pageProgress - index)
    );

    const rotation = -180 * localProgress;

    page.style.transform =
      `rotateY(${rotation}deg)`;

    page.style.zIndex =
      bookPages.length - index;

    page.style.filter =
      `brightness(${1 - localProgress * 0.25})`;
  });

  /* SCROLL PROGRESS */
  const progressBar = document.querySelector(".progress");

  if (progressBar) {
    progressBar.style.width =
      `${progress * 100}%`;
  }

  requestAnimationFrame(animateBook);
}

window.addEventListener("scroll", calculateBookProgress, {
  passive: true
});

window.addEventListener("resize", calculateBookProgress);

calculateBookProgress();
animateBook();


/* ===== 2. CURSOR GLOW ===== */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}


/* ===== 3. GOLD PARTICLES ===== */

const canvas = document.querySelector("#particles");
const ctx = canvas?.getContext("2d");

let particles = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createParticles();
}

function createParticles() {
  if (!canvas || !ctx) return;

  const count = Math.min(
    70,
    Math.floor((canvas.width * canvas.height) / 18000)
  );

  particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.25 + 0.08,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}

function animateParticles() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.y -= particle.speed;

    if (particle.y < 0) {
      particle.y = canvas.height;
      particle.x = Math.random() * canvas.width;
    }

    ctx.beginPath();

    ctx.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(212,175,55,${particle.opacity})`;

    ctx.shadowBlur = 8;
    ctx.shadowColor = "#d4af37";

    ctx.fill();
  });

  ctx.shadowBlur = 0;

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateParticles();


/* ===== 4. 3D PORTRAIT TILT ===== */

const portrait = document.querySelector("#portrait3d");

if (portrait && window.matchMedia("(hover: hover)").matches) {
  portrait.addEventListener("mousemove", (event) => {
    const rect = portrait.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 25;
    const rotateX = (0.5 - y) * 25;

    portrait.style.transform =
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  portrait.addEventListener("mouseleave", () => {
    portrait.style.transform =
      "rotateY(-12deg) rotateX(5deg)";
  });
}


/* ===== 5. 3D PROJECT CARD ===== */

const project3d = document.querySelector("#project3d");
const projectInner = project3d?.querySelector(".project-inner");

if (
  project3d &&
  projectInner &&
  window.matchMedia("(hover: hover)").matches
) {
  project3d.addEventListener("mousemove", (event) => {
    const rect = project3d.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 12;

    projectInner.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  project3d.addEventListener("mouseleave", () => {
    projectInner.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  });
}


/* ===== 6. SMOOTH NAVIGATION ===== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* ===== 7. PORTFOLIO READY ===== */

console.log(
  "%c VIPUL'S PORTFOLIO ",
  "background:#d4af37;color:#000;padding:8px;font-weight:bold"
);

console.log("3D Book Experience Initialized ✨");

/* ===== 360 DEGREE INTERACTIVE ORB ===== */

const heroOrb = document.querySelector(".hero-orb");

if (heroOrb) {
  let rotationX = 0;
  let rotationY = 0;

  let targetX = 0;
  let targetY = 0;

  let orbAnimation;

  heroOrb.addEventListener("mousemove", (event) => {
    const movementX = event.movementX;
    const movementY = event.movementY;

    rotationY += movementX * 0.8;
    rotationX -= movementY * 0.8;

    targetX = rotationX;
    targetY = rotationY;

    heroOrb.style.transform =
      `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  });

  heroOrb.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;

    cancelAnimationFrame(orbAnimation);

    function resetOrb() {
      rotationX += (targetX - rotationX) * 0.08;
      rotationY += (targetY - rotationY) * 0.08;

      heroOrb.style.transform =
        `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

      if (
        Math.abs(rotationX) > 0.1 ||
        Math.abs(rotationY) > 0.1
      ) {
        orbAnimation = requestAnimationFrame(resetOrb);
      } else {
        rotationX = 0;
        rotationY = 0;
        heroOrb.style.transform = "rotateX(0deg) rotateY(0deg)";
      }
    }

    resetOrb();
  });
}

/* ===== FUTURE PORTAL 3D INTERACTION ===== */

const futurePortal = document.querySelector("#futurePortal");

if (futurePortal && window.matchMedia("(hover: hover)").matches) {
  let portalX = 0;
  let portalY = 0;

  futurePortal.addEventListener("mousemove", (event) => {
    const rect = futurePortal.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    portalY = (x - 0.5) * 360;
    portalX = (0.5 - y) * 180;

    futurePortal.style.transform =
      `rotateX(${portalX}deg) rotateY(${portalY}deg)`;
  });

  futurePortal.addEventListener("mouseleave", () => {
    futurePortal.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  });
}

/* ===== INTRO SCREEN CONTROL ===== */

window.addEventListener("load", () => {
    const intro = document.getElementById("intro-screen");

    if (!intro) return;

    setTimeout(() => {
        intro.classList.add("intro-hide");

        setTimeout(() => {
            intro.remove();
        }, 1000);

    }, 2800);
});

/* ===== CONTACT FORM FUNCTIONALITY ===== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const subject = encodeURIComponent("Portfolio Contact - " + name);

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        document.getElementById("formStatus").textContent =
            "Opening your email app...";

        window.location.href =
            "mailto:vt175800@gmail.com?subject=" +
            subject + "&body=" + body;
    });
}




/* ===== FIXED CENTER AI HOLOGRAM ===== */

const aiHologram = document.getElementById("aiHologram");

if (aiHologram) {
    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * -30;

        aiHologram.style.setProperty("--holo-x", x + "deg");
        aiHologram.style.setProperty("--holo-y", y + "deg");
    });
}
