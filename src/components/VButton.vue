<template>
  <button
    :class="['box', clickable ? 'clickable' : '']"
    :style="{ backgroundColor }"
    v-on="$listeners"
  >
    <i :class="[spec, size, icon, color]"></i>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class VButton extends Vue {
  @Prop({ default: "las", required: false })
  private spec!: string;

  @Prop({ required: false })
  private backgroundColor!: string;

  @Prop({ default: "la-lg", required: false })
  private size!: string;

  @Prop({ default: "la-sync", required: false })
  private icon!: string;

  @Prop({ default: "gray", required: false })
  private color!: string;

  @Prop({ default: true, required: false })
  private clickable!: boolean;
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.clickable {
  background: var(--v-secondary-base);
  border: 1px solid var(--v-secondary-darken1);
  border-radius: 4px;
  padding: 10px;
}

.box {
  text-transform: uppercase;
  color: $important;
  font-weight: bold;
  padding-right: 25px;
  padding-left: 25px;
}

.gray {
  color: var(--v-accent-lighten5);
}
</style>
