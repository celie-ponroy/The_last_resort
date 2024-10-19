'use strict'
import { Command } from "./Commands.js";
import { Quest } from "./Quest.js";
import { TheLastResort} from "./TheLastResort.js";

let theLastResort = new TheLastResort();
let quest1 = new Quest();
let cmd1 = new Command("hello");
quest1.addCommand(cmd1);
theLastResort.addQuest(quest1);
theLastResort.executeCmd("hello");