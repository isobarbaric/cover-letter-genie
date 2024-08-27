// set up TS for type signatures on functions
import fs from 'fs';
import * as cheerio from 'cheerio';
import assert from 'assert';
import CoopPosting from './coopPosting.js';

let text = fs.readFileSync('src/sample-posting.html', 'utf8');

const extractData = (text) => {
    const $ = cheerio.load(text);
    const postingDiv = $('#postingDiv');
    const panels = postingDiv.find('.panel.panel-default');

    assert(panels.length === 3);
    const data = {};

    // iterate through each panel
    for (let i = 0; i < panels.length; i++) {
        const panel = panels.eq(i);
        const rowData = panel.find('.panel-body > .table.table-bordered > tbody > tr');

        // in each panel, iterate through each row
        for (let i = 0; i < rowData.length; i++) {
            const currentRow = rowData.eq(i);
            const label = $(currentRow).find('td').eq(0).text().trim(); 
            const value = $(currentRow).find('td').eq(1).text().trim(); 
            data[label] = value;
        }
    }

    assert(Object.keys(data).length === 20);
    return data;
}

const data = extractData(text);
console.log(Object.keys(data));

const values = Object.values(data);
const posting = new CoopPosting(...values);
console.log(posting.toString());
