import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: "true"}));


app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/submit", async(req, res)=>{
    const anime = req.query.search || "No content provided.";
    console.log(anime);
});

app.post("/submit", async(req,res)=>{
    const anime = req.body.search;
    //if(anime === undefined) anime = 
    console.log(req.body);
    try{
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${anime}&sfw`);
        const data = response.data.data;
        res.render("index.ejs", { data: data } );
    }catch(error){
        res.render("index.ejs", {error: error.message});
        console.error(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});