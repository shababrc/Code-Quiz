//Reference Variables
//setting our page elements into variables
var welcomePage = document.getElementById("welcome-page");
var welcomeMessage = document.getElementById("welcome-message");
var timer = document.getElementById("timer");
var scoresDiv = document.getElementById("scores-div");
var questionDiv = document.getElementById("question-div");
var results = document.getElementById("results");
var choices = document.getElementById("choices");
var endPage = document.getElementById("end-screen");

//setting variables for button elements
var viewScoresBtn = document.getElementById("view-scores");
var buttonsDiv = document.getElementById("buttons")
var startButton = document.getElementById("start-button");


//Global Variables
// adding a variable for timer seconds, begins at 90 seconds.
var timerSeconds = 90;
console.log("hello");
//setting a variable for question number
var questionNumber = 0;

//setting variable for score
var score = 0;

//setting an empty variable array to store our scores, 
//then an array of high scores from local storage
var emptyScores = [];
var storedScores = JSON.parse(window.localStorage.getItem("highScores"));



function setTime() {
  var timerInterval = setInterval(function() {
    timerSeconds--;
    timer.textContent = "";
    timer.textContent = "Time: " + timerSeconds;
    if (timerSeconds <= 0 || questionNumber === questions.length) {
      clearInterval(timerInterval);
      choices.remove();
      recordUserScore();
    } 
  }, 1000);
}

//initiator
startButton.addEventListener("click", startQuiz);

function startQuiz(){
  setTime();
  removeEls(startButton);
  displayQuestion();
}


function displayQuestion(){
  if (questionNumber < questions.length){
    questionDiv.innerHTML = questions[questionNumber].title;
    choices.textContent = "";

      for(var i = 0; i < questions[questionNumber].multiChoice.length; i++){
        var choiceBtn = document.createElement("button");
        choiceBtn.innerText=questions[questionNumber].multiChoice[i];
        choiceBtn.setAttribute("data-id", i);
        
        choiceBtn.addEventListener("click", function(event) {
          event.stopPropagation();
       
          console.log(event.target.innerText);
          if(event.target.innerText === questions[questionNumber].answer){
            console.log("correct");
            score += 15;
          } else{
            timerSeconds = timerSeconds - 10;
            console.log("incorrect");
          }

          questionDiv.innerHTML = "";

          if(questionNumber === questions.length){
            recordUserScore();
            return;
            
          } else {
            questionNumber++;
            displayQuestion();
          }

        });
        choices.append(choiceBtn);

      }
  }
}

function recordUserScore(){
    timer.remove();
    choices.textContent = " ";

    var inputInitials = document.createElement("input");
    var inputScoreBtn = document.createElement("input");


    results.innerHTML = 'You scored '+ score + ' points! Enter your initials: ';
    inputInitials.setAttribute("type", "text");
    inputScoreBtn.setAttribute("type", "button");
    inputScoreBtn.setAttribute("value", "Post My Score!");
    inputScoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
        var userScoreArray = defineScoresArray(storedScores, emptyScores);

        var initials = inputInitials.value;
        var userAndScore = {
            initials: initials,
            score: score,
        };

        userScoreArray.push(userAndScore);
        saveScores(userScoreArray);
        displayAllScores();
        clearScoresBtn();
        goBackBtn();
        viewScoresBtn.remove();
    });

    results.append(inputInitials);
    results.append(inputScoreBtn);
}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
    if(arr1 !== null){
      return arr1;
    } else {
      return arr2;
    }
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function displayAllScores(){
  console.log("displayallscores");
  removeEls(timer, startButton, results);

  scoresArray = defineScoresArray(storedScores, emptyScores);

  scoresArray.forEach(obj => {
    initials = obj.initials;
    storedScore = obj.score;
    var resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoresDiv.append(resultsP);

  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(timer, startButton);
    displayAllScores();
    removeEls(viewScoresBtn);
    clearScoresBtn();
    goBackBtn();
  });
}

function clearScoresBtn(){
  var clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoresDiv);
    window.localStorage.removeItem("highScores");
  })
  scoresDiv.append(clearBtn);
}

function goBackBtn() {
  var backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}


viewScores();










