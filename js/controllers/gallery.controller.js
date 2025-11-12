'use strict'

function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map(img =>
        `<div class="card" onclick="onImgSelect(${img.id})">
        <img src="${img.url}">
    </div>`)
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}

function onImgSelect(id){
    setImg(id)
    document.querySelector('.editor').classList.remove('hidden')
    document.querySelector('.gallery').classList.add('hidden')
    renderMeme()
}