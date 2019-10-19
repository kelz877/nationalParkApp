let campKeyword = document.getElementById('campKeyword');
let stateSearch = document.getElementById('stateSearch');
let campSearchForm = document.getElementById('campSearchForm').addEventListener('submit', submitFunction);
let campSearchDisplay = document.getElementById('campSearchDisplay');
let apiKey = `&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq`



var urlParams = new URLSearchParams(window.location.search)

if(urlParams.has('parkid')){
    parkCode = urlParams.get('parkid')
    displayCampData()
}

async function fetchCampData(){
    let parkCode = urlParams.get('parkid')
    //console.log(parkCode)
    let urlPrefix = `https://developer.nps.gov/api/v1/campgrounds?`
    campKeyword = encodeURIComponent(campKeyword.value)
    stateSearch = stateSearch.value
    if(campKeyword != '' && stateSearch != ''){
        testUrl = urlPrefix + `q=${campKeyword}&stateCode=${stateSearch}` + apiKey
    } else if(campKeyword != '' && stateSearch === ''){
        testUrl = urlPrefix + `q=${campKeyword}` + apiKey 
    } else if(campKeyword === '' && stateSearch != ''){
        testUrl = urlPrefix + `stateCode=${stateSearch}` + apiKey
    } else{
        testUrl = urlPrefix + `parkCode=${parkCode}` + apiKey
    }
    let response = await fetch(testUrl)
    let json = await response.json()
    console.log(json)
    return json 
}

function displayCampData(){
    fetchCampData().then(json => {
        campObj = json.data
        console.log(campObj)
        let campData = campObj.map(camps => {          
            return `<div class="card mt-2">
            <h5 class="card-header" id="">${camps.name}</h5>
            <div class="card-body">
                <p class="card-text">${camps.description}</p>

                <p class="card-text">${camps.accessibility.additionalinfo}</p>
                <p class="card-text">Directions: ${camps.directionsoverview}</p>

                <p class="card-text">Weather: ${camps.weatheroverview}</p>

                <a href="alerts.html?parkid=${camps.parkCode}" class="btn btn-info" id="">Alerts</a>
                <a href="#" class="btn btn-info" id="">Events</a>
                <a href="#" class="btn btn-info" id="">News</a>
                <a href="#" class="btn btn-info" id="">Campgrounds</a>
               
        </div>
         <div class="card-footer text-muted">Total Campsites: ${camps.campsites.totalsites} | Tent Only Sites: ${camps.campsites.tentonly}</div>
        </div>`
        })

        campSearchDisplay.innerHTML = campData.join('')


    })
}


async function submitFunction(){
    event.preventDefault()
    displayCampData()
}
