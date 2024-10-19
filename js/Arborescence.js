'use strict';


class Directory {

    constructor(dir_name) {
        this.dir_name = dir_name;
        this.dir_array = [];
    }

    addToDirectory(child) {
        this.dir_array.push(child);
    }

    toString(level = 0) {
        let indent = '  '.repeat(level); // Indentation pour la hiérarchie
        let result = `${indent} ${this.dir_name}`;

        // Parcourir les enfants du répertoire
        for (let item of this.dir_array) {
            result += item.toString(level + 1); // Appel récursif pour les sous-répertoires et fichiers
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


export const main_directory = new Directory('User');

main_directory.addToDirectory(new Directory('Downloads'));
main_directory.addToDirectory(new Directory('Pictures'));
main_directory.addToDirectory(new Directory('Documents'));
main_directory.addToDirectory(new Directory('Documents'));

main_directory.addToDirectory(new Directory('Documents'));

main_directory.addToDirectory(new Directory('Documents'));

main_directory.addToDirectory(new Directory('Documents'));

main_directory.addToDirectory(new Directory('Documents'));

main_directory.addToDirectory(new Directory('Documents'));

main_directory.addToDirectory(new File('test.txt'));



