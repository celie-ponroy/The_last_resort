'use strict'

export class Quest{

    constructor(name="Quest",commandsParam=[]){
        this.name = name;
        this.finished = false;
        this.executed = [];
        for (let i = 0; i < commandsParam.length ; i++){
            this.executed[i] = false; // at first nothing is executed
        }
        this.commands = commandsParam;


    }

    getFinished(){
        return this.finished;
    }

    getCurrent(){
        let i;
        for(i = 0; i<this.commands.length ; i++){
            if(this.executed[i]==false){
                break;
            }
        }
        return i;
    }

    updateStatus(){
        for(let i = 0; i < this.commands.length ; i++){
            if(this.executed[i] == false){
                this.finished = false;
                return;
            }
        }
        this.finished = true;
    }

    checkVar(string) {
    let equal = this.compareCommands(string)
    if(equal){
        this.executed[this.getCurrent()]= true;
        this.updateStatus();
    }
    
    return equal;
    }

    checkScript(command){
        let equal = this.compareCommands(command);
        if(equal){
            this.executed[this.getCurrent()]= true;
            this.updateStatus();
        }
    
        return equal;
    }

    compareCommands(string){
        let string1 = string.replace(/\s+/g, ' ').trim();
        let cmdCur = this.commands[this.getCurrent()];
        let string2 = cmdCur.replace(/\s+/g, ' ').trim();

        return string1 === string2;
    }
        
}