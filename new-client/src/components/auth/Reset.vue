<template>
  <div>
    <b-container class="text-light vert-center">
      <h1>Reset password</h1>
      <hr />
      <b-form @submit.prevent class="vert-form">
        <b-form-group
          id="input-group-1"
          label="New Password:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.password"
            type="password"
            required
            placeholder="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" @click="reset">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import AuthenticationService from "@/services/AuthenticationService";
  export default {
    name: "reset",
    data() {
      return {
        form: {
          password: "",
        },
        failed: false,
      };
    },
    methods: {
      reset() {
        const response = AuthenticationService.reset({
          token: this.$route.params.token,
          password: this.form.password,
        })
          .then(response => {
            this.$store.dispatch("setUser", response.data);
            this.$root.$bvToast.toast(
              response.data.user.name + "'s password has been reset!",
              {
                title: "Password reset",
                autoHideDelay: 5000,
                variant: "success",
              },
            );
            this.$router.push("/");
          })
          .catch(error => {
            this.$bvToast.toast(error.response.data.msg, {
              title: "Reset Failed",
              autoHideDelay: 5000,
              variant: "danger",
            });
          });
      },
    },
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
