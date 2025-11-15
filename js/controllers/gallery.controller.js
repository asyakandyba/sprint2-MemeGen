'use strict'

let gFilterBy = ''

function renderGallery() {
    const imgs = getImgs(gFilterBy)
    const strHTMLs = imgs.map(img =>
        `<div class="meme" onclick="onImgSelect(${img.id})">
        <img src="${img.url}">
    </div>`)
    document.querySelector('.main-gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
    setImg(id)
    document.querySelector('.editor').classList.remove('hidden')
    document.querySelector('.main-gallery').classList.add('hidden')
    document.querySelector('.search').classList.add('hidden')

    gIsImgSelected = true
    onResize()
}

function onRandomMeme() {
    const length = getImgs().length
    const randId = getRandomInt(1, length)
    onImgSelect(randId)
}

function onSetFilterBy(filterBy) {
    if (filterBy !== undefined) {
        gFilterBy = filterBy
    }
    renderGallery()
}