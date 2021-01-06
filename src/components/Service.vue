<template>
  <v-card
    class="rounded-xl pa-5 ma-5"
    min-width="400px"
    width="40%"
    max-width="650px"
  >
    <v-layout column>
      <v-row class="d-flex flex-wrap justify-space-between">
        <v-col cols="1" sm="1">
          <i
            :class="[logo_brand, logo_size, logo_icon]"
            :style="{ color: importantColor }"
          ></i>
        </v-col>
        <v-col cols="6" sm="6" class="name article">{{ title }}</v-col>
        <v-col cols="1" sm="2">
          <v-avatar>
            <img :src="`${publicPath}blank_avatar.png`" alt="avatar" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row class="article d-flex flex-wrap">
        <v-col class="text" v-for="val in data" :key="val.label">
          <div v-if="val.enabled" style="min-width: 100px;">
            <p class="label">{{ val.label }}</p>
            <p
              :style="val.important ? { color: importantColor } : ''"
              class="detail"
            >
              {{ val.detail }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// @ts-ignore
// import blankAvatar from "@/assets/blank_avatar.png";

@Component
export default class Service extends Vue {
  @Prop({ default: "Service", required: true })
  private title!: string;

  @Prop({ default: "lab", required: false })
  private logo_brand!: string;
  @Prop({ default: "la-3x", required: false })
  private logo_size!: string;
  @Prop({ default: "la-windows", required: true })
  private logo_icon!: string;
  @Prop({ default: "#1db954", required: false })
  private importantColor!: string;

  @Prop({ required: true })
  private data!: Record<string, any>[];

  @Prop({ required: false })
  private avatar!: string;

  private publicPath = process.env.BASE_URL;
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.name {
  font-size: 1.7rem;
  align-self: center;
  justify-self: left;
}

.article {
  font-weight: bold;
}

.service {
  max-width: 800px;
}

.text {
  // padding: 0 25px 25px 25px;
  .label {
    color: var(--v-accent-lighten5);
    font-size: 0.8rem;
    margin: 0;
    font-weight: normal;
  }
  .detail {
    margin: 0;
    font-size: 1.1rem;
  }
}

.services {
  display: grid;
  background-color: var(--v-primary-base);
  border-radius: 25px;
  grid-template-rows: 130px 1fr;
  grid-template-columns: 92px 328px 130px;
  grid-template-areas:
    "logo name avatar"
    "container container container";
  color: var(--v-accent-lighten2);
  font-weight: bold;
  margin: 20px;

  &__logo,
  &__name,
  &__avatar {
    align-self: center;
    justify-self: center;
  }

  &__logo {
    grid-area: logo;
    color: $important;
  }
  &__name {
    grid-area: name;
    font-size: 1.7rem;
    justify-self: left;
  }
  &__avatar {
    grid-area: avatar;
  }
  &__container {
    grid-area: container;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
