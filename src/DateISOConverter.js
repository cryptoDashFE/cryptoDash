// DateISOConver function convert time to ISO time.
// It also accept one argument if user wants past month's ISO time
export default function DateISOConverter(...prevMonth) {
  let ISOtime;

  if (prevMonth.length === 0) {
    ISOtime = new Date().toISOString();
    return ISOtime;
  } else if (prevMonth.length === 1) {
    let currDate = new Date();
    var m = currDate.getMonth();
    currDate.setMonth(currDate.getMonth() - prevMonth);
    // If still in same month, set date to last day of previous month
    if (currDate.getMonth() === m) currDate.setDate(0);
    currDate.setHours(0, 0, 0, 0);
    // Get the time value in milliseconds and convert to seconds
    let unixtstart = (currDate / 1000) | 0;
    let preMonth = new Date(unixtstart * 1000);
    ISOtime = new Date(preMonth).toISOString();
    return ISOtime;
  } else {
    console.log("DateISOConverter function cannot accept more than 1 argument");
  }
}
