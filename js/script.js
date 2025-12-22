/* ===== GIỮ HIỆU ỨNG REVEAL ĐANG CÓ ===== */
function reveal() {
    const els = document.querySelectorAll(".reveal");
    for (let i = 0; i < els.length; i++) {
        const winH = window.innerHeight;
        const top = els[i].getBoundingClientRect().top;
        const visible = 100;
        if (top < winH - visible) els[i].classList.add("active");
        else els[i].classList.remove("active");
    }
}
window.addEventListener("load", reveal);
window.addEventListener("scroll", reveal);

/* ===== XỬ LÝ FORM .contact-form VỚI AJAX SEND MAIL ===== */
const form = document.querySelector(".contact-form");
const overlay = document.getElementById("loading-overlay");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (overlay) overlay.classList.add("active");

        try {
            const formData = new FormData(form);

            const res = await fetch("sendmail.php", {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            if (data.status === "success") {
                alert(data.message || "Đăng ký thành công!");
                window.location.reload(); // reload page sau khi alert
            } else {
                alert(data.message || "Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (err) {
            alert("Không thể kết nối server. Vui lòng thử lại!");
        } finally {
            if (overlay) overlay.classList.remove("active");
        }
    });
}

/* ===== MENU TOGGLE (onclick ở HTML) ===== */
function toggleMenu() {
    const nav = document.getElementById("nav-links");
    const icon = document.getElementById("menu-icon");
    nav.classList.toggle("active");
    const open = nav.classList.contains("active");
    icon.classList.toggle("fa-bars", !open);
    icon.classList.toggle("fa-times", open);
}
function closeMenu() {
    const nav = document.getElementById("nav-links");
    const icon = document.getElementById("menu-icon");
    if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
    }
}

/* ===== TESTIMONIALS SLIDER (TỰ CHẠY) ===== */
let currentSlide = 0;
let sliderTimer = null;

function getSlides() {
    return document.querySelectorAll("#testimonial-slider .slide");
}
function showSlide(i) {
    const slides = getSlides();
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    currentSlide = i;
}
function nextSlide() {
    const slides = getSlides();
    if (!slides.length) return;
    showSlide((currentSlide + 1) % slides.length);
    restartAuto();
}
function prevSlide() {
    const slides = getSlides();
    if (!slides.length) return;
    showSlide((currentSlide - 1 + slides.length) % slides.length);
    restartAuto();
}
function startAuto() {
    sliderTimer = setInterval(nextSlide, 5000);
}
function restartAuto() {
    clearInterval(sliderTimer);
    startAuto();
}
window.addEventListener("load", () => {
    const slides = getSlides();
    if (slides.length) {
        showSlide(0);
        startAuto();
    }
});
