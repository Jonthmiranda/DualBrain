//IMPORTS
import { SelectChecklist } from './db.js';
import { InsertChecklist } from './db.js';
import { UpdateChecklistCompleted } from './db.js';
import { UpdateChecklist } from './db.js';
import { DeleteChecklist } from './db.js';

//VARIABLES DIV CHECKLIST LIST
var ChecklistList  = document.querySelector(".ChecklistList");
var cadChecklist = document.getElementById("cadChecklist");

//VARIABLES ADD CHECKLIST MODAL
var AddChecklistModal = document.querySelector(".AddChecklistModal");
var Tasks = document.getElementById("Tasks");
var AddChecklistButton = document.getElementById("AddChecklistButton");
var CancelButton = document.getElementById("CancelButton");

//VARIABLES IS EMPTY MODAL
var IsEmptyModal = document.querySelector(".IsEmptyModal");
var FillFieldButton = document.getElementById("FillFieldButton");

//VARIABLES CONFIRM DELETE MODAL
var ConfirmDeleteModal = document.querySelector(".ConfirmDeleteModal");
var ConfirmDelete = document.getElementById("ConfirmDelete");
var CancelButton = document.getElementById("CancelButton");


export function ChecklistScreen(id) {
    container.innerHTML = "";
    document.querySelector("section").innerHTML = `
<ul class="ChecklistList">
                <li><input type="checkbox" id="item1"><label for="item1">Criar layout</label></li>
            </ul>
            <button id="cadChecklist"><img src="./assets/cad.png" alt="cadChecklist" class="buttonLogo"><span>Add Checklist</span></button>

            <div class="AddChecklistModal">
                <h4>Add Checklist</h4>
                <textarea type="text" id="Tasks" name="Tasks" placeholder="Type the task"></textarea>
    
                <button id="AddChecklistButton">Add Checklist</button>
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
                </div>`;
}
