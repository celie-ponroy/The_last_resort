'use strict'

export class Quest{

    constructor(commandsParam=[]){
        this.finished = false;
        //this.commands = new Array();
        //list string 
        //list bool
        this.executed = [];
        for (let i = 0; i < commandsParam.length ; i++){
            this.executed[i] = false; // at first nothing is executed
        }
        this.commands = commandsParam;


    }

    /*addCommand(command){
        this.commands.push(command);
    }*/
   /*
    executeCmd(string){
        if(!this.finished){
            let i = this.getCurrent();
            this.commands[i].execute(string);
        }
    }*/

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

    /*checkVar(string){
        let string1 = new String(string).replace(/\s+/g, ' ').trim();
        let cmdCur =  new String(this.commands[this.getCurrent()]);
        let string2 =cmdCur.replace(/\s+/g, ' ').trim();
        console.log("list commnades "+ this.commands);
        console.log("cmdCur" + cmdCur);
        console.log("listString" + string);
        if(string1== string2){
            return true;
        }
        return false;
    }*/
        checkVar(string) {
            let string1 = string.replace(/\s+/g, ' ').trim();
            let cmdCur = this.commands[this.getCurrent()];
            let string2 = cmdCur.replace(/\s+/g, ' ').trim();
            if(string1 === string2){
                this.executed[this.getCurrent()]= true;
                this.updateStatus();
            }
            
            return string1 === string2;
        }
        
}