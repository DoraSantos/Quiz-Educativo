const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const correctionsElement = document.getElementById("corrections");

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let answersLog = [];

// Iniciar o Quiz
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add("hide");
    resultContainer.classList.add("hide");
    score = 0;
    answersLog = [];
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) score++;
    answersLog.push({
        question: shuffledQuestions[currentQuestionIndex].question,
        correctAnswer: shuffledQuestions[currentQuestionIndex].answers.find(a => a.correct).text,
        userAnswer: selectedButton.innerText
    });

    setStatusClass(selectedButton, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        showResults();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function showResults() {
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreElement.innerText = `Pontuação Final: ${score}/${shuffledQuestions.length}`;

    correctionsElement.innerHTML = "";
    answersLog.forEach(log => {
        const li = document.createElement("li");
        li.innerHTML = `<b>Pergunta:</b> ${log.question} <br> 
                        <b>Resposta correta:</b> ${log.correctAnswer} <br>
                        <b>Sua resposta:</b> ${log.userAnswer}`;
        correctionsElement.appendChild(li);
    });

    startButton.innerText = "Reiniciar";
    startButton.classList.remove("hide");
}

// Perguntas do Quiz
const questions = [
    { question: "Qual é a capital de Portugal?", answers: [{ text: "Lisboa", correct: true }, { text: "Porto", correct: false }, { text: "Coimbra", correct: false }, { text: "Faro", correct: false }] },
    { question: "Quem escreveu 'Os Lusíadas'?", answers: [{ text: "Fernando Pessoa", correct: false }, { text: "Camões", correct: true }, { text: "Eça de Queirós", correct: false }, { text: "José Saramago", correct: false }] },
    { question: "Qual é o maior oceano do mundo?", answers: [{ text: "Atlântico", correct: false }, { text: "Pacífico", correct: true }, { text: "Índico", correct: false }, { text: "Ártico", correct: false }] },
    { question: "Qual é o planeta mais próximo do Sol?", answers: [{ text: "Vênus", correct: false }, { text: "Mercúrio", correct: true }, { text: "Terra", correct: false }, { text: "Marte", correct: false }] },
    { question: "Quem pintou a Mona Lisa?", answers: [{ text: "Leonardo da Vinci", correct: true }, { text: "Pablo Picasso", correct: false }, { text: "Michelangelo", correct: false }, { text: "Van Gogh", correct: false }] },
    { question: "Quantos continentes existem?", answers: [{ text: "5", correct: false }, { text: "6", correct: false }, { text: "7", correct: true }, { text: "8", correct: false }] },
    { question: "Qual é o maior deserto do mundo?", answers: [{ text: "Sahara", correct: false }, { text: "Antártico", correct: true }, { text: "Gobi", correct: false }, { text: "Kalahari", correct: false }] },
    { question: "Quem descobriu o Brasil?", answers: [{ text: "Pedro Álvares Cabral", correct: true }, { text: "Cristóvão Colombo", correct: false }, { text: "Vasco da Gama", correct: false }, { text: "Américo Vespúcio", correct: false }] },
    { question: "Qual é a fórmula química da água?", answers: [{ text: "H2O", correct: true }, { text: "O2", correct: false }, { text: "CO2", correct: false }, { text: "H2SO4", correct: false }] },
    { question: "Quem foi o primeiro presidente do Brasil?", answers: [{ text: "Deodoro da Fonseca", correct: true }, { text: "Getúlio Vargas", correct: false }, { text: "Juscelino Kubitschek", correct: false }, { text: "Marechal Rondon", correct: false }] },
    // Adicione mais perguntas aqui!
   // Novas perguntas de Língua Portuguesa
        { 
            question: "Qual é o sujeito na frase: 'O cachorro latiu a noite toda'?", 
            answers: [
                { text: "O cachorro", correct: true }, 
                { text: "latiu", correct: false }, 
                { text: "a noite toda", correct: false }, 
                { text: "nenhum", correct: false }
            ]
        },
        { 
            question: "Qual é o tempo verbal da frase: 'Eu estudarei amanhã'?", 
            answers: [
                { text: "Presente", correct: false }, 
                { text: "Pretérito", correct: false }, 
                { text: "Futuro do presente", correct: true }, 
                { text: "Imperativo", correct: false }
            ]
        },
        { 
            question: "Qual palavra está grafada corretamente?", 
            answers: [
                { text: "Excessão", correct: false }, 
                { text: "Acessório", correct: true }, 
                { text: "Conceção", correct: false }, 
                { text: "Pretensão", correct: true }
            ]
        },
        { 
            question: "O que é uma metáfora?", 
            answers: [
                { text: "Comparação explícita", correct: false }, 
                { text: "Comparação implícita", correct: true }, 
                { text: "Repetição de palavras", correct: false }, 
                { text: "Oposição de ideias", correct: false }
            ]
        },
        { 
            question: "Qual é a função da vírgula na frase: 'João, venha aqui agora!'?", 
            answers: [
                { text: "Separar sujeito do predicado", correct: false }, 
                { text: "Marcar vocativo", correct: true }, 
                { text: "Separar itens em enumeração", correct: false }, 
                { text: "Indicar pausa longa", correct: false }
            ]
        },
        { 
            question: "Qual é o plural de 'cidadão'?", 
            answers: [
                { text: "Cidadãos", correct: true }, 
                { text: "Cidadões", correct: false }, 
                { text: "Cidadãoses", correct: false }, 
                { text: "Cidadães", correct: false }
            ]
        },
        { 
            question: "Qual é o antônimo de 'alegria'?", 
            answers: [
                { text: "Felicidade", correct: false }, 
                { text: "Tristeza", correct: true }, 
                { text: "Satisfação", correct: false }, 
                { text: "Contentamento", correct: false }
            ]
        },
        { 
            question: "Qual palavra é um adjetivo?", 
            answers: [
                { text: "Correr", correct: false }, 
                { text: "Bonito", correct: true }, 
                { text: "Casa", correct: false }, 
                { text: "Alegria", correct: false }
            ]
        },
        { 
            question: "Qual frase apresenta um verbo no pretérito perfeito?", 
            answers: [
                { text: "Eu vou viajar.", correct: false }, 
                { text: "Ele viajou ontem.", correct: true }, 
                { text: "Nós viajaremos amanhã.", correct: false }, 
                { text: "Eles estavam viajando.", correct: false }
            ]
        },
        { 
            question: "Qual é a classe gramatical da palavra 'feliz'?", 
            answers: [
                { text: "Substantivo", correct: false }, 
                { text: "Adjetivo", correct: true }, 
                { text: "Verbo", correct: false }, 
                { text: "Advérbio", correct: false }
            ]
        },
        { 
            question: "O que é uma onomatopeia?", 
            answers: [
                { text: "Imitação de sons", correct: true }, 
                { text: "Repetição de ideias", correct: false }, 
                { text: "Comparação direta", correct: false }, 
                { text: "Personificação", correct: false }
            ]
        }
    
    
];
