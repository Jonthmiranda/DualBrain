let db = null;

//OPEN DATABASE OK
function OpenDB() {
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

//CLOSE DATABASE OK
function CloseDB() {
    if (db) {
        db.close();
        db = null;
        console.log("Database closed");
    }
}

//CREATE DATABASE INDEXEDBD OK
const request = indexedDB.open("FokysPWA", 1); //DBName and version
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("Projects")) { //verify if the store/table exist
        //create table projects
        const projectStore = db.createObjectStore("Projects", { keyPath: "Id", autoIncrement: true });

        projectStore.createIndex("Name", "Name", { unique: false });
        projectStore.createIndex("Description", "Description", { unique: false });
    }

    //create table checklist
    if (!db.objectStoreNames.contains("Checklists")) {
        const checklistStore = db.createObjectStore("Checklists", { keyPath: "Id", autoIncrement: true });

        checklistStore.createIndex("ProjectId", "ProjectId", { unique: false });
        checklistStore.createIndex("Step", "Step", { unique: false });
        checklistStore.createIndex("Tasks", "Tasks", { unique: false });
        checklistStore.createIndex("Completed", "Completed", { unique: false });
    };

    //create table Scrums
    if (!db.objectStoreNames.contains("Scrums")) {
        const ScrumsStore = db.createObjectStore("Scrums", { keyPath: "Id", autoIncrement: true });

        ScrumsStore.createIndex("ProjectId", "ProjectId", { unique: false });
        ScrumsStore.createIndex("Date", "Date", { unique: false });
        ScrumsStore.createIndex("Yesterday", "Yesterday", { unique: false });
        ScrumsStore.createIndex("Today", "Today", { unique: false });
        ScrumsStore.createIndex("Locks", "Locks", { unique: false });
    };
    //create table Notes
    if (!db.objectStoreNames.contains("Notes")) {
        const NotesStore = db.createObjectStore("Notes", { keyPath: "Id", autoIncrement: true });

        NotesStore.createIndex("ProjectId", "ProjectId", { unique: false });
        NotesStore.createIndex("Title", "Title", { unique: false });
        NotesStore.createIndex("Text", "Text", { unique: false });
        NotesStore.createIndex("Date", "Date", { unique: false });
    };
}

//PROJECT SCREEN

//READ PROJECT OK
export async function SelectProjects() {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Projects", "readonly");
        const store = tx.objectStore("Projects");
        const request = store.getAll();

        const projects = await new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const result = request.result.map(proj => ({
                    Id: proj.Id,
                    Name: proj.Name,
                    Description: proj.Description,
                }));
                resolve(result);
            };

            request.onerror = () => {
                reject("Error SelectProjects db.js.");
            };
        });

        return projects;

    } finally {
        CloseDB();
    }
}

//UPDATE PROJECT
export async function InsertProject(Name, Description, DateStart, DateEnd) {
    try {
        db = await OpenDB();
        const tx = db.transaction("Projects", "readwrite");
        const store = tx.objectStore("Projects");

        const Project = {
            Name: Name,
            Description: Description,
        };

        // Usando Promise para lidar com a operação assíncrona
        const ProjectId = await new Promise((resolve, reject) => {
            const addRequest = store.add(Project);

            addRequest.onsuccess = () => {
                resolve(addRequest.result); // Retorna o ID gerado
            };

            addRequest.onerror = (event) => {
                reject(event.target.error);
            };
        });

        // Agora podemos await pois estamos no contexto export async
        await InsertTemplateChecklist(ProjectId);
        console.log(`Projeto inserido com sucesso! ID: ${ProjectId}`);
        return ProjectId;

    } catch (error) {
        console.error("Erro ao inserir projeto:", error);
        throw error;
    } finally {
        CloseDB();
    }
}

//EDIT PROJECT
export async function UpdateProject(Id, Name, Description, DateStart, DateEnd) {
    try {
        db = await OpenDB();
        const tx = db.transaction("Projects", "readwrite");
        const store = tx.objectStore("Projects");

        const Project = {
            Id: Id,
            Name: Name,
            Description: Description,
            Stacks: Stacks,
            DateStart: DateStart,
            DateEnd: DateEnd
        };

        const request = store.put(Project);

        request.onsuccess = () => {
            console.log(Id ? "Projeto editado!" : "Projeto editado!");
        };
        request.onerror = (error) => {
            console.error("erro ao editar projeto: ", error);
        };
    } catch (error) {
        console.error("Erro ao editar projeto:", error);
        throw error;
    } finally {
        CloseDB();
    }
}

