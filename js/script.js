// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

// pokazuje wszystkie błedy w kodzie
'use strict';
console.clear();

const opt_all_article_selector = '.posts';
// const opt_article_selector = '.post';
const opt_title_selector = '.post-title';
const opt_title_list_selector = '.titles';

// funkcja obsługująca kliknięcie w link lewego menu
const titleClickHandler = function (event) {
    // handler eventu otrzymywał argument, zawierający informacje na temat wychwyconego zdarzenia. 
    // standardowa nazwa event
    // console.log(event);

    // blokowanie domyślengo zachowania przeglądarki po kliknięciu w linik
    event.preventDefault();
    
    // konkretny kliknięty link
    const clicked_element = this;

    // * [DONE] remove class 'active' from all article links 
    const active_links = document.querySelectorAll(opt_title_list_selector + ' a.active');
    for (const active_link of active_links) {
        // usuwamy z kadego linka class active
        // classList zawiera informacje o wszystkich klasach tego elementu (opcje. remove, add, toggle, contains)
        active_link.classList.remove('active');
    }
    // * [DONE] add class 'active' to the clicked link
    // console.log('clicked_element:', clicked_element);
    clicked_element.classList.add('active');

    // * [DONE] remove class 'active' from all articles
    const active_articles = document.querySelectorAll(opt_all_article_selector + ' article.active');

    for (const active_article of active_articles) {
        active_article.classList.remove('active');
    }

    // * [DONE] get 'href' attribute from the clicked link
    const article_selector = clicked_element.getAttribute('href');
    // console.log(article_selector);

    // * [DONE] find the correct article using the selector (value of 'href' attribute), Kodilla
    const target_article = document.querySelector(article_selector);
    // console.log(target_article);

    // * [DONE] add class 'active' to the correct article, Kodilla:
    target_article.classList.add('active');

    // * moje rozwiązanie bez podpowiedzi
    // * [DONE] find the correct article using the selector (value of 'href' attribute) 
    // *        add class 'active' to the correct article
    // const all_articles = document.querySelectorAll('.posts article')
    // {
    //     for (const all_article of all_articles) {
    //         if ('#' + all_article.getAttribute('id') == article_selector) {
    //             all_article.classList.add('active');
    //         }
    //     }
    // } 
};
// Generowanie listy linków - menu left
function generateTitleLinks() {
    // * remove contents of titleList
    let title_list = document.querySelector(opt_title_list_selector);
    // console.log(titleList);
    title_list.innerHTML = '';
    // document.querySelector(opt_title_list_selector).innerHTML = '';
    
    // * for each article
    const articles = document.querySelectorAll(opt_all_article_selector + ' article');
    let html = '';
    for (const article of articles) {
        // * get the article id
        const article_id = article.getAttribute('id');
        // console.log(article_id);
        // * find the title element
        // * get the title from the title element
        const article_title = article.querySelector(opt_title_selector).innerHTML;
        // console.log(article_title);
        // * create HTML of the link
        // <li><a href="#article-9"><span>Article 9</span></a></li>
        // * insert link into titleList
        // metoda 1:
        html = html + '<li><a href="#' + article_id + '"><span>' + article_title + '</span></a></li>\n';
        // metoda 2:
        // title_list.insertAdjacentHTML('beforeend', '<li><a href="#' + article_id + '"><span>' + article_title + '</span></a></li>');
    }
    // * insert link into titleList
    // metoda 1:
    // console.log(html);
    title_list.innerHTML = html;

    // lista wszystkich linków lewego menu (class = title) 
    const links = document.querySelectorAll(opt_title_list_selector + ' a');  

    for (const link of links) {
        // ustawiamy event (-> click) i wywołujemy funkcję
        // titleClickHandler jest hendlerem eventu
        link.addEventListener('click', titleClickHandler);  
        // console.log(links);
    }
}

generateTitleLinks();