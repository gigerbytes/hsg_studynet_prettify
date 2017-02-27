
// ==UserScript==
// @name         Studynet Pretify v2
// @namespace    https://fronter.com/unisg/main.phtml
// @version      0.2.0
// @description  Prettify The HSG Studynet (+download function)
// @author       Bryan Giger
// @match        https://fronter.com/unisg/main.phtml
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js
// ==/UserScript==

// ****************************** Caveat & Warnings **********************************
// Meant to be used with the TamperMonkey browser extension
// Install at your own risk - I take no responsibility
// Also: Only install scripts you TRUST
// ***********************************************************************************

function colorRows(){ // colored td - trigger when iframe loads
    jQuery('#contentframe-container iframe').on('load', function() {
        var frame = jQuery('#contentframe-container iframe').contents();
        var trContainer = frame.find('.room-list-element .content-container');
        colorClassTr(trContainer);
        jQuery('#contentframe-container').append('<p> </p>');
    });
}

function colorClassTr(trContainer){
    var courseList = [ // data array
        {
            'course': 'Microeconomics',
            'bg_color': '#FFCC66',
            'text_color': '#6464fc',
        },
        {
            'course': 'Macroeconomics',
            'bg_color': '#C9E1C1',
        },
        {
            'course': 'Stat',
            'bg_color': '#92DCE0',
        }
    ];

    jQuery.each(courseList, function(i){
        if (!(courseList[i].hasOwnProperty('text_color'))){
            courseList[i].text_color ="#000"; //default
        }

        trContainer.find("tr:contains('" + courseList[i].course + "')").css({ //set background color
            'background': courseList[i].bg_color
        });
        trContainer.find("font:contains('" + courseList[i].course + "')").css({ //set text color
            'color': courseList[i].text_color
        });
    });
}



//Tab Rename
function changeTabNames(){
    var banner = jQuery('#banner').contents();
    var tabTxtAr = banner.find('#bottom-row a');
    tabTxtAr.each(function (){
        tabStr = jQuery(this).html().split(/\d /).pop();
        jQuery(this).html(tabStr);
    });
}

//--------------------------------------------------------------------------------------
jQuery('#banner').on('load', function(){ // only runs on first load
    setTimeout(changeTabNames, 1500); // need to wait for iframe to load all data

});

jQuery('#contentframe-container').bind('DOMSubtreeModified', function() { // run every time iframe reloads
    colorRows();
    changeTabNames();
});


