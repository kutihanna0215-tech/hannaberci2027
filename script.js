// ============================================================
//  HANNA & BERCI — script.js
// ============================================================

// --- VISSZASZÁMLÁLÓ ---
// Esküvő időpontja: 2027. június 26. 15:00
const targetDate = new Date("2027-06-26T15:00:00").getTime();

function pad(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
    const now  = Date.now();
    const diff = targetDate - now;
    const el   = document.getElementById("countdown");
    if (!el) return;

    if (diff <= 0) {
        el.textContent = "Elérkezett a Nagy Nap! 🌸";
        return;
    }

    const days    = Math.floor(diff / 864e5);
    const hours   = Math.floor((diff % 864e5) / 36e5);
    const minutes = Math.floor((diff % 36e5)  / 6e4);
    const seconds = Math.floor((diff % 6e4)   / 1e3);

    el.textContent = `${days} nap  ·  ${pad(hours)} óra  ·  ${pad(minutes)} perc  ·  ${pad(seconds)} mp`;
}

// Azonnal lefut, majd másodpercenként frissül (a másodperc is ketyeg)
updateCountdown();
setInterval(updateCountdown, 1000);


// --- NAVIGÁCIÓ: árnyék görgetésre ---
const nav = document.getElementById("site-nav");

function onScroll() {
    if (window.scrollY > 40) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll(); // egyszeri futás oldalbetöltéskor


// --- MOBIL BURGER MENÜ ---
const burger    = document.getElementById("nav-burger");
const mobileNav = document.getElementById("nav-mobile");

if (burger && mobileNav) {
    burger.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");
        burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        burger.setAttribute("aria-label", isOpen ? "Menü bezárása" : "Menü megnyitása");
    });

    // Menüpontra kattintva zárja be a mobilmenüt
    mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Menü megnyitása");
        });
    });
}


// --- SMOOTH ANCHOR SCROLL (nav magasságának figyelembevételével) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();
        const navH   = nav ? nav.getBoundingClientRect().height : 0;
        const top    = targetEl.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: "smooth" });
    });
});


// --- SCROLL FADE-IN ANIMÁCIÓ ---
// Minden .reveal osztályú elem szépen beúszik, ahogy láthatóvá válik
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
