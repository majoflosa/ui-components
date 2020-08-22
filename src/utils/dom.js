const domParser = new DOMParser();

/**
 * Returns a DOM element from provided template
 * 
 * @param {string} template HTML formatted as string
 * @param {string} type type of formatting used to convert string to element
 */
export const elementFromTemplate = (template, type = 'text/html') => {
    // if no template is provided, return empty div element
    if (!template) return document.createElement('div');

    // convert template to new DOM
    const parsedDoc = domParser.parseFromString(template, type);
    // if new DOM body is empty, return empty div element
    if (!parsedDoc.body.childElementCount) return document.createElement('div');

    let element;
    if (parsedDoc.body.childElementCount > 1) {
        // if new DOM body contains more than one direct child, wrap children in div element
        element = document.createElement('div');
        element.append(...parsedDoc.body.children);
    } else {
        // otherwise, get the single element
        element = parsedDoc.body.firstElementChild;
    }

    return element;
};
