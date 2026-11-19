import type {
  PlannedApplication,
  SubmittedApplication,
} from "../models/JobApplication";
//Define a template literal type for compile-time safety
type ISODateString = `${number}-${number}-${number}`;

function isValidISODate(value: string): value is ISODateString {
  // 1. Enforce exact YYYY-MM-DD format
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(value)) {
    return false;
  }

  // 2. Parse components directly to avoid timezone shifts
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  // 3. Verify the date is real and didn't roll over (e.g. Feb 30 -> Mar 2)
  const isRealDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  if (!isRealDate) {
    return false;
  }

  // 4. Reject dates earlier than today (today itself is allowed)
  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  return date.getTime() <= todayUTC;
}

function submitApplication(
  application: PlannedApplication,
  sDate: string,
): SubmittedApplication {
  if (!isValidISODate(sDate)) {
    throw new Error(
      `Invalid submission date: ${sDate}. check: \n 1. Format (YYYY-MM-DD).\n 2. Date is not in the future.`,
    );
  }

  return {
    ...application,
    submissionDate: sDate,
    recruitmentStatus: "awaiting_response",
    status: "submitted",
    requiredSkills: structuredClone(application.requiredSkills),
  };
}

export { submitApplication, isValidISODate };
