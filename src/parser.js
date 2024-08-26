import fs from 'fs';
import * as cheerio from 'cheerio';
import assert from 'assert';

// use trim
// cut out the ':' at the end - instead of slicing off indiscriminately, we should check if the last character is a colon
const cleanText = (text) => {
    let cleanedText = text.trim();

    if (cleanedText[cleanedText.length - 1] === ':') {
        cleanedText = cleanedText.slice(0, -1);
    }

    return cleanedText;
}

let text = fs.readFileSync('src/sample-posting.html', 'utf8');

// TODO: set up a dataclass (return header)
const extractData = (text) => {
    const $ = cheerio.load(text);
    const postingDiv = $('#postingDiv');
    const panels = postingDiv.find('.panel.panel-default');

    assert(panels.length === 3);

    // parse first panel
    const extractFirstPanelData = () => {
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


    // parse second panel
    const extractSecondPanelData = () => {
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


    // parse third panel
    const extractThirdPanelData = () => {
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

    const data = Object.assign({}, extractFirstPanelData(panels), extractSecondPanelData(panels), extractThirdPanelData(panels));

    return data;
}

const data = extractData(text);
console.log(Object.keys(data));
console.log(Object.keys(data).length);

