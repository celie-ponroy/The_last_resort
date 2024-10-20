"use strict";
(() => {
  // js/Quest.js
  var Quest = class {
    constructor(name = "Quest", commandsParam = []) {
      this.name = name;
      this.finished = false;
      this.executed = [];
      for (let i = 0; i < commandsParam.length; i++) {
        this.executed[i] = false;
      }
      this.commands = commandsParam;
    }
    getFinished() {
      return this.finished;
    }
    getCurrent() {
      let i;
      for (i = 0; i < this.commands.length; i++) {
        if (this.executed[i] == false) {
          return i;
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
    checkVar(string) {
      let equal = this.compareCommands(string);
      if (equal) {
        this.executed[this.getCurrent()] = true;
        this.updateStatus();
      }
      return equal;
    }
    checkScript(command2) {
      let equal = this.compareCommands(command2);
      if (equal) {
        this.executed[this.getCurrent()] = true;
        this.updateStatus();
      }
      return equal;
    }
    compareCommands(string) {
      let string1 = string.replace(/\s+/g, " ").trim();
      let cmdCur = this.commands[this.getCurrent()];
      let string2 = cmdCur.replace(/\s+/g, " ").trim();
      return string1 === string2;
    }
    checkPathToConf(path) {
      let equal = this.compareCommands(command);
      if (equal) {
        this.executed[this.getCurrent()] = true;
        this.updateStatus();
      }
      return equal;
    }
    compareContentFiles(str1, str2) {
      const normalizeString = (str) => {
        if (typeof str !== "string") return "";
        return str.trim().toLowerCase().replace(/\s+/g, " ").replace(/[\r\n]+/g, " ");
      };
      return normalizeString(str1) === normalizeString(str2);
    }
    checkEdit(file) {
      let command2 = this.commands[this.getCurrent()];
      let res = false;
      if (command2.includes(".")) {
        let compareTo;
        switch (file.file_name) {
          case "test.txt":
            compareTo = test;
            break;
          case "test2.txt":
            compareTo = test2;
            break;
          case "navigation_config.json":
            compareTo = configFile;
            break;
          case "temperature_readings.json":
            compareTo = temperatureFile;
            break;
        }
        res = this.compareContentFiles(compareTo, file.file_content);
        const normalizeString = (str) => {
          if (typeof str !== "string") return "";
          return str.trim().toLowerCase().replace(/\s+/g, " ").replace(/[\r\n]+/g, " ");
        };
        if (res) {
          this.executed[this.getCurrent()] = true;
          this.updateStatus();
        }
      }
      return res;
    }
    checkCD(string) {
      let equal = this.compareCommands(string);
      if (equal) {
        this.executed[this.getCurrent()] = true;
        this.updateStatus();
      }
      return equal;
    }
  };
  var test = `udp        tpi_clts      v     inet     udp     -       -
    tcp        tpi_cots_ord  v     inet     tcp     -       -
    udp6       tpi_clts      v     inet6    udp     -       -
    tcp6       tpi_cots_ord  v     inet6    tcp     -       -
    rawip      tpi_raw       -     inet      -      -       -
    local      tpi_cots_ord  V     loopback  -      -       -
    unix       tpi_cots_ord  -     loopback  -      -       -`;
  var test2 = `TO DO LIST:
- by some pasta
- finish the code`;
  var configFile = `{
    "navigation_system": "autonomous",
    "waypoint_threshold": 0.5,
    "max_speed": 3.5,
    "obstacle_detection": true
}`;
  var temperatureFile;
  temperatureFile = `{
    "readings": [
        {"timestamp": "2024-10-20T12:00:00Z", "temperature": +50},
        {"timestamp": "2024-10-20T12:10:00Z", "temperature": +49.5},
        {"timestamp": "2024-10-20T12:20:00Z", "temperature": +49.0}
    ]
}`;

  // js/Arborescence.js
  var Directory = class _Directory {
    constructor(dir_name, dir_parent) {
      this.dir_name = dir_name;
      this.dir_parent = dir_parent;
      this.dir_array = [];
    }
    addToDirectory(child) {
      this.dir_array.push(child);
    }
    deleteFromDirectory(child) {
      if (child.includes(".")) {
        let file = this.getFileByName(child);
        if (file !== null) {
          const index = this.dir_array.indexOf(file);
          if (index !== -1) {
            this.dir_array.splice(index, 1);
            console.log(`${child} a \xE9t\xE9 supprim\xE9 du r\xE9pertoire.`);
          }
        } else {
          console.log(`${child} n'existe pas dans ce r\xE9pertoire.`);
        }
      } else {
        let directory = this.getDirectoryByName(child);
        if (directory !== null) {
          const index = this.dir_array.indexOf(directory);
          if (index !== -1) {
            this.dir_array.splice(index, 1);
            console.log(`${child} a \xE9t\xE9 supprim\xE9 du r\xE9pertoire.`);
          }
        } else {
          console.log(`Le r\xE9pertoire ${child} n'existe pas dans ce r\xE9pertoire.`);
        }
      }
    }
    getDirectoryByName(name_dir) {
      let retour = null;
      for (let i = 0; i < this.dir_array.length; i++) {
        if (this.dir_array[i] instanceof _Directory && this.dir_array[i].dir_name == name_dir) {
          retour = this.dir_array[i];
        }
      }
      return retour;
    }
    getFileByName(name_file) {
      let retour = null;
      for (let i = 0; i < this.dir_array.length; i++) {
        if (this.dir_array[i] instanceof File && this.dir_array[i].file_name == name_file) {
          retour = this.dir_array[i];
        }
      }
      return retour;
    }
    toString() {
      let result = `${this.dir_name}`;
      for (let item of this.dir_array) {
        if (item instanceof _Directory) {
          result += `  ${item.dir_name}
`;
        }
      }
      return result;
    }
  };
  var File = class {
    constructor(file_name) {
      this.file_name = file_name;
      this.file_content = "";
    }
    editFile(content) {
      this.file_content = content;
    }
    toString(level = 0) {
      let indent = "  ".repeat(level);
      return `${indent} ${this.file_name}`;
    }
  };
  var main_directory = new Directory("SpaceRobot", null);
  main_directory.addToDirectory(new Directory("Navigation", main_directory));
  main_directory.addToDirectory(new Directory("Communication", main_directory));
  main_directory.addToDirectory(new Directory("Data", main_directory));
  main_directory.addToDirectory(new Directory("Maintenance", main_directory));
  main_directory.addToDirectory(new Directory("Science", main_directory));
  var pathfinding_directory = new Directory("Pathfinding", main_directory.getDirectoryByName("Navigation"));
  main_directory.getDirectoryByName("Navigation").addToDirectory(pathfinding_directory);
  pathfinding_directory.addToDirectory(new File("astar_algorithm.py"));
  pathfinding_directory.addToDirectory(new File("waypoint_coordinates.csv"));
  var telemetry_directory = new Directory("Telemetry", main_directory.getDirectoryByName("Communication"));
  main_directory.getDirectoryByName("Communication").addToDirectory(telemetry_directory);
  telemetry_directory.addToDirectory(new File("signal_logs.txt"));
  telemetry_directory.addToDirectory(new File("transmission_report.csv"));
  var sensor_data_directory = new Directory("Sensor", main_directory.getDirectoryByName("Data"));
  main_directory.getDirectoryByName("Data").addToDirectory(sensor_data_directory);
  sensor_data_directory.addToDirectory(new File("temperature_readings.json"));
  sensor_data_directory.addToDirectory(new File("pressure_readings.json"));
  var repair_directory = new Directory("Repair", main_directory.getDirectoryByName("Maintenance"));
  main_directory.getDirectoryByName("Maintenance").addToDirectory(repair_directory);
  repair_directory.addToDirectory(new File("tool_inventory.txt"));
  repair_directory.addToDirectory(new File("repair_manual.pdf"));
  var experiments_directory = new Directory("Experiments", main_directory.getDirectoryByName("Science"));
  main_directory.getDirectoryByName("Science").addToDirectory(experiments_directory);
  experiments_directory.addToDirectory(new File("gravity_test_results.txt"));
  experiments_directory.addToDirectory(new File("sample_analysis.csv"));
  var configFile2 = new File("navigation_config.json");
  configFile2.editFile(`{
    "navigation_system": "autonomous",
    "waypoint_threshold": 0.5,
    "max_speed": 2.5,
    "obstacle_detection": true
}`);
  var orientation_log = new File("orientation.log");
  orientation_log.editFile(`<20/10/2024> - D\xE9but de l'analyse de l'ast\xE9ro\xEFde 234 dans la ceinture principale.
\xC9tat du syst\xE8me : OK

<20/10/2024 14:00 UTC> - Orientation initiale r\xE9gl\xE9e \xE0 45\xB0N, 30\xB0E.
Donn\xE9es : D\xE9rive due \xE0 l'attraction gravitationnelle locale d\xE9tect\xE9e.

<20/10/2024 14:15 UTC> - R\xE9ajustement \xE0 50\xB0N, 25\xB0E.
Observation : Stabilisation r\xE9ussie, temp\xE9rature de surface enregistr\xE9e.

<20/10/2024 14:20 UTC> - Scan LIDAR actif.
\xC9tat du syst\xE8me : OK
Orientation : 55\xB0N, 20\xB0E. Structures g\xE9ologiques identifi\xE9es.

<20/10/2024 14:25 UTC> - Donn\xE9es collect\xE9es : \xE9l\xE9vation max de 15 m\xE8tres, composition silicate/m\xE9tal.
Ajustement : 60\xB0N, 15\xB0E pour images haute r\xE9solution.

<20/10/2024 14:30 UTC> - Analyse termin\xE9e, donn\xE9es envoy\xE9es \xE0 la base.
Statut : En attente de nouvelles instructions.

<20/10/2024 18:24 UTC> - Collision avec la Terre Iminent
\xC9tat du syst\xE8me : <!> PROBLEME <!>`);
  main_directory.getDirectoryByName("Navigation").addToDirectory(orientation_log);
  main_directory.getDirectoryByName("Navigation").addToDirectory(configFile2);
  var temperatureFile2 = sensor_data_directory.getFileByName("temperature_readings.json");
  temperatureFile2.editFile(`{
    "readings": [
        {"timestamp": "2024-10-20T12:00:00Z", "temperature": -50},
        {"timestamp": "2024-10-20T12:10:00Z", "temperature": -49.5},
        {"timestamp": "2024-10-20T12:20:00Z", "temperature": -49.0}
    ]
}`);
  sensor_data_directory.addToDirectory(new File("humidity_readings.json"));
  console.log(main_directory.toString());

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
          res = "Cr\xE9dits:\nAmaglio Matias: son \nArcelin Nino: htlm/scss et devellopement backend\nPonroy C\xE9lie: devellopement backend--------------------------------------------------";
          break;
        case "help.sh":
          res = "HAAAAAAAAAAAAAAAAAAAAAAAAAAA";
          break;
        case "nino.sh":
          res = "nino to the rescue";
          break;
        case "matias.sh":
          res = "you bought a cookie to matias he will help you";
          break;
        case "celie.sh":
          res = "its all good celie helped you :)";
          break;
        case "repairPropellers.sh":
        case "repairBattery.sh":
        case "repairTankLeaks.sh":
        case "repairElectricalSystems.sh":
          res = "repairing ...\nrepaired !";
          break;
      }
      return res;
    }
  };
  var Edit = class extends Command {
    constructor() {
      super();
    }
    execute(file_name, current_dir) {
      const list = document.getElementById("scrollable-list");
      list.style.display = "none";
      let file = current_dir.getFileByName(file_name);
      if (file && file.file_content !== void 0) {
        const label = document.querySelector('label[for="user-input"]');
        label.textContent = "Edition Mode :";
        const input = document.getElementById("user-input");
        const textarea = document.getElementById("editable-textarea");
        const savebutton = document.getElementById("save-button");
        input.style.display = "none";
        textarea.style.display = "block";
        savebutton.style.display = "block";
        textarea.value = file.file_content;
        return file;
      } else {
        console.error("Fichier non trouv\xE9 ou vide.");
      }
    }
  };
  var Create = class extends Command {
    constructor() {
      super();
    }
    execute(argument, current_dir) {
      if (argument.includes(".")) {
        console.log("L'argument contient un point.");
        current_dir.addToDirectory(new File(argument));
      } else {
        console.log("L'argument ne contient pas de point.");
        current_dir.addToDirectory(new Directory(argument, current_dir));
      }
    }
  };
  var Delete = class extends Command {
    constructor() {
      super();
    }
    execute(argument, current_dir) {
      current_dir.deleteFromDirectory(argument);
    }
  };
  var Cd = class extends Command {
    constructor() {
      super();
    }
    execute(argument, current_dir) {
      switch (argument) {
        case "..":
          return current_dir.dir_parent;
        default:
          return current_dir.getDirectoryByName(argument);
      }
    }
  };
  var Liste = class extends Command {
    constructor() {
      super();
    }
    execute(dir_array) {
      let retour = "";
      for (let i = 0; i < dir_array.length; i++) {
        if (dir_array[i] instanceof Directory)
          retour += dir_array[i].dir_name + " | ";
        else
          retour += dir_array[i].file_name + " | ";
      }
      return retour;
    }
  };

  // js/TheLastResort.js
  var TheLastResort = class {
    constructor() {
      this.current_dir = main_directory;
      this.current_file = "";
      this.current = 0;
      this.quests = [];
      this.now = 0;
      this.initial = 0;
      this.countDownDate = 0;
      this.timeleft = 0;
      this.initTimer(5);
    }
    addQuest(quest) {
      this.updateCurrent();
      this.quests.push(quest);
      this.initNameQuestsUI(quest);
    }
    executeCmd(string = "") {
      let editabletextarea = document.getElementById("editable-textarea");
      if (editabletextarea.style.display !== "block") {
        this.addcommandToUI(string);
        let command2 = string.split(" ");
        switch (command2[0]) {
          case "edit":
            if (command2[1].includes(".")) {
              this.current_file = new Edit().execute(command2[1], this.current_dir);
            } else
              this.addResultToUI("Something went wrong :(");
            break;
          case "modify":
            this.quests[this.current].checkVar(string);
            this.clearPrompt();
            break;
          case "create":
            new Create().execute(command2[1], this.current_dir);
            this.clearPrompt();
            break;
          case "delete":
            new Delete().execute(command2[1], this.current_dir);
            this.clearPrompt();
            break;
          case "ls":
            this.addResultToUI(new Liste().execute(this.current_dir.dir_array));
            this.clearPrompt();
            break;
          case "cd":
            let cd = new Cd();
            let new_current_dir = cd.execute(command2[1], this.current_dir);
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
        document.getElementById("user-input").style.display = "";
        document.getElementById("user-input").value = "";
        document.getElementById("save-button").style.display = "none";
        const label = document.querySelector('label[for="user-input"]');
        label.textContent = "";
        document.getElementById("scrollable-list").style.display = "block";
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
    addcommandToUI(command2) {
      const ulElement = document.querySelector(".screen ul");
      const newListItem = document.createElement("li");
      newListItem.textContent = command2;
      ulElement.appendChild(newListItem);
    }
    addResultToUI(command2) {
      const ulElement = document.querySelector(".screen ul");
      const newItem = document.createElement("p");
      newItem.textContent = command2;
      ulElement.appendChild(newItem);
    }
    replaceUI(string = "") {
      const ulElement = document.querySelector(".screen ul");
      const finishText = document.createElement("p");
      finishText.textContent = string;
      ulElement.replaceChildren(finishText);
    }
    nameQuestsUI() {
      let questElements = document.getElementById("list-quest");
      console.log("questElements" + questElements);
      let i = 0;
      this.quests.forEach((quest) => {
        let li = document.createElement("li");
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
      let questElements = document.getElementById("list-quest");
      let li = document.createElement("li");
      console.log("li ; " + li);
      li.innerHTML = `
            <div class="checkbox-wrapper-19">
                <input type="checkbox" id="${i}" disabled />
                <label for="${i}" class="check-box"></label>
            </div>
            ${quest.name}`;
      questElements.appendChild(li);
    }
    updateQuestUI() {
      for (let index = 0; index < this.quests.length; index++) {
        let checkbox = document.getElementById(index + 1);
        checkbox.checked = this.quests[index].getFinished();
      }
    }
    finish(win) {
      if (!win) {
        this.replaceUI("Oh no the robot was exploded :(  the atmosphere will still be dirty");
      }
      if (win)
        this.replaceUI("Well done you saved the earth!!");
    }
    clearPrompt() {
      const form = document.querySelector("#user-form");
      form.reset();
    }
    // Initialize Timer
    initTimer(timeinitial) {
      this.timeinitial = timeinitial;
      this.now = (/* @__PURE__ */ new Date()).getTime();
      this.countDownDate = this.now + this.timeinitial * 6e4;
      this.timerInterval = setInterval(() => this.updateTimer(), 1e3);
    }
    // Update Timer
    updateTimer() {
      this.now = (/* @__PURE__ */ new Date()).getTime();
      this.timeleft = this.countDownDate - this.now;
      let minutes = Math.floor(this.timeleft % (1e3 * 60 * 60) / (1e3 * 60));
      let seconds = Math.floor(this.timeleft % (1e3 * 60) / 1e3);
      let time = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
      document.getElementById("timer-value").innerHTML = time;
      if (this.timeleft <= 0) {
        document.getElementById("timer-value").innerHTML = "00:00";
        this.stopTimer();
        this.finish(false);
      }
    }
    // Stop Timer
    stopTimer() {
      clearInterval(this.timerInterval);
    }
  };

  // js/main.js
  var theLastResort = new TheLastResort();
  var quest1 = new Quest("Corriger le syst\xE8me \xE9letrique du vaisseau", ["modify electricty_enable = true", "run repairElectricalSystems.sh"]);
  var quest2 = new Quest("Contr\xF4ler le syst\xE8me d'orientation du vaisseau", ["modify orientation_up = true", "run celie.sh"]);
  var quest3 = new Quest("Ajout du fichier de configuration des propulseurs", ["run repairPropellers.sh", "cd Navigation", "edit navigation_conf.json"]);
  var quest4 = new Quest("Ajustement temp\xE9rature systeme", ["cd Data", "cd Sensor", "edit temperature_readings.json"]);
  theLastResort.addQuest(quest1);
  theLastResort.addQuest(quest2);
  theLastResort.addQuest(quest3);
  theLastResort.addQuest(quest4);
  function scrollToBottom() {
    const list = document.getElementById("scrollable-list");
    list.scrollTop = list.scrollHeight;
  }
  theLastResort.updateQuestUI();
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#user-form");
    const userInput = document.querySelector("#user-input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValue = userInput.value;
      theLastResort.executeCmd(inputValue);
      scrollToBottom();
    });
  });
})();
