'use strict'
import { Script, Nano, Liste, Cd } from "./Commands.js";

import { main_directory } from "./Arborescence.js";


export class TheLastResort {
    constructor() {
        this.current_dir = main_directory;
        this.current = 0;
        this.quests = [];
    }



    addQuest(quest) {
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
                //ls

                this.addResultToUI(new Liste().execute(this.current_dir.dir_array));
                break;

            case "cd":
                //cd
                let cd = new Cd();
                let new_current_dir = cd.execute(command[1], this.current_dir);
                if(new_current_dir==null)
                    this.addResultToUI("Something whent wrong :(");
                else
                    this.current_dir = new_current_dir;
                break;

            case "run":
                //script
                let script = new Script();
                let res = script.execute(string);
                this.quests[this.current].checkScript(string)
                this.addResultToUI(res);
                break;
            case "clear":
                this.replaceUI();
            break;
        }
        this.updateStatus();

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

    updateStatus() {
        for (let i = 0; i < this.quests.length; i++) {
            if (this.quests[i].getFinished() == false) {
                return;
            }
        }
        this.finish();
    }

    addcommandToUI(command) {
        const ulElement = document.querySelector('.screen ul');

        // Ajouter un nouvel élément à la fin de la liste
        const newListItem = document.createElement('li');
        newListItem.textContent = command;
        ulElement.appendChild(newListItem);
    }

    addResultToUI(command) {
        const ulElement = document.querySelector('.screen ul');

        const newItem = document.createElement('p');
        newItem.textContent = command;
        ulElement.appendChild(newItem);
    }
    replaceUI(string=""){
        const ulElement = document.querySelector('.screen ul');
        const finishText = document.createElement('p');
        finishText.textContent = string;
        ulElement.replaceChildren(finishText);
    }
    finish() {
        //stopper le timer TODO
        this.replaceUI('Well done you saved the earth!!');
    }



}