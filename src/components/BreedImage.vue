<template>
  <div class="box">
    <spinner v-show="!loaded"></spinner>
    <span class="title">{{breed}}</span>
    <img :src="source" class="responsive" v-on:load="onLoaded" alt />
    <div class="close" @click="removeImage">X</div>
  </div>
</template>
<script>
import Spinner from "./Spinner";
export default {
  name: "BreedImage",
   data: function() {
    return {
      loaded: false,
    }
  },
  props: {
    breed: String,
    source: String
  },
  components: {
    Spinner
  },
  methods: {
    onLoaded() {
      this.loaded = true;
    },
    removeImage: function() {
        this.$parent.$emit("remove-image", {breed: this.breed, source: this.source});
    }
  }
};
</script>

<style scoped>
.title {
    position: absolute;
    text-align: left;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
}
.box {
  width: 150px;
  height: 100px;
  background-color: lightblue;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.responsive {
    height: auto;
    width: 100%;
    margin-top: 10px;
}

.close {
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: white;
  border: 1px solid gray;
}
</style>