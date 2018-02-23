// ==UserScript==
// @name         TracHack
// @namespace    https://www.gnulinuxmag.com
// @version      1.0
// @description  Diamond Trac design
// @author       Tristan Colombo <tristan@gnulinuxmag.com>
// @match        .../trac/report/8
// @require      https://code.jquery.com/jquery-3.2.1.min.js#sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=
// @require      https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js#sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa
// @require      chrome-extension://fkfpikpkggkeffkbjjpddplhoiojfjjp/tamperMonkeyLib.js
// @require      chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/tracHackLib.js
// @resource     bootstrapTheme    https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css#sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

// Penser à retirer le "// @grant  none"

loadCSS('bootstrapTheme');
// Normalement :
//var bootstrapCSS = GM_getResourceText("bootstrapTheme");
//GM_addStyle(bootstrapCSS);

var GLOBAL = {
    'REDAC_CHEF': 'tristan',
    'TITLE': 'GLMF',
};


(function() {
    'use strict';

    $('.trac-columns th').css('backgroundColor', '#263238');
    $('.trac-columns th').css('color', '#fff');
    $('h1').css('fontSize', '20px');
    $('h2').css('fontSize', '16px');
    $('#prefs').css('display', 'none');
    changeTitle(GLOBAL.TITLE);

    // Changement du logo
    changeImage('#logo img', 'chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/LM.png');
    // Changement favicon
    changeFavicon("chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/faviconTracGLMF.ico");

    // Couleurs
    $('tr.color1-odd').css('backgroundColor', '#b2ff59');
    $('tr.color1-even').css('backgroundColor', '#ccff90');
    $('tr.color1-odd').css('color', '#000');
    $('tr.color1-even').css('color', '#000');
    $('td.summary').css('color', '#000');
    $('td.ticket').css('color', '#000');
    $('tr.color2-odd').css('backgroundColor', '#64ffda');
    $('tr.color2-even').css('backgroundColor', '#a7ffeb');
    $('tr.color2-odd').css('color', '#000');
    $('tr.color2-even').css('color', '#000');

    // Menu
    changeMenu('report');

    // En-têtes
    $('th:contains("Propriétaire")').css('display', 'none');
    $('th:contains("Version")').html('Licence');
    $('th:contains("Type")').html('État');
    $('th:contains("Résumé")').html('Titre');
    $('th:contains("Rapporteur")').html('Auteur');
    $('th:contains("Composant")').html('Rubrique');
    $('th:contains("Modified")').html('Modifié');
    $('th:contains("Created")').html('Créé');
    $('th:contains("Mots-clés")').css('display', 'none');

    $('table tr').each(function () {
        var cellLicense = $(this).find('td.version');
        var cellAuthor = $(this).find('td.reporter');
        var cellTicket = $(this).find('td.ticket');
        var cellSummary = $(this).find('td.summary');
        var cellDate = $(this).find('td.date');
        var cellComponent = $(this).find('td.component');
        var cellType = $(this).find('td.type');
        var cellOwner = $(this).find('td.owner');
        var cellCode = $(this).find('td.keywords');
        var code = cellCode.text();

        // Licence
        if ($.trim(cellLicense.text()) == 'CC') {
            cellLicense.css('textAlign', 'center');
            cellLicense.css('verticalAlign', 'middle');
            cellLicense.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/creative_commons.png" />');
        }
        else {
            cellLicense.html('');
        }

        // Auteurs
        if ($.trim(cellAuthor.text()) != GLOBAL.REDAC_CHEF) {
            var mails = extractEmails(cellAuthor.text());
            var idTicket = $.trim(cellTicket.text());
            var subject = '[GLMF] ' + idTicket + ' - ' + $.trim(cellSummary.text());
            cellAuthor.css('verticalAlign', 'middle');
            cellAuthor.html('<a href="mailto:' + mails + '?subject=' + subject + '" title="Répondre" target="_blank"><img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/mail.png" style="vertical-align: middle"/></a>' + cellAuthor.text());
        }
        else {
            cellAuthor.css('verticalAlign', 'middle');
            cellAuthor.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/tux.png" style="vertical-align: middle"/></a>' + GLOBAL.REDAC_CHEF.charAt(0).toUpperCase() + GLOBAL.REDAC_CHEF.slice(1));
        }

        // Suppression de colonnes
        cellOwner.css('display', 'none');
        cellCode.css('display', 'none');

        // Titre
        cellSummary.css('verticalAlign', 'middle');
        // Couverture
        var title = cellSummary.text();
        if (isCouv_1(code)) {
            cellSummary.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/star_1.png" style="vertical-align: middle"/> <a href="../ticket/' + $.trim(cellTicket.text()).substring(1) + '" target="_blank" title="Voir le ticket">' + title + '</a>');
        }
        else if (isCouv_2(code)) {
            cellSummary.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/star_2.png" style="vertical-align: middle"/> <a href="../ticket/' + $.trim(cellTicket.text()).substring(1) + '" target="_blank" title="Voir le ticket">' + title + '</a>');
        }
        else if (isCouv_3(code)) {
            cellSummary.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/star_3.png" style="vertical-align: middle"/> <a href="../ticket/' + $.trim(cellTicket.text()).substring(1) + '" target="_blank" title="Voir le ticket">' + title + '</a>');
        }
        else {
            cellSummary.html('<a href="../ticket/' + $.trim(cellTicket.text()).substring(1) + '" target="_blank" title="Voir le ticket">' + title + '</a>');
        }
        // A relire
        if (isToRead(code)) {
            cellSummary.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/read.png" style="vertical-align: middle"/> ' + cellSummary.html());
        }

        // Alignement vertical
        cellTicket.css('verticalAlign', 'middle');
        cellComponent.css('verticalAlign', 'middle');
        cellDate.css('verticalAlign', 'middle');
        cellType.css('verticalAlign', 'middle');

        // Lignes (état : 1 en attente retour, 2 relu)
        if (isWaiting(code)) {
            if ($(this).hasClass('color1-even') || $(this).hasClass('color2-even') || $(this).hasClass('color3-even')) {
                $(this).css("background", "#ffd180");
            }
            else if ($(this).hasClass('color1-odd') || $(this).hasClass('color2-odd') || $(this).hasClass('color3-odd')) {
                $(this).css("background", "#ffab40");
            }
        }
        if (isReady(code)) {
            if ($(this).hasClass('color1-even') || $(this).hasClass('color2-even') || $(this).hasClass('color3-even')) {
                $(this).css("background", "#b388ff");
            }
            else if ($(this).hasClass('color1-odd') || $(this).hasClass('color2-odd') || $(this).hasClass('color3-odd')) {
                $(this).css("background", "#7c4dff");
            }
        }

        // Date
        if (isOutOfDate($.trim(cellDate.text()).split(' ')[0])) {
            $('tr').css('backgroundColor', '#ffff00');
            cellTicket.html('<img src="chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/star_3.png" style="vertical-align: middle"/>  <a href="../ticket/' + $.trim(cellTicket.text()).substring(1) + '" title="Voir le ticket">' + cellTicket.text() + '</a>');
        }

        // Finalisation
        $(':link').css('color', '#000');
    });
})();
