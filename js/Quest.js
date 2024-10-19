'use strict'

export class Quest{

    constructor(){
        this.finished = false;
        this.commands = new Array();
    }

    addCommand(command){
        this.commands.push(command);
    }
    executeCmd(string){
        if(!this.finished){
            let i;
            for(i = 0; i<this.commands.length ; i++){
                if(this.commands[i].executed==false){
                    break;
                }
            }
            console.log("iiii :" + i)
            this.commands[i].execute(string);
        }
        
    }
     getFinished(){
        return this.finished;
    }



}