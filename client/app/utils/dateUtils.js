export const TODAY = new Date().toLocaleDateString('en-CA');

export function buildISODateTime(dateStr, timeStr, tzOffset = new Date().getTimezoneOffset()) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const [year, month, day] = dateStr.split('-').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0));

    utcDate.setMinutes(utcDate.getMinutes() + tzOffset);
    return utcDate.toISOString();
}