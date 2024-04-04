<template>
  <div class="new-macro-card">
    <input v-model="title" type="text" placeholder="Title">
    <input v-model="description" type="text" placeholder="Description">
    <button @click="saveMacro">Save</button>
  </div>
</template>

<script>
export default {
  name: 'NewMacroCard',
  data() {
    return {
      title: '',
      description: ''
    };
  },
  methods: {
    saveMacro() {
      if (this.title && this.description) {
        const newMacro = {
          name: this.title,
          env: {
            description: this.description
          }
        };
        this.$emit('save', newMacro);
      }
    }
  }
};
</script>

<style scoped>
.new-macro-card {
  background-color: #5a5a5a; /* Set background color to dark gray */
  color: #ffffff; /* Set text color to white */
  padding: 20px;
  border-radius: 8px;
  width: 320px;
  height: auto;
  overflow: auto; /* Allow content overflow to be scrollable */
}

.new-macro-card input {
  width: 80%;
  margin-bottom: 10px;
  padding: 8px;
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
