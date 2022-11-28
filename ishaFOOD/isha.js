// nav-gation-function
const openHumberger = document.getElementById('headMenu')
const navigator = document.querySelector('.navigator')
const navLinks = document.querySelectorAll('.nav-links')

openHumberger.addEventListener('click', ()=>{
    openHumberger.classList.toggle('active')
    navigator.classList.toggle('slide')
})
navLinks.forEach( element =>{
    element.addEventListener('click', ()=>{
        navigator.classList.remove('slide')
        openHumberger.classList.remove('active')
    })
})


//category-function 
const categoryHumberger = document.getElementById('category-menu')
const categoryMenu = document.querySelector('.category-menu')

categoryHumberger.addEventListener('click', ()=>{
   categoryMenu.classList.toggle('open')
   categoryHumberger.classList.toggle('active')
})

//hero-section
const foodImageConatiner = document.querySelector('.food-image-conatiner')//hero slider show

class heroImageShow{
    async imagesLoader(){
        try {
           let result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
           let data = await result.json()
           let product = data.categories
           galleyLoader(product)
        } catch (error) {
            console.log('sory Not found');
        }
    }
}
const heroShow = new heroImageShow();
document.addEventListener('DOMContentLoaded', ()=>{
    heroShow.imagesLoader()
})

//SLIDE SHOW CONTROL
    let foodhero = document.getElementsByClassName('foodImage')
    foodhero = [...foodhero]
    const imageProperty = () =>{
        foodhero.forEach((element,index) =>{
           element.style.left = (index * 100) +'%'
         })
      }
    imageProperty()
    setInterval(() => {nextTo() }, 5000);
    // movemen control
    const next = document.querySelector('.next')
    const prev = document.querySelector('.prev')
    let slideNumber = 0
    next.addEventListener('click', nextTo) 
    function nextTo(){
    if (slideNumber < foodhero.length-1) {slideNumber++,scrollfn()}else{slideNumber = 0,scrollfn()}
    }
    prev.addEventListener('click', prevTo)
    function prevTo(){
    if(slideNumber > 0) {
       slideNumber--
       scrollfn()
    }
    else{
        slideNumber = foodhero.length-1
        scrollfn()
    }
    }
    const scrollfn = ()=>{
        foodhero.forEach(Element =>
        Element.style.transform = `translateX(${-slideNumber * 100}%`)
    }

//galey-manupulation
const galleyContentContainer = document.querySelector('.galley-content-container')
const galleyLoader = (value) =>{
   let galImages = value.map(item=>{
        return `
        <div class="menu-container-Inf">
        <div class="menu-image">
            <img src=${item.strCategoryThumb} alt=""> 
        </div>
        <div class="menu-info">
           <p class="name">${item.strCategory}</p>
           <p class="rates">
             <i class="fa-sharp fa-solid fa-star rates"></i>
             <i class="fa-sharp fa-solid fa-star rates"></i>
             <i class="fa-sharp fa-solid fa-star rates"></i>
             <i class="fa-sharp fa-solid fa-star rates"></i>
             <i class="fa-sharp fa-solid fa-star-half rates"></i>
           </p>
        </div>
   </div>`
    })
    galImages = galImages.join('')
    galleyContentContainer.innerHTML = galImages
}
 

//pagination
const pagenateLoader = (value) =>{
let loadedData = [...value]
const paginate = (array,pageSize,pageNumber)=>{
     return array.slice(pageNumber*pageSize, pageNumber*pageSize+pageSize)
}
let page1 = paginate(loadedData,8,0)
let page2 = paginate(loadedData,8,1)
let page3 = paginate(loadedData,8,2)
let page4 = paginate(loadedData,8,3)
console.log(page1,page2,page3,page4);
}

//PAGElOADER
class catergory{
    constructor(category){
        this.data = async function pageToload(){
            try {
                let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
                let data = await result.json()
                let product = data.meals
                pagenateLoader(product)
            } catch (error) {
                console.log('sory not found');
            }
        }
       }
    }
//call for the category

const categoryCall = ()=>{
    let id = 1
if(id == 1){const givenpage = new catergory('beef').data()}
}
categoryCall()