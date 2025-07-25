// импортируем стили
import './assets/scss/style.scss'

// создаём объект, в который будем хранить свойства - ключ.
const dataProperty = {
  "Ремонтные услуги":1,
  "Цена": 2,
  "Срок": 3
}

// создаём переменные, которые будут ключами в объекте
const data1 = ["Диагностика","Замена Дисплея","Замена полифонического динамика","Тестирование с выдачей технического заключения","Замена программного обеспечения"];
const data2 = ["Бесплатно","1000 р","1000 р","1000 р","1000 р"];
const data3 = ["30 мин","30-120 мин","30-120 мин","30-120 мин","30-120 мин"];

// переменная, которая будет хранить объекты
const list123 = []

// прогоняем через функцию. Чтобы объект перестал быть ссылочным,
// то мы ему зададим функцию структуредклон.
for (let i = 0; i < 5; i++) {
  const try1 = structuredClone(dataProperty);
  try1["Ремонтные услуги"] = data1[i]
  try1['Цена'] = data2[i]
  try1['Срок'] = data3[i]

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
    }
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
    }
  });

// Ищет в дом дереве обёртку свайпера, куда нужно будет вставлять слайды
const lists = document.querySelectorAll(".swiper-wrapper");
const list1 = lists[0];
const list2 = lists[1];
const list3 = lists[2];
const items1 = list1.children;
const items2 = list2.children
const items3 = list3.children


// теперь ищем образец, по которому будем делать слайды
const swiperTemplate = document.querySelector("#slide-template").content
const newSlideTemplates = swiperTemplate.querySelectorAll(".swiper-slide");
const newSlideTemplates1 = newSlideTemplates[0];
const newSlideTemplates2 = newSlideTemplates[1];
const newSlideTemplates3 = newSlideTemplates[2];

// создаём функцию для добавления слайдов
const addSlide = function (template,list,logotype,index,array) {
  const slide = template.cloneNode(true);
  if (logotype) {
      const logo = slide.querySelector(".swiper__logoplace");
      logo.style.backgroundImage = `url('${logotype}')`;
  }

   if (index && !array) {
    const text = slide.querySelector(".swiper__text")
    text.textContent = `Ремонт ${index}`
    console.log('slava Iisusu!');
  }

  if (array) {
    const topics = slide.querySelectorAll("span");
    topics[0].textContent = array[index]["Ремонтные услуги"]
    topics[1].textContent = array[index]['Цена']
    topics[2].textContent = array[index]['Срок']
  }
  list.appendChild(slide);
};

// запускаем прорисовку слайдов
const render = function () {
  for (let i = 1; i <= 8; i++) {
    addSlide(newSlideTemplates1,list1,`/test/public/images/logo-${i}.png`);
  }

  for (let i = 1; i <= 3; i++) {
    addSlide(newSlideTemplates1,list1,`/test/public/images/logo-${i}.png`);
  }

    for ( let i = 1; i <= 8; i++) {
    addSlide(newSlideTemplates2,list2, '', i);
  }

      for ( let i = 0; i < 5; i++) {
    addSlide(newSlideTemplates3,list3, '', i, list123);
  }
};

render();



// в начале ищем кнопки Показать всё
const btnHandlers = document.querySelectorAll(".swiper__handler");
const btnHandler1 = btnHandlers[0];
const btnHandler2 = btnHandlers[1];
const btnHandler3 = btnHandlers[2];


// создаём функцию, которая будет создавать прослушиватель события
const inputFunction = function (btnHandler,items,list) {
  btnHandler.addEventListener("click", function () {
    const text = btnHandler.textContent;
    console.log(text);
    if (text === "Показать все") {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add("swiper__show");
      }
      btnHandler.textContent = "Скрыть";
      list.style.marginBottom = "45px";
      console.log(text);
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("swiper__show");
      }
      btnHandler.textContent = "Показать все";
      list.style.marginBottom = "24px";
    }
  } );
}

// Создаём ДОМ переменные, находим элементы в хтмл документе
const containerDOM = document.querySelector('.main__container');
const headerDOM = document.querySelector('.header');
const asideDOM1 = document.querySelectorAll('.aside')[0];
console.log(asideDOM1);
const asideDOM2 = document.querySelectorAll('.aside')[1];
// const asideDOM3 = document.querySelectorall('.aside')[2];

// ищем бургер
const btnBurgerHandler = document.querySelector(".btn__burger")
// Ищем крестик
const btnCrossHandler1 = document.querySelectorAll(".aside__btn--cancellation")[0];
const btnCrossHandlers = document.querySelectorAll(".aside__btn--cancellation")[1];
console.log(btnCrossHandlers);
// Ищем звоночек
const btnFeedbackHandlers = document.querySelectorAll('.aside__btn--feedback');
console.log(btnFeedbackHandlers);

btnBurgerHandler.addEventListener('click', function() {
  asideDOM1.style.display = "flex";
  headerDOM.classList.add('blur');
  containerDOM.classList.add('blur');
  console.log(window.getComputedStyle(asideDOM1).display === "flex");
})

btnCrossHandler1.addEventListener('click', function() {
  asideDOM1.style.display = "none";
  headerDOM.classList.remove('blur');
  containerDOM.classList.remove('blur');
  console.log(window.getComputedStyle(asideDOM1).display === "flex");
})

window.addEventListener('click', function (e) {

if (asideDOM1.contains(e.target) === false && window.getComputedStyle(asideDOM1).display === "flex" && asideDOM2.contains(e.target) === false) {
  console.log('popitka');
  asideDOM1.style.display = "none";
  headerDOM.classList.remove('blur');
  containerDOM.classList.remove('blur');
  }
}, {capture:true})







// теперь создаём прослушиватель события через функцию.
inputFunction(btnHandler1,items1,list1)
inputFunction(btnHandler2,items2,list2)
inputFunction(btnHandler3,items3,list3)





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
    console.log(swiper1.destroy, 333);
    console.log(swiper1,444);
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