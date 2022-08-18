const express = require('express');
const exphbs = require("express-handlebars");
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.port||4000;

const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
app.use(express.json());
//defualt option
app.use(fileUpload());
app.get('',(req,res)=>{
    res.render('index');
}),
app.listen(port, ()=>{
    console.log(`server is running at port : ${port}`);
})