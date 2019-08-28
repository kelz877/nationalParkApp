let parkSearchDisplay = document.getElementById("parkSearchDisplay")
let parkSearchForm = document.getElementById("parkSearchForm").addEventListener("submit", submitFunction)
//state search
let stateSearch = document.getElementById("stateSearch")
let parkKeyword = document.getElementById("parkKeyword")


//main park search
async function retrieveParkData(){
    parkKeyword = parkKeyword.value
    stateSearch = stateSearch.value
    //console.log(stateSearch)
    //console.log(parkKeyword)
    let testURL = `https://developer.nps.gov/api/v1/parks?stateCode=${stateSearch}&q=${parkKeyword}&api_key=bTMAlhV0gL4xjxGQJ4AtXnOMCaUe7lcTUEn3aQrq`
    let response = await fetch(testURL) // makes contact with the url
    let json = await response.json() //access data at the url
    //let parkInfo = (Object.values(json))
    //console.log(json)

    return json
}


function displayParkInfo(){
    retrieveParkData().then(json => {

    let parkObj = Object.values(json)
    console.log(parkObj[1])
    parkObj = parkObj[1]
    console.log(parkObj[1])
    //let stateParkInfo = parkObj[1]
    let parkInfo = parkObj.map(park => {
        //console.log(park.description)
        //console.log(value.states)
        return `<div class="card mt-2">
                <h5 class="card-header" id="parkName">${park.name}</h5>
                <div class="card-body">
                <h5 class="card-title" id="parkState"> ${park.designation} in ${park.states}</h5>
                <p class="card-text" id="parkDescription">${park.description}</p>
                <a href="${park.url}" class="btn btn-info" id="">Park Website</a>
                <a href="#" class="btn btn-info" id="">Alerts</a>
                <a href="events.html?parkid=${park.parkCode}" class="btn btn-info" id="">Events</a>
                <a href="#" class="btn btn-info" id="">News</a>
                <a href="#" class="btn btn-info" id="">Campgrounds</a>
            </div></div>`




    })
    parkSearchDisplay.innerHTML = parkInfo.join('')
    console.log("display successful")  
    })
}



//this runs when the submit button is clicked
async function submitFunction(){
    event.preventDefault()



    displayParkInfo()
}


