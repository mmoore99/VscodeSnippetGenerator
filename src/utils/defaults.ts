import type { SnippetInput } from '../types/snippet';

export const defaultSnippetInput = (): SnippetInput => ({
  name: '',
  prefix: '',
  description: '',
  scope: 'javascript,typescript',
  sourceCode: ''
});