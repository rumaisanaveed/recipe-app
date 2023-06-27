let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
let searchBtn = document.querySelector("#search-btn")
let recipeCont = document.querySelector('#output')

searchBtn.addEventListener("click",() => {
    let userInput = document.querySelector('#input-btn').value
    fetch(url + userInput)
    .then((response) => {
         return response.json();
    }).then((recipe) => {
        console .log(recipe)
        // It is an object containing all information 
        let meal = recipe.meals[0]
        let instructions = meal["strInstructions"]
        let youtubeVideo = meal["strYoutube"]
        let dishName = meal["strMeal"]
        let dishPic = meal["strMealThumb"]
        let origin = meal["strArea"]
        let ingredients = []
        let count = 1 
        let ingredient = ""
        // Extracting measures and ingredients from recipe object and then putting them in a list named ingredients 
        for (let i in meal) {
            count = count.toString()
            if (i.startsWith("strIngredient")) {
                if (meal["strIngredient" + count] && meal["strMeasure" + count]) {
                   ingredient = meal["strMeasure" + count] + " " + meal["strIngredient" + count]
                   ingredients.push(ingredient)
                   count++
                }
            }
        }
    
       // Adding another recipe container into the main container with details 
       recipeCont.innerHTML = `<img src=${dishPic}>
       <div id="upper-section">
           <h2>${dishName}</h2>
           <h4>${origin}<h4>
        </div>
        <div id="ingredient-cont"></div>
        <div class="recipe"></div>
        <button id="youtube-link"><a href="${youtubeVideo}">Click Here to see Youtube Video</a></button>
        <button id="show-recipe">View Recipe</button>`;

        // Styling the ingredients container
        recipeCont.style.height = "1200px";
        recipeCont.style.backgroundColor = "#ffffff";
        recipeCont.style.borderBottom = "5px solid #ffffff";
        recipeCont.style.borderRadius = "10px";

        let ingredientContainer = document.getElementById('ingredient-cont');
        let recipeContainer = document.querySelector(".recipe");
        let viewRecipe = document.querySelector("#show-recipe");
        let list = document.createElement("ul");

        // Adding ingredients to the main container 
        ingredients.forEach((i) => {
             let listChild = document.createElement("li");
             listChild.innerText = i;
             list.appendChild(listChild);
             ingredientContainer.appendChild(list);
        })
        
        viewRecipe.addEventListener("click",()=>{
            recipeContainer.innerHTML = `<div id="recipe">
            <h2>Instructions</h2>
            <p id="text">${instructions}</p>
            </div>`
        }) 
    })
})


