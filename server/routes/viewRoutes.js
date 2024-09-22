const express = require('express');
const router = express.Router();

// Route for rendering pages
router.get('/', (req, res) => res.render('index'));
router.get('/sounds', (req, res) => res.render('sounds'));
router.get('/exercises', (req, res) => res.render('exercises'));
router.get('/mantras', (req, res) => res.render('mantras'));
router.get('/books', (req, res) => res.render('books'));
router.get('/videos', (req, res) => res.render('videos'));
router.get('/forum', (req, res) => res.render('forum'));
router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/cookie-policy', (req, res) => res.render('cookie-policy'));
router.get('/about', (req, res) => res.render('about'));
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

module.exports = router;
