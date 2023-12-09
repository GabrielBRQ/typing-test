// script.js
document.addEventListener("DOMContentLoaded", function () {
  const letterDiv = document.querySelector(".monkey-type .letter");
  const progressBar = document.querySelector(".monkey-type .progress-bar");
  const monkeyType = document.querySelector(".monkey-type");
  const button = document.querySelector(".button");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let bodyText = document.querySelector(".body-text");
  let lastPressedKey = "";
  let correctCount = 0;

  button.addEventListener("click", function () {
    monkeyType.style.display = "grid";
    button.style.display = "none";
    playAudio();
  });

  function generateRandomLetter() {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  function updateLetter() {
    lastPressedKey = '';
    const randomLetter = generateRandomLetter();
    letterDiv.textContent = randomLetter;
    letterDiv.classList.remove("correct");
  }

  function handleKeyPress(event) {
    const pressedKey = String.fromCharCode(event.keyCode);
    const currentLetter = letterDiv.textContent;

    if (
      (pressedKey.toUpperCase() === currentLetter ||
        pressedKey.toLowerCase() === currentLetter) &&
      pressedKey !== lastPressedKey
    ) {
      lastPressedKey = pressedKey;
      letterDiv.classList.add("correct");
      playRight()
      correctCount++;

      // Atualiza a largura da barra de progresso
      progressBar.style.width = correctCount * 10 + "%";

      if (correctCount === 10) {
        bodyText.textContent = "Teste finalizado.";
        monkeyType.style.display = "none";
      }

      setTimeout(() => {
        updateLetter();
      }, 255);
    } else {
      letterDiv.classList.add("incorrect");
      playWrong();
      setTimeout(() => {
        letterDiv.classList.remove("incorrect");
      }, 500);
    }
  }

  function playWrong() {
    var audio = document.getElementById("teclaErrada");
    audio.volume = 0.7;
    audio.play();
  }

  function playRight() {
    var audio = document.getElementById("teclaCorreta");
    audio.volume = 0.2;
    audio.play();
  }

  function playAudio() {
    var audio = document.getElementById("ventilador");
    audio.play();
    audio.volume = 0.5;
  }

  // Inicializa a letra
  updateLetter();

  // Adiciona o listener para eventos de teclado
  document.addEventListener("keypress", handleKeyPress);
});
