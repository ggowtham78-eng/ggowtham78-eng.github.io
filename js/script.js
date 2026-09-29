/* ==========================================================
   G. GOWTHAM PORTFOLIO — SHARED JAVASCRIPT
   Home navigation + Work Gallery lightbox
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       HOME PAGE NAVIGATION
       ========================= */
    const links = [...document.querySelectorAll('.home-page .nav-links a')];
    const sections = [...document.querySelectorAll('.home-page header[id], .home-page section[id]')];

    if (links.length && sections.length) {
        function setActiveNav(id){
            links.forEach(link => link.classList.remove('active'));

            const activeLink = links.find(link => {
                const href = link.getAttribute('href') || '';
                return href === '#' + id;
            });

            if(activeLink){
                activeLink.classList.add('active');
            }
        }

        function updateActiveNav(){
            const y = window.scrollY + 180;
            let current = sections[0];

            sections.forEach(section => {
                if(section.offsetTop <= y){
                    current = section;
                }
            });

            if(current){
                setActiveNav(current.id);
            }
        }

        updateActiveNav();
        window.addEventListener('scroll', updateActiveNav, {passive:true});

        links.forEach(link => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href') || '';
                if(href.startsWith('#')){
                    setActiveNav(href.substring(1));
                }
            });
        });
    }

    /* =========================
       WORK GALLERY LIGHTBOX
       ========================= */
    const galleryImages = document.querySelectorAll('.gallery-page .gallery-image img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    if (galleryImages.length && lightbox && lightboxImage && lightboxClose) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function(){
                if(this.naturalWidth > 0){
                    lightboxImage.src = this.src;
                    lightbox.classList.add('show');
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('show');
            lightboxImage.src = '';
        });

        lightbox.addEventListener('click', e => {
            if(e.target === lightbox){
                lightbox.classList.remove('show');
                lightboxImage.src = '';
            }
        });

        document.addEventListener('keydown', e => {
            if(e.key === 'Escape'){
                lightbox.classList.remove('show');
                lightboxImage.src = '';
            }
        });
    }
});
