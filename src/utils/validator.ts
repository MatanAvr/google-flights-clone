import { SearchData } from "../types";

export const validateSearchParams = (params: SearchData) => {
  const errors: Record<string, string> = {};

  // Helper function to check if a value is a valid date
  const isValidDate = (date: string) => !isNaN(Date.parse(date));

  // Required fields
  if (!params.originSkyId.trim()) errors.originSkyId = "Origin is required.";
  if (!params.destinationSkyId.trim())
    errors.destinationSkyId = "Destination is required.";
  if (!params.date.trim() || !isValidDate(params.date))
    errors.date = "Valid departure date is required.";

  // Return date validation (optional but must be valid)
  if (params.returnDate && !isValidDate(params.returnDate)) {
    errors.returnDate = "Return date must be a valid date.";
  }

  // Cabin class validation
  const validCabinClasses = ["economy", "premium", "business", "first"];
  if (!validCabinClasses.includes(params.cabinClass.toLowerCase())) {
    errors.cabinClass = "Invalid cabin class.";
  }

  // Adults validation (must be a positive integer)
  if (!/^\d+$/.test(params.adults) || parseInt(params.adults) <= 0) {
    errors.adults = "Adults must be a positive integer.";
  }
  return errors; // Returns an object with errors or an empty object if valid
};
