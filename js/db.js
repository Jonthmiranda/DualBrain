let db = null;

//OPEN DATABASE
function OpenDB(){
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }
        const request = indexedDB.open("FokysPWA", 1);//name and version
        
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

//CLOSE DATABASE
function CloseDB(){
    if (db) {
        db.close();
        db = null;
        console.log("Database closed");
    }
}

//CREATE DATABASE INDEXEDBD
const request = indexedDB.open("FokysPWA", 1); //DBName and version
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("Projects")) { //verify if the store/table exist
        //create table projects
        const projectStore = db.createObjectStore("Projects", { keyPath: "Id", autoIncrement: true});

        projectStore.createIndex("Name", "Name", { unique: false });
        projectStore.createIndex("Description", "Description", { unique: false });
        projectStore.createIndex("Stacks", "Stacks", { unique: false });
        projectStore.createIndex("DateStart", "DateStart", { unique: false });
        projectStore.createIndex("DateEnd", "DateEnd", { unique: false });
    }

    //create table checklist
    if (!db.objectStoreNames.contains("Checklists")) {
        const checklistStore = db.createObjectStore("Checklists", { keyPath: "Id", autoIncrement: true});

        checklistStore.createIndex("ProjectId", "ProjectId", { unique: false });
        checklistStore.createIndex("Step", "Step", { unique: false });
        checklistStore.createIndex("Tasks", "Tasks", { unique: false });
        checklistStore.createIndex("Completed", "Completed", { unique: false });
    };
    
    //create table Scrums
    if (!db.objectStoreNames.contains("Scrums")) {
        const ScrumsStore = db.createObjectStore("Scrums", { keyPath: "Id", autoIncrement: true});

        ScrumsStore.createIndex("ProjectId", "ProjectId", { unique: false });
        ScrumsStore.createIndex("Date", "Date", { unique: false });
        ScrumsStore.createIndex("Yesterday", "Yesterday", { unique: false });
        ScrumsStore.createIndex("Today", "Today", { unique: false });
        ScrumsStore.createIndex("Locks", "Locks", { unique: false });
    };
       //create table Notes
    if (!db.objectStoreNames.contains("Notes")) {
        const NotesStore = db.createObjectStore("Notes", { keyPath: "Id", autoIncrement: true});

        NotesStore.createIndex("ProjectId", "ProjectId", { unique: false });
        NotesStore.createIndex("Title", "Title", { unique: false });
        NotesStore.createIndex("Text", "Text", { unique: false });
        NotesStore.createIndex("Date", "Date", { unique: false });
    };

       //create table IA
    if (!db.objectStoreNames.contains("IA")) {
        const IAStore = db.createObjectStore("IA", { keyPath: "Id", autoIncrement: true});

        IAStore.createIndex("ProjectId", "ProjectId", { unique: false });
        IAStore.createIndex("Question", "Question", { unique: false });
        IAStore.createIndex("Response", "Response", { unique: false });
        IAStore.createIndex("Date", "Date", { unique: false });
    };
}

//PROJECT SCREEN

//READ DATABASE INDEXEDDB
async function SearchProjects() {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Projects", "readonly");
        const store = tx.objectStore("Projects");
        const request = store.getAll();

        request.onsuccess = () => {
            const projects = request.result;

            const results = projects.map(proj => ({
                Id: proj.Id,
                Name: proj.Name,
                Description: proj.Description,
                Stacks: proj.Stacks,
                DateStart: proj.DateStart,
                DateEnd: proj.DateEnd
            }));

            console.log("Projetos encontrados:", results);//enviar para projeto.js
        };

        request.onerror = () => {
            console.error("Erro ao buscar projetos.");//preparar tela de erro
        };
    }finally{
        CloseDB();
    }
}

//UPDATE DATABASE INDEXEDDB
async function UpdateProject(Name, Description, Stacks, DateStart, DateEnd) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Projects", "readwrite");
        const store = tx.objectStore("Projects");

        const Project = {
            Name: Name,
            Description: Description,
            Stacks: Stacks,
            DateStart: DateStart,
            DateEnd: DateEnd
        };
        const addRequest = store.add(Project);

        addRequest.onsuccess = () => {
            console.log("Projeto inserido com sucesso"); //alterar
        };
        addRequest.onerror = (error) => {
            console.error("erro ao inserir projeto: ", error);
        };
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    } finally {
        CloseDB();
    }
}

//DELETE DATABASE INDEXEDDB
