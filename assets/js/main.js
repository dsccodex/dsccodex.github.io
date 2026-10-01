/* ==================== MOBILE MENU ==================== */

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.classList.add('no-scroll');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('no-scroll');
    });
}

/* Fecha o menu ao clicar em qualquer link no celular. */
const navLinks = document.querySelectorAll('.nav__menu a');

function closeMenu() {
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('no-scroll');
}

navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

// Garante que o menu nunca fique preso ao trocar de seção por âncora.
window.addEventListener('hashchange', closeMenu);

// Em telas maiores, o menu mobile também é resetado.
window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) {
        closeMenu();
    }
});


/* ==================== HEADER ==================== */

const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('bg-header');
    } else {
        header.classList.remove('bg-header');
    }
}

window.addEventListener('scroll', scrollHeader);
scrollHeader();


/* ==================== ACTIVE LINK ==================== */

const sections = document.querySelectorAll('section[id]');

function activeLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (!link) {
            return;
        }

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach((item) => item.classList.remove('active-link'));
            link.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', activeLink);
activeLink();


/* ==================== SCROLL REVEAL ==================== */
/*
 * Aqui usamos IntersectionObserver do próprio navegador.
 * Assim não precisamos adicionar uma biblioteca externa apenas para
 * revelar os elementos durante o scroll.
 */

const revealElements = document.querySelectorAll(
    '.section__data, .services__card, .about__content, .about__images, .process__card, .portfolio__card, .contact__content, .contact__form'
);

revealElements.forEach((element) => {
    element.classList.add('reveal');
});

const observer = new IntersectionObserver(
    (entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observerInstance.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => observer.observe(element));


/* ==================== CONTACT FORM ==================== */

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        contactMessage.textContent =
            'Mensagem preparada! Em seguida podemos conectar este formulário ao seu e-mail ou WhatsApp.';

        contactForm.reset();
    });
}


/* ==================== FOOTER YEAR ==================== */

const footerYear = document.getElementById('footer-year');

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
