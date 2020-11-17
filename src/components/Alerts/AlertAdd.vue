<template>
  <b-modal
    id="alert-add"
    title="Create Alert"
    ok-title="Create"
    @shown="reset"
    @ok="addNewAlert"
    :ok-disabled="isDisabled"
  >
    <b-form @submit="addNewAlert">
      <b-form-group
        :state="alertState"
        :invalid-feedback="alertNameInvalidFeedback"
        label-for="input-alertname"
        label="Alert Name"
      >
        <b-form-input
          ref="input-alertname"
          id="input-alertname"
          :state="alertState"
          @update="resetFormSubmission"
          v-model="$v.form.alertName.$model"
          type="text"
          autofocus
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";

const alertNameMinLength = 3;

export default {
  name: "AlertAdd",
  data() {
    return {
      form: {
        alertName: ""
      },
      formSubmissionFailed: false,
      formSubmissionFailedMessage: ""
    };
  },
  computed: {
    alertState() {
      if (
        this.$v.form.alertName.$model === null ||
        this.$v.form.alertName.$model === ""
      ) {
        return null;
      }
      if (this.formSubmissionFailed) {
        return false;
      }
      return !this.$v.form.alertName.$error;
    },
    alertNameInvalidFeedback() {
      if (this.$v.form.alertName.$invalid) {
        return `Alert name must be at least ${alertNameMinLength} characters`;
      } else if (this.formSubmissionFailed) {
        return this.formSubmissionFailedMessage;
      }
      return null;
    },
    isDisabled() {
      return this.$v.form.$invalid;
    }
  },
  validations: {
    form: {
      alertName: {
        required,
        minLength: minLength(alertNameMinLength)
      }
    }
  },
  methods: {
    resetFormSubmission() {
      this.formSubmissionFailed = false;
    },
    addNewAlert: async function(event) {
      event.preventDefault();

      if (!this.$v.$invalid) {
        const alertName = this.$v.form.alertName.$model;
        console.log("alertName", alertName);
        const result = await this.$store.dispatch(
          "Alerts/ADD_ALERT",
          alertName
        );

        if (result !== undefined) {
          this.formSubmissionFailed = true;
          this.formSubmissionFailedMessage = result;
        } else {
          this.$router.push(`/alerts/${alertName}`);
        }
      }
    },
    reset() {
      this.form = {
        alertName: null
      };
      this.$refs["input-alertname"].focus();
    }
  }
};
</script>
