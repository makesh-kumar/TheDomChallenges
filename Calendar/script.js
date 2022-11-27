const days = document.querySelector(".days");
const weeks = document.querySelector(".weeks");
const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");

const daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let selectedMonth = new Date().getMonth() + 1;
let selectedYear = new Date().getFullYear();
function generateLayout() {
  for (let i = 0; i < daysName.length; i++) {
    let box = document.createElement("div");
    box.innerText = daysName[i];
    box.classList.add("day");
    days.appendChild(box);
  }
}
generateLayout();

function generateCalendar(selectedMonth, selectedYear) {
  console.log("generate - ", selectedMonth, selectedYear);
  weeks.innerHTML = "";
  // detail.innerText = `${monthsName[selectedMonth - 1]}, ${selectedYear}`;
  let noOfDays = new Date(selectedYear, selectedMonth, 0).getDate();
  let firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  let filledDays = -(firstDay - 1);
  while (filledDays < noOfDays) {
    generateRow();
  }
  function generateRow() {
    const week = document.createElement("div");
    week.style.display = "flex";
    for (let i = 0; i < daysName.length; i++) {
      let box = document.createElement("div");
      box.classList.add("week");
      week.appendChild(box);
      if (filledDays <= noOfDays) {
        if (filledDays > 0) {
          box.innerText = filledDays;
          const currentMonth = new Date().getMonth() + 1;
          const currentYear = new Date().getFullYear();

          if (currentMonth === selectedMonth && currentYear === selectedYear) {
            const currentData = new Date().getDate();
            if (filledDays === currentData) {
              box.classList.add("today");
            }
          }
        }
        filledDays++;
      }
    }
    weeks.appendChild(week);
  }
}
generateCalendar(selectedMonth, selectedYear);

prev.addEventListener("click", () => {
  selectedMonth--;
  if (selectedMonth === 0) {
    selectedYear--;
    selectedMonth = 12;
  }
  generateCalendar(selectedMonth, selectedYear);
  monthSelect.value = selectedMonth - 1;
  yearSelect.value = selectedYear;
});

next.addEventListener("click", () => {
  selectedMonth++;
  if (selectedMonth === 13) {
    selectedYear++;
    selectedMonth = 1;
  }
  generateCalendar(selectedMonth, selectedYear);
  monthSelect.value = selectedMonth - 1;
  yearSelect.value = selectedYear;
});

const monthSelect = document.querySelector("#month-select");

monthSelect.addEventListener("change", (e) => {
  console.log(e.target.value);
  selectedMonth = +e.target.value + 1;
  generateCalendar(selectedMonth, selectedYear);
});

function generateMonthDropdown() {
  const currentMonth = new Date().getMonth() + 1;
  for (let i = 0; i < monthsName.length; i++) {
    const month = monthsName[i];
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = month;
    if (i === currentMonth - 1) {
      console.log(monthsName[i]);
      option.setAttribute("selected", true);
    }
    monthSelect.appendChild(option);
  }
}
generateMonthDropdown();

const yearSelect = document.querySelector("#year-select");

yearSelect.addEventListener("change", (e) => {
  console.log(e.target.value);
  selectedYear = e.target.value;
  generateCalendar(selectedMonth, selectedYear);
});

function generateYearDropdown() {
  const currentYear = new Date().getFullYear();
  for (let i = 1990; i <= 2030; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = i;
    if (i === currentYear) {
      option.setAttribute("selected", true);
    }
    yearSelect.appendChild(option);
  }
}
generateYearDropdown();

const todayBtn = document.querySelector("#today");
todayBtn.addEventListener("click", () => {
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  monthSelect.value = selectedMonth - 1;
  yearSelect.value = selectedYear;

  generateCalendar(selectedMonth, selectedYear);
});
