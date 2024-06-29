let taskName = document.getElementById("name");
let show = document.querySelector(".show");
let submit = document.getElementById("add");
let tasks = document.querySelector(".tasks");
let mood = "create";
let second;
// checking localstorage
let allTasks;
if (localStorage.MyTasks != null) {
  allTasks = JSON.parse(localStorage.MyTasks);
} else {
  allTasks = [];
}
// create task
submit.addEventListener("click", function () {
  if (taskName.value != "") {
    if (mood === "create") {
      let newObj = {
        name: taskName.value,
        date:new Date(),
        isdone: false,
      };
      allTasks.push(newObj);
      localStorage.setItem("MyTasks", JSON.stringify(allTasks));
    } else {
      allTasks[second].name = taskName.value;
      localStorage.MyTasks = JSON.stringify(allTasks);
      mood = "create";
      submit.innerHTML = "إضافة";
    }
  }
  showTasks();
  cleardata();
});

// show Tasks
function showTasks() {
  show.innerHTML = "";
  for (let i = 0; i < allTasks.length; i++) {
    show.innerHTML += `
        <div class="tasks" id = "${allTasks[i].isdone ? "done" : ""}">
            <div class="task">
                <h3>${i + 1}- ${allTasks[i].name}</h3>
                <p>${allTasks[i].date}</p>
            </div>
            <div class="action">
                <button onclick="deleteTask(${i})"><i class="fa-solid fa-trash"></i></button>

                ${
                  allTasks[i].isdone
                    ? `
                  <button onclick="checkTask(${i})"><i class="fa-solid fa-xmark"></i></button>
                  `
                    : `
                  <button onclick="checkTask(${i})"><i class="fa-solid fa-check"></i></button>
                  `
                }

                <button onclick="updateTask(${i})"><i class="fa-solid fa-pen"></i></button>
            </div>
        </div>
        `;
  }
}
showTasks();

// Delete Tasks
function deleteTask(i) {
  alert("حذف المهمة!");
  allTasks.splice(i, 1);
  localStorage.MyTasks = JSON.stringify(allTasks);
  showTasks();
}

//Update Tasks
function updateTask(i) {
  taskName.value = allTasks[i].name;
  submit.innerHTML = "تعديل";
  mood = "update";
  second = i;
}
// clear data
function cleardata() {
  taskName.value = "";
}

// Checking Tasks
function checkTask(i) {
  if (allTasks[i].isdone == true) {
    allTasks[i].isdone = false;
  } else {
    allTasks[i].isdone = true;
  }
  localStorage.MyTasks = JSON.stringify(allTasks);
  showTasks();
}
