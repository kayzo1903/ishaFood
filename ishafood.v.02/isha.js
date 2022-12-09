//category-function:
const category = document.getElementById('category')
const categoryDisplay = document.querySelector('.category-display')
const faChevronUp = document.querySelector('.fa-chevron-up')

category.addEventListener('click', openCat)

function openCat(){
   categoryDisplay.classList.toggle('open')
   faChevronUp.classList.toggle('rotate')
}


//load category datas
const catOpCont = document.querySelector('.cat-op-cont')
const catOpContload = (value)=> {
    let loadedData = value.map(item=>{
      return  ` <div class="cat-op">
                <img src=${item.strCategoryThumb} alt="">
                <p>${item.strCategory}</p> 
                </div>`
    })
    loadedData = loadedData.join('')
    catOpCont.innerHTML = loadedData
}

class categoryLoader{
    async loadCateg() {
        try {
            let result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            let data = await result.json()
            let product = data.categories
            catOpContload(product)
            // return product
        } catch (error) {
            console.log('sory not found');
        }
    }
}

//load galey 
const galeyCont = document.querySelector('.gal-cont-fod')
const loadMoreContent = document.getElementById('loadMoreContent')
const galContainer = document.querySelector('.gal-cont-fod-container')
loadMoreContent.addEventListener('click', addMoreGaley)

let pages = []
let counter = 0
function  addMoreGaley() {
    const element = document.createElement('div')
    element.classList.add('gal-cont-fod')
    if (counter < pages.length){
    let loadedData = pages[counter].map(item=>{
        return  `<div class="gal-food-img">
                    <div class="food-pic">
                        <img src=${item.strMealThumb} alt="">
                    </div>
                    <div class="gal-food-name">
                        <p>${item.strMeal}</p>
                        <div class="food-rat">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                         </div>
                    </div>
                </div>`
      })
      loadedData = loadedData.join('')
      element.innerHTML = loadedData
      galContainer.appendChild(element)
      counter++
      if (counter == pages.length) {
        loadMoreContent.classList.add('hideBtn')
      }
    }
}

const paginate = (array) =>{
    let page = [...array] 
    let elementPerPage = 8;
    let numPages = Math.ceil(page.length/elementPerPage)
    for (let i = 0; i < numPages; i++) {
        let start = i * elementPerPage
        let end = start + elementPerPage
        let nwPage = page.slice(start,end)
        pages.push(nwPage)     
    }
    galeyDisplay(pages[0])
    counter++
    if (counter == pages.length) {
        loadMoreContent.classList.add('hideBtn')
      }
    console.log(counter);
}

const galeyDisplay = (value)=>{
    let loadedData = value.map(item=>{
        return  `<div class="gal-food-img">
                    <div class="food-pic">
                        <img src=${item.strMealThumb} alt="">
                    </div>
                    <div class="gal-food-name">
                        <p>${item.strMeal}</p>
                        <div class="food-rat">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                         </div>
                    </div>
                </div>`
      })
      loadedData = loadedData.join('')
      galeyCont.innerHTML = loadedData
}

class galeyLoader{
    constructor(filter){
        this.filter = filter
     }      
        async loadgall() {
            try {
                let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.filter}`)
                let data = await result.json()
                let product = data.meals
                paginate(product)
            } catch (error) {
                console.log('sory not found');
            }
        }
    }

//load galey ENd
const categoryData = new categoryLoader 
const gallDisplay = new galeyLoader('Dessert')
document.addEventListener('DOMContentLoaded',()=>{
    categoryData.loadCateg()
    gallDisplay.loadgall()
})

//humberger-Menu
const navigator = document.querySelector('.navigator')
const humbergerMenu = document.querySelector('.humberger-menu')

humbergerMenu.addEventListener('click',()=>{
    navigator.classList.toggle('openNav')
    humbergerMenu.classList.toggle('active')
})