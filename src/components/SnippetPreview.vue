<script setup lang="ts">
import { computed } from 'vue';
import type { SnippetInput, VSCodeSnippet } from '../types/snippet';

const props = defineProps<{
  snippet: SnippetInput;
}>();

const formatSourceCode = (code: string): string[] => {
  if (!code.trim()) return [];
  return code
    .split('\n')
    .map((line) => line.trimLeft())
    .filter((line) => line !== '');
};

const generatedSnippet = computed<VSCodeSnippet>(() => {
  const { name, prefix, description, scope, sourceCode } = props.snippet;

  if (!name || !sourceCode) {
    return {};
  }

  return {
    [name]: {
      prefix,
      body: formatSourceCode(sourceCode),
      description,
      scope,
    },
  };
});

const snippetJson = computed(() => {
  return JSON.stringify(
    generatedSnippet.value,
    null,
    props.snippet.spacesPerTab
  );
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(snippetJson.value);
    alert('Snippet copied to clipboard!');
  } catch (err) {
    alert('Failed to copy snippet to clipboard');
  }
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Preview</h2>
      <button
        @click="copyToClipboard"
        class="btn btn-primary"
        :disabled="!snippetJson"
      >
        Copy to Clipboard
      </button>
    </div>

    <pre class="code-preview"><code>{{ snippetJson }}</code></pre>
  </div>
</template>
