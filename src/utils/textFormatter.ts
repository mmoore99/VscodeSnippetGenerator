export const formatText = (text: string): string => {
    if (!text) return '';

    const lines = text.split('\n');
    const formattedLines: string[] = [];
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
            formattedLines.push('');
            continue;
        }

        // Decrease indent for lines starting with closing braces/brackets
        if (line.startsWith('}') || line.startsWith(')') || line.startsWith(']')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }

        // Add the line with proper indentation
        const indent = ' '.repeat(4 * indentLevel);
        formattedLines.push(indent + line);

        // Increase indent for lines ending with opening braces/brackets
        // but not if the next line starts with a closing one
        const nextLine = lines[i + 1]?.trim() || '';
        if (
            (line.endsWith('{') || line.endsWith('(') || line.endsWith('[')) &&
            !nextLine.startsWith('}') &&
            !nextLine.startsWith(')') &&
            !nextLine.startsWith(']')
        ) {
            indentLevel++;
        }

        // Handle special cases for control structures without braces
        if (
            (line.startsWith('if ') || line.startsWith('else ') || line.startsWith('for ') || 
             line.startsWith('while ') || line.startsWith('do ')) &&
            !line.endsWith('{') &&
            !nextLine.startsWith('{')
        ) {
            indentLevel++;
        }
    }

    return formattedLines.join('\n');
};