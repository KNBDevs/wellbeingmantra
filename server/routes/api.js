const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/create-post', async (req, res) => {
    const { title, body, author } = req.body;
    try {
        const post = new Post({ title, body, author });
        await post.save();
        res.json({ success: true, post });
    } catch (error) {
        res.json({ success: false, message: 'Error al crear el post' });
    }
});

module.exports = router;
