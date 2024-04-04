<template>
  <div class="card">
    <form @submit.prevent="submitForm">
      <div class="container">Manual Data 
        <label class="switch" for="checkbox">
          <input type="checkbox" id="checkbox" v-model="automaticMode" >
          <div class="slider round"></div> 
        </label>Automatic Data
      </div>
      <div v-if="!automaticMode">
        <!-- Only show if manual mode is selected -->
        <button @click="saveControlParameters">Update Manually</button>
      


      <div  v-for="(value, key) in controlParameters" :key="key">
        <label>{{ key }}</label>
        <input type="text" v-model="controlParameters[key]">
      </div>
    </div>
    </form>
  </div>
</template>

<script>

import axios from 'axios';
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
      controlParameters: {}, // Store control parameter values
      automaticMode: false // Initialize automatic mode as false
    };
  },
  methods: {
    fetchControlParameters(sceneId) {
      // Fetch control parameter values for the scene
      fetch(`http://localhost:61000/api/v1/scene/${sceneId}/fields`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch control parameter values');
          }
          return response.json();
        })
        .then(data => {
          // Update the controlParameters data property with fetched values
          this.controlParameters = data;

          // Emit an event to notify the parent component that control parameters have been updated
          this.$emit('controlParametersUpdated', this.controlParameters);
        })
        .catch(error => {
          console.error('Error fetching control parameter values:', error);
        });
    },

    startFetchingRankingData() {
    // Check if the currently selected scene is the one that activates JSON data fetching
    if (this.sceneId === '595AF356-0E8C-6248-B96F-55B773125CDC' && this.automaticMode) {
      console.log("START FETCHING RANKING DATA")
      // Set up interval to fetch JSON data every second
      this.fetchDataInterval = setInterval(() => {console.log("INTERVAL")
        axios.get('https://api.npoint.io/83d2b8c905d565953548')
          .then(response => {
            // Store fetched data in a variable
            this.swimmerData = response.data;
            console.log('Swimmer data updated:', this.swimmerData);
            this.controlParameters = response.data;
            // Call a method to update control parameters based on fetched data
            this.updateRanking();
          })
          .catch(error => {
            console.error('Error fetching swimmer data:', error);
          });
      }, 1000); // Fetch data every second
    }
  },

  
  updateRanking() {
    // Construct payload to update control parameters
    const payload = {};
    this.swimmerData.forEach((swimmer, index) => {
    const flagKey = `${index + 1}.Flag`;
    const nameKey = `${index + 1}.Name`;
    const timeKey = `${index + 1}.Time`;
    
    payload[flagKey] = swimmer.country;
    payload[nameKey] = swimmer.swimmer_name;
    payload[timeKey] = swimmer.time;

    if (parseFloat(swimmer.time) < parseFloat('0:44.00')) {
      // Send TCP command if the condition is met
      console.log("NEW RECORD")
      this.sendTCPCommand('RENDERER*STAGE*DIRECTOR*RECORD START');
    }
  });

  // Make the PUT request to update control parameters
    axios.put(`http://localhost:61000/api/v1/scene/${this.sceneId}/fields`, payload)
    .then(response => {
      console.log('Control parameters updated successfully:', response.data);
      // Set controlParametersLoaded to true
      this.controlParametersLoaded = true;
    })
    .catch(error => {
      console.error('Error updating control parameters:', error);
    });
},

  // Function to stop fetching JSON data when scene is deactivated
  stopFetchingRankingData() {
    clearInterval(this.fetchDataInterval);
  },
    submitForm() {
      // Send PUT request to update control parameters
      fetch(`http://localhost:61000/api/v1/scene/${this.sceneId}/fields`, {
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
  },
  watch: {
    automaticMode(newValue) {
      if (newValue) {
        // If automatic mode is enabled, start fetching data
        this.startFetchingRankingData();
      } else {
        // If automatic mode is disabled, stop fetching data
        this.stopFetchingRankingData();
      }
    }
  }
};
</script>


<style scoped>
input {
  padding: 6px 12px;
  background: rgb(31, 32, 35);
  border: 1px solid rgb(60, 63, 68);
  border-radius: 4px;
  font-size: 13px;
  color: rgb(247, 248, 248);
  height: 25px;
  appearance: none;
  transition: border 0.15s ease 0s;

  :focus {
    outline: none;
    box-shadow: none;
    border-color: rgb(100, 153, 255);
  }
}

.switch {
  display: inline-block;
  height: 25px;
  position: relative;
  width: 40px;
}

.switch input {
  display: none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 4px;
  content: "";
  height: 12px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 12px;
}

input:checked+.slider {
  background-color: #66bb6a;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Add more styles as needed */
</style>