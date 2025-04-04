import { redirect } from "next/navigation";

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US",
): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const classLister =
  (styleObject: Record<string, string>) =>
  (...classList: string[]) => {
    const generateClassString = (
      list: string,
      myClass: string[] | string,
    ): string => {
      let output: string = list;
      if (output !== "") {
        output += " "; // appends a space if list is not empty
      }
      if (Array.isArray(myClass)) {
        output += myClass.reduce(generateClassString, ""); // recursion to deal with Arrays
      } else if (/\s/.test(myClass)) {
        output += myClass.split(" ").reduce(generateClassString, "");
      } else if (styleObject[myClass] !== undefined) {
        output += styleObject[myClass];
        // append styleObject['myClass'] value to the list if it is defined in styleObject
      } else if (typeof myClass === "string") {
        output += myClass; // append 'myClass' directly to the list
      }

      return output;
    };
    return classList.reduce(generateClassString, "");
  };

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
