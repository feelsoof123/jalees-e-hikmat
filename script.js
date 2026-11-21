/**
 * جلیسِ حِکمت (Jalees-e-Hikmat) - Core JavaScript
 * Author: Sheikh Feelsoof Ansari
 * Description: Interactive scripts, starfield effect, utilities, and helper functions
 */

(function () {
    "use strict";

    // 1. Star Field Generator
    function initStarField() {
        const field = document.getElementById("star-field");
        if (!field) return;

        // Clear existing stars to avoid duplication
        field.innerHTML = "";
        const totalStars = window.innerWidth < 768 ? 60 : 120;

        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement("div");
            star.className = "star";
            const size = (Math.random() * 3 + 1).toFixed(1);
            const top = (Math.random() * 100).toFixed(2);
            const left = (Math.random() * 100).toFixed(2);
            const dur = (Math.random() * 3 + 1.5).toFixed(2);
            const delay = (Math.random() * 4).toFixed(2);

            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${top}%;
                left: ${left}%;
                animation-duration: ${dur}s;
                animation-delay: ${delay}s;
            `;
            field.appendChild(star);
        }
    }

    // 2. Back to Top Button
    function initBackToTop() {
        let btn = document.getElementById("backToTopBtn");
        if (!btn) {
            btn = document.createElement("button");
            btn.id = "backToTopBtn";
            btn.setAttribute("aria-label", "اوپر جائیں");
            btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            document.body.appendChild(btn);
        }

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                btn.style.display = "flex";
            } else {
                btn.style.display = "none";
            }
        });

        btn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 3. Dynamic Year Updater
    function updateYear() {
        const currentYear = new Date().getFullYear();
        document.querySelectorAll(".current-year").forEach(function (el) {
            el.textContent = currentYear;
        });
    }

    // 4. Abjad & Numerology Core Library (Global Utility)
    const qamriMap = {
        'ا': 1, 'آ': 1, 'أ': 1, 'ب': 2, 'پ': 2, 'ج': 3, 'چ': 3, 'د': 4, 'ڈ': 4,
        'ہ': 5, 'ھ': 5, 'ۂ': 5, 'ۃ': 5, 'ة': 5, 'و': 6, 'ؤ': 6, 'ز': 7, 'ژ': 7,
        'ح': 8, 'ط': 9, 'ی': 10, 'ئے': 10, 'ے': 10, 'ي': 10, 'ئ': 10, 'ک': 20,
        'گ': 20, 'ل': 30, 'م': 40, 'ن': 50, 'ں': 50, 'س': 60, 'ع': 70, 'ف': 80,
        'ص': 90, 'ق': 100, 'ر': 200, 'ڑ': 200, 'ش': 300, 'ت': 400, 'ٹ': 400,
        'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
    };

    const shamsiMap = {
        'ا': 1, 'آ': 1, 'أ': 1, 'ب': 2, 'پ': 2, 'ت': 3, 'ٹ': 3, 'ث': 4, 'ج': 5,
        'چ': 5, 'ح': 6, 'خ': 7, 'د': 8, 'ڈ': 8, 'ذ': 9, 'ر': 10, 'ڑ': 10, 'ز': 20,
        'ژ': 20, 'س': 30, 'ش': 40, 'ص': 50, 'ض': 60, 'ط': 70, 'ظ': 80, 'ع': 90,
        'غ': 100, 'ف': 200, 'ق': 300, 'ک': 400, 'گ': 400, 'ل': 500, 'م': 600,
        'ن': 700, 'ں': 700, 'و': 800, 'ؤ': 800, 'ہ': 900, 'ھ': 900, 'ی': 1000,
        'ے': 1000, 'ئ': 1000
    };

    const malfooziNames = {
        'ا': 'الف', 'ب': 'با', 'پ': 'با', 'ج': 'جیم', 'چ': 'جیم', 'د': 'دال', 'ڈ': 'دال',
        'ہ': 'ہا', 'ھ': 'ہا', 'و': 'واؤ', 'ز': 'زا', 'ژ': 'زا', 'ح': 'حا', 'ط': 'طا',
        'ی': 'یا', 'ے': 'یا', 'ئ': 'یا', 'ک': 'کاف', 'گ': 'کاف', 'ل': 'لام', 'م': 'میم',
        'ن': 'نون', 'ں': 'نون', 'س': 'سین', 'ع': 'عین', 'ف': 'فا', 'ص': 'صاد', 'ق': 'قاف',
        'ر': 'را', 'ڑ': 'را', 'ش': 'شین', 'ت': 'تا', 'ٹ': 'تا', 'ث': 'ثا', 'خ': 'خا',
        'ذ': 'ذال', 'ض': 'ضاد', 'ظ': 'ظا', 'غ': 'غین'
    };

    function normalizeUrdu(text) {
        if (!text) return "";
        return text
            .replace(/[ھۂۃة\u06C1\u06BE\u0647]/g, "ہ")
            .replace(/[ئےىي\u06CC\u064A]/g, "ی")
            .replace(/[آأإ]/g, "ا")
            .replace(/[ؤ]/g, "و")
            .replace(/[\u064B-\u065F\u0670\u0610-\u061A\s]/g, "");
    }

    function calculateAbjad(text, type) {
        if (!text) return 0;
        const rawChars = text.match(/[\u0600-\u06FF]/g) || [];
        const cleanText = normalizeUrdu(rawChars.join(""));
        let total = 0;

        if (type === "qamri") {
            for (let char of cleanText) {
                total += (qamriMap[char] || 0);
            }
        } else if (type === "shamsi") {
            for (let char of cleanText) {
                total += (shamsiMap[char] || 0);
            }
        } else if (type === "malfoozi") {
            let expanded = "";
            for (let char of cleanText) {
                expanded += (malfooziNames[char] || char);
            }
            const flat = normalizeUrdu(expanded);
            for (let char of flat) {
                total += (qamriMap[char] || 0);
            }
        }
        return total;
    }

    // Expose utilities on window.JaleesHikmat
    window.JaleesHikmat = {
        normalizeUrdu: normalizeUrdu,
        calculateAbjad: calculateAbjad,
        qamriMap: qamriMap,
        shamsiMap: shamsiMap,
        malfooziNames: malfooziNames
    };

    // Initialize all features on DOMContentLoaded
    document.addEventListener("DOMContentLoaded", function () {
        initStarField();
        initBackToTop();
        updateYear();
    });

    // Re-calculate stars on window resize with debounce
    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initStarField, 250);
    });

})();
