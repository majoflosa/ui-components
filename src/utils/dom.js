const domParser = new DOMParser();
const parseDom = domParser.parseFromString;

export const elementFromTemplate = (template, type = 'text/html') => {
    const parsedDoc = domParser.parseFromString(template, type);
    const element = parsedDoc.body.firstElementChild;

    return element;
};
