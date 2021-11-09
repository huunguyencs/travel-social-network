export function convertDateToStr(date) {
    // date is Date object
    return date.toLocaleDateString("vi-VN");
}

export function convertStrToDate(dateStr) {
    // dateStr is str at format dd/mm/yyyy
    var date = dateStr.split("/");
    var viFormatDate = date[1] + "/" + date[0] + "/" + date[2];
    return new Date(viFormatDate);
}