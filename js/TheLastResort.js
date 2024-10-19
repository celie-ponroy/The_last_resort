'use strict'
import { Script, Nano, Liste } from "./Commands.js";

import { main_directory } from "./Arborescence.js";


export class TheLastResort {
    constructor() {
        this.current_dir = main_directory;
        this.current = 0;
        this.quests = [];
    }
    addQuest(quest) {//=random 
        this.updateCurrent()
        this.quests.push(quest);
    }
    executeCmd(string = "") {
        // split par espace
        //ex overlay = true => ["overlay","=","true"]

        this.addcommandToUI(string);
        let command = string.split(' ');
        switch (command[0]) {
            case "nano":
                //classe nano et execution
                new Nano().execute(string);//rajouter fichiers
                break;
            case "modify":
                //verifier que le string est bien
                //checkvar
                this.quests[this.current].checkVar(string);
                break;

            case "ls":
                //script
                this.addResultToUI(new Liste().execute(main_directory.dir_array));
                break;

            case "run":
                //script
                let script = new Script();
                let res = script.execute(string);
                this.quests[this.current].checkScript(string)
                this.addResultToUI(res);
                break;
        }
        //updateStatus();

    }
    updateCurrent() {
        let i = 0;
        for (i = 0; i < this.quests.length; i++) {
            if (this.quests[i].getFinished() == false) {
                break;
            }
        }
        this.current = i;
    }
/*
    updateStatus(){
        for(let i = 0; i < this.commands.length ; i++){
            if(this.quests[i].getFinished() == false){
                return;
            }
        }
        finish();
    }*/

    addcommandToUI(command) {
        const ulElement = document.querySelector('.screen ul');

        // Ajouter un nouvel élément à la fin de la liste
        const newListItem = document.createElement('li');
        newListItem.textContent = command;
        ulElement.appendChild(newListItem);
    }
    
    addResultToUI(command) {
        const ulElement = document.querySelector('.screen ul');

        // Ajouter un nouvel élément à la fin de la liste
        const newListItem = document.createElement('p');
        newListItem.textContent = command;
        ulElement.appendChild(newListItem);
    }
/*
    finish(){
        const ulElement = document.querySelector('quests');

        // Ajouter un nouvel élément à la fin de la liste
        const newListItem = document.createElement('p');
        newListItem.textContent = "Well done you saved the earth!!";
        ulElement.appendChild(newListItem);
    }

    */


}