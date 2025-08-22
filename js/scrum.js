//IMPORTS
import { SelectScrums } from './db.js';
import { InsertScrum } from './db.js';

//VARIABLES SCRUM LIST
var ScrumList = document.querySelector(".ScrumList");
var Date = document.querySelector(".Date");

//VARIABLES ADD SCRUM MODAL
var AddScrumModal = document.querySelector(".AddScrumModal");
var Yesterday = document.getElementById("Yesterday");
var Today = document.getElementById("Today");
var Locks = document.getElementById("Locks");
var AddScrumButton = document.getElementById("AddScrumButton");

//VARIABLES IS EMPTY MODAL
var IsEmptyModal = document.querySelector(".IsEmptyModal");
var FillFieldButton = document.getElementById("FillFieldButton");

export function ScrumScreen() {
    document.querySelector("section").innerHTML = `
<div class="ScrumList">
                <button>
                    <span class="Date">03/08/2025</span>
                </button>
                <button>
                    <span class="Date">09/09/2025</span>
                </button>
                <button>
                    <span class="Date">10/08/2025</span>
                </button>
            </div>

<div class="AddScrumModal">
                <h4>Scrum</h4>
                <textarea type="text" id="Yesterday" name="Yesterday" placeholder="Yesterday"></textarea>
                <textarea type="text" id="Today" name="Today" placeholder="Today"></textarea>
                <textarea type="text" id="Locks" name="Locks" placeholder="Locks"></textarea>
    
                <button id="AddScrumButton">Add Scrum</button>
        </div>
    
                <div class="IsEmptyModal">
                    <p>Field is empty</p>
                    <button id="FillFieldButton">Ok</button>
                </div>`;
}
