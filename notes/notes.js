const fs = require("fs")
const yargs = require("yargs")
const chalk = require("chalk")

const getNotes = () => {
    return 'Your Notes....'
}

//ADD NOTES
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note successfully added!')
    }else{
        console.log('Note title taken!')
    }
}

//REMOVE NOTES
const removeNote = (title) =>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Note " + chalk.bold(title.toUpperCase()) + " removed!"))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse("Note " + chalk.bold(title.toUpperCase()) + " not found."))
    }
    
}

//LIST NOTES

const listNotes = () => {
    console.log(chalk.white.inverse.bold('YOUR NOTES \n'))
    const notes = loadNotes().forEach((note) => console.log(note.title + "\n"))
}

//SAVE NOTES
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//READ NOTE
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.bold(note.title) + "\n" + note.body)
    }else{
        console.log('Note not found, please try again.')
    }
}

//LOAD NOTES FROM JSON
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

yargs.parse()