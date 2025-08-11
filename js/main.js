const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
  slides: [
    "/w3_band/assets/img/band1.png",
    "/w3_band/assets/img/band2.png",
    "/w3_band/assets/img/band3.png",
  ],
  slideIndex: 0,

  slider() {
    const slider = $("#slider");
    const contents = $$(".text-content");

    setInterval(() => {
      this.slideIndex++;
      if (this.slideIndex >= this.slides.length) {
        this.slideIndex = 0;
      }
      slider.style.background = `url(${
        this.slides[this.slideIndex]
      }) top center / cover no-repeat`;
      $(".text-content.display").classList.remove("display");
      contents[this.slideIndex].classList.add("display");
    }, 5000);
  },

  handleModal() {
    const buyBtns = $$(".buy-btn");
    const closeBtns = $$(".closeBtn");
    const modal = $(".modal");
    const modalContainer = $(".modal-container");
    buyBtns.forEach((button) => {
      button.onclick = function () {
        modal.classList.add("open");
        modalContainer.style.animation = `slideDown 0.4s ease`;
      };
    });

    closeBtns.forEach((button) => {
      button.onclick = function () {
        modal.classList.remove("open");
      };
    });

    modal.onclick = function (e) {
      // e.stopPropagation()
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
      }
    };
  },

  handleBtn() {
    const barBtn = $(".bar_btn");
    const navBtns = $$('#nav a[href*="#"]');
    const header = $("#header");
    const subnav = $(".subnav");

    barBtn.onclick = function (event) {
      if (event.target.closest(".bar_btn")) {
        if (header.style.height !== "auto") {
          header.style.height = "auto";
        } else {
          header.style.height = "46.5px";
          subnav.style.position = "absolute";
        }
      }
    };

    navBtns.forEach((button) => {
      if (
        button.nextElementSibling &&
        button.nextElementSibling.classList.contains("subnav")
      ) {
        button.onclick = function (event) {
          event.preventDefault();
          if (subnav.style.position !== "initial" && window.innerWidth <= 760) {
            subnav.style.position = "initial";
          } else {
            subnav.style.position = "absolute";
          }
        };
      } else {
        button.onclick = function (event) {
          barBtn.click();
        };
      }
    });
  },

  start() {
    this.slider();
    this.handleModal();
    this.handleBtn();
  },
};

app.start();
