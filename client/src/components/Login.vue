<template>
  <div>
    <b-container class="text-light">
      <b-form @submit="login">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="firlas99@bergen.org"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Password:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.password"
            type="password"
            required
            placeholder="password"
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
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          username: this.form.email,
          password: this.form.password
        });
        this.$store.dispatch("setUser", response);
      } catch (error) {
        this.error = error.response.error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
}
</style>
