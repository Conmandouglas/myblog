// this is the index.js, the API, this is what axios awaits on for in the server.js that gets rendered on the page
import express from 'express';
import { v4 } from 'uuid'; // stands for unique identification

const app = express();
const port = 4000;

let posts = [
    {
      id: '06be12d8-9028-41a2-a86e-d26e2e439344',
      title: 'The First Post',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'Tom Sawyer',
      date: '7/20/24',
    },
    {
      id: '074d4ee0-0d09-4c29-bdc0-ed3e48aefc3b',
      title: 'This Makes a Big Impact',
      content:
        "Fringilla erat justo mus curabitur tristique metus elementum dignissim. Curae praesent adipiscing arcu pulvinar magna fames ex. Inceptos magnis curabitur, faucibus pellentesque scelerisque class? Eros tempor quisque congue potenti integer eu arcu quisque. Accumsan vulputate pharetra risus quam magnis nisi vehicula a. Mus non pellentesque nisl ultricies fringilla ligula tristique.",
      author: 'Peter Pan',
      date: '7/29/24',
    },
    {
      id: 'a01f6423-3431-4c38-b75c-9ccaa0ca3e80',
      title: 'This is the Latest...',
      content:
        "Laoreet consectetur lacinia fermentum; varius per curabitur elementum accumsan. Congue ultricies fusce maximus etiam ex. Molestie orci integer accumsan a quam lectus ac ipsum mattis. Ligula elementum augue dapibus pharetra natoque conubia auctor elit.",
      author: 'Huckleberry Finn',
      date: '8/9/24',
    }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/posts', (req, res) => {
  res.json(posts);
});

function getPost(id) {
  console.log(id);
  const foundPost = posts.find((post) => post.id === id);
  return foundPost;
};

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = getPost(id);
  res.json(post);
});

app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  const newDate = new Date(); //.toISOString();
  const fullDate = (`${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`);
  const date = fullDate;
  const newPost = {
    id: v4(),
    title,
    content,
    author,
    date,
  };
  posts.push(newPost);
  res.json(posts);
});

app.patch('/posts/:id', (req, res) => {
  const { id } = req.params;
  const foundPost = getPost(id);
  if (!foundPost) return;
  const toDelete = posts.indexOf(foundPost); // gets the index of the post to be replaced
  const updatedPost = { ...foundPost, ...req.body };
  posts.splice(toDelete, 1, updatedPost); // delete the post and place a new one on the same place in the array
  res.json(posts);
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const foundPost = getPost(id);
  if (!foundPost) return;
  posts = posts.filter((post) => post.id !== foundPost.id);
  console.log(posts);
  res.json(posts);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});