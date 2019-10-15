let newsSearchForm;
let newsKeyword;
let stateSearch;
let newsSearchDisplay = document.getElementById("newsSearchDisplay");
let newsURL = "https://developer.nps.gov/api/v1/newsreleases?stateCode=co&q=rocky%20mountain%20national%20park&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq"


async function fetchNewsData(){
    response = await fetch(newsURL)

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
                    <a href="#" class="btn btn-info" id="">Events</a>
                    <a href="#" class="btn btn-info" id="">News</a>
                    <a href="#" class="btn btn-info" id="">Campgrounds</a>
                
                    </div>
                    <div class="card-footer text-muted">Article Date: ${news.releasedate}</div>
                    </div>` 
        })
        newsSearchDisplay.innerHTML = newsInfo.join("")
    })
}

displayNewsData()