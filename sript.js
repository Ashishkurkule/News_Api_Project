const API_Key='95802db36af94d6084fea791eab1ec0e';

const blockcontainer=document.getElementById('block-container');
const searchfield= document.getElementById('search-input')
const searchbutton=document.getElementById('search-button')

async function fetchRandomNews(){
    try{
        const apiurl= `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apikey=${API_Key}`;
        const response=await fetch(apiurl);
        const data= await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fetching random news",error);
        return[];

    }
}
searchbutton.addEventListener("click",async ()=>{
    const query=searchfield.value.trim();
    if(query!==""){
        try{
            const articles=await fetchNewsQuery(query)
            displaybox(articles)

        }catch(error){
            console.log("Error fetching news by query",error);

        }
    }
});
async function fetchNewsQuery(query){
    try{
        const apiurl= `https://newsapi.org/v2/everything?q=${query}&pageSize=5&apikey=${API_Key}`;
        const response=await fetch(apiurl);
        const data= await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fetching random news",error);
        return[];

    }


}


function displaybox(articles){
    blockcontainer.innerHTML="";
    articles.forEach((article) =>{
        const blockcard=document.createElement("div")
        blockcard.classList.add("card")
        const img=document.createElement("img")
        img.src=article.urlToImage
        img.alt=article.title
        const title=document.createElement("h2")
        const trunktitle=article.title.length>30? article.title.slice(0,30) +".....":article.title;
        title.textContent=trunktitle;
        title.textContent=article.title
        const description =document.createElement("p")
        description.textContent=article.description
        blockcard.appendChild(img);
        blockcard.appendChild(title);
        blockcard.appendChild(description);
        blockcard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        });
        blockcontainer.appendChild(blockcard);
       
    });


}

(async () =>{
    try{
        const articles=await fetchRandomNews();
        displaybox(articles);

    }catch(error){
        console.error("Error fetching random news",error);

    }
})();
