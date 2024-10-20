'use strict'



export class Quest {

    constructor(name = "Quest", commandsParam = []) {
        this.name = name;
        this.finished = false;
        this.executed = [];
        for (let i = 0; i < commandsParam.length; i++) {
            this.executed[i] = false; // at first nothing is executed
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
        return i;//the last by default
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
        let equal = this.compareCommands(string)
        if (equal) {
            this.executed[this.getCurrent()] = true;
            this.updateStatus();
        }

        return equal;
    }

    checkScript(command) {
        let equal = this.compareCommands(command);
        if (equal) {
            this.executed[this.getCurrent()] = true;
            this.updateStatus();
        }

        return equal;
    }

    compareCommands(string) {
        let string1 = string.replace(/\s+/g, ' ').trim();
        let cmdCur = this.commands[this.getCurrent()];
        let string2 = cmdCur.replace(/\s+/g, ' ').trim();

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
            if (typeof str !== 'string') return '';
            return str
                .trim()                                  // Supprime les espaces en début et en fin
                .toLowerCase()                           // Ignore la casse
                .replace(/\s+/g, ' ')                    // Remplace les espaces multiples (y compris tabulations) par un seul espace
                .replace(/[\r\n]+/g, ' ');               // Remplace les retours à la ligne par un espace
        };
        return normalizeString(str1) === normalizeString(str2);
    }
    
    
    checkEdit(file){
        
        let command = this.commands[this.getCurrent()];
        let res = false;
        if(command.includes(".")){
            let compareTo
            switch(file.file_name){
                case 'test.txt':
                    compareTo = test;
                    break;
                case 'test2.txt':    
                    compareTo = test2;
                    break;
                case 'navigation_config.json':
                    compareTo = configFile;
                    break;
                case 'temperature_readings.json':
                    compareTo = temperatureFile;
                    break;

            }
            res = this.compareContentFiles(compareTo,file.file_content);



            const normalizeString = (str) => {
                if (typeof str !== 'string') return '';
                return str
                    .trim()                                  // Supprime les espaces en début et en fin
                    .toLowerCase()                           // Ignore la casse
                    .replace(/\s+/g, ' ')                    // Remplace les espaces multiples (y compris tabulations) par un seul espace
                    .replace(/[\r\n]+/g, ' ');               // Remplace les retours à la ligne par un espace
            };

            if(res){
                this.executed[this.getCurrent()] = true;
                this.updateStatus();
            }  
        }
        return res;
        
    }
    checkCD(string){
        let equal = this.compareCommands(string)
        if (equal) {
            this.executed[this.getCurrent()] = true;
            this.updateStatus();
        }
        return equal;
    }

}
const test = `udp        tpi_clts      v     inet     udp     -       -
    tcp        tpi_cots_ord  v     inet     tcp     -       -
    udp6       tpi_clts      v     inet6    udp     -       -
    tcp6       tpi_cots_ord  v     inet6    tcp     -       -
    rawip      tpi_raw       -     inet      -      -       -
    local      tpi_cots_ord  V     loopback  -      -       -
    unix       tpi_cots_ord  -     loopback  -      -       -`

const test2 = `TO DO LIST:
- by some pasta
- finish the code`;

const configFile = `{
    "navigation_system": "autonomous",
    "waypoint_threshold": 0.5,
    "max_speed": 3.5,
    "obstacle_detection": true
}`;

let temperatureFile; //'temperature_readings.json');
temperatureFile =`{
    "readings": [
        {"timestamp": "2024-10-20T12:00:00Z", "temperature": +50},
        {"timestamp": "2024-10-20T12:10:00Z", "temperature": +49.5},
        {"timestamp": "2024-10-20T12:20:00Z", "temperature": +49.0}
    ]
}`
