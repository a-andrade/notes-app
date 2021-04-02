// read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('p')

    if (note.title.length > 0) {
        noteElement.textContent = note.title
    } else {
        noteElement.textContent = 'Unnamed note'
    }

    return noteElement
}

// render application notes
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach((note) => {
        const noteElement = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteElement)
    })
}

// save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}