export function ChecklistScreen() {
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
