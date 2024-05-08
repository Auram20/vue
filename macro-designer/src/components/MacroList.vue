<template>
    <div class="macro-cards">
      <!-- Render macro cards -->
      <div v-for="(macro, index) in macros" :key="index" class="macro-card">
        <h3>{{ macro.name }}</h3>
        <ul>
          <li v-for="(envValue, envKey) in macro.env" :key="envKey">{{ envKey }}: {{ envValue }}</li>
        </ul>
        <button @click="editMacro(index)">Edit</button>
      </div>
  
      <!-- Render new macro card if showNewMacroCard is true -->
      <NewMacroCard v-if="showNewMacroCard" @save="saveNewMacro" />
      
      <button @click="addNewMacro" class="addButton">Add new macro</button>
    </div>
  </template>
  
  <script>
  import NewMacroCard from './NewMacroCard.vue';
  
  export default {
    name: 'MacroList',
    props: {
      macros: Array // Receive parsed macros as a prop
    },
    components: {
      NewMacroCard
    },
    data() {
      return {
        // Flag to show/hide new macro card
        showNewMacroCard: false
      };
    },
    methods: {
      addNewMacro() {
        // Show the new macro card
        this.showNewMacroCard = true;
      },
  
      saveNewMacro(newMacro) {
        // Emit an event to notify the parent component about the new macro
        this.$emit('macro-added', newMacro);
        // Hide the new macro card
        this.showNewMacroCard = false;
      },
  
      editMacro(macro) {
      // Emit an event to notify the parent component that the edit button is clicked
      console.log("CLICKED")
      this.$emit('edit-macro', macro);
    }
    }
  };
  </script>
  
  <style scoped>
  .macro-cards {
    display: flex;
    flex-wrap: wrap;
  }
  
  .macro-card {
    background-color: #5a5a5a;
    color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    width: 320px;
    height: 150px;
    margin: 10px;
    overflow: auto;
  }
  
  .macro-card h3 {
    margin-bottom: 10px;
    overflow-wrap: break-word;
  }
  
  .macro-card ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .macro-card li {
    margin-bottom: 5px;
    word-wrap: break-word;
  }
  
  button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  .addButton{
    background-color: #77cc86;
    height: 80%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  