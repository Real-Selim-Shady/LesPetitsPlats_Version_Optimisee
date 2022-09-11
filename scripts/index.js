/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//fichier Javascript gérant la page d'accueil
let filteredRecipes = [...recipes];
//let ingredients = recipes.ingredients;
let littleIngredients = [];
let littleAppareils = [];
let littleUstensils = [];
// eslint-disable-next-line no-unused-vars
let Tags_Container= document.getElementById("Tags_Container");
let Tags_Container_Ingredients= document.getElementById("Tags_Container_Ingredients");
let Tags_Container_Appareils= document.getElementById("Tags_Container_Appareils");
let Tags_Container_Ustensils= document.getElementById("Tags_Container_Ustensils");
let ingredient_tag = document.getElementsByClassName("ingredient_tag");
let ustensil_tag = document.getElementsByClassName("ustensil_tag");
let appareil_tag = document.getElementsByClassName("appareil_tag");
let rechercher2 = document.getElementById("rechercher");
let recettes_accueil = document.getElementById("recettes_accueil");
let selected_ingredients = [];
let selected_ustensils = [];
let selected_appareils = [];



//chaque tag sera un objet {type:"", text:""}

//récupérer les données des recettes recipes
function getRecipes() {
        
    return (
        [...recipes]
    );
}

//afficher les recettes recipes
function displayRecipes() {
    recettes_accueil.innerHTML = "";

    filteredRecipes.forEach((recipe) => {

        const recipeModel = recipeFactory(recipe);
        const recipeCard = recipeModel.getRecipeCard();
        recettes_accueil.appendChild(recipeCard);
	
    });

}

function extractIngredients()
{
    // réagit chaque fois que la liste des recettes a changé (donc le filtrage par les tags a changé)
    //littleIngredients = // extrait les ingrédients des recettes filtrées (filteredRecipes) 

    littleIngredients = []; 

    for (let i=0 ; i<filteredRecipes.length; i++) {
        for ( let j=0; j<filteredRecipes[i].ingredients.length; j++) {
            if (littleIngredients.indexOf(filteredRecipes[i].ingredients[j].ingredient)<0) 
            {
                littleIngredients.push(filteredRecipes[i].ingredients[j].ingredient);
            }
        }
    }


}

function extractUstensils()
{
    // réagit chaque fois que la liste des recettes a changé (donc le filtrage par les tags a changé)
    //littleIngredients = // extrait les ingrédients des recettes filtrées (filteredRecipes) 

    littleUstensils = []; 

    for (let i=0 ; i<filteredRecipes.length; i++) {
        for ( let j=0; j<filteredRecipes[i].ustensils.length; j++) {
            if (littleUstensils.indexOf(filteredRecipes[i].ustensils[j])<0) 
            {
                littleUstensils.push(filteredRecipes[i].ustensils[j]);
            }
        }
    }
}

function extractAppareils()
{
    // réagit chaque fois que la liste des recettes a changé (donc le filtrage par les tags a changé)
    //littleIngredients = // extrait les ingrédients des recettes filtrées (filteredRecipes) 

    littleAppareils = []; 

    for (let i=0 ; i<filteredRecipes.length; i++) {
        if (littleAppareils.indexOf(filteredRecipes[i].appliance)<0) 
        {
            littleAppareils.push(filteredRecipes[i].appliance);
        }
    }
}

function filterRecipes()
{

    // réagit à chaque fois qu'on ajoute ou supprime un tag
    // et les ustensiles et les appliences
    filteredRecipes = [...recipes];
    filterBySearch();

    for(let i=0; i < ingredient_tag.length ; i++)
    {
        filteredRecipes = filterByIngredient(filteredRecipes, ingredient_tag[i].innerText); 
    }
    
    for(let i=0; i < ustensil_tag.length ; i++)
    {
        filteredRecipes = filterByUstensil(filteredRecipes, ustensil_tag[i].innerText); 
    }
    
    for(let i=0; i < appareil_tag.length ; i++)
    {
        filteredRecipes = filterByAppareil(filteredRecipes, appareil_tag[i].innerText); 
    }
    
    extractUstensils();
    extractIngredients();
    extractAppareils();

    afficherIngredients(littleIngredients);
    afficherUstensils(littleUstensils);
    afficherAppareils(littleAppareils);


    displayRecipes();

    NoRecipe();


}

