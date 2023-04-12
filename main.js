const priceData = {
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

const planData = ["arcade", "advanced", "pro"];
const addOnData = ["online service", "larger storage", "customizable profile"];
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
  constructor(price, plan, addons) {
    this.plan = plan;
    this.addons = addons;
    this.price = price;
    this.currentDuration = price.monthly;
    this.arcade = document.getElementById("plan-arcade-price");
    this.advanced = document.getElementById("plan-advanced-price");
    this.pro = document.getElementById("plan-pro-price");
    this.online = document.getElementById("add-online-price");
    this.storage = document.getElementById("add-storage-price");
    this.custom = document.getElementById("add-custom-price");
    this.chose = document.querySelector(".duration-chose");
  }

  switchDuration() {
    switch (this.currentDuration.prefix) {
      case "mo":
        this.currentDuration = this.price.yearly;
        this.updatePrice(this.price.yearly);
        this.chose.classList.remove("monthly");
        this.chose.classList.add("yearly");
        break;
      case "yr":
        this.currentDuration = this.price.monthly;
        this.updatePrice(this.price.monthly);
        this.chose.classList.remove("yearly");
        this.chose.classList.add("monthly");
        break;
      default:
        break;
    }
  }

  updatePrice(duration) {
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

  getPlanDetail(idx) {
    return {
      price: Object.values(this.currentDuration.plan)[idx],
      title: this.plan[idx],
      duration: this.currentDuration.prefix,
    };
  }

  getAddOnsDetail(idx) {
    const prices = Object.values(this.currentDuration.addOns);

    return idx.reduce(
      (acc, elem) => {
        acc.total += prices[elem];
        acc.items.push({ title: this.addons[elem], price: prices[elem] });
        return acc;
      },
      {
        items: [],
        duration: this.currentDuration.prefix,
      }
    );
  }

  getTotal(planIdx, addOnIdx) {
    const prices = Object.values(this.currentDuration.addOns);

    const addOns = addOnIdx.reduce((sum, elem) => {
      return (sum += prices[elem]);
    }, 0);

    const plan = Object.values(this.currentDuration.plan)[planIdx];

    return { total: addOns + plan, duration: this.currentDuration.prefix };
  }
}

class User {
  constructor() {
    this._plans = document.querySelectorAll(".plan-option");
    this._currentPlanIdx = -1;
    this._addOns = [];
  }

  setPlan(idx) {
    if (this._currentPlanIdx !== -1)
      this._plans[this.currentPlanIdx].classList.remove("plan-chose");
    this._plans[idx].classList.add("plan-chose");
    this._currentPlanIdx = idx;
  }

  setAddOn(idx) {
    if (this._addOns.indexOf(idx) === -1) this._addOns.push(idx);
    else {
      this._addOns = this._addOns.filter((elem) => elem != idx);
    }
  }

  get currentPlanIdx() {
    return this._currentPlanIdx;
  }

  get addOns() {
    return this._addOns.sort();
  }
}

class Summary {
  constructor() {
    this.planTitle = document.querySelector("#summary-plan");
    this.planPrice = document.querySelector("#summary-plan-price");
    this.addOns = document.querySelector(".chose-addOns");
    this.duration = document.querySelector("#summary-duration");
    this.total = document.querySelector("#summary-total");
  }

  setPlan({ title, price, duration }) {
    this.planTitle.textContent = `${title} (${
      duration === "mo" ? "Monthly" : "Yearly"
    })`;
    this.planPrice.textContent = `$${price}/${duration}`;
  }

  setAddOn({ items, duration }) {
    let temp = "";
    console.log(items);
    items.forEach((item) => {
      temp += createAddOnElem(item.title, item.price, duration);
    });
    this.addOns.innerHTML = temp;
  }

  setTotal({ total, duration }) {
    this.duration.textContent = duration === "mo" ? "month" : "year";
    this.total.textContent = `$${total}/${duration}`;
  }
}

function createAddOnElem(title, price, duration) {
  return `
  <div class="flex space-between">
    <p class="addOn-title text-cool-gray">${title}</p>
    <p class="text-marine-blue">+${price}/${duration}</p>
  </div>`;
}

class App {
  constructor(priceData, planData, addOnData) {
    this.form = new Form();
    this.plan = new Plan(priceData, planData, addOnData);
    this.user = new User();
    this.summary = new Summary();
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
  choosePlan(idx) {
    this.user.setPlan(idx);
    this.setSummaryPlan();
  }
  chooseAddOn(idx) {
    this.user.setAddOn(idx);
    this.setSummaryAddOn();
  }
  setSummaryPlan() {
    const plan = this.plan.getPlanDetail(this.user.currentPlanIdx);
    this.summary.setPlan(plan);
  }
  setSummaryAddOn() {
    const addOn = this.plan.getAddOnsDetail(this.user.addOns);
    this.summary.setAddOn(addOn);
    this.setSummaryTotal();
  }
  setSummaryTotal() {
    const total = this.plan.getTotal(
      this.user.currentPlanIdx,
      this.user.addOns
    );
    this.summary.setTotal(total);
  }
}

const app = new App(priceData, planData, addOnData);

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

document.querySelectorAll(".plan-option").forEach((elem, idx) => {
  elem.addEventListener("click", () => {
    app.choosePlan(idx);
  });
});

document.querySelectorAll(".addOns-option").forEach((elem, idx) => {
  elem.addEventListener("click", () => {
    elem.classList.toggle("addOn-checked");
    app.chooseAddOn(idx);
  });
});
