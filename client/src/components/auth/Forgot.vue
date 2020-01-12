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

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "forgot",
  data() {
    return {
      form: {
        email: ""
      },
      failed: false
    };
  },
  methods: {
    login() {
      const response = AuthenticationService.forgot({
        username: this.form.email
      })
        .then(response => {
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
