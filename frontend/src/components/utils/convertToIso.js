const convertToISOWithOffset = (dateTime) => {
    if (!dateTime) return "";

    const localDate = new Date(dateTime);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const hour = String(localDate.getHours()).padStart(2, "0");
    const minute = String(localDate.getMinutes()).padStart(2, "0");
    const second = String(localDate.getSeconds()).padStart(2, "0");

    const timezoneOffset = -localDate.getTimezoneOffset();
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, "0");
    const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");
    const offsetSign = timezoneOffset >= 0 ? "+" : "-";

    const formattedOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${formattedOffset}`;
};

export {convertToISOWithOffset};