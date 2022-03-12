'use strict';   // pokazuje wszystkie błedy w kodzie

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

// tablica (lista?) wszystkich linków lewego menu (class = title) 
const links = document.querySelectorAll('.titles a');   

// funkcja obsługująca kliknięcie w link lewego menu
const titleClickHandler = function () { 
    console.log(event);

// * remove class 'active' from all article links 

// * add class 'active' to the clicked link

// * remove class 'active' from all articles

// * get 'href' attribute from the clicked link

// * find the correct article using the selector (value of 'href' attribute)

// * add class 'active' to the correct article


}

for (const link of links) {
    // ustawiamy event (-> click) i wywołujemy funkcję
    // titleClickHandler jest hendlerem eventu
    link.addEventListener('click', titleClickHandler);  
}