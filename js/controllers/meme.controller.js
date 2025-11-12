'use strict'

let gElCanvas
let gCtx

function onResize() {
    resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elEditor = document.querySelector('.editor')
    gElCanvas.width = elEditor.offsetWidth / 2
    gElCanvas.height = elEditor.offsetHeight
}

function renderMeme() {
    const { selectedImgId, selectedLineIdx, lines } = getMeme()
    const currLine = lines[selectedLineIdx]

    const img = new Image()
    img.src = `img/${selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = `${currLine.size}px Impact`
        gCtx.fillStyle = currLine.color
        gCtx.fillText(currLine.txt, 0, 30)
    }
}

function onSetTxt(elInput) {
    setLineTxt(elInput.value)
    renderMeme()
}