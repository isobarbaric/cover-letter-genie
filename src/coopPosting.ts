
// dataclass for a coop posting
// TODO: add specific parsing by field
class CoopPosting {
    termPosted: string
    positionType: string
    level: string
    jobTitle: string
    jobOpenings: string
    jobCategory: string
    region: string
    startDate: string
    jobSummary: string
    jobResponsibilities: string
    requiredSkills: string
    compensationAndBenefits: string
    otherJobDetails: string
    targetedDegreesAndDisciplines: string
    applicationDeadline: string
    applicatonDelivery: string
    applicationDocumentsRequired: string
    additionalApplicationInfo: string
    organization: string
    division: string
    
    constructor(termPosted: string,
                positionType: string,
                level: string,
                jobTitle: string,
                jobOpenings: string,
                jobCategory: string,
                region: string,
                startDate: string,
                jobSummary: string,
                jobResponsibilities: string,
                requiredSkills: string,
                compensationAndBenefits: string,
                otherJobDetails: string,
                targetedDegreesAndDisciplines: string,
                applicationDeadline: string,
                applicatonDelivery: string,
                applicationDocumentsRequired: string,
                additionalApplicationInfo: string,
                organization: string,
                division: string) {
        this.termPosted = termPosted;
        this.positionType = positionType;
        this.level = level;
        this.jobTitle = jobTitle;
        this.jobOpenings = jobOpenings;
        this.jobCategory = jobCategory;
        this.region = region;
        this.startDate = startDate;
        this.jobSummary = jobSummary;
        this.jobResponsibilities = jobResponsibilities;
        this.requiredSkills = requiredSkills;
        this.compensationAndBenefits = compensationAndBenefits;
        this.otherJobDetails = otherJobDetails;
        this.targetedDegreesAndDisciplines = targetedDegreesAndDisciplines;
        this.applicationDeadline = applicationDeadline;
        this.applicatonDelivery = applicatonDelivery;
        this.applicationDocumentsRequired = applicationDocumentsRequired;
        this.additionalApplicationInfo = additionalApplicationInfo;
        this.organization = organization;
        this.division = division;
    }

    // only include the job title and organization
    toString() {
        return `${this.jobTitle} at ${this.organization}`;
    }

}

export default CoopPosting;
