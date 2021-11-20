
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

export function convertDateToStrTime(datetime) {
    return `${convertDateToStr(datetime)} - ${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`;
}

export function timeAgo(datetime) {
    const now = new Date();
    if (now - datetime < 0) return "Tương lai";
    if (now - datetime < 60 * 1000) {
        return "Vài giây trước";
    }
    if (now - datetime < 60 * 60 * 1000) {
        let ago = Math.round((now - datetime) / (60 * 1000));
        return `${ago} phút trước`;
    }
    if (now - datetime < 24 * 60 * 60 * 1000) {
        if (datetime.getDate() === now.getDate()) {
            let ago = Math.round((now - datetime) / (60 * 60 * 1000));
            return `${ago} giờ trước`
        }
        else {
            return `Hôm qua - ${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`
        }
    }
    if ((now - datetime < 48 * 60 * 60 * 1000) && (datetime.getDate() === now.getDate() - 1)) {
        return `Hôm qua - ${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`
    }
    return convertDateToStrTime(datetime);
}