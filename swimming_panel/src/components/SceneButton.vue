// SceneButton.vue
<template>
  <button @click="loadScene">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: ['name', 'id'],
  methods: {
    loadScene() {
      this.$emit('loadScene', this.id);
    }
  }
}
</script>
