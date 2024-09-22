document.addEventListener('DOMContentLoaded', () => {
    console.log('Exercises JS loaded');
    
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

    function openExercisePopup(videoId) {
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

    function setupExerciseClickListeners() {
        const exerciseItems = document.querySelectorAll('.exercise-item');
        exerciseItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                if (videoId) {
                    openExercisePopup(videoId);
                }
            });
        });
    }

    function loadExercises(page, category) {
        console.log(`Loading exercises for page: ${page}, category: ${category}`);
        const exerciseList = document.querySelector('.exercise-list');
        exerciseList.innerHTML = '';
        const exercises = getExercisesForCategory(category);
        const perPage = 12;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const exercisesForPage = exercises.slice(startIndex, endIndex);

        exercisesForPage.forEach(exercise => {
            const exerciseItem = document.createElement('div');
            exerciseItem.className = 'exercise-item';
            exerciseItem.setAttribute('data-video-id', exercise.id);
            exerciseItem.innerHTML = `
                <h2>${exercise.title}</h2>
                <img src="https://img.youtube.com/vi/${exercise.id}/maxresdefault.jpg" alt="${exercise.title}" class="exercise-thumbnail">
                <p>${exercise.description}</p>
            `;
            exerciseList.appendChild(exerciseItem);
        });
        setupExerciseClickListeners();
    }

    // Selección de videos escogidos:
    function getExercisesForCategory(category) {
        const exercises = {
            '5min': [
                { id: 'kuLpv3f7IHc', title: 'Yoga para empezar el día', description: 'Empieza a hacer ejercicios de estiramientos para levantarte de la cama relajado y con buena sintonía.' },
                { id: 'wA12mbgDiwY', title: 'Rutina de estiramientos para antes o después del ejercicio', description: 'Mejora tu movilidad general en cualquier momento del día, no importa si haces o no ejercicio, que al menos esta rutina lo sea.' },
                { id: 'l4BSdHu2J6k', title: 'Rutina de cardio para principiantes', description: 'Rutina de cardio de 5 minutos súper sencilla además de bajo impacto para las rodillas. Ideal para empezar de cero o simplemente alguien que quiera calentar.' },
                { id: 'extbVp9F7sE', title: 'Rutina de estiramientos antes de dormir', description: 'Rutina de estiramiento por la noche de 5 minutos que va ayudar a estirar lo músculos, relajar y quitar toda la tensión de los músculos, para poder dormir más fácilmente y descansar mejor. ' }
            ],
            '10min': [
                { id: 'ddwMGa8AdSw', title: '6 ejercicios antes de levantarte de la cama', description: 'Antes de incorporarte, planteate al despertar hacer estos ejercicios de estiramientos. Te levantarás de la cama más progresivamente y más animado.' },
                { id: 'gZvDHgRnu9w', title: 'Entrenamiento De 10 minutos para tonificar', description: 'Haz este ejercicio todos los días si deseas ver resultados rápidos, ¡sin saltarse ningún día!' },
                { id: 'u_1zoVPqNBI', title: 'Yoga de pie sin esterilla', description: 'Estira todo tu cuerpo, sin precisar esterilla ni otro instrumento, en apenas 10 minutos. Cualquier momento del día que puedas reservar un rato de tu tiempo y tranquilidad, es bueno.' },
                { id: '3S3jw1tdNII', title: 'Gana músculo sin pesas', description: 'No esperes ser fisioculturista con esta rutina... pero si hablamos de resultados notables por 10 minutos de tu dia a día.' },
            ],
            '15min': [
                { id: '908_TON1JlI', title: 'Cardio moderado en 15 minutos', description: 'Solo invierte 15 minutos para una sesión de cardio dinámico y divertido, ideal para empezar ganar cardio, pero también para mejorar tu rendimiento.' },
                { id: 'I4gb324-wHU', title: 'Yoga para todo el cuerpo', description: 'Estira y moviliza todo tu cuerpo de forma sencilla con esta rutina que puedes repetir todos los días. Solo 15 minutos...' },
                { id: 'HjYYpLVdPlw', title: 'Yoga para dormir mejor', description: 'Especial para ayudarte a dormir mejor para que duermas como un bebé y empieces el día con todo! Feliz y relajado. ' },
                { id: 'CZRae1kE9Cw', title: 'Quema grasa y gana músculo', description: 'Con una mancuerna, o algo similar (verás que la mayor parte no la requiere por el peso), dedica 15 minutos diarios para conseguir mejorar tu físico.' },
            ],
            '30min': [
                { id: 'wemmyrkpAQI', title: 'Sesion de estiramientos completa', description: 'Te sorprenderá ver los resultados a medio y largo plazo en tu estructura física si conviertes esta rutina en hábito.' },
                { id: 'ANFB6yu0HIE', title: 'Rutina de ejercicios al despertar', description: 'Menos excusas aun perezosillo o perezosilla, desde la cama y en menos de 30 minutos podrás estirar y movilizar tu cuerpo para levantarte con otro ánimo.' },
                { id: 'j5Z7AongHC8', title: 'Estiramiento profundo para ganar flexibilidad', description: 'una rutina de estiramientos para aumentar la flexibilidad y relajar el cuerpo. Esta clase de yoga para flexibilidad te aportará un estiramiento profundo de piernas, espalda, caderas, brazos y hombros.' },
                { id: 'L_W4F6_c2Jg', title: 'Strong Nation, entrenamiento aerobico', description: 'Y si te digo que en 30 minutos tienes tu sesión personal de aerobic-cardio-fitboxing, ¿te lo crees? Si quieres salir de dudas... aquí tienes la respuesta.' },
            ],
            'over30min': [
                { id: 'jvolytUa9wo', title: 'Rutina fullbody en casa', description: 'Entrenamiento completo para todo el cuerpo en casa que puedes hacer sin material y sin ruido.'  },
                { id: '_AhC7mm-Prk', title: 'Rutina de cardio intensa', description: 'Esta rutina es intensa y te hara quemar 500 calorias en algo más de 30 minutos. Perfecta para hacer en casa sin equipo.'  },
                { id: 'bvZDT0nNGkM', title: 'Clase completa de Hatha Yoga', description: 'Apta para todos los niveles. Estirarás y tonificaras todo el cuerpo. Incluye ejercicio de relación final.'  },
                { id: 's4hzpz2iug0', title: 'Sesión completa de Yoga Sculpt ', description: 'El uso de mancuernas es opcional, pero definitivamente hará la diferencia el uso de un peso extra para un trabajo más completo con estos objetivos.'  },
            ]
        };

        return exercises[category] || [];
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
        loadExercises(currentPage, currentCategory);
        updatePageInfo();
    }

    // Obtener la categoría de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category') || '5min';

    // Inicializa la paginación
    totalPages = Math.ceil(getExercisesForCategory(currentCategory).length / 12);
    currentPage = 1;
    setupPagination();
    loadExercises(currentPage, currentCategory);
});
