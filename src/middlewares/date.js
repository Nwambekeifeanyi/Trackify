const d = new Date();

// Force Nigeria timezone (IMPORTANT for OCI)
const optionsDate = {
  timeZone: "Africa/Lagos",
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const optionsTime = {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

// const regDate = d.toLocaleDateString("en-NG", optionsDate).replace(",", "");
const time = d.toLocaleTimeString("en-NG", optionsTime).toLowerCase();
const regDate = d.toISOString().split("T")[0];
const today = d.toISOString().split("T")[0];

export { regDate, time, today };