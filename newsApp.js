let newsSearchForm = document.getElementById("newsSearchForm").addEventListener("submit", submitFunction);
let newsKeyword = document.getElementById("newsKeyword");
let stateSearch = document.getElementById("stateSearch");
let newsSearchDisplay = document.getElementById("newsSearchDisplay");
let newsURL = "https://developer.nps.gov/api/v1/newsreleases?stateCode=co&q=rocky%20mountain%20national%20park&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq"
let apiKey = `&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq`
let urlPrefix = `https://developer.nps.gov/api/v1/newsreleases?`

//get the state from the map click
let urlParams = new URLSearchParams(window.location.search);

if(urlParams.has("parkid")){
    parkCode = urlParams.get('parkid')
    displayNewsData()
}

async function fetchNewsData(){
    let parkCode = urlParams.get('parkid')
    newsKeyword = newsKeyword.value
    newsKeyword = encodeURIComponent(newsKeyword)
    stateSearch = stateSearch.value
    if(stateSearch != '' && newsKeyword != ''){
        urlLink = urlPrefix + `stateCode=${stateSearch}&q=${newsKeyword}` + apiKey
    } else if(stateSearch != '' && newsKeyword === ''){ 
        urlLink = urlPrefix + `stateCode=${stateSearch}` + apiKey
    } else if(stateSearch === '' && newsKeyword != ''){
        urlLink = urlPrefix + `q=${newsKeyword}` + apiKey
    }else{
        urlLink = urlPrefix + `parkCode=${parkCode}` + apiKey
    }

    
    response = await fetch(urlLink)


    json = await response.json()
    console.log(json)
    return json
}


function displayNewsData(){
    fetchNewsData().then(json => {
        newsData = json.data
        console.log(newsData)
        newsInfo = newsData.map(news => {
            return `<div class="card mt-2">
                    <h5 class="card-header" id="">${news.title}</h5>
                    <div class="card-body">
                    <p class="card-text">${news.abstract}</p>


                    <a href="alerts.html?parkid=${news.parkCode}" class="btn btn-info" id="">Alerts</a>
                    <a href="events.html?parkid=${news.parkCode}" class="btn btn-info" id="">Events</a>
                    <a href=""campgrounds.html?parkid=${news.parkCode}"" class="btn btn-info" id="">Campgrounds</a>
                
                    </div>
                    <div class="card-footer text-muted">Article Date: ${news.releasedate}</div>
                    </div>` 
        })
        newsSearchDisplay.innerHTML = newsInfo.join("")
    })
}

async function submitFunction(){
    event.preventDefault()
    displayNewsData()
}
