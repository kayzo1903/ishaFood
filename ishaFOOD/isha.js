// nav-gation-function
const openHumberger = document.getElementById('headMenu')
const navigator = document.querySelector('.navigator')

openHumberger.addEventListener('click', ()=>{
    openHumberger.classList.toggle('active')
    navigator.classList.toggle('slide')
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
           let result = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
           let data = await result.json()
           let product = data.categories
           product = product.map(item=>{
            return item.strCategoryThumb
           })
           heroSlideShow(product)
        } catch (error) {
            console.log('sory Not found');
        }
    }
}
const heroShow = new heroImageShow();
document.addEventListener('DOMContentLoaded', ()=>{
    heroShow.imagesLoader()
})
//hero-imageLoader
function heroSlideShow(value) {
    let foodImages = value.map(item=>{
        return `
        <div class="foodImage">
             <img src=${item} alt="${item}">
         </div>`
    })
    foodImages = foodImages.join('')
    foodImageConatiner.innerHTML = foodImages

    // target class of image
    let foodhero = document.getElementsByClassName('foodImage')
    foodhero = [...foodhero]
    const imageProperty = () =>{
        foodhero.forEach((element,index) =>{
           element.style.left = (index * 100) +'%'
         })
      }
    imageProperty()
    // movemen control
    const next = document.querySelector('.next')
    const prev = document.querySelector('.prev')
    let slideNumber = 0
    next.onclick = ()=> {
    if (slideNumber < foodhero.length-1) {
        slideNumber++
        scrollfn()
    }
    else {
        slideNumber = 0
        scrollfn()
    }
    }
     prev.onclick = ()=> {
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
    }}

