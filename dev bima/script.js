document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header")
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelector(".nav-links")
  const typingEffect = document.querySelector(".typing-effect")
  const heroImageContainer = document.querySelector(".hero-image-container")

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Header scroll effect and section fade-in
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    if (scrollPosition > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150
      if (scrollPosition >= sectionTop) {
        section.classList.add("fade-in")
      }
    })
  })

  // 3D effect for hero image
  if (heroImageContainer) {
    document.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25
      heroImageContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    })

    // Reset transform on mouse leave
    document.addEventListener("mouseleave", () => {
      heroImageContainer.style.transform = "rotateY(0deg) rotateX(0deg)"
    })
  }

  // Typing effect
  if (typingEffect) {
    const phrases = ["Abimael", "Abimael", "Abimael", "Abimael"]
    let currentPhraseIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let typingSpeed = 150

    function typeEffect() {
      const currentPhrase = phrases[currentPhraseIndex]

      if (isDeleting) {
        typingEffect.textContent = currentPhrase.substring(0, currentCharIndex - 1)
        currentCharIndex--
      } else {
        typingEffect.textContent = currentPhrase.substring(0, currentCharIndex + 1)
        currentCharIndex++
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true
        typingSpeed = 50
        setTimeout(typeEffect, 1500)
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
        typingSpeed = 100
        setTimeout(typeEffect, 500)
      } else {
        setTimeout(typeEffect, typingSpeed)
      }
    }

    typeEffect()
  }

  // Stars background
  const starsContainer = document.querySelector(".stars")
  const numberOfStars = 150

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div")
    star.classList.add("star")
    star.style.top = `${Math.random() * 100}%`
    star.style.left = `${Math.random() * 100}%`
    star.style.animationDelay = `${Math.random() * 5}s`
    starsContainer.appendChild(star)
  }

  // Mobile menu toggle
  const menuToggle = document.createElement("button")
  menuToggle.innerHTML = "☰"
  menuToggle.classList.add("menu-toggle")
  document.body.appendChild(menuToggle)

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show")
    menuToggle.innerHTML = navLinks.classList.contains("show") ? "✕" : "☰"
  })

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show")
      menuToggle.innerHTML = "☰"
    })
  })

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("show")
      menuToggle.innerHTML = "☰"
    }
  })

  // Skills animation with Intersection Observer
  const skills = document.querySelectorAll(".skill")

  const animateSkills = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }

  const skillsObserver = new IntersectionObserver(animateSkills, {
    root: null,
    threshold: 0.3,
  })

  skills.forEach((skill) => skillsObserver.observe(skill))

  // Services animation with Intersection Observer
  const services = document.querySelectorAll(".service")

  const animateServices = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Animate the service description
        const description = entry.target.querySelector("p")
        if (description) {
          setTimeout(() => {
            description.style.opacity = "1"
            description.style.transform = "translateY(0)"
            description.style.maxHeight = "200px"
          }, 300)
        }
      }
    })
  }

  const servicesObserver = new IntersectionObserver(animateServices, {
    root: null,
    threshold: 0.2,
  })

  services.forEach((service) => servicesObserver.observe(service))

  // Projects animation with Intersection Observer
  const projects = document.querySelectorAll(".project")

  const animateProjects = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }

  const projectsObserver = new IntersectionObserver(animateProjects, {
    root: null,
    threshold: 0.1,
  })

  projects.forEach((project) => projectsObserver.observe(project))

  // Education cards animation
  const formacoes = document.querySelectorAll(".formacao")

  const animateFormacoes = (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate")
        }, index * 200)
      }
    })
  }

  const formacoesObserver = new IntersectionObserver(animateFormacoes, {
    root: null,
    threshold: 0.1,
  })

  formacoes.forEach((formacao) => formacoesObserver.observe(formacao))

  // Social cards hover effect
  const socialCards = document.querySelectorAll(".social-card")

  socialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".social-card-icon i")
      if (icon) {
        icon.style.transform = "scale(1.2)"
      }
    })

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".social-card-icon i")
      if (icon) {
        icon.style.transform = "scale(1)"
      }
    })
  })

  // Tech icons animationAbimael
  const techIcons = document.querySelectorAll(".tech-icon")

  techIcons.forEach((icon, index) => {
    setTimeout(() => {
      icon.style.opacity = "1"
      icon.style.transform = "translateY(0)"
    }, 100 * index)
  })
})
