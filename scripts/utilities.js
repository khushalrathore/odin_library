


export const shortenText = ( text, maxLength ) =>
    text.length > maxLength ? text.substring( 0, maxLength ) + "..." : text;
