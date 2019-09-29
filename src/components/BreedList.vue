<template>
  <div class="container">
      <spinner v-show="breeds.length === 0"></spinner>
    <breed-item
      :disabled="selected.length >= 2 && selected.indexOf(value) === -1"
      :reset="selected.indexOf(value) === -1"
      :name="value"
      v-for="(key, value, index) in breeds"
      v-bind:key="index"
    />
  </div>
</template>
<script>
import DogApi from "@/services/api/Dog";
import Spinner from "./Spinner";
import BreedItem from "./BreedItem";
export default {
  name: "BreedList",
  data() {
    return {
      breeds: [],
      selected: []
    };
  },
  props: {
    selectLimit: Number
  },
  components: {
    BreedItem, Spinner
  },
  methods: {
    checkItemImage: function(data) {
      if (data.checked) {
        if (this.selected.length < 2) {
          this.$root.$emit("load-breed-images", data.name);
          this.selected.push(data.name);
        }
      } else {
        const selectedNameIndex = this.selected.indexOf(data.name);
        if (selectedNameIndex > -1) {
          this.selected.splice(selectedNameIndex, 1);
          this.$root.$emit("unload-breed-images", data.name);
        }
      }
    },
    uncheckBreed: function(breed) {
      const selectedNameIndex = this.selected.indexOf(breed);
      if (selectedNameIndex > -1) {
        this.selected.splice(selectedNameIndex, 1);
      }
    }
  },
  mounted: function() {
    this.$on("breed-checked", this.checkItemImage);
    this.$root.$on("breed-uncheck", this.uncheckBreed);
    DogApi.getBreedsList().then(data => {
      this.breeds = data.message;
    });
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>