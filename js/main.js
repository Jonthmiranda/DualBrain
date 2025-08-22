//IMPORTS
import { ProjectScreen } from './project.js';
import { ChecklistScreen } from './checklist.js';
import { IAScreen } from './ia.js';
import { NoteScreen } from './note.js';
import { ScrumScreen } from './scrum.js';

//VARIAVEIS TAGS
var nav = document.querySelector("nav");

//VARIAVEIS NAV BUTTONS
var checklist = document.getElementById("checklist");
var notes = document.getElementById("notes");
var ia = document.getElementById("ia");
var scrum = document.getElementById("scrum");
var menu = document.getElementById("menu");
var EndProject = document.getElementById("EndProject");
var DeleteProject = document.getElementById("DeleteProject");
var ChangeProject = document.getElementById("ChangeProject");
var Help = document.getElementById("Help");

//VARIAVEIS NAV DIVS
var MenuContent = document.querySelector(".MenuContent");

//MUDANÇAS DE TELAS EVENTS
checklist.addEventListener("click", function(){
    ChecklistScreen();
})

notes.addEventListener("click", function(){
    NoteScreen();
})

ia.addEventListener("click", function(){
    IAScreen();
})

scrum.addEventListener("click", function(){
    ScrumScreen();
})

ChangeProject.addEventListener("click", function(){
    ProjectScreen(nav);
})

//DIV MENU EVENT
menu.addEventListener("click", function() {
    
    if (MenuContent.style.display === "none"){
        MenuContent.style.display = "block";
    }else{
        MenuContent.style.display = "none";
    }
})

//PRIMEIRA TELA
ProjectScreen(nav);