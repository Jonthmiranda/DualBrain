<ul class="ChecklistList">
                <li><input type="checkbox" id="item1"><label for="item1">Criar layout</label></li>
            </ul>
            <button id="cadChecklist"><img src="./assets/cad.png" alt="cadChecklist" class="buttonLogo"><span>Add Checklist</span></button>

            <div class="AddChecklistModal">
                <h4>Add Checklist</h4>
                <p class="TitleTask">Type the Task:</p>
                <textarea type="text" id="Task" name="Task"></textarea>
                
                <button id="AddChecklistButton">Add Checklist</button>
                <button id="CancelButton">Cancel</button>

                <div class="IsEmptyModal">
                    <p>Field is empty</p>
                    <button id="FillFieldButton">Ok</button>
                </div>