<script setup lang="ts">
import { ref } from 'vue';
import SnippetForm from './components/SnippetForm.vue';
import SnippetPreview from './components/SnippetPreview.vue';
import type { SnippetInput } from './types/snippet';

const snippetData = ref<SnippetInput>({
  name: '',
  prefix: '',
  description: '',
  scope: '',
  spacesPerTab: 4,
  sourceCode: ''
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 text-center mb-8">
        VSCode Snippet Generator
      </h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <SnippetForm v-model="snippetData" />
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <SnippetPreview :snippet="snippetData" />
        </div>
      </div>
    </div>
  </div>
</template>