
// ==UserScript==
// @name         Studynet Pretify v2
// @namespace    http://your.homepage/
// @version      0.2.0
// @description  Prettify The HSG Studynet (+download function)
// @author       Bryan Giger
// @match        https://fronter.com/unisg/main.phtml
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js
// ==/UserScript==

// ****************************** Caveat & Warnings **********************************
// There are still some bugs and missing features here:
// 1. There is no progress bar when you download files
// 2. Some filenames turn out wrong - you might have to edit them (default is .pdf)
// 3. You will have to reload the page once you download your files for a class 
//    (i.e you can only download 1 class at a time, and will have to refresh the page to get to the other classes)
// 
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

// Download Function
function createDownloadButton(){
    var mainFrame = jQuery('#contentframe-container iframe').contents();
    var something = jQuery('<input/>').attr({ id: "downloadButton", type: 'button', name:'btn1', value:'download files'});
    jQuery('#banner-container').append(something);
}


function zipAndDownload(fileAr){
    var extensionPattern = /\.[0-9a-z]{1,5}$/i;
    console.log('zip running');
    var zip = new JSZip();
    var count = 0;
    var zipFilename = "zipFilename.zip";

    fileAr.forEach(function(fileObj){
        console.log(fileObj);
        var filename = fileObj.filename;
        console.log(filename);
        if(!filename.match(extensionPattern) ){
            console.log(filename);
           filename = filename + '.pdf';
         }
        // loading a file and add it in a zip file
        url = fileObj.url;
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                throw err; // or handle the error
            }
            zip.file(filename, data, {binary:true});
            count++;
            if (count == fileAr.length) {
                var zipFile = zip.generate({type: "blob"});
                saveAs(zipFile, zipFilename);
            }
        });
    });
}


function downloadData(){
    var pdfHrefAr = [];
    console.log('pdf href ' + pdfHrefAr);
    var pdfFileAr = [];

    var mainFrame = jQuery('#contentframe-container iframe').contents();
    var subFrame = jQuery(mainFrame[1]).find('#content').contents()[0];
    var subSubFrame = jQuery(subFrame).find('#fronterarchive_main').contents()[0]; //threelevelsdeep
    //    var pdfHrefArray = jQuery(subSubFrame).find('a:contains("pdf")');

    pdfHrefAr = jQuery(subSubFrame).find('a[href^="/unisg/links/link.phtml"]');
    pdfHrefAr.each(function(i){
        var filename = jQuery(pdfHrefAr[i]).text();
        filename.replace(/\./g,' ');
        var uri  = jQuery(pdfHrefAr[i]).attr('href');
        var url = "https://fronter.com" + uri;
        fileObj = {'filename': filename, 'url': url};
        pdfFileAr.push(fileObj);
    });
    console.log(pdfFileAr);
    zipAndDownload(pdfFileAr);
}
//--------------------------------------------------------------------------------------
jQuery('#banner').on('load', function(){ // only runs on first load
    // dependencies for download
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.1/jszip.min.js');
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js');
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js');

    createDownloadButton();
    // trigger download button
    jQuery( "#downloadButton" ).on( "click", function() {
        downloadData();
    });
    setTimeout(changeTabNames, 1500); // need to wait for iframe to load all data

});

jQuery('#contentframe-container').bind('DOMSubtreeModified', function() { // run every time iframe reloads
    colorRows();
    changeTabNames();
});