//DELETE PROJECT
//DELETE FROM Projects WHERE ID = X;
export async function DeleteProject(Id) {
    try {
        db = await OpenDB();
        const tx = db.transaction("Projects", "readwrite");
        const store = tx.objectStore("Projects");
        const deleteRequest = store.delete(Id);

        deleteRequest.onsuccess = () => {
            console.log(`Projeto ${Id} deletado com sucesso`);
        };
        deleteRequest.onerror = (error) => {
            console.error("erro ao deletar projeto: ", error);
        };

        await DeleteDependencies(db, "Checklists", Id);
        await DeleteDependencies(db, "IA", Id);
        await DeleteDependencies(db, "Scrums", Id);
        await DeleteDependencies(db, "Notes", Id);

    } catch (error) {
        console.error("Erro ao deletar projeto:", error);
        throw error;
    } finally {
        CloseDB();
    }
}

//DELETE ALL DEPENDENCIES
export async function DeleteDependencies(db, storeName, ProjectId) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        if (!store.indexNames.contains("ProjectId")) {
            console.warn(`A tabela '${storeName}' não tem índice 'projectId'.`);
            resolve();
            return;
        }

        const index = store.index("ProjectId");
        const range = IDBKeyRange.only(ProjectId);
        const request = index.openCursor(range);

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                store.delete(cursor.primaryKey);
                cursor.continue();
            } else {
                console.log(`Todos os registros de '${storeName}' com ProjectId ${ProjectId} foram deletados.`);
                resolve();
            }
        };

        request.onerror = (event) => {
            console.error(`Erro ao deletar de ${storeName}:`, event.target.error);
            reject(event.target.error);
        };
    });
}

//CHECKLIST SCREEN

//READ CHECKLIST OK
//SELECT Id, Step, Tasks, Completed FROM Checklists WHERE ProjectId = x
export async function SelectChecklist(ProjectId) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Checklists", "readonly");
        const store = tx.objectStore("Checklists");
        const index = store.index("ProjectId");
        const range = IDBKeyRange.only(ProjectId);
        const request = index.getAll(range);

        const results = await new Promise((resolve, reject) => {
            request.onsuccess = () => {
                const checklists = request.result;

                const mapped = checklists.map(item => ({
                    Id: item.Id,
                    Step: item.Step,
                    Tasks: item.Tasks,
                    Completed: item.Completed
                }));

                resolve(mapped);
            };

            request.onerror = () => {
                reject("Erro ao buscar checklists.");
            };
        });

        return results;

    } finally {
        CloseDB();
    }
}

//INSERT TEMPLATE CHECKLIST OK
//INSERT INTO Checklists (ProjectId, Step, Tasks, Completed) VALUES (x, x, x, Null)
export async function InsertTemplateChecklist(ProjectId) {
    try {
        db = await OpenDB();
        const tx = db.transaction("Checklists", "readwrite");
        const store = tx.objectStore("Checklists");

        const checklistTemplate = [
            // ETAPA 1: Planejamento
            { ProjectId: ProjectId, Step: "Planejamento", Tasks: "Entendimento do problema", Completed: false },
            { ProjectId: ProjectId, Step: "Planejamento", Tasks: "Escolhas técnicas", Completed: false },
            { ProjectId: ProjectId, Step: "Planejamento", Tasks: "Levantamento de requisitos", Completed: false },
            { ProjectId: ProjectId, Step: "Planejamento", Tasks: "Fluxos de uso UML", Completed: false },
            { ProjectId: ProjectId, Step: "Planejamento", Tasks: "Regras de negócio", Completed: false },
            // ETAPA 2: Projeto (Design)
            { ProjectId: ProjectId, Step: "Projeto", Tasks: "Modelagem do BD", Completed: false },
            { ProjectId: ProjectId, Step: "Projeto", Tasks: "Wireframes", Completed: false },
            { ProjectId: ProjectId, Step: "Projeto", Tasks: "Arquitetura de software", Completed: false },
            { ProjectId: ProjectId, Step: "Projeto", Tasks: "UI/UX", Completed: false },
            // ETAPA 3: Desenvolvimento
            { ProjectId: ProjectId, Step: "Desenvolvimento", Tasks: "Criação do banco de dados", Completed: false },
            { ProjectId: ProjectId, Step: "Desenvolvimento", Tasks: "Criação da estrutura do projeto", Completed: false },
            { ProjectId: ProjectId, Step: "Desenvolvimento", Tasks: "Programação da lógica", Completed: false },
            { ProjectId: ProjectId, Step: "Desenvolvimento", Tasks: "Programação da interface", Completed: false },
            { ProjectId: ProjectId, Step: "Desenvolvimento", Tasks: "Integração Front + Back + BD", Completed: false },
            // ETAPA 4: Testes
            { ProjectId: ProjectId, Step: "Testes", Tasks: "Testes funcionais", Completed: false },
            { ProjectId: ProjectId, Step: "Testes", Tasks: "Testes de usabilidade", Completed: false },
            { ProjectId: ProjectId, Step: "Testes", Tasks: "Testes de segurança", Completed: false },
            { ProjectId: ProjectId, Step: "Testes", Tasks: "Testes de performance", Completed: false },
            { ProjectId: ProjectId, Step: "Testes", Tasks: "Correções de bugs", Completed: false },
            // ETAPA 5: Publicação
            { ProjectId: ProjectId, Step: "Publicação", Tasks: "Deploy", Completed: false },
            { ProjectId: ProjectId, Step: "Publicação", Tasks: "Configuração de domínio (Opcional)", Completed: false },
            { ProjectId: ProjectId, Step: "Publicação", Tasks: "Documentação final", Completed: false }
        ];

        for (const item of checklistTemplate) {
            const request = store.add(item);

            request.onsuccess = () => {
                console.log("tamplate de checklist inserido com sucesso!");
            };

            request.onerror = (error) => {
                console.log("Erro ao adicionar tamplate de checklist", error);
            };
        }

    } catch (error) {
        console.error("Erro ao inserir tamplete de checklist:", error);
        throw error;
    } finally {
        CloseDB();
    }
}

