'use strict'

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
        console.log(this.quests);
        console.log(this.current);
        this.quests[this.current].executeCmd(string);
        this.updateCurrent();

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