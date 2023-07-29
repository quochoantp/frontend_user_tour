<template>
  <v-app style="width: 100%">
    <AppBar></AppBar>

    <div class="mt-16">
      <router-view></router-view>
    </div>

    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    AppBar: () => import("@/components/layout/appbar.vue"),
    Footer: () => import("@/components/layout/footer.vue"),
  },
  data: () => ({}),
};
</script>
