const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Store posts in memory
let posts = [];

// Home route: Show all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// New post form
app.get('/new', (req, res) => {
    res.render('new');
});

// Add new post
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect('/');
});

// Edit post form
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

// Update post
app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    posts[postIndex] = { id: posts[postIndex].id, title, content };
    res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
