// ===== PARTICLES CONFIGURATION - bima atv eng rev =====
const particlesJS = window.particlesJS
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
      value: "#00d4ff", // NOVA COR AZUL CIANO
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00d4ff", // NOVA COR AZUL CIANO - tts
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
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
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
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
})

// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader")
  setTimeout(() => {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.style.display = "none"
    }, 100)
  }, 1000)
})

// ===== NAVIGATION =====
const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")

// Show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

// Hide menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

// Remove menu mobile
navLinks.forEach((n) =>
  n.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  }),
)

// ===== ACTIVE LINK =====
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

// ===== TYPING ANIMATION =====
const professionText = document.getElementById("profession-text")
const professions = ["DESENVOLVEDOR FULL-STACK", "ARQUITETO DE SOLUÇÕES"]
let professionIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentProfession = professions[professionIndex]
  if (isDeleting) {
    professionText.textContent = currentProfession.substring(0, charIndex - 1)
    charIndex--
  } else {
    professionText.textContent = currentProfession.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100
  if (!isDeleting && charIndex === currentProfession.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    professionIndex = (professionIndex + 1) % professions.length
    typeSpeed = 500
  }

  setTimeout(typeWriter, typeSpeed)
}

// Start typing animation
setTimeout(typeWriter, 1000)

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".stat-number")
const speed = 200
const countUp = (counter) => {
  const target = +counter.getAttribute("data-target")
  const count = +counter.innerText
  const inc = target / speed

  if (count < target) {
    counter.innerText = Math.ceil(count + inc)
    setTimeout(() => countUp(counter), 1)
  } else {
    counter.innerText = target
  }
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        countUp(counter)
        counterObserver.unobserve(counter)
      }
    })
  },
  { threshold: 0.7 },
)

counters.forEach((counter) => {
  counterObserver.observe(counter)
})

// ===== SKILLS ANIMATION =====
const skillBars = document.querySelectorAll(".skill__progress")
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target
        const width = skillBar.getAttribute("data-width")
        skillBar.style.width = width
        skillsObserver.unobserve(skillBar)
      }
    })
  },
  { threshold: 0.2 },
)

skillBars.forEach((skill) => {
  skillsObserver.observe(skill)
})

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".section, .project__card, .timeline__item, .skill__item")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

revealElements.forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(50px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  revealObserver.observe(element)
})

// ===== SCROLL TO TOP =====
const scrollTop = document.getElementById("scroll-top")
window.addEventListener("scroll", () => {
  if (window.scrollY >= 560) {
    scrollTop.classList.add("show")
  } else {
    scrollTop.classList.remove("show")
  }
})

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation - pos msss
  if (name && email && subject && message) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<span>ENVIANDO...</span><i class="fas fa-spinner fa-spin"></i>'
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Mensagem enviada com sucesso! Entrarei em contato em breve.")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      // Remove focus from form fields - não esquecer de remover a demora ,100.00
      const formGroups = contactForm.querySelectorAll(".form__group")
      formGroups.forEach((group) => {
        const input = group.querySelector("input, textarea")
        const label = group.querySelector("label")
        if (input.value === "") {
          label.style.top = "1rem"
          label.style.color = "var(--text-secondary)"
          label.style.fontSize = "0.9rem" // Adjusted font size for label
        }
      })
    }, 2000)
  } else {
    alert("Por favor, preencha todos os campos.")
  }
})

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===== HEADER BACKGROUND ON SCROLL =====
const header = document.getElementById("header")
window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)"
    header.style.backdropFilter = "blur(20px)"
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  }
})

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-icon")
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ===== GLITCH EFFECT ON HOVER =====
const glitchElements = document.querySelectorAll(".logo-glitch")
glitchElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    // Re-add glitch on hover only
    element.style.animation = "glitch-1 0.3s infinite, glitch-2 0.3s infinite"
  })
  element.addEventListener("mouseleave", () => {
    element.style.animation = "none"
  })
})

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
window.addEventListener(
  "scroll",
  debounce(() => {
    scrollActive()
  }, 10),
)

// ===== EASTER EGG =====
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }
  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated
    document.body.style.filter = "hue-rotate(180deg)"
    setTimeout(() => {
      document.body.style.filter = "none"
    }, 3000)
    konamiCode = []
  }
})

// ===== CONSOLE MESSAGE =====
console.log(
  `%c╔══════════════════════════════════════╗
║                                      ║
║         🚀 BIMA DEV 🚀               ║
║                                      ║
║     Desenvolvedor Full-Stack         ║
║     Criando o futuro digital         ║
║                                      ║
║     Interessado em colaborar?        ║
║     abimaeldevfull.stack@gmail.com   ║
║                                      ║
╚══════════════════════════════════════╝`,
  "color: #00d4ff; font-family: monospace; font-size: 12px; font-weight: bold;",
)
