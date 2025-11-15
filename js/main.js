'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    createLines()
    console.log('lines:', gMeme.lines)
    onResize()
    renderGallery()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}