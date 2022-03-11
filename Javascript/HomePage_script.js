const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const btnShowModel = document.querySelector(".btn--show-modal");
const btnCloseModel = document.querySelector(".btn--close-modal");
const InputName = document.querySelector(".model__form-Name");
const InputEmail = document.querySelector(".model__form-Email");
const InputPassword = document.querySelector(".model__form-Password");
const btnSubmit = document.querySelector(".btn-submit");

let curSlide = 0;
const maxSlide = slides.length;

// Model
btnShowModel.addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
};
btnCloseModel.addEventListener("click", close);

// Form

InputEmail.onkeydown = function () {
  const regex = /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;

  if (regex.test(InputEmail.value) && InputEmail.value.length != 0) {
    InputEmail.style.color = "green";
  } else {
    InputEmail.style.color = "orangered";
    InputEmail.style.border.color = "red";
  }
};

btnSubmit.addEventListener("click", function () {
  if (InputEmail.style.color == "green" && InputEmail.value.length != 0) {
    close();
  } else {
  }
});

// );

// Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
  console.log(slide);
  console.log(document.querySelector(`.dots__dot[data-slide="${slide}"]`));
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();

// Event handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
