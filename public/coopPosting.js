// dataclass for a coop posting
// TODO: add specific parsing by field
class CoopPosting {
    constructor(
        termPosted,
        positionType,
        level,
        jobTitle,
        jobOpenings,
        jobCategory,
        region,
        startDate,
        jobSummary,
        jobResponsibilities,
        requiredSkills,
        compensationAndBenefits,
        otherJobDetails,
        targetedDegreesAndDisciplines,
        applicationDeadline,
        applicatonDelivery,
        applicationDocumentsRequired,
        additionalApplicationInfo,
        organization,
        division
    ) {
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
