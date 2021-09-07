<template>
  <div class="days-contaior">
    <h1>工号范围</h1>
    <div class="rang">
      <label>工号范围</label>
      <Rang-Seach
        :displayValue1.sync="displayValue1"
        :displayValue2.sync="displayValue2"
        :placeholder="placeholderRang"
        :RangOptions="RangOptions"
      ></Rang-Seach>
    </div>
    <div class="country">
      <VuCountryIntl
        v-model="countryCode"
        :showAreaCode="false"
      ></VuCountryIntl>
    </div>
    <Numder-View
      :max="31"
      :min="1"
      :numderValue.sync="numderValue"
    ></Numder-View>
    <Money-Input :value.sync="UnitPrice"></Money-Input>
    <Date-Days :dateList="dateList" :daysValue.sync="daysValue"></Date-Days>
    <DataPicker
      :selectValue.sync="hValue"
      widthType="150"
      class="md-10"
    ></DataPicker>
    <DataPicker
      :selectValue.sync="dataValue"
      widthType="150"
      dateType="month"
      class="md-10"
    ></DataPicker>
    <DataPicker
      :selectValue.sync="dataValue1"
      widthType="250"
      dateType="daterange"
      class="md-10"
    ></DataPicker>
    <DataPicker
      :selectValue.sync="dataValue2"
      widthType="250"
      dateType="monthrange"
      class="md-10"
    ></DataPicker>
    <DateQuarter :daysValue.sync="dataValue3" :width="150"></DateQuarter>
  </div>
</template>
<script>
import DateDays from "../components/DateDays/index";
import DataPicker from "../components/DataPicker/index";
import DateQuarter from "../components/DateQuarter/index";
import NumderView from "../components/NumderView";
import MoneyInput from "../components/moneyInput.vue";
import VuCountryIntl from "vue-country-intl";
import RangSeach from "../components/RangeSeach";
export default {
  components: {
    DateDays,
    DataPicker,
    NumderView,
    VuCountryIntl,
    RangSeach,
    DateQuarter,
    MoneyInput,
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
      dataValue3: "",
      hValue: "",
      displayValue1: "",
      displayValue2: "",
      placeholderRang: "请输入工号",
      UnitPrice: "23456788",
      RangOptions: [
        {
          value: "A00001",
          label: "A00001",
        },
        {
          value: "A00002",
          label: "A00002",
        },
        {
          value: "A00003",
          label: "A00003",
        },
        {
          value: "A00004",
          label: "A00004",
        },
        {
          value: "A00005",
          label: "A00005",
        },
        {
          value: "A00006",
          label: "A00006",
        },
      ],
    };
  },
  filters: {},
  created() {},
  methods: {},
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