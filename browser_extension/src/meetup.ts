import { getInputField, setReactField } from "./field";

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
  setReactField(startDateField, "Thu, Sep 20, 2000");

  const startTimeField = getInputField(
    "#event-schedule-main input[type=time]",
    (parent) => {
      return !parent.classList.contains("hidden");
    }
  );
  setReactField(startTimeField, "04:20");
};
