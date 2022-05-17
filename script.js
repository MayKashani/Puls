
const modal = document.querySelector(".modal")
const d = document.querySelector("#details")
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
    results = document.querySelector('#results')
    results.innerHTML=''
    data = res;
    console.log(data)
    for (var i = 0; i < res.length; i++) {
        div = document.createElement('div')
        div.className = 'card'
        div.id=i
        div.innerText = res[i].show.name
        div.addEventListener('click',function () { renderDetails(data[this.id].show)})
        results.appendChild(div)
    }
}

function renderErr() { 
    document.querySelector('#results').innerText = 'No results'
}

function renderDetails(show) {
    //let image = show.image.medium ? getImage(show.image.medium) : ""

    
    details = document.querySelector("#details")
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

// function getImage(url) {
//     axios.get(url)
//     .then(res=> {
//         img = document.createElement('img')
//         img.src = res.data
//         console.log(img)
//         return img;
//     }
//     )
// }


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
            ul.appendChild(li)
        }
        d.appendChild(ul)

    })
}