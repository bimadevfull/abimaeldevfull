document.addEventListener("DOMContentLoaded", () => {
  // Loading Screen
  const loader = document.getElementById("loader")
  const loadingProgress = document.querySelector(".loading-progress")
  if (loader && loadingProgress) {
    let progress = 0
    const interval = setInterval(() => {
      progress += 1
      loadingProgress.style.width = `${progress}%`
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          loader.style.opacity = "0"
          loader.addEventListener("transitionend", () => loader.remove())
        }, 200) // Tempo de transição diminuído para 200ms
      }
    }, 10) // Intervalo diminuído para 10ms para acelerar o carregamento
  }

  // Particles.js initialization
  const particlesJS = window.particlesJS // Declare the variable before using it
  if (typeof particlesJS !== "undefined") {
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
          value: "#00d4ff", // Primary color
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
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
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
          color: "#0066ff", // Secondary color
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
    })
  }

  // Header scroll effect
  const header = document.getElementById("header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navClose = document.getElementById("nav-close")
  const navLinks = document.querySelectorAll(".nav__link")
  if (navToggle && navMenu && navClose) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu")
    })
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu")
    })
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
      })
    })
  }

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]")
  function scrollActive() {
    const scrollY = window.pageYOffset
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 50
      const sectionId = current.getAttribute("id")
      const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`)
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add("active-link")
      } else {
        navLink?.classList.remove("active-link")
      }
    })
  }
  window.addEventListener("scroll", scrollActive)

  // Typing effect for profession
  const professionText = document.getElementById("profession-text")
  const professions = [ "Engenheiro de Software" , "Dev Full-Stack",  "Freelancer" , ]
  let professionIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 150
  function typeProfession() {
    const currentProfession = professions[professionIndex]
    if (isDeleting) {
      professionText.textContent = currentProfession.substring(0, charIndex - 1)
      charIndex--
    } else {
      professionText.textContent = currentProfession.substring(0, charIndex + 1)
      charIndex++
    }
    if (!isDeleting && charIndex === currentProfession.length) {
      typingSpeed = 2000 // Pause at end of typing
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      professionIndex = (professionIndex + 1) % professions.length
      typingSpeed = 150 // Resume normal typing speed
    } else {
      typingSpeed = isDeleting ? 75 : 150
    }
    setTimeout(typeProfession, typingSpeed)
  }
  if (professionText) {
    typeProfession()
  }

  // Stats counter animation
  const statItems = document.querySelectorAll(".stat-item")
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the item is visible
  }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const target = Number.parseInt(statNumber.dataset.target)
        let current = 0
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 10) // Calculate increment per 10ms
        const updateCounter = () => {
          current += increment
          if (current < target) {
            statNumber.textContent = Math.ceil(current)
            requestAnimationFrame(updateCounter)
          } else {
            statNumber.textContent = target
          }
        }
        updateCounter()
        observer.unobserve(entry.target) // Stop observing once animated
      }
    })
  }, observerOptions)
  statItems.forEach((item) => {
    observer.observe(item)
  })

  // Skill bar animation on scroll
  const skillProgressBars = document.querySelectorAll(".skill__progress")
  const skillObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7, // Trigger when 70% of the skill bar is visible
  }
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const width = progressBar.dataset.width
        progressBar.style.width = width
        observer.unobserve(progressBar) // Stop observing once animated
      }
    })
  }, skillObserverOptions)
  skillProgressBars.forEach((bar) => {
    skillObserver.observe(bar)
  })

  // Scroll to top button
  const scrollTopButton = document.getElementById("scroll-top")
  if (scrollTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTopButton.classList.add("show")
      } else {
        scrollTopButton.classList.remove("show")
      }
    })
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Copy Email to Clipboard
  const copyEmailBtn = document.querySelector(".copy-email-btn")
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.dataset.email
      navigator.clipboard
        .writeText(email)
        .then(() => {
          const originalText = copyEmailBtn.innerHTML
          copyEmailBtn.innerHTML = 'Copiado! <i class="fas fa-check"></i>'
          setTimeout(() => {
            copyEmailBtn.innerHTML = originalText
          }, 2000)
        })
        .catch((err) => {
          console.error("Failed to copy email: ", err)
          alert("Erro ao copiar o e-mail. Por favor, copie manualmente: " + email)
        })
    })
  }
})


