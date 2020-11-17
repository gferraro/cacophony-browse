<template>
  <b-container>
    <b-row v-if="!fetched">
      <Spinner />
    </b-row>
    <b-row v-else>
      <alert-add />
      <b-col class="col-12 col-lg-8 add-button-wrapper">
        <b-button
          v-b-modal.alert-add
          variant="primary"
          v-b-tooltip.hover
          class="add-button"
        >
          <font-awesome-icon icon="plus" size="xs" />
          <span>Create Alert</span>
        </b-button>
      </b-col>
      <b-col v-if="!alerts.length" class="col-12 col-lg-8">
        <b-card class="no-content-placeholder">
          <h5>
            You haven't created any alerts yet
          </h5>
        </b-card>
      </b-col>
      <b-col v-else class="col-12 col-lg-8">
        <div class="list-wrapper" data-cy="groups-list">
          <router-link
            v-for="(alert, index) in alerts"
            :key="index"
            :to="{ name: 'alert', params: { alertname: alert.alertName } }"
            class="list-group-item list-group-item-action"
          >
            {{ alert.alertName }}
            <font-awesome-icon class="icon" icon="chevron-right" size="xs" />
          </router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Spinner from "../components/Spinner.vue";
import AlertAdd from "../components/Alerts/AlertAdd.vue";

export default {
  name: "AlertsView",
  components: { Spinner, AlertAdd },
  props: {},
  computed: mapState({
    alerts: state => state.Alerts.alerts,
    fetched: state => state.Alerts.fetched,
    orderedAlerts: function() {
      return this.alerts.sort((a, b) => a.alertName.localeCompare(b.alertName));
    }
  }),
  created: function() {
    this.fetchAlerts();
  },
  methods: {
    fetchAlerts: function() {
      this.$store.dispatch("Alerts/GET_ALERTS");
    }
  }
};
</script>
