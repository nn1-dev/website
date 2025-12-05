const getInviteUrls = ({
  id,
  name,
  description,
  location,
  dateStart,
  dateEnd,
}: {
  id: number;
  name: string;
  description: string;
  location: string;
  dateStart: Date;
  dateEnd: Date;
}) => {
  const getUtcParts = (date: Date) => ({
    year: date.getUTCFullYear().toString(),
    month: (date.getUTCMonth() + 1).toString().padStart(2, "0"),
    day: date.getUTCDate().toString().padStart(2, "0"),
    hour: date.getUTCHours().toString().padStart(2, "0"),
    minute: date.getUTCMinutes().toString().padStart(2, "0"),
    second: date.getUTCSeconds().toString().padStart(2, "0"),
  });

  const dateTimeStartPartsUtc = getUtcParts(dateStart);

  const dateTimeEndPartsUtc = getUtcParts(dateEnd);

  const googleStart = `${dateTimeStartPartsUtc.year}${dateTimeStartPartsUtc.month}${dateTimeStartPartsUtc.day}T${dateTimeStartPartsUtc.hour}${dateTimeStartPartsUtc.minute}${dateTimeStartPartsUtc.second}Z`;
  const googleEnd = `${dateTimeEndPartsUtc.year}${dateTimeEndPartsUtc.month}${dateTimeEndPartsUtc.day}T${dateTimeEndPartsUtc.hour}${dateTimeEndPartsUtc.minute}${dateTimeEndPartsUtc.second}Z`;

  const encodedName = encodeURIComponent(`NN1 Dev Club ${name}`);
  const encodedDescription = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);

  return {
    iCal: `${import.meta.env.DEV ? "http://localhost:4321" : "https://nn1.dev"}/events/${id}/invite`,
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${googleStart}%2F${googleEnd}&details=${encodedDescription}&location=${encodedLocation}&text=${encodedName}`,
  };
};

export { getInviteUrls };
