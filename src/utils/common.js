export const formatNumber = (value) => {
    const fixedValue = value.toFixed(0);
    return new Intl.NumberFormat().format(fixedValue);
};

export const capitalizeString = (str) => {
    if (!str) return '';

    return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark) => {
    if (mark >= 8) return 'green';
    if (mark >= 4) return 'goldenrod';
    return 'red';
};

export const truncateString = (string, length) =>
    string.length < length ? string : `${string.slice(0, length - 3)}...`;
