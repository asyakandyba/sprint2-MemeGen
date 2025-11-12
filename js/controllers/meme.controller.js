'use strict'

let gElCanvas = document.querySelector('canvas')
let gCtx = gElCanvas.getContext('2d')

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
        renderTxt()
    }
}

function renderTxt() {
    const { lines } = getMeme()
    gCtx.font = `${lines[0].size}px Impact`
    gCtx.fillStyle = lines[0].color
    gCtx.fillText(lines[0].txt, 0, 30)
    gCtx.fillText(lines[1].txt, 0, gElCanvas.height)
}

function onSetTxt(elTxtInput) {
    setLineTxt(elTxtInput.value)
    renderMeme()
}

function onSetColor(elClrInput) {
    setColor(elClrInput.value)
    renderMeme()
}

function onSetSize(elSizeInput) {
    setSize(+elSizeInput.value)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-canvas'
}