'use strict'

function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map(img =>
        `<div class="card" onclick="onSetImg(${img.id})">
        <img src="${img.url}">
    </div>`)
    document.querySelector('.gallery').innerHTML = strHTMLs.join('')
}
