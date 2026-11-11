/* =====================================================
   EDIT EVERYTHING HERE — no need to touch the HTML
   ===================================================== */
const WEDDING = {
  bride: "বর্ষা",
  groom: "প্রসেনজিৎ",
  // Wedding date & time (YYYY-MM-DDTHH:MM:SS, local time)
  date: "2026-11-24T19:00:00",
  dateText: "২৪ নভেম্বর ২০২৬, সন্ধ্যা ৭ ঘটিকায়",

  // Optional venue name shown above the date. Leave "" to hide.
  venueName: "",

  // Map: coordinates taken from your Google Maps link
  lat: 23.5751636,
  lng: 87.1569233,
  mapLink: "https://maps.app.goo.gl/BSU5VfErhCYHjNkQ6",

  brideFamily: {
    name: "বর্ষা মন্ডল",
    lines: [
      "পিতা - ফাল্গুনী মন্ডল",
      "মাতা - সবিতা মন্ডল",
      "ভাই - সৌম্যদীপ মন্ডল<br>ও<br>রহিত মন্ডল",
      "নিবাস - মদনপুর, অন্ডাল, পশ্চিম বর্ধমান"
    ]
  },
  groomFamily: {
    name: "প্রসেনজিৎ মন্ডল",
    lines: [
      "পিতা - পরিমল মন্ডল",
      "মাতা - সরস্বতী মন্ডল",
      "নিবাস - রাজনগর, বীরভূম"
    ]
  },

  // Optional: country code + number, no + or spaces. Leave "" to hide.
  whatsappNumber: "919002346668"
};

/* ---------- Fill the page ---------- */
const $ = (id) => document.getElementById(id);

$("brideName").textContent = WEDDING.bride;
$("groomName").textContent = WEDDING.groom;
$("coupleLine").textContent = WEDDING.dateText;
$("signNames").textContent = WEDDING.bride;
$("inviteLine").textContent =
  `আগামী ${WEDDING.dateText} ${WEDDING.bride} ও ${WEDDING.groom} এর শুভ বিবাহ অনুষ্ঠিত হবে।`;

const fillFamily = (id, f) =>
  ($(id).innerHTML =
    `<p class="fname">${f.name}</p>` + f.lines.map((l) => `<p>${l}</p>`).join(""));
fillFamily("brideFamily", WEDDING.brideFamily);
fillFamily("groomFamily", WEDDING.groomFamily);

$("venueTime").textContent = WEDDING.dateText;
if (WEDDING.venueName) {
  $("venueName").textContent = WEDDING.venueName;
  $("venueName").hidden = false;
}
$("map").src = `https://www.google.com/maps?q=${WEDDING.lat},${WEDDING.lng}&z=17&output=embed`;
$("directions").href = WEDDING.mapLink;

if (WEDDING.whatsappNumber) {
  const w = $("whatsapp");
  w.hidden = false;
  w.href = `https://wa.me/${WEDDING.whatsappNumber}`;
}

/* ---------- Countdown (Bengali digits) ---------- */
const bn = (n) =>
  String(n).padStart(2, "0").replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
const target = new Date(WEDDING.date).getTime();

function tick() {
  let diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 864e5); diff %= 864e5;
  const h = Math.floor(diff / 36e5);  diff %= 36e5;
  const m = Math.floor(diff / 6e4);   diff %= 6e4;
  const s = Math.floor(diff / 1e3);
  $("d").textContent = bn(d);
  $("h").textContent = bn(h);
  $("m").textContent = bn(m);
  $("s").textContent = bn(s);
}
tick();
setInterval(tick, 1000);

/* ---------- Falling petals ---------- */
const petalBox = $("petals");
for (let i = 0; i < 26; i++) {
  const p = document.createElement("span");
  p.className = "petal";
  p.style.left = Math.random() * 100 + "%";
  p.style.setProperty("--dx", Math.random() * 120 - 60 + "px");
  p.style.animationDuration = 9 + Math.random() * 10 + "s";
  p.style.animationDelay = -Math.random() * 18 + "s";
  p.style.transform = `scale(${0.6 + Math.random() * 0.9})`;
  petalBox.appendChild(p);
}

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Background music (30% volume) ---------- */
const bgm = $("bgm");
const musicBtn = $("musicBtn");
bgm.volume = 0.3;

const setIcon = () => (musicBtn.textContent = bgm.paused ? "🔇" : "🔊");
bgm.addEventListener("play", setIcon);
bgm.addEventListener("pause", setIcon);

// Try to start the music right away. If the browser blocks it,
// start it on the visitor's first tap, scroll or key press.
bgm.play().catch(() => {
  const unlock = () => {
    bgm.play().catch(() => {});
    ["click", "touchstart", "scroll", "keydown"].forEach((ev) =>
      window.removeEventListener(ev, unlock)
    );
  };
  ["click", "touchstart", "scroll", "keydown"].forEach((ev) =>
    window.addEventListener(ev, unlock, { once: true, passive: true })
  );
});

musicBtn.addEventListener("click", () => {
  bgm.paused ? bgm.play().catch(() => {}) : bgm.pause();
});

/* ---------- "আমাদের পরিচয়" popup ---------- */
const aboutModal = $("aboutModal");
const openAbout = () => { aboutModal.classList.add("open"); aboutModal.setAttribute("aria-hidden", "false"); };
const closeAbout = () => { aboutModal.classList.remove("open"); aboutModal.setAttribute("aria-hidden", "true"); };
$("aboutBadge").addEventListener("click", openAbout);
$("aboutClose").addEventListener("click", closeAbout);
aboutModal.addEventListener("click", (e) => { if (e.target === aboutModal) closeAbout(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAbout(); });