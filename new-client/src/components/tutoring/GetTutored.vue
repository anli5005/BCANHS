<template>
  <div>
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
    <b-container class="text-light">
      <h1>Get Tutored</h1>
      <hr />
      <b-row>
        <div class="flex">
          <b-form-select v-model="subject">
            <b-form-select-option
              v-for="sub in subjects"
              :value="sub.id"
              :key="sub.id"
              >{{ sub.name }}</b-form-select-option
            >
          </b-form-select>
          <b-button @click="update" variant="success">Submit</b-button>
        </div>

        <table v-if="tutSes && !loading">
          <tr>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
          <tr v-for="i in 9" :key="i">
            <th>{{ mods[i - 1] }}</th>
            <td v-for="j in 5" :key="j">
              <a
                v-for="tutor in tutSes[
                  hours.find(hr => {
                    return hr.day === j - 1 && hr.hour === i - 1;
                  })._id
                ]"
                :key="tutor + subject + i.toString() + j.toString()"
                :href="'mailto:' + tutor.email"
                ><p>{{ tutor.name }}</p>
              </a>
            </td>
          </tr>
        </table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import TutorService from "@/services/TutorService";
  import SessionService from "@/services/SessionService";
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  export default {
    name: "tutor",
    data() {
      return {
        loading: false,
        subject: null,
        tutSes: null,
        hours: [],
        subjects: [],
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
          "25-27",
        ],
      };
    },
    components: {
      Loading,
    },
    async mounted() {
      try {
        let allSubjects = await SessionService.getSubjects().catch(() =>
          this.$bvToast.toast("Failed to fetch subjects. Please reload.", {
            title: "Failed",
            variant: "danger",
            autoHideDelay: 5000,
          }),
        );

        let allHours = await SessionService.getHours().catch(() =>
          this.$bvToast.toast("Failed to fetch hours. Please reload.", {
            title: "Failed",
            variant: "danger",
            autoHideDelay: 5000,
          }),
        );

        this.hours = [...allHours.data];

        allSubjects.data.forEach(sub => {
          this.subjects.push({ id: sub._id, name: sub.name });
        });
      } catch (err) {
        console.log(err);
      }
    },
    methods: {
      update() {
        this.loading = true;
        SessionService.getSessions(this.subject)
          .then(res => {
            this.tutSes = res.data;
            this.loading = false;
          })
          .catch(err => {
            this.$bvToast.toast("Failed to fetch sessions. Please reload.", {
              title: "Failed",
              variant: "danger",
              autoHideDelay: 5000,
            });
          });
      },
    },
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
  .flex {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
  }

  table,
  tr,
  td,
  th {
    border: 1px solid white;
  }

  p {
    margin: 0;
  }
</style>
