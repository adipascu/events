export const setReactField = (
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string
) => {
  const setter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(element),
    "value"
  )?.set;
  if (!setter) {
    throw new Error("Missing setter");
  }
  setter.call(element, value);
  element.dispatchEvent(new Event("input", { bubbles: true }));
};

export const getInputField = (
  querySelector: string,
  parentFilter?: (element: HTMLElement) => boolean
): HTMLInputElement => {
  const elements = [...document.querySelectorAll(querySelector)];

  const filteredElements = parentFilter
    ? elements.filter((element) => {
        let parent = element.parentElement;
        while (parent) {
          if (!parentFilter(parent)) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      })
    : elements;
  if (filteredElements.length === 0) {
    throw new Error("Missing field " + querySelector);
  }
  if (filteredElements.length > 1) {
    throw new Error("Too many fields " + querySelector);
  }
  const element = filteredElements[0];
  if (!(element instanceof HTMLInputElement)) {
    throw new Error("Invalid element type " + element.tagName);
  }
  return element;
};

export const getDiv = (selector: string) => {
  const elements = [...document.querySelectorAll(selector)];
  if (elements.length === 0) {
    throw new Error("Missing div " + selector);
  }
  if (elements.length > 1) {
    throw new Error("Too many divs " + selector);
  }
  const element = elements[0];
  if (!(element instanceof HTMLDivElement)) {
    throw new Error("Invalid element type " + element.tagName);
  }
  return element;
};
