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

        let temp = document.getElementById('stepTwo');
        temp.style.visibility = 'hidden';

        canvas = document.getElementById("canvas")
        ctx = canvas.getContext("2d")

        // canvas.onmousedown = GetCoordinates;
        document.querySelector('input[list="items"]').addEventListener('input', onInput);
        
        var fileVal = document.getElementById("myfile");
        fileVal.addEventListener('input', test);
        
    };
    
    function test(){
        let partTwo = document.getElementById('stepTwo');
        // partTwo.style.display = 'block';
        partTwo.style.visibility = 'visible';

        // console.log('test function');

        var fileVal = document.getElementById("myfile");
        let temp = fileVal.value.split('\\');
        let userInputImage = temp[temp.length-1];
        const img = new Image();
        img.src = userInputImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
          counter = 0;
        }

    }


    function onInput(e) {
        var input = e.target;
        val = input.value;
        list = input.getAttribute('list');
        options = document.getElementById(list).childNodes;

        if(val != 'outdoors' || val != 'sports'){
            test();
        }

        for(var i = 0; i < options.length; i++) {
            if(options[i].innerText === val) {
                submit(val);
            }
        }

    }

    function submit(clickedItem){
        let imageName;

        if(clickedItem == 'outdoors'){
            imageName = 1;
        }else if(clickedItem == 'sports'){
            imageName = 2;
        }

        url = 'http://localhost:3001/page/'+imageName;
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
        const img = new Image()
        img.src = result;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
          counter = 0;
        }

        canvas.onmousedown = GetCoordinates;

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

    console.log(PosX, PosY);

    ctx.beginPath();
    ctx.arc(PosX, PosY-2, 10, 0, 2 * Math.PI);
    ctx.fillText(counter, PosX, PosY);
    ctx.stroke();

    document.getElementById("x").innerHTML = PosX;
    document.getElementById("y").innerHTML = PosY;
    }

})();