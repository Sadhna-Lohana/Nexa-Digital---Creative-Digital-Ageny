const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const project = document.querySelector("#project").value.trim();

    if (!name || !email || !project) {
      formMessage.textContent = "Please complete all fields before preparing your email.";
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailIsValid) {
      formMessage.textContent = "Please enter a valid email address.";
      document.querySelector("#email").focus();
      return;
    }

    const subject = encodeURIComponent(`New project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${project}`);
    const recipient = "hello@nexadigital.example"; // Replace with your real email before publishing.
    formMessage.textContent = "Opening your email app. Review the message and send it from there.";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}


 // Active Navigation Link Highlighting
const activeNavLinks = document.querySelectorAll(
  '.nav-links a[href^="#"], .brand[href^="#"]'
);

const pageSections = document.querySelectorAll(
  "section[id], header[id], footer[id]"
);

function updateActiveLink() {
  let currentSection = "";

  pageSections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  activeNavLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);
