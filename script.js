
const todo = document.querySelector("#Todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done");

let dragElement = null;

// console.log(todo, progress, done);


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
  const taskTitle = document.querySelector("#inout_title").value
  const taskDesc = document.querySelector("#input_desc").value

  const div = document.createElement("div");

  div.classList.add("task");

  div.setAttribute("draggable" , "true")

  div.innerHTML = `
  <h2>${taskTitle}</h2>
  <p>${taskDesc}</p>
  <button>Delete</button>`

  todo.appendChild(div)

  div.addEventListener("drag", (e)=>{
    dragElement = div;
  })

  modal.classList.remove("active");
})