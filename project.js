// const arr=['general']
const arr=['general','entertainment','business','health','science','sports','technology']
const language={english:'en',denmark:'de',arabic:'ar',spanish:'es',france:'fr',hebrew:'he',italy:'it',dutch:'nl',norway:'no',portugese:'pt',russian:'ru',udaru:'ud',zhcn:'zh'};
const country={India:'in',Uae:'ae',Newziland:'nz',China:'cn',Serbia:'rs',Soudhi:'sa',California:'ca'};
const sortBy={relevancy:'relevency',popularity:'popularity',publishment:'publishment'};

let cn='in';
let sort='publishment'
let lang='en';
let pageSize=4;
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
console.log(itiratingCard);
itiratingCard.children[0].src=imageUrl
itiratingCard.children[1].children[0].innerText=title
itiratingCard.children[1].children[1].innerText=description
itiratingCard.children[1].children[2].href=url
itiratingCard.children[1].children[2].innerText="read more"
return itiratingCard;
}

async function loadData(country='in',category="general",sortBy='publishment',language='en',pageSize=4,){
    let url=`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&category=${category}&sortBy=${sortBy}&apiKey=0b7c169fc13c4ea5997a656f501c4206`
    let data=await fetch(url)
    let parseData=await data.json();
    return parseData;
}

let someHeadlines=document.querySelectorAll('.some-headlines')
let searchData;

async function updateFunction(cn,category,sort,lang,pageSize){
let i=0;
someHeadlines.forEach(async(e)=>{
  console.log(e.nextSibling)
  if(i==arr.length){
    i==0
  }
  const data=await loadData(cn,`${arr[i++]}`,sort,lang,pageSize)
  searchData= data.articles.map((a)=>{
    let res=''
    if(a.description==null){
      res='there is no heading available to this'
    }else{
      res=a.description.slice(0,60)
    }
    let card=app(a.title,res,a.urlToImage==null?'https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152_960_720.jpg':a.urlToImage,a.url);
    e.append(card)
    return {title:a.title,description:res,element:card}
  })
  let button=document.createElement('button')
  button.classList.add('view-more')
  button.innerText='view more'
  e.insertAdjacentElement('afterend',button)
})
}
function deletAll(){
  someHeadlines.forEach(e=>{
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
  })  
}

updateFunction(cn,category,sort,lang,pageSize);


let dropDown1=document.querySelector('.d1')
let dropDown2=document.querySelector('.d2')
let dropDown3=document.querySelector('.d3')

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

const countries=document.querySelectorAll('.country-a')
console.log(countries)
let j=0;
let values=Object.values(country)
  countries.forEach(e=>{
    let countryName=values[j++]
    e.addEventListener('click',()=>{
      deletAll();
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
  console.log(sortNews)
  let c=0;
  let sortValues=Object.values(sortBy)
  console.log(sortValues)
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
    let value=input.value;
    searchData.forEach(e=>{
      console.log(searchData)
      console.log(e.title)
    let visible=e.title.includes(value)||e.description.includes(value)
    e.element.classList.toggle('d-none',!visible)
  })
})