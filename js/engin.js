// setting all categories or control room
let loadData = async () => {
    // loading 
    handleLoading(true)

    let res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    let data = await res.json();

    //dynamic category buttons setter
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
        button.classList = 'btn btn-sm capitalize font-light focus:bg-red-500 focus:text-white';
        button.innerText = item?.category;

        categoryParent.appendChild(button)

        button.addEventListener('click', () => {

            // loading starts here
            handleLoading(true)

            categoryData(item?.category_id)
        })
    });
    handleLoading(false)

}


// particuler category data loader
let categoryData = async (id) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    let data = await res.json();
    let allData = data?.data;
    let cardParent = document.getElementById('cardParent');
    cardParent.textContent = '';

    showError.innerText = ''

    // console.log(allData)

    if (allData.length > 0) {

        allData.forEach(item => {
            // console.log(item);
            let div = document.createElement('div');
            div.classList = 'card bg-base-100 border-black transition-all duration-500 cursor-pointer hover:scale-105 active:scale-110';

            // console.log(item)

            div.innerHTML = `
            
                        <div class="relative">
                            <figure><img class="rounded-lg h-full md:h-[30vh] w-full" src="${item?.thumbnail}" alt="Shoes" /></figure>
                            <p class="text-xs w-fit text-white p-1 rounded-md bg-[#171717] absolute right-2 bottom-2 ${item?.others?.posted_date ? 'block' : 'hidden'}">
                            ${Math.floor((item?.others?.posted_date / 60) / 60) || '0'}hrs ${Math.floor((item?.others?.posted_date / 60) % 60) || '0'} min ago
                            </p>
                        </div>
    
                        <div class="flex items-center mt-4 gap-x-3">
                            <img class="h-10 w-10 rounded-full" src= "${item?.authors[0]?.profile_picture}" alt="">
                            <p class="font-bold">${item?.title}</p>
                        </div>
    
                        <div class="ml-[3.2rem] text-sm font-light space-y-1 mt-2">
                            <div class="flex gap-x-3">
                                <p>${item?.authors[0]?.profile_name}</p>
                                <img class = ${item?.authors[0]?.verified ? 'block' : 'hidden'} src="./images/checkmark.svg" alt="">
                            </div>
                            <p class = 'views'>${item?.others?.views} views</p>
                        </div>
    
            `

            cardParent.appendChild(div);
        });

        handleLoading(false)
    }

    else {

        // dynamic error message
        let div = document.createElement('div');
        div.classList = 'md:h-[70vh] mt-10 md:mt-0 flex flex-col items-center justify-start md:justify-center gap-y-3 md:gap-y-7';
        div.innerHTML = `
            <img class="w-1/5 md:w-[7%]" src="./images/Icon.png" alt="">
            <div class="text-center">
                <p class="font-bold md:text-xl text-[#171717]">Oops!! Sorry, There is no</p>
                <p class="font-bold md:text-xl text-[#171717]">content here</p>
            </div>

        `;
        showError.appendChild(div)
    }
    handleLoading(false)
}


//control room switch the grandpa
loadData()


// sort button handler
let sortBtn = document.getElementById('sortBtn');
sortBtn.addEventListener('click', () => {
    sortVideosByViews();
});

let sortVideosByViews = () => {
    let cardParent = document.getElementById('cardParent');
    let cards = Array.from(cardParent.children);

    cards.sort((a, b) => {
        let viewsA = parseFloat(a.querySelector('.views').textContent);
        let viewsB = parseFloat(b.querySelector('.views').textContent);
        return viewsB - viewsA;
    });

    cardParent.textContent = '';
    cards.forEach(card => {
        cardParent.appendChild(card);
    });
};


// blog question answer handler
document.getElementById('btnBlog').addEventListener('click', () => {
    window.location.href = 'blog.html'
})


// loading handler
function handleLoading(isLoading) {
    let loadingHandler = document.getElementById('loadingHandler');

    if (isLoading) {
        loadingHandler.classList.remove('hidden')
    }
    else {
        loadingHandler.classList.add('hidden')
    }
}