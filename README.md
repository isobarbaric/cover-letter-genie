# Cover Letter Genie

## Features

- on a job posting, flag jobs that require a cover letter

- on an open job posting, automatically open popup to provide option to generate a cover letter

## Functionality

The schema for how WaterlooWorks job postings are structured is in `schema.md`. 

The `extractData` method in `parser.js` is solely responsible for extracting the data from the job posting. Any cleaning up of the data is performed in the `CoopPosting` class in `coopPosting.js`.

