'use strict'

let gElCanvas
let gCtx

let gStartPos
let isLineDrag = false

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
        renderImg(img)
        if (isImgSelected) {
            placeTxt()
            isImgSelected = false
        }
        renderTxt()
        selectLine()
    }
}

function renderTxt() {
    const { selectedLineIdx, lines } = getMeme()

    lines.forEach(line => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, line.posX, line.posY)

        line.width = gCtx.measureText(line.txt).width
    })
    const elTxt = document.querySelector('[name="txt"]');
    if (lines.length) elTxt.value = lines[selectedLineIdx].txt
}

function placeTxt() {
    const { lines } = getMeme()

    lines.forEach((line, idx) => {
        line.posX = (gElCanvas.width - line.width) / 2
        line.posY = idx === 0 ? 40 : gElCanvas.height - 20
    })
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
    const pos = getEvPos(ev)

    const isLine = getLine(pos.x, pos.y)
    if (!isLine) return

    isLineDrag = true
    gStartPos = pos

    document.querySelector('canvas').style.cursor = 'grabbing'
    renderMeme()
}

function onMoveLine(ev) {
    if (!isLineDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos
    renderMeme()
}

function onUp() {
    isLineDrag = false

    const elCanvas = document.querySelector('canvas')
    elCanvas.style.cursor = 'grab'
}

function onAddLine() {
    addLine(gElCanvas)
    renderMeme()
}

function onDeleteLine() {
    removeLine()
    renderMeme()
}

function onAlignLine(elBtn) {
    const dir = elBtn.dataset.dir
    alignLine(dir, gElCanvas)
    renderMeme()
}

function onSetTxt(ev) {
    const elEditor = document.querySelector('.editor')
    if (elEditor.classList.contains('hidden')) return

    if(ev.code === 'Space') ev.preventDefault()

    setTxt(ev.key)
    renderMeme()
}

function onSetColor(elClrInput) {
    setTxtColor(elClrInput.value)
    renderMeme()
}

function onSetSize(elSizeInput) {
    const diff = elSizeInput.value === 'bigger' ? 5 : -5
    setTxtSize(diff)
    renderMeme()
}

function onSetFont(elFontInput) {
    setTxtFont(elFontInput.value)
    renderMeme()
}

function onSetEmoji(elEmoji) {
    const lineWidth = gCtx.measureText(elEmoji.innerText).width
    addLine(gElCanvas, elEmoji.innerText, lineWidth)
    renderMeme()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)

    document.querySelector('.main-gallery').classList.add('hidden')
    document.querySelector('.editor').classList.remove('hidden')
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function onShareImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }
    uploadImg(canvasData, onSuccess)
}


// on submit call to this function

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}