'use strict'

const STORAGE_KEY = 'memeDb'
let gSavedMemes = loadFromStorage(STORAGE_KEY) || []

function getSavedMemes() {
    return gSavedMemes
}

function getMemeById(id) {
    return gSavedMemes.find(meme => id === meme.id)
}

function saveMeme() {
    const dataURL = gElCanvas.toDataURL('image/png')
    _createMeme(dataURL)
}

function removeMeme(id) {
    const idx = gSavedMemes.findIndex(meme => id === meme.id)
    if (idx !== -1) gSavedMemes.splice(idx, 1)

    _saveMemeToStorage()
}

function _createMeme(data) {
    gSavedMemes.unshift({ id: getRandomInt(100, 1000), data })
    _saveMemeToStorage()
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}
