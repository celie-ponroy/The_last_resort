'use strict';


class Directory {

    constructor(dir_name) {
        this.dir_name = dir_name;
        this.dir_array = [];
    }

    addToDirectory(child) {

        this.dir_array.push(child);
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

}


export const main_directory = new Directory('User');

main_directory.addToDirectory(new Directory('Downloads'));
main_directory.addToDirectory(new Directory('Pictures'));
main_directory.addToDirectory(new Directory('Documents'));
main_directory.addToDirectory(new File('test.txt'));



