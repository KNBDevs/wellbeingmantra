document.addEventListener('DOMContentLoaded', () => {
    console.log('Videos JS loaded');

   
    const popup = document.createElement('div');
    const popupContent = document.createElement('div');
    const closeButton = document.createElement('span');

    popup.className = 'popup';
    popupContent.className = 'popup-content';
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    closeButton.addEventListener('click', () => {
        closePopup();
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup();
        }
    });

    function openVideoPopup(videoId) {
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '450';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        popupContent.innerHTML = '';
        popupContent.appendChild(closeButton);
        popupContent.appendChild(iframe);
        popup.style.display = 'block';
        popup.classList.add('popup-open');
    }

    function closePopup() {
        popup.classList.remove('popup-open');
        popup.classList.add('popup-close');
        const iframe = popupContent.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('popup-close');
        }, 300);
    }

    function setupVideoClickListeners() {
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                if (videoId) {
                    openVideoPopup(videoId);
                }
            });
        });
    }

    function loadVideos(page) {
        console.log(`Loading videos for page: ${page}`);
        const videoList = document.querySelector('.video-list');
        videoList.innerHTML = '';
        const videos = getVideosForPage(page);
        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.setAttribute('data-video-id', video.id);
            videoItem.innerHTML = `
                <h2>${video.title}</h2>
                <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title}" class="video-thumbnail">
                <p>${video.description}</p>
            `;
            videoList.appendChild(videoItem);
        });
        setupVideoClickListeners();
    }


    // Selección de videos escogidos:
    function getVideosForPage(page) {
        const allVideos = [
            { id: 'yzrcf3-ZHBk', title: 'Los síntomas físicos más comunes de la ansiedad y el estrés', description: 'Enumera 11 síntomas en tu cuerpo para que sepas identificar si tienes ansiedad.' },
            { id: 'wExgu4I0jQA', title: 'Así funciona la mente de un procrastinador (cómo resolverlo)', description: 'Conoce las mejores estrategias que tiene hoy la neurociencia para superar la procrastinación y finalmente hacer lo que tenemos que hacer.' },
            { id: 'wYdLaRoF4WQ', title: '4 Ladrones que te roban la energía, y no te dejan disfrutar de la vida', description: 'Fatiga mental, fatiga emocional, fatiga física y fatiga espiritual. ¿Cuál es la causa? ¿Cómo la resolverás?.' },
            { id: 'd9EOO-qhC-g', title: 'Ayuno de Dopamina: Resetea tu cerebro y haz los cambios difíciles', description: 'El ayuno de dopamina nos permite reequilibrar nuestros neurotransmisores en cerebro y aumentar nuestros niveles de motivación para ayudarnos a hacer los cambios que queremos hacer.' },
            { id: 'rGEPHYKq5VY', title: 'Cómo reconfigurar nuestro cerebro', description: 'Marian Rojas Estapé (psiquiatra) explica cómo se origina la adicción al placer instantáneo, los efectos del exceso de dopamina en el cerebro y revela lo importante de tener un propósito para alcanzar un estado de bienestar.' },
            { id: 'jIgmhgGak2k', title: 'Fortalecer la autoestima para gestionar las críticas', description: 'Explora el concepto de autoestima, destacando su verdadera naturaleza y cómo fortalecerla, reconociendo su valor intrínseco y superando las críticas y desafíos personales con resiliencia.' },
            { id: '3C-0hnPfl84', title: 'Cómo empezar a cambiar...', description: 'Pequeña reflexión de Ángel Martín (precursor del podcast "Por si las voces vuelven" y autor de los libros "Por si las voces vuelven" y "Destrás del ruido") acerca de por qué nos cuesta tanto cambiar.' },
            { id: 'xyw_dzxONmE', title: 'Cómo tener motivación ilimitada, según la ciencia? La Teoría de la auto-determinación', description: 'Cómo mantenerte siempre motivado utilizando cinco pasos respaldados por la ciencia. Explora técnicas efectivas para establecer objetivos claros y crear hábitos positivos.' },
            { id: 'V_ATGaYnF5s', title: 'La meditación: la solución definitiva a todos tus problemas', description: 'La meditación es la puerta hacia la consciencia del momento presente. Es una herramienta poderosa para reducir el estrés y encontrar la paz interior.' },
        ];

        const perPage = 12;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        return allVideos.slice(startIndex, endIndex);
    }

    function updatePageInfo() {
        const pageInfo = document.querySelector('.page-info');
        if (pageInfo) {
            pageInfo.textContent = `${currentPage}/${totalPages}`;
        }
    }

    function setupPagination() {
        const prevBtn = document.querySelector('.pagination-prev');
        const nextBtn = document.querySelector('.pagination-next');
        const firstBtn = document.querySelector('.pagination-first');
        const lastBtn = document.querySelector('.pagination-last');
        const prev3Btn = document.querySelector('.pagination-prev3');
        const next3Btn = document.querySelector('.pagination-next3');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToPage('prev'));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToPage('next'));
        }
        if (firstBtn) {
            firstBtn.addEventListener('click', () => goToPage('first'));
        }
        if (lastBtn) {
            lastBtn.addEventListener('click', () => goToPage('last'));
        }
        if (prev3Btn) {
            prev3Btn.addEventListener('click', () => goToPage('prev3'));
        }
        if (next3Btn) {
            next3Btn.addEventListener('click', () => goToPage('next3'));
        }
    }

    function goToPage(page) {
        if (page === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (page === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (page === 'first') {
            currentPage = 1;
        } else if (page === 'last') {
            currentPage = totalPages;
        } else if (typeof page === 'number') {
            currentPage = page;
        } else if (page === 'prev3' && currentPage > 3) {
            currentPage = Math.max(1, currentPage - 3);
        } else if (page === 'next3' && currentPage < totalPages - 2) {
            currentPage = Math.min(totalPages, currentPage + 3);
        }
        console.log(`Go to page: ${currentPage}`);
        loadVideos(currentPage);
        updatePageInfo();
    }

    // Inicializa la paginación y carga la primera página
    totalPages = Math.ceil(9 / 12);
    currentPage = 1;
    setupPagination();
    loadVideos(currentPage);
});
