# Cover Letter Genie

> Your Effortless WaterlooWorks Companion

This tool streamlines the process of applying for jobs on WaterlooWorks, making your application journey smoother and more efficient.

## Features

- detect when a WaterlooWorks job posting is open
- parse job postings and grab relevant information like job title, company name, etc.
- generate cover letters by replacing placeholders in a template with their job-specific values

## Functionality

The schema for how WaterlooWorks job postings are structured is in `schema.md`. 

The `extractData` method in `frontend/parser.js` is solely responsible for extracting the data from the job posting. Any cleaning up of the data is performed in the `CoopPosting` class in `frontend/coopPosting.js`.
