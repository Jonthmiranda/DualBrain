//IMPORTS
import { SelectNotes } from './db.js';
import { InsertNote } from './db.js';
import { UpdateNote } from './db.js';
import { DeleteNote } from './db.js';

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

export function NoteScreen() {
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
}
