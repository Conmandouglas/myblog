//For this capstone, use this file to communicate with EJS, send requests over for a blog. Post, get, etc
//Send from an array of posts, and make them render through a for each loop
//Have a header and footer and a way for a lot of posts to render in a vertical list
//Maybe I won't need an API, but eventually just use an API
// REMEMBER: have FUN with this, this is my last project before databases...


//this is the server.js, this sends requests to the index.js, the api, awaits, and recieves to send the data to the ejs file
import express from "express";
import axios from "axios";
// no body-parser in use, instead built in version in express

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
app.use(express.static("public"));

// server does not have direct access to website axios lets it access it through api url
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//gets the posts to render on page [WORKS]
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data, title: 'Welcome to my Blog' });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//the route triggered by new button [WORKS]
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post", title: 'New Post' });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
      title: 'Edit Post'
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});


//post a new post [WORKS]
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post [WOKS]
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

app.get("/api/posts/delete/:id", async (req, res) => { //api/posts/delete is from the index.ejs [WORKS]
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});