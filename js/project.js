//IMPORTS
import { SelectProjects } from './db.js';
import { InsertProject } from './db.js';
import { ChecklistScreen } from './checklist.js';

export async function ProjectScreen(nav) {

  document.querySelector("section").innerHTML = `
<div class="ProjectList" id="ProjectList">
</div>
<button id="cadProject"><img src="./assets/cad.png" alt="cadProject" class="buttonLogo"><span>Add Project</span></button>

<div class="AddProjectModal">
  <h4>Add Project</h4>
  <textarea type="text" id="Name" name="Name" placeholder="Name"></textarea>
  <textarea type="text" id="Description" name="Description" placeholder="Description"></textarea>
  <button id="AddProjectButton">Add Project</button>
  <button id="CancelButton">Cancel</button>
</div>
    
<div class="IsEmptyModal">
  <p>Field is empty</p>
  <button id="FillFieldButton">Ok</button>
</div>
        `;

  nav.style.display = "none";
  RenderProjects();

  //VARIABLES DIV PROJECT LIST
  var ProjectList = document.querySelector(".ProjectList");
  var id = document.querySelector(".id");
  var title = document.querySelector(".title");
  var description = document.querySelector(".description");
  var cadProject = document.getElementById("cadProject");

  //VARIABLES ADD PROJECT MODAL
  var AddProjectModal = document.querySelector(".AddProjectModal");
  var Name = document.getElementById("Name");
  var Description = document.getElementById("Description");
  var AddProjectButton = document.getElementById("AddProjectButton");
  var CancelButton = document.getElementById("CancelButton");

  //VARIABLES IS EMPTY MODAL
  var IsEmptyModal = document.querySelector(".IsEmptyModal");
  var FillFieldButton = document.getElementById("FillFieldButton");

  cadProject.addEventListener("click", function () {
    AddProjectModal.style.display = "flex";
  })

  AddProjectButton.addEventListener("click", function () {
    InsertProjectTratament();
  })

  FillFieldButton.addEventListener("click", function () {
    IsEmptyModal.style.display = "none";
  })

  button.addEventListener("click", function () {
   ChecklistScreen(id);
  }

  function InsertProjectTratament() {
    let IsEmptyVerify = IsEmpty(Name.value, Description.value);

    if (IsEmptyVerify === true) {
      return;
    }

    InsertProject(Name.value, Description.value);

    Clear();
    AddProjectModal.style.display = "none";
    location.reload();
  }

  CancelButton.addEventListener("click", function () {
    Clear();
    AddProjectModal.style.display = "none";
  })

  function IsEmpty(Name, Description) {
    if (Name === "" || Description === "") {
      IsEmptyModal.style.display = "flex";
      return true;
    }
    return false;
  }

  function Clear() {
    document.getElementById("Name").value = "";
    document.getElementById("Description").value = "";
  }

  async function RenderProjects() {
  const projects = await SelectProjects();
  const container = document.getElementById("ProjectList");
  container.innerHTML = "";

  projects.forEach(proj => {
    const button = document.createElement("button");
    button.className = "button";

    const spanId = document.createElement("span");
    spanId.className = "id";
    spanId.textContent = proj.Id;

    const spanTitle = document.createElement("span");
    spanTitle.className = "title";
    spanTitle.textContent = proj.Name;

    const spanDescription = document.createElement("span");
    spanDescription.className = "description";
    spanDescription.textContent = proj.Description;

    button.appendChild(spanId);
    button.appendChild(spanTitle);
    button.appendChild(spanDescription);

    container.appendChild(button);
    })
  }  
})
}
