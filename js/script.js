'use strict';
console.clear();

const opts = {
    allArticleSelector: '.posts',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector:  '.tags.list', // ? tego nie rozumiem, dlaczego '.tags.list', a nie '.list .tags'
    authorListSelector:  '.authors.list',
    cloudClassCount:  5,
    cloudClassPrefix: 'tag-size-',
};

const titleClickHandler = function (event) {
    // blokowanie domyślengo zachowania przeglądarki po kliknięciu w linik
    event.preventDefault();
    
    const clickedElement = this;

    // * [DONE] remove class 'active' from all article links 
    const activeLinks = document.querySelectorAll(opts.titleListSelector + ' a.active');
    
    for (const activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    
    // * [DONE] add class 'active' to the clicked link
    clickedElement.classList.add('active');

    // * [DONE] remove class 'active' from all articles
    const activeArticles = document.querySelectorAll(opts.allArticleSelector + ' article.active');

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
    let titleList = document.querySelector(opts.titleListSelector);
    
    titleList.innerHTML = '';
    
    // * for each article
    const articles = document.querySelectorAll(opts.allArticleSelector + ' article' + customSelector);
    
    let html = '';
    for (const article of articles) {
        // * get the article id
        const articleId = article.getAttribute('id');
        
        // * find the title element
        // * get the title from the title element
        const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
        
        // * create HTML of the link
        // * insert link into titleList
        html = html + '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>\n';
    }
    
    // * insert link into titleList
    titleList.innerHTML = html;

    // lista wszystkich linków lewego menu (class = title) 
    const links = document.querySelectorAll(opts.titleListSelector + ' a');  

    for (const link of links) {
        // ustawiamy event (-> click) i wywołujemy funkcję
        // titleClickHandler jest hendlerem eventu
        link.addEventListener('click', titleClickHandler);  
    }
}

// * Calculate tag's font size
function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );

    // wariant II (step by step):
    // classNumber = Math.floor( 0.5 * 5 + 1 );
    // classNumber = Math.floor( 0.5 * opts.cloudClassCount + 1 );
    // classNumber = Math.floor( ( 4 / 8 ) * opts.cloudClassCount + 1 );
    // classNumber = Math.floor( ( (6 - 2) / (10 - 2) ) * opts.cloudClassCount + 1 );
    // classNumber = Math.floor( ( (count - 2) / (10 - 2) ) * opts.cloudClassCount + 1 );
    // classNumber = Math.floor( ( (count - 2) / (params.max - 2) ) * opts.cloudClassCount + 1 );
    // classNumber = Math.floor( ( (count - params.min) / (params.max - 2) ) * opts.cloudClassCount + 1 );
    // classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.cloudClassCount + 1 );

    return classNumber;
}

function calculateTagsParams(tags) {
    let params = {max: 0, min: 999999};
    
    for (const tag in tags) {
        // v1
        // if(tags[tag] > params.max){
        // params.max = tags[tag];
        // }
        // if(tags[tag] < params.min){
        //     params.min = tags[tag];
        // }
        // v2
        // ta opcja 5-10% wolniejsza
        // params.max = tags[tag] > params.max ? tags[tag] : params.max;
        // params.min = tags[tag] < params.min ? tags[tag] : params.min;
        // v3
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
    }

    // ? Dlaczego to nie zadziałało? 
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

function generateTagsAndAuthors() 
{
    const articles = document.querySelectorAll(opts.allArticleSelector + ' article');
    let allTags = {};
    let allAuthors = {};

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
        const tagList = article.querySelector(opts.articleTagsSelector);
        tagList.innerHTML = html;

        //  * Generate authors
        const dataAuthor = article.getAttribute('data-author');
        const autorLink = article.querySelector(opts.articleAuthorSelector);
        autorLink.innerHTML = 'by <a href="#author-' + dataAuthor + '"><span>' + dataAuthor + '</span></a>';

        if (!allAuthors[dataAuthor]) {
            allAuthors[dataAuthor] = 1;
        } else {
            allAuthors[dataAuthor]++;
        }
    }
    // * Generate author list
    let allAuthorHTML = '';
    for (const autor in allAuthors) {
        allAuthorHTML += '<li><a href="#author-' + autor + '"><span class="author-name">' + autor + '</a> (' + allAuthors[autor] + ')</span></li>\n';
    }

    const tagAuthorRight = document.querySelector(opts.authorListSelector);
    tagAuthorRight.innerHTML = allAuthorHTML;

    // * Generate tag list
    let allTagsHTML = '';
    const tagsParams = calculateTagsParams(allTags);
    
    for (const tag in allTags) {
        allTagsHTML += '<li><a class="' + opts.cloudClassPrefix + calculateTagClass(allTags[tag],tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>\n';
    }

    const tagListRight = document.querySelector(opts.tagsListSelector);
    tagListRight.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
    
    // prevent default action for this event
    event.preventDefault();
    
    // make a new constant "href" and read the attribute "href" of the clicked element
    const clickedHref = this.getAttribute('href');
    
    // make a new constant "tag" and extract tag from the "href" constant
    const tag = clickedHref.replace('#tag-', '');
    
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
    let tagLinks = document.querySelectorAll(opts.articleTagsSelector + ' a');
    for (const tagLink of tagLinks) {
        tagLink.addEventListener('click', tagClickHandler); 
    }

    // find all links to tags in right menu tags 
    tagLinks = document.querySelectorAll(opts.tagsListSelector + ' a');
    for (const tagLink of tagLinks) {
        tagLink.addEventListener('click', tagClickHandler); 
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
    // find all links to autor
    let authorLinks = document.querySelectorAll(opts.articleAuthorSelector + ' a');
    for (const authorLink of authorLinks) {
        authorLink.addEventListener('click', authorClickHandler); 
    }

    // find all links to autor in right menu tags 
    authorLinks = document.querySelectorAll(opts.authorListSelector + ' a');
    for (const authorLink of authorLinks) {
        authorLink.addEventListener('click', authorClickHandler); 
    }
}

generateTitleLinks();

generateTagsAndAuthors();

addClickListenersToTags();

addClickListenersToAuthors();
