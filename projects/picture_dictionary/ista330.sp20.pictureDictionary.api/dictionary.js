// "use strict";
(function() {
    let pic; 
    let URL;
    let currentPic;
    let info;
    let counter = 0;

    //test
    let canvas;
    let ctx;

    window.onload = function() {
        console.log("window onload");

        canvas = document.getElementById("canvas")
        ctx = canvas.getContext("2d")

        canvas.onmousedown = GetCoordinates;
        // var theParent = document.getElementById('listParent');
        // theParent.addEventListener('click', doSomething, false);



        // pic = document.getElementById("bigPicture");
        // pic.onmousedown = GetCoordinates;


        document.querySelector('input[list="items"]').addEventListener('input', onInput);


    };

    function onInput(e) {
        var input = e.target,
        val = input.value;
        list = input.getAttribute('list'),
        options = document.getElementById(list).childNodes;
    
        for(var i = 0; i < options.length; i++) {
            if(options[i].innerText === val) {
            // alert('item selected: ' + val);
            // break;
            submit(val);
            }
        }
    }



    function doSomething(e) { 
        if (e.target !== e.currentTarget) { 
            var clickedItem = e.target.id;
            console.log(clickedItem);
            submit(clickedItem);
        }
    }

    function submit(clickedItem){
        // let url = "http://localhost:3001/contents";
        // let url = "http://localhost:3001/pages/1";


        // let url = "http://localhost:3001/words/1/1/150/150";
        let imageName;

        if(clickedItem == 'outdoors'){
            imageName = 1;
        }else if(clickedItem == 'sports'){
            imageName = 2;
        }
        let url = 'http://localhost:3001/page/'+imageName;
        console.log(url);


        fetch(url)
        .then(response => {
            if(response.status == 200) {
                return response.json().then(data => {
                    return {status: response.status, data};
                });
            } else {
                console.log('Server error! Please check logs');
                return Promise.resolve();
            }
        })
        .then(result => {
            changeImage(result.data.image);
            info = result.data.info;


        });
    
    }

    function changeImage(result){
        // let imageElement = document.getElementById("bigPicture");
        // imageElement.src = result;
        // currentPic = result;

        const img = new Image()
        img.src = result;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
        }

        // var img = document.getElementById("scream");
        // canvas.src = result;
        // ctx.drawImage(result, 0, 0);

        // ctx.drawImage('outdoors.png', 10, 10);
    }
    
    function FindPosition(oElement){
        if(typeof( oElement.offsetParent ) != "undefined"){
            for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent){
                posX += oElement.offsetLeft;
                posY += oElement.offsetTop;
            }
            return [ posX, posY ];
        }
        else{
            return [ oElement.x, oElement.y ];
        }
    }

    function GetCoordinates(e){
    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    // ImgPos = FindPosition(pic);
    ImgPos = FindPosition(canvas);


    if (!e) var e = window.event;
        if (e.pageX || e.pageY){
            PosX = e.pageX;
            PosY = e.pageY;
        }
    
    else if (e.clientX || e.clientY){
        PosX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }

    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];
    counter += 1;
    console.log(PosX);
    console.log(PosY);
    console.log(info);

    ctx.beginPath();
    ctx.arc(PosX, PosY, 10, 0, 2 * Math.PI);
    ctx.fillText(counter, PosX, PosY);
    ctx.stroke();



    document.getElementById("x").innerHTML = PosX;
    document.getElementById("y").innerHTML = PosY;
    }

})();