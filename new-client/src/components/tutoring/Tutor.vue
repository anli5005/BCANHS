<template>
  <div>
    <b-container class="text-light">
      <h1>Edit your tutoring</h1>
      <hr />
      <b-row>
        <b-col lg="3">
          <h3>Subjects</h3>
          <b-form-group label="Subjects">
            <b-form-checkbox
              v-for="subject in subjects"
              :key="subject.id"
              :value="subject.id"
              v-model="selSubs"
              inline
            >{{ subject.name }}</b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col lg="8">
          <h3>Availability</h3>
          <table>
            <tr>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
            <tr v-for="i in 9" :key="i">
              <th>{{ mods[i - 1] }}</th>
              <td v-for="j in 5" :key="j">
                <b-form-checkbox
                  :value="
                    hours.find(hr => {
                      return hr.day === j - 1 && hr.hour === i - 1;
                    })._id
                  "
                  v-model="selHours"
                ></b-form-checkbox>
                <!-- must do minus 1 because `in` works weird -->
              </td>
            </tr>
          </table>
        </b-col>
        <b-col lg="1">
          <h3>Notifications</h3>
          <b-form-checkbox
            v-model="notifications"
            :value="notifications"
            >Enable Tutoring Request Notifications?

            <b-button id="help-button" style="font-size: 11px;">              
              What's this?
            </b-button>

            <b-tooltip target="help-button" placement="bottom">
              Recieve an automatic email when a student who aligns with your availability requests tutoring for one of your subjects.
            </b-tooltip>
            
          </b-form-checkbox>
        </b-col>

        <b-button @click="submit" variant="success">Submit</b-button>
      </b-row>
    </b-container>
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
      selSubs: [],
      selHours: [],
      //notifications: false,
      subjects: [],
      hours: [],
      days: ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      mods: [
        "1-3",
        "4-6",
        "7-9",
        "10-12",
        "13-15",
        "16-18",
        "19-21",
        "22-24",
        "25-27"
      ]
    };
  },
  async mounted() {
    try {
      let allSubjects = await SessionService.getSubjects().catch(() =>
        this.$bvToast.toast("Failed to fetch subjects. Please reload.", {
          title: "Failed",
          variant: "danger",
          autoHideDelay: 5000
        })
      );

      let allHours = await SessionService.getHours().catch(() =>
        this.$bvToast.toast("Failed to fetch hours. Please reload.", {
          title: "Failed",
          variant: "danger",
          autoHideDelay: 5000
        })
      );

      let currSess = await TutorService.getSession(
        this.$store.state.token
      ).catch(() => {
        console.log("boop");
        this.$root.$bvToast.toast("Failed to fetch user. Are you logged in?", {
          title: "Failed",
          variant: "danger",
          autoHideDelay: 5000
        });
        this.$router.push("/login");
      });

      console.log(currSess.data)

      currSess.data.subjects.forEach(sub => {
        console.log(sub);
        this.selSubs.push(sub);
      });

      currSess.data.hours.forEach(hr => {
        this.selHours.push(hr);
      });

      //this.notifications.push(currSess.data.notifications);

      this.hours = [...allHours.data];

      allSubjects.data.forEach(sub => {
        this.subjects.push({ id: sub._id, name: sub.name });
      });
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    submit() {
      TutorService.update({
        hours: this.selHours,
        subjects: this.selSubs,
        //notifications: this.notifications,
        token: this.$store.state.token
      }).then(res => {
        this.$root.$bvToast
          .toast("Updated your session successfully!", {
            title: "Success!",
            variant: "success",
            autoHideDelay: 5000
          })
          .catch(err => {
            this.$bvToast.toast(err);
          });
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
}
table {
  width: 100%;
}
tr {
  width: 20%;
}
</style>
