<template>
  <div>
    <b-container>
      <div class="hero-header">
        <img class="logo" src="~@/assets/images/nhs_logo_light.png" alt />
        <vue-particles
          color="#dedede"
          :particleOpacity="0.7"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="1"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        ></vue-particles>
      </div>
      <div class="centered" v-if="this.$store.state.isLoggedIn">
        <h2 class="text-light">Welcome, {{ this.$store.state.user.name }}</h2>
        <b-button variant="primary" to="/tutoring/edit">Edit Tutoring</b-button>
        <b-button variant="success" to="/logging/tutor">Log Tutoring</b-button>
        <b-button variant="info" to="/logging/commserve"
          >Log Community Service</b-button
        >
        <!-- <div class="stats text-light">
          <h5>Tutoring: 90 hours to do!</h5>
          <h5>Community Service: 10 hours internal, 20 external to go!</h5>
        </div> -->
      </div>
      <div class="centered" v-else>
        <h2 class="text-light">Welcome!</h2>
        <b-button variant="primary" to="/login">Log In</b-button>
        <b-button variant="success" to="/tutoring/get">Get Tutored</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        loggedIn: false,
        name: null,
      };
    },
    methods: {
      async mounted() {
        try {
          this.loggedIn = this.$store.state.isLoggedIn;
          this.name = this.$store.state.user.data.name;
          console.log(this.name);
        } catch (err) {
          alert(err);
        }
      },
    },
  };
</script>

<style lang="scss">
  .hero-header {
    margin-top: 60px;
    width: 100%;
    height: 55vh;
    overflow: hidden;
    position: relative;
  }
  .hero-header .logo {
    height: 100%;
    position: absolute;
    // bottom: -60%;
    left: 50%;
    transform: translateX(-50%);
  }
  .stats {
    padding-top: 10px;
  }
</style>
