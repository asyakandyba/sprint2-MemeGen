'use strict'

const gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [_createLine(), _createLine()]
}

function getMeme() {
    return gMeme
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function addLine() {
    gMeme.lines.push(_createLine())
}

function switchLine(x, y) {
    const idx = gMeme.lines.findIndex(line => {
        return x >= line.posX && x <= line.posX + line.width
            && y <= line.posY && y >= line.posY - line.size
    })
    if (idx !== -1) gMeme.selectedLineIdx = idx
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

function _getCurrLine() {
    const currIdx = gMeme.selectedLineIdx
    return gMeme.lines[currIdx]
}

function _createLine() {
    return {
        txt: 'Write here',
        size: 20,
        color: 'white'
    }
}

