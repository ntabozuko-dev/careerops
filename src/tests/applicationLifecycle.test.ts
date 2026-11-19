import { describe, it, expect } from "vitest";
import { submitApplication } from "../domain/applicationLifecycle";
import type { PlannedApplication } from "../models/JobApplication";

function createApplication(): PlannedApplication {
  return {
    id: "10155",
    jobCategory: "SoftwareDevelopment",
    status: "planned",
    companyName: "Example Technologies",
    roleTitle: "Junior Software Engineer",
    industry: "Information Technology",
    seniorityLevel: "Entry Level",
    closingDate: "2026-11-15",
    requiredSkills: ["JavaScript", "TypeScript", "React"],
    notes:
      "Excited about the opportunity to contribute to innovative projects.",
    cvVersion: "v1.0",
  };
}

describe("Application lifecycle", () => {
  it("preserves the application ID", () => {
    // Arrange: create a valid planned application.
    const plannedApplication: PlannedApplication = createApplication();
    // Act: submit the application.
    const submittedApplication = submitApplication(
      plannedApplication,
      "2023-03-01",
    );
    // Assert: verify that both IDs are equal.
    expect(submittedApplication.id).toBe(plannedApplication.id);
  });

  it("preserves the application required skills array contents", () => {
    // Arrange: create a valid planned application.
    const plannedApplication: PlannedApplication = createApplication();
    // Act: submit the application.
    const submittedApplication = submitApplication(
      plannedApplication,
      "2023-03-01",
    );

    // Assert: verify that the requiredSkills arrays have the same contents
    expect(submittedApplication.requiredSkills).toEqual(
      plannedApplication.requiredSkills,
    );
  });

  it("does not mutate the original skills array", () => {
    // Arrange
    const planned = createApplication();
    const originalSkills = [...(planned.requiredSkills ?? [])];

    // Act
    const submitted = submitApplication(planned, "2023-03-01");

    expect(submitted.requiredSkills).toBeDefined();
    submitted.requiredSkills!.push("Node.js");

    // Assert
    expect(planned.requiredSkills).toEqual(originalSkills);
    expect(submitted.requiredSkills).toContain("Node.js");
  });

  it("does not mutate the original skills array", () => {
    // Arrange
    const planned = createApplication();

    // Act
    const submitted = submitApplication(planned, "2023-03-01");

    expect(submitted.requiredSkills).toBeDefined();
    submitted.requiredSkills!.push("Node.js");

    // Assert
    expect(submitted.requiredSkills).toContain("Node.js");
});

  it("verifies the application status is updated to submitted", () => {
    // Arrange: create a valid planned application.
    const plannedApplication: PlannedApplication = createApplication();
    // Act: submit the application.
    const submittedApplication = submitApplication(
      plannedApplication,
      "2023-03-01",
    );
    // Assert: verify that the status is "submitted"
    expect(submittedApplication.status).toBe("submitted");
  });
  it("does not mutate the original application status", () => {
    // Arrange: create a valid planned application.
    const plannedApplication: PlannedApplication = createApplication();
    // Act: submit the application.
    const submittedApplication = submitApplication(
      plannedApplication,
      "2023-03-01",
    );
    // Assert: verify that original status is still "planned"
    expect(plannedApplication.status).toBe("planned");
    expect(submittedApplication.status).toBe("submitted");
  });

  it("verifies the initial recruitment status is awaiting_response", () => {
    // Arrange: create a valid planned application.
    const plannedApplication: PlannedApplication = createApplication();
    // Act: submit the application.
    const submittedApplication = submitApplication(
      plannedApplication,
      "2023-03-01",
    );
    // Assert: verify initial recruitmentStatus is "awaiting_response"
    expect(submittedApplication.recruitmentStatus).toBe("awaiting_response");
  });

  it("verifies the submission date is set", () => {
    // Arrange: create a valid planned application.
    const plannedApplication: PlannedApplication = createApplication();
    // Act: submit the application.
    const submittedApplication = submitApplication(
      plannedApplication,
      "2023-03-01",
    );
    // Assert: verify that the submissionDate is defined
    expect(submittedApplication.submissionDate).toBeDefined();
  });

  it("rejects future submission dates", () => {
    // Arrange: create a valid planned application.

    // Act: submit the application.

    // Assert: verify that the submissionDate is valid
    expect(() =>
      submitApplication(createApplication(), "2027-10-01"),
    ).toThrow();
  });

  it("rejects nonexistent submission dates", () => {
    // Arrange: create a valid planned application.

    // Act: submit the application.

    // Assert: verify that the submissionDate is valid
    expect(() =>
      submitApplication(createApplication(), "2024-04-31"),
    ).toThrow();
  });

  it("rejects February 30th", () => {
    // Arrange: create a valid planned application.

    // Act: submit the application.

    // Assert: verify that the submissionDate is valid
    expect(() =>
      submitApplication(createApplication(), "2024-02-30"),
    ).toThrow();
  });

  it("rejects malformed ISO date stringsn'", () => {
    // Arrange: create a valid planned application.

    // Act: submit the application.

    // Assert: verify that the submissionDate is valid
    expect(() => submitApplication(createApplication(), "2023-1-1")).toThrow();
  });

});
