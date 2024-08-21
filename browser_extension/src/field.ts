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

export const getInputField = (querySelector: string): HTMLInputElement => {
  const elements = [...document.querySelectorAll(querySelector)];
  if (elements.length === 0) {
    throw new Error("Missing field " + querySelector);
  }
  if (elements.length > 1) {
    throw new Error("Too many fields " + querySelector);
  }
  const element = elements[0];
  if (!(element instanceof HTMLInputElement)) {
    throw new Error("Invalid element type " + element.tagName);
  }
  return element;
};
