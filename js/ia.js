<div class="HistoricIA">
  <div class="Context">Contexto</div>
  <div class="User">Usuario</div>
  <div class="IA">IA</div>
  <div class="User">Usuario</div>
</div>
<textarea id="TextToIA" placeholder="Text with IA..." rows="6"></textarea>

/*CHAT IA*/
/*TROCAR AS CORES*/
.HistoricIA {
  display: flex;
  width: 100%;
  height: 85%;
  flex-direction: column;
  align-items: center;
  flex-direction: column-reverse; /*CONFIRMAR SE VAI SER NECESSARIO*/
  overflow-y: auto;
}

.HistoricIA div{
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border-radius: 25px;
  padding: 10px 14px;
  max-width: 80%;
  
}

.Context {
  align-self: center;
  background-color: transparent;
}

.User {
  align-self: flex-end;
  background-color: grey;
}

.IA {
  align-self: flex-start;
  background-color: blue
}

#TextToIA {
  width: 100%;
  height: auto;
}
