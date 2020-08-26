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

export const htmlRegExps = {
    // matches a tag name
    tagName: /(?<=<)\w+\b(?=.*?>)/g,

    // matches opening tag with attributes
    openingTagAttrs: /<[a-z]*.\b.*">/g, 
    // openingTagAttrRE: /^&lt;[a-z]*\b.*&gt;\b/,
    // openingTagAttrRE: /<[a-z](?:.*")?>/, 
    
    // matches opening tag without attributes
    openingTagNoAttrs: /<[a-z]*.\b/g,
    // openingTagRe: /<[a-z]*>/,

    // matches opening tag with or without attributes
    openingTag: /<[\w-\s="]+>/g,
    // openingTag: /<[a-z]*.\b(?:.*")?>/g,

    // matches a closing tag
    closingTag: /<\/[\w-]+>/g,

    // matches an attribute
    attribute: /(?<=\s)\w+[\w-]*=".*?"(?=\s\w|>)/g,
    // attribute: /(?<=\s)\w+-*\w*=".*?"(?=\s\w|>)/g,
    
    // matches all attributes
    attributes: /(?<=\s)\w+-*\w*=".*"(?=\s\w|>)/g,
    // attributes: /(?<=\s)\w+-*\w*=".*\b"/g,

    // matches an attribute name
    attributeName: /(?<=\s)\w+-*\w*/g,

    // matches a shallow element from beginning to end
    shallowElement: /^<[\w-\s="]+>.*?<\/[\w-]+>$/g,
    deepElement: /^<[\w-\s="]+><[\w-\s="]+>.*?<\/[\w-]+><\/[\w-]+>$/g,

    // element inner content
    // innerHTML: /(?<=<[\w-]+\s*?[\w-="]*>)<.+>[^<]+<\/.+>(?=<\/[\w-]+>)/g,
    // innerContent: /(?<=<[\w-]+\s*?[\w-="]*>)([^<]+)(?=<\/[\w-]+>)/g,
    
    // text inside an element
    innerText: /(?<=<[\w-]+\s*?[\w-="]*>)[^<]+(?=<\/[\w-]+>)/g,
};

/**
 * Receives a dom string and returns formatted html text to output in a <code> block
 * 
 * @param {string} template
 */
export const formatDomString = (template) => {
    const { openingTag } = htmlRegExps;
    const match = openingTag.exec(template);
    let tag = match ? match[0] : 'No matches';


    tag = tag.replace(/</, '&lt;').replace(/>/, '&gt;');

    return `${tag}
    Contents
</div>`;
};
