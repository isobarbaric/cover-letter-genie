import * as cheerio from 'cheerio';
//import assert from 'assert';
import CoopPosting from './coopPosting.js';

const cleanKey = (text) => {
    let cleanedText = text.trim();
    if (cleanedText[cleanedText.length - 1] === ':') {
        cleanedText = cleanedText.slice(0, -1);
    }

    return cleanedText;
}

// TODO: specify all types for intermediate variables
const extractData = (HTMLSource) => {
    const $ = cheerio.load(HTMLSource);
    const postingDiv = $('#postingDiv');
    const panels = postingDiv.find('.panel.panel-default');

    //assert(panels.length === 3);
    const postingData = {};

    // iterate through each panel
    for (let i = 0; i < panels.length; i++) {
        const panel = panels.eq(i);
        const rowData = panel.find('.panel-body > .table.table-bordered > tbody > tr');

        // in each panel, iterate through each row
        for (let i = 0; i < rowData.length; i++) {
            const currentRow = rowData.eq(i);
            const label = $(currentRow).find('td').eq(0).text().trim(); 
            const value = $(currentRow).find('td').eq(1).text().trim(); 
            postingData[cleanKey(label)] = value;
        }
    }

    //assert(Object.keys(postingData).length === 20);

    return new CoopPosting(
          postingData['Term Posted'],
          postingData['Position Type'],
          postingData['Level'],
          postingData['Job Title'],
          postingData['Job Openings'],
          postingData['Job Category (NOC)'],
          postingData['Region'],
          postingData['Start Date'],
          postingData['Job Summary'],
          postingData['Job Responsibilities'],
          postingData['Required Skills'],
          postingData['Compensation and Benefits'],
          postingData['Other Job Details'],
          postingData['Targeted Degrees and Disciplines'],
          postingData['Application Deadline'],
          postingData['Application Delivery'],
          postingData['Application Documents Required'],
          postingData['Additional Application Information'],
          postingData['Organization'],
          postingData['Division']
    );
}

export default extractData;
