<template>
  <v-snackbar v-model="show" :color="color" multi-line right top>
    {{ message }}
    <v-btn text @click="show = false">{{ $t("close") }}</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showMessage") {
        this.message = state.snackbarContent;
        this.color = state.snackbarColor;
        this.show = true;
      }
    });
  },
};
</script>
