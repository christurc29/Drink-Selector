//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
    let drink = document.querySelector('input').value

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)

.then(res => res.json())
.then(data => {
    if(data.drinks){

    const listItems = document.querySelectorAll('li')
    listItems.forEach(item => {
        item.remove()
    })


    for(i = 0; i < data.drinks.length; i++){
        let drink = data.drinks[i]


        let list = document.getElementById('drinks-list')
        let node = document.createElement('li')
        node.setAttribute('class', 'drink')


        let name = document.createElement('h2')
        let img = document.createElement('img')
        img.setAttribute('class', 'drinkImage')
        let instructions = document.createElement('p')
        let ingredients = document.createElement(`li`)
        ingredients.innerHTML = `<ul id="ingredients">${listIngredients(drink)}</ul>`
        img.src = data.drinks[i].strDrinkThumb
        name.innerHTML = data.drinks[i].strDrink
        instructions.innerHTML = data.drinks[i].strInstructions
        
        node.appendChild(img)
        node.appendChild(name)
        node.appendChild(instructions)
        node.appendChild(ingredients)
        list.appendChild(node)

    }

}else{
    document.querySelector('.drink-found').innerHTML = "Sorry, we didn't find any drinks!"
}})
.catch(err => {
    console.log(`error ${err}`)
})

}


function listIngredients(drink){
    let str = ''

    for(const [key, value] of Object.entries(drink)){
        if(key.includes('strIngredient') && value) {
            let measurement = drink['strMeasure' + key.substring(13, key.length)]
            measurement = measurement ? `${measurement.trim()}` : ''

            str += `<li>${value + ` ` + measurement}</li>\n`
        }
    }

    return str
}

