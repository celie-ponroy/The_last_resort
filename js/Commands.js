'use strict'

class Command {
    constructor() {
    }
    execute() { }
}

export class Script extends Command {
    constructor() { super() }
    execute(string) {
        // changer avec une liste de script pré définie
        let res = "";
        switch (string.split(" ")[1]) {
            case "altf4.sh":
                res = "Crédits:\n" +
                    "Amaglio Matias: son +\n" +
                    "Arcelin Nino: htlm/scss et devellopement backend\n" +
                    "Ponroy Célie: devellopement backend" +
                    "--------------------------------------------------"
                break;

            case "help.sh":
                res = "HAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                break;
            case "nino.sh":
                res = "nino to the rescue";
            case "matias.sh":
                res = "you bought a cookie to matias he will help you"
                break;
            case "celie.sh":
                res = "its all good celie helped you :)";
                break;

        }
    }
}
/*
export class Variable extends Command{
    constructor(string){super(string)}
    execute(string){
        if(string==this.command){
          return true;
        }
        else
            return false;
    }
}*/


//TODO
export class Nano extends Command {
    constructor() { super() }
    execute(string) {
        if (string) {
            return true;
        }
        else
            return false;
    }
}
//TODO
export class Cd extends Command {
    constructor() { super() }
    execute(string) {
        if (string) {
            return true;
        }
        else
            return false;
    }
}

export class Liste extends Command {
    constructor() { super() }

    execute(dir_array) {

        console.log('test');
        console.log(dir_array);
        for (let i = 0; i < dir_array.length; i++) {
            console.log(dir_array[i]);
        }
    }
}
