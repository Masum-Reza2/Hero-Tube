// setting all categories or control room
let loadData = async () => {
    let res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    let data = await res.json();

    setCategories(data)
    
    // showing all categories by default
    categoryData(data?.data[0]?.category_id)
}


let setCategories = (data) => {
    let categories = data?.data;

    let categoryParent = document.getElementById('categoryParent');
    categoryParent.textContent = '';

    categories.forEach(item => {
        // console.log(item.category_id)
        let button = document.createElement('button');
        button.classList = 'btn btn-sm capitalize font-light';
        button.innerText = item?.category;

        categoryParent.appendChild(button)

        button.addEventListener('click', () => {
            categoryData(item?.category_id)
        })
    });

}


// particuler category data loader
let categoryData = async (id) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    let data = await res.json();
    let allData = data?.data;
    let cardParent = document.getElementById('cardParent');
    cardParent.textContent = '';


    allData.forEach(item => {
        // console.log(item);
        let div = document.createElement('div');
        div.classList = 'card bg-base-100';

        div.innerHTML = `
        
                    <div class="relative">
                        <figure><img class="rounded-lg" src="https://i.ibb.co/L1b6xSq/shape.jpg" alt="Shoes" /></figure>
                        <p class="text-xs w-fit text-white p-1 rounded-md bg-[#171717] absolute right-2 bottom-2">3hrs
                            56 min ago</p>
                    </div>

                    <div class="flex items-start mt-5 gap-x-3">
                        <img class="w-1/6 rounded-full" src="https://i.ibb.co/D9wWRM6/olivia.jpg" alt="">
                        <p class="font-bold">Lorem, ipsum dolor sit amet consectetur quo!</p>
                    </div>

                    <div class="ml-[3.8rem] text-sm font-light space-y-1 mt-3">
                        <div class="flex gap-x-3">
                            <p>Awlad Hossain</p>
                            <img src="./images/checkmark.svg" alt="">
                        </div>
                        <p>91k Views</p>
                    </div>

        `

        cardParent.appendChild(div);

    });
}


// parent or control room switch
loadData()