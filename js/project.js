  //IMPORTS
import { SelectProjects } from './db.js';
import { InsertProject } from './db.js';
import { UpdateProject } from './db.js';
import { DeleteProject } from './db.js';

export async function ProjectScreen(nav) {

  document.querySelector("section").innerHTML = `
<div class="ProjectList">
  <button>
    <span class="title">Tarefa 1</span>
    <span class="description">Hoje às 14h</span>
  </button>
  <button>
    <span class="title">Tarefa 2</span>
    <span class="description">Amanhã cedo</span>
  </button>
  <button>
    <span class="title">Tarefa 3</span>
    <span class="description">Em andamento</span>
  </button>
</div>
<button id="cadProject"><img src="./assets/cad.png" alt="cadProject" class="buttonLogo"><span>Add Project</span></button>

<div class="AddProjectModal">
  <h4>Add Project</h4>
  <textarea type="text" id="Name" name="Name" placeholder="Name"></textarea>
  <textarea type="text" id="Description" name="Description" placeholder="Description"></textarea>
  <textarea type="text" id="Stacks" name="Stacks" placeholder="Technology"></textarea>
  <button id="AddProjectButton">Add Project</button>
  <button id="CancelButton">Cancel</button>
</div>
    
<div class="IsEmptyModal">
  <p>Field is empty</p>
  <button id="FillFieldButton">Ok</button>
</div>

<div class="ConfirmDeleteModal">
  <p>Are you sure you want to delete?</p>
  <button id="ConfirmDelete">Yes</button>
  <button id="CancelButton">Cancel</button>
</div>
        `;
    
  nav.style.display = "none";

//VARIABLES DIV PROJECT LIST
var ProjectList  = document.querySelector(".ProjectList");
var title = document.querySelector(".title");
var description = document.querySelector(".description");
var cadProject = document.getElementById("cadProject");

//VARIABLES ADD PROJECT MODAL
var AddProjectModal = document.querySelector(".AddProjectModal");
var Name = document.getElementById("Name");
var Description = document.getElementById("Description");
var Stacks = document.getElementById("Stacks");
var AddProjectButton = document.getElementById("AddProjectButton");
var CancelButton = document.getElementById("CancelButton");

//VARIABLES IS EMPTY MODAL
var IsEmptyModal = document.querySelector(".IsEmptyModal");
var FillFieldButton = document.getElementById("FillFieldButton");

//VARIABLES CONFIRM DELETE MODAL
var ConfirmDeleteModal = document.querySelector(".ConfirmDeleteModal");
var ConfirmDelete = document.getElementById("ConfirmDelete");
var CancelButton = document.getElementById("CancelButton");

cadProject.addEventListener("click", function(){
  AddProjectModal.style.display = "flex";
})

AddProjectButton.addEventListener("click", function(){
  InsertProjectTratament();
})

FillFieldButton.addEventListener("click", function(){
  IsEmptyModal.style.display = "none";
})

function InsertProjectTratament(){
  let DateStart = new Date();
  let year = DateStart.getFullYear();
  let month = String(DateStart.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses começam em 0
  let day = String(DateStart.getDate()).padStart(2, '0');
  DateStart = `${day}/${month}/${year}`;
  let DateEnd = "undefined";

  let IsEmptyVerify = IsEmpty(Name.value, Description.value, Stacks.value);

  if(IsEmptyVerify === true){
    return;
  }

  InsertProject(Name, Description, Stacks, DateStart, DateEnd);

  Clear();
  AddProjectModal.style.display = "none";

CancelButton.addEventListener("click", function(){
  Clear();
  AddProjectModal.style.display = "none";
})
}


function IsEmpty(Name, Description, Stacks){
  if (Name === "" || Description === "" || Stacks === "") {
    IsEmptyModal.style.display = "flex";
    return true; 
  }
  return false;
}

function Clear(){
  document.getElementById("Name").value = "";
  document.getElementById("Description").value = "";
  document.getElementById("Stacks").value = "";
}

}
