const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
let lenis = null;

const setupSmoothScroll = () => {
    const shouldUseLenis = desktopPointerQuery.matches && !reducedMotionQuery.matches;

    if (!shouldUseLenis || typeof Lenis === 'undefined') {
        lenis?.destroy();
        lenis = null;
        return;
    }

    if (lenis) return;

    lenis = new Lenis({
        duration: 1.15,
        wheelMultiplier: 1.0,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
        anchors: {
            duration: 1.15,
        },
    });
};

setupSmoothScroll();
reducedMotionQuery.addEventListener('change', setupSmoothScroll);
desktopPointerQuery.addEventListener('change', setupSmoothScroll);

document.addEventListener('click', (event) => {
    if (lenis || reducedMotionQuery.matches) return;

    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    const hash = anchor.getAttribute('href');
    const target = hash === '#'
        ? document.documentElement
        : document.getElementById(decodeURIComponent(hash.slice(1)));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        reverseDirection: true,
    },
    navigation: {
        prevEl: '.hero-prev',
        nextEl: '.hero-next',
    },
    pagination: {
        el: '.hero-control .swiper-pagination',
        clickable: true,
    },
});

const heroPause = document.querySelector('.hero-pause');
let isHeroPaused = false;

if (heroPause) {
    heroPause.addEventListener('click', function () {
        isHeroPaused = !isHeroPaused;
        heroPause.classList.toggle('on', isHeroPaused);
        heroPause.textContent = isHeroPaused ? '재생' : '정지';

        if (isHeroPaused) {
            heroSwiper.autoplay.stop();
        } else {
            heroSwiper.autoplay.start();
        }
    });
}

const museumFamily = document.querySelector('#footer .family');
const museumFamilyButton = museumFamily?.querySelector('.title button');

if (museumFamily && museumFamilyButton) {
    const closeMuseumFamily = () => {
        museumFamily.classList.remove('is-open');
        museumFamilyButton.setAttribute('aria-expanded', 'false');
    };

    museumFamilyButton.addEventListener('click', () => {
        const isOpen = museumFamily.classList.toggle('is-open');
        museumFamilyButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!museumFamily.contains(event.target)) {
            closeMuseumFamily();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMuseumFamily();
            museumFamilyButton.focus();
        }
    });
}