function afficherIngredients(ingredients)
{
    //affiche les ingredients du tableau de filtre tant que le tag n’est pas déjà existant
    
    const little_ingredients_container = document.getElementById("little_ingredients_container");
    little_ingredients_container.innerHTML = "";


    ingredients.forEach((ingredient) => { 
        if(selected_ingredients.indexOf(ingredient)<0) {
            little_ingredients_container.appendChild(getIngredientCard(ingredient));
        }
        /*le if permet de vérifier que l'ingrédient n'est pas déjà sélectionné dans les tags avant de l'afficher dans la liste*/
    });


}


function afficherUstensils(ustensils)
{
    //affiche les ustensiles du tableau de filtre tant que le tag n’est pas déjà existant

    const little_ustensiles_container = document.getElementById("little_ustensiles_container");
    little_ustensiles_container.innerHTML = "";

    
    ustensils.forEach((ustensil) => { 
        if(selected_ustensils.indexOf(ustensil)<0) {
            little_ustensiles_container.appendChild(getUstensilCard(ustensil));
        }
        /*le if permet de vérifier que l'ustensile n'est pas déjà sélectionné dans les tags avant de l'afficher dans la liste*/
    });

}

function afficherAppareils(appliance)
{
    //affiche les appareils du tableau de filtre tant que le tag n’est pas déjà existant

    const little_appareils_container = document.getElementById("little_appareils_container");
    little_appareils_container.innerHTML = "";


    appliance.forEach((appliance) => { 
        if(selected_appareils.indexOf(appliance)<0) {
            little_appareils_container.appendChild(getAppareilCard(appliance));
        }
        /*le if permet de vérifier que l'appareil n'est pas déjà sélectionné dans les tags avant de l'afficher dans la liste*/
    });

}


function filterBySearch()
{
    //la fonction permet de filtrer les recettes à partir de la barre de recherche principale
    //Sont recherchés les ingrédients, les noms des recettes ainsi que les mots contenus dans les descriptions des recettes

    let rechercher = document.getElementById("rechercher").value.toLowerCase();

    if (rechercher.length>=3) 
    {   
        //Version optimisée
        filteredRecipes = 
        filteredRecipes.filter((recipe) => 
        {
            return (
                (recipe.ingredients.filter
                ( ingredient => 
                    
                    ingredient.ingredient.toLowerCase().includes(rechercher)

                )

                ).length >0 ||
                recipe.name.toLowerCase().includes(rechercher)||
                recipe.description.toLowerCase().includes(rechercher)
            );
        });
    }

}


function filterByIngredient(filteredRecipes, filteringIngredient) 
{

    //la fonction permet au filtre ingrédients de filter les recettes par les ingredients 
        
    filteredRecipes = 

    filteredRecipes.filter((recipe) => 
    {
        return (
            (
                recipe.ingredients.filter
                ( 
                    ingredient => 
                
                        ingredient.ingredient.toLowerCase().includes(filteringIngredient.toLowerCase())
                )

            ).length >0);
    });

    return filteredRecipes;
    

}


function filterByUstensil(filteredRecipes, filteringUstensil) 
{
    
    //la fonction permet au filtre ustensiles de filter les recettes par les ustensiles 

    filteredRecipes = 

    filteredRecipes.filter((recipe) => {
        return (
            (recipe.ustensils.filter
            ( ustensils => 
            
                ustensils.toLowerCase().includes(filteringUstensil.toLowerCase())

            )

            ).length >0);
    });


    return filteredRecipes;
    

}


function filterByAppareil(filteredRecipes, filteringAppareil) 
{
    
    //la fonction permet au filtre appareils de filter les recettes par les appareils 
  
    filteredRecipes = 

    filteredRecipes.filter((recipe) => {
        return (
            recipe.appliance.toLowerCase().includes(filteringAppareil.toLowerCase())
        );
    });
    
    return filteredRecipes;
}












function onIngredientFilterChange()
{
    //la fonction permet de gérer la barre de recherche des filtres spécifiques
    // quand l'utilisateur saisit un filtre (ajoute ou supprime des caractères)
    //let littleIngredientsList = // on filtre littleIngredients par la saisie dans le input

    let recherche_ingredients = document.getElementById("recherche_ingredients").value.toLowerCase();
    let littleIngredientsList = [];
    if(recherche_ingredients.length >= 3) 
    {
        for (let i=0; i<littleIngredients.length; i++) 
        {
            if (littleIngredients[i].toLowerCase().includes(recherche_ingredients)) 
            {
                littleIngredientsList.push(littleIngredients[i]);
            } 
        }
        afficherIngredients(littleIngredientsList);
    }else{
        afficherIngredients(littleIngredients);
    }
    

}




