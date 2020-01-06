<template>
  <div>
    <b-container class="text-light"></b-container>
  </div>
</template>

<script>
import TutorService from "@/services/TutorService";
import SessionService from "@/services/SessionService";
export default {
  name: "tutor",
  data() {
    return {
      avail: [],
      subject: [],
      allSubjects: []
    };
  },
  async mounted() {
    try {
      // const user = this.$store.state.user.data;
      var result = await TutorService.get();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    // try {
    //   var result = await SessionService.getAll();
    //   this.allSubjects = result;
    // } catch (err) {
    //   console.log(err);
    // }
  },
  methods: {
    cleanAvail() {}
  }
};
</script>

<style lang="scss"></style>
