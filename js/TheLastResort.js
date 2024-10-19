'use strict'
import { Script, Edit, Liste, Cd } from "./Commands.js";

import { main_directory } from "./Arborescence.js";


export class TheLastResort {
    constructor() {
        this.current_dir = main_directory;
        this.current_file = '';
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
        let editabletextarea = document.getElementById('editable-textarea');

        console.log('je ne sais pas : ' + editabletextarea.style.display)
        if (editabletextarea.style.display !== 'block') {

            console.log('sexylady');

            this.addcommandToUI(string);
            let command = string.split(' ');
            switch (command[0]) {
                case "edit":
                    //classe nano et execution
                    this.current_file = new Edit().execute(command[1], this.current_dir);//rajouter fichiers

                    break;
                case "modify":
                    //verifier que le string est bien
                    //checkvar
                    this.quests[this.current].checkVar(string);
                    this.clearPrompt();

                    break;

                case "ls":
                    //script

                    this.addResultToUI(new Liste().execute(this.current_dir.dir_array));
                    this.clearPrompt();
                    break;

                case "cd":
                    //script
                    this.current_dir = new Cd().execute(command[1], this.current_dir);
                    this.clearPrompt();

                    break;

                case "run":
                    //script
                    let script = new Script();
                    let res = script.execute(string);
                    this.quests[this.current].checkScript(string)
                    this.addResultToUI(res);
                    this.clearPrompt();

                    break;
            }
        } else {

            console.log('sexyboy');

            this.current_file.editFile(editabletextarea.value);

            editabletextarea.value = "";

            editabletextarea.style.display = "none";

            document.getElementById('user-input').style.display = "";
            document.getElementById('user-input').value = "";

            document.getElementById('save-button').style.display = "none";
            const label = document.querySelector('label[for="user-input"]');

            label.textContent = '';

            document.getElementById('scrollable-list').style.display = "block";



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

    finish() {
        //stopper le timer TODO
        const ulElement = document.querySelector('.screen ul');
        const finishText = document.createElement('p');
        finishText.textContent = 'Well done you saved the earth!!';
        ulElement.replaceChildren(finishText);
    }

    clearPrompt() {
        const form = document.querySelector('#user-form');
        form.reset();
    }



}