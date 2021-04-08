// read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        if (notesJSON !== null) {
            return JSON.parse(notesJSON)
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}

// remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('div')
    const textElement = document.createElement('a')
    const button = document.createElement('button')

    // setup the remove note button
    button.textContent = 'x'
    noteElement.appendChild(button)
    button.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // setup the note tile text
    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        textElement.textContent = 'Unnamed note'
    }
    textElement.setAttribute('href', `edit-note.html#${note.id}`)
    noteElement.appendChild(textElement)

    return noteElement
}

// sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
                return 1
            } else if (a.updatedAt > b.updatedAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return 1
            } else if (a.createdAt > b.createdAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)

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

// generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}