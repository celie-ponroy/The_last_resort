'use strict'
import {Script,Nano } from "./Commands.js";
export class TheLastResort{
    constructor(){
        this.current = 0;
        this.quests = [];
    }
    addQuest(quest){//=random 
        this.updateCurrent()
        this.quests.push(quest);
    }
    executeCmd(string=""){
        // split par espace
        //ex overlay = true => ["overlay","=","true"]
        let command = string.split(' ');
        switch(command[0]){
            case "nano":
                //classe nano et execution
                new Nano().execute(string);//rajouter fichiers
                break;
            case "modify":
                //verifier que le string est bien
                //checkvar
                this.quests[this.current].checkVar(string);
                break;
            case "run":
                //script
                new Script().execute(string);
                break;
        }


        /*console.log(this.quests);
        console.log(this.current);
        this.quests[this.current].executeCmd(string);
        this.updateCurrent();*/

    }
    updateCurrent(){
        let i = 0;
        for( i = 0; i<this.quests.length ; i++){
            if(this.quests[i].getFinished()==false){
                break;
            }
        }
        this.current = i;
    }
    
}