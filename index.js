/* 
    Bonus Challenge 

    Fetch the list of 642 open APIs from
        https://api.publicapis.org/entries
        
    Create a my-api component
        display the name and category of the API,
        the description, and also display the type 
        of Auth (if any) and whether or not the API 
        supports HTTPS
    
    Use CSS Grid to style my-api
        The title and category should be 
        listed as Title (Category) 
        and should link to the API docs
        
    The grid should have 4 rows
        3rem, 1rem, 4rem, 3rem respectively
        and 3 columns each 1/3rd of available width
        
    Finally, display all of the APIs
*/

let query = ""


async function getAPIs() {
    let res = ""
    if(query === ""){
        res = await fetch(`https://api.publicapis.org/entries`)
    } else {
        res = await fetch(`https://api.publicapis.org/entries?category=${query}`)
    }
    const data = await res.json()
    return data.entries.splice(0,25)
}

function getAPIhtml(myAPI) {
    return `
        <div class="my-api">
            <div class="my-api-title"><a href="${myAPI.Link}">${myAPI.API} (${myAPI.Category})</a></div>
            <div class="my-api-description">${myAPI.Description}</div>
            <div class="my-api-auth">Auth: ${myAPI.Auth!=""? myAPI.Auth : "None"}</div>
            <div class="my-api-https">HTTPS: ${myAPI.HTTPS}</div>
        </div>`
}

function displayAPIs(myAPIs) {
        document.getElementById("main").innerHTML = `
            <div class="my-apis">
                ${myAPIs.map(getAPIhtml).join('')}
            </div>`
}

getAPIs()
    .then(displayAPIs)
    .catch(e => console.log(`Error: ${e}`))
    
    

async function getCategories() {
    const res = await fetch('https://api.publicapis.org/categories')
    const data = await res.json()
    return data.categories
}

function getCategoryHtml(category){
    return `
    <option value="${category}">${category}</option>
    `
}

function displayCategories(categories){
        document.getElementById('selector-container').innerHTML =`
        <label for="category-select">Choose a category:</label>
        <select name="categories" id="category-select">
            <option value="">--Please choose an option--</option>
            ${categories.map(getCategoryHtml).join('')}
        </select>`
        
        document.getElementById('category-select').addEventListener('change',() =>{
            query = document.getElementById('category-select').value
            getAPIs().then(displayAPIs)
            .catch(e => console.log(`Error: ${e}`))
        })
}

getCategories().then(displayCategories).catch(err => console.log(err))