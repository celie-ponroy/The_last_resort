"use strict"; (() => {
    var l = class { constructor(e = "Quest", t = []) { this.name = e, this.finished = !1, this.executed = []; for (let r = 0; r < t.length; r++)this.executed[r] = !1; this.commands = t } getFinished() { return this.finished } getCurrent() { let e; for (e = 0; e < this.commands.length; e++)if (this.executed[e] == !1) return e; return e } updateStatus() { for (let e = 0; e < this.commands.length; e++)if (this.executed[e] == !1) { this.finished = !1; return } this.finished = !0 } checkVar(e) { let t = this.compareCommands(e); return t && (this.executed[this.getCurrent()] = !0, this.updateStatus()), t } checkScript(e) { let t = this.compareCommands(e); return t && (this.executed[this.getCurrent()] = !0, this.updateStatus()), t } compareCommands(e) { let t = e.replace(/\s+/g, " ").trim(), s = this.commands[this.getCurrent()].replace(/\s+/g, " ").trim(); return t === s } checkPathToConf(e) { let t = this.compareCommands(command); return t && (this.executed[this.getCurrent()] = !0, this.updateStatus()), t } compareContentFiles(e, t) { let r = s => typeof s != "string" ? "" : s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[\r\n]+/g, " "); return r(e) === r(t) } checkEdit(e) { let t = this.commands[this.getCurrent()], r = !1; if (t.includes(".")) { let s; switch (e.file_name) { case "test.txt": s = A; break; case "test2.txt": s = N; break; case "navigation_config.json": s = q; break; case "temperature_readings.json": s = k; break }r = this.compareContentFiles(s, e.file_content); let u = d => typeof d != "string" ? "" : d.trim().toLowerCase().replace(/\s+/g, " ").replace(/[\r\n]+/g, " "); r && (this.executed[this.getCurrent()] = !0, this.updateStatus()) } return r } checkCD(e) { let t = this.compareCommands(e); return t && (this.executed[this.getCurrent()] = !0, this.updateStatus()), t } }, A = `udp        tpi_clts      v     inet     udp     -       -
    tcp        tpi_cots_ord  v     inet     tcp     -       -
    udp6       tpi_clts      v     inet6    udp     -       -
    tcp6       tpi_cots_ord  v     inet6    tcp     -       -
    rawip      tpi_raw       -     inet      -      -       -
    local      tpi_cots_ord  V     loopback  -      -       -
    unix       tpi_cots_ord  -     loopback  -      -       -`, N = `TO DO LIST:
- by some pasta
- finish the code`, q = `{
    "navigation_system": "autonomous",
    "waypoint_threshold": 0.5,
    "max_speed": 3.5,
    "obstacle_detection": true
}`, k; k = `{
    "readings": [
        {"timestamp": "2024-10-20T12:00:00Z", "temperature": +50},
        {"timestamp": "2024-10-20T12:10:00Z", "temperature": +49.5},
        {"timestamp": "2024-10-20T12:20:00Z", "temperature": +49.0}
    ]
}`; var a = class n {
        constructor(e, t) { this.dir_name = e, this.dir_parent = t, this.dir_array = [] } addToDirectory(e) { this.dir_array.push(e) } deleteFromDirectory(e) { if (e.includes(".")) { let t = this.getFileByName(e); if (t !== null) { let r = this.dir_array.indexOf(t); r !== -1 && (this.dir_array.splice(r, 1), console.log(`${e} a \xE9t\xE9 supprim\xE9 du r\xE9pertoire.`)) } else console.log(`${e} n'existe pas dans ce r\xE9pertoire.`) } else { let t = this.getDirectoryByName(e); if (t !== null) { let r = this.dir_array.indexOf(t); r !== -1 && (this.dir_array.splice(r, 1), console.log(`${e} a \xE9t\xE9 supprim\xE9 du r\xE9pertoire.`)) } else console.log(`Le r\xE9pertoire ${e} n'existe pas dans ce r\xE9pertoire.`) } } getDirectoryByName(e) { let t = null; for (let r = 0; r < this.dir_array.length; r++)this.dir_array[r] instanceof n && this.dir_array[r].dir_name == e && (t = this.dir_array[r]); return t } getFileByName(e) { let t = null; for (let r = 0; r < this.dir_array.length; r++)this.dir_array[r] instanceof o && this.dir_array[r].file_name == e && (t = this.dir_array[r]); return t } toString() {
            let e = `${this.dir_name}`; for (let t of this.dir_array) t instanceof n && (e += `  ${t.dir_name}
`); return e
        }
    }, o = class { constructor(e) { this.file_name = e, this.file_content = "" } editFile(e) { this.file_content = e } toString(e = 0) { return `${"  ".repeat(e)} ${this.file_name}` } }, i = new a("SpaceRobot", null); i.addToDirectory(new a("Navigation", i)); i.addToDirectory(new a("Communication", i)); i.addToDirectory(new a("Data", i)); i.addToDirectory(new a("Maintenance", i)); i.addToDirectory(new a("Science", i)); var b = new a("Pathfinding", i.getDirectoryByName("Navigation")); i.getDirectoryByName("Navigation").addToDirectory(b); b.addToDirectory(new o("astar_algorithm.py")); b.addToDirectory(new o("waypoint_coordinates.csv")); var T = new a("Telemetry", i.getDirectoryByName("Communication")); i.getDirectoryByName("Communication").addToDirectory(T); T.addToDirectory(new o("signal_logs.txt")); T.addToDirectory(new o("transmission_report.csv")); var m = new a("Sensor", i.getDirectoryByName("Data")); i.getDirectoryByName("Data").addToDirectory(m); m.addToDirectory(new o("temperature_readings.json")); m.addToDirectory(new o("pressure_readings.json")); var D = new a("Repair", i.getDirectoryByName("Maintenance")); i.getDirectoryByName("Maintenance").addToDirectory(D); D.addToDirectory(new o("tool_inventory.txt")); D.addToDirectory(new o("repair_manual.pdf")); var v = new a("Experiments", i.getDirectoryByName("Science")); i.getDirectoryByName("Science").addToDirectory(v); v.addToDirectory(new o("gravity_test_results.txt")); v.addToDirectory(new o("sample_analysis.csv")); var I = new o("navigation_config.json"); I.editFile(`{
    "navigation_system": "autonomous",
    "waypoint_threshold": 0.5,
    "max_speed": 2.5,
    "obstacle_detection": true
}`); var E = new o("orientation.log"); E.editFile(`<20/10/2024> - D\xE9but de l'analyse de l'ast\xE9ro\xEFde 234 dans la ceinture principale.
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
\xC9tat du syst\xE8me : <!> PROBLEME <!>`); i.getDirectoryByName("Navigation").addToDirectory(E); i.getDirectoryByName("Navigation").addToDirectory(I); var U = m.getFileByName("temperature_readings.json"); U.editFile(`{
    "readings": [
        {"timestamp": "2024-10-20T12:00:00Z", "temperature": -50},
        {"timestamp": "2024-10-20T12:10:00Z", "temperature": -49.5},
        {"timestamp": "2024-10-20T12:20:00Z", "temperature": -49.0}
    ]
}`); m.addToDirectory(new o("humidity_readings.json")); console.log(i.toString()); var c = class { constructor() { } execute() { } }, p = class extends c {
        constructor() { super() } execute(e) {
            let t = ""; switch (e.split(" ")[1]) {
                case "altf4.sh": t = `Cr\xE9dits:
Amaglio Matias: son 
Arcelin Nino: htlm/scss et devellopement backend
Ponroy C\xE9lie: devellopement backend--------------------------------------------------`; break; case "help.sh": t = "HAAAAAAAAAAAAAAAAAAAAAAAAAAA"; break; case "nino.sh": t = "nino to the rescue"; break; case "matias.sh": t = "you bought a cookie to matias he will help you"; break; case "celie.sh": t = "its all good celie helped you :)"; case "valentin.sh": t = "mini panier de basket :0"; break; case "celien.sh": t = "LA PUISSANCE DU NOMBRILAX"; break; case "shieldDiagnostic.sh": t = "Shield power too low, 'shield_strength' must be at 100"; break; case "repairPropellers.sh": case "fuelBalance.sh": case "calibrateGravity.sh": case "syncCommSystem.sh": case "repairBattery.sh": case "repairTankLeaks.sh": case "repairElectricalSystems.sh": t = `repairing ...
repaired !`; break
            }return t
        }
    }, y = class extends c { constructor() { super() } execute(e, t) { let r = document.getElementById("scrollable-list"); r.style.display = "none"; let s = t.getFileByName(e); if (s && s.file_content !== void 0) { let u = document.querySelector('label[for="user-input"]'); u.textContent = "Edition Mode :"; let d = document.getElementById("user-input"), h = document.getElementById("editable-textarea"), B = document.getElementById("save-button"); return d.style.display = "none", h.style.display = "block", B.style.display = "block", h.value = s.file_content, s } else console.error("Fichier non trouv\xE9 ou vide.") } }, g = class extends c { constructor() { super() } execute(e, t) { e.includes(".") ? (console.log("L'argument contient un point."), t.addToDirectory(new o(e))) : (console.log("L'argument ne contient pas de point."), t.addToDirectory(new a(e, t))) } }, f = class extends c { constructor() { super() } execute(e, t) { t.deleteFromDirectory(e) } }, _ = class extends c { constructor() { super() } execute(e, t) { switch (e) { case "..": return t.dir_parent; default: return t.getDirectoryByName(e) } } }, x = class extends c { constructor() { super() } execute(e) { let t = ""; for (let r = 0; r < e.length; r++)e[r] instanceof a ? t += e[r].dir_name + " | " : t += e[r].file_name + " | "; return t } }; var S = 1, w = class {
        constructor() { this.current_dir = i, this.current_file = "", this.current = 0, this.quests = [], this.now = 0, this.initial = 0, this.countDownDate = 0, this.timeleft = 0, this.initTimer(15) } addQuest(e) { this.updateCurrent(), this.quests.push(e), this.initNameQuestsUI(e) } executeCmd(e = "") { let t = document.getElementById("editable-textarea"); if (t.style.display !== "block") { this.addcommandToUI(e); let r = e.split(" "); switch (r[0]) { case "edit": this.current_dir.getFileByName(r[1]) ? this.current_file = new y().execute(r[1], this.current_dir) : this.addResultToUI("Something went wrong :("); break; case "modify": this.quests[this.current].checkVar(e), this.clearPrompt(); break; case "create": new g().execute(r[1], this.current_dir), this.clearPrompt(); break; case "delete": new f().execute(r[1], this.current_dir), this.clearPrompt(); break; case "ls": this.addResultToUI(new x().execute(this.current_dir.dir_array)), this.clearPrompt(); break; case "cd": let u = new _().execute(r[1], this.current_dir); console.log(u), u == null ? this.addResultToUI("Something went wrong :(") : (this.current_dir = u, this.quests[this.current].checkCD(e)), this.clearPrompt(); break; case "run": let h = new p().execute(e); this.quests[this.current].checkScript(e), this.addResultToUI(h), this.clearPrompt(); break; case "clear": this.replaceUI(); break } } else { this.current_file.editFile(t.value), t.value = "", t.style.display = "none", document.getElementById("user-input").style.display = "", document.getElementById("user-input").value = "", document.getElementById("save-button").style.display = "none"; let r = document.querySelector('label[for="user-input"]'); r.textContent = "", document.getElementById("scrollable-list").style.display = "block", this.quests[this.current].checkEdit(this.current_file), this.addResultToUI("File edited :)") } this.updateCurrent(), this.updateQuestUI(), this.updateStatus() } updateCurrent() { let e = 0; for (e = 0; e < this.quests.length && this.quests[e].getFinished() != !1; e++); this.current = e } updateStatus() { for (let e = 0; e < this.quests.length; e++)if (this.quests[e].getFinished() == !1) return; this.stopTimer(), this.finish(!0) } addcommandToUI(e) { let t = document.querySelector(".screen ul"), r = document.createElement("li"); r.textContent = e, t.appendChild(r) } addResultToUI(e) { let t = document.querySelector(".screen ul"), r = document.createElement("p"); r.textContent = e, t.appendChild(r) } replaceUI(e = "") { let t = document.querySelector(".screen ul"), r = document.createElement("p"); r.textContent = e, t.replaceChildren(r) } nameQuestsUI() {
            let e = document.getElementById("list-quest"); console.log("questElements" + e); let t = 0; this.quests.forEach(r => {
                let s = document.createElement("li"); console.log("li ; " + s), s.innerHTML = `
                <div class="checkbox-wrapper-19">
                    <input type="checkbox" id="${t + 1}" />
                    <label for="${t + 1}" class="check-box"></label>
                </div>
                ${r.name}`, e.appendChild(s), t++
            })
        } initNameQuestsUI(e) {
            let t = this.quests.length, r = document.getElementById("list-quest"), s = document.createElement("li"); console.log("li ; " + s), s.innerHTML = `
            <div class="checkbox-wrapper-19">
                <input type="checkbox" id="${t}" disabled />
                <label for="${t}" class="check-box"></label>
            </div>
            ${S + " - " + e.name}`, r.appendChild(s), S++
        } updateQuestUI() { for (let e = 0; e < this.quests.length; e++) { let t = document.getElementById(e + 1); t.checked = this.quests[e].getFinished() } } finish(e) { e || this.replaceUI("Oh no the robot was exploded :(  the atmosphere will still be dirty"), e && this.replaceUI("Well done you saved the earth!!"), this.replaceUI("Your time -->" + this.timeleft) } clearPrompt() { document.querySelector("#user-form").reset() } initTimer(e) { this.timeinitial = e, this.now = new Date().getTime(), this.countDownDate = this.now + this.timeinitial * 6e4, this.timerInterval = setInterval(() => this.updateTimer(), 1e3) } updateTimer() { this.now = new Date().getTime(), this.timeleft = this.countDownDate - this.now; let e = Math.floor(this.timeleft % (1e3 * 60 * 60) / (1e3 * 60)), t = Math.floor(this.timeleft % (1e3 * 60) / 1e3), r = `${e < 10 ? "0" + e : e}:${t < 10 ? "0" + t : t}`; document.getElementById("timer-value").innerHTML = r, this.timeleft <= 0 && (document.getElementById("timer-value").innerHTML = "00:00", this.stopTimer(), this.finish(!1)) } stopTimer() { clearInterval(this.timerInterval) }
    }; var C = new w, F = [new l("Corriger le syst\xE8me \xE9lectrique du vaisseau", ["modify electricity_enable = true", "run repairElectricalSystems.sh"]), new l("Contr\xF4ler le syst\xE8me d'orientation du vaisseau", ["modify orientation_up = true", "run celie.sh"]), new l("Configuration des propulseurs", ["run repairPropellers.sh", "edit navigation_config.json"]), new l("Ajustement temp\xE9rature syst\xE8me", ["edit temperature_readings.json"]), new l("R\xE9gler le niveau de carburant", ["run fuelBalance.sh"]), new l("V\xE9rifier l'int\xE9grit\xE9 du bouclier", ["run shieldDiagnostic.sh", "modify shield_strength = 100"]), new l("Calibrer les senseurs de gravit\xE9", ["run calibrateGravity.sh"]), new l("Synchroniser les syst\xE8mes de communication", ["run syncCommSystem.sh"])]; function L(n, e) { let t = []; for (; t.length < e;) { let r = n[Math.floor(Math.random() * n.length)]; t.includes(r) || t.push(r) } return t } var M = L(F, 4); M.forEach(n => C.addQuest(n)); function $() { let n = document.getElementById("scrollable-list"); n.scrollTop = n.scrollHeight } C.updateQuestUI(); document.addEventListener("DOMContentLoaded", () => { let n = document.querySelector("#user-form"), e = document.querySelector("#user-input"); n.addEventListener("submit", t => { t.preventDefault(); let r = e.value; C.executeCmd(r), $() }) });
})();
//# sourceMappingURL=out.js.map