function onUstensilFilterChange()
{
    //la fonction permet de gérer la barre de recherche des filtres spécifiques
    // quand l'utilisateur saisit un filtre (ajoute ou supprime des caractères)
    //let littleUstensilsList = // on filtre littleUstensils par la saisie dans le input

    let recherche_ustensiles = document.getElementById("recherche_ustensiles").value.toLowerCase();
    let littleUstensilsList = [];
    if(recherche_ustensiles.length >= 3) 
    {
        for (let i=0; i<littleUstensils.length; i++) 
        {
            if (littleUstensils[i].toLowerCase().includes(recherche_ustensiles)) 
            {
                littleUstensilsList.push(littleUstensils[i]);
            } 
        }
        afficherUstensils(littleUstensilsList);
    }else{
        afficherUstensils(littleUstensils);
    }

}


function onAppareilFilterChange()
{
    //la fonction permet de gérer la barre de recherche des filtres spécifiques
    // quand l'utilisateur saisit un filtre (ajoute ou supprime des caractères)
    //let littleAppareilsList = // on filtre littleAppareils par la saisie dans le input

    let recherche_appareils = document.getElementById("recherche_appareils").value.toLowerCase();
    let littleAppareilsList = [];
    if(recherche_appareils.length >= 3) 
    {
        for (let i=0; i<littleAppareils.length; i++) 
        {
            if (littleAppareils[i].toLowerCase().includes(recherche_appareils)) 
            {
                littleAppareilsList.push(littleAppareils[i]);
            } 
        }
        afficherAppareils(littleAppareilsList);
    }else{
        afficherAppareils(littleAppareils);
    }

}


function open_select1(){
    //la fonction permet de gérer l'ouverture des filtres respectifs et leur fermeture

    const little_ingredients_container = document.getElementById("little_ingredients_container");

    switch (little_ingredients_container.style.display) {
    case "none" :
        little_ingredients_container.style.display="grid";
        document.getElementById("select_ingredients").style.transform = "rotate(180deg)";

        break;
    case "grid" :
        little_ingredients_container.style.display="none";
        document.getElementById("recherche_ustensiles").value="";
        document.getElementById("select_ingredients").style.transform = "rotate(0deg)";

        break;
    default:


    }

} 

function open_select1_2(){
    //la fonction permet de gérer l'ouverture des filtres respectifs 

    const little_ingredients_container = document.getElementById("little_ingredients_container");

    if (little_ingredients_container.style.display="none") {
        little_ingredients_container.style.display="grid";
        document.getElementById("select_ingredients").style.transform = "rotate(180deg)";}
    
} 

function open_select2(){
    //la fonction permet de gérer l'ouverture des filtres respectifs et leur fermeture
    
    const little_appareils_container = document.getElementById("little_appareils_container");

    if (little_appareils_container.style.display=="none") {
        document.getElementById("select_appareils").style.transform = "rotate(180deg)";
        little_appareils_container.style.display="grid";}
    else {
        little_appareils_container.style.display="none";
        document.getElementById("recherche_appareils").textContent="";
        document.getElementById("select_appareils").style.transform = "rotate(0deg)";
    }
    


}

function open_select2_2(){
    //la fonction permet de gérer l'ouverture des filtres respectifs 
    
    const little_appareils_container = document.getElementById("little_appareils_container");

    if (little_appareils_container.style.display="none") {
        document.getElementById("select_appareils").style.transform = "rotate(180deg)";
        little_appareils_container.style.display="grid";}

}

function open_select3(){
    //la fonction permet de gérer l'ouverture des filtres respectifs et leur fermeture


    const little_ustensiles_container = document.getElementById("little_ustensiles_container");


    if (little_ustensiles_container.style.display=="none") {
        document.getElementById("select_ustensiles").style.transform = "rotate(180deg)";
        little_ustensiles_container.style.display="grid";}
    else {
        little_ustensiles_container.style.display="none";
        document.getElementById("recherche_ustensiles").textContent="";
        document.getElementById("select_ustensiles").style.transform = "rotate(0deg)";
    }



}

function open_select3_2(){
    //la fonction permet de gérer l'ouverture des filtres respectifs 


    const little_ustensiles_container = document.getElementById("little_ustensiles_container");


    if (little_ustensiles_container.style.display="none") {
        document.getElementById("select_ustensiles").style.transform = "rotate(180deg)";
        little_ustensiles_container.style.display="grid";}

}


