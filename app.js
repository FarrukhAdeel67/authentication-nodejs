const express = require('express');
const exphbs = require("express-handlebars");
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.port||4000;

const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

//defualt option
app.use(express.json());
app.use(fileUpload());
//static files 
app.use(express.static('public'));
app.use(express.static('upload'));

app.get('',(req,res)=>{
    res.render('index');
})
app.post('', (req,res )=>{
    let sampleFile;
    let uploadPath;
    if(!req.files||Object.keys(req.files).length ==0){
        return res.status(400).send("no files were uploaded...")
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;
    console.log(sampleFile);
    //user mv() funciion to place file on the server
    sampleFile.mv(uploadPath, function (err){
        if(err){
            return res.status(500).send(err);
        }
        res.status(200).send('file uploaded...');
    });
})
app.listen(port, ()=>{
    console.log(`server is running at port : ${port}`);
})