<template>
    <div class="card">
      <!-- Take Scene button -->
      <button @click="takeScene(selectedSceneId)">Take</button>
      
      <!-- Continue Scene button -->
      <button @click="continueScene">Continue</button>
      
      <!-- Take Out Scene button -->
      <button @click="takeoutScene">Take Out</button>
      
      <!-- Clean Renderer button -->
      <button @click="cleanRenderer">Clean All</button>
    </div>
  </template>
  
  <script>
  export default {
  props: ['sendTCPCommand', 'selectedSceneId'],
    methods: {
      
    takeScene(sceneId){   
      this.sendTCPCommand(`RENDERER*UPDATE SET 0`);
      this.sendTCPCommand(`<${sceneId}> CUE`);
      this.sendTCPCommand(`RENDERER*MAIN_LAYER SET_OBJECT <${sceneId}>` );
      this.sendTCPCommand(`RENDERER*STAGE START`);
      this.sendTCPCommand(`RENDERER*UPDATE SET 1`);
    },

    continueScene(){   
      this.sendTCPCommand(`RENDERER*STAGE CONTINUE`);
    },
    
    takeoutScene(){   
      this.sendTCPCommand(`RENDERER*UPDATE SET 0`);
      this.sendTCPCommand(`RENDERER*MAIN_LAYER SET_OBJECT` );
      this.sendTCPCommand(`RENDERER*UPDATE SET 1`);
    },

    cleanRenderer() {
      console.log("CLEAN UP")
      // Define an array of cleanup commands
      const cleanupCommands = [
        'RENDERER*FRONT_LAYER SET_OBJECT',
        'RENDERER*MAIN_LAYER SET_OBJECT',
        'RENDERER*BACK_LAYER SET_OBJECT',
        'SCENE CLEANUP',
        'GEOM CLEANUP',
        'IMAGE CLEANUP',
        'FONT CLEANUP',
        'MATERIAL CLEANUP',
        'MAPS CACHE CLEANUP'
        // Add more commands as needed
      ];

      // Iterate through the cleanup commands and send them one by one
      cleanupCommands.forEach(command => {
        this.sendTCPCommand(command);
      });
    },
    }
  };
  </script>
  

  <style scoped>
  
  </style>