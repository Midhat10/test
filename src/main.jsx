// импортируем стили
import "./assets/scss/style.scss";

// Ищет в дом дереве обёртку свайпера, куда нужно будет вставлять слайды
const lists = document.querySelectorAll(".swiper-wrapper");
const list1 = lists[0];
const list2 = lists[1];
const list3 = lists[2];
const items1 = list1.children;
const items2 = list2.children;

// создаём объект, в который будем хранить свойства - ключ.
const dataProperty = {
  "Ремонтные услуги": 1,
  Цена: 2,
  Срок: 3,
};


// создаём переменные, которые будут ключами в объекте
const data1 = [
  "Диагностика",
  "Замена Дисплея",
  "Замена полифонического динамика",
  "Тестирование с выдачей технического заключения",
  "Замена программного обеспечения",
];
const data2 = ["Бесплатно", "1000 р", "1000 р", "1000 р", "1000 р"];
const data3 = [
  "30 мин",
  "30-120 мин",
  "30-120 мин",
  "30-120 мин",
  "30-120 мин",
];

// переменная, которая будет хранить объекты
const list123 = [];

// прогоняем через функцию. Чтобы объект перестал быть ссылочным,
// то мы ему зададим функцию структуредклон.
for (let i = 0; i < 5; i++) {
  const try1 = structuredClone(dataProperty);
  try1["Ремонтные услуги"] = data1[i];
  try1["Цена"] = data2[i];
  try1["Срок"] = data3[i];

  list123.push(try1);
}

