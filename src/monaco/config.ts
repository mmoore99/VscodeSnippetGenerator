import type { editor } from 'monaco-editor';

export const getEditorConfig = (options: {
    value: string;
    language: string;
    readOnly?: boolean;
}): editor.IStandaloneEditorConstructionOptions => ({
    value: options.value,
    language: options.language,
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: '"Fira Code", "Droid Sans Mono", "monospace", monospace',
    minimap: { enabled: false },
    lineNumbers: 'on',
    readOnly: options.readOnly || false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 4,
    indentSize: 4,
    insertSpaces: true,
    detectIndentation: false,
    wordWrap: 'on',
    renderWhitespace: 'selection',
    renderLineHighlight: 'line',
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    renderIndentGuides: true,
    quickSuggestions: false,
    suggestOnTriggerCharacters: false,
    contextmenu: false,
    folding: true,
    links: false,
    hover: {
        enabled: false
    }
});