import fs from 'fs';
import * as cheerio from 'cheerio';
import assert from 'assert';

// use trim
// cut out the ':' at the end
const cleanText = (text) => {
    return text.trim().slice(0, -1);
}

let text = fs.readFileSync('src/sample-posting.html', 'utf8');

const $ = cheerio.load(text);

const postingDiv = $('#postingDiv');
const panels = postingDiv.find('.panel.panel-default');

assert(panels.length === 3);

// TODO: set up a dataclass (return header)
// parse first div

const extractFirstPanelData = (panels) => {
    const panel = panels.eq(0);
    const header = panel.find('.panel-heading').text().trim();
    const rowData = panel.find('.panel-body > .table.table-bordered > tbody > tr');

    assert(rowData.length === 14);
    const data = {};

    for (let i = 0; i < rowData.length; i++) {
        const currentRow = rowData.eq(i);
        const label = $(currentRow).find('td').eq(0).text().trim(); 
        const value = $(currentRow).find('td').eq(1).text().trim(); 
        data[cleanText(label)] = cleanText(value);
    }

    return data;
}

const firstDivData = extractFirstPanelData(panels);
console.log(Object.keys(firstDivData));


// parse second div

const extractSecondPanelData = (panels) => {
    const panel = panels.eq(1);
    const header = panel.find('.panel-heading').text().trim();
    const rowData = panel.find('.panel-body > .table.table-bordered > tbody > tr');

    assert(rowData.length === 4);
    const data = {};

    for (let i = 0; i < rowData.length; i++) {
        const currentRow = rowData.eq(i);
        const label = $(currentRow).find('td').eq(0).text().trim(); 
        const value = $(currentRow).find('td').eq(1).text().trim(); 
        data[cleanText(label)] = cleanText(value);
    }

    return data;
}

const secondDivData = extractSecondPanelData(panels);
console.log(Object.keys(secondDivData));


// parse third div

const extractThirdPanelData = (panels) => {
    const panel = panels.eq(2);
    const header = panel.find('.panel-heading').text().trim();
    const rowData = panel.find('.panel-body > .table.table-bordered > tbody > tr');

    assert(rowData.length === 2);
    const data = {};

    for (let i = 0; i < rowData.length; i++) {
        const currentRow = rowData.eq(i);
        const label = $(currentRow).find('td').eq(0).text().trim(); 
        const value = $(currentRow).find('td').eq(1).text().trim(); 
        data[cleanText(label)] = cleanText(value);
    }

    return data;
}

const thirdDivData = extractThirdPanelData(panels);
console.log(Object.keys(thirdDivData));

