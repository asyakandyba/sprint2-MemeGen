'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write here',
            size: 20,
            color: 'white'
        },
        {
            txt: 'Write here.',
            size: 20,
            color: 'white'
        }
    ]
}

console.log('gMeme.lines:', gMeme.lines)

function getMeme() {
    return gMeme
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function addLine() {
    gMeme.lines.push({
        txt: 'Write here',
        size: 20,
        color: 'white'
    })
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function setColor(clr) {
    console.log(gMeme.lines[gMeme.selectedLineIdx])
    gMeme.lines[gMeme.selectedLineIdx].color = clr
}

function setSize(dif) {
    gMeme.lines[gMeme.selectedLineIdx].size += dif
}

