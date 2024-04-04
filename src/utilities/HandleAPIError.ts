import capitalize from "./capitalize";

const HandleAPIError = (error: any): string => {
  let errorMessage = "Unknown Error";

  console.log(error?.response?.data);

  if (!!error?.response?.data) {
    let data = error.response.data;
    if (typeof data === "string") {
      errorMessage = data;
    } else if (Array.isArray(data) && data.length > 0) {
      // Handle Zod Errors
      const issue = data[0];

      const fieldName = capitalize(issue.path[0]);
      const errorType = issue.code;

      switch (errorType) {
        case "invalid_type":
          errorMessage = `${fieldName} must be a ${issue.expected} value`;
          break;
        case "too_small":
          errorMessage = `${fieldName} must be at least ${issue.minimum} characters`;
          break;
        case "too_big":
          errorMessage = `${fieldName} must be less than ${issue.maximum} characters`;
          break;
        default:
          errorMessage = `${fieldName} is invalid`;
      }
    }
  }

  return errorMessage;
};

export default HandleAPIError;
