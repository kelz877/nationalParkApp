//get event display
let eventSearchDisplay = document.getElementById("eventSearchDisplay")
//get event search form
let eventSearchForm = document.getElementById("eventSearchForm").addEventListener("submit", submitFunction)
//get \keyword from search
let eventKeyword = document.getElementById("eventKeyword")
let stateSearch = document.getElementById("stateSearch")
let apiKey = `&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq`
//this is getting the park id from when you click the events button on the park page..
var urlParams = new URLSearchParams(window.location.search);
//if true
console.log(urlParams.has("parkid"))

if(urlParams.has("parkid")){
    let parkCode = urlParams.get('parkid')
    console.log(parkCode)
    displayEventInfo()

}


//refactor urls and start with the beginning of the url and then just add to the end of it based on the search if(state search) { testurl + stateCode=${state} etc}

//retrieve data from api
async function retrieveEventData(){
    let parkCode = urlParams.get('parkid')
    console.log(parkCode)
    urlPrefix = `https://developer.nps.gov/api/v1/events?`
    stateSearch = stateSearch.value
    eventKeyword = eventKeyword.value
    eventKeyword = encodeURIComponent(eventKeyword)
    if(stateSearch != '' && eventKeyword != ''){
        testurl = urlPrefix + `stateCode=${stateSearch}&q=${eventKeyword}` + apiKey
        console.log(testurl)
    } else if(stateSearch != '' && eventKeyword === ''){
        testurl = urlPrefix + `stateCode=${stateSearch}` + apiKey
    } else if(stateSearch === '' && eventKeyword != ''){
        testurl = urlPrefix + `q?=${eventKeyword}` + apiKey 
    } else{
        testurl = urlPrefix + `parkCode=${parkCode}` + apiKey
    }

    let response = await fetch(testurl)
    let json = await response.json()
    //console.log(json)
    return json
}

function displayEventInfo(){
    //console.log(parkCode)
    retrieveEventData().then(json => {
        eventObj = Object.values(json)
        //console.log(eventObj)
        console.log(eventObj[2])
        eventObj = eventObj[2]
        let eventData = eventObj.map(event => {
            //console.log(event.description)
            description = event.description
            description = description.replace("<p>", "")
            description = description.replace("</p>","")

            //console.log(description)
            return `<div class="card mt-2">
            <h5 class="card-header" id="parkName">${event.parkfullname}</h5>
            <div class="card-body">
                <h5 class="card-title"> ${event.location ? event.location : "Location Inside Park Unknown"} | ${event.title ? event.title : "Event Title Unknown"}</h5>
                
                <span class="card-text">Description: ${description}</span>
                
                <p class="card-text">Fee Info: ${event.feeinfo ? event.feeinfo : "No additional fee information provided"}</p>

                <p class="card-text">${event.recurrencedatestart ? event.recurrencedatestart : "No Start Date Provided"} ${event.recurrencedateend ? event.recurrencedateend : "No End Date Provided"}</p>

                <a href="#" class="btn btn-info" id="">Alerts</a>
                <a href="#" class="btn btn-info" id="">Events</a>
                <a href="#" class="btn btn-info" id="">News</a>
                <a href="#" class="btn btn-info" id="">Campgrounds</a>
        </div></div>`
        })
        eventSearchDisplay.innerHTML = eventData.join('')
        console.log("event display successful")
    })
}

//display park info function

async function submitFunction(){
    event.preventDefault()
    
    displayEventInfo()
}


//submit function on click

