<template>
  <div id="app">
    <macro-toolbar @file-selected="handleFileSelected" />
    <macro-list :macros="macros" />
  </div>
</template>

<script>
import MacroToolbar from './components/MacroToolbar.vue';
import MacroList from './components/MacroList.vue';

export default {
  name: 'App',
  components: {
    MacroToolbar,
    MacroList,
  },
  data() {
    return {
      macros: [], // Initialize macros array
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
