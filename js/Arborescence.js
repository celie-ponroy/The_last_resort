'use strict';


class Directory {

    constructor(dir_name, dir_parent) {
        this.dir_name = dir_name;
        this.dir_parent = dir_parent;
        this.dir_array = [];
    }

    addToDirectory(child) {
        this.dir_array.push(child);
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

class File {

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





export const main_directory = new Directory('User', null);

main_directory.addToDirectory(new Directory('Downloads', main_directory));
main_directory.addToDirectory(new Directory('Pictures'), main_directory);

let document = new Directory('Documents', main_directory);

document.addToDirectory(new File('test2.txt'));


main_directory.addToDirectory(document);
main_directory.addToDirectory(new File('test.txt'));



