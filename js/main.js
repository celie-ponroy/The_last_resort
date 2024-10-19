'use strict'
import { Quest } from "./Quest.js";
import { TheLastResort } from "./TheLastResort.js";

let theLastResort = new TheLastResort();
let quest1 = new Quest(["modify hello = true","run repairElectricalSystems.sh"])
 
theLastResort.addQuest(quest1);
console.log("executed "+quest1.executed);
console.log("finished "+quest1.finished);
theLastResort.executeCmd("modify hello = true");
console.log("executed "+quest1.executed);
console.log("finished "+quest1.finished);
theLastResort.executeCmd("run repairElectricalSystems.sh");
console.log("executed "+quest1.executed);
console.log("finished "+quest1.finished);


theLastResort.executeCmd('ls');