function addIngredientTag(ingredient)
{ 
    //la fonction permet d'afficher des tags à la liste des tags mais aussi de les en retirer de la liste

    selected_ingredients.push(ingredient);

    bloc_chosen_ingredient = document.createElement("div");

    chosen_ingredient = document.createElement("div");

    chosen_ingredient.className = "ingredient_tag";
    chosen_ingredient.textContent = ingredient;
    chosen_ingredient.id = "ingredient_tag";

    croixSuppressionTag= document.createElement("i");
    croixSuppressionTag.className = "fa-regular fa-circle-xmark";
    croixSuppressionTag.id = "croix_tag";
    bloc_chosen_ingredient.className = "bloc_chosen_ingredient";
    
    bloc_chosen_ingredient.appendChild(chosen_ingredient);
    bloc_chosen_ingredient.appendChild(croixSuppressionTag);
    Tags_Container_Ingredients.appendChild(bloc_chosen_ingredient);



    bloc_chosen_ingredient.addEventListener("click", function (event2) 
    {
        event2.currentTarget.remove(); 
        const index = selected_ingredients.indexOf(event2.currentTarget.innerText);
        selected_ingredients.splice(index, 1);
        filterRecipes();
    });


    filterRecipes();

}

function addUstensilTag(ustensil)
{
    //la fonction permet d'afficher des tags à la liste des tags mais aussi de les en retirer de la liste


    selected_ustensils.push(ustensil);

    bloc_chosen_ustensil = document.createElement("div");

    chosen_ustensil = document.createElement("div");

    chosen_ustensil.className = "ustensil_tag";
    chosen_ustensil.textContent = ustensil;
    chosen_ustensil.id = "ustensil_tag";
    bloc_chosen_ustensil.className = "bloc_chosen_ustensil";

    croixSuppressionTag= document.createElement("i");
    croixSuppressionTag.className = "fa-regular fa-circle-xmark";
    croixSuppressionTag.id = "croix_tag";

    bloc_chosen_ustensil.appendChild(chosen_ustensil);
    bloc_chosen_ustensil.appendChild(croixSuppressionTag);
    Tags_Container_Ustensils.appendChild(bloc_chosen_ustensil);


    bloc_chosen_ustensil.addEventListener("click", function (event2) 
    {
        event2.currentTarget.remove(); 
        const index = selected_ustensils.indexOf(event2.currentTarget.innerText);
        selected_ustensils.splice(index, 1);
        filterRecipes();
    });


    filterRecipes();
}


function addAppareilTag(appliance)
{
    //la fonction permet d'afficher des tags à la liste des tags mais aussi de les en retirer de la liste

    selected_appareils.push(appliance);

    bloc_chosen_appareil = document.createElement("div");

    chosen_appareil = document.createElement("div");

    chosen_appareil.className = "appareil_tag";
    chosen_appareil.textContent = appliance;
    chosen_appareil.id = "appareil_tag";

    croixSuppressionTag= document.createElement("i");
    croixSuppressionTag.className = "fa-regular fa-circle-xmark";
    croixSuppressionTag.id = "croix_tag";



    bloc_chosen_appareil.className = "bloc_chosen_appareil";

    bloc_chosen_appareil.appendChild(chosen_appareil);
    bloc_chosen_appareil.appendChild(croixSuppressionTag);
    Tags_Container_Appareils.appendChild(bloc_chosen_appareil);
    


    bloc_chosen_appareil.addEventListener("click", function (event2) 
    {
        event2.currentTarget.remove();
        const index = selected_appareils.indexOf(event2.currentTarget.innerText);
        selected_appareils.splice(index, 1);
        filterRecipes();
    });

    filterRecipes();
}


function NoRecipe() {

    let NoRecipeMessage = document.createElement("div");
    NoRecipeMessage.className = "NoRecipeMessage";
    NoRecipeMessage.textContent = "Aucune recette ne correspond à votre recherche... Vous pouvez chercher « tarte aux pommes », « poisson », etc";

    if(filteredRecipes.length === 0) {
        recettes_accueil.appendChild(NoRecipeMessage);
    }

}



//cette fonction permet de rendre actives les fonctions évoquées à l'intérieur de celle-ci
window.onload = function() {
    const recipes = getRecipes();
    displayRecipes(filteredRecipes);
    extractIngredients(); 
    extractUstensils(); 
    extractAppareils(); 

    afficherIngredients(littleIngredients);
    afficherUstensils(littleUstensils);
    afficherAppareils(littleAppareils);


};