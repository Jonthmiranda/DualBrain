//IMPORTS
import { SelectIAHistoric } from './db.js';
import { InsertIAmsg } from './db.js';

//VARIABLES HISTORIC IA
var HistoricIA  = document.querySelector(".HistoricIA");
var Context  = document.querySelector(".Context");
var User  = document.querySelector(".User");
var IA  = document.querySelector(".IA");
var User  = document.querySelector(".User");
var TextToIA  = document.getElementById("TextToIA");


export function IAScreen() {
    document.querySelector("section").innerHTML = `
<div class="HistoricIA">
  <div class="Context">Contexto</div>
  <div class="User">Usuario</div>
  <div class="IA">IA</div>
  <div class="User">Usuario</div>
</div>
<textarea id="TextToIA" placeholder="Text with IA..." rows="6"></textarea>`;
}

