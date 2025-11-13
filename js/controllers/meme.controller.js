'use strict'

let gElCanvas
let gCtx

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
    lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, line.posX, line.posY)

        line.width = gCtx.measureText(line.txt).width
    })

    selectLine()
}

function selectLine() {
    const { selectedLineIdx, lines } = getMeme()
    const currLine = lines[selectedLineIdx]

    if (!currLine) return

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
    addLine(gElCanvas, gCtx)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onMoveUp() {

}

function onMoveDown() {

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

function onSetFont(elFontInput) {
    setTxtFont(elFontInput.value)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-canvas'
}