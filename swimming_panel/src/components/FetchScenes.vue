<template>
  <div>
    <!-- Scene buttons -->
    <button v-for="scene in scenes" :key="scene.id" @click="loadScene(scene.id)">
      {{ scene.name }}
    </button>

    <!-- Scene control form -->
    <SceneControlForm v-if="controlParametersLoaded" :sceneId="selectedSceneId" :showSaveButton="saveButtonVisible" />

    <!-- Display loading indicator while fetching control parameters -->
    <div v-if="!controlParametersLoaded">Loading control parameters...</div>

    <ControlButtons :sendTCPCommand="sendTCPCommand" :selectedSceneId="selectedSceneId"/> <!-- Pass the method as a prop -->
 </div>
</template>

<script>
import SceneControlForm from './SceneControlForm.vue';
import ControlButtons from './ControlButtons.vue';

export default {
  components: {
    SceneControlForm,
    ControlButtons
  },
  data() {
    return {
      scenes: [],
      selectedSceneId: null,
      controlParametersLoaded: true,
      saveButtonVisible: false // Set to true initially
    };
  },

  methods: {
    fetchScenes() {
      fetch('http://192.168.1.166:19398/files/0C0C2C50-0B0D-B54F-890EDF9B04FE063B', {
        headers: {
          'Authorization': 'Basic ' + btoa('Admin:VizDb') // Add authentication headers
        }
      })
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, 'application/xml');
          const entries = xml.querySelectorAll('entry');
          const scenes = [];
          entries.forEach(entry => {
            const id = entry.querySelector('id').textContent.replace('urn:uuid:', ''); // Remove the "urn:uuid:" prefix
            const title = entry.querySelector('title').textContent;
            scenes.push({ id, name: title });
          });
          this.scenes = scenes;
        })
        .catch(error => {
          console.error('Error fetching scenes:', error);
        });
    },

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
          this.controlParametersLoaded = true;
        })
        .catch(error => {
          console.error('Error fetching control parameter values:', error);
        });
    },

    loadScene(sceneId) {
      // Reset controlParametersLoaded flag
      this.controlParametersLoaded = false;
      // Fetch control parameters for the scene
      this.fetchControlParameters(sceneId);
      // Set selected scene id
      this.selectedSceneId = sceneId;
      // Show save button
      this.saveButtonVisible = true;

      
      //this.sendTCPCommand(`<${sceneId}> LOAD`);
    },



    sendTCPCommand(command) {
  const socket = new WebSocket('ws://192.168.1.166:6900');
  socket.addEventListener('open', function () {
    socket.send(command);
  });

  // Add error handling
  socket.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
  });

  // Add close event handling
  socket.addEventListener('close', function () {
    console.log('WebSocket connection closed');
  });
}
  },
  mounted() {
    // Fetch scenes when the component is mounted
    this.fetchScenes();
  }
};
</script>
