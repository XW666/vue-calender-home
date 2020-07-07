<template>
  <div class="days-contaior">
    <div class="country">
      <VuCountryIntl v-model="countryCode" :showAreaCode="false"></VuCountryIntl>
    </div>
    <Numder-View :max="31" :min="1" :numderValue.sync="numderValue"></Numder-View>
    <Date-Days :dateList="dateList" :daysValue.sync="daysValue"></Date-Days>
    <DataPicker :selectValue.sync="hValue" widthType="150" class="md-10"></DataPicker>
    <DataPicker :selectValue.sync="dataValue" widthType="150" dateType="month" class="md-10"></DataPicker>
    <DataPicker :selectValue.sync="dataValue1" widthType="250" dateType="daterange" class="md-10"></DataPicker>
    <DataPicker :selectValue.sync="dataValue2" widthType="250" dateType="monthrange" class="md-10"></DataPicker>
  </div>
</template>
<script>
import DateDays from "../components/DateDays/index";
import DataPicker from "../components/DataPicker/index";
import NumderView from "../components/NumderView";
import VuCountryIntl from "vue-country-intl";
export default {
  components: {
    DateDays,
    DataPicker,
    NumderView,
    VuCountryIntl
  },
  data() {
    return {
      countryCode: "",
      numderValue: 1,
      dateList: 31,
      daysValue: 2,
      dataValue: "",
      dataValue1: "",
      dataValue2: "",
      hValue: "",
      str: "54eb0dd7cda80dce666ad933f223857462b7864f"
    };
  },
  filters: {},
  created() {},
  methods: {}
};
</script>
<style>
.country {
  width: 200px;
}
.country .vue-country-list-wrap {
  width: auto;
  margin-top: 5px;
}
</style>