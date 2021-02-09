<template>
  <v-app>
    <section
      style="height: 100vh; width: 100%"
      class="d-flex align-center justify-center"
    >
      <!-- Login Form -->
      <v-card
        max-width="21.875rem"
        class="px-7 py-10"
        elevation="5"
        v-if="state.userName === '' || this.$refs.form.lazyValue === null"
      >
        <h1
          class="font-weight-bold text-center font-weight-regular text-uppercase mb-8"
        >
          Login to Vue Chat App
        </h1>
        <v-form @submit.prevent="logIn">
          <v-text-field
            ref="form"
            dense
            outlined
            :rules="[(v) => !!v || 'Name is required']"
            class="mb-2"
            label="Your Name"
            required
          ></v-text-field>
          <v-btn type="submite" block color="primary">
            Log In
          </v-btn>
        </v-form>
      </v-card>

      <!-- Chat Box -->
      <v-card width="25rem" height="100%" class="d-flex flex-column" v-else>
        <v-sheet
          color="rgba(225, 225, 225, .9)"
          height="5rem"
          class="d-flex justify-space-between align-center"
        >
          <h2 class="ml-4 font-weight-light" style="font-size: 1.25rem">
            Welcome, {{ state.userName }}
          </h2>
          <v-btn class="mr-4" color="primary" rounded @click="logOut"
            >Logout</v-btn
          >
        </v-sheet>
        <v-sheet
          color="transparent"
          style="flex-grow: 1;"
          class="d-flex flex-column px-5"
        >
          <div
            v-for="msg in state.message"
            :key="msg.id"
            :class="
              state.userName === msg.userName
                ? 'd-flex align-end flex-column mb-5 mt-5'
                : 'd-flex align-start flex-column mb-5 mt-5'
            "
          >
            <v-sheet
              min-width="80px"
              style="border-radius: 50px"
              color="primary"
              :class="
                state.userName === msg.userName
                  ? 'py-3 px-3 align-self-end'
                  : 'py-3 px-3 align-self-start'
              "
            >
              <p style="color: white" class="px-0 py-0 mx-0 my-0">
                {{ msg.content }}
              </p>
            </v-sheet>
            <p
              class="captions px-0 py-0 mb-0 mt-2 text-right text-uppercase"
              style="color: #888; font-size: 14px"
            >
              from {{ msg.userName }}
            </p>
          </div>
        </v-sheet>
        <v-sheet
          style="border-top: 1px solid black"
          color=""
          height="5rem"
          class="mt-auto d-flex align-center justify-center px-2 py-2"
        >
          <v-form
            @submit.prevent="sendMsg"
            class=" d-flex px-0 py-0"
            style="width: 100%"
          >
            <v-text-field
              dense
              ref="inputMsg"
              v-model="state.enteredMsg"
              solo
              hide-details=""
              class="mb-2 px-0 py-0 mx-0 my-0 ml-4"
              placeholder="Type message here"
            ></v-text-field>
            <v-btn rounded type="submite" color="primary" class="ml-4 mr-4">
              send
            </v-btn>
          </v-form>
        </v-sheet>
      </v-card>
    </section>
  </v-app>
</template>

<script>
import db from "./db.js";

export default {
  name: "App",
  data() {
    return {
      state: {
        userName: "",
        message: [],
        enteredMsg: "",
      },
    };
  },

  methods: {
    logIn() {
      if (this.$refs.form.validate()) {
        this.state.userName = this.$refs.form.lazyValue;
        console.log(this.$refs.form.lazyValue);
      }
    },
    logOut() {
      this.state.userName = "";
    },
    sendMsg() {
      const msgRef = db.database().ref("messages");
      if (this.$refs.inputMsg.validate()) {
        const msg = {
          userName: this.state.userName,
          content: this.state.enteredMsg,
        };
        msgRef.push(msg);
        this.state.enteredMsg = "";
        this.$refs.inputMsg.value = "";
        console.log( this.$refs.inputMsg)
      }
    },
  },

  mounted() {
    const msgRef = db.database().ref("messages");

    msgRef.on("value", (snapshot) => {
      const data = snapshot.val();

      let messages = [];

      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          userName: data[key].userName,
          content: data[key].content,
        });
      });

      this.state.message = messages;
      console.log(this.state.message);
    });
  },

  watch: {
    state() {},
  },
};
</script>