//INSERT CHECKLIST
//INSERT INTO Checklists (ProjectId, Step, Tasks, Completed) VALUES (x, x, x, Null)
export async function InsertChecklist(ProjectId, Step, Tasks) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Checklists", "readwrite");
        const store = tx.objectStore("Checklists");

        const newChecklist = {
            ProjectId: ProjectId,
            Step: Step,
            Tasks: Tasks,
            Completed: false
        };

        const request = store.add(newChecklist);

        request.onsuccess = () => {
            console.log("Checklist inserido com sucesso!");
        };

        request.onerror = () => {
            console.error("Erro ao inserir checklist.");
        };
    } finally {
        CloseDB();
    }
}

//UPDATE CHECKED ITEM FROM CHECKLIST
//UPDATE Checklists SET Completed = True WHERE Id = x
export async function UpdateChecklistCompleted(Id) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Checklists", "readwrite");
        const store = tx.objectStore("Checklists");

        const getRequest = store.get(Id);

        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
                data.Completed = !data.Completed;

                const updateRequest = store.put(data); // salva de volta

                updateRequest.onsuccess = () => {
                    console.log(`Checklist ${Id} atualizada.`);
                };

                updateRequest.onerror = (event) => {
                    console.error("Erro ao atualizar checklist:", event.target.error);
                };
            } else {
                console.warn(`Checklist com id ${Id} não encontrado.`);
            }
        };

        getRequest.onerror = (event) => {
            console.error("Erro ao buscar checklist:", event.target.error);
        };
    } finally {
        CloseDB();
    }
}

//UPDATE CHECKLIST 
//UPDATE Checklists SET Step = x, Tasks = x, Completed = x WHERE Id = x;
export async function UpdateChecklist(Id, Step, Tasks, Completed) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Checklists", "readwrite");
        const store = tx.objectStore("Checklists");

        const getRequest = store.get(Id);

        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
                data.Step = Step;
                data.Tasks = Tasks;
                data.Completed = Completed;

                const updateRequest = store.put(data);

                updateRequest.onsuccess = () => {
                    console.log(`Checklist ${Id} atualizado com sucesso.`);
                };

                updateRequest.onerror = (event) => {
                    console.error("Erro ao atualizar checklist:", event.target.error);
                };
            } else {
                console.warn(`Checklist com id ${Id} não encontrado.`);
            }
        };

        getRequest.onerror = (event) => {
            console.error("Erro ao buscar checklist:", event.target.error);
        };
    } finally {
        CloseDB();
    }
}

//DELETE CHECKLIST
//DELETE FROM Checklists WHERE Id = x;
export async function DeleteChecklist(Id) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Checklists", "readwrite");
        const store = tx.objectStore("Checklists");

        const deleteRequest = store.delete(Id);

        deleteRequest.onsuccess = () => {
            console.log(`Checklist ${Id} deletado com sucesso.`);
        };

        deleteRequest.onerror = (event) => {
            console.error("Erro ao deletar checklist:", event.target.error);
        };
    } finally {
        CloseDB();
    }
}

