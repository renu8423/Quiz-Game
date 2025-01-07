// Grabbing the DOM elements needed for the quiz functionality
let startBtn = document.getElementById('start-btn'); // Start button
let nextBtn = document.getElementById('next-btn'); // Next button
let questionContainer = document.getElementById('question-container'); // Container for the question and answers
let questionElement = document.getElementById('question'); // The question element (currently missing in HTML)
let answerElement = document.getElementById('answer-btns'); // The container for the answer buttons

// Variables to track the shuffled questions, the current question index, and the quiz score
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

// Event listener for the Start button to initialize the quiz
startBtn.addEventListener('click', startGame);

// Event listener for the Next button to move to the next question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++; // Increment question index
    nextQuestion(); // Load the next question
});

// Function to start the quiz
function startGame() {
    startBtn.classList.add('hide'); // Hide the Start button
    shuffledQuestions = [...question].sort(() => Math.random() - 0.5); // Shuffle the questions array
    currentQuestionIndex = 0; // Start from the first question
    questionContainer.classList.remove('hide'); // Show the question container
    quizScore = 0; // Reset the score
    document.getElementById('right-score').innerText = quizScore; // Display the updated score
    nextQuestion(); // Load the first question
}

// Function to display the next question
function nextQuestion() {
    resetState(); // Clear previous question and answers
    showQuestion(shuffledQuestions[currentQuestionIndex]); // Display the current question
}

// Function to display a question and its answers
function showQuestion(question) {
    questionElement.innerText = question.question; // Set the question text
    question.answers.forEach((answer) => {
        const button = document.createElement('button'); // Create a button for each answer
        button.innerText = answer.text; // Set the answer text
        button.classList.add('btn'); // Add a class for styling
        button.dataset.correct = answer.correct; // Store whether the answer is correct in a data attribute
        button.addEventListener('click', selectAnswer); // Add a click event listener to the button
        answerElement.appendChild(button); // Append the button to the answer container
    });
}

// Function to reset the state for the next question
function resetState() {
    clearStatusClass(document.body); // Clear any status classes (correct/wrong)
    nextBtn.classList.add('hide'); // Hide the Next button
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild); // Remove all previous answer buttons
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target; // Get the clicked button
    const correct = JSON.parse(selectedButton.dataset.correct); // Convert the correct value to a boolean

    setStatusClass(document.body, correct); // Set the body status class based on correctness
    Array.from(answerElement.children).forEach((button) => {
        setStatusClass(button, JSON.parse(button.dataset.correct)); // Set status for all buttons
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide'); // Show the Next button if more questions remain
    } else {
        startBtn.innerText = "Restart"; // Change Start button text to Restart
        startBtn.classList.remove('hide'); // Show the Start button
    }

    if (correct) {
        quizScore++; // Increment the score if the answer is correct
    }

    document.getElementById('right-score').innerText = quizScore; // Update the displayed score
}

// Function to set the status class (correct/wrong) for an element
function setStatusClass(element, correct) {
    clearStatusClass(element); // Clear any existing status classes
    if (correct) {
        element.classList.add('correct'); // Add the 'correct' class if the answer is correct
    } else {
        element.classList.add('wrong'); // Add the 'wrong' class if the answer is incorrect
    }
}

// Function to clear the status classes from an element
function clearStatusClass(element) {
    element.classList.remove('correct'); // Remove 'correct' class
    element.classList.remove('wrong'); // Remove 'wrong' class
}

// Array of question objects with their answers
const question = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ],
    },
    {
        question: 'Who is the Prime Minister of India?',
        answers: [
            { text: 'Rahul Gandhi', correct: false },
            { text: 'Narendra Modi', correct: true },
        ],
    },
    {
        question: 'Can the “img” tag have a closing tag?',
        answers: [
            { text: 'Yes', correct: false },
            { text: 'No', correct: true },
        ],
    },
    {
        question: 'Which built-in React Hook is used to add state to a functional component?',
        answers: [
            { text: 'useState', correct: true },
            { text: 'useEffect', correct: false },
            { text: 'useCallback', correct: false },
            { text: 'useContext', correct: false },
        ],
    },
    {
        question: 'Which of the following CSS properties is used to define the number of times an animation should play?',
        answers: [
            { text: 'scale-iteration-count', correct: false },
            { text: 'transition-iteration-count', correct: false },
            { text: 'animation-iteration-count', correct: true },
            { text: 'all of the mentioned', correct: false },
        ],
    },
];
