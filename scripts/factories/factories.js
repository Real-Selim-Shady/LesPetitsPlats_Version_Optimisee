/* eslint-disable no-extra-semi */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

//fichier Javascript qui exploite les données JSON pour les injecter par méthode factory

let recipe = [];

function recipeFactory(recipe) {
    let { id, name, servings, ingredients, time, description, appliance, ustensils } = recipe;

    //méthode factory injectant les informations des recettes sur la page d"accueil
    function getRecipeCard() {


        const article = document.createElement( "article" );
        article.className = "carte";

        const topSpace = document.createElement("div");
        topSpace.className = "topSpace";
        article.appendChild(topSpace);

        const bottomSpace = document.createElement("div");
        bottomSpace.className = "bottomSpace";
        article.appendChild(bottomSpace);

        const titleAndTimer = document.createElement("div");
        titleAndTimer.className = "titleAndTimer";
        bottomSpace.appendChild(titleAndTimer);

        const title = document.createElement("p");
        title.className = "title";
        title.textContent = name;
        title.ariaLabel = name;
        titleAndTimer.appendChild(title);

        const timer_block = document.createElement("div");
        timer_block.className = "timer_block";
        titleAndTimer.appendChild(timer_block);

        const clock = document.createElement("i");
        clock.className = "fa-regular fa-clock";
        timer_block.appendChild(clock);

        const timer = document.createElement("p");
        timer.className = "timer";
        timer.textContent = time+" min";
        timer.ariaLabel = time;
        timer_block.appendChild(timer);

        const ingredientsAndTuto = document.createElement("div");
        ingredientsAndTuto.className = "ingredientsAndTuto";
        bottomSpace.appendChild(ingredientsAndTuto);

        const ingredients1 = document.createElement("div");
        ingredients1.className = "ingredients_bloc";
        ingredientsAndTuto.appendChild(ingredients1);



        ingredients.forEach( ingredient => 
        {
            const ingredient1 = document.createElement("div");
            ingredient1.className = "ingredients";
            //if (ingredient.unit == null) {ingredient.unit = "";} else {ingredient.unit=ingredient.unit;};
            //ingredient1.textContent = ingredient.ingredient + ': ' + ingredient.quantity + ingredient.unit;
            //ingredient1.textContent = ingredient.ingredient;
            ingredients1.appendChild(ingredient1);

            const ingredient_txt = document.createElement("div");
            ingredient_txt.className = "ingredient_txt";
            ingredient_txt.textContent = ingredient.ingredient;
            ingredient1.appendChild(ingredient_txt);

            const quantity_unit = document.createElement("div");
            quantity_unit.className = "quantity_unit";
            if (ingredient.unit == null) {ingredient.unit = "";} 
            // eslint-disable-next-line no-self-assign
            else {ingredient.unit=ingredient.unit;};
            if (ingredient.unit == "grammes") {ingredient.unit = "g";} 
            if (ingredient.unit == "litres") {ingredient.unit = "l";} 
            if (ingredient.unit == "litre") {ingredient.unit = "l";} 
            if (ingredient.unit == "cuillères à café") {ingredient.unit = " cuillères à café";} 
            if (ingredient.unit == "cuillères à soupe") {ingredient.unit = " cuillères à soupe";} 
            if (ingredient.unit == "gousses") {ingredient.unit = " gousses";} 
            if (ingredient.unit == "sachets") {ingredient.unit = " sachets";} 
            if (ingredient.unit == "tranches") {ingredient.unit = " tranches";} 
            if (ingredient.unit == "boites") {ingredient.unit = " boites";} 
            if (ingredient.unit == "barquettes") {ingredient.unit = " barquettes";} 
            if (ingredient.quantity == null) {quantity_unit.textContent = "";} 
            else {quantity_unit.textContent =": " + ingredient.quantity + ingredient.unit;};
            //quantity_unit.textContent = ': ' + ingredient.quantity + ingredient.unit;
            ingredient1.appendChild(quantity_unit);
            
        });

        const ingredient1 = document.createElement("div");
        ingredient1.className = "ingredient";
        ingredients.forEach((ingredient) => ingredient.ingredient);
        ingredient1.textContent = ingredients.ingredient;
        ingredients1.appendChild(ingredient1);

        const appareils2 = document.createElement("div");
        appareils2.className = "appareil_carte";
        article.appendChild(appareils2);

        const tuto = document.createElement("div");
        tuto.className = "tuto";
        ingredientsAndTuto.appendChild(tuto);
        const tuto_description = document.createElement("span");
        tuto_description.className = "tuto_description";
        tuto_description.textContent = description;
        tuto_description.ariaLabel = description;
        tuto.appendChild(tuto_description);

        return (article);
    }

    return { getRecipeCard };

    
}

function getAppareilCard (appliance) {

    const appareil1 = document.createElement("div");
    appareil1.className = "appareil";
    appareil1.textContent = appliance;

    appareil1.addEventListener("click", function (event) 
    {
        addAppareilTag(event.target.innerText);
    });

    return (appareil1);
}


function getUstensilCard (ustensil) {

    const ustensil1 = document.createElement("div");
    ustensil1.className = "ustensil";
    ustensil1.textContent = ustensil;

    ustensil1.addEventListener("click", function (event) 
    {
        addUstensilTag(event.target.innerText);
    });

    return (ustensil1);
}


function getIngredientCard(ingredient) {
    
    const ingredient1 = document.createElement("div");
    ingredient1.className = "ingredient";
    ingredient1.textContent = ingredient;

    ingredient1.addEventListener("click", function (event) 
    {
        addIngredientTag(event.target.innerText);
    });

    return (ingredient1);

}

