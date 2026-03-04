// =============================================
//  THE BEASTRO — App Logic
// =============================================

// ---- Pet card accent colors ----
const TRAIT_PALETTES = [
  { bg: "#EDE6FF", color: "#6B4BC8" },
  { bg: "#E0F7EE", color: "#2E8A60" },
  { bg: "#FFF0DC", color: "#C47A00" },
  { bg: "#FFE8E4", color: "#C0413A" },
  { bg: "#FFFBDC", color: "#8A7A00" },
];

// ---- Pet card placeholder background colors ----
const PLACEHOLDER_COLORS = {
  cat: "#EDE6FF",
  dog: "#E0F7EE",
};

// ---- Build and inject pet cards ----
function buildPetCards() {
  const grid = document.getElementById("petGrid");
  if (!grid) return;

  PETS.forEach((pet, idx) => {
    const card = document.createElement("div");
    card.className = "pet-card";

    // Alternating card border accent
    const accent = TRAIT_PALETTES[idx % TRAIT_PALETTES.length];

    // Trait tags HTML
    const tagsHtml = pet.traits
      .map((t, i) => {
        const p = TRAIT_PALETTES[i % TRAIT_PALETTES.length];
        return `<span class="trait-tag" style="background:${p.bg}; color:${p.color};">${t}</span>`;
      })
      .join("");

    // Photo placeholder — swap in real image by placing a file at:
    //   public/images/pets/${pet.id}.jpg  (or .png, .webp)
    // The <img> below will automatically load it if found.
    const imgHtml = `
      <div class="pet-placeholder" style="background:${pet.color}20; border-bottom: 2px solid ${pet.color};">
        <span>${pet.emoji}</span>
        <span class="pet-placeholder-label">Photo coming soon</span>
      </div>`;

    card.innerHTML = `
      ${imgHtml}
      <div class="pet-card-body">
        <div class="pet-name">${pet.name}</div>
        <div class="pet-owner">Owner's pet</div>
        <div class="pet-traits">${tagsHtml}</div>
        <p class="pet-bio">${pet.bio}</p>
        <div class="chef-creation">
          <div class="chef-label">👨‍🍳 Chef's Creation</div>
          <div class="chef-name">"${pet.creation.name}"</div>
          <div class="chef-desc">${pet.creation.description}</div>
        </div>
      </div>`;

    // Hover border color matches card accent
    card.style.setProperty("--card-accent", pet.color);
    card.addEventListener("mouseenter", () => {
      card.style.borderColor = pet.color;
    });
    card.addEventListener("mouseleave", () => {
      card.style.borderColor = "transparent";
    });

    grid.appendChild(card);
  });
}

// ---- Questionnaire submit ----
function submitForm(e) {
  e.preventDefault();
  const form = document.getElementById("qForm");
  const success = document.getElementById("qSuccess");

  // Brief loading shimmer on button
  const btn = form.querySelector("button[type=submit]");
  btn.textContent = "Submitting to the chef…";
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = "none";
    success.classList.add("visible");
    // Scroll to success
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 1200);
}

function resetForm() {
  const form = document.getElementById("qForm");
  const success = document.getElementById("qSuccess");
  const btn = form.querySelector("button[type=submit]");

  form.reset();
  btn.textContent = "Submit to the Chef 🍽️";
  btn.disabled = false;
  form.style.display = "block";
  success.classList.remove("visible");
}

// ---- Mobile nav toggle ----
function toggleNav() {
  const mobile = document.getElementById("navMobile");
  mobile.classList.toggle("open");
}

// ---- Scroll-based nav shadow ----
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 10) {
    nav.style.boxShadow = "0 2px 20px rgba(80,50,140,0.10)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// ---- Intersection observer: fade-in sections ----
function setupFadeIn() {
  const style = document.createElement("style");
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(".about-card, .pet-card, .menu-cat, .menu-note");
  targets.forEach(el => el.classList.add("fade-in"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  buildPetCards();
  setupFadeIn();
});
