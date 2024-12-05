// Header.darken
const header = document.querySelector(".header");
const getResumeDownloads = document.querySelector(".header__btn"); // CV downloads button

// Функция, которая затемняет header при скролле
function darkenHeader() {
  // Получаем текущую позицию скролла
  const scrollPosition = window.scrollY;

  // Если страница прокручена вниз на 100px или больше, затемняем header
  if (scrollPosition >= 80) {
    header.classList.add("darken");
  } else {
    header.classList.remove("darken");
  }
}
// Добавляем обработчик события на скролл страницы
window.addEventListener("scroll", darkenHeader);

// Swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 3,
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Scroll to anchor padding

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1); // Получаем ID элемента
    const targetElement = document.getElementById(targetId);
    const headerHeight = document.querySelector("header").offsetHeight; // Высота шапки

    // Прокрутка до элемента с учетом высоты шапки
    window.scrollTo({
      top: targetElement.offsetTop - headerHeight,
      behavior: "smooth",
    });
  });
});

// -------------------------Burger menu----------------
const burgerBtn = document.querySelector(".burger-menu");
const headerNav = document.querySelector(".header__nav");
const buttonTop = document.querySelector(".footer__btn");
const footer = document.querySelector(".footer");

// Переключение мобильного меню
burgerBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  burgerBtn.classList.toggle("burger-menu_state_active");
  headerNav.classList.toggle("burger__open");

  // Блокируем/разблокируем скролл при открытии/закрытии меню
  if (headerNav.classList.contains("burger__open")) {
    document.body.style.overflow = "hidden";
    buttonTop.classList.remove("show");
  } else {
    document.body.style.overflow = "";
  }
});

// Показ кнопки "вверх" при достижении footer
window.addEventListener("scroll", () => {
  const footerTop = footer.offsetTop;
  const windowScrollTop = window.scrollY;
  const windowHeight = window.innerHeight;

  if (
    windowScrollTop + windowHeight >= footerTop &&
    !headerNav.classList.contains("burger__open")
  ) {
    buttonTop.classList.add("show");
  } else {
    buttonTop.classList.remove("show");
  }
});

// Плавный скролл вверх при нажатии на кнопку
buttonTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Предотвращаем закрытие при клике на само меню
headerNav.addEventListener("click", (event) => {
  event.stopPropagation();
  if (headerNav.classList.contains("burger__open")) {
    buttonTop.classList.remove("show");
  }
});

// Закрытие меню при клике вне его области
document.addEventListener("click", (event) => {
  if (
    headerNav.classList.contains("burger__open") &&
    !headerNav.contains(event.target) &&
    !burgerBtn.contains(event.target)
  ) {
    headerNav.classList.remove("burger__open");
    burgerBtn.classList.remove("burger-menu_state_active");
    document.body.style.overflow = ""; // Разблокируем скролл при закрытии
  }
});
// -----------------Обработка формы отправки----------------

  const form = document.getElementById("contact__form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Останавливаем стандартную отправку формы
    const formData = new FormData(form);

    try {
      const response = await fetch("mail.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Сообщение успешно отправлено!");
        form.reset(); // Очищаем поля формы после успешной отправки
      } else {
        alert("Ошибка при отправке сообщения: " + response.status);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка сети.");
    }
  });