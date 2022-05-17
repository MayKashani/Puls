
const modal = document.querySelector(".modal")
const details = document.querySelector("#details")
const results = document.querySelector("#results")
var data = ""

function search() { 
   axios.get('http://api.tvmaze.com/search/shows?q='+document.getElementsByTagName("input")[0].value)
   .then(res => {
       if(res.status==200)
           renderResults(res.data)
       else renderErr()
   })
}

function renderResults(res) {
    results.innerHTML=''
    data = res;
    for (var i = 0; i < res.length && 10 ; i++) {
        div = document.createElement('div')
        div.className = 'card'
        div.id=i
        title = document.createElement('h3')
        title.innerText =  res[i].show.name
        div.appendChild(title)
        div.addEventListener('click',function () { renderDetails(data[this.id].show)})
        res[i].show.image!==null && res[i].show.image.medium!==null ? getImage(res[i].show.image.medium,div) : ""

        results.appendChild(div)
    }
}

function renderErr() { 
    results.innerText = 'No results'
}

function renderDetails(show) {
    show.image.length>0 && show.image.medium!== null ? getImage(show.image.medium,d) : ""

    details.innerHTML = '<span class="close" onclick="closeModal()"> Close</span>'
    
    h1 = document.createElement('h1')
    h1.innerText = show.name
    link = document.createElement('a')
    link.href = show.officialSite
    rating = document.createElement('div')
    rating.innerText = show.rating.average
    summary = document.createElement('div')
    summary.innerHTML = show.summary
    
    elements = [h1,link,rating,summary]
    
    elements.forEach(element => {
      details.appendChild(element)
    });

    getCast(show.id)
    modal.setAttribute('style','display:block')
    
}

function getImage(url,elem) {
        img = document.createElement('img')
        img.src = url
        elem.appendChild(img)  
}


function closeModal(){
    modal.style.display="none"
}

function getCast(id){
    axios.get('http://api.tvmaze.com/shows/'+id+'/cast')
    .then(res => { 
        ul = document.createElement('ul')
        for(var i=0;i<res.data.length;i++){
            console.log(res.data[i])
            li = document.createElement('li')
            li.innerText = res.data[i].person.name +" as "+ res.data[i].character.name
            getImage(res.data[i].person.image.medium,li)
            ul.appendChild(li)
        }
        details.appendChild(ul)

    })
}