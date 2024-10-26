'use strict'
import { Quest } from "./Quest.js";
import { TheLastResort } from "./TheLastResort.js";
import { File } from "./Arborescence.js";

let theLastResort = new TheLastResort();

const quests = [
    new Quest("Corriger le système électrique du vaisseau", ["modify electricity_enable = true", "run repairElectricalSystems.sh"]),
    new Quest("Contrôler le système d'orientation du vaisseau", ["modify orientation_up = true", "run celie.sh"]),
    new Quest("Configuration des propulseurs", ["run repairPropellers.sh", "edit navigation_config.json"]),
    new Quest("Ajustement température système", ["edit temperature_readings.json"]),
    new Quest("Régler le niveau de carburant", ["run fuelBalance.sh"]),
    new Quest("Vérifier l'intégrité du bouclier", ["run shieldDiagnostic.sh", "modify shield_strength = 100"]),
    new Quest("Calibrer les senseurs de gravité", ["run calibrateGravity.sh"]),
    new Quest("Synchroniser les systèmes de communication", ["run syncCommSystem.sh"])
];

// Fonction pour choisir 4 quêtes aléatoires sans répétition
function getRandomQuests(questArray, numQuests) {
    let selectedQuests = [];
    while (selectedQuests.length < numQuests) {
        let randomQuest = questArray[Math.floor(Math.random() * questArray.length)];
        if (!selectedQuests.includes(randomQuest)) {
            selectedQuests.push(randomQuest);
        }
    }
    return selectedQuests;
}

// Sélection et ajout des quêtes
const randomQuests = getRandomQuests(quests, 4);
randomQuests.forEach(quest => theLastResort.addQuest(quest));


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
