// console.log("connected")

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
        .then(data => displayVideos(data.videos))
}

function displayCategories(categories) {
    // console.log(categories)
    // get the category div
    const categoryCotainer = document.getElementById("category-container")
    for (let category of categories) {
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `
        categoryCotainer.appendChild(categoryDiv)
    }
}

const displayVideos = (videos)=>{
    // console.log(videos)
    const videoContainer = document.getElementById("video-container")

    videos.forEach((video) => {
        const videoCard = document.createElement("div")

        videoCard.innerHTML = `
        <h1>${video.title}</h1>
        `;

        videoContainer.appendChild(videoCard);
    });
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
loadVideos()

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