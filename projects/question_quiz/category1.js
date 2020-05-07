(function() {
	let currUserDisplay;
	let questionsAnswers = [
		{
		  image: "background.png",
		  question: "Who is the all-time scoring leader for the NBA?",
		  answers: {
			a: "Kobe Bean Bryant",
			b: "LeBron James",
			c: "Kareem-Abdul-Jabbar"
		  },
		  correctAnswer: "c"
		},
		{
		  image: "background.png",
		  question: "How many championship titles has Celtics legend Bill Russel hold?",
		  answers: {
			a: "2 titles",
			b: "4 titles",
			c: "11 titles"
		  },
		  correctAnswer: "c"
		},
		{
		  image: "background.png",
		  question: "Who was named as the NBA MVP for the 2013-2014 season?",
		  answers: {
			a: "James Harden",
			b: "Russell Westbrook",
			c: "Kevin Durant",
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