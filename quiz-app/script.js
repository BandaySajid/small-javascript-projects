const quizArray = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswerIndex: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswerIndex: 1
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswerIndex: 1
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswerIndex: 1
    }
];

const SCORE_VAL = 10;

let result = { score: 0, correct_answers: 0, wrong_answers: 0 };

let question_index;
let selected_answer_index;

const questionElement = document.querySelector('.question');
const optionElements = document.querySelectorAll('.option');
const submit_button = document.querySelector('.submit');
const mainContainer = document.querySelector('.left');
const resultContainer = document.querySelector('.result-container');
const scoreElement = document.querySelector('.score');
const correct_answers_element = document.querySelector('.correct-answers');
const wrong_answers_element = document.querySelector('.wrong-answers');

const update_question = () => {
    let q = quizArray[question_index];

    questionElement.textContent = q.question;
    optionElements.forEach((element) => {
        element.innerHTML = ''
    });

    q.answers.forEach((option, i) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.id = i;

        radio.addEventListener('click', (event) => {
            selected_answer_index = Number(event.target.id);
        });

        const label = document.createElement('label');
        label.htmlFor = i;
        label.textContent = option;
        optionElements[i].append(radio);
        optionElements[i].append(label);
    });

    question_index++;

};

const start = () => {
    question_index = 0;
    result.score = 0;
    result.correct_answers = 0;
    result.wrong_answers = 0;
    selected_answer_index = undefined;
    mainContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    update_question();
};

const show_result = () => {
    mainContainer.style.display = 'none';
    resultContainer.style.display = 'flex';
    scoreElement.textContent = result.score;
    correct_answers_element.textContent = result.correct_answers;
    wrong_answers_element.textContent = result.wrong_answers;
};

const check_answer = (key) => {
    if (key === quizArray[question_index - 1].correctAnswerIndex) {
        result.score += SCORE_VAL;
        result.correct_answers += 1;
    } else {
        result.score -= SCORE_VAL;
        result.wrong_answers += 1;
    }

}

start();

submit_button.addEventListener('click', () => {
    if (question_index >= quizArray.length) {
        check_answer(selected_answer_index);
        show_result();
        return;
    };
    check_answer(selected_answer_index);
    update_question();

});