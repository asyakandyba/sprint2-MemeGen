'use strict'

function renderSavedMemes() {
    const memes = getSavedMemes()
    if (!memes.length) {
        return document.querySelector('.saved-gallery').innerText = 'No saved Memes'
    }

    const strHTMLs = memes.map(meme =>
        `<div class=savedMeme onclick="onSelectMeme(${meme.id})">
        <button onclick="onRemoveMeme(${meme.id}, event)">x</button>
        <img src="${meme.data}">
    </div>`)
    document.querySelector('.saved-gallery').innerHTML = strHTMLs.join('')
}

function openSavedGallery() {
    renderSavedMemes()

    document.querySelector('.saved-gallery').classList.remove('hidden')
    document.querySelector('.editor').classList.add('hidden')
    document.querySelector('.main-gallery').classList.add('hidden')
}

function onSaveMeme() {
    saveMeme()
    renderSavedMemes()
}

function onSelectMeme(id) {
    const currMeme = getMemeById(id)
    setMeme(currMeme.gMeme)
    renderMeme()

    document.querySelector('.saved-gallery').classList.add('hidden')
    document.querySelector('.editor').classList.remove('hidden')
}

function onRemoveMeme(id, ev) {
    ev.stopPropagation()

    removeMeme(id)
    renderSavedMemes()
}