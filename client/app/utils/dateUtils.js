export const TODAY = new Date().toLocaleDateString('en-CA');

export function buildISODateTime(dateStr, timeStr, tzOffset = new Date().getTimezoneOffset()) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const [year, month, day] = dateStr.split('-').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));

    utcDate.setMinutes(utcDate.getMinutes() + tzOffset);
    return utcDate.toISOString();
}

export function formatBookingDate(dateString, locale = "en-US") {
    const date = new Date(dateString);
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const bookingDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const diffDays = Math.floor(
        (bookingDay - today) / (1000 * 60 * 60 * 24)
    );

    const formattedDate = date.toLocaleDateString(locale, {
        month: "long",
        day: "numeric"
    });

    const formattedTime = date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    if (diffDays === 0) {
        return `Today, ${formattedDate} · ${formattedTime}`;
    }

    if (diffDays === 1) {
        return `Tomorrow, ${formattedDate} · ${formattedTime}`;
    }

    return `${formattedDate} · ${formattedTime}`;
}