'use strict'

const gImgs = [
    { id: 1, url: 'img/1.jpg', keyword: ['dog', 'kids'] },
    { id: 2, url: 'img/2.jpg', keyword: ['politician', 'funny'] },
    { id: 3, url: 'img/3.jpg', keyword: ['animation', 'kids'] },
    { id: 4, url: 'img/4.jpg', keyword: ['dog', 'cute'] },
    { id: 5, url: 'img/5.jpg', keyword: ['happy', 'nature'] },
    { id: 6, url: 'img/6.jpg', keyword: ['kids', 'funny'] },
    { id: 7, url: 'img/7.jpg', keyword: ['kids', 'funny'] },
    { id: 8, url: 'img/8.jpg', keyword: ['hand gestures ',] },
    { id: 9, url: 'img/9.jpg', keyword: ['hand gestures', 'funny'] },
    { id: 10, url: 'img/10.jpg', keyword: ['hand gestures', 'funny'] },
    { id: 11, url: 'img/11.jpg', keyword: ['hand gestures',] },
    { id: 12, url: 'img/12.jpg', keyword: ['kids'] },
    { id: 13, url: 'img/13.jpg', keyword: ['dog', 'funny'] },
    { id: 14, url: 'img/14.jpg', keyword: ['politician',] },
    { id: 15, url: 'img/15.jpg', keyword: ['romance', 'funny'] },
    { id: 16, url: 'img/16.jpg', keyword: ['movie', 'hand gestures'] },
    { id: 17, url: 'img/17.jpg', keyword: ['funny',] },
    { id: 18, url: 'img/18.jpg', keyword: ['movie',] },
]

function getImgs(filterBy) {
    let imgs = gImgs
    
    if (filterBy) {
        imgs = imgs.filter(img => {
            return img.keyword.some(keyword =>
                keyword.toLowerCase().includes(filterBy.toLowerCase()))
        })
    }
    return imgs
}



