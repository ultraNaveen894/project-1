// const arr=['general']
const arr=['general','entertainment','business','health','science','sports','technology']
const language={english:'en',denmark:'de',arabic:'ar',spanish:'es',france:'fr',hebrew:'he',italy:'it',dutch:'nl',norway:'no',portugese:'pt',russian:'ru',udaru:'ud',zhcn:'zh'};
const country={India:'in',Uae:'ae',Newziland:'nz',China:'cn',Serbia:'rs',Soudhi:'sa',California:'ca'};
const sortBy={relevancy:'relevency',popularity:'popularity',publishment:'publishment'};

let cn='in';
let sort='publishment'
let lang='en';
let pageSize=30;
let category='general';


// function app(title,description,imageUrl,url){
// let div1=document.createElement('div')
// let div2=document.createElement('div')
// let img=document.createElement('img')
// let h5=document.createElement('h5')
// let p=document.createElement('p')
// let a=document.createElement('a')
// div1.classList.add('card')
// div1.style.width='18rem'
// div2.classList.add('card-body')
// img.classList.add('card-img-top')
// img.src=imageUrl
// h5.classList.add('card-title')
// h5.innerText=title
// p.classList.add('card-text')
// p.innerText=description
// a.classList.add('btn','btn-primary')
// a.innerText='read more'
// a.href=url
// div2.append(h5,p,a);
// div1.append(img,div2)
// return div1;
// }



function app(title,description,imageUrl,url){
  let card=document.querySelector('[template-card]')
let itiratingCard=card.content.cloneNode(true).children[0]
itiratingCard.children[0].src=imageUrl
itiratingCard.children[1].children[0].innerText=title
itiratingCard.children[1].children[1].innerText=description
itiratingCard.children[1].children[2].href=url
itiratingCard.children[1].children[2].innerText="read more"
return itiratingCard;
}

async function loadData(country='in',category="general",sortBy='publishment',language='en',pageSize=20,){
    let url=`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&category=${category}&sortBy=${sortBy}&apiKey=0b7c169fc13c4ea5997a656f501c4206`
    let data=await fetch(url)
    let parseData=await data.json();
    return parseData;
}

let searchData;

async function updateFunction(cn,category,sort,lang,pageSize){
  console.log(cn)
  const data=await loadData(cn,category,sort,lang,pageSize)
  searchData= data.articles.map((a)=>{
    let res=''
    if(a.description==null){
      res='there is no heading available to this'
    }else{
      res=a.description.slice(0,75)
    }
    let card=app(a.title,res,a.urlToImage==null?'https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152_960_720.jpg':a.urlToImage,a.url);
    cards.append(card)
    return {title:a.title.toLowerCase(),description:res.toLowerCase(),element:card}
  })
}
function deletAll(){
    var child = cards.lastElementChild; 
    while (child) {
        cards.removeChild(child);
        child = cards.lastElementChild;
    }
}

updateFunction(cn,category,sort,lang,pageSize);


let dropDown1=document.querySelector('.d1')
let dropDown2=document.querySelector('.d2')
let dropDown3=document.querySelector('.d3')
let dropDown4=document.querySelector('.d4')

for(let i in language){
  let li=document.createElement('li')
  let a=document.createElement('a')
  a.classList.add('lan-a')
  a.href=""
  a.innerText=i;
  li.append(a)
  dropDown1.append(li)
}
for(let i in country){
  let li=document.createElement('li')
  let a=document.createElement('a')
  li.classList.add('country-li')
  a.classList.add('country-a')
  a.innerText=i;
  li.append(a)
  dropDown2.append(li)
}
for(let i in sortBy){
  let li=document.createElement('li')
  let a=document.createElement('a')
  li.classList.add('sort-li')
  a.classList.add('sort-a')
  a.innerText=i;
  li.append(a)
  dropDown3.append(li)
}
for(let i of arr){
  let li=document.createElement('li')
  let a=document.createElement('a')
  li.classList.add('sort-li')
  a.classList.add('category-a')
  a.innerText=i;
  li.append(a)
  dropDown4.append(li)
}

let categories=document.querySelectorAll('.category-a')
let heading=document.querySelector('.heading')
let cards=document.querySelector('.cards')
let i=0;
categories.forEach(e=>{
  let cat=arr[i++]
  e.addEventListener('click',a=>{
    heading.innerText=cat
    deletAll();
    updateFunction(cn,cat,sort,lang,pageSize)
    category=cat;
  })
})

const countries=document.querySelectorAll('.country-a')
// console.log(countries)
let j=0;
let values=Object.values(country)
  countries.forEach(e=>{
    let countryName=values[j++]
    e.addEventListener('click',()=>{
      deletAll();
      console.log(countryName)
      updateFunction(countryName,category,sort,lang,pageSize);
      cn=countryName;
    })
  })


const languages=document.querySelectorAll('.lang-a')
let k=0;
let langValues=Object.values(language)
  languages.forEach(e=>{
    let languageName=values[j++]
    e.addEventListener('click',()=>{
      deletAll();
      updateFunction(countryName,category,sort,languageName,pageSize);
    })
  })

  const sortNews=document.querySelectorAll('.sort-a');
  // console.log(sortNews)
  let c=0;
  let sortValues=Object.values(sortBy)
  // console.log(sortValues)
    sortNews.forEach(e=>{
      let sortby=sortValues[c++]
      e.addEventListener('click',()=>{
        deletAll();
        console.log(sortby)
        updateFunction(cn,category,sortby,lang,pageSize);
        sort=sortby;
      })
    })

    let input=document.querySelector('.form-control')
  input.addEventListener('input',()=>{
    let value=input.value.toLowerCase();;
    searchData.forEach(e=>{
      console.log(searchData)
      console.log(e.title)
    let visible=e.title.includes(value)||e.description.includes(value)
    e.element.classList.toggle('d-none',!visible)
  })
})

