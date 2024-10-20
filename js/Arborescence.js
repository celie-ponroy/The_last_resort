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
export const main_directory = new Directory('User', null);

main_directory.addToDirectory(new Directory('Downloads', main_directory));
main_directory.addToDirectory(new Directory('Pictures'), main_directory);

let document = new Directory('Documents', main_directory);

document.addToDirectory(new File('test2.txt'));


main_directory.addToDirectory(document);

let file = new File('test.txt')

file.editFile(`# The network configuration file. This file is currently only used in
    # conjunction with the TI-RPC code in the libtirpc library.
    #
    # Entries consist of:
    #
    #       <network_id> <semantics> <flags> <protofamily> <protoname> \
    #               <device> <nametoaddr_libs>
    #
    # The <device> and <nametoaddr_libs> fields are always empty in this
    # implementation.
    #
    udp        tpi_clts      v     inet     udp     -       -
    tcp        tpi_cots_ord  v     inet     tcp     -       -
    udp6       tpi_clts      v     inet6    udp     -       -
    tcp6       tpi_cots_ord  v     inet6    tcp     -       -
    rawip      tpi_raw       -     inet      -      -       -
    local      tpi_cots_ord  -     loopback  -      -       -
    unix       tpi_cots_ord  -     loopback  -      -       -`);

main_directory.addToDirectory(file);


