document.addEventListener("DOMContentLoaded", () => {
  // Redirige vers la section "Home" au chargement de la page
  window.location.hash = "#home";

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#bd4bff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#bd4bff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

  // Navigation functionality
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll(".section");
  const nav = document.querySelector(".glass-nav");

  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    navLinks.classList.toggle("active");
  });

  // Close menu when a nav item is clicked
  navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      navLinks.classList.remove("active");
    });
  });

  // Scroll functionality
  window.addEventListener("scroll", () => {
    // Nav bar background change on scroll
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Highlight active nav link based on scroll position
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinksItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });

    // Animate skill bars when in viewport
    const skillsSection = document.getElementById("skills");
    const skillBars = document.querySelectorAll(".skill-progress");

    if (isInViewport(skillsSection)) {
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        if (!width || width === "0px") {
          const percentageWidth =
            bar.parentElement.previousElementSibling.querySelector(
              ".percentage"
            ).textContent;
          bar.style.width = percentageWidth;
        }
      });
    }

    // Animate counters when in viewport
    const aboutSection = document.getElementById("about");
    const counters = document.querySelectorAll(".counter");

    if (isInViewport(aboutSection)) {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
          counter.innerText = Math.min(Math.ceil(count + increment), target);
          setTimeout(() => {
            animateCounter(counter);
          }, 20);
        }
      });
    }
  });

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Animate counter
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.min(Math.ceil(count + increment), target);
      setTimeout(() => {
        animateCounter(counter);
      }, 20);
    }
  }

  // Switch skills tabs
  const skillsCategories = document.querySelectorAll(".category");
  const skillsGroups = document.querySelectorAll(".skills-group");

  skillsCategories.forEach((category) => {
    category.addEventListener("click", () => {
      // Remove active class from all categories
      skillsCategories.forEach((c) => c.classList.remove("active"));
      // Add active class to clicked category
      category.classList.add("active");

      // Hide all skill groups
      skillsGroups.forEach((group) => group.classList.remove("active"));
      // Show the corresponding skill group
      const targetGroup = document.getElementById(
        category.getAttribute("data-category")
      );
      targetGroup.classList.add("active");
    });
  });

  // Form submission with validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      let isValid = true;

      if (nameInput.value.trim() === "") {
        nameInput.style.borderColor = "red";
        isValid = false;
      } else {
        nameInput.style.borderColor = "";
      }

      if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = "red";
        isValid = false;
      } else {
        emailInput.style.borderColor = "";
      }

      if (subjectInput.value.trim() === "") {
        subjectInput.style.borderColor = "red";
        isValid = false;
      } else {
        subjectInput.style.borderColor = "";
      }

      if (messageInput.value.trim() === "") {
        messageInput.style.borderColor = "red";
        isValid = false;
      } else {
        messageInput.style.borderColor = "";
      }

      if (isValid) {
        // In a real application, you would send the form data to a server here
        // For demo purposes, we'll just show an alert
        alert("Message sent successfully!");
        contactForm.reset();
      }
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 20px 50px 0 rgba(0, 0, 0, 0.6)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
    });
  });

  // Form input animation
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.querySelector(".form-glow").style.width = "100%";
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.parentElement.querySelector(".form-glow").style.width = "0";
      }
    });
  });

  // Initial animations on page load
  setTimeout(() => {
    document.querySelectorAll(".glass-card").forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 200);
    });
  }, 500);

  // Exemple pour un bouton de contact
  const contactButton = document.querySelector(".btn.secondary-btn");
  contactButton.addEventListener("click", () => {
    window.location.href = "#contact";
  });

  // Animation de téléchargement
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation(); // Empêche la propagation de l'événement

      const link = downloadBtn.getAttribute("href");
      const btnText = downloadBtn.querySelector(".btn-text");
      const icon = downloadBtn.querySelector(".download-icon");

      if (downloadBtn.classList.contains("circle")) return;

      // Transformation en cercle
      downloadBtn.classList.add("circle");
      icon.classList.remove("fa-download");
      icon.classList.add("fa-spinner");

      // Animation de chargement
      downloadBtn.classList.add("loading");

      // Simulation de progression
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 2;
        downloadBtn.style.setProperty("--progress", `${progress}%`);

        if (progress >= 100) {
          clearInterval(progressInterval);
          finishDownload();
        }
      }, 30);

      function finishDownload() {
        downloadBtn.classList.remove("loading");
        icon.classList.remove("fa-spinner");
        icon.classList.add("fa-check");
        downloadBtn.classList.add("success");

        setTimeout(() => {
          // Retour à l'état initial
          downloadBtn.classList.remove("circle", "success");
          downloadBtn.style.removeProperty("--progress");
          icon.classList.remove("fa-check");
          icon.classList.add("fa-download");

          // Déclencher le téléchargement
          const downloadLink = document.createElement("a");
          downloadLink.href = link;
          downloadLink.download = "CV.pdf";
          downloadLink.click();
        }, 1000);
      }
    });
  }

  // Fonction pour créer l'effet de particules
  function createParticles(button) {
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";

      // Position aléatoire
      const angle = (i / particleCount) * 360;
      const x = Math.cos((angle * Math.PI) / 180);
      const y = Math.sin((angle * Math.PI) / 180);

      particle.style.setProperty("--x", x);
      particle.style.setProperty("--y", y);

      button.appendChild(particle);

      // Nettoyage des particules
      setTimeout(() => {
        particle.remove();
      }, 600);
    }
  }

  function sendEmail(e) {
    e.preventDefault();

    const btn = e.target.querySelector("button");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    emailjs
      .sendForm("service_tcajizf", "template_0c0b7en", e.target)
      .then(() => {
        btn.textContent = "Message Sent!";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          e.target.reset();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        btn.textContent = "Error! Try Again";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      });

    return false;
  }

  // Gestionnaire de projet modal
  class ProjectModal {
    constructor() {
      this.modal = document.querySelector(".project-modal");
      this.modalContent = this.modal.querySelector(".modal-content");
      this.closeBtn = this.modal.querySelector(".modal-close");
      this.title = this.modal.querySelector(".project-title");
      this.description = this.modal.querySelector(".project-description");
      this.customerInfo = this.modal.querySelector(".customer-info");
      this.galleryContainer = this.modal.querySelector(".gallery-container");
      this.currentSlide = 0;
      this.images = [];

      this.init();
    }

    init() {
      this.closeBtn.addEventListener("click", () => this.hide());
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.hide();
        if (e.key === "ArrowLeft") this.prevSlide();
        if (e.key === "ArrowRight") this.nextSlide();
      });

      this.modal
        .querySelector(".prev-btn")
        .addEventListener("click", () => this.prevSlide());
      this.modal
        .querySelector(".next-btn")
        .addEventListener("click", () => this.nextSlide());
    }

    show(projectCard) {
      const data = projectCard.dataset;
      this.images = JSON.parse(data.images);
      this.title.textContent = projectCard.querySelector("h3").textContent;
      this.description.textContent = data.description;
      this.customerInfo.textContent = `Client: ${data.customer}`;

      this.loadGallery();
      this.modal.classList.add("active");
      this.modalContent.classList.add("active");
    }

    hide() {
      this.modalContent.classList.remove("active");
      setTimeout(() => {
        this.modal.classList.remove("active");
        this.galleryContainer.innerHTML = "";
        this.currentSlide = 0;
      }, 300);
    }

    loadGallery() {
      this.galleryContainer.innerHTML = "";
      this.images.forEach((src, index) => {
        const slide = document.createElement("div");
        slide.className = `gallery-slide ${index === 0 ? "active" : ""}`;
        slide.innerHTML = `<img src="${src}" alt="Project image ${index + 1}">`;
        this.galleryContainer.appendChild(slide);
      });
    }

    prevSlide() {
      this.showSlide(this.currentSlide - 1);
    }

    nextSlide() {
      this.showSlide(this.currentSlide + 1);
    }

    showSlide(index) {
      const slides = this.galleryContainer.querySelectorAll(".gallery-slide");
      if (!slides.length) return;

      slides[this.currentSlide].classList.remove("active");
      this.currentSlide = (index + slides.length) % slides.length;
      slides[this.currentSlide].classList.add("active");
    }
  }

  // Initialisation
  const modal = new ProjectModal();

  document
    .querySelectorAll(".project-card .btn.small-btn")
    .forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        modal.show(e.target.closest(".project-card"));
      });
    });
});
