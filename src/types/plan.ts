type GoogleEvent = gapi.client.calendar.Event;

export interface Plan {
  id: GoogleEvent["id"];
  summary: GoogleEvent["summary"];
  description?: GoogleEvent["description"];
  location?: GoogleEvent["location"];
  start: GoogleEvent["start"];
  end: GoogleEvent["end"];
  status?: GoogleEvent["status"];
  htmlLink?: GoogleEvent["htmlLink"];
  hangoutLink?: GoogleEvent["hangoutLink"];
  recurrence?: GoogleEvent["recurrence"];
  attendees?: GoogleEvent["attendees"];
  organizer?: GoogleEvent["organizer"];
  created?: GoogleEvent["created"];
  updated?: GoogleEvent["updated"];
  colorId?: GoogleEvent["colorId"];
}

export type EventDateTime = {
  date?: string;
  dateTime?: string;
  timeZone?: string;
};
