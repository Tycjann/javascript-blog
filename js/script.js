'use strict';
console.clear();

const optAllArticleSelector = '.posts';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector  = '.tags.list'; // tego nie rozumiem, dlsczego '.tags.list', a nie '.list .tags'

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

function generateTitleLinks(customSelector = '') {
    // * remove contents of titleList
    let titleList = document.querySelector(optTitleListSelector);
    
    titleList.innerHTML = '';
    
    // * for each article
    const articles = document.querySelectorAll(optAllArticleSelector + ' article' + customSelector);
    
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

function generateTagsAndAuthors() 
{
    const articles = document.querySelectorAll(optAllArticleSelector + ' article');
    let allTags = {};

    for (const article of articles) {

        // * Generate tags
        const dataTags = article.getAttribute('data-tags').split(' ');
        let html = '';
        
        for (const dataTag of dataTags) {
            html = html + '<li><a href="#tag-' + dataTag + '"><span>' + dataTag + '</span></a></li>\n';

            if (!allTags[dataTag]) {
                allTags[dataTag] = 1;
            } else {
                allTags[dataTag]++;
            }
        }
        const tagList = article.querySelector(optArticleTagsSelector);
        tagList.innerHTML = html;

        //  * Generate authors
        const dataAuthor = article.getAttribute('data-author');
        const autorLink = article.querySelector(optArticleAuthorSelector);
        autorLink.innerHTML = 'by <a href="#author-' + dataAuthor + '"><span>' + dataAuthor + '</span></a>';
    }

    // * Generate tag list
    let allTagsHTML = '';
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    
    function calculateTagsParams(tags) {
        let params = {max: 0, min: 999999};
        
        // params['max'] => params.max
        // params['min'] => params.min
        for (const tag in tags) {
            // if(tags[tag] > params.max){
            // params.max = tags[tag];
            // }
            // if(tags[tag] < params.min){
            //     params.min = tags[tag];
            // }
            // ta opcja 5-10% wolniejsza
            // params.max = tags[tag] > params.max ? tags[tag] : params.max;
            // params.min = tags[tag] < params.min ? tags[tag] : params.min;

            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }


        // Dlaczego to nie zadziałało? 
        // tagAll nie jest traktowany jako '6, 4, 6, 5, 4, ' i nie działa z np. Math.min(tagAll)
        // Ale jak wpiszę Math.min(6, 4, 6, 5, 4, ) to podaje wynik 4.
        // let params = {};
        // let tagAll = '';
        // for (const tag in tags) {
        //     tagAll += tags[tag] + ', ';
        // }
        // console.log('tagArray:', tagAll);
        // let min = Math.min(tagAll);
        // let max = Math.max(tagAll);
        // params['min'] = min;
        // params['max'] = max;

        return params;
    }
    
    for (const tag in allTags) {
        allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a> <span>(' + allTags[tag] + ')</span></li>\n';
    }
    // console.log(allTagsHTML);

    const tagListRight = document.querySelector(optTagsListSelector);
    tagListRight.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
    
    // prevent default action for this event
    event.preventDefault();
    
    // make new constant named "clickedElement" and give it the value of "this"
    // const clickedElement = this;

    // make a new constant "href" and read the attribute "href" of the clicked element
    const clickedHref = this.getAttribute('href');
    
    // make a new constant "tag" and extract tag from the "href" constant
    const tag = clickedHref.replace('#tag-', '');
    // console.log(tag);
    
    // find all tag links with class active - start (^=) from #tag-
    const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    
    // START LOOP: for each active tag link
    for (const allActiveTagLink of allActiveTagLinks) {
        // remove class active
        allActiveTagLink.classList.remove('active');
    }
    // END LOOP: for each active tag link
    
    // find all tag links with "href" attribute equal to the "href" constant
    const allSelectedHref = document.querySelectorAll('a[href^="' + clickedHref + '"]');
    
    // START LOOP: for each found tag link
    for (const selectedHref of allSelectedHref) {

        // add class active
        selectedHref.classList.add('active');
    }
    // END LOOP: for each found tag link

    // execute function "generateTitleLinks" with article selector as argument
    // ~=, który możemy odczytać jako "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'".
    generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
function addClickListenersToTags() {
    // find all links to tags
    const tagLinks = document.querySelectorAll(optArticleTagsSelector + ' a');
    for (const tagLink of tagLinks) {
        tagLink.addEventListener('click', tagClickHandler); 
    }

    // find all links to tags in right menu tags 
    const tagLinks2 = document.querySelectorAll(optTagsListSelector + ' a');
    for (const tagLink2 of tagLinks2) {
        tagLink2.addEventListener('click', tagClickHandler); 
    }
}

function authorClickHandler(event)
{
    event.preventDefault();
    
    const clickedAuthor = this.getAttribute('href');
    
    const author = clickedAuthor.replace('#author-', '');
    
    const allActiveAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (const allActiveAuthorLink of allActiveAuthorLinks) {
        allActiveAuthorLink.classList.remove('active');
    }

    const allAuthorSelectedLinks = document.querySelectorAll('a[href^="' + clickedAuthor + '"]');
    for (const authorSelectedLink of allAuthorSelectedLinks) {
        authorSelectedLink.classList.add('active');
    }
    
    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
    // find all links to tags
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
    for (const authorLink of authorLinks) {
        authorLink.addEventListener('click', authorClickHandler); 
    }
}


generateTitleLinks();

generateTagsAndAuthors();

addClickListenersToTags();

addClickListenersToAuthors();
