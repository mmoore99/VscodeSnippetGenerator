<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { monaco } from '../monaco/setup';
import { getEditorConfig } from '../monaco/config';
import { useEventListener } from '@vueuse/core';
import { formatText } from '../utils/textFormatter';

const props = defineProps<{
    modelValue: string;
    language?: string;
    readOnly?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const editorContainer = ref<HTMLElement>();
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

const initMonaco = () => {
    if (!editorContainer.value) return;

    try {
        editor = monaco.editor.create(
            editorContainer.value,
            getEditorConfig({
                value: formatText(props.modelValue),
                language: props.language || 'plaintext',
                readOnly: props.readOnly
            })
        );

        editor.onDidChangeModelContent(() => {
            const value = editor?.getValue() || '';
            emit('update:modelValue', formatText(value));
        });

        // Clear any initial markers
        const model = editor.getModel();
        if (model) {
            monaco.editor.setModelMarkers(model, 'owner', []);
        }

        // Initial layout
        editor.layout();
    } catch (error) {
        console.error('Editor initialization error:', error);
    }
};

const updateEditorValue = () => {
    if (editor) {
        const position = editor.getPosition();
        const formattedValue = formatText(props.modelValue);
        editor.setValue(formattedValue);
        editor.setPosition(position || new monaco.Position(1, 1));
    }
};

const handleResize = () => {
    if (editor) {
        requestAnimationFrame(() => {
            editor?.layout();
        });
    }
};

watch(() => props.modelValue, updateEditorValue);
watch(() => props.language, (newLang) => {
    if (editor) {
        monaco.editor.setModelLanguage(editor.getModel()!, newLang || 'plaintext');
    }
});

onMounted(() => {
    initMonaco();
    handleResize();
});

onBeforeUnmount(() => {
    if (editor) {
        editor.dispose();
    }
});

useEventListener(window, 'resize', handleResize);
</script>

<template>
    <div 
        ref="editorContainer" 
        class="monaco-editor-container border border-gray-300 rounded-md overflow-hidden h-full"
    ></div>
</template>

<style>
.monaco-editor-container {
    width: 100%;
}
</style>