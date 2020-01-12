<template>
  <div>
    <b-container class="text-light vert-center">
      <b-form @submit="login" class="vert-form">
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="firlas99@bergen.org"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button to="forgot" variant="warning">Forgot Password</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      failed: false
    };
  },
  methods: {
    login() {
      const response = AuthenticationService.login({
        username: this.form.email,
        password: this.form.password
      })
        .then(response => {
          this.$store.dispatch("setUser", response.data);
          this.$root.$bvToast.toast(`Welcome,`, {
            title: "Welcome!",
            autoHideDelay: 5000,
            variant: "success"
          });
          this.$router.push("/");
        })
        .catch(error => {
          this.$bvToast.toast(error.response.data.msg, {
            title: "Login Failed",
            autoHideDelay: 5000,
            variant: "danger"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.vert-center {
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;

  .vert-form {
    min-width: 100%;
  }
}
</style>
