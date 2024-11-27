<script setup lang="ts">
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
import type { SnippetInput } from '../types/snippet';
import MonacoEditor from './MonacoEditor.vue';
import { generateSnippet, formatSnippetJson } from '../utils/snippetConverter';

const toast = useToast();
const props = defineProps<{
  snippet: SnippetInput;
}>();

const generatedSnippet = computed(() => {
  return generateSnippet(props.snippet);
});

const snippetJson = computed(() => {
  return formatSnippetJson(generatedSnippet.value);
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(snippetJson.value);
    toast.success('Snippet copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy snippet to clipboard');
  }
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Preview</h2>
      <button
        @click="copyToClipboard"
        class="btn btn-primary"
        :disabled="!snippetJson"
      >
        Copy to Clipboard
      </button>
    </div>

    <div class="flex-1 min-h-0">
      <MonacoEditor
        v-model="snippetJson"
        language="json"
        :readOnly="true"
        class="h-full"
      />
    </div>
  </div>
</template>