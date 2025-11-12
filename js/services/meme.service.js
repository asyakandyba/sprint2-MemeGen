'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Lorem ipsum dolor sit.',
            size: 20,
            color: 'black'
        },
        {
            txt: 'lalla lalala.',
            size: 20,
            color: 'white'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setColor(clr) {
    gMeme.lines[gMeme.selectedLineIdx].color = clr
}

function setSize(dif) {
    gMeme.lines[gMeme.selectedLineIdx].size += dif
}
