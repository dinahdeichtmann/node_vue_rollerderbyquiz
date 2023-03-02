<template>
  <v-container>
    <v-card elevation="1" max-width="500px" class="mx-auto">
      <v-carousel
        :continuous="false"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-square"
        height="300"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%" tile>
            <div class="d-flex fill-height justify-center align-center">
              {{ slide }}
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colors: ["grey", "pink", "blue"],
      slides: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis blanditiis beatae praesentium repudiandae sunt officiis, vero maxime officia obcaecati nisi excepturi. Sit laboriosam provident laborum? Rem recusandae ea possimus illo.",
        "slide",
        "slide",
      ],
    };
  },
};
</script>

<style scoped></style>
