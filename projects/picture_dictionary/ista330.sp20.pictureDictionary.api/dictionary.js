"use strict";
(function() {
    let counter = 0;
    let canvas;
    let ctx;

    window.onload = function() {
        console.log("window onload");

        hideDivs();

        canvas = document.getElementById("canvas")
        ctx = canvas.getContext("2d")

        document.querySelector('input[list="items"]').addEventListener('input', userInputData);
        
        var fileVal = document.getElementById("myfile");
        fileVal.addEventListener('input', test);
        
    };
    
    function test(){
        visibleDivs();

        var fileVal = document.getElementById("myfile");
        let temp = fileVal.value.split('\\');
        let userInputImage = temp[temp.length-1];
        const img = new Image();
        img.src = userInputImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
          counter = 0;
        }
        canvas.onmousedown = getCoordinates;

    }


    function userInputData(event) {
        /**
         * userInputData() checks to see whether the user entered a premade theme, or whether they're choosing to enter their own.
         * If they choose their own, they will be prompted to enter the name and image by calling a helper function (test).
         * Otherwise, function will iterate through childNodes to see which premade themes they chose.
         * 
         * PARAMETERS: event -- the event in which the user clicked on from datalist 'items'
         * 
         * RETURNS: NONE
         */

        let input = event.target;
        let val = input.value;
        let list = input.getAttribute('list');
        let options = document.getElementById(list).childNodes;

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

        let url = 'http://localhost:3001/page/'+imageName;

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
        });
    }

    function changeImage(result){
        visibleDivs();

        const img = new Image()
        img.src = result;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
          counter = 0;
        }
        canvas.onmousedown = getCoordinates;
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

    function getCoordinates(e){
        /**
         * get
         */
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

    function visibleDivs(){
        /**
         * visibleDivs() is a simple function that sets 'stepTwo' and 'stepThree' divs style to visible
         * 
         * PARAMETERS: N/A
         * 
         * RETURNS: N/A
         */
        
        let partTwo = document.getElementById('stepTwo');
        partTwo.style.visibility = 'visible';
        let partThree = document.getElementById('stepThree');
        partThree.style.visibility = 'visible';
    }

    function hideDivs(){
        /**
         * visibleDivs() is a simple function that sets 'stepTwo' and 'stepThree' divs style to hidden
         * 
         * PARAMETERS: N/A
         * 
         * RETURNS: N/A
         */

        let temp = document.getElementById('stepTwo');
        temp.style.visibility = 'hidden';
        let temp2 = document.getElementById('stepThree');
        temp2.style.visibility = 'hidden';
    }

})();