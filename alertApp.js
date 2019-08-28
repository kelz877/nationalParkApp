
let alertKeyword = document.getElementById("alertKeyword");
let stateSearch = document.getElementById("stateSearch");
let alertSearchForm = document.getElementById("alertSearchForm").addEventListener("submit", submitFunction)

let alertSearchDisplay = document.getElementById("alertSearchDisplay")
let apiKey = `&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq`
let urlPrefix = `https://developer.nps.gov/api/v1/alerts?`

var urlParams = new URLSearchParams(window.location.search);


if(urlParams.has('parkid')){
    parkCode = urlParams.get('parkid')
    displayAlertInfo()
}

//fetch json
async function fetchAlertData(){
    let parkCode = urlParams.get('parkid')
    alertKeyword = alertKeyword.value
    alertKeyword = encodeURIComponent(alertKeyword)
    stateSearch = stateSearch.value
    if(stateSearch != '' && alertKeyword != ''){
        urlLink = urlPrefix + `stateCode=${stateSearch}&q=${alertKeyword}` + apiKey
    } else if(stateSearch != '' && alertKeyword === ''){ 
        urlLink = urlPrefix + `stateCode=${stateSearch}` + apiKey
    } else if(stateSearch === '' && alertKeyword != ''){
        urlLink = urlPrefix + `q=${alertKeyword}` + apiKey
    }else{
        urlLink = urlPrefix + `parkCode=${parkCode}` + apiKey
    }

    let response = await fetch(urlLink)

    let json = await response.json()
    console.log(json)
    return json
}


function displayAlertInfo(){
    fetchAlertData().then(json => {
        alertObj = json.data
        console.log(alertObj)

        let alertData = alertObj.map(alert => {
            return `<div class="card mt-2">
            <h5 class="card-header" id="parkName"></h5>
            <div class="card-body">
                <h5 class="card-title"> ${alert.title ? alert.title : "No alert title Known"}</h5>
                
                <p class="card-text">Description: ${alert.description}</p>
                

                <a href="${alert.url}" class="btn btn-info" id="">More Information</a>

                <a href="#" class="btn btn-info" id="">Alerts</a>
                <a href="events.html?parkid=${alert.parkCode}" class="btn btn-info" id="">Events</a>
                <a href="#" class="btn btn-info" id="">News</a>
                <a href="#" class="btn btn-info" id="">Campgrounds</a>
        </div></div>`
        })

        alertSearchDisplay.innerHTML = alertData.join("")
    })
}


async function submitFunction(){
    event.preventDefault()
    displayAlertInfo()
}


