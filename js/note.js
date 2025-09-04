//IMPORTS
import { SelectNotes } from './db.js';
import { InsertNote } from './db.js';
import { UpdateNote } from './db.js';
import { DeleteNote } from './db.js';
import { ChecklistScreen } from '/db.js';
import { ScrumScreen } from '/db.js';
import { ProjectScreen } from '/db.js';
import { DeleteProject } from '/db.js';

export function NoteScreen(ProjectId) {
    document.querySelector("section").innerHTML = `
<div class="noteList">
    <button id="note">
        <h3>Título 1</h3>
    </button>
</div>
<button id="cadNote"><img src="./assets/cad.png" alt="cadNote" class="buttonLogo"><span>Add Note</span></button>

<div class="AddNotesModal">
    <h4>Add Notes</h4>
    <textarea type="text" id="Title" name="Title" placeholder="Title"></textarea>
    <textarea type="text" id="Text" name="Text" placeholder="Note"></textarea>
  
    <button id="AddNotesButton">Add Note</button>
    <button id="CancelButton">Cancel</button>
</div>
    
<div class="IsEmptyModal">
    <p>Field is empty</p>
    <button id="FillFieldButton">Ok</button>
</div>

<div class="NoteModal">
    <h4>Titulo da nota</h4>
    <p>Texto da nota</p>
    <button id="Close">Close</button>
    <button id="Delete">Delete</button>
    <button id="Edit">Edit</button>
</div>


<div class="ConfirmDeleteModal">
     <p>Are you sure you want to delete?</p>
     <button id="ConfirmDelete">Yes</button>
     <button id="CancelButton">Cancel</button>
</div>`;
    
RenderNotes(ProjectId);

    //VARIABLES NOTE LIST
var noteList  = document.querySelector(".noteList");
var note = document.getElementById("note");
var cadNote = document.getElementById("cadNote");

//VARIABLES ADD NOTES MODAL
var AddNotesModal = document.querySelector(".AddNotesModal");
var Title = document.getElementById("Title");
var Text = document.getElementById("Text");
var AddNotesButton = document.getElementById("Stacks");
var CancelButton = document.getElementById("CancelButton");

//VARIABLES IS EMPTY MODAL
var IsEmptyModal = document.querySelector(".IsEmptyModal");
var FillFieldButton = document.getElementById("FillFieldButton");

//VARIABLES NOTE MODAL
var NoteModal = document.querySelector(".NoteModal");
var Close = document.getElementById("Close");
var Delete = document.getElementById("Delete");
var Edit = document.getElementById("Edit");

//VARIABLES CONFIRM DELETE MODAL
var ConfirmDeleteModal = document.querySelector(".ConfirmDeleteModal");
var ConfirmDelete = document.getElementById("ConfirmDelete");
var CancelButton = document.getElementById("CancelButton");

//VARIAVEIS TAGS
var nav = document.querySelector("nav");

//VARIAVEIS NAV BUTTONS
var checklist = document.getElementById("checklist");
var notes = document.getElementById("notes");
var scrum = document.getElementById("scrum");
var menu = document.getElementById("menu");
var EndProject = document.getElementById("EndProject");
var DeleteProjectBt = document.getElementById("DeleteProjectBt");
var ChangeProject = document.getElementById("ChangeProject");
var Help = document.getElementById("Help");

//VARIAVEIS NAV DIVS
var MenuContent = document.querySelector(".MenuContent");

//MUDANÇAS DE TELAS EVENTS
    
checklist.addEventListener("click", function () {
    ChecklistScreen(ProjectId);
})

scrum.addEventListener("click", function () {
    ScrumScreen(ProjectId);
})

//change project
ChangeProject.addEventListener("click", function () {
    ProjectScreen();
})

//delete project
DeleteProjectBt.addEventListener("click", function () {
    DeleteProject(ProjectId);
    ProjectScreen();
})

//DIV MENU EVENT
menu.addEventListener("click", function () {

    if (MenuContent.style.display === "none") {
        MenuContent.style.display = "block";
    } else {
        MenuContent.style.display = "none";
    }
})
    //ADD NOTE
    cadNote.addEventListener("click", function () {
        AddNotesModal.style.display = "flex";
    })

    AddNotesButton.addEventListener("click", function () {
        InsertNotesTratament();
    })

    FillFieldButton.addEventListener("click", function () {
        IsEmptyModal.style.display = "none";
    })

    function InsertNotesTratament() {
        let IsEmptyVerify = IsEmpty(Title.value, Text.value);

        if (IsEmptyVerify === true) {
            return;
        }
        
        InsertNote(Title.value, Text.value);

        Clear();
        AddNotesModal.style.display = "none";
        RenderNotes(ProjectId);
    }

    CancelButton.addEventListener("click", function () {
        Clear();
        AddNotesModal.style.display = "none";
    })

    //arrumar variaveis
    function IsEmpty(Title, Text) {
        if (Title === "" || Text === "") {
            IsEmptyModal.style.display = "flex";
            return true;
        }
        return false;
    }

    function Clear() {
        document.getElementById("Title").value = "";
        document.getElementById("Text").value = "";
    }

    async function RenderNotes(ProjectId) {
        const Notes = await SelectNotes(ProjectId);
        const container = document.querySelector(".noteList");
        container.innerHTML = "";
        notes.style.backgroundColor = "#d6d4d4";
    }
}
