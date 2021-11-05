const combination = [1, 8, 50];
const pageHeight = window.innerHeight;
let pos = 0;
let pSafePost = 0;
let cracked = false;
let win = false;
let timer;

const root = document.documentElement;
const body = document.getElementsByTagName("body")[0];
const position = document.getElementsByClassName("position")[0];
const chalkboard = document.getElementsByClassName("chalkboard")[0];
const boxFlash = document.getElementsByClassName("box-flash")[0];

window.addEventListener("scroll", (e) => {
  root.style.setProperty("--scroll", window.scrollY);
  const safePos = Math.floor((window.scrollY / (10000 - pageHeight)) * 100);

  position.innerText = safePos;

  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    if (safePos === pSafePost) return;
    boxFlash.classList.remove("click", "near", "off");
    if (safePos && combination[pos] === safePos) {
      void boxFlash.offsetWidth;
      boxFlash.classList.add("click");
      chalkboard.innerText = chalkboard.innerText + safePos + "\n";
      if (++pos === 3) cracked = true;
    } else if (safePos && Math.abs(combination[pos] - safePos) < 3) {
      void boxFlash.offsetWidth;
      boxFlash.classList.add("near");
    } else {
      void boxFlash.offsetWidth;
      boxFlash.classList.add("off");
    }
    pSafePost = safePos;
  }, 100);

  if (window.scrollY === 0 && !cracked) {
    body.classList.remove("handle");
    body.classList.add("dial");
    chalkboard.innerText = "";
    cracked = false;
    win = false;
    pos = 0;
  }

  if (cracked === true && !win) {
    body.classList.remove("dial");
    body.classList.add("handle");
    document.documentElement.scrollTop = 0;
    win = true;
  }
});