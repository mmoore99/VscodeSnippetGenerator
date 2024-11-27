import * as monaco from 'monaco-editor';
import { setupWorkers } from './workers';
import { setupLanguages, setupTypeScriptConfig } from './languages';

export const setupMonaco = () => {
  try {
    setupWorkers();
    monaco.editor.setTheme('vs-dark');
    setupLanguages();
    setupTypeScriptConfig();

    // Disable error messages in the editor
    monaco.editor.onDidCreateEditor((editor) => {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelMarkers(model, 'owner', []);
      }
    });
  } catch (error) {
    console.error('Monaco setup error:', error);
  }
};

export { monaco };