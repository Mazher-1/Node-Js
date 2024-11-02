const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const notesFilePath = 'notes.json';
let notes = [];

const loadNotes = () => {
    if (fs.existsSync(notesFilePath)) {
        const data = fs.readFileSync(notesFilePath, 'utf-8');
        notes = JSON.parse(data);
    }
};

const saveNotes = () => {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
};

const addNote = (note) => {
    notes.push(note);
    saveNotes();
    console.log(`Note added: "${note}"`);
};

const listNotes = () => {
    if (notes.length === 0) {
        console.log('No notes found.');
    } else {
        console.log('Your notes:');
        notes.forEach((note, index) => {
            console.log(`${index + 1}: ${note}`);
        });
    }
};

const deleteNote = (index) => {
    if (index < 1 || index > notes.length) {
        console.log('Invalid note number.');
    } else {
        const removedNote = notes.splice(index - 1, 1);
        saveNotes();
        console.log(`Note deleted: "${removedNote}"`);
    }
};

const main = () => {
    loadNotes();
    rl.question('Choose an action (add/list/delete/exit): ', (command) => {
        if (command === 'add') {
            rl.question('Enter the note: ', (note) => {
                addNote(note);
                main();
            });
        } else if (command === 'list') {
            listNotes();
            main();
        } else if (command === 'delete') {
            rl.question('Enter note number to delete: ', (num) => {
                deleteNote(parseInt(num));
                main();
            });
        } else if (command === 'exit') {
            console.log('Goodbye!');
            rl.close();
        } else {
            console.log('Unknown command. Please try again.');
            main();
        }
    });
};

main();
