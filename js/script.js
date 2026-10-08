/* ICT251 Activity 3 - Interactive Personal Website
   Four features: (1) contact form validation and preview,
   (2) gallery viewer, (3) project filter, (4) theme switch. */

/* ---------- Feature 1: Contact form validation and preview ---------- */

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const summaryBox = document.getElementById("form-summary");

// Simple email pattern: text, one @, text, a dot, text, no spaces
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Show or clear an error message under a field
function setError(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  errorEl.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

// Check all three fields; returns true only when every field is valid
function validateForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let valid = true;

  if (name === "") {
    setError(nameInput, "name-error", "Please enter your name (spaces only is not allowed).");
    valid = false;
  } else {
    setError(nameInput, "name-error", "");
  }

  if (email === "") {
    setError(emailInput, "email-error", "Please enter your email address.");
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError(emailInput, "email-error", "Please enter a valid email, for example name@example.com.");
    valid = false;
  } else {
    setError(emailInput, "email-error", "");
  }

  if (message === "") {
    setError(messageInput, "message-error", "Please enter a message (spaces only is not allowed).");
    valid = false;
  } else {
    setError(messageInput, "message-error", "");
  }

  return valid;
}

// Handle submit: stop the page reloading, validate, then show a local summary
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    // textContent is used so user text is never treated as HTML
    document.getElementById("summary-name").textContent = nameInput.value.trim();
    document.getElementById("summary-email").textContent = emailInput.value.trim();
    document.getElementById("summary-message").textContent = messageInput.value.trim();
    summaryBox.hidden = false;
  } else {
    summaryBox.hidden = true;
    // Move focus to the first invalid field
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) { firstInvalid.focus(); }
  }
});

/* ---------- Feature 2: Gallery viewer (Previous / Next) ---------- */

// Array of photos: edit src, alt and caption to match your own images
const photos = [
  { src: "images/photo1.jpg", alt: "Photo one of Methuselah Mutoiwa", caption: "Photo one: me, Methuselah Mutoiwa" },
  { src: "images/photo2.jpg", alt: "Photo two of Methuselah Mutoiwa", caption: "Photo two: another moment from my student life" },
  { src: "images/photo3.jpg", alt: "Photo three of Methuselah Mutoiwa", caption: "Photo three: something I enjoy" }
];

let currentPhoto = 0;
const galleryImage = document.getElementById("gallery-image");
const galleryCaption = document.getElementById("gallery-caption");
const galleryCounter = document.getElementById("gallery-counter");
const prevBtn = document.getElementById("gallery-prev");
const nextBtn = document.getElementById("gallery-next");

// Update the image, caption, counter and disable buttons at the first/last photo
function showPhoto(index) {
  currentPhoto = index;
  galleryImage.src = photos[index].src;
  galleryImage.alt = photos[index].alt;
  galleryCaption.textContent = photos[index].caption;
  galleryCounter.textContent = "Photo " + (index + 1) + " of " + photos.length;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === photos.length - 1;
}

prevBtn.addEventListener("click", function () {
  if (currentPhoto > 0) { showPhoto(currentPhoto - 1); }
});

nextBtn.addEventListener("click", function () {
  if (currentPhoto < photos.length - 1) { showPhoto(currentPhoto + 1); }
});

showPhoto(0);

/* ---------- Feature 3: Project filter with reset ---------- */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project");
const filterMessage = document.getElementById("filter-message");
const resetBtn = document.getElementById("filter-reset");

// Show only the cards that match the chosen category and report the result
function filterProjects(category) {
  let visibleCount = 0;

  projectCards.forEach(function (card) {
    const show = category === "all" || card.dataset.category === category;
    card.hidden = !show;
    if (show) { visibleCount++; }
  });

  filterButtons.forEach(function (btn) {
    const active = btn.dataset.filter === category;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (visibleCount === 0) {
    filterMessage.textContent = "No projects match this filter. Press Reset to see all projects.";
  } else {
    filterMessage.textContent = "Showing " + visibleCount + " of " + projectCards.length + " projects.";
  }
}

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterProjects(btn.dataset.filter);
  });
});

resetBtn.addEventListener("click", function () {
  filterProjects("all");
});

filterProjects("all");

/* ---------- Feature 4: Light / dark theme switch ---------- */

const themeToggle = document.getElementById("theme-toggle");

// Apply a theme, update the button text and save the choice
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  try { localStorage.setItem("theme", theme); } catch (e) { /* storage unavailable */ }
}

themeToggle.addEventListener("click", function () {
  applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

// Restore the saved preference when the page loads
let savedTheme = "light";
try { savedTheme = localStorage.getItem("theme") || "light"; } catch (e) { /* ignore */ }
applyTheme(savedTheme);