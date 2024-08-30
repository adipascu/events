import { getDiv, getInputField, setReactField } from "./field";
import { PLACEHOLDER_DESCRIPTION } from "./placeholder-description";

type Event = {
  title: string;
};

export const fillMeetup = ({ title }: Event) => {
  const titleField = getInputField("#event-schedule-main input[name=title]");
  setReactField(titleField, title);

  const startDateField = getInputField(
    "#event-schedule-main .DayPickerInput input",
    (parent) => {
      return !parent.classList.contains("hidden");
    }
  );
  setReactField(startDateField, "Thu, Sep 20, 2025");

  const startTimeField = getInputField(
    "#event-schedule-main input[type=time]",
    (parent) => {
      return !parent.classList.contains("hidden");
    }
  );
  setReactField(startTimeField, "04:20");

  const div = getDiv(".toastui-editor-ww-container .toastui-editor-contents");
  div.innerHTML = PLACEHOLDER_DESCRIPTION;
};
