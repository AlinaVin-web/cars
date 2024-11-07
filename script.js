"use strict";

const select = document.createElement('select');
const block = document.createElement('div');

select.style.cssText = `
    font-size: 18px;
    padding: 10px;
    outline: none;
    text-transform: capitalize;
    margin-bottom: 10px;`;
block.style.cssText = `font-size: 30px;`
select.id = "select-cars";

const getCars = () => {
    return fetch('./cars.json').then(data => data.json());
}

getCars()
    .then(data => {
        let option = new Option("Выберите тачку", "none", true, true);
        select.appendChild(option);

        data['cars'].forEach((val, key) => {
            option = new Option(val.brand, key);
            select.appendChild(option);
        });
        document.body.append(select);
        document.body.append(block);
    })
    .catch(error => console.log('Ошибка первого подключения!', error.message));

try {
    select.addEventListener('input', () => {
        if (+select.value >= 0) {
            getCars()
                .then(data => {
                    console.log(data['cars']);
                    block.innerText = `Тачка ${data['cars'][select.value]['brand']} ${data['cars'][select.value]['model']} 
                        Цена: ${data['cars'][select.value]['price']}$`;
                })
                .catch(error => console.log('Ошибка повторных подключений!', error.message));
        } else {
            block.textContent = '';
        }
    });
} catch { console.log('Ошибка! Нет Select'); }

