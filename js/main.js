'use strict'
import { Quest } from "./Quest.js";
import { TheLastResort } from "./TheLastResort.js";
import { File } from "./Arborescence.js";

let theLastResort = new TheLastResort();

let quest1 = new Quest("Corrigé le système életrique du vaisseau", ["modify electricty_enable = true", "run repairElectricalSystems.sh"])
let quest2 = new Quest("Contrôler le système d'orientation du vaisseau", ["modify orientation = true", "run celie.sh"]);
let quest3 = new Quest("Ajout du fichier de configuration des propulseurs", ["Documents>config.conf:'prop=true;'"]);


theLastResort.addQuest(quest1);
theLastResort.addQuest(quest2);
theLastResort.addQuest(quest3);

/*
//default values
theLastResort.executeCmd("modify hello = true");

theLastResort.executeCmd("run celie.sh");

theLastResort.executeCmd('ls');
theLastResort.executeCmd("run repairElectricalSystems.sh");
console.log("quest1.finished"+quest1.finished);

theLastResort.executeCmd('cd Documents');

theLastResort.executeCmd('ls');

theLastResort.executeCmd('cd ..');

theLastResort.executeCmd('ls');*/
/*
const form = document.getElementById('user-form');
const userInput = document.getElementById('user-input');

form.addEventListener('submit', (event) => {
    const inputValue = userInput.value;
    console.log('Valeur saisie:', inputValue);
    theLastResort.executeCmd(inputValue);
 });
*/

function scrollToBottom() {
    const list = document.getElementById('scrollable-list');
    list.scrollTop = list.scrollHeight; // Définit la position de défilement au bas du conteneur
}

theLastResort.updateQuestUI()

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#user-form');
    const userInput = document.querySelector('#user-input');


    //cmd
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const inputValue = userInput.value;
        theLastResort.executeCmd(inputValue);

        scrollToBottom();

    });

    //save file
});
