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
        <h2 class="text-light">Welcome, {{ name }}</h2>
        <b-button variant="primary" to="/tutoring/edit">Edit Tutoring</b-button>
        <b-button variant="success" to="/logging/tutor">Log Tutoring</b-button>
        <b-button variant="info" to="/logging/commserve">Log Community Service</b-button>

        <Stats :tutoring="tutoring" :internal="internal" :external="external" />

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
  import Stats from '@/components/Stats.vue';
  import axios from 'axios';

  export default {
    name: "home",
    components: {
      Stats,
    },
    data() {
      return {
        loggedIn: false,
        name: null,
        tutoring: 0,
        internal: 0,
        external: 0,
      };
    },
    async mounted() {
      try {
        this.isLoggedIn = this.$store.state.isLoggedIn

        if (this.isLoggedIn) {
          this.name = this.$store.state.user.name;
          this.email = this.$store.state.user.username;

          this.gradYear = parseInt(this.email.slice(-13, -11));
          if (this.gradYear == 20) {

            this.dataURL = 'https://spreadsheets.google.com/feeds/list/1c_UIyUgF5IPTzhpc7x3B7WfWlO4g_c2sV5_RC3-a1I8/1/public/full?alt=json';
            await axios.get(dataURI)
            .then(response => {
              this.fullData = response.data.feed.entry;
            }, error => {
              console.log(error);
            });

            for (var i = 0; i < this.fullData.length; i++) {
              
              var entryName = this.fullData[i]["gsx$firstname"].$t + " " + this.fullData[i]["gsx$lastname"].$t;
              if (entryName.toUpperCase().indexOf(this.name.toUpperCase()) !== -1) {
                this.remainingTutoring = parseFloat(this.fullData[i]["gsx$remainingtutoringhours"].$t) || 0;
                this.tutoring = 16 - this.remainingTutoring;
                this.internal = parseFloat(this.fullData[i]["gsx$internalservice19-20"].$t) || 0;
                this.external = parseFloat(this.fullData[i]["gsx$externalservice19-20"].$t) || 0;
                break;
              }
            }
          }

          else if (this.gradYear == 21) {

            const dataURI = 'https://spreadsheets.google.com/feeds/list/1c_UIyUgF5IPTzhpc7x3B7WfWlO4g_c2sV5_RC3-a1I8/2/public/full?alt=json';
            await axios.get(dataURI)
            .then(response => {
              this.fullData = response.data.feed.entry;
            }, error => {
              console.log(error);
            });

            for (var i = 0; i < this.fullData.length; i++) {

              var entryName = this.fullData[i]["gsx$firstname"].$t + " " + this.fullData[i]["gsx$lastname"].$t;
              if (entryName.toUpperCase().indexOf(this.name.toUpperCase()) !== -1) {
                this.tutoring = parseFloat(this.fullData[i]["gsx$totaltutoringhours"].$t) || 0;
                this.internal = parseFloat(this.fullData[i]["gsx$internalservice19-20"].$t) || 0;
                this.external = parseFloat(this.fullData[i]["gsx$externalservice19-20"].$t) || 0;
                break;
              }
            }
          }
        }
        
      } catch (err) {
        console.log(err);
      }
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
