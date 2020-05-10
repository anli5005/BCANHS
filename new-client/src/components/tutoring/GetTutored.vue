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

      <br /> <!-- please spare me for using <br /> instead of CSS -->

      <b-button v-b-modal.modal-prevent-closing variant="outline-primary" style="margin: 20px 0 20px 0;">Click Here to fill out a General Tutoring Request and an NHS tutor will get back to you.</b-button>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Tutoring Request"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            id="input-group-1"
            :state="rEmailState"
            label="Email address:"
            label-for="input-1"
            invalid-feedback="Email address is required"
          >
            <b-form-input
              id="input-1"
              type="email"
              v-model="rEmail"
              :state="rEmailState"
              required
              placeholder="firlas99@bergen.org"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            :state="rNameState"
            label="Name:"
            label-for="input-2"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="input-2"
              type="text"
              v-model="rName"
              :state="rNameState"
              required
              placeholder="First Last"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Subject:"
            label-for="input-3"
          >
            <b-form-select v-model="subject"
              id="input-3"
            >
              <b-form-select-option
                v-for="sub in subjects"
                :value="sub.id"
                :key="sub.id"
                >{{ sub.name }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>


          <b-form-group
            id="input-group-4"
            label="Availability:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              hidden
            ></b-form-input>

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
                </td>
              </tr>
            </table>
          </b-form-group>
        
        </form>
      </b-modal>


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
        rEmail: "",
        rEmailState: null,
        rName: "",
        rNameState: null,
        selHours: [],
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
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.rEmailState = valid;
        this.rNameState = valid;
        return valid;
      },
      resetModal() {
        this.rEmail = '';
        this.rEmailState = null;
        this.rName = '';
        this.rNameState = null;
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.handleSubmit();
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        
        console.log(this.rEmail);
        console.log(this.rName);
        console.log(this.subject);
        console.log(this.selHours);
        console.log(this.tutSes);

        // Push rEmail, rName, subject, and selHours to backend function that filters for NHS tutor availability and sends email using SendGrid API (like the one in server\src\routes\api\auth.js).

        /*
        RequestService.sendEmail({
          rName: this.rName,
          rEmail: this.rEmail,
          hours: this.selHours,
          subject: this.subject,
        }).then(res => {
          this.$root.$bvToast
          this.$root.$bvToast.toast("Tutoring request sent successfully! Expect a response soon from an NHS tutor.", {
            title: "Success!",
            variant: "success",
            autoHideDelay: 5000
          });
          .catch(err => {
            this.$bvToast.toast(err);
          });
        });
        */
        

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')

          // Should be in RequestService.sendEmail callback but moved here to show for prototype.
          this.$root.$bvToast.toast("Tutoring request sent successfully! Expect a response soon from an NHS tutor.", {
            title: "Success!",
            variant: "success",
            autoHideDelay: 5000
          });

        })
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
