  <template>
    <div class="macro-card">
      <h3>{{ macro.name }}</h3>
      <ul>
        <li v-for="(envValue, envKey) in macro.env" :key="envKey">{{ envKey }}: {{ envValue }}</li>
      </ul>
      <button @click="editMacro">Edit</button>
    </div>
  </template>

  <script>
  export default {
    name: 'MacroCard',
    props: {
      macro: Object
    },
    methods: {
    }
  };
  </script>

  <style scoped>
  /* Add styling for the macro card */
  </style>
