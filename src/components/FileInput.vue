<template>
  <span class="FileInput">
    <input type="file" hidden @change="onFileChanged" ref="input">

    <component :is="component" @click="onClick">
      <template v-if="file">{{file.name}}</template>
      <slot v-else>Choose a File</slot>
    </component>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator';
import Button from '@/components/Button.vue';

@Component({ components: { Button } })
export default class FileInput extends Vue {
  $refs!: {
    input: HTMLInputElement;
  };

  @Prop({ default: 'button' })
  type!: string;

  @Model('change', { type: File })
  file!: File | null;

  get component() {
    if (this.type === 'button') return Button;
    else return 'span';
  }

  onClick() {
    this.$refs.input.click();
  }

  onFileChanged(e: Event) {
    const files = (<HTMLInputElement>e.target).files;
    if (!files) return;

    this.$emit('change', files[0], e);
  }
}
</script>

<style lang="scss" scoped>
.FileInput {
  display: inline-block;
}
</style>

