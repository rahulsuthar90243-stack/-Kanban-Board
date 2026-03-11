let tasksData = {}

const todo = document.querySelector("#Todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let dragElement = null;

function updateTaskCount(){
 columns.forEach(cal =>{
      const tasks = cal.querySelectorAll(".task");
      const count = cal.querySelector(".right");

      tasksData[cal.id] = Array.from(tasks).map(t =>{
        return {
          title: t.querySelector("h2").innerText,
          desc: t.querySelector("p").innerText,
        }
      })

      localStorage.setItem("tasks", JSON.stringify(tasksData));
      count.innerText = tasks.length;
    })
}

function addDeleteEvent(div){
  const deleteButton = div.querySelector("button");

  deleteButton.addEventListener("click", ()=>{
    div.remove();
    updateTaskCount();
  })
}

if(localStorage.getItem("tasks")){
  const data = JSON.parse(localStorage.getItem("tasks"));

  console.log(data);

  for(const col in data){
    const column = document.querySelector(`#${col}`);
    data[ col ].forEach(task =>{
      const div = document.createElement("div");

      div.classList.add("task");
      div.setAttribute("draggable", "true")

      div.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.desc}</p>
      <button>Delete</button>`

      column.appendChild(div)

      addDeleteEvent(div)

      div.addEventListener("drag", (e)=>{
        dragElement = div;
      })
    })

  }

  updateTaskCount();
}

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag", (e)=>{
    dragElement = task;
    })
});


function addEventsOnColumn(column){
  column.addEventListener("dragenter", (e)=>{
    e.preventDefault();
    column.classList.add("hover-over");
  })
  
  column.addEventListener("dragleave", (e)=>{
    e.preventDefault();
    column.classList.remove("hover-over");
  })

  column.addEventListener("dragover", (e)=>{
    e.preventDefault();
  })

  column.addEventListener("drop", (e)=>{
    e.preventDefault();
    // console.log("Dropped", e);
    // console.log("Dropped", drapElement, column);

    column.appendChild(dragElement);
    column.classList.remove("hover-over");


    //   columns.forEach(cal =>{
    //   const tasks = cal.querySelectorAll(".task");
    //   const count = cal.querySelector(".right");

    //   count.innerText = tasks.length;
    // })

    updateTaskCount();

  })
}

addEventsOnColumn(todo);
addEventsOnColumn(progress);
addEventsOnColumn(done);

// progress.addEventListener("dragenter", (e)=>{
// //   console.log("dragenter", e);
//   progress.classList.add("hover-over");
// })

// progress.addEventListener("dragleave", (e)=>{
// //   console.log("dragenter", e);
//   progress.classList.remove("hover-over");
// })



// modal related 

const addModal = document.querySelector("#add-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");

const addTaskButton = document.querySelector("#add-task")

addModal.addEventListener("click", ()=>{
  modal.classList.toggle("active");
})


modalBg.addEventListener("click", ()=>{
  modal.classList.remove("active");
})


addTaskButton.addEventListener("click", ()=>{
  const taskTitle = document.querySelector("#input_title").value
  const taskDesc = document.querySelector("#input_desc").value

  const div = document.createElement("div");

  div.classList.add("task");

  div.setAttribute("draggable" , "true")

  div.innerHTML = `
  <h2>${taskTitle}</h2>
  <p>${taskDesc}</p>
  <button>Delete</button>`

  todo.appendChild(div)

  updateTaskCount();

  div.addEventListener("drag", (e)=>{
    dragElement = div;
  })

  addDeleteEvent(div);


  modal.classList.remove("active");
})