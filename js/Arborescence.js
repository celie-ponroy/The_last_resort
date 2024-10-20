'use strict';


export class Directory {

    constructor(dir_name, dir_parent) {
        this.dir_name = dir_name;
        this.dir_parent = dir_parent;
        this.dir_array = [];
    }

    addToDirectory(child) {
        this.dir_array.push(child);
    }

    deleteFromDirectory(child) {

        if (child.includes('.')) {
            // On suppose que c'est un fichier si ça contient un point (.)
            let file = this.getFileByName(child);

            if (file !== null) {
                // Trouver l'index du fichier et le supprimer
                const index = this.dir_array.indexOf(file);
                if (index !== -1) {
                    this.dir_array.splice(index, 1); // Supprime le fichier
                    console.log(`${child} a été supprimé du répertoire.`);
                }
            } else {
                console.log(`${child} n'existe pas dans ce répertoire.`);
            }

        } else {
            // On suppose que c'est un répertoire si ça ne contient pas de point
            let directory = this.getDirectoryByName(child);

            if (directory !== null) {
                // Trouver l'index du répertoire et le supprimer
                const index = this.dir_array.indexOf(directory);
                if (index !== -1) {
                    this.dir_array.splice(index, 1); // Supprime le répertoire
                    console.log(`${child} a été supprimé du répertoire.`);
                }
            } else {
                console.log(`Le répertoire ${child} n'existe pas dans ce répertoire.`);
            }
        }
    }

    getDirectoryByName(name_dir) {

        let retour = null;
        for (let i = 0; i < this.dir_array.length; i++) {
            if (this.dir_array[i] instanceof Directory && this.dir_array[i].dir_name == name_dir) {
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
        let result = `${this.dir_name}`; // Affiche le nom du répertoire courant avec un saut de ligne

        // Parcourir uniquement les éléments du répertoire courant (sans entrer dans les sous-répertoires)
        for (let item of this.dir_array) {
            if (item instanceof Directory) {
                result += `  ${item.dir_name}\n`; // Affiche le nom du sous-répertoire
            }
        }

        return result;
    }

}

export class File {

    constructor(file_name) {
        this.file_name = file_name;
        this.file_content = "";
    }

    editFile(content) {

        this.file_content = content;
    }

    toString(level = 0) {
        let indent = '  '.repeat(level); // Indentation pour la hiérarchie
        return `${indent} ${this.file_name}`;
    }

}




//arborescence statique
// Arborescence dynamique pour un robot dans l'espace
export const main_directory = new Directory('SpaceRobot', null);

// Répertoires principaux
main_directory.addToDirectory(new Directory('Navigation', main_directory));
main_directory.addToDirectory(new Directory('Communication', main_directory));
main_directory.addToDirectory(new Directory('Data', main_directory));
main_directory.addToDirectory(new Directory('Maintenance', main_directory));
main_directory.addToDirectory(new Directory('Science', main_directory));

// Sous-répertoires dans 'Navigation'
let pathfinding_directory = new Directory('Pathfinding', main_directory.getDirectoryByName('Navigation'));
main_directory.getDirectoryByName('Navigation').addToDirectory(pathfinding_directory);
pathfinding_directory.addToDirectory(new File('astar_algorithm.py'));
pathfinding_directory.addToDirectory(new File('waypoint_coordinates.csv'));

// Sous-répertoires dans 'Communication'
let telemetry_directory = new Directory('Telemetry', main_directory.getDirectoryByName('Communication'));
main_directory.getDirectoryByName('Communication').addToDirectory(telemetry_directory);
telemetry_directory.addToDirectory(new File('signal_logs.txt'));
telemetry_directory.addToDirectory(new File('transmission_report.csv'));

// Sous-répertoires dans 'Data'
let sensor_data_directory = new Directory('Sensor', main_directory.getDirectoryByName('Data'));
main_directory.getDirectoryByName('Data').addToDirectory(sensor_data_directory);
sensor_data_directory.addToDirectory(new File('temperature_readings.json'));
sensor_data_directory.addToDirectory(new File('pressure_readings.json'));

// Sous-répertoires dans 'Maintenance'
let repair_directory = new Directory('Repair', main_directory.getDirectoryByName('Maintenance'));
main_directory.getDirectoryByName('Maintenance').addToDirectory(repair_directory);
repair_directory.addToDirectory(new File('tool_inventory.txt'));
repair_directory.addToDirectory(new File('repair_manual.pdf'));

// Sous-répertoires dans 'Science'
let experiments_directory = new Directory('Experiments', main_directory.getDirectoryByName('Science'));
main_directory.getDirectoryByName('Science').addToDirectory(experiments_directory);
experiments_directory.addToDirectory(new File('gravity_test_results.txt'));
experiments_directory.addToDirectory(new File('sample_analysis.csv'));

// Exemple d'édition d'un fichier dans 'Navigation'
let configFile = new File('navigation_config.json');
configFile.editFile(`{
    "navigation_system": "autonomous",
    "waypoint_threshold": 0.5,
    "max_speed": 2.5,
    "obstacle_detection": true
}`);


let orientation_log = new File('orientation.log');
orientation_log.editFile(`<20/10/2024> - Début de l'analyse de l'astéroïde 234 dans la ceinture principale.
État du système : OK

<20/10/2024 14:00 UTC> - Orientation initiale réglée à 45°N, 30°E.
Données : Dérive due à l'attraction gravitationnelle locale détectée.

<20/10/2024 14:15 UTC> - Réajustement à 50°N, 25°E.
Observation : Stabilisation réussie, température de surface enregistrée.

<20/10/2024 14:20 UTC> - Scan LIDAR actif.
État du système : OK
Orientation : 55°N, 20°E. Structures géologiques identifiées.

<20/10/2024 14:25 UTC> - Données collectées : élévation max de 15 mètres, composition silicate/métal.
Ajustement : 60°N, 15°E pour images haute résolution.

<20/10/2024 14:30 UTC> - Analyse terminée, données envoyées à la base.
Statut : En attente de nouvelles instructions.

<20/10/2024 18:24 UTC> - Collision avec la Terre Iminent
État du système : <!> PROBLEME <!>`);

main_directory.getDirectoryByName('Navigation').addToDirectory(orientation_log);

main_directory.getDirectoryByName('Navigation').addToDirectory(configFile);

// Exemple d'édition de fichier dans 'Data/Sensor Data'
let temperatureFile = sensor_data_directory.getFileByName('temperature_readings.json');
temperatureFile.editFile(`{
    "readings": [
        {"timestamp": "2024-10-20T12:00:00Z", "temperature": -50},
        {"timestamp": "2024-10-20T12:10:00Z", "temperature": -49.5},
        {"timestamp": "2024-10-20T12:20:00Z", "temperature": -49.0}
    ]
}`);

// Ajout d'un autre fichier dans 'Data/Sensor Data'
sensor_data_directory.addToDirectory(new File('humidity_readings.json'));

// Affichage de l'arborescence
console.log(main_directory.toString());

