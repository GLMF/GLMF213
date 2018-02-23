/**
 * General extension TamperMonkey
 *
 * WARNING : Require jQuery !
 */

/**
 * Change the favicon of the current page
 *
 * @param {string} image    URL of the image
 */
function changeFavicon(image) {
    $('link[rel="icon"]').remove();
    $('link[rel="shortcut icon"]').remove();
    $('head').append('<link rel="shortcut icon" href="' + image + '">');
}


/**
 * Change the title of the page
 *
 * @param {string} newTitle Title of the page
 */
function changeTitle(newTitle) {
    document.title = newTitle;
}


/**
 * Change image source of <img> tag
 *
 * @param {string} target   Identification of the <img> tag (jQuery notation)
 * @param {string} image    URL of the image
 */
function changeImage(target, image) {
    $(target).attr('src', image);
}


/**
 * Extract all the email addresses of a string
 *
 * @param {string} text     String containing email addresses
 *
 * @return {array_string}   List of emails
 */
function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}


/**
 * Load a css page defined as @resource 
 *
 * @param {string}          Resource name
 */
function loadCSS(name) {
    var css = GM_getResourceText(name);
    GM_addStyle(css);
}
