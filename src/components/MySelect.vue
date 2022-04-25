<template>
  <!-- eslint-disable-next-line -->
  <select v-model="modelValue" v-on:change="changeOption" style="">
    <option disabled value="">Sort by date</option>
    <option
      v-for="option in options"
      v-bind:key="option.value"
      v-bind:value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
select {
  width: 120px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
