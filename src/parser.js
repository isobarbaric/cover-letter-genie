import fs from 'fs';
import * as cheerio from 'cheerio';
import assert from 'assert';

let text = fs.readFileSync('src/sample-posting.html', 'utf8');

const $ = cheerio.load(text);

const postingDiv = $('#postingDiv');
const panels = postingDiv.find('.panel.panel-default');

assert(panels.length === 3);

// parse first div
let panel = panels.eq(0);
let header = panel.find('.panel-heading').text().trim();
let rowData = panel.find('.panel-body > .table.table-bordered > tbody > tr');

console.log(rowData.length);
assert(rowData.length === 14);

const data = {};


for (let i = 0; i < rowData.length; i++) {
    let currentRow = rowData.eq(i);
    let label = $(currentRow).find('td').eq(0).text().trim(); 
    let value = $(currentRow).find('td').eq(1).text().trim(); 
    data[label] = value;
}

console.log(data);

//let termPosted = rowData.find('td').eq(1).text().trim();
//console.log(termPosted)

// parse second div


// parse third div


//for (let i = 0; i < postingDiv.length; i++) {
//    let currentDiv = postingDiv[i];
//
//    let panelHeadingDiv = $(currentDiv).find('.panel-heading');
//    let panelHeader = panelHeadingDiv.text().trim();
//    console.log(panelHeadingDiv.html());
//    //console.log(panelHeader);
//    //console.log(`'${panelHeading}'`);
//}
//
////// Step 4: Navigate to the first div with the class 'panel panel-default'
////let panelDefault = postingDiv.find('.panel.panel-default').first();
////
////// Step 5: Navigate to the div with the class 'panel-body' inside the panel
////let panelBody = panelDefault.find('.panel-body').first();
////
////// Step 6: Find the table with the class 'table table-bordered'
////let table = panelBody.find('.table.table-bordered').first();
////
////// Step 7: Find the first row of the tbody
////let firstRow = table.find('tbody tr').first();
////
////// Step 8: Find the second td in the first row
////let dateTd = firstRow.find('td').eq(1);  // .eq(1) selects the second td (0-indexed)
////
////// Step 9: Extract and clean up the text content
////let timelineDate = dateTd.text().trim();
////
////// Step 10: Output the extracted date
////console.log('Term Posted:', timelineDate);
