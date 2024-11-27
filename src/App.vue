<script setup lang="ts">
import { ref } from 'vue';
import SnippetForm from './components/SnippetForm.vue';
import SnippetPreview from './components/SnippetPreview.vue';
import type { SnippetInput } from './types/snippet';
import { defaultSnippetInput } from './utils/defaults';

const snippetData = ref<SnippetInput>(defaultSnippetInput());
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 text-center mb-8">
        VSCode Snippet Generator
      </h1>
      
      <div class="grid-panels">
        <div class="panel">
          <div class="panel-content">
            <SnippetForm v-model="snippetData" />
          </div>
        </div>
        
        <div class="panel">
          <div class="panel-content">
            <SnippetPreview :snippet="snippetData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 100%;
}

.grid-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1920px;
  margin: 0 auto;
  height: calc(100vh - 160px);
  min-height: 600px;
}

.panel {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-content {
  flex: 1;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1024px) {
  .grid-panels {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .panel {
    min-height: 600px;
  }
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

.monaco-editor-container {
  flex: 1;
  min-height: 0;
}
</style>