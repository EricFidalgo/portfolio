document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Hamburger Logic ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        if (hamburger) {
            hamburger.classList.remove("active");
        }
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    }));

    // --- Slideshow & Video Player Logic ---
    let slideIndex = 1;
    const slidesWrapper = document.querySelector('.slides-wrapper');
    
    // Function to show a specific slide
    window.showSlides = function(n) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        // Update dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add("active");
        }

        // Move the slides wrapper
        if (slidesWrapper) {
            slidesWrapper.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
        }
    }

    // Next/previous controls
    window.changeSlide = function(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    // Initialize the first slide
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
    }

    // Video click handler
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.addEventListener('click', function() {
            // Get the video ID from the thumbnail image source
            const img = this.querySelector('img');
            if (!img) return; // Exit if img is already gone

            const videoUrl = img.src.match(/vi\/([^\/]+)\//);
            if (videoUrl && videoUrl[1]) {
                const videoId = videoUrl[1];
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                iframe.title = 'Project Video';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                
                this.innerHTML = '';
                this.appendChild(iframe);
            }
        });
    }
});