<template>
  <div style="background-color: #fff;">
    <div>
      <div class="f-flex date-pick">
        <p class="f-item3">{{$t('datePickTime.checkIn')}}</p>
        <p class="f-item3"></p>
        <p class="f-item3">{{$t('datePickTime.leavingShop')}}</p>
      </div>
      <div class="f-flex date-pick sel">
        <p class="f-item3" @click="$refs.startPicker.open()">
          {{datePicker.startValue|filterDate}}
          <i>{{datePicker.startValue|filterName}}</i>
        </p>
        <p class="f-item3">
          <i class="tip">{{dayTotal}} {{$t('datePickTime.nights')}}</i>
        </p>
        <p class="f-item3" @click="$refs.endPicker.open()">
          {{datePicker.endValue|filterDate}}
          <i>{{datePicker.endValue|filterName}}</i>
        </p>
      </div>
    </div>
    <mt-datetime-picker
      ref="startPicker"
      type="date"
      v-model="startPicker"
      :startDate="startDate"
      :endDate="endDate"
      year-format="{value}"
      month-format="{value}"
      date-format="{value}"
      :cancelText="$t('datePickTime.cancel')"
      :confirmText="$t('datePickTime.ok')"
      @confirm="confirmVal(arguments[0],'startValue')"
    ></mt-datetime-picker>
    <mt-datetime-picker
      ref="endPicker"
      type="date"
      v-model="endPicker"
      :startDate="datePicker.startValue"
      :endDate="endDate"
      year-format="{value}"
      month-format="{value}"
      date-format="{value}"
      :cancelText="$t('datePickTime.cancel')"
      :confirmText="$t('datePickTime.ok')"
      @confirm="confirmVal(arguments[0],'endValue')"
    ></mt-datetime-picker>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      startPicker: new Date(),
      // startValue: new Date(),
      startDate: new Date(),
      endPicker: new Date()
      // endValue: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    };
  },
  props: ["maxSaleTime"],
  mounted() {
    // console.log(this.datePicker, this.datePicker.startValue);
  },
  methods: {
    //点击datePicker确认键时赋值当前时间值,并存贮
    confirmVal(val, changeVar) {
      if (changeVar == "startValue") {
        //如果离店时间比入店时间早，则更改离店时间 = 入店时间+1
        let endValue = this.datePicker.endValue;
        if (endValue.getTime() < val.getTime()) {
          endValue = new Date(val.getTime() + 24 * 60 * 60 * 1000);
        }
        this.$store.commit("datePicker", {
          startValue: val,
          endValue: endValue
        });
      }
      if (changeVar == "endValue") {
        this.$store.commit("datePicker", {
          startValue: this.datePicker.startValue,
          endValue: val
        });
      }
    }
  },
  computed: {
    ...mapGetters(["datePicker"]),
    /**
     * 计算入店与离店时间相差的天数
     */
    dayTotal() {
      let startValue = this.$U.getDateStr(this.datePicker.startValue);
      let endValue = this.$U.getDateStr(this.datePicker.endValue);
      let dayTotal = this.$U.getDays(startValue, endValue);
      return dayTotal;
    },
    endDate() {
      if (this.maxSaleTime != null) {
        return this.$U.getDate(this.maxSaleTime);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.date-pick {
  margin: 0 15px;

  &.sel {
    background: #f5f5f5;
    border-radius: 20px;
    p {
      font-weight: 700;
      font-size: 14px;
      i {
        font-style: normal;
        color: #7b7b7b;
        font-size: 12px;
        display: inline-block;
        &.tip {
          color: #333;
          border: 1px solid #d8d8d8;
          border-radius: 5px;
          background-color: #fff;
          padding: 0 10px;
        }
      }
    }
  }
  p {
    text-align: center;
    padding: 13px 10px;
    font-size: 12px;
  }
}
</style>
