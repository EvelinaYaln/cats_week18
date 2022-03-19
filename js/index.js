'use strict'
class Cat {
    constructor(catsName, ownersName, contacts, breed, feed, gender, comment) {
        this.catsName = catsName;
        this.ownersName = ownersName;
        this.contacts = contacts;
        this.breed = breed;
        this.feed = feed;
        this.gender = gender;
        this.comment = comment;
    }
}

const createObj = () => {
    const catsName = document.querySelector('#catsName').value;
    const ownersName = document.querySelector('#ownersName').value;
    const contacts = document.querySelector('#contacts').value;
    const comment = document.querySelector('#comment').value;
    const gender = document.querySelectorAll('[name="gender"]');
    const breed = document.querySelector('#breed').value;
    const feedDr = document.querySelector('#dryFeed');
    const feedWet = document.querySelector('#wetFeed');
    const feedMixed = document.querySelector('#mixFeed');
    let gend = '';
    for (let g of gender) {
        if (g.checked) {
            gend = g.value;
        }
    }
    const arr = [];
    if (feedDr.checked) {
        arr.push(feedDr.value);
    }
    if (feedWet.checked) {
        arr.push(feedWet.value);
    }
    if (feedMixed.checked) {
        arr.push(feedMixed.value);
    }

    const cat = new Cat(catsName, ownersName, contacts, breed, arr, gend, comment);
    console.log(cat);
}

save.addEventListener('click', createObj);
save.addEventListener('click', function(event) {
    let catForm = document.getElementById('cat');
    event.preventDefault();

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(catForm),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    })

    .then(response => {
            try {
                if (response.headers['content-type'] !== 'application/x-www-form-urlencoded') {
                    throw new Error('Некорретный ответ от сервера');
                } else {
                    return response;
                }
            } catch (error) {
                console.log('Произошла ошибка: ' + error.message)
            }
        })
        .then(response => response.json())
        .then(catChoise => console.log(catChoise))
        .catch(error => console.log(error))
});