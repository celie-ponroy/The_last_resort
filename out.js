"use strict";
(() => {
  // js/Commands.js
  var Command = class {
    constructor(string) {
      this.executed = false;
      this.command = string;
    }
    execute(string) {
      if (string == this.command) {
        console.log("CA MARCHE");
      }
    }
  };

  // js/Quest.js
  var Quest = class {
    constructor() {
      this.finished = false;
      this.commands = new Array();
    }
    addCommand(command) {
      this.commands.push(command);
    }
    executeCmd(string) {
      if (!this.finished) {
        for (i = 0; i < this.commands.length; i++) {
          if (cmd.executed == false) {
            i--;
            break;
          }
        }
        this.commands[i].execute(string);
      }
    }
  };

  // js/TheLastResort.js
  var TheLastResort = class {
    constructor() {
      this.current = 0;
      this.quests = new Array();
    }
    addQuests(quest) {
      this.quests.push(quest);
    }
    executeCmd(string = "") {
      this.quests[this.current].executeCmd();
    }
  };

  // js/main.js
  theLastResort = new TheLastResort();
  theLastResort.add(new Quest().addCommand(new Command("hello")));
})();
