'use strict';
console.clear();

const optAllArticleSelector = '.posts';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function (event) {
    // blokowanie domyślengo zachowania przeglądarki po kliknięciu w linik
    event.preventDefault();
    
    const clickedElement = this;

    // * [DONE] remove class 'active' from all article links 
    const activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');
    
    for (const activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    
    // * [DONE] add class 'active' to the clicked link
    clickedElement.classList.add('active');

    // * [DONE] remove class 'active' from all articles
    const activeArticles = document.querySelectorAll(optAllArticleSelector + ' article.active');

    for (const activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    // * [DONE] get 'href' attribute from the clicked link
    const articleSelector = clickedElement.getAttribute('href');

    // * [DONE] find the correct article using the selector (value of 'href' attribute), Kodilla
    const targetArticle = document.querySelector(articleSelector);

    // * [DONE] add class 'active' to the correct article, Kodilla:
    targetArticle.classList.add('active');
};

function generateTitleLinks() {
    // * remove contents of titleList
    let titleList = document.querySelector(optTitleListSelector);
    
    titleList.innerHTML = '';
    
    // * for each article
    const articles = document.querySelectorAll(optAllArticleSelector + ' article');
    let html = '';
    for (const article of articles) {
        // * get the article id
        const articleId = article.getAttribute('id');
        
        // * find the title element
        // * get the title from the title element
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
        // * create HTML of the link
        // * insert link into titleList
        html = html + '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>\n';
    }
    
    // * insert link into titleList
    titleList.innerHTML = html;

    // lista wszystkich linków lewego menu (class = title) 
    const links = document.querySelectorAll(optTitleListSelector + ' a');  

    for (const link of links) {
        // ustawiamy event (-> click) i wywołujemy funkcję
        // titleClickHandler jest hendlerem eventu
        link.addEventListener('click', titleClickHandler);  
    }
}

function generateTags()
{
    const articles = document.querySelectorAll(optAllArticleSelector + ' article');

    for (const article of articles) {

        const dataTags = article.getAttribute('data-tags').split(' ');

        let html = '';

        for (const dataTag of dataTags) {
            
            html = html + '<li><a href="#tag-' + dataTag + '"><span>' + dataTag + '</span></a></li>\n';
        }

        let tagList = article.querySelector(optArticleTagsSelector);
        tagList.innerHTML = html;
    }
}

generateTitleLinks();

generateTags();