//NOTES SCREEN PRECISA SER TESTADO TUDO DAQUI PARA BAIXO

//SELECT NOTES
//SELECT Title, Text, Date FROM Notes WHERE ProjectId = x
export async function SelectNotes(ProjectId) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Notes", "readonly");
        const store = tx.objectStore("Notes");
        const index = store.index("ProjectId");
        const range = IDBKeyRange.only(ProjectId);
        const request = index.getAll(range);

        request.onsuccess = () => {
            const notes = request.result;

            const results = notes.map(item => ({
                Id: item.Id,
                Title: item.Title,
                Text: item.Text,
                Date: item.Date
            }));
            console.log("Notas encontrados:", results);
        };

        request.onerror = () => {
            console.error("Erro ao buscar Notas.");
        };
    } finally {
        CloseDB();
    }
}

//INSERT NOTE
//INSERT INTO Notes (ProjectId, Title, Text, Date) VALUES (x, x, x, x)
export async function InsertNote(ProjectId, Title, Text, Date) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Notes", "readwrite");
        const store = tx.objectStore("Notes");

        const newNote = {
            ProjectId: ProjectId,
            Title: Title,
            Text: Text,
            Date: Date
        };

        const request = store.add(newNote);

        request.onsuccess = () => {
            console.log("Nota inserido com sucesso!");
        };

        request.onerror = () => {
            console.error("Erro ao inserir Nota.");
        };
    } finally {
        CloseDB();
    }
}

//UPDATE NOTE
//UPDATE Notes SET Title = x, Text = x, Date = x WHERE Id = x
export async function UpdateNote(Id, Title, Text, Date) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Notes", "readwrite");
        const store = tx.objectStore("Notes");
        const getRequest = store.get(Id);

        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (data) {
                data.Title = Title;
                data.Text = Text;
                data.Date = Date;

                const updateRequest = store.put(data);

                updateRequest.onsuccess = () => {
                    console.log(`Nota ${Id} atualizado com sucesso.`);
                };

                updateRequest.onerror = (event) => {
                    console.error("Erro ao atualizar Nota:", event.target.error);
                };
            } else {
                console.warn(`Nota com id ${Id} não encontrado.`);
            }
        };

        getRequest.onerror = (event) => {
            console.error("Erro ao buscar Nota:", event.target.error);
        };
    } finally {
        CloseDB();
    }
}

//DELETE NOTE
//DELETE FROM Notes WHERE Id = x
export async function DeleteNote(Id) {
    Id = 1;
    try {
        const db = await OpenDB();
        const tx = db.transaction("Notes", "readwrite");
        const store = tx.objectStore("Notes");

        const deleteRequest = store.delete(Id);

        deleteRequest.onsuccess = () => {
            console.log(`Nota ${Id} deletado com sucesso.`);
        };

        deleteRequest.onerror = (event) => {
            console.error("Erro ao deletar Nota:", event.target.error);
        };
    } finally {
        CloseDB();
    }
}

//SCRUMS SCREEN

//SELECT SCRUMS
//SELECT Date, Yesterday, Today, Locks FROM Scrums WHERE ProjectId = x
export async function SelectScrums(ProjectId) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Scrums", "readonly");
        const store = tx.objectStore("Scrums");
        const index = store.index("ProjectId");
        const range = IDBKeyRange.only(ProjectId);
        const request = index.getAll(range);

        request.onsuccess = () => {
            const scrums = request.result;

            const results = scrums.map(item => ({
                Date: item.Date,
                Yesterday: item.Yesterday,
                Today: item.Today,
                Locks: item.Locks
            }));
            console.log("Scrums encontrados:", results);
        };

        request.onerror = () => {
            console.error("Erro ao buscar Scrums.");
        };
    } finally {
        CloseDB();
    }
}

//INSERT Scrum
//INSERT INTO Scrum (ProjectId, Date, Yesterday, Today, Locks) VALUES (x, x, x, x, x)
export async function InsertScrum(ProjectId, Date, Yesterday, Today, Locks) {
    try {
        const db = await OpenDB();
        const tx = db.transaction("Scrums", "readwrite");
        const store = tx.objectStore("Scrums");

        const newScrum = {
            ProjectId: ProjectId,
            Date: Date,
            Yesterday: Yesterday,
            Today: Today,
            Locks: Locks
        };

        const request = store.add(newScrum);

        request.onsuccess = () => {
            console.log("Scrum inserido com sucesso!");
        };

        request.onerror = () => {
            console.error("Erro ao inserir Scrum.");
        };
    } finally {
        CloseDB();
    }
}
