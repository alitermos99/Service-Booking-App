export function sanitizeInput(input) {
    if (typeof input !== "string") return "";

    let sanitized = input.trim();
    sanitized = sanitized.replace(/<[^>]*>?/gm, "");

    sanitized = sanitized
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    return sanitized;
}