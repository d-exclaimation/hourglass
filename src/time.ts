export const format = (sec: number) => {
  const hour = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);

  if (sec < 1) {
    return "-";
  }

  return `${hour > 0 ? `${hour}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${
    seconds > 0 ? `${seconds}s` : ""
  }`;
};
