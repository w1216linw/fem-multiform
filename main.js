const price = {
  monthly: {
    prefix: "mo",
    plan: {
      arcade: 9,
      advanced: 12,
      pro: 15,
    },
    addOns: {
      online: 1,
      storage: 2,
      custom: 2,
    },
  },
  yearly: {
    prefix: "yr",
    plan: {
      arcade: 90,
      advanced: 120,
      pro: 150,
    },
    addOns: {
      online: 10,
      storage: 20,
      custom: 20,
    },
  },
};
class Sidebar {
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
class Form {
  constructor() {
    this.pages = document.querySelectorAll(".form-section");
    this.currentPage = document.querySelector(".form-section.active");
    this.currentIdx = 0;
    this.sidebar = new Sidebar();
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
    this.currentIdx = idx;
  }
}

class Plan {
  constructor(price) {
    this.price = price;
    this.currentDuration = "mo";
    this.arcade = document.getElementById("plan-arcade-price");
    this.advanced = document.getElementById("plan-advanced-price");
    this.pro = document.getElementById("plan-pro-price");
    this.online = document.getElementById("add-online-price");
    this.storage = document.getElementById("add-storage-price");
    this.custom = document.getElementById("add-custom-price");
    this.chose = document.querySelector(".duration-chose");
  }

  switchDuration() {
    switch (this.currentDuration) {
      case "mo":
        this.setPlan(this.price.yearly);
        this.chose.classList.remove("monthly");
        this.chose.classList.add("yearly");
        break;
      case "yr":
        this.setPlan(this.price.monthly);
        this.chose.classList.remove("yearly");
        this.chose.classList.add("monthly");
        break;
      default:
        break;
    }
  }

  setPlan(duration) {
    this.currentDuration = duration.prefix;
    this.arcade.textContent = `$${duration.plan.arcade}/${duration.prefix}
    `;
    this.advanced.textContent = `$${duration.plan.advanced}/${duration.prefix}
    `;
    this.pro.textContent = `$${duration.plan.pro}/${duration.prefix}
    `;
    this.online.textContent = `$${duration.addOns.online}/${duration.prefix}
    `;
    this.storage.textContent = `$${duration.addOns.storage}/${duration.prefix}
    `;
    this.custom.textContent = `$${duration.addOns.custom}/${duration.prefix}
    `;
  }
}

class App {
  constructor(price) {
    this.form = new Form();
    this.plan = new Plan(price);
  }

  nextPage() {
    this.form.nextPage();
  }
  prevPage() {
    this.form.prevPage();
  }
  setCurrentPage(idx) {
    this.form.setCurrentPage(idx);
  }
  switchDuration() {
    this.plan.switchDuration();
  }
}

const app = new App(price);

/* Event Listener */
document.querySelector(".next-btn").addEventListener("click", () => {
  app.nextPage();
});

document.querySelector(".prev-btn").addEventListener("click", () => {
  app.prevPage();
});

document.querySelectorAll(".idx-btn").forEach((elem, idx) => {
  elem.addEventListener("click", () => {
    app.setCurrentPage(idx);
  });
});

document.querySelector(".duration-btn").addEventListener("click", () => {
  app.switchDuration();
});
