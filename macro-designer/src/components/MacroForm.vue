<template>
  <div class="macro-form">
    <!-- Close Icon -->
    <img src="../assets/close.png" class="closeIcon" @click="closeForm">
    <!-- Macro Name Input -->
    <div>
      <label for="macroName">Description:</label>
      <input type="text" id="macroName" v-model="macroCopy.name" disabled>
    </div>

    <!-- Category of Command Dropdown -->
    <div>
      <label for="category">Category of Command:</label>
      <select v-model="selectedCategory" @change="updateTypeDropdown">
        <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
      </select>
    </div>

    <!-- Type of Command Dropdown -->
    <div v-if="macroCopy && macroCopy.env">
      <div>
        <label for="type">Type of Command:</label>
        <select v-model="macroCopy.env.commandType">
          <option v-for="type in commandTypes" :value="type" :key="type">{{ type }}</option>
        </select>
      </div>
    </div>

    <!-- Additional Fields based on Type of Command -->
    <div v-if="macroCopy && macroCopy.env">
      <div v-if="macroCopy.env.commandType === 'scene'">
        <!-- Select Scene Button -->
        <button @click="selectScene">Select Scene</button>
      </div>
      <div v-if="macroCopy.env.commandType === 'preset'">
        <!-- Select Scene and Director Buttons -->
        <button @click="selectScene">Select Scene</button>
        <button @click="selectDirector">Select Director</button>
      </div>
      <div v-if="macroCopy.env.commandType === 'clear'">
        <!-- Layer Dropdown -->
        <label for="layer">Layer:</label>
        <select v-model="macroCopy.env.layer">
          <option value="Back">Back</option>
          <option value="Front">Front</option>
          <option value="Main">Main</option>
        </select>
      </div>
    </div>

    <!-- Multi-text Input for Entire <macro></macro> Element -->
    <div>
      <label for="macroXml">Macro XML:</label>
      <textarea id="macroXml" v-model="macroXml" rows="10"></textarea>
    </div>

    <!-- Save Button -->
    <button @click="saveChanges">Save Changes</button>
  </div>
</template>

<script>
export default {
  name: 'MacroForm',
  props: {
    macro: Object, // Pass macro object as prop for editing
  },
  data() {
    return {
      selectedCategory: '',
      categories: ['ENGINE', 'MSE', 'MSE VDCP', 'MULTIPLAY', 'ARC', 'MOSART'],
      commandTypes: [],
      macroCopy: {}, // Use a copy of the macro prop for modifications
      macroXml: '', // Store the entire macro XML for editing
    };
  },
  mounted() {
    this.initializeForm();
  },
  watch: {
    macro: {
      immediate: true,
      handler() {
        this.initializeForm();
      },
    },
  },
  methods: {
    initializeForm() {
      if (this.macro && this.macro.name) {
        if (this.macro.name.includes('CLEANUPENGINE')) {
          this.selectedCategory = 'ENGINE';
          this.commandTypes = ['cleanup'];
        } else if (this.macro.name.includes('SEND_VIZ_COMMANDS_')) {
          this.selectedCategory = 'ENGINE';
          this.commandTypes = ['commands'];
        } else {
          // Set default values
          this.selectedCategory = ''; // You can set a default category here if needed
          this.commandTypes = [];
        }
      } else {
        // Set default values or handle the case where macro is undefined
        this.selectedCategory = ''; // You can set a default category here if needed
        this.commandTypes = [];
      }

      // Create a copy of the macro prop
      this.macroCopy = { ...this.macro };
      // Generate the XML representation of the macro for editing
      this.macroXml = this.getMacroXml();
    },
    updateTypeDropdown() {
      // Update commandTypes based on selectedCategory
      switch (this.selectedCategory) {
        case 'ENGINE':
          this.commandTypes = ['scene', 'preset', 'clear', 'cleanup', 'commands'];
          break;
        case 'MSE':
        case 'MSE VDCP':
          this.commandTypes = ['Change VDOM', 'Execute Action'];
          break;
        case 'ARC':
        case 'MULTIPLAY':
        case 'MOSART':
          this.commandTypes = ['http request'];
          break;
        default:
          this.commandTypes = [];
      }
    },
    getCategory(commandType) {
      // Return category based on commandType
      if (commandType === 'scene' || commandType === 'preset' || commandType === 'clear' || commandType === 'cleanup' || commandType === 'commands') {
        return 'ENGINE';
      } else if (commandType === 'Change VDOM' || commandType === 'Execute Action') {
        return 'MSE';
      } else {
        return '';
      }
    },
    getMacroXml() {
      // Generate the XML representation of the macro for editing
      let xml = '<macro name="' + this.macro.name + '">';
      xml += '<env>';
      for (const key in this.macro.env) {
        xml += '<viz>' + key + ' ' + this.macro.env[key] + '</viz>';
      }
      xml += '</env>';
      xml += '</macro>';
      return xml;
    },
    selectScene() {
      // Implement select scene functionality
      console.log('Select Scene');
    },
    selectDirector() {
      // Implement select director functionality
      console.log('Select Director');
    },
    closeForm() {
      // Emit an event to notify the parent component about closing the form
      this.$emit('close');
    },
    saveChanges() {
      // Emit an event to notify the parent component about the edited macro
      this.$emit('save', this.macroCopy);
    }
  },
};
</script>

<style scoped>
.macro-form {
  position: fixed;
  top: 10%;
  left: 30%;
  width: 40%;
  height: 500px;
  padding: 40px;
  border-radius: 25px;
  background-color: hsl(0, 0%, 19%);
  color: white;
}

.closeIcon {
  float: right;
  width: 40px;
  cursor: pointer;
}
</style>
