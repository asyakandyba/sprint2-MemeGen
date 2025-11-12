'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function onResize() {
    resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elEditor = document.querySelector('.canvas-container')
    gElCanvas.width = elEditor.offsetWidth
    gElCanvas.height = elEditor.offsetHeight
}

function renderMeme() {
    const { selectedImgId, lines } = getMeme()

    const img = new Image()
    img.src = `img/${selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderTxt(lines)
    }
}

function renderTxt(lines) {
    lines.forEach((line, idx) => {

        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.color

        line.width = gCtx.measureText(line.txt).width
        const center = (gElCanvas.width - line.width) / 2
        line.posX = center

        if (idx === 0) line.posY = 30
        else if (idx === 1) line.posY = gElCanvas.height - 30
        else line.posY = gElCanvas.height / 2

        gCtx.fillText(line.txt, line.posX, line.posY)
    })

    selectLine()
}

function selectLine() {
    const { selectedLineIdx, lines } = getMeme()
    const currLine = lines[selectedLineIdx]

    const x = currLine.posX
    const lineHeight = -currLine.size * 1.5
    const y = currLine.posY - (lineHeight / 4)

    gCtx.strokeRect(x, y, currLine.width, lineHeight)
}

function onDown(ev) {
    const { offsetX, offsetY } = ev

    switchLine(offsetX, offsetY)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSetTxt(elTxtInput) {
    setTxt(elTxtInput.value)
    renderMeme()
}

function onSetColor(elClrInput) {
    setTxtColor(elClrInput.value)
    renderMeme()
}

function onSetSize(elSizeInput) {
    setTxtSize(+elSizeInput.value)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-canvas'
}