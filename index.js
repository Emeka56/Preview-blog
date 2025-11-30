const express = require("express");
const app = express();
const {posts} = require("./mockdata/posts.json");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const postModel = require("./models/postModel");
dotenv.config();

const port = process.env.PORT || 3200;

const conn_uri = process.env.CONN_URI;

mongoose.connect(conn_uri).then(()=> console.log(`DB is Connected`)).catch((err)=>console.log(`oops! something went wrong`, err))

app.set("view engine", "pug");
app.set("views", "./views");

// const port = 3200;

app.use(express.static("public"));
app.use(express.json());


app.get("/", async(req, res) =>{

       let post = {
        subject: "Essential Daily Habits for Lifelong Eye Health",
        content: "Artificial intelligence is transforming healthcare by enabling faster diagnostics, personalized treatment plans, and predictive analytics. From analyzing medical images to managing patient data, AI tools are helping professionals deliver more accurate and efficient care across the board. In imaging, algorithms highlight subtle patterns in scans that assist clinicians with early detection and triage. Predictive models can flag high-risk patients based on trends in lab results, vitals, and history, informing earlier interventions. Workflow tools automate scheduling, bed allocation, and supply management to reduce bottlenecks. For patients, AI-driven chat and symptom triage help direct people to appropriate care without overwhelming front-line staff. Natural language processing extracts key insights from notes, streamlining documentation. Remote monitoring via wearables feeds continuous data streams that can alert teams to changes in heart rate, sleep, or activity. Decision-support systems offer evidence summaries that clinicians can weigh alongside their expertise. As adoption grows, teams focus on transparency, data quality, and fairness to reduce bias and build trust. Security and consent practices safeguard sensitive information. Used responsibly, AI augments human judgment and frees clinicians to spend more time with patients, expanding capacity and improving consistency across diverse settings."
    };

    // const data = await postModel.create(post);
    // console.log(data, "response from DB");
    // console.log(`post created successfully`)

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