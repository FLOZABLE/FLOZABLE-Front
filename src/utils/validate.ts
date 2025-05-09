export function validateStrictString(
  value: string,
  type: string,
  maxLength = 20,
  minLength = 1
) {
  if (!value) {
    return { isValid: false, message: `Please provide ${type}` };
  }
  if (value.length < minLength) {
    return { isValid: false, message: `${type} is too short` };
  }
  if (value.length > maxLength) {
    return { isValid: false, message: `${type} is too long` };
  }
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return {
      isValid: false,
      message: `Invalid ${type} (Only A-Z, a-z, and 0-9 allowed)`,
    };
  }
  return { isValid: true, message: "" };
}

export function validatePassword(
  password: string,
  max = 20,
  min = 5,
  specialNeeded = true
) {
  if (!password) {
    return { isValid: false, message: `Please provide a password` };
  }
  if (password.length < min) {
    return {
      isValid: false,
      message: `Password is too short (${min} characters minimum)`,
    };
  }
  if (password.length > max) {
    return {
      isValid: false,
      message: `Password is too long (${max} characters maximum)`,
    };
  }
  if (
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) &&
    specialNeeded
  ) {
    return { isValid: false, message: `You need special characters` };
  }
  return { isValid: true, message: "" };
}

export function validateURL(
  input: string,
  strict = false,
  allowedOrigins: string[] = []
) {
  try {
    if (!input) {
      return { isValid: false, reason: "Please provide URL" };
    }

    const raw =
      input.includes("http://") || input.includes("https://")
        ? input
        : `https://${input}`;

    const url = new URL(raw);
    const origin = url.origin.replace(/^www\./, "");
    const domain = url.hostname.replace(/^www\./, "");

    if (domain.length > 100) {
      return { isValid: false, reason: "Invalid URL" };
    }

    if (!domain.includes(".")) {
      return { isValid: false, reason: "Invalid public domain" };
    }

    if (strict && !allowedOrigins.includes(origin)) {
      return { isValid: false, reason: "Invalid Domain" };
    }

    return { isValid: true, domain, origin, url };
  } catch {
    return { isValid: false, reason: "Invalid URL" };
  }
}
