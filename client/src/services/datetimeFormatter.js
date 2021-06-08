const dateTimeOptions = { 
  timeStyle: "short",
  timeZone: "America/New_York"
};
const dateTimeFormatter = new Intl.DateTimeFormat(
  'en-US', dateTimeOptions
);

export {
  dateTimeFormatter
}