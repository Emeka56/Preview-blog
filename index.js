const express = require("express");
const app = express();
const {posts} = require("./mockdata/posts.json");

app.set("view engine", "pug");
app.set("views", "./views");

const port = 3200;

app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) =>{
    res.render("pages/home",{
        posts,
        title: `Home - Preview Blog`,
        tags: posts[0].tags,
        image: posts[0].image,
        description: posts[0].content,
        link: {ref:posts[0].id, text:"Read More"} }
    )

    console.log(`Port ${port} is active at home page`)
});

app.get("/post/:id", (req, res) =>{
    const {id} = req.params;
    const post = posts.find((item)=> item.id === Number(id))
    res.render("pages/post", {
        title: post.tags,
        image: post.image,
        content: post.content,
        tags: post.tags
    })
})

app.get("/about", (req, res) =>{
    res.render("pages/about",{
        posts,
        title: "About",
        image: posts[0].image,
        description: posts[0].content,
        link: {ref:posts[0].id, text:"Read  More"}
    })

    console.log(`Port ${port} is active at about page`)
});


app.get("/contact", (req, res) =>{
    res.render("pages/contact")
})



app.listen(port, () =>{
    console.log(`Port ${port} is active at current page`)
})