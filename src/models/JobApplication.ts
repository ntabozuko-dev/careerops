interface BaseJobApplication{
    readonly id: string;
    jobPostId?: string;
    jobCategory?: string;
    seniorityLevel?: string;
    companyName: string;
    industry?: string;
    roleTitle: string;
    closingDate?: string;
    requiredSkills?: string[];
    notes?: string;
    cvVersion?: string;
}

interface PlannedApplication extends BaseJobApplication{
    readonly status: "planned";
    
}

export interface SubmittedApplication extends BaseJobApplication{
    readonly status: "submitted";
    employerResponseDeadline?: string;
    submissionDate: string;
    responseDate?: string;
    
    recruitmentStatus: "assessment" |"screened" | "rejected" | "interview" | "offer" | "awaiting_response" | "offer_accepted" | "offer_declined";
}

export type JobApplication = PlannedApplication | SubmittedApplication;

export type { PlannedApplication };