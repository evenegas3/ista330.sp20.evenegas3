"use strict";
(function() {
    let counter = 0;
    let themesJson;
    let themeList = []
    let canvas;
    let ctx;

    window.onload = function() {
        console.log("window onload");

        fetchContent();

        canvas = document.getElementById("canvas")
        ctx = canvas.getContext("2d")

        document.querySelector('input[list="items"]').addEventListener('change', userInputData);
        
        var fileVal = document.getElementById("myfile");
        fileVal.addEventListener('input', userEnteredTheme);

        var fileVal2 = document.getElementById("myfi");
        fileVal2.addEventListener('input', fileOptionTwo);
    };
    // evt.currentTarget.myParam
    function test(event) {
        let val = event.currentTarget.myParam;
        console.log('etst');
        console.log(val);
        // let input = event.target;
        // let val = input.value;
        // let list = input.getAttribute('idList');
        let options = document.getElementById('idList').childNodes;
        let partThree = document.getElementById('stepThree');
        partThree.style.display = 'inline';
        changeImage(val+'.png');

        // if(themeList.includes(val)==true){
        //     fetchIds(val);

        //     let partTwo = document.getElementById('stepTwo');
        //     partTwo.style.display = 'inline';
            // let partThree = document.getElementById('stepThree');
            // partThree.style.display = 'inline';
        //     submit(val);
        // }else{
        //     let partTwo = document.getElementById('stepTwoOption');
        //     partTwo.style.display = 'inline';
        // }
    }

    function fetchContent(){
        let url = 'http://localhost:3001/contents';

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
            themesJson = result.data;
            for(let i=0; i<themesJson.length;i++){
                themeList.push(themesJson[i].name);
            }
        });
    }

    function fileOptionTwo(){
        /**
         * userEnteredTheme() calls visibleDivs() to display instructional divs to the user.
         * Then retrieves the file name given by the user via the input file tag.
         * Lastly, calls the changeImage() with the image name to be displayed onto the canvas.
         */

        var fileVal = document.getElementById("myfi");
        let temp = fileVal.value.split('\\');
        let userInputImage = temp[temp.length-1];

        const img = new Image()
        img.src = userInputImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
          counter = 0;
        }
        let partThree = document.getElementById('stepThree');
        partThree.style.display = 'inline';
        canvas.onmousedown = getCoordinates;
    }
    
    function userEnteredTheme(){
        /**
         * userEnteredTheme() calls visibleDivs() to display instructional divs to the user.
         * Then retrieves the file name given by the user via the input file tag.
         * Lastly, calls the changeImage() with the image name to be displayed onto the canvas.
         */

        var fileVal = document.getElementById("myfile");
        let temp = fileVal.value.split('\\');
        let userInputImage = temp[temp.length-1];

        const img = new Image()
        img.src = userInputImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0 , 500, 500)
          counter = 0;
        }
        let partThree = document.getElementById('stepThree');
        partThree.style.display = 'inline';
        canvas.onmousedown = getCoordinates;
    }

    function fetchIds(val){
        let id;
        // console.log('fetchIds');
        for(let i=0; i<themesJson.length;i++){
            console.log(themesJson[i]);
            if (themesJson[i].name == val){
                id = themesJson[i].id;
            }
        }

        let url = 'http://localhost:3001/pages/'+id;

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
            console.log('488484');
            console.log(result);
            let temp = [];
            for(let i=0; i<result.data.length; i++){
                temp.push(result.data[i]);
            }

            var list = document.getElementById('idList');
            
            temp.forEach(function(item){
               var option = document.createElement('option');
               option.value = item;
               list.appendChild(option);
            });

            const l = document.querySelector('input[list="idList"]');
            l.addEventListener('change', test, false);
            l.myParam = val;
        });


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

        if(themeList.includes(val)==true){
            fetchIds(val);

            let partTwo = document.getElementById('stepTwo');
            partTwo.style.display = 'inline';
            // let partThree = document.getElementById('stepThree');
            // partThree.style.display = 'inline';

            submit(val);

        }else{
            let partTwo = document.getElementById('stepTwoOption');
            partTwo.style.display = 'inline';
        }
    }

    function submit(clickedItem){
        /**
         * submit(clickedItem) takes in the name of datalist item that the user entered via input.
         * Then will do a fetch GET() request to server and retrieve theme id
         * 
         * PARAMETERS: clickedItem -- a string, the name of the theme the user clicked on from datalist.
         * 
         * RETURNS: N/A
         */
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

            let partTwo = document.getElementById('stepTwo');

            partTwo.style.display = 'inline';
            changeImage(result.data.image);

            // let partThree = document.getElementById('stepThree');
            // partThree.style.display = 'inline';
        });
    }

    function changeImage(file){
        /**
         * changeImage(file) takes in a string, file, which will be the name of the image chosen to be set as the background.
         * File parameter will be set onto canvas, when the user clicks on canvas getCordinates() will be called to draw on canvas
         * 
         * PARAMETERS: file -- a string, the name of the image file to be set onto the canvas
         * 
         * RETURNS: N/A
         */

        visibleDivs();

        const img = new Image()
        img.src = file;
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
         * getCordinates() is called when user presses down onto the canvas with mouse.
         * Function will fetch coordinates can draw an arc where user clicked on canvas and incr global 'counter'
         * 
         * PARAMETERS: e -- an event
         * 
         * RETURNS: N/A
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

        ctx.beginPath();
        ctx.arc(PosX, PosY-2, 10, 0, 2 * Math.PI);
        ctx.fillText(counter, PosX, PosY);
        ctx.stroke();
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
        // let partThree = document.getElementById('stepThree');
        // partThree.style.visibility = 'visible';
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