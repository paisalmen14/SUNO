const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links'); 

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    
    if (navLinksContainer && navLinksContainer.classList.contains('active')) {
      navLinksContainer.classList.remove('active');
      menuToggle.classList.remove('active');
    }
    
    document.querySelectorAll('.navbar a').forEach(link => {
      link.classList.remove('active');
    });

    anchor.classList.add('active');

    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});


window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero-content');
  if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';

    setTimeout(() => {
      heroText.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    }, 400);
  }
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPositionY = `${offset}px`;
  }
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links ul li a'); 

window.addEventListener('scroll', () => {
    let current = 'home'; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop - 100) { 
            current = sectionId;
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === current) {
            a.classList.add('active');
        }
    });
});

const revealElements = document.querySelectorAll(
  '.about, .mission, .member, .memory-card'
);

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach(el => {
  el.classList.add('hidden'); // start state
  revealObserver.observe(el);
});

const logo = document.querySelector('.logo');
let glow = 0;
setInterval(() => {
  glow = (glow + 1) % 100;
  logo.style.textShadow = `
    0 0 ${8 + Math.sin(glow / 10) * 6}px #ff7f00,
    0 0 ${15 + Math.cos(glow / 8) * 10}px #ff9f43
  `;
}, 100);

const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
  exploreBtn.addEventListener('mouseenter', () => {
    exploreBtn.style.transition = 'all 0.3s ease';
    exploreBtn.style.boxShadow = '0 0 25px #ff7f00, 0 0 45px #ff9f43';
  });
  exploreBtn.addEventListener('mouseleave', () => {
    exploreBtn.style.boxShadow = '0 0 15px #ff9f43';
  });
}

// ===== POPUP MEMORIES =====
const memoryCards = document.querySelectorAll('.memory-card');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupTitle = document.getElementById('popup-title');
const popupDesc = document.getElementById('popup-desc');
const closeBtn = document.querySelector('.close-btn');

memoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');

    popupImg.src = imgSrc;
    popupTitle.textContent = title;
    popupDesc.textContent = desc;
    popup.classList.add('active');
  });
});

if (closeBtn) {
  closeBtn.addEventListener('click', () => popup.classList.remove('active'));
}

if (popup) {
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('active');
  });
}