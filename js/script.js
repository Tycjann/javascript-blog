'use strict';   // pokazuje wszystkie błedy w kodzie

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

// lista wszystkich linków lewego menu (class = title) 
const links = document.querySelectorAll('.titles a');   

// funkcja obsługująca kliknięcie w link lewego menu
const titleClickHandler = function () { 

    // handler eventu otrzymywał argument, zawierający informacje na temat wychwyconego zdarzenia. 
    // standardowa nazwa event
    console.clear();
    console.log(event, 'Link was clicked');

// * remove class 'active' from all article links 
const activeLinks = document.querySelectorAll('.titles a.active');
for (const activeLink of activeLinks) {
    // usuwamy z kadego linka class active
    // classList zawiera informacje o wszystkich klasach tego elementu (opcje. remove, add, toggle, contains)
    activeLink.classList.remove('active');
}
// * add class 'active' to the clicked link

// * remove class 'active' from all articles
const activeArticles = document.querySelectorAll('.posts article.active')
{
    for (const activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
}

// * get 'href' attribute from the clicked link

// * find the correct article using the selector (value of 'href' attribute)

// * add class 'active' to the correct article


}

for (const link of links) {
    // ustawiamy event (-> click) i wywołujemy funkcję
    // titleClickHandler jest hendlerem eventu
    link.addEventListener('click', titleClickHandler);  
}