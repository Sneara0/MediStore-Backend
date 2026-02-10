"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryString = void 0;
// Convert query param to string safely
const getQueryString = (value) => {
    if (!value)
        return undefined;
    // If array, take first element
    const v = Array.isArray(value) ? value[0] : value;
    // Only return if it's string
    return typeof v === "string" ? v : undefined;
};
exports.getQueryString = getQueryString;
