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
