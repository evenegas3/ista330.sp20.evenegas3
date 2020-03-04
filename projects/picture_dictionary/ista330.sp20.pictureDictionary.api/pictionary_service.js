// dependencies
const express = require("express");
const cors = require("cors")
const fs = require("fs");
const url = require("url");
const bodyParser = require('body-parser');

// create the server
const app = express();
const port = 3001;
app.use(cors());


// let tableOfContent = [{id: 1, name: 'The supermarket'},
//                       {id: 2, name: 'Outdoor'},
//                        {id: 3, name: 'houses'}];

// let images = [{id:23, name:'the-supermarket.png', themeId: 1},
//               {id:24, name:'outdoor-clothes.png', themeId: 2},
//               {id:25, name:'houses.png', themeId: 3}];
// variables
let table = [
    {id:1, name:'sports'},
    {id:2, name:'outdoors'}

];

let image = [
    {id:10, name:'sports.png', themeId:1},
    {id:11, name:'outdoors.png', themeId:2}
];

let words = [
    {id:1, name: 'scale', x:120, y:250, number:7, themeId:1, imageId:23},
    {id:2, name: 'aisle', x:450, y:230, number:10, themeId:1, imageId:23}
];

// the methods
app.get('/contents', function (req, res) {
    // console.log("inside of /contents");
	res.json(table);
});


app.get('/pages/:contentID', function (req, res) {
    // let themeId = Number(req.params.contentId);
    // console.log('pages/id');
    let params = req.url.split("/");
    // console.log(params);
    // console.log(params[2]);

    let id = parseInt(params[2]);
    let idList = []
    console.log(id);

    for(let i=0; i<image.length; i++){
        if(id == image[i].themeId){
            // console.log(image[i].id);
            // res.send(image[i].id);
            idList.push(image[i].id);
        }
    }
    res.send(idList);

    // let themeId = Number(req.params.contentId);
    // let ids = images.filter(x=>x.themeId === themeId).map(x=>x.id);
    // console.log(ids);
    // res.json(ids);
});


app.get('/pages/:contentID/images/:imageId', function (req, res) {
    let themeId = Number(req.params.contentId);
    let imageId = Number(req.params.imageId);
    let image = images.find(x => x.themeId === themeId && x.id === imageId);

    if(image){
        // path might give error
        res.sendFile(__dirname +'/' +image.name);
    }else{
        res.status(404).send("No image found");
    }


    images.find(x => x.themeId === themeId && x.id === imageId);

});

app.get('/pages/:contentID/images/:imageId/:objectX/:objectY', function (req, res) {
    let themeId = Number(req.params.contentId);
    let imageId = Number(req.params.imageId);
    let objectX = Number(req.params.objectX);
    let objectY = Number(req.params.objectY);

    let word = words.find(x => x.themeId === themeId &&
        x.imageId === imageId &&
        x.X === objectX &&
        x.Y === objectY);


    if(word){
        res.json({name: word.name, number: word.number});
    }else{
        res.status(404).send("No words were found.");
    }

});




































let contents = [
    {id:1, theme:'outdoors'},
    {id:2, theme:'sports'}
];

let images = [
    {id:10, img:'outdoors.png', contentId:1},
    {id:11, img:'sports.png', contentId:2}
];

let sports = [
    {1:['hit', 120, 70]},
    {2:['serve', 366, 68]},
    {3:['kick', 111, 175]},
    {4:['catch', 392, 173]},
    {5:['pass', 123, 290]},
    {6:['run', 370, 288]},
    {7:['fall', 136, 420]},
    {8:['jump', 369, 417]}
];

let sports_verbs = [
    {'nine':['skate', 135, 64]},
    {'ten':['throw', 340, 65]},
    {'eleven':['bounce', 125, 179]},
    {'tweleve':['surf', 365, 180]},
    {'thir':['ride', 155, 314]},
    {'fourteen':['dive', 361, 315]},
    {'fif':['drive', 190, 463]},
    {16:['shoot', 350, 463]}
]









// own methods

app.get('/pages/:contentID', cors(), function (req, res) {
    let params = req.url.split("/");

    let contentID = parseInt(params[2]);
    let list = [];

    for(let i =0; i < images.length; i++){
        if(images[i].contentId == contentID){
            list.push(images[i].contentId);
        }
    }
    res.json(list);
    // return list;
})

app.get('/words/:contentId/:imageId/:objectX/:objectY', cors(), function (req, res) {
    console.log('$$$$$$$$$$$$$$$$$');
    // res.json(contents);
    let params = req.url.split("/");
    console.log(params);

    
})

app.get('/page/:imageId', cors(), function (req, res) {
    let params = req.url.split("/");
    let mode = params[2];

    for(let i=0; i<images.length; i++){
        if(mode == images[i].id){
            if(images[i].img == 'sports.png'){
                res.send({image: 'sports.png', info: sports});
            }else{
                res.send({image: 'sports_verbs.png', info: sports_verbs});
            }
        }
    }

})








// the methods
// app.get('/', cors(), (request , response) => {

//     console.log("///");
// 	var dict = {};
//     var list = [];    
//     let expression = request.url.split("=")[1];
//     let themes = fs.readFileSync("themes.txt", "utf8").split("\n");
    
//     for(let i = 0; i < themes.length; i++){
//         console.log(themes[i]);
//         list.push(themes[i]);
//     }

//     dict["words"] = list;
//     response.send(JSON.stringify(dict));

// });










// app.get('/', function (req, res) {
// 	res.header("Access-Control-Allow-Origin", "*");

// 	const queryParams = req.query;
// 	var mode = queryParams.mode;
// 	var book = queryParams.title;

// 	if(mode == "info"){
// 		let array = getInfo(book);
// 		res.send(JSON.stringify(array));
// 	}else if(mode == "description"){
// 		let array = getDescription(book);
// 		res.send(JSON.stringify(array));
// 	}else if(mode == "reviews"){
// 		let array = getReviews(book);
// 		res.send(JSON.stringify(array));
// 	}else if(mode == "books"){
// 		let array = getBooks();
// 		res.send(JSON.stringify(array));
// 	}
// });

app.listen(port, () => console.log("Listening on port" + port));


//flowers are fruits, the rest is veggie