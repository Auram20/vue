<template>
  <div class="macro-toolbar">
    <div class="toolbar-left">
      <span>File: {{ fileName }}</span>
    </div>
    <div class="toolbar-right">
      <input type="file" @change="handleFileSelect" />
      <button @click="saveFile">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MacroToolbar',
  data() {
    return {
      fileName: 'No file selected' // Default file name
    };
  },
  methods: {
    handleFileSelect(event) {
      // Handle file select action
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
          const xmlContent = reader.result;
          this.$emit('file-selected', xmlContent); // Emit event with XML content
        };
        reader.readAsText(file);
      }
    },
    saveFile() {
      if (this.xmlContent) {
        const blob = new Blob([this.xmlContent], { type: 'text/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Release the object URL resources
        document.body.removeChild(a); // Remove the link from the DOM
      } else {
        // Handle case where no file is selected
        console.error('No file content to save.');
      }
    }
  }
};
</script>

<style scoped>
.macro-toolbar {
  background-color: #292b2d;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-left,
.toolbar-right {
  color: #ffffff;
}

button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
