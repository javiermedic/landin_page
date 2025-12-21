
//step 1: get DOM
let carouselDom = document.querySelector('.carousel');

if (carouselDom) {
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');
    let SliderDom = carouselDom.querySelector('.list');
    let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    let timeDom = document.querySelector('.carousel .time');

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    let timeRunning = 3000;
    let timeAutoNext = 7000;

    nextDom.onclick = function(){
        showSlider('next');    
    }

    prevDom.onclick = function(){
        showSlider('prev');    
    }
    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext)
    function showSlider(type){
        let  SliderItemsDom = SliderDom.querySelectorAll('.item');
        let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
        
        if(type === 'next'){
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        }else{
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext)
    }
}


//PAGINA ILUSTRACIONES

const img = document.querySelector('.contenedor img');
const textOverlay = document.querySelector('.texto-overlay');
if (img) {
      function updateWidth() {
        const scrollY = window.scrollY;
        // Ajusta 'maxScroll' para definir qué tan rápido crece la imagen (ej. 400px)
        const maxScroll = 400; 
        const minWidth = 60;
        const maxWidth = 100;
        const maxRadius = 40;
        
        let newWidth = minWidth + (scrollY / maxScroll) * (maxWidth - minWidth);
        let newRadius = maxRadius - (scrollY / maxScroll) * maxRadius;
        
        if (newWidth > maxWidth) newWidth = maxWidth;
        if (newWidth < minWidth) newWidth = minWidth;
        
        if (newRadius < 0) newRadius = 0;
        if (newRadius > maxRadius) newRadius = maxRadius;
        
        img.style.width = newWidth + '%';
        img.style.borderRadius = newRadius + 'px';
        
        if (textOverlay) {
            // Calcula opacidad: 0 al inicio, 1 al llegar a maxScroll
            let newOpacity = scrollY / maxScroll;
            if (newOpacity > 1) newOpacity = 1;
            if (newOpacity < 0) newOpacity = 0;
            textOverlay.style.opacity = newOpacity;
        }
      }
      window.addEventListener('scroll', updateWidth);
      updateWidth(); // Inicializar estado al cargar
}

document.addEventListener("DOMContentLoaded", function() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        });
        const hiddenElements = document.querySelectorAll(".reveal-text");
        hiddenElements.forEach((el) => observer.observe(el));

        const textTitles = document.querySelectorAll('.reveal-text');
        if (textTitles.length > 0) {
            const updateSpacing = () => {
                const windowHeight = window.innerHeight;
                textTitles.forEach(textTitle => {
                    const rect = textTitle.getBoundingClientRect();
                    // Calcula el espaciado: empieza amplio abajo y se reduce (achica) al subir
                    let spacing = Math.max(0, (rect.top - windowHeight / 2) / 10);
                    textTitle.style.letterSpacing = spacing + 'px';
                });
            };
            window.addEventListener('scroll', updateSpacing);
            updateSpacing();
        }

        // GALERIA
        const panels = document.querySelectorAll('#gallery .panel');

        panels.forEach(panel => {
            panel.addEventListener('click', () => {
                removeActiveClasses();
                panel.classList.add('active');
            });
        });

        function removeActiveClasses() {
            panels.forEach(panel => panel.classList.remove('active'));
        }
      });