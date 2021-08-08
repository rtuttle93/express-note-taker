const { json } = require('body-parser');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);


class Store {
    readNotes() {
        return read('db/db.json', 'utf8');
    }
    writeNotes(notes) {
        return write('db/db.json', JSON.stringify(notes))
    }
    getNotes() {
        return this.readNotes().then(notes => {
            let storedNotes;
            try {
                storedNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                storedNotes = []
            }
            return storedNotes
        })
    }
    // Unique ID per note
    addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Please fill in all areas before saving");
        }
        const newNote = { title, text, id: uuidv4() }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNote => this.writeNotes(updateNote))
            .then(() => newNote)
    }
}
module.exports = new Store();