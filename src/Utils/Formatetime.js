// export function formatTime(timeString) {
//   const time = new Date(timeString);
//   const options = {
   
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   };
//   return time.toLocaleString("en-GB", options); // en-GB ensures day/month/year format
// }
export const formatetime = (timeString) => {
  if (!timeString) return "N/A";
  
  try {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    const formatted = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // ✅ enables AM/PM
    });

    return formatted;
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString;
  }
};
