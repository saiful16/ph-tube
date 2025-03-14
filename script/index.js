// console.log("connected")

function removeActiveClass(){
    const activebuttons = document.getElementsByClassName("active")
    for(let btn of activebuttons){
        btn.classList.remove("active")
    }
    console.log(activebuttons)
}

function loadCategories() {
    // fetch data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // convert promise to json
        .then(res => res.json())
        // sent data to display
        .then(data => displayCategories(data.categories))
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            document.getElementById("btn-all").classList.add("active")
            displayVideos(data.videos)
        })
}

function displayCategories(categories) {
    // console.log(categories)
    // get the category div
    const categoryCotainer = document.getElementById("category-container")
    for (let category of categories) {
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML = `
    <button id="btn-${category.category_id}" onclick="displayCategoryVideo(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `
        categoryCotainer.appendChild(categoryDiv)
    }
}

const displayVideos = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML = ""
    if (videos.length == 0) {
        videoContainer.innerHTML = `
          <div class="col-span-full items-center text-center space-y-3 mt-14">
                <img class="mx-auto" src="assets/Icon.png" alt="" srcset="">
                <h2 class="text-3xl font-semibold">
                    Opps, There is no content here.
                </h2>
            </div>
        `
    }
    videos.forEach((video) => {
        const videoCard = document.createElement("div")

        videoCard.innerHTML = `
        <div class="card bg-base-100">
           <figure class="relative">
             <img class="w-full h-[150px] object-cover" src="${video.thumbnail
            }" alt="Shoes" />
             <span
               class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
               >3hrs 56 min ago</span
             >
           </figure>
   
           <div class="flex gap-3 px-0 py-5">
             <div class="profile">
               <div class="avatar">
                 <div
                   class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
                 >
                   <img
                     src="${video.authors[0].profile_picture}"
                   />
                 </div>
               </div>
             </div>
   
             <div class="intro">
               <h2 class="text-sm font-semibold">Midnight Serenade</h2>
               <p class="text-sm text-gray-400 flex gap-1">
                ${video.authors[0].profile_name}
                 ${video.authors[0].verified == true
                ? `<img
                   class="w-5 h-5"
                   src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                   alt=""
                 />`
                : ``
            }
               </p>
               <p class="text-sm text-gray-400">${video.others.views} views</p>
             </div>
   
           </div>
           <button onclick=loadVideoDetails('${video.video_id
            }') class="btn btn-block">Show Details</button>
         </div>
       
       `;

        videoContainer.appendChild(videoCard);
    });
}

const displayCategoryVideo = (id) => {

    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add('active')
            // csonsole.log(clickedButton)
            displayVideos(data.category)
        })
}

// function displayVideos(videos) {
//     const videoContainer = document.getElementById("video-container ")
//     for (let video of videos) {
//         console.log(video)
//         const videocart = document.createElement("div")
//         videocart.classList.add('cardbg-slate-100p-3')
//         videocart.innerHTML = `
//         <div>
//             <img src="${video.thumbnail}" alt="">
//         </div>
//         <div>
//             <div>
//                 <img src="${video.authors[0].profile_picture}" alt="">
//                 <h1>${video.title}</h1>
//             <div>
//             <p>Awlad Hossain</p>

//             </div>
//             <p>91k views</p>
//             </div>

//         </div>
//         `
//         videoContainer.appendChild(videocart)
//     }
// }

loadCategories()



// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }