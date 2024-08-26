import fs from 'fs';
import { DOMParser } from 'xmldom';

let text = fs.readFileSync('src/sample-posting.html', 'utf8');

const parser = new DOMParser();
const doc = parser.parseFromString(text, 'text/html');

const postingDiv = doc.getElementById('postingDiv')
console.log(postingDiv);

//const subDivs = postingDiv.getElementsByClassName('panel panel-default');

//for (let i = 0; i < subDivs.length; i++) {
//  const subDiv = subDivs[i];
//  const title = subDiv.getElementsByClassName('panel-heading')[0].textContent;
//  console.log(title);
//}

// <div class="panel-body">
