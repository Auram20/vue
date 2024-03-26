<template>
  <div>
    <form @submit.prevent="submitForm">
      <div v-for="(value, key) in controlParameters" :key="key">
        <label>{{ key }}</label>
        <input type="text" v-model="controlParameters[key]">
      </div> 
      <button v-if="showSaveButton" @click="saveControlParameters">Update</button>
 
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sceneId: {
      type: String,
      required: true
    },
    showSaveButton: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      controlParameters: {} // Store control parameter values
    };
  },
  methods: {
    fetchControlParameters(sceneId) {
      // Fetch control parameter values for the scene
      fetch(`http://192.168.1.166:61000/api/v1/scene/${sceneId}/fields`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch control parameter values');
          }
          return response.json();
        })
        .then(data => {
          // Set controlParameters data property with fetched values
          this.controlParameters = data;
        })
        .catch(error => {
          console.error('Error fetching control parameter values:', error);
        });
    },
    submitForm() {
      // Send PUT request to update control parameters
      fetch(`http://192.168.1.166:61000/api/v1/scene/${this.sceneId}/fields`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.controlParameters)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update control parameter values');
        }
        console.log('Control parameter values updated successfully');
      })
      .catch(error => {
        console.error('Error updating control parameter values:', error);
      });
    }
  },
  mounted() {
    // Fetch control parameters for the scene when the component is mounted
    this.fetchControlParameters(this.sceneId);
  }
};
</script>


<style scoped>
  .control-form {
    background-color: #4D5154; /* Black with 80% opacity */
    color: #D0D0D1;
    padding: 20px;
    border-radius: 10px;
  }

  /* Add more styles as needed */
</style>