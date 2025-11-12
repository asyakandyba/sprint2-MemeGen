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
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.color
        if (idx === 0) {
            gCtx.fillText(line.txt, 0, 30)
        } else if (idx === 1) {
            gCtx.fillText(line.txt, 0, gElCanvas.height)
        } else {
            gCtx.fillText(line.txt, 0, gElCanvas.height / 2)
        }
    })
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

function onAddLine() {
    addLine()
    renderMeme()
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-canvas'
}