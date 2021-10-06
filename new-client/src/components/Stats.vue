<template>
  <div class="stats text-light">
    <!-- <h5>Tutoring: {{tutoring}} / 16 hours</h5>
    <h5>Community Service: {{internal}} / 4 hours internal, {{external}} / 4 hours external</h5> -->
    <h6><a href="https://docs.google.com/spreadsheets/d/1c_UIyUgF5IPTzhpc7x3B7WfWlO4g_c2sV5_RC3-a1I8/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Click for Detailed Spreadsheet</a></h6>
    <h6>If you have any website suggestions, please email <a href="mailto:antli22@bergen.org?subject=NHS%20Website%20Suggestion">Anthony Li</a>!</h6>
  </div>
</template>

<script>
  export default {
      name: 'Stats',
      props: {
          tutoring: Number,
          internal: Number,
          external: Number,
      },
  };
</script>

<style lang="scss">

</style>