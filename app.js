const form = document.querySelector("form");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const goal = document.getElementById("goal");
const title = document.querySelector(".title");
const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");
const printBtn = document.querySelector(".print-btn");
const autoGrowInputs = document.querySelectorAll(".auto-grow-input");

let tl;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (goal.value) {
    nextBtn.disabled = true;
    goal.classList.add("glow");
    title.textContent = goal.value;
    animate();
  }
});

function animate() {
  tl = gsap
    .timeline({ defaults: { duration: 0.8 } })
    .to(".first", {
      x: -600,
      opacity: 0,
      display: "none",
      ease: "power1.in",
    })
    .to(
      ".next-btn",
      {
        rotate: 540,
        x: 600,
        opacity: 0,
        display: "none",
        ease: "back.in(1.7)",
      },
      0
    )
    .to(".second", {
      opacity: 1,
      x: 0,
      display: "block",
    })
    .to(".step", { opacity: 1, stagger: 0.4 })
    .to(".print-btn", { opacity: 1, display: "block" }, 0.8)
    .to(".back-btn", { opacity: 1, display: "block" }, 0.8);
}

backBtn.addEventListener("click", () => {
  tl.timeScale(3).reverse();
  goal.value = "";
  goal.classList.remove("glow");
  nextBtn.disabled = false;
  // wait for reverse animation then clear inputs
  setTimeout(() => {
    autoGrowInputs.forEach((input) => {
      input.textContent = "";
    });
  }, 1200);
});

printBtn.addEventListener("click", () => {
  window.print();
});
