<template>
  <div id="app" class="">
    <section class="sidebar pa-3">
      <FileInput v-model="file">Choose A File</FileInput>

      <div v-if="fileHistory.length">
        <ul class="fileList">
          <li v-for="(item, idx) of fileHistory" :key="idx" class="truncate" @click="fileSelected(item)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="main pa-3">
      <div v-if="asciiText">
        <font>
          <pre>{{asciiText}}</pre>
        </font>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FileInput from '@/components/FileInput.vue';
import { convertToAscii } from '@/ascii';

@Component({ components: { FileInput } })
export default class App extends Vue {
  fileHistory: File[] = [];
  file: File | null = null;
  asciiText: String | null = null;

  get fileUrl() {
    if (!this.file) {
      return null;
    }

    return URL.createObjectURL(this.file);
  }

  @Watch('file')
  onFileChanged(file: File) {
    if (!file || this.fileHistory.includes(file)) return;

    this.fileHistory.push(file);
  }

  @Watch('fileUrl')
  async onFileUrlChanged(value: string) {
    if (!value) return;

    const ascii = await convertToAscii(value);
    this.asciiText = ascii;
  }

  fileSelected(file: File) {
    this.file = file;
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

font,
pre {
  line-height: 6px;
  font-size: 12px;
  font-family: monospace;
  color: #000000;
}

.sidebar {
  width: 250px;
  background-color: #a0e2d8;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.27);
}

.main {
  flex: 1;
}

.fileList {
  list-style: none;
  padding: 0;
}
</style>
