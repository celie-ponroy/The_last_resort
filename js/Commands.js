'use strict'

import { File, Directory } from "./Arborescence.js";


class Command {
    constructor() {
    }
    execute() { }
}

export class Script extends Command {
    constructor() { super() }
    execute(string) {
        // changer avec une liste de script pré définie
        let res = "";
        switch (string.split(" ")[1]) {
            case "altf4.sh":
                res = "Crédits:\n" +
                    "Amaglio Matias: son +\n" +
                    "Arcelin Nino: htlm/scss et devellopement backend\n" +
                    "Ponroy Célie: devellopement backend" +
                    "--------------------------------------------------"
                break;

            case "help.sh":
                res = "HAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                break;
            case "nino.sh":
                res = "nino to the rescue";
                break;
            case "matias.sh":
                res = "you bought a cookie to matias he will help you"
                break;
            case "celie.sh":
                res = "its all good celie helped you :)";
                break;
            case "repairPropellers.sh":
            case "repairBattery.sh":
            case "repairTankLeaks.sh":
            case "repairElectricalSystems.sh":
                res = "repairing ...\n" +
                    "repaired !";
                break;
        }
        return res;

    }
}


//TODO
export class Edit extends Command {
    constructor() {
        super();
    }

    execute(file_name, current_dir) {
        const list = document.getElementById('scrollable-list');
        list.style.display = "none";

        // Récupérer le fichier en utilisant le nom du fichier
        let file = current_dir.getFileByName(file_name);

        // Vérifiez si le fichier a été trouvé et a du contenu
        if (file && file.file_content !== undefined) {
            // Mettre à jour le texte de l'étiquette
            const label = document.querySelector('label[for="user-input"]');
            label.textContent = 'Edition Mode :';

            // Afficher le textarea et masquer l'input
            const input = document.getElementById('user-input');
            const textarea = document.getElementById('editable-textarea');
            const savebutton = document.getElementById('save-button');


            input.style.display = 'none'; // Masquer l'input
            textarea.style.display = 'block'; // Afficher le textarea
            savebutton.style.display = 'block'; // Afficher le textarea


            // Définir la valeur du textarea avec le contenu du fichier
            textarea.value = file.file_content; // Définir la valeur du textarea avec le contenu du fichier

            // Vérifiez que la valeur est bien définie
            return file;
        } else {
            console.error("Fichier non trouvé ou vide.");
        }
    }
}


export class Create extends Command {
    constructor() { super() }
    execute(argument, current_dir) {
        if (argument.includes('.')) {
            console.log("L'argument contient un point.");
            current_dir.addToDirectory(new File(argument));
        } else {
            console.log("L'argument ne contient pas de point.");
            current_dir.addToDirectory(new Directory(argument, current_dir));

        }

    }
}



export class Cd extends Command {
    constructor() { super() }
    execute(argument, current_dir) {
        switch (argument) {
            case '..':
                return current_dir.dir_parent;

            default:
                return current_dir.getDirectoryByName(argument);

        }

    }
}

export class Liste extends Command {
    constructor() { super() }

    execute(dir_array) {
        let retour = "";

        for (let i = 0; i < dir_array.length; i++) {
            retour += dir_array[i] + " | ";
        }
        return retour;
    }
}
