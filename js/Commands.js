'use strict'

export class Command {
    constructor(string){
        this.executed = false;
        this.command = string;
    }
    execute(string){
        //TODO
        if(string==this.command){
            console.log("CA MARCHE");
        }
    }

}
class Script extends Command {
    constructor(string){super(string)}
}