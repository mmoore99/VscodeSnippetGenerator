import { monaco } from './setup';

export const setupLanguages = () => {
  const languages = ['javascript', 'typescript', 'json', 'css', 'html'];
  
  languages.forEach(language => {
    monaco.languages.setLanguageConfiguration(language, {
      indentationRules: {
        increaseIndentPattern: /^.*\{[^}]*$|^\s*(if|while|for|do|else|case|default|try|finally)\s*.*$/,
        decreaseIndentPattern: /^(.*\}.*$)/
      }
    });
  });
};

export const setupTypeScriptConfig = () => {
  const jsDefaults = monaco.languages.typescript.javascriptDefaults;
  const tsDefaults = monaco.languages.typescript.typescriptDefaults;

  [jsDefaults, tsDefaults].forEach(lang => {
    lang.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      allowJs: true,
      typeRoots: ["node_modules/@types"]
    });

    lang.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true
    });

    lang.setMaximumWorkerIdleTime(-1);
  });
};