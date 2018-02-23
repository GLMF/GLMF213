// ==UserScript==
// @name         TracHackNewTicket
// @namespace    https://www.gnulinuxmag.com
// @version      1.0
// @description  Diamond Trac New/Modify ticket design
// @author       Tristan Colombo <tristan@gnulinuxmag.com>
// @match        .../trac/newticket
// @include      .../trac/ticket/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js#sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=
// @require      https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js#sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js
// @require      chrome-extension://fkfpikpkggkeffkbjjpddplhoiojfjjp/tamperMonkeyLib.js
// @require      chrome-extension://geeacnjcpbepfhgfgialmjealbabhjop/tracHackLib.js
// @resource     bootstrapTheme    https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css#sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u
// @resource     bootstrapSelectTheme    https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

// Chargement des CSS
loadCSS('bootstrapTheme');
loadCSS('bootstrapSelectTheme');

var GLOBAL = {
    'REDAC_CHEF': 'tristan',
    'TITLE_NEW': 'Nouveau ticket',
    'TITLE_MODIFY': 'Modification ticket',
    'TAG': 'GLMF',
};


/**
 * Get code from keywords field
 */
function getCode() {
    var cellFieldKeywords = $('#field-keywords');

    if (cellFieldKeywords.val() === '') {
        cellFieldKeywords.val('000');
    }

    return cellFieldKeywords.val();
}


/**
 * Associate code to keywords for couv
 */
function setCouv(codeCouv) {
    var code = getCode();
    var newCode;

    newCode = codeCouv + code[1] + code[2];
    $('#field-keywords').val(newCode);
}


/**
 * Associate code to keywords for reader
 */
function setReader(codeRead) {
    var code = getCode();
    var newCode;

    newCode = code[0] + codeRead + code[2];
    $('#field-keywords').val(newCode);
}


/**
 * Associate code to keywords for wait
 */
function setWaiting(codeWait) {
    var code = getCode();
    var newCode;

    newCode = code[0] + code[1] + codeWait;
    $('#field-keywords').val(newCode);
}


/**
 * Buttons to change couv
 */
function couvButtons() {
    var code = getCode();
    var active = ' active';
    var checked = ' checked';
    var buttons = '';

    buttons += '<div class="btn-group" data-toggle="buttons">';
    buttons += '<label class="btn btn-primary' + (isCouv_0(code) ? active : '') + '"><input type="radio" name="couvOption" id="couvOption_0" autocomplete="off"' + (isCouv_0(code) ? checked : '') + '> Standard</label>';
    buttons += '<label class="btn btn-primary' + (isCouv_1(code) ? active : '') + '"><input type="radio" name="couvOption" id="couvOption_1" autocomplete="off"' + (isCouv_1(code) ? checked : '') + '> Une</label>';
    buttons += '<label class="btn btn-primary' + (isCouv_2(code) ? active : '') + '"><input type="radio" name="couvOption" id="couvOption_2" autocomplete="off"' + (isCouv_2(code) ? checked : '') + '> 2ème de couv</label>';
    buttons += '<label class="btn btn-primary' + (isCouv_3(code) ? active : '') + '"><input type="radio" name="couvOption" id="couvOption_3" autocomplete="off"' + (isCouv_3(code) ? checked : '') + '> 3ème de couv</label>';
    buttons += '</div>';

    return buttons;
}


/**
 * Events related to couv
 */
function couvEvents() {
    $('#couvOption_0').change(function () { setCouv(0); });
    $('#couvOption_1').change(function () { setCouv(1); });
    $('#couvOption_2').change(function () { setCouv(2); });
    $('#couvOption_3').change(function () { setCouv(3); });
}


/**
 * Buttons to change reader
 */
function readerButtons() {
    var code = getCode();
    var active = ' active';
    var checked = ' checked';
    var buttons = '';

    buttons += '<div class="btn-group" data-toggle="buttons">';
    buttons += '<label class="btn btn-primary' + (!isToRead(code) ? active : '') + '"><input type="radio" name="readOption" id="readOption_0" autocomplete="off"' + (!isToRead(code) ? checked : '') + '> Pas de relecture</label>';
    buttons += '<label class="btn btn-primary' + (isToRead(code) ? active : '') + '"><input type="radio" name="readOption" id="readOption_1" autocomplete="off"' + (isToRead(code) ? checked : '') + '> Relecture</label>';
    buttons += '</div>';

    return buttons;
}


/**
 * Events related to reader
 */
function readerEvents() {
    $('#readOption_0').change(function () { setReader(0); });
    $('#readOption_1').change(function () { setReader(1); });
}


/**
 * Buttons to change wait
 */
function waitingButtons() {
    var code = getCode();
    var active = ' active';
    var checked = ' checked';
    var buttons = '';

    buttons += '<div class="btn-group" data-toggle="buttons">';
    buttons += '<label class="btn btn-primary' + (isStandard(code) ? active : '') + '"><input type="radio" name="waitOption" id="waitOption_0" autocomplete="off"' + (isStandard(code) ? checked : '') + '> Rien</label>';
    buttons += '<label class="btn btn-primary' + (isWaiting(code) ? active : '') + '"><input type="radio" name="waitOption" id="waitOption_1" autocomplete="off"' + (isWaiting(code) ? checked : '') + '> Attente retour</label>';
    buttons += '<label class="btn btn-primary' + (isReady(code) ? active : '') + '"><input type="radio" name="waitOption" id="waitOption_2" autocomplete="off"' + (isReady(code) ? checked : '') + '> Relu</label>';
    buttons += '</div>';

    return buttons;
}


/**
 * Events related to wait
 */
function waitingEvents() {
    $('#waitOption_0').change(function () { setWaiting(0); });
    $('#waitOption_1').change(function () { setWaiting(1); });
    $('#waitOption_2').change(function () { setWaiting(2); });
}


(function() {
    'use strict';

    var isModifyPage = window.location.href.indexOf("/trac/ticket/") >= 0;

    $('.trac-columns th').css('backgroundColor', '#263238');
    $('.trac-columns th').css('color', '#fff');
    $('h1').css('fontSize', '20px');
    $('h2').css('fontSize', '16px');
    $('#prefs').css('display', 'none');
    if (isModifyPage) {
        changeTitle(GLOBAL.TITLE_MODIFY);
    } else {
        changeTitle(GLOBAL.TITLE_NEW);
    }

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
    if (isModifyPage) {
    } else {
        changeMenu('newticket');
    }

    // En têtes
    $('th:contains("Version")').html('Licence');
    $('th:contains("Type")').html('État');
    $('th:contains("Résumé")').html('Titre');
    $('th:contains("Rapporteur")').html('Auteur');
    $('th:contains("Composant")').html('Rubrique');

    $('#field-summary').addClass('form-control');
    $('#field-reporter').addClass('form-control');
    $('#field-description').addClass('form-control');


    var cellFieldCCLabel = $('label[for="field-cc"]');
    var cellFieldCC = $('#field-cc');
    var cellFieldKeywords = $('#field-keywords');
    var code = getCode();
    var statut = '';

    cellFieldCCLabel.html('Statut :');
    statut += couvButtons();
    statut += '<br />';
    statut += readerButtons();
    statut += '<br />';
    statut += waitingButtons();
    cellFieldCC.parent().parent().attr('colspan', '2');
    cellFieldCC.parent().html(statut);

    // Ajout des événements (sinon les éléments n'existent pas au moment
    // de la création du lien).
    couvEvents();
    readerEvents();
    waitingEvents();

    // Commenter les deux lignes suivantes pour affichage de debug du code
    $('label[for="field-keywords"]').css('display', 'none');
    $('#field-keywords').css('display', 'none');

    $('#field-type').addClass('selectpicker');
    $('#field-type').attr('data-style', 'btn-info');
    $('#field-type').attr('data-live-search', 'true');
    $('#field-type').selectpicker().selectpicker("render");

    $('#field-priority').addClass('selectpicker');
    $('#field-priority').attr('data-style', 'btn-info');
    $('#field-priority').attr('data-live-search', 'true');
    $('#field-priority').selectpicker().selectpicker("render");

    $('#field-component option').each(function() {
        if (!$(this).val().startsWith(GLOBAL.TAG)) {
            $(this).css('display', 'none');
        }
    });
    $('#field-component').addClass('selectpicker');
    $('#field-component').attr('data-style', 'btn-primary');
    $('#field-component').attr('data-live-search', 'true');
    $("#field-component").selectpicker().selectpicker("render");

    $('#field-milestone option').each(function() {
        if (!($(this).val().startsWith(GLOBAL.TAG) || $(this).val().startsWith('x' + GLOBAL.TAG))) {
            $(this).css('display', 'none');
        }
    });
    $('#field-milestone').addClass('selectpicker');
    $('#field-milestone').attr('data-style', 'btn-primary');
    $('#field-milestone').attr('data-live-search', 'true');
    $('#field-milestone').selectpicker().selectpicker("render");

    $('#field-version').addClass('selectpicker');
    $('#field-version').attr('data-style', 'btn-info');
    $('#field-version').attr('data-live-search', 'true');
    $("#field-version").selectpicker({"title": "Select Options"}).selectpicker("render");

    $('label[for="field-owner"]').css('display', 'none');
    $('#field-owner').css('display', 'none');
})();
