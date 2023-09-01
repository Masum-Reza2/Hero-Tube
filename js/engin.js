// setting all categories
let loadData = async () => {
    let res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    let data = await res.json();
    setCategories(data)
}

loadData()

let setCategories = (data) => {

    let categoryParent = document.getElementById('categoryParent');
    let categories = data.data;

    categories.forEach(item => {
        // console.log(item.category)
        let button = document.createElement('button');
        button.classList = 'btn btn-sm capitalize';
        button.innerText = item.category;

        categoryParent.appendChild(button)

        button.addEventListener('click', ()=>{
            // console.log(event.target.innerText)
        })
    });
    
}