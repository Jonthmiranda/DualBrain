import { ProjectScreen } from './project.js';
import { ChecklistScreen } from './checklist.js';
import { IAScreen } from './ia.js';
import { NoteScreen } from './note.js';
import { ScrumScreen } from './scrum.js';

var nav = document.querySelector("nav");

//CHECKLIST BUTTON
var checklist = document.getElementById("checklist");

checklist.addEventListener("click", function(){
    ChecklistScreen();
})

//NOTES BUTTON
var notes = document.getElementById("notes");

notes.addEventListener("click", function(){
    NoteScreen();
})

//IA BUTTON
var ia = document.getElementById("ia");

ia.addEventListener("click", function(){
    IAScreen();
})

//SCRUM BUTTON
var scrum = document.getElementById("scrum");

scrum.addEventListener("click", function(){
    ScrumScreen();
})

//MENU BUTTON
var menu = document.getElementById("menu");

menu.addEventListener("click", function() {
    var MenuContent = document.querySelector(".MenuContent");
    if (MenuContent.style.display === "none"){
        MenuContent.style.display = "block";
    }else{
        MenuContent.style.display = "none";
    }
})

var EndProject = document.getElementById("EndProject");
var DeleteProject = document.getElementById("DeleteProject");

//CHANGE PROJECT BUTTON
var ChangeProject = document.getElementById("ChangeProject");

ChangeProject.addEventListener("click", function(){
    ProjectScreen(nav);
})

var Help = document.getElementById("Help");


//WHEN INICIALIZED CALL THE PROJECT SCREEN
ProjectScreen(nav);