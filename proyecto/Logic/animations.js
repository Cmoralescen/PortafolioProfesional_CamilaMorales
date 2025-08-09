document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 1800,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        spaceBetween: 30,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });

    const pasos = document.querySelectorAll(".fade-step");
    let index = 0;

    function showOnly(indexToShow) {
        pasos.forEach((paso, i) => {
            paso.style.display = "none";
            paso.classList.remove("active");
        });

        const pasoActual = pasos[indexToShow];
        pasoActual.style.display = "block";
        void pasoActual.offsetWidth;
        pasoActual.classList.add("active");
    }

    function setupPasos() {
        if (window.innerWidth < 768) {
            showOnly(index);
            setInterval(() => {
                index = (index + 1) % pasos.length;
                showOnly(index);
            }, 4000);
        } else {
            pasos.forEach(paso => paso.classList.add("active"));
        }
    }

    setupPasos();
    
});

let scrollProgress = document.getElementById("progress");
scrollProgress.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

let calcScrollValue = () => {
    let progressValue = document.getElementById("progress-value");
    let pos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = calcHeight === 0 ? 0 : Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.style.background = `conic-gradient(#9C7DFB ${scrollValue}%, #3E3E43 ${scrollValue}%)`;
};

window.addEventListener("scroll", calcScrollValue);
window.addEventListener("load", calcScrollValue);
