// "use strict";
(function() {
    let pic; 
    let URL;
    let currentPic;
    let info;

    window.onload = function() {
    	console.log("window onload");
        var theParent = document.getElementById('listParent');
        theParent.addEventListener('click', doSomething, false);

        pic = document.getElementById("bigPicture");
        pic.onmousedown = GetCoordinates;
    };

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
            // console.log(result.data.image);
            changeImage(result.data.image);
            info = result.data.info;


        });
    
    }

    function changeImage(result){
        let imageElement = document.getElementById("bigPicture");
        imageElement.src = result;
        currentPic = result;
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
    ImgPos = FindPosition(pic);

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
    console.log(PosX);
    console.log(PosY);
    console.log(info);
    // const keys = Object.keys(info);
    // console.log(keys);
    // for(let i = 0; i < info.length; i++){
    //     console.log(info[i]);
        
    // }


    


    document.getElementById("x").innerHTML = PosX;
    document.getElementById("y").innerHTML = PosY;
    }

})();