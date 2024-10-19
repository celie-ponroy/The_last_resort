"use strict";
(() => {
  // js/Quest.js
  var Quest = class {
    constructor(commandsParam = []) {
      this.finished = false;
      this.executed = [];
      for (let i = 0; i < commandsParam.length; i++) {
        this.executed[i] = false;
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
    getFinished() {
      return this.finished;
    }
    getCurrent() {
      let i;
      for (i = 0; i < this.commands.length; i++) {
        if (this.executed[i] == false) {
          break;
        }
      }
      return i;
    }
    updateStatus() {
      for (let i = 0; i < this.commands.length; i++) {
        if (this.executed[i] == false) {
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
      let string1 = string.replace(/\s+/g, " ").trim();
      let cmdCur = this.commands[this.getCurrent()];
      let string2 = cmdCur.replace(/\s+/g, " ").trim();
      if (string1 === string2) {
        this.executed[this.getCurrent()] = true;
        this.updateStatus();
      }
      return string1 === string2;
    }
  };

  // js/Commands.js
  var Command = class {
    constructor() {
    }
    execute() {
    }
  };
  var Script = class extends Command {
    constructor() {
      super();
    }
    execute(string) {
      let res = "";
      switch (string.split(" ")[1]) {
        case "altf4.sh":
          res = "Cr\xE9dits:\nAmaglio Matias: son +\nArcelin Nino: htlm/scss et devellopement backend\nPonroy C\xE9lie: devellopement backend--------------------------------------------------";
          break;
        case "help.sh":
          res = "HAAAAAAAAAAAAAAAAAAAAAAAAAAA";
          break;
        case "nino.sh":
          res = "nino to the rescue";
        case "matias.sh":
          res = "you bought a cookie to matias he will help you";
          break;
        case "celie.sh":
          res = "its all good celie helped you :)";
          break;
      }
    }
  };
  var Nano = class extends Command {
    constructor() {
      super();
    }
    execute(string) {
      if (string) {
        return true;
      } else
        return false;
    }
  };

  // js/TheLastResort.js
  var TheLastResort = class {
    constructor() {
      this.current = 0;
      this.quests = [];
    }
    addQuest(quest) {
      this.updateCurrent();
      this.quests.push(quest);
    }
    executeCmd(string = "") {
      let command = string.split(" ");
      switch (command[0]) {
        case "nano":
          new Nano().execute(string);
          break;
        case "modify":
          this.quests[this.current].checkVar(string);
          break;
        case "run":
          new Script().execute(string);
          break;
      }
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
  };

  // js/main.js
  var theLastResort = new TheLastResort();
  var quest1 = new Quest(["modify hello = true"]);
  console.log(quest1);
  theLastResort.addQuest(quest1);
  theLastResort.executeCmd("modify hello = true");
})();
