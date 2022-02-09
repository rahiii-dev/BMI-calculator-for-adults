const ageS = document.getElementById("standard_age");
const weightS = document.getElementById("standard_Weight");
const heightS = document.getElementById("standard_height");

const weightUnit = document.getElementById("weight_unit");
const heighttUnit = document.getElementById("height_unit");

// buttons
const stabdardBtn = document.querySelector(".btn_standard");
const metricdBtn = document.querySelector(".btn_metric");

const calculateBtn = document.querySelector(".calculate_btn");
const resetBTN = document.querySelector(".rest-btn");

const resultEl = document.querySelector(".result");

// default
calculateBtn.addEventListener("click", calculateStandard);
// metric
metricdBtn.addEventListener("click", () => {
  clear();
  weightUnit.textContent = "kg";
  heighttUnit.textContent = "c.m";
  calculateBtn.removeEventListener("click", calculateStandard);
  calculateBtn.addEventListener("click", calculateMetric);
});

// standard
stabdardBtn.addEventListener("click", () => {
  clear();
  weightUnit.textContent = "lbs";
  heighttUnit.textContent = "inches";
  calculateBtn.removeEventListener("click", calculateMetric);
  calculateBtn.addEventListener("click", calculateStandard);
});

const messages = [
  {
    message: "You are Underweight",
    colour: "#ffa500",
  },
  {
    message: "You are Healthy",
    colour: "#00ff00",
  },
  {
    message: "You are Overweight",
    colour: "#c5e94f",
  },
  {
    message: "You have Obesity",
    colour: "#f75a12",
  },
];
// calculateStandard
function calculateStandard() {
  let age = parseFloat(ageS.value);
  let weight = parseFloat(weightS.value);
  let height = parseFloat(heightS.value);

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    return;
  } else {
    if (age >= 20) {
      let BMI = (weight / Math.pow(height, 2)) * 703;
      let result = BMI.toFixed(2);

      let decider = findMessage(result);
      let message = messages[decider].message;
      let colour = messages[decider].colour;
      updateResult(result, message, colour);
    }
  }
}

// calculateMetric
function calculateMetric() {
  let age = parseFloat(ageS.value);
  let weight = parseFloat(weightS.value);
  let height = parseFloat(heightS.value);

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    return;
  } else {
    if (age >= 20) {
      height = height / 100;
      let BMI = weight / Math.pow(height, 2);
      let result = BMI.toFixed(2);

      let decider = findMessage(result);
      let message = messages[decider].message;
      let colour = messages[decider].colour;
      updateResult(result, message, colour);
    }
  }
}
function findMessage(result) {
  if (result < 18.5) {
    return 0;
  } else if (result >= 18.5 && result <= 24.9) {
    return 1;
  } else if (result >= 25 && result <= 29.9) {
    return 2;
  } else if (result > 30) {
    return 3;
  }
}

function updateResult(result, mesaage, colour) {
  resultEl.innerHTML = `Your BMI is : ${result} <br>
    <span style = "color : ${colour}">${mesaage}</span>`;
}

resetBTN.addEventListener("click", clear);

function clear() {
  resultEl.innerHTML = `Your BMI is : <br> <br>`;
  ageS.value = "";
  weightS.value = "";
  heightS.value = "";
}
