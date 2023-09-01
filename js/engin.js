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

    // handling error show
    let showError = document.getElementById('showError');

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

    showError.innerText = ''


    if (allData.length > 0) {
        allData.forEach(item => {
            // console.log(item);
            let div = document.createElement('div');
            div.classList = 'card bg-base-100 border-black';

            console.log(item)

            div.innerHTML = `
            
                        <div class="relative">
                            <figure><img class="rounded-lg h-[30vh]" src="${item?.thumbnail}" alt="Shoes" /></figure>
                            <p class="text-xs w-fit text-white p-1 rounded-md bg-[#171717] absolute right-2 bottom-2">3hrs
                                56 min ago</p>
                        </div>
    
                        <div class="flex items-center mt-5 gap-x-3">
                            <img class="h-10 w-10 rounded-full" src= "${item?.authors[0]?.profile_picture}" alt="">
                            <p class="font-bold">${item?.title}</p>
                        </div>
    
                        <div class="ml-[3.2rem] text-sm font-light space-y-1 mt-3">
                            <div class="flex gap-x-3">
                                <p>${item?.authors[0]?.profile_name}</p>
                                <img src="./images/checkmark.svg" alt="">
                            </div>
                            <p>${item?.others?.views} views</p>
                        </div>
    
            `

            cardParent.appendChild(div);

        });
    } else {

        let div = document.createElement('div');
        div.classList = 'md:h-[75vh] mt-10 md:mt-0 flex flex-col items-center justify-start md:justify-center gap-y-3 md:gap-y-7';
        div.innerHTML = `
            <img class="w-1/5 md:w-[7%]" src="./images/Icon.png" alt="">
            <div class="text-center">
                <p class="font-bold md:text-xl text-[#171717]">Oops!! Sorry, There is no</p>
                <p class="font-bold md:text-xl text-[#171717]">content here</p>
            </div>

        `;
        showError.appendChild(div)
    }
}


// parent or control room switch
loadData()