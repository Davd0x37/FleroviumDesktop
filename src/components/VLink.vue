<template>
  <router-link class="link" :to="href">
    <i :class="[spec, size, icon]"></i>
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class VLink extends Vue {
  @Prop({ default: "las", required: false })
  private spec!: string;

  @Prop({ default: "la-lg", required: false })
  private size!: string;

  @Prop({ default: "la-id-card", required: false })
  private icon!: string;

  @Prop({ required: true })
  private href!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.router-link-exact-active {
  color: $important !important;

  &::before {
    content: " ";
    background-color: $important;
    width: 5px;
    height: 25px;
    position: absolute;
    border-radius: 3px;
  }
}

.link {
  text-decoration: none;
  padding: 15px 0 15px 0;
  font-weight: bold;
  color: $primary_inactive;

  .las {
    padding-left: 50px;
    padding-right: 20px;
  }
}
</style>
