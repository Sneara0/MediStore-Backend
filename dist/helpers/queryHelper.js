// Convert query param to string safely
export const getQueryString = (value) => {
    if (!value)
        return undefined;
    // If array, take first element
    const v = Array.isArray(value) ? value[0] : value;
    // Only return if it's string
    return typeof v === "string" ? v : undefined;
};
//# sourceMappingURL=queryHelper.js.map