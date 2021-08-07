<template>
  <v-app>
      <v-spacer></v-spacer>
      <v-card style="margin-top: 10px">
          <v-img
                  :src="require('../assets/timg.jpg')"
                  height="800"
                  class="grey darken-4"
          ></v-img>
      </v-card>

  </v-app>


</template>

<script>

export default {
  name: 'Index',
  data: () => ({
    //
  }),
};
</script>
