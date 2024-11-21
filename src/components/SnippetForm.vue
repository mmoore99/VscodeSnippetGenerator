<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import type { SnippetInput } from '../types/snippet';

const props = defineProps<{
  modelValue: SnippetInput;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: SnippetInput): void;
}>();

const form = useLocalStorage<SnippetInput>('snippet-form', props.modelValue);

watch(form, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

const clearSourceCode = () => {
  form.value.sourceCode = '';
};

const resetForm = () => {
  form.value = {
    name: '',
    prefix: '',
    description: '',
    scope: '',
    spacesPerTab: 4,
    sourceCode: ''
  };
};
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Snippet Name</label>
        <input
          v-model="form.name"
          type="text"
          class="form-input"
          placeholder="mySnippet"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Prefix</label>
        <input
          v-model="form.prefix"
          type="text"
          class="form-input"
          placeholder="myprefix"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input
          v-model="form.description"
          type="text"
          class="form-input"
          placeholder="My awesome snippet"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Scope</label>
        <input
          v-model="form.scope"
          type="text"
          class="form-input"
          placeholder="javascript,typescript"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Spaces per Tab</label>
        <input
          v-model.number="form.spacesPerTab"
          type="number"
          min="1"
          max="8"
          class="form-input"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Source Code</label>
        <div class="relative">
          <textarea
            v-model="form.sourceCode"
            rows="8"
            class="form-input font-mono"
            placeholder="Enter your code here..."
          ></textarea>
          <button
            @click="clearSourceCode"
            class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <button
      @click="resetForm"
      class="w-full btn btn-danger"
    >
      Reset All
    </button>
  </div>
</template>