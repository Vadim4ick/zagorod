window.addEventListener("load", function () {
  var loadingVideo = document.querySelector("#loading-video video");
  var backgroundVideo = document.querySelector("#background-video video");

  loadingVideo.addEventListener("timeupdate", function () {
    if (loadingVideo.currentTime >= 3) {
      document.getElementById("loading-video").style.display = "none";
      document.getElementById("background-video").classList.add("show");
      document.getElementById("content").classList.add("show");

      setTimeout(function () {
        document.getElementById("title").classList.add("show");
        document.getElementById("footer").classList.add("show");
        document.getElementById("callButton").classList.add("show");
        document.getElementById("requestButton").classList.add("show");
      }, 1000);

      setTimeout(function () {
        document.getElementById("heading").classList.add("show");
      }, 750);
    }
  });

  backgroundVideo.addEventListener("timeupdate", function () {
    if (backgroundVideo.currentTime >= 8) {
      loadingVideo.removeEventListener("timeupdate");
      backgroundVideo.removeEventListener("timeupdate");
    }
  });
});

if (window.matchMedia("(max-width: 760px)").matches) {
  document.querySelector("#background-video video").setAttribute("loop", true);
}

// Анимация кружки
const circles = document.querySelectorAll(".circle");
const sequence = [6, 7, 5, 0, 1, 8, 7, 1, 5, 8, 2]; // ваша последовательность индексов кругов
let currentIndex = 0;

function activateCircle() {
  if (document.getElementById("modalPhone").classList.contains("active")) {
    const circleIndex = sequence[currentIndex];
    circles[circleIndex].classList.add("active");

    // Сброс активного класса через 300 мс
    setTimeout(function () {
      circles[circleIndex].classList.remove("active");

      // Увеличение индекса или сброс на 0, если достигнут конец массива
      currentIndex = (currentIndex + 1) % sequence.length;

      // Рекурсивный вызов функции активации для следующего круга
      setTimeout(activateCircle, 300);
    }, 350); // Увеличение задержки до 1300 мс, чтобы с учетом анимации получилась задержка 300 мс
  }
}

// модалка телефона
document.getElementById("callButton").addEventListener("click", function () {
  document.getElementById("modalPhone").classList.add("active");
  currentIndex = 0;
  activateCircle();
  document.getElementById("contentBody").style.display = "none";
});

// модалка формы
document.getElementById("requestButton").addEventListener("click", function () {
  document.getElementById("modalForm").classList.add("active");
  document.getElementById("contentBody").style.display = "none";
});

// Закрывать модалку при клике на оверлей
document.querySelector(".overlay").addEventListener("click", function () {
  document.getElementById("modalPhone").classList.remove("active");
  activateCircle();
  document.getElementById("contentBody").style.display = "flex";
});

document.querySelector(".overlay2").addEventListener("click", function () {
  document.getElementById("modalForm").classList.remove("active");
  document.getElementById("contentBody").style.display = "flex";
});

document.querySelector("#closeForm").addEventListener("click", function () {
  document.getElementById("modalForm").classList.remove("active");
  document.getElementById("contentBody").style.display = "flex";
});

// Копировать содержимое
document.getElementById("phone").addEventListener("click", function () {
  // Создаем временный элемент input
  var inputElement = document.createElement("input");
  inputElement.value = this.textContent;

  // Добавляем временный элемент input на страницу
  document.body.appendChild(inputElement);

  // Выделяем текст внутри элемента input
  inputElement.select();

  // Копируем выделенный текст
  document.execCommand("copy");

  // Удаляем временный элемент input
  document.body.removeChild(inputElement);
});

// Получение ссылок на элементы формы
const nameInput = document.getElementById("nameInp");
const emailInput = document.getElementById("inpEmail");
const phoneInput = document.getElementById("inpPhone");
const roof = document.getElementById("roof");
const frame = document.getElementById("frame");
const door = document.getElementById("door");

// Назначение обработчиков события input для полей ввода
nameInput.addEventListener("input", handleInput);
emailInput.addEventListener("input", handleInput);
phoneInput.addEventListener("input", handleInput);

// Обработчик события input
function handleInput() {
  // Заливка элементов в зависимости от заполненных полей
  if (nameInput.value !== "") {
    frame.classList.add("active"); // Например, красный цвет
  } else {
    frame.classList.remove("active"); // Сброс заливки
  }

  if (emailInput.value !== "") {
    roof.classList.add("active"); // Например, зеленый цвет
  } else {
    roof.classList.remove("active");
  }

  if (phoneInput.value !== "") {
    door.classList.add("active"); // Например, синий цвет
  } else {
    door.classList.remove("active");
  }
}

// Валидация телефона
var phoneInput2 = document.getElementById("phone-input");
var phoneMask = new Inputmask("+7 (999) 999-99-99");
phoneMask.mask(phoneInput);
