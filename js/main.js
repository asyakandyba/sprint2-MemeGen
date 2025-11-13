'use strict'

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    createLines(gElCanvas)
    renderGallery()
}