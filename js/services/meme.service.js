'use strict'

const gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

function getMeme() {
    return gMeme
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function addLine(gElCanvas) {
    const centerX = (gElCanvas.width - 90) / 2
    const centerY = gElCanvas.height / 2
    _createLine(centerX, centerY)
}

function removeLine() {
    const currIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(currIdx, 1)
}

function switchLine(x, y) {
    const idx = gMeme.lines.findIndex(line => {
        return x >= line.posX && x <= line.posX + line.width
            && y <= line.posY && y >= line.posY - line.size
    })
    if (idx !== -1) gMeme.selectedLineIdx = idx
}

function moveLine(diff) {
    const currLine = _getCurrLine()
    currLine.posY += diff
}

function alignLine(dir, gElCanvas) {
    const currLine = _getCurrLine()
    let posX
    if (dir === 'left') posX = 10
    else if (dir === 'right') posX = gElCanvas.width - currLine.width - 10
    else posX = (gElCanvas.width - currLine.width) / 2

    currLine.posX = posX
}

function setTxt(txt) {
    const currLine = _getCurrLine()
    currLine.txt = txt
}

function setTxtColor(clr) {
    const currLine = _getCurrLine()
    currLine.color = clr
}

function setTxtSize(diff) {
    const currLine = _getCurrLine()
    currLine.size += diff
}

function setTxtFont(font) {
    const currLine = _getCurrLine()
    currLine.font = font
}

function _getCurrLine() {
    const currIdx = gMeme.selectedLineIdx
    return gMeme.lines[currIdx]
}

function createLines(gElCanvas) {
    const centerX = (gElCanvas.width - 46) / 2 //46 is the width of the starting line
    _createLine(centerX, 30)
    _createLine(centerX, (gElCanvas.height - 30))
}

function _createLine(posX, posY) {
    gMeme.lines.push({
        txt: 'Write here',
        size: 20,
        color: 'white',
        font: 'Impact',
        posX,
        posY,
    })
}

