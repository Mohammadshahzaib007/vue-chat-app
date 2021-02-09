<template>
  <v-app>
    <section style="height: 100vh; width: 100%" class="d-flex align-center justify-center">
      <!-- Login Form -->
      <v-card max-width="21.875rem">
        <h1 class="font-weight-bold">Login to Vue Chat App</h1>
        <v-form>
          <v-text-field
            v-model="firstname"
            :rules="[v => !!v || 'Name is required']"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-form>
      </v-card>
    </section>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
