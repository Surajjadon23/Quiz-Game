const questionNumber = document.querySelector(".qno");
const questionText = document.querySelector(".questiontext");
const optionContainer = document.querySelector(".optionslist");
const answerShowContainer = document.querySelector(".answershow");
const homebox = document.querySelector(".homebox");
const questionbox = document.querySelector(".questionbox");
const resultbox = document.querySelector(".resultbox");
 
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
 
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0 ; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}
 
function getNewQuestion(){
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + " of " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
   const optionLen = currentQuestion.options.length;
   for(let i=0; i < optionLen; i++){
       availableOptions.push(i)
   }
   optionContainer.innerHTML = '';
   let animationDelay = 0.2; 
 
   for( let i =0; i<optionLen; i++){
      
       const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
       const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2,1);
       const option = document.createElement("div");
       option.innerHTML = currentQuestion.options[optonIndex];
       option.id = optonIndex;
       option.style.animationDelay = animationDelay + 's';
       animationDelay = animationDelay + 0.2;
       option.className = "choice";
       optionContainer.appendChild(option)
       option.setAttribute("onclick","getResult(this)");
   }
    questionCounter ++;
}
 
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
      element.classList.add("correct") ; 
      updateAnswerIndicator("correct");
      correctAnswers ++;
      console.log("correct:" + correctAnswers);
    }
    else{
       
        element.classList.add("wrong");
      updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0 ; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");  
            }
        }
    }
    attempt ++;
    unclickableOptions();
}
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i =0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answerIndicator(){
    answerShowContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion ; i++){
        const indicator = document.createElement("div");
        answerShowContainer.appendChild(indicator); 
    }
}
 
function updateAnswerIndicator(markType){
    answerShowContainer.children[questionCounter-1].classList.add(markType);
}
function next(){
    if(questionCounter === quiz.length){
        console.log("test over");
        testover();
    }
    else{
        getNewQuestion();
    }
}
 
function testover(){
    questionbox.classList.add("hide");
    resultbox.classList.remove("hide");
    testResult();
}
function testResult(){
    resultbox.querySelector(".total-questions").innerHTML = quiz.length;
    resultbox.querySelector(".total-attempt").innerHTML = attempt;
    resultbox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultbox.querySelector(".total-wrong").innerHTML =  attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultbox.querySelector(".percentage").innerHTML = percentage.toFixed(3) + "%";
    resultbox.querySelector(".total-marks").innerHTML = correctAnswers + " / "+ quiz.length;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}
function goToHome(){
    resultbox.classList.add("hide");
    homebox.classList.remove("hide");
    resetQuiz();
}
function startQuiz(){
    homebox.classList.add("hide");
    questionbox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answerIndicator(); 
}
