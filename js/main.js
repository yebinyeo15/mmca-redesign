const li1 = document.querySelector('.main .con2 ul li:first-child');
const li2 = document.querySelector('.main .con2 ul li:last-child');
const con2 = document.querySelector('.main .con2');

if (li1 && li2 && con2) {
    const defaultExhibitionBackground = './images/mmca-con1-bg.png';
    const setExhibitionBackground = (imagePath) => {
        con2.style.backgroundImage = `url('${imagePath}')`;
    };
    const resetExhibitionBackground = () => {
        setExhibitionBackground(defaultExhibitionBackground);
    };

    li1.addEventListener('mouseenter', () => {
        setExhibitionBackground('./images/mmca-con1-current.png');
    });
    li2.addEventListener('mouseenter', () => {
        setExhibitionBackground('./images/mmca-con1-upcoming.png');
    });
    li1.addEventListener('mouseleave', resetExhibitionBackground);
    li2.addEventListener('mouseleave', resetExhibitionBackground);
    li1.addEventListener('focusin', () => {
        setExhibitionBackground('./images/mmca-con1-current.png');
    });
    li2.addEventListener('focusin', () => {
        setExhibitionBackground('./images/mmca-con1-upcoming.png');
    });
    li1.addEventListener('focusout', resetExhibitionBackground);
    li2.addEventListener('focusout', resetExhibitionBackground);
}

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
