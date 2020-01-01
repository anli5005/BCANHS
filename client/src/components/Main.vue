<template>
  <div>
    <b-container>
      <div class="hero-header">
        <img class="logo" src="~@/assets/images/nhs_logo_light.png" alt="" />
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
        >
        </vue-particles>
      </div>
      <div class="centered">
        <h2 class="text-light">Welcome, NAME</h2>
        <b-button variant="primary">Edit Tutoring</b-button>
        <b-button variant="success">Log Tutoring</b-button>
        <b-button variant="info">Log Community Service</b-button>
        <div class="stats text-light">
          <h5>Tutoring: 90 hours to do!</h5>
          <h5>Community Service: 10 hours internal, 20 external to go!</h5>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "main",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.hero-header {
  margin-top: 60px;
  width: 100%;
  height: 60vh;
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