// объявляем свайпер функцию для 1 и 2 свайпера.
const getSwiper = (swiper123) =>
  new window.Swiper(swiper123, {
    // Optional parameters
    direction: "horizontal",
    // loop: true,
    slidesPerView: 1.28,
    spaceBetween: 16,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

// объявляем свайпер функцию для 3 свайпера
const getSwiper2 = (swiper123) =>
  new window.Swiper(swiper123, {
    // Optional parameters
    direction: "horizontal",
    // loop: true,
    slidesPerView: 1.18,
    spaceBetween: 16,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

// теперь ищем образец, по которому будем делать слайды
const swiperTemplate = document.querySelector("#slide-template").content;
const newSlideTemplates = swiperTemplate.querySelectorAll(".swiper-slide");
const newSlideTemplates1 = newSlideTemplates[0];
const newSlideTemplates2 = newSlideTemplates[1];
const newSlideTemplates3 = newSlideTemplates[2];

// создаём функцию для добавления слайдов
const addSlide = function (template, list, logotype, index, array) {
  const slide = template.cloneNode(true);
  if (logotype) {
    const logo = slide.querySelector(".swiper__logoplace");
    logo.style.backgroundImage = `url('${logotype}')`;
  }

  if (index && !array) {
    const text = slide.querySelector(".swiper__text");
    text.textContent = `Ремонт ${index}`;
    console.log("slava Iisusu!");
  }

  if (array) {
    const topics = slide.querySelectorAll("span");
    topics[0].textContent = array[index]["Ремонтные услуги"];
    topics[1].textContent = array[index]["Цена"];
    topics[2].textContent = array[index]["Срок"];
  }
  list.appendChild(slide);
};

// запускаем прорисовку слайдов
const render = function () {
  for (let i = 1; i <= 8; i++) {
    addSlide(newSlideTemplates1, list1, `./images/logo-${i}.png`);
  }

  for (let i = 1; i <= 3; i++) {
    addSlide(newSlideTemplates1, list1, `./images/logo-${i}.png`);
  }

  for (let i = 1; i <= 8; i++) {
    addSlide(newSlideTemplates2, list2, "", i);
  }

  for (let i = 0; i < 5; i++) {
    addSlide(newSlideTemplates3, list3, "", i, list123);
  }
};

console.log("hello");
render();

// Делаем интерактивность для Читать далее.

// Делаем интерактивность для свайперов.
// в начале ищем кнопки Показать всё
const btnHandlers = document.querySelectorAll(".swiper__handler");
const btnHandler1 = btnHandlers[0];
const btnHandler2 = btnHandlers[1];

// создаём функцию, которая будет создавать прослушиватель события
const inputFunction = function (btnHandler, items, list, visibleSlides) {
  const slides = [...items];
  let slidesToShow;
  const updateSlidesVisibility = () => {
    const windowWidth = window.innerWidth;


    if (windowWidth < 768) {
      slidesToShow = slides.length; // Показываем все слайды
    } else if (windowWidth <= 1040) {
      slidesToShow = visibleSlides[0]; // Используем значение для первого слайдера
    } else {
      slidesToShow = visibleSlides[1]; // Используем значение для второго слайдера
    }


    slides.forEach((slide, index) => {
      if (index >= slidesToShow) {
        slide.classList.add('hidden'); // Добавляем класс для скрытия
      } else {
        slide.classList.remove('hidden'); // Убираем класс, если слайд видимый
      }
    });

    // Устанавливаем отступ в зависимости от состояния
    const allHidden = slides.slice(slidesToShow).every(slide => slide.classList.contains('hidden'));
    list.style.marginBottom = allHidden ? '24px' : '45px';
    btnHandler.textContent = allHidden ? "Показать всё" : "Скрыть всё";
    return slidesToShow
  };

  // Инициализация видимости слайдов
  updateSlidesVisibility();

  // Устанавливаем текст кнопки в зависимости от состояния слайдов
  const allHidden = slides.slice(slidesToShow).every(slide => slide.classList.contains('hidden'));
  btnHandler.textContent = allHidden ? 'Показать всё' : 'Скрыть всё';

  btnHandler.addEventListener("click", function () {
    slides.forEach((slide, index) => {
      if (index >= slidesToShow) { // Регулируем, кому добавлять hidden
        slide.classList.toggle('hidden');
      }
    });

    // Проверяем, есть ли видимые слайды
    const allHidden = slides.slice(slidesToShow).every(slide => slide.classList.contains('hidden'));
    btnHandler.textContent = allHidden ? "Показать всё" : "Скрыть всё";
    list.style.marginBottom = allHidden ? '24px' : '45px';
    console.log(slides.slice(slidesToShow).map(slide => slide.classList.contains('hidden')));
  });

  // Добавляем обработчик события resize
  window.addEventListener('resize', updateSlidesVisibility);
};

// теперь создаём прослушиватель события через функцию.
inputFunction(btnHandler1, items1,list1,[6,8]);
inputFunction(btnHandler2, items2,list2,[3,4]);

// Делаем интерактивность для левого и 2 правых менюшек
// Создаём ДОМ переменные, находим элементы в хтмл документе
const containerDOM = document.querySelector(".main__container");
const headerDOM = document.querySelector(".header");
const asideDOM1 = document.querySelectorAll(".aside")[0];
const aside = asideDOM1; // Когда ширина экрана более 1440px, то нужно чтобы при открытии правых меню, был заблюрено левое меню
const asideDOM2 = document.querySelectorAll(".aside")[1];
const asideDOM3 = document.querySelectorAll(".aside")[2];
// const asideDOM3 = document.querySelectorall('.aside')[2];

// ищем бургер
const btnBurgerHandler = document.querySelector(".btn__burger");
// Ищем крестик
const btnCrossHandler1 = document.querySelectorAll(".btn--cancellation")[0];
const btnCrossHandler2 = document.querySelectorAll(".btn--cancellation")[1];
const btnCrossHandler3 = document.querySelectorAll(".btn--cancellation")[2];
// Ищем сообщения
const btnFeedbackHandler1 = document.querySelectorAll(".btn--message")[0];
const btnFeedbackHandler2 = document.querySelectorAll(".btn--message")[1];
// Ищем звоночки
const btnCallHandler1 = document.querySelectorAll(".btn--call")[0];
const btnCallHandler2 = document.querySelectorAll(".btn--call")[1];
// Ищем body
const body = document.body;
// Ищем читать далее
const btnRead = document.querySelector('.btn__text');
const textInner = document.querySelector('.text__inner');


btnRead.addEventListener('click', function () {
 textInner.classList.toggle('height-reset');
  const heightIs = textInner.classList.contains('height-reset');

  btnRead.textContent = heightIs ? "Скрыть" : "Читать далее";
})



// Функция. 1 параметр - кнопка, раскрывающая меню. 2 параметр - какое меню раскрыть. 3 параметр - кнопка закрывающая. 4,5 параметры - если нажать на другое меню, пока раскрыто 1, не должно закрываться 1 меню.
const inputFunction2 = function (
  btnBurgerHandler,
  asideDOM1,
  btnCrossHandler1,
  asideDOM2,
  asideDOM3,
) {
  btnBurgerHandler.addEventListener("click", function () {
    asideDOM1.style.display = "flex";
    headerDOM.classList.add("blur");
    containerDOM.classList.add("blur");
    console.log(window.getComputedStyle(asideDOM1).display === "flex");
    if (window.innerWidth > 1440) {
      aside.classList.add("blur");
      body.classList.add("no-scroll")
    }
  });
  btnCrossHandler1.addEventListener("click", function () {
    asideDOM1.style.display = "none";
    headerDOM.classList.remove("blur");
    containerDOM.classList.remove("blur");
    console.log(window.getComputedStyle(asideDOM1).display === "flex");
    if (window.innerWidth > 1440) {
      aside.classList.remove("blur");
      body.classList.remove("no-scroll")
    }
  });

  window.addEventListener(
    "click",
    function (e) {
      if (
        asideDOM1.contains(e.target) === false &&
        window.getComputedStyle(asideDOM1).display === "flex" &&
        asideDOM2.contains(e.target) === false &&
        asideDOM3.contains(e.target) === false
      ) {
        console.log("popitka");
        asideDOM1.style.display = "none";
        headerDOM.classList.remove("blur");
        containerDOM.classList.remove("blur");
        if (window.innerWidth > 1440) {
          aside.classList.remove("blur");
          body.classList.remove("no-scroll")
        }
      }
    },
    { capture: true },
  );
};

// Активируем взаимодействия со всеми 3 менюшками.
inputFunction2(
  btnBurgerHandler,
  asideDOM1,
  btnCrossHandler1,
  asideDOM2,
  asideDOM3,
);
inputFunction2(
  btnFeedbackHandler1,
  asideDOM2,
  btnCrossHandler2,
  asideDOM1,
  asideDOM3,
);
inputFunction2(
  btnFeedbackHandler2,
  asideDOM2,
  btnCrossHandler2,
  asideDOM1,
  asideDOM3,
);
inputFunction2(
  btnCallHandler1,
  asideDOM3,
  btnCrossHandler3,
  asideDOM1,
  asideDOM2,
);
inputFunction2(
  btnCallHandler2,
  asideDOM3,
  btnCrossHandler3,
  asideDOM1,
  asideDOM2,
);

// Что делать, чтобы слайды при резайзе прорисовывались?
let swiper1 = null;
if (window.innerWidth < 768) {
  swiper1 = getSwiper(".swiper1");
}
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    if (swiper1) return;
    swiper1 = getSwiper(".swiper1");
  } else {
    if (!swiper1) return;
    swiper1.destroy();
    swiper1 = null;
  }
});

// swiper 2
let swiper2 = null;
if (window.innerWidth < 768) {
  swiper2 = getSwiper(".swiper2");
}
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    if (swiper2) return;
    swiper2 = getSwiper(".swiper2");
  } else {
    if (!swiper2) return;
    swiper2.destroy();
    swiper2 = null;
  }
});

// swiper 3

let swiper3 = null;
if (window.innerWidth < 768) {
  swiper3 = getSwiper2(".swiper3");
}
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    if (swiper3) return;
    swiper3 = getSwiper2(".swiper3");
  } else {
    if (!swiper3) return;
    swiper3.destroy();
    swiper3 = null;
  }
});
