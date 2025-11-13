'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    renderGallery()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}