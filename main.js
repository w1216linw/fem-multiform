class sidebar {
  constructor() {
    this.buttons = document.querySelectorAll(".idx-btn");
    this.currentBtn = document.querySelector(".idx-btn.idx-btn-active");
  }
  setCurrentBtn(idx) {
    this.currentBtn.classList.remove("idx-btn-active");
    this.buttons[idx].classList.add("idx-btn-active");
    this.currentBtn = this.buttons[idx];
  }
}
class form {
  constructor(sidebar) {
    this.pages = document.querySelectorAll(".form-section");
    this.currentPage = document.querySelector(".form-section.active");
    this.currentIdx = 0;
    this.nextBtn = document.querySelector(".next-btn");
    this.prevBtn = document.querySelector(".prev-btn");
    this.sidebar = sidebar;

    this.nextBtn.addEventListener("click", this.nextPage.bind(this));
    this.prevBtn.addEventListener("click", this.prevPage.bind(this));
  }
  nextPage() {
    if (this.currentIdx >= this.pages.length - 1) return;
    this.setCurrentPage(++this.currentIdx);
  }
  prevPage() {
    if (this.currentIdx < 1) return;
    this.setCurrentPage(--this.currentIdx);
  }
  setCurrentPage(idx) {
    if (idx < this.sidebar.buttons.length) {
      this.sidebar.setCurrentBtn(idx);
    }
    this.currentPage.classList.remove("active");
    this.pages[idx].classList.add("active");
    this.currentPage = this.pages[idx];
  }
}

const newSidebar = new sidebar();
const newForm = new form(newSidebar);
