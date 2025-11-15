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

function addLine(gElCanvas, txt, width = 90) {
    const centerX = (gElCanvas.width - width) / 2
    const centerY = gElCanvas.height / 2
    gMeme.lines.push(_createLine(centerX, centerY, txt))
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    const currIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(currIdx, 1)
}

function getLine(x, y) {
    const idx = gMeme.lines.findIndex(line => {
        return x >= line.posX && x <= line.posX + line.width
            && y <= line.posY && y >= line.posY - line.size
    })
    if (idx !== -1) {
        gMeme.selectedLineIdx = idx
        return true
    } else {
        return false
    }
}

function moveLine(dx, dy) {
    const currLine = _getCurrLine()
    currLine.posX += dx
    currLine.posY += dy
}

function alignLine(dir, gElCanvas) {
    const currLine = _getCurrLine()
    let posX
    if (dir === 'left') posX = 10
    else if (dir === 'right') posX = gElCanvas.width - currLine.width - 10
    else posX = (gElCanvas.width - currLine.width) / 2

    currLine.posX = posX
}

function setTxt(key) {
    const currLine = _getCurrLine()

    if(currLine.txt === 'Write here') return currLine.txt = key

    if (key === 'Backspace') return currLine.txt = currLine.txt.slice(0, -1)
    else if (key.length > 1) return

    currLine.txt += key
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

function createLines() {
    gMeme.lines = [
        _createLine(),
        _createLine()
    ]
}

function _createLine(posX, posY, txt = 'Write here') {
    return {
        txt,
        size: 20,
        color: 'white',
        font: 'Impact',
        posX,
        posY,
    }
}

