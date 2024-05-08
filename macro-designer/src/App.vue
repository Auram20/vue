<template>
  <div id="app">
    <macro-toolbar @file-selected="handleFileSelected" />
    <macro-list :macros="macros" @edit-macro="handleEditMacro" />
    <!-- Render MacroForm.vue conditionally based on showMacroForm -->
    <macro-form v-if="showMacroForm" :macro="selectedMacro" @save="saveMacro" @close="closeMacroForm" />
  </div>
</template>

<script>
import MacroToolbar from './components/MacroToolbar.vue';
import MacroList from './components/MacroList.vue';
import MacroForm from './components/MacroForm.vue';

export default {
  name: 'App',
  components: {
    MacroToolbar,
    MacroList,
    MacroForm,
  },
  data() {
    return {
      macros: [], // Initialize macros array
      showMacroForm: false, // Control visibility of the macro form
      selectedMacro: null, // Store the selected macro for editing
    };
  },
  methods: {
    handleFileSelected(xmlContent) {
      // Parse XML content and update macros array
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      const macroElements = xmlDoc.getElementsByTagName('macro');
      const macros = [];
      for (let i = 0; i < macroElements.length; i++) {
        const macroElement = macroElements[i];
        const name = macroElement.getAttribute('name');
        const envElements = macroElement.getElementsByTagName('env')[0].children;
        const env = {};
        for (let j = 0; j < envElements.length; j++) {
          const key = envElements[j].tagName;
          const value = envElements[j].textContent;
          env[key] = value;
        }
        macros.push({ name, env });
      }
      this.macros = macros; // Update macros array
    },
    openMacroForm(macro) {
      // Set the selectedMacro and showMacroForm to open the MacroForm
      this.selectedMacro = macro;
      this.showMacroForm = true;
    },
    saveMacro() {
      // Handle saving the edited macro
      // Code for saving the edited macro...
      // After saving, close the MacroForm
      this.showMacroForm = false;
    },
    closeMacroForm() {
      // Close the MacroForm
      this.showMacroForm = false;
    },
    handleEditMacro(macro) {
      // Handle the edit-macro event received from the MacroList component
      // Set the selectedMacro and showMacroForm to open the MacroForm
      this.selectedMacro = macro;
      this.showMacroForm = true;
    }
  }
};
</script>

<style>
/* Add global styles if needed */
body {
  background-color: #1c1d1f;
}
</style>
