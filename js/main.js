'use strict'
import { Quest } from "./Quest.js";
import { TheLastResort } from "./TheLastResort.js";

let theLastResort = new TheLastResort();
let quest1 = new Quest("Réparer l'aile droite",["modify hello = true","run repairElectricalSystems.sh"])
let quest2 = new Quest("Réparer l'aile gauche",["modify hello = true","run celie.sh"])
 

theLastResort.addQuest(quest1);
theLastResort.addQuest(quest2)

//default values
theLastResort.executeCmd("modify hello = true");

theLastResort.executeCmd("run celie.sh");

theLastResort.executeCmd('ls');
theLastResort.executeCmd("run repairElectricalSystems.sh");
console.log("quest1.finished"+quest1.finished);

theLastResort.executeCmd('cd Documents');

theLastResort.executeCmd('ls');

theLastResort.executeCmd('cd ..');

theLastResort.executeCmd('ls');
/*
const form = document.getElementById('user-form');
const userInput = document.getElementById('user-input');

form.addEventListener('submit', (event) => {
    const inputValue = userInput.value;
    console.log('Valeur saisie:', inputValue);
    theLastResort.executeCmd(inputValue);
 });
*/

theLastResort.updateQuestUI()

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#user-form');
    const userInput = document.querySelector('#user-input');


    //cmd
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const inputValue = userInput.value;
        theLastResort.executeCmd(inputValue);
    });

    //save file
});