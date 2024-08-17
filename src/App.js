import "./App.css";
import { useState } from "react";

// TODO: set up TS to annotate types

// this is a dataclass basically
class JobPosting {
  // make this a static method?
  findInString(unParsedText, regex) {
    const regexQuery = new RegExp(regex);
    return unParsedText.match(regexQuery);
  }

  constructor(unParsedText) {
    this.jobID = this.findInString(unParsedText, "Job ID: (.*)");
    this.jobTitle = this.findInString(unParsedText, "Job: (.*)");
    this.employerName = this.findInString(unParsedText, "Employer: (.*)");
  }
}

// conditionally render nothing instead?
function JobDetails({ jobPostingString }) {
  if (jobPostingString.length === 0) {
    return (
      <div>
        <p>Nothing to display</p>
      </div>
    );
  }

  // perform parsing here
  const jobPosting = new JobPosting(jobPostingString);

  return (
    <div>
      <p>Job ID: {jobPosting.jobID || null}</p>
      <p>Job Title: {jobPosting.jobTitle || null}</p>
      <p>Employer name: {jobPosting.employerName || null}</p>
    </div>
  );
}

function App() {
  const [jobPosting, setJobPosting] = useState("");

  return (
    <div>
      <textarea
        type="text"
        rows="10"
        cols="40"
        placeholder="Type something"
        onChange={(e) => setJobPosting(e.target.value)}
      />
      <JobDetails jobPostingString={jobPosting} />
    </div>
  );
}

export default App;
