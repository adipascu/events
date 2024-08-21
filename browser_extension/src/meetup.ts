import { getInputField, setReactField } from "./field";

type Event = {
  title: string;
};

export const fillMeetup = ({ title }: Event) => {
  const titleField = getInputField("#event-schedule-main input[name=title]");
  setReactField(titleField, title);
};
