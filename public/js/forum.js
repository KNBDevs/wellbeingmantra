// src/js/forum.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Forum JS loaded');

    let isAuthenticated = false;

    window.toggleAuthForm = () => {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const popup = document.getElementById('register-popup');

        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            popup.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            popup.style.display = 'none';
        }
    };

    window.openRegisterPopup = () => {
        document.getElementById('register-popup').style.display = 'block';
    };

    window.closePopup = () => {
        document.getElementById('register-popup').style.display = 'none';
    };

    window.createPost = (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para crear un hilo.');
            return false;
        }

        const title = document.getElementById('post-title').value;
        const body = document.getElementById('post-body').value;

        console.log(`Create Post: ${title}, ${body}`);
        addPostToList({
            title,
            body,
            id: Date.now(),
            author: 'Usuario',
            timestamp: new Date()
        });
    };

    window.loginUser = (event) => {
        event.preventDefault();
        const nick = document.getElementById('login-nick').value;
        const password = document.getElementById('login-password').value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nick, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                isAuthenticated = true;
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('post-creation').style.display = 'block';
            } else {
                alert('Login fallido');
            }
        });
    };

    window.registerUser = (event) => {
        event.preventDefault();
        const email = document.getElementById('reg-email').value;
        const nick = document.getElementById('reg-nick').value;
        const password = document.getElementById('reg-password').value;

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, nick, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso, por favor inicia sesión.');
                closePopup();
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('register-form').style.display = 'none';
            } else {
                alert('Registro fallido');
            }
        });
    };

    function addPostToList(post) {
        const postsList = document.getElementById('posts-list');
        const postElement = document.createElement('div');
        postElement.className = 'forum-post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p><small>Publicado por ${post.author} el ${post.timestamp.toLocaleString()}</small></p>
            <button onclick="replyPost(${post.id})">Responder</button>
            <div class="forum-replies"></div>
        `;
        postsList.appendChild(postElement);
    }
});
