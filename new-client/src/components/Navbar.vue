<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-container>
        <b-navbar-brand to="/">
          <img
            src="~@/assets/images/nhs_logo_light.png"
            height="30"
            width="30"
          />
          BCA NHS
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Info">
              <b-dropdown-item to="/info/bylaws">Bylaws</b-dropdown-item>
              <b-dropdown-item to="/info/requirements"
                >Membership Requirements</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Board">
              <b-dropdown-item to="/board">Board Members</b-dropdown-item>
              <b-dropdown-item to="/videos">Campaign Videos</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item to="/tutoring/get">Tutoring</b-nav-item>
            <template v-if="!$store.state.isLoggedIn">
              <b-nav-item to="/login">Login</b-nav-item>
            </template>
            <template v-else>
              <b-nav-item-dropdown text="Log Hours">
                <b-nav-item to="/tutoring/edit">Edit Tutoring</b-nav-item>
                <b-dropdown-item to="/logging/commserve"
                  >Community Service</b-dropdown-item
                >
                <b-dropdown-item to="/logging/tutor">Tutoring</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item @click="logout">Logout</b-nav-item>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {};
    },
    methods: {
      logout() {
        this.$store.dispatch("logOut");
        this.$router.push("/");
      },
    },
  };
</script>
