/**
 * Evaluate if an article is a standard article
 *
 * @param {string} code      String as code :
 *                               - 0xx : rien
 *                               - 1xx : 1ère de couv
 *                               - 2xx : 2ème de couv
 *                               - 3xx : 3ème de couv
 *
 * @return {boolean}         true if article is standard and false otherwise
 */
function isCouv_0(code) {
    return code[0] == '0' ? true : false;
}


/**
 * Evaluate if an article is the 1st title
 *
 * @param {string} code      String as code :
 *                               - 0xx : rien
 *                               - 1xx : 1ère de couv
 *                               - 2xx : 2ème de couv
 *                               - 3xx : 3ème de couv
 *
 * @return {boolean}         true if article is 1st title and false otherwise
 */
function isCouv_1(code) {
    return code[0] == '1' ? true : false;
}


/**
 * Evaluate if an article is the 2nd title
 *
 * @param {string} code      String as code :
 *                               - 0xx : rien
 *                               - 1xx : 1ère de couv
 *                               - 2xx : 2ème de couv
 *                               - 3xx : 3ème de couv
 *
 * @return {boolean}         true if article is 2nd title and false otherwise
 */
function isCouv_2(code)
{
    return code[0] == '2' ? true : false;
}


/**
 * Evaluate if an article is the 3rd title
 *
 * @param {string} code      String as code :
 *                               - 0xx : rien
 *                               - 1xx : 1ère de couv
 *                               - 2xx : 2ème de couv
 *                               - 3xx : 3ème de couv
 *
 * @return {boolean}         true if article is 3rd title and false otherwise
 */
function isCouv_3(code)
{
    return code[0] == '3' ? true : false;
}


/**
 * Evaluate if an article must be controled by author
 *
 * @param {string} code      String as code :
 *                               - x0x : rien
 *                               - x1x : auteur demande relecture
 *
 * @return {boolean}         true if article must be controled and false otherwise
 */
function isToRead(code)
{
    return code[1] == '1' ? true : false;
}


/**
 * Evaluate if an article is in standard state
 *
 * @param {string} code      String as code :
 *                               - xx0 : rien
 *                               - xx1 : attente retour auteur
 *                               - xx2 : relu
 *
 * @return {boolean}         true if article is in standard state and false otherwise
 */
function isStandard(code)
{
    return code[2] == '0' ? true : false;
}


/**
 * Evaluate if an article must be modified by author
 *
 * @param {string} code      String as code :
 *                               - xx0 : rien
 *                               - xx1 : attente retour auteur
 *                               - xx2 : relu
 *
 * @return {boolean}         true if article must be modified and false otherwise
 */
function isWaiting(code)
{
    return code[2] == '1' ? true : false;
}


/**
 * Evaluate if an article is ready to be published
 *
 * @param {string} code      String as code :
 *                               - xx0 : rien
 *                               - xx1 : attente retour auteur
 *                               - xx2 : relu
 *
 * @return {boolean}         true if article is ready and false otherwise
 */
function isReady(code)
{
    return code[2] == '2' ? true : false;
}


/**
 * Check if an article has expired (is one year old)
 *
 * @param {string} date     Creation date of the ticket
 */
function isOutOfDate(date)
{
    var today = Date.now();
    if (date !== '')
    {
        var d = date.split('/');
        var dateExpirationArticle = new Date(d[2] + 1, d[1], d[0]);
        return today > dateExpirationArticle ? true : false;
    }
}


/**
 * Change menu presentation using Bootstrap and translate entries
 *
 * @param {string} active    Name of the active button
 */
function changeMenu(active) {
    var activeTag = ' class="active"';
    var newMenu = '<ul class="nav nav-pills">';
    newMenu += '<li role="presentation"' + (active == 'wiki' ? activeTag : '') + '><a href="/trac/wiki" target="_blank">Notes</a></li>';
    newMenu += '<li role="presentation"' + (active == 'timeline' ? activeTag : '') + '><a href="/trac/timeline" target="_blank">Activité</a></li>';
    newMenu += '<li role="presentation"' + (active == 'roadmap' ? activeTag : '') + '><a href="/trac/roadmap" target="_blank">Feuille de route</a></li>';
    newMenu += '<li role="presentation"' + (active == 'report' ? activeTag : '') + '><a href="/trac/report" target="_blank">Voir les tickets</a></li>';
    newMenu += '<li role="presentation"' + (active == 'newticket' ? activeTag : '') + '><a href="/trac/newticket" target="_blank">Nouveau ticket</a></li>';
    newMenu += '<li role="presentation"' + (active == 'search' ? activeTag : '') + '><a href="/trac/search" target="_blank">Recherche</a></li>';
    newMenu += '<li role="presentation"' + (active == 'admin' ? activeTag : '') + '><a href="/trac/admin" target="_blank" title="Administration">Admin.</a></li>';
    newMenu += '</ul>';

    $('#mainnav').attr('id', 'navBootstrap');
    $('#navBootstrap').html(newMenu);

    if (active == 'report') {
        $('.buttons').html('<form action method="get"><input type="hidden" name="action" value="edit"><input class="btn btn-primary" type="submit" value="Modifier le rapport"></form>');
        $('.buttons').append('<form action method="get"><input type="hidden" name="action" value="copy"><input class="btn btn-primary" type="submit" value="Copier le rapport"></form>');
        $('.buttons').append('<form action method="get"><input type="hidden" name="action" value="delete"><input class="btn btn-primary" type="submit" value="Supprimer le rapport"></form>');
    }
    else if (active == 'newticket') {
        $('.buttons').html('<input class="btn btn-primary" type="submit" name="preview" value="Aperçu">');
        $('.buttons').append('<input class="btn btn-primary" type="submit" name="submit" value="Création d\'un nouveau ticket">');
    }

}
