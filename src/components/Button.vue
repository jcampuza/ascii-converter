<template>
  <button class="button" v-bind="$attrs" @click="onClick"><slot></slot></button>
</template>


<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component({})
export default class Button extends Vue {
  @Emit('click')
  onClick() {}
}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  height: 2rem;
  min-width: 4rem;
  padding: 0 1rem;
}
</style>
