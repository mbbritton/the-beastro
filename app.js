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

    // Sanitize pet data
    const sanitizedPetName = DOMPurify.sanitize(pet.name);
    const sanitizedOwner = DOMPurify.sanitize(pet.owner);
    const sanitizedBio = DOMPurify.sanitize(pet.bio);
    const sanitizedCreationName = DOMPurify.sanitize(pet.creation.name);
    const sanitizedCreationDesc = DOMPurify.sanitize(pet.creation.description);

    // Trait tags HTML
    const tagsHtml = pet.traits
      .map((t, i) => {
        const p = TRAIT_PALETTES[i % TRAIT_PALETTES.length];
        const sanitizedTrait = DOMPurify.sanitize(t);
        return `<span class="trait-tag" style="background:${p.bg}; color:${p.color};">${sanitizedTrait}</span>`;
      })
      .join("");

    // Create image container
    const imgContainer = document.createElement("div");
    imgContainer.className = "pet-card-img";
    imgContainer.id = `img-${pet.id}`;

    const img = document.createElement("img");
    img.src = `public/images/pets/${pet.id}.jpg`;
    img.alt = sanitizedPetName;
    img.loading = "lazy";

    // Handle image load error
    img.addEventListener("error", function() {
      const placeholder = document.createElement("div");
      placeholder.className = "pet-placeholder";
      placeholder.style.background = `${pet.color}20`;
      placeholder.style.borderBottom = `2px solid ${pet.color}`;
      placeholder.innerHTML = `<span>${pet.emoji}</span><span class="pet-placeholder-label">Photo coming soon</span>`;
      this.parentElement.replaceChild(placeholder, this);
    });

    imgContainer.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "pet-card-body";
    cardBody.innerHTML = `
      <div class="pet-name">${sanitizedPetName}</div>
      <div class="pet-owner">${sanitizedOwner}'s pet</div>
      <div class="pet-traits">${tagsHtml}</div>
      <p class="pet-bio">${sanitizedBio}</p>
      <div class="chef-creation">
        <div class="chef-label">👨‍🍳 Chef's Creation</div>
        <div class="chef-name">"${sanitizedCreationName}"</div>
        <div class="chef-desc">${sanitizedCreationDesc}</div>
      </div>
    `;

    card.appendChild(imgContainer);
    card.appendChild(cardBody);

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

  // Validate form inputs
  const ownerName = SecurityUtils.validateFormInput(document.getElementById("ownerName").value);
  const petName = SecurityUtils.validateFormInput(document.getElementById("petName").value);
  const personality = SecurityUtils.validateFormInput(document.getElementById("personality").value);
  const quirks = SecurityUtils.validateFormInput(document.getElementById("quirks").value, 1000);

  if (!ownerName || !petName || !personality || !quirks) {
    AccessibilityUtils.announceToScreenReader("Please fill in all required fields", "assertive");
    return;
  }

  // Brief loading shimmer on button
  const btn = form.querySelector("button[type=submit]");
  btn.textContent = "Submitting to the chef…";
  btn.disabled = true;
  btn.setAttribute("aria-busy", "true");

  setTimeout(() => {
    form.style.display = "none";
    success.classList.add("visible");
    // Scroll to success and set focus
    success.scrollIntoView({ behavior: "smooth", block: "center" });
    const successHeading = success.querySelector("h3");
    if (successHeading) {
      successHeading.setAttribute("tabindex", "-1");
      successHeading.focus();
    }
    AccessibilityUtils.announceToScreenReader("Form submitted successfully. The chef has received your submission.");
    btn.setAttribute("aria-busy", "false");
  }, 1200);
}

function resetForm() {
  const form = document.getElementById("qForm");
  const success = document.getElementById("qSuccess");
  const btn = form.querySelector("button[type=submit]");

  form.reset();
  btn.textContent = "Submit to the Chef 🍽️";
  btn.disabled = false;
  btn.removeAttribute("aria-busy");
  form.style.display = "block";
  success.classList.remove("visible");

  // Return focus to first form field
  const firstInput = form.querySelector("input");
  if (firstInput) {
    firstInput.focus();
  }
  AccessibilityUtils.announceToScreenReader("Form reset. Ready for a new pet submission.");
}

// ---- Mobile nav toggle ----
function toggleNav() {
  const mobile = document.getElementById("navMobile");
  const hamburger = document.querySelector(".nav-hamburger");
  const isOpen = mobile.classList.contains("open");

  mobile.classList.toggle("open");

  // Update ARIA attributes
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", !isOpen);
  }

  // Trap focus when menu is open
  if (!isOpen) {
    AccessibilityUtils.trapFocus(mobile);
    const firstLink = mobile.querySelector("a");
    if (firstLink) {
      firstLink.focus();
    }
  }
}

// ---- Scroll-based nav shadow ----
const handleNavScroll = PerformanceUtils.debounce(() => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 10) {
    nav.style.boxShadow = "0 2px 20px rgba(80,50,140,0.10)";
  } else {
    nav.style.boxShadow = "none";
  }
}, 10);

window.addEventListener("scroll", handleNavScroll, { passive: true });

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
  initializeEventListeners();
  PerformanceUtils.lazyLoadImages();
});

// ---- Event Listeners Setup ----
function initializeEventListeners() {
  // Form submission
  const form = document.getElementById("qForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }

  // Reset form button
  const resetBtn = document.querySelector("#qSuccess button");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetForm);
  }

  // Nav hamburger
  const hamburger = document.querySelector(".nav-hamburger");
  if (hamburger) {
    hamburger.removeAttribute("onclick");
    hamburger.addEventListener("click", toggleNav);
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-controls", "navMobile");
  }

  // Mobile nav links
  const mobileLinks = document.querySelectorAll(".nav-mobile a");
  mobileLinks.forEach(link => {
    link.removeAttribute("onclick");
    link.addEventListener("click", toggleNav);
  });
}
