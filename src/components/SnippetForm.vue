<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import type { SnippetInput } from '../types/snippet';
import { defaultSnippetInput } from '../utils/defaults';
import MonacoEditor from './MonacoEditor.vue';

const props = defineProps<{
  modelValue: SnippetInput;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: SnippetInput): void;
}>();

const form = useLocalStorage<SnippetInput>('snippet-form', props.modelValue);
const selectedLanguage = ref('javascript');
const shouldMirrorName = ref(false);

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'vue', label: 'Vue' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'python', label: 'Python' },
];

watch(form, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

watch(() => form.value.name, (newName) => {
  if (shouldMirrorName.value) {
    form.value.prefix = newName;
  }
});

const handleNameFocus = () => {
  if (!form.value.name) {
    shouldMirrorName.value = true;
  }
};

const handleNameBlur = () => {
  shouldMirrorName.value = false;
};

const resetForm = () => {
  form.value = defaultSnippetInput();
  selectedLanguage.value = 'javascript';
  shouldMirrorName.value = false;
};

const handleSourceCodeChange = (value: string) => {
  form.value.sourceCode = value;
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="space-y-4 mb-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Snippet Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="mySnippet"
            @focus="handleNameFocus"
            @blur="handleNameBlur"
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

      <div class="grid grid-cols-2 gap-4">
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
          <label class="block text-sm font-medium text-gray-700">Language</label>
          <select
            v-model="selectedLanguage"
            class="form-input"
          >
            <option v-for="lang in languages" :key="lang.value" :value="lang.value">
              {{ lang.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex-1 min-h-0 mb-8">
      <label class="block text-sm font-medium text-gray-700 mb-2">Source Code</label>
      <MonacoEditor
        v-model="form.sourceCode"
        :language="selectedLanguage"
        class="h-full"
        @update:modelValue="handleSourceCodeChange"
      />
    </div>

    <div class="flex justify-center">
      <button
        @click="resetForm"
        class="btn btn-danger px-4 py-2 text-sm"
      >
        Reset All
      </button>
    </div>
  </div>
</template>