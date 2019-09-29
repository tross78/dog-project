<template>
  <div class="box">
    <h2>{{name}}</h2>
    <p v-for="(subBreed, index) in subBreeds" v-bind:key="index">{{subBreed}}</p>
    <input
      :disabled="disabled"
      class="checkbox"
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="check($event)"
    />
  </div>
</template>
<script>
import DogApi from "@/services/api/Dog";
export default {
  name: "BreedItem",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    name: String,
    disabled: Boolean,
    reset: Boolean
  },
  watch: {
    reset: function(newVal, oldVal) {
     if (newVal === true) {
       this.checked = false;
     }
    }
  },
  data() {
    return {
      subBreeds: [],
      checked: false
    };
  },
  mounted: function() {
    DogApi.getSubBreeds(this.name).then(data => {
      this.subBreeds = data.message;
    });
  },
  methods: {
    check: function(e) {
      this.checked = !this.checked;
      this.$parent.$emit("breed-checked", {
        checked: e.target.checked,
        name: this.name
      });
    }
  }
};
</script>

<style scoped>
.box {
  width: 200px;
  position: relative;
  background-color: lightblue;
  padding: 5px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  padding-right: 40px;
}
.checkbox {
  position: absolute;
  width: 40px;
  height: 40px;
  top: calc(50% - 20px);
  right: 0;
}
</style>