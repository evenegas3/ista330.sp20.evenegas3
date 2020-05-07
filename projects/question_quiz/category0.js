(function() {
	let currUserDisplay;
	let questionsAnswers = [
		{
		  image: "background.png",
		  question: "Who topped the UK Charts with 'If I Was' in 1985?",
		  answers: {
			a: "The Smiths",
			b: "Michael Jackson",
			c: "Midge Ure"
		  },
		  correctAnswer: "c"
		},
		{
		  image: "background.png",
		  question: "Which male artist sang the lyrics, 'How can you leave me standing? Alone in a world that's so cold'??",
		  answers: {
			a: "Jimi Hendrix: All Along The Watchtower",
			b: "David Bowie: Space Oddity",
			c: "Prince: When Doves Cry"
		  },
		  correctAnswer: "c"
		},
		{
		  image: "background.png",
		  question: "How Many Records Have The Beatles Sold in The U.S?",
		  answers: {
			a: "250 million",
			b: "100 million",
			c: "183 million",
		  },
		  correctAnswer: "c"
		}
	  ];

	window.onload = function() { 
		let submitButton = document.getElementById('submit');
		let previousButton = document.getElementById("previous");
		let nextButton = document.getElementById("next");
		currUserDisplay = 0;

		submitButton.addEventListener('click', showResults);
		previousButton.addEventListener("click", displayPreviousSlide);
		nextButton.addEventListener("click", displayNextSlide);

		buildQuiz(questionsAnswers);
		showSlide(currUserDisplay);
	};

	function showResults(){
		let quizContainer = document.getElementById('quiz');
		const answerContainers = quizContainer.querySelectorAll('.answers');
		let resultsContainer = document.getElementById('results');
		let numCorrect = 0;

		questionsAnswers.forEach( (currentQuestion, questionNumber) => {
		  const answerContainer = answerContainers[questionNumber];
		  const selector = `input[name=question${questionNumber}]:checked`;
		  const userAnswer = (answerContainer.querySelector(selector) || {}).value;

		  if(userAnswer === currentQuestion.correctAnswer){
			numCorrect++;
	
			answerContainers[questionNumber].style.color = 'lightgreen';
		  }
		  else{
			answerContainers[questionNumber].style.color = 'red';
		  }
		});
	
		resultsContainer.innerHTML = `${numCorrect} out of ${questionsAnswers.length}`;
	  }


	function displayNextSlide() {
		showSlide(currUserDisplay + 1);
	}
	
	function displayPreviousSlide() {
		showSlide(currUserDisplay - 1);
	}

    function buildQuiz(myQuestions){
		const output = [];
		let quizContainer = document.getElementById('quiz');

		myQuestions.forEach(
		  (currentQuestion, questionNumber) => {
	
			const answers = [];
	
			for(letter in currentQuestion.answers){
	
			  answers.push(
				`<label>
				  <input type="radio" name="question${questionNumber}" value="${letter}">
				  ${letter} :
				  ${currentQuestion.answers[letter]}
				</label>`
			  );
			}
	
			output.push(
			  `<div class="slide">

				<div class="question"> ${currentQuestion.question} </div>
				<div class="answers"> ${answers.join("")} </div>
			  </div>`
			);
		  }
		);
		// <img src="background.png" width="100" height="100" style="border:5px solid black">

		quizContainer.innerHTML = output.join('');
	  }

	  function showSlide(n) {
		let submitButton = document.getElementById('submit');
		let nextButton = document.getElementById("next");
		let previousButton = document.getElementById("previous");
		let slides = document.querySelectorAll(".slide");

		slides[currUserDisplay].classList.remove('active-slide');
		slides[n].classList.add('active-slide');
		currUserDisplay = n;

		if(currUserDisplay === 0){
		  previousButton.style.display = 'none';
		}
		else{
		  previousButton.style.display = 'inline-block';
		}
		if(currUserDisplay === slides.length-1){
		  nextButton.style.display = 'none';
		  submitButton.style.display = 'inline-block';
		}
		else{
		  nextButton.style.display = 'inline-block';
		  submitButton.style.display = 'none';
		}
	  }

}());


// <div class="image"> 
// <img height="42" width="42" src= ${currentQuestion.image} />

// </div>