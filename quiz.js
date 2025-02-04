// Creamos el array de objetos con las preguntas y las respuestas
const questions = [
    {
        question: "1.¿Cuál es la capital de España?",
        answers: ["Madrid", "Barcelona", "Valencia", "Sevilla"],
        correctAnswer: "Madrid"
    },
    {
        question: "2.¿Cuál es la capital de Francia?",
        answers: ["París", "Lyon", "Marseille", "Toulouse"],
        correctAnswer: "París"
    },
    {
        question: "3.¿Cuál es la capital de Italia?",
        answers: ["Roma", "Milan", "Nápoles", "Turín"],
        correctAnswer: "Roma"
    },
    {
        question: "4.¿Cuál es la capital de Alemania?",
        answers: ["Berlín", "Hamburgo", "Munich", "Frankfurt"],
        correctAnswer: "Berlín"
    },
    {
        question: "5.¿Cuál es la capital de Portugal?",
        answers: ["Lisboa", "Porto", "Coimbra", "Faro"],
        correctAnswer: "Lisboa"
    }
];

// Variable de pregunta actual inicializada en 0
let currentQuestion = 0;
// Variable para controlar si se ha respondido la pregunta
let isAnswered = false;
// Variable con score total deñ quiz
// let score = 0;
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
// Variables de tiempo para la cuenta atrás
const totalTime = 30;
let timer = 30;
let intervalID = setInterval(countdown, 1000)

// Constantes para título de la pregunta y para el <div></div> en el que se van a pintar los botones de respuesta
const title = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const questionNum = document.getElementById("numQuestion");
// Boton sigueinte
const btnNext = document.getElementById("btnNext");
// Texto con el tiempo restante para responder pregunta
const txtTimer = document.getElementById("txtTimer");
// Campo de la barra de progreso
const progressBar = document.getElementById("progressBar")

// Funcion que imprime la pregunta y las respuestas para cada pregunta
function printQuestion() {
    // Pintar título de la pregunta
    // La forma de seleccionar la clave question del switch questions es: questions.question
    title.innerText = questions[currentQuestion].question;

    // De la pregunta actual, se generan los botones de respuesta
    let questionAnswers = questions[currentQuestion].answers;

    // Desordenamos las respuestas para que no estén en el mismo orden
    questionAnswers.sort(() => Math.random() - 0.5);

    // Antes de borrar las nuevas respuestas, se borra el contenido del div (para que no se acumulen los botones de respuesta de la pregunta anterior)
    answerBox.innerHTML = "";

    // Se generan los botones de respuesta
    // Se ejecuta la funcion para comprobar la respuesta al pulsar un boton
    questionAnswers.forEach((answer, index) => {
        answerBox.innerHTML += `<button
        id="btn${index}" 
        onclick="checkAnswer('${answer}', 'btn${index}')"
        class="bg-slate-200 rounded-lg p-2.5 hover:bg-slate-800 hover:text-white transition-all">
        ${answer}
        </button>`
    });

    // El botón de siguiente se des-habilita para que
    // no se pueda pasar de pregunta si no se ha respondido
    btnNext.disabled = true;

    // Imprimir por qué pregunta vamos
    questionNum.innerText = `Pregunta ${currentQuestion + 1} de ${questions.length}`

}
// Función para comprobar si la respuesta seleccionada es correcta
function checkAnswer(answer, btnId) {
    // Si isAnswered = false
    if (!isAnswered) {
        // Cambiamos la variable porque ya se ha seleccionado una opción
        isAnswered = true;
        // El boton de siguiente se habilita para pasar de pregunta
        btnNext.disabled = false;
        // Cogemos la respuesta correcta
        const correctAnswer = questions[currentQuestion].correctAnswer;
        const isCorrect = (answer == correctAnswer);
        if (isCorrect) {
            // Sumo como escore el tiempo, cuanto antes conteste, mas sumo
            score += timer;
            // Almaceno en una tabla del almacenamiento la puntuación
            localStorage.setItem("score", score)
        }
        console.log("SCORE", score)
        // Hacemos un condicional para coger el color de fondo del botón
        // en función de si es la respuesta correcta o no
        const bgColor = (answer == correctAnswer) ? "bg-green-500" : "bg-red-600"
        // Se cambia el color del botón
        document.getElementById(btnId).classList.remove("bg-slate-200")
        document.getElementById(btnId).classList.add(bgColor);

    }
}

// Funcion que pasa de pregunta. Hemos puesto en el html 
// que en el boton de siguiente se ejecute esta función al hacer click en el (con onclick = nextQuestion())
function nextQuestion() {
    // Como isAnswered es true de la pregunta anterior
    if (isAnswered) {
        // La volvemos a poner en false
        isAnswered = false
        // Si llegamos al final de las preguntas, mostramos un mensaje o reiniciamos
        if (currentQuestion >= questions.length - 1) {
            //alert("¡Has llegado al final del Quiz!");
            window.location = "/ranking.html"
            // Si no es el final, pasamos a la siguiente pregunta
        } else {
            currentQuestion++;
        }
        // Ejecutamos la función de imprimir pregunta
        printQuestion();
        // Reinicializamos el contardor timer a 30s + 1 para que se vea el 30
        timer = totalTime + 1;
        // Arrancamos de nuevo el contador
        intervalID = setInterval(countdown, 1000);
    }
}

function countdown() {
    timer -= 1;
    console.log("timer", timer);
    txtTimer.innerText = `${timer}`;

    console.log("Se ha respondido? =>", isAnswered);

    // Ocultar y mostrar la barra de progreso
    progressBar.classList.replace("opacity-0", "opacity-100");

    const widthPercent = getPercent(timer)
    // Cogemos como ancho el tiempo que quede
    progressBar.style.width = `${widthPercent}%`

    if (isAnswered || timer == 0) {
        //Parar
        clearInterval(intervalID);
        // Cambiamos a isAnswered si para que cuando se acabe el tiempo
        // no pueda pulsar ninguna respuesta
        isAnswered = true;
        // Habilitamos el boton de siguiente pregunta
        btnNext.disabled = false;

        if (timer == 0) {
            alert("Tiempo finalizado");
        }
    }
}

function getPercent(currentTime) {
    return (currentTime * 100) / totalTime;
}

// Ejecutamos la funcion por primera vez para que imprima la primera pregunta al abrir la pagina
printQuestion()