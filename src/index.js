import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";


// Initialize active, blog, and title variables
let active;
let blog;
let title;

// Create an Express application
const app = express();

// Define the port number
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Allow PUT and DELETE methods in forms
app.use(methodOverride('_method'));

// Middleware to make the 'blog' variable available in all EJS views
app.use((req, res, next) => {
    res.locals.blog = blog;
    next();
});

// Parse incoming request bodies as URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));


// Routes for handling different pages
app.get("/",(req,res) => {
    active = '';
    title = 'Home';
    res.render('index.ejs', {active: active, title});
});

app.get("/home",(req,res) => {
    active = '';
    title = 'Home';
    res.render('index.ejs', {active: active, title});
});

app.get("/science",(req,res) => {
    title = 'Science'; 
    active = 'science';
    res.render('science.ejs', {active, title, title});
});

app.get("/food",(req,res) => {
    title = 'Food';
    active = 'food';
    res.render('food.ejs', {active, title});
});

app.get("/cinema",(req,res) => {
    title = 'Cinema';
    active = 'cinema';
    res.render('cinema.ejs', {active, title});
});

app.get("/traveling",(req,res) => {
    title = 'Traveling';
    active = 'traveling';
    res.render('traveling.ejs', {active, title});
});

app.get("/sport",(req,res) => {
    title = 'Sport';
    active = 'sport';
    res.render('sport.ejs', {active, title});
});

app.get("/add-blog",(req,res) => {
    title = 'Add Blog';
    active = 'add-blog';
    res.render('add-blog.ejs', {active, title});
});

app.get("/my-blog",(req,res) => {
    title = 'My Blog';
    active = 'my-blog';
    res.render('my-blog.ejs', {active, title, blog});
});

app.get("/contact-us",(req,res) => {
    title = 'Contact';
    active = 'contact-us';
    res.render('contact-us.ejs', {active, title});
});

app.get("/about",(req,res) => {
    title = 'About';
    active = 'about';
    res.render('about.ejs', {active, title});
});

// Handle submission of the add blog form
app.post("/submit", (req,res) => {
    active = 'add-blog';
    title = "Add Blog";
    const name = req.body.name;
    const subject = req.body.subject;
    res.render('add-blog.ejs', {name, active, title, subject, title});
});

// Handle submission of the second blog form
app.post("/submit-blog", (req,res) => {
    active = 'add-blog';
    title = "Add Blog";
    blog = req.body.blog;
    res.render("user-blog.ejs", {blog, active, title});
    
});
// Handle submission of the contact us form
app.post("/thank-you", (req,res) => {
    active = 'contact-us';
    title = "Contact";
    res.render("thank-you.ejs", {blog, active, title});
    
});

// Handle blog editing (PUT request)
app.put("/edit-blog", (req, res) => {
    active = 'add-blog';
    title = "Edit Blog";
    res.render("edit-blog.ejs", {blog, active, title});
    blog = req.body.blog;

})

// Handle blog deletion (DELETE request)
app.delete("/delete-blog",(req,res) => {
    blog  = null;
    title = "Delete Blog";
    res.render("delete.ejs", {blog, active, title});
});


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})