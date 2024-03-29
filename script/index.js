/*--------------------------------------------------------------------
* URL ENDPOINTS GO HERE     #global_varible
--------------------------------------------------------------------*/
const urlEndpoints = {
    newsData: `https://newsapi.org/v2/top-headlines?country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`, //API Key for NewsAPI.org
    memeDataSource: `https://meme-api.herokuapp.com/gimme`,
    techData: `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`,
    busiData: `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`,
    sportsData: `https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=b1d2a2d19a1c47fd822364fb24e03910`
};
/*--------------------------------------------------------------------
* Storage Key Variable.   #global_varible 
--------------------------------------------------------------------*/
const STORAGE_KEY = 'articles';
const MEME_STORAGE_KEY = 'memes';
const TECH_STORAGE_KEY = 'techarticles';
const BUSI_STORAGE_KEY = 'busarticles';
const SPORT_STORAGE_KEY = 'sportarticles'
const CLICK_STORAGE_KEY = 'click'
/*--------------------------------------------------------------------
* FUNCTION - store Article Data to localStorage. 
--------------------------------------------------------------------*/
function saveToStorage(jsonArticleData) {
    const savedArticles = JSON.stringify(jsonArticleData.articles)
    localStorage.setItem(STORAGE_KEY, savedArticles)
    return jsonArticleData.articles;
}

function saveMeme(jsonMemeData) {
    const savedMemes = JSON.stringify(addToArray(jsonMemeData.url))
    localStorage.setItem(MEME_STORAGE_KEY, savedMemes)
    return jsonMemeData;
}

function saveTech(jsonTechnoData) {
    const savedTechArticles = JSON.stringify(jsonTechnoData.articles)
    localStorage.setItem(TECH_STORAGE_KEY, savedTechArticles)
    return jsonTechnoData.articles;
}

function saveBus(jsonBusinessData) {
    const savedBusData = JSON.stringify(jsonBusinessData.articles)
    localStorage.setItem(BUSI_STORAGE_KEY, savedBusData)
    return jsonBusinessData.articles;
}

function saveSports(jsonSportData) {
    const savedSportData = JSON.stringify(jsonSportData.articles)
    localStorage.setItem(SPORT_STORAGE_KEY, savedSportData)
    return jsonSportData.articles;
}
const saveClick = localStorage.setItem(CLICK_STORAGE_KEY, "0")

/*--------------------------------------------------------------------
*FUNCTION - GET DATA FROM ALL API.   
This ternary identifies whether or not there is already saved Article Data in local storage. 
a. If there is, we will work out of localStorage. 
b. If there isnt anything in localStorage then 
    1. we will make a call to the API url to search for data. 
    2. THEN we will send the results to be json-ified 
    3. THEN we will send the jsonified-data to localStorage
c. FINALLY we return the array of article Data. 
-------------------------------------------------------------------------------------------*/

const fetchMyData = async () => {
    const articleData = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) :
        await fetch(urlEndpoints.newsData)
        .then(results => results.json())
        .then(jsonifiedData => saveToStorage(jsonifiedData));


    const technoData = localStorage.getItem(TECH_STORAGE_KEY) ? JSON.parse(localStorage.getItem(TECH_STORAGE_KEY)) :
        await fetch(urlEndpoints.techData)
        .then(results => results.json())
        .then(jsonifiedData => saveTech(jsonifiedData));

    const busineData = localStorage.getItem(BUSI_STORAGE_KEY) ? JSON.parse(localStorage.getItem(BUSI_STORAGE_KEY)) :
        await fetch(urlEndpoints.busiData)
        .then(results => results.json())
        .then(jsonifiedData => saveBus(jsonifiedData));

    const sportyData = localStorage.getItem(SPORT_STORAGE_KEY) ? JSON.parse(localStorage.getItem(SPORT_STORAGE_KEY)) :
        await fetch(urlEndpoints.sportsData)
        .then(results => results.json())
        .then(jsonifiedData => saveSports(jsonifiedData));

    // addArticle(articleData);
    addArticle(technoData);
    addArticle(busineData);
    addArticle(sportyData)

    // obtain the meme Data from the endpoint       
    let memeData = await fetch(urlEndpoints.memeDataSource)
        .then(results => results.json())
        .then(jsonMemeData => saveMeme(jsonMemeData))
    await addMemetoScreen(memeData);
    //
}
fetchMyData()
/*--------------------------------------------------------------------
* Function - Append Article to DOM
*  note here:  I did a forEach here to show that everything is on the DOM.  We can easily get 
--------------------------------------------------------------------*/
function addArticle(articleData) {
    articleData.forEach(article => {
        const section = document.createElement('section');
        const newsContent = document.querySelector('.news-content')
        section.innerHTML =
            `
        <h1>${article.title}</h1>
        <img src="${article.urlToImage}">
        <br/>
        <a href=${article.url}>Article Source: ${article.source.name}</a><br />
        <p>Article Description: ${article.description}</p>
        <hr><br/>
        <br /><br />`;
        newsContent.appendChild(section)
    });
};


//TopNews
function getTopNews(articleData) {
    const topNewbtn = document.querySelector("#topNewsBtn"); // Get the button that opens the modal
    const newsmodal = document.querySelector("#topNewsModal"); // Get the modal
    const exitBtn = document.querySelector(".exit");
    topNewbtn.addEventListener('click', () => {
        newsmodal.style.display = "block";
        newsmodal.innerHTML = addArticle(articleData); //
    });
    //When the user clicks anywhere outside of the modal, close it
    exitBtn.addEventListener('click', function (event) {
        if (event.target === event.currentTarget) {
            newsmodal.style.display = "none";
        }
    });
}
getTopNews();

// function getEntNews() {
//     const entbtn = document.querySelector("#entBtn"); // Get the button that opens the modal
//     const entmodal = document.querySelector("#entModal"); // Get the modal
//     entbtn.addEventListener('click', ()=>{
//         entmodal.style.display ="block"; 
//         entmodal.innerHTML = addArticle(); //
//     });
//     //When the user clicks anywhere outside of the modal, close it

// } 
// getEntNews();

// function getSportsNews() {
//     const sportsbtn = document.querySelector("#sportsBtn"); // Get the button that opens the modal
//     const sportsmodal = document.querySelector("#sportsModal"); // Get the modal
//     sportsbtn.addEtechtListener('click', ()=>{
//         sportsmodal.style.display ="block"; 
//         sportsmodal.innerHTML = addArticle(); //
//     });    
// } 
// getSportsNews();

// function getTechNews() {
//     const techbtn = document.querySelector("#techBtn"); // Get the button that opens the modal
//     const techmodal = document.querySelector("#techModal"); // Get the modal
//     techbtn.addEtechtListener('click', ()=>{
//         techmodal.style.display ="block"; 
//         techmodal.innerHTML = addArticle(); //
//     });
//     //When the user clicks anywhere outside of the modal, close it

// } 
// getTechNews();


function exitButton() {
    // const exitBtn = document.querySelector(".exit");
    const popups = document.querySelectorAll("popup");
    const entexitBtn = document.getElementById("entExit");
    entexitBtn.addEventListener('click', function (event) {
        console.log('click')
        if (event.target === event.currentTarget) {
            popups.style.display = "none";
        }
    });
}
exitButton()

// get the Disclaimer modal
function disclaimer() {
    const modal = document.getElementById("myModal");

    //get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    //when the user clicks on span(x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    //when the user clicks anywhere outside of the modal, close the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
disclaimer();


function addToArray(jsonMemeData) {
    const memeArray = JSON.parse(localStorage.getItem(MEME_STORAGE_KEY)) || []
    memeArray.push(jsonMemeData);
    return (memeArray)
}


async function getNewMeme() {
    const memeDataJson = await fetch(urlEndpoints.memeDataSource)
    const memeData = await memeDataJson.json()
    saveMeme(memeData)
    let index = JSON.parse(localStorage.getItem(CLICK_STORAGE_KEY));
    let click = ++index;
    localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(click))
    console.log(memeData)
    document.getElementById('memeImg').innerHTML = `<img src='${memeData.url}'/>`;
}

function rightbtn() {
    const rightbtn = document.getElementById('rightbtn')
    //    localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(click));
    rightbtn.addEventListener('click', function () {
        const memeInStorage = JSON.parse(localStorage.getItem(MEME_STORAGE_KEY));
        let index = JSON.parse(localStorage.getItem(CLICK_STORAGE_KEY));
        index++
        // console.log(" ")
        // console.log("INDEX: ", index)
        // console.log("LENGTH: ", memeInStorage.length);
        // console.log(" ")
        if(index < memeInStorage.length){
            // console.log('testing');
            let click = index
            // console.log(click);
            // console.log(memeInStorage)
            oldImage = memeInStorage[click]
            // console.log(oldImage);
            localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(click))
            document.getElementById('memeImg').innerHTML =`<img src='${oldImage}'/>`
        }else{
            // console.log("im being run");
            return getNewMeme();
        }
    });
};
rightbtn()

function addMemetoScreen(memeData) {
    document.getElementById('memeImg').innerHTML = `'<img  src='${memeData.url}'/>'`
}

function leftbtn() {
    const leftbtn = document.getElementById('leftbtn');
    leftbtn.addEventListener('click', (e) => {
        let index = JSON.parse(localStorage.getItem(CLICK_STORAGE_KEY))
        // console.log(index);
        if (index > 0) {
            const memeInStorage = JSON.parse(localStorage.getItem(MEME_STORAGE_KEY))
            // console.log(memeInStorage);
            let click = --index
            // console.log(click)
            localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(click))
            lastImage = memeInStorage[click]
            document.getElementById('memeImg').innerHTML = `<img src='${lastImage}'/>`
        } else {
            alert(`You're at the beginning`)
        }
    });
};
leftbtn();