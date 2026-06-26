/* =========================
   MOBILE VIEWPORT FIX
========================= */
function setAppHeight(){
	document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
}
setAppHeight();
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", setAppHeight);



const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");

/* pastikan loading class langsung aktif */
document.documentElement.classList.add("loading");
document.body.classList.add("loading");

const greetings = [
    "Hello",
    "Bonjour",
    "Hola",
    "こんにちは",
    "안녕하세요",
    "你好",
    "مرحبا",
    "Halo"
];

let index = 0;

/* tampilkan kata pertama */
if (loaderText) {
    loaderText.textContent = greetings[0];
}

/* animasi pergantian kata */
const interval = setInterval(() => {

    if (!loaderText) return;

    /* kata lama keluar: turun + mengecil + miring dikit */
    loaderText.style.opacity = "0";
    loaderText.style.transform = "translateY(10px) scale(.96) rotate(-2deg)";

    setTimeout(() => {

        index++;

        if (index >= greetings.length) {
            index = 0;
        }

        loaderText.textContent = greetings[index];

        /* kata baru masuk: dari atas + sedikit membesar + goyang kecil */
        loaderText.style.transform = "translateY(-10px) scale(1.05) rotate(2deg)";
        loaderText.style.opacity = "0";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                loaderText.style.opacity = "1";
                loaderText.style.transform = "translateY(0) scale(1) rotate(0deg)";
            });
        });

    }, 180);

}, 500);

setTimeout(() => {

    clearInterval(interval);

    if (loader) {
        loader.classList.add("hide");
    }

    /* reveal konten dulu */
    document.querySelector(".home-left")?.classList.add("show");
    document.querySelector(".home-right")?.classList.add("show");

    document.querySelector(".about-left")?.classList.add("show");
    document.querySelector(".about-right")?.classList.add("show");

    document.querySelector(".project-header")?.classList.add("show");
    document.querySelector(".slider")?.classList.add("show");

    /* SHOWCASE HEADER + TABS → reveal on scroll */
    const showcaseRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });

    document
        .querySelectorAll(".showcase-header, .showcase-tabs")
        .forEach(el => showcaseRevealObserver.observe(el));

    /* CONTACT */
    document.querySelector(".contact-hero")?.classList.add("show");
    document.querySelector(".contact-left")?.classList.add("show");

    const contactReveal = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            const topFormElements = entry.target.querySelectorAll(
                ".input-box:not(.textarea-box)"
            );

            topFormElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("show");
                }, 500 + (index * 100));
            });

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".contact-right").forEach(el => {
    contactReveal.observe(el);
});

    /* status kiri muncul satu-satu */
    const statusItems = document.querySelectorAll(".status-item");
    statusItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("show");
        }, 250 + (index * 100));
    });



    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                /* kalau social-link → munculin berurutan */
                if (entry.target.classList.contains("social-link")) {
                    const socialLinks = document.querySelectorAll(".social-link");

                    socialLinks.forEach((link, index) => {
                        setTimeout(() => {
                            link.classList.add("show");
                        }, index * 120);
                    });

                    socialLinks.forEach(link => contactObserver.unobserve(link));
                }

                /* selain social-link → normal */
                else {
                    entry.target.classList.add("show");
                    contactObserver.unobserve(entry.target);
                }

            }
        });
    }, {
        threshold: 0.2
    });

document
    .querySelectorAll(
        ".textarea-box, .send-btn, .cv-btn, .social-link"
    )
    .forEach((el) => {
        contactObserver.observe(el);
    });

    /* scroll bar langsung dibalikin barengan saat loader mulai naik */
    document.documentElement.classList.remove("loading");
    document.body.classList.remove("loading");

    /* loader tetap dihapus setelah animasi selesai */
    setTimeout(() => {
        if (loader) {
            loader.style.display = "none";
        }

    requestAnimationFrame(() => {
        document.documentElement.classList.remove("loading");
        document.body.classList.remove("loading");
    });
}, 900);

}, 4000);