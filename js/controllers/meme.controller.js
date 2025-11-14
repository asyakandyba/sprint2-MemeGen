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
    addLine(gElCanvas)
    renderMeme()
}

function onDeleteLine() {
    removeLine()
    renderMeme()
}

function onMoveLine(elBtn) {
    const diff = elBtn.dataset.dir === 'up' ? -5 : 5
    moveLine(diff)
    renderMeme()
}

function onAlignLine(elBtn) {
    const dir = elBtn.dataset.dir
    alignLine(dir, gElCanvas)
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
    const diff = elSizeInput.value === 'bigger' ? 5 : -5
    setTxtSize(diff)
    renderMeme()
}

function onSetFont(elFontInput) {
    setTxtFont(elFontInput.value)
    renderMeme()
}

function onSetEmoji(elEmoji){
    addLine(gElCanvas, elEmoji.innerText)
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
    console.log('img:', img)
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