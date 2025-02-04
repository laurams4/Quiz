const textScore = document.getElementById("textScore");

const scoreActual = localStorage.getItem("score") ?? 0;
textScore.innerText = `¡Has conseguido ${scoreActual} puntos! 🎉`;

function restartQuiz() {
    localStorage.setItem("score", 0); // Reinicia la puntuación
    window.location = "/quiz.html";
}