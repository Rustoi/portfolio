const searchInput = document.querySelector(".header__search-input");
const searchBtn = document.querySelector(".header__search-btn");
const layoutsContent = document.querySelector(".layouts__content");

const templateData = [
  {
    id: 1,
    title: "Landing Vr.1",
    img: "./img/layouyts-item1.png",
  },
  {
    id: 2,
    title: "Landing Vr.2",
    img: "./img/layouyts-item2.png",
  },
  {
    id: 3,
    title: "Landing Vr.3",
    img: "./img/layouyts-item3.png",
  },
  {
    id: 4,
    title: "Portfolio 1",
    img: "./img/layouyts-item4.png",
  },
  {
    id: 5,
    title: "Portfolio 1",
    img: "./img/layouyts-item5.png",
  },
  {
    id: 6,
    title: "Portfolio 1",
    img: "./img/layouyts-item6.png",
  },
  {
    id: 7,
    title: "Portfolio 1",
    img: "./img/layouyts-item7.png",
  },
  {
    id: 8,
    title: "Single Project",
    img: "./img/layouyts-item8.png",
  },
  {
    id: 9,
    title: "About Company",
    img: "./img/layouyts-item9.png",
  },
  {
    id: 10,
    title: "About Company",
    img: "./img/layouyts-item10.png",
  },
  {
    id: 11,
    title: "Single Team Member",
    img: "./img/layouyts-item11.png",
  },
  {
    id: 12,
    title: "Faq page",
    img: "./img/layouyts-item12.png",
  },
  {
    id: 13,
    title: "Contact Us",
    img: "./img/layouyts-item13.png",
  },
  {
    id: 14,
    title: "Blog 1",
    img: "./img/layouyts-item14.png",
  },
];

searchInput.addEventListener("input", () => {
  const searchVal = searchInput.value;

  const searchedCards = templateData.filter((template, indx) =>
    template.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  createCards(searchedCards, layoutsContent);
});

const createCards = (data, div) => {
  div.innerHTML = data
    .map(
      (template) =>
        `
    <div class="layouts__content-item">
      <div class="card__img">
        <img src="${template.img}" alt="${template.title}" />
      </div>
      <div class="card__content">
        <h2 class="layouts__content-title">${template.title}</h2>
      </div>
    </div>
      `
    )
    .join("");
};
