'use strict'
import { Script, Edit, Liste, Cd, Create, Delete } from "./Commands.js";

import { main_directory } from "./Arborescence.js";

let numero_quest = 1;

export class TheLastResort {
    constructor() {
        this.current_dir = main_directory;
        this.current_file = '';
        this.current = 0;
        this.quests = [];
        this.now = 0;
        this.initial = 0;
        this.countDownDate = 0;
        this.timeleft = 0;
        this.initTimer(15);

    }

    addQuest(quest) {
        this.updateCurrent();
        this.quests.push(quest);
        this.initNameQuestsUI(quest);
    }
    executeCmd(string = "") {
        // split par espace
        //ex overlay = true => ["overlay","=","true"]
        let editabletextarea = document.getElementById('editable-textarea');

        if (editabletextarea.style.display !== 'block') {
            this.addcommandToUI(string);
            let command = string.split(' ');
            switch (command[0]) {
                case "edit":
                    //classe nano et execution
                    if (this.current_dir.getFileByName(command[1])) {
                        this.current_file = new Edit().execute(command[1], this.current_dir);//rajouter fichiers
                    } else
                        this.addResultToUI("Something went wrong :(");

                    break;
                case "modify":
                    //verifier que le string est bien
                    //checkvar
                    this.quests[this.current].checkVar(string);
                    this.clearPrompt();

                    break;
                case 'create':
                    new Create().execute(command[1], this.current_dir);
                    this.clearPrompt();

                    break;

                case 'delete':
                    new Delete().execute(command[1], this.current_dir);
                    this.clearPrompt();

                    break;

                case "ls":
                    this.addResultToUI(new Liste().execute(this.current_dir.dir_array));
                    this.clearPrompt();
                    break;

                case "cd":
                    //cd
                    let cd = new Cd();
                    let new_current_dir = cd.execute(command[1], this.current_dir);

                    console.log(new_current_dir);
                    if (new_current_dir == null)
                        this.addResultToUI("Something went wrong :(");

                    else {
                        this.current_dir = new_current_dir;
                        this.quests[this.current].checkCD(string);
                    }
                    this.clearPrompt();

                    break;


                case "run":
                    //script
                    let script = new Script();
                    let res = script.execute(string);
                    this.quests[this.current].checkScript(string);
                    this.addResultToUI(res);
                    this.clearPrompt();

                    break;
                case "clear":
                    this.replaceUI();
                    break;
            }
        } else {
            this.current_file.editFile(editabletextarea.value);

            editabletextarea.value = "";
            editabletextarea.style.display = "none";
            document.getElementById('user-input').style.display = "";
            document.getElementById('user-input').value = "";
            document.getElementById('save-button').style.display = "none";
            const label = document.querySelector('label[for="user-input"]');
            label.textContent = '';
            document.getElementById('scrollable-list').style.display = "block";

            this.quests[this.current].checkEdit(this.current_file);

            this.addResultToUI("File edited :)");

        }
        this.updateCurrent();
        this.updateQuestUI();
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
        this.stopTimer();
        this.finish(true);

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
    replaceUI(string = "") {
        const ulElement = document.querySelector('.screen ul');
        const finishText = document.createElement('p');
        finishText.textContent = string;
        ulElement.replaceChildren(finishText);
    }
    nameQuestsUI() {

        let questElements = document.getElementById('list-quest');
        console.log("questElements" + questElements);
        let i = 0;
        this.quests.forEach(quest => {

            let li = document.createElement('li');
            console.log("li ; " + li);
            li.innerHTML = `
                <div class="checkbox-wrapper-19">
                    <input type="checkbox" id="${i + 1}" />
                    <label for="${i + 1}" class="check-box"></label>
                </div>
                ${quest.name}`;
            questElements.appendChild(li);
            i++;
        });
    }

    initNameQuestsUI(quest) {


        let i = this.quests.length;
        let questElements = document.getElementById('list-quest');

        let li = document.createElement('li');
        console.log("li ; " + li);
        li.innerHTML = `
            <div class="checkbox-wrapper-19">
                <input type="checkbox" id="${i}" disabled />
                <label for="${i}" class="check-box"></label>
            </div>
            ${numero_quest + ' - ' + quest.name}`;
        questElements.appendChild(li);
        numero_quest++;
    }

    updateQuestUI() {
        for (let index = 0; index < this.quests.length; index++) {
            let checkbox = document.getElementById(index + 1);
            checkbox.checked = this.quests[index].getFinished();
        }
    }

    finish(win) {
        if (!win) {
            this.replaceUI('Oh no the robot was exploded :(  the atmosphere will still be dirty');
        }
        if (win)
            this.replaceUI('Well done you saved the earth!!');
        this.replaceUI('Your time -->' + this.timeleft);

    }

    clearPrompt() {
        const form = document.querySelector('#user-form');
        form.reset();
    }


    // Initialize Timer
    initTimer(timeinitial) {
        this.timeinitial = timeinitial;
        this.now = new Date().getTime();
        this.countDownDate = this.now + this.timeinitial * 60000;

        // Start the timer and store the interval ID
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    // Update Timer
    updateTimer() {
        this.now = new Date().getTime();
        this.timeleft = this.countDownDate - this.now;

        let minutes = Math.floor((this.timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.timeleft % (1000 * 60)) / 1000);

        let time = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        document.getElementById("timer-value").innerHTML = time;

        // Check if the timer has finished
        if (this.timeleft <= 0) {
            document.getElementById("timer-value").innerHTML = "00:00";
            this.stopTimer();  // Stop the timer when it reaches 0
            this.finish(false);
        }
    }

    // Stop Timer
    stopTimer() {
        clearInterval(this.timerInterval);  // Clear the interval to stop the timer
    }

}