'use strict'
import { Quest } from "./Quest.js";
import { TheLastResort} from "./TheLastResort.js";

let theLastResort = new TheLastResort();
let quest1 = new Quest(["modify hello = true"])
console.log(quest1);

theLastResort.addQuest(quest1);
theLastResort.executeCmd("modify hello = true");
theLastResort.executeCmd("run repairElectricalSystems.sh");
