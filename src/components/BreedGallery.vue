<template>
  <div class="container">
    <breed-image
      :source="item.source"
      :breed="item.breed"
      v-for="(item, index) in display"
      v-bind:key="index"
    />
  </div>
</template>
<script>
import DogApi from "@/services/api/Dog";
import BreedImage from "./BreedImage";
export default {
  name: "BreedGallery",
  data() {
    return {
      imageObjects: {},
      display: [],
      breeds: []
    };
  },
  components: {
    BreedImage
  },
  mounted() {
    this.$root.$on("load-breed-images", this.addAllImagesByBreed);
    this.$root.$on("unload-breed-images", this.removeAllImagesByBreed);
    this.$on("remove-image", this.removeImage);
  },
  methods: {
    addAllImagesByBreed: function(breed) {
      this.breeds = Array.from(new Set([...this.breeds, breed]));
      DogApi.getBreedImages(breed).then(data => {
        this.imageObjects[breed] = data.message.slice(0, 10).map(obj => {
          return {
            source: obj,
            breed: breed
          };
        });

        // show all 10 if one breed; 5 if two
        if (this.breeds.length === 1) {
          this.display = this.imageObjects[breed];
        } else {
          this.display = [
            ...this.imageObjects[this.breeds[0]].slice(0, 5),
            ...this.imageObjects[this.breeds[1]].slice(0, 5)
          ];
        }
      });
    },
    removeAllImagesByBreed: function(breed) {
      // remove breed from display
      this.removeBreedFromDisplay(breed);
      // delete breed from images
      this.removeBreedFromImageObjects(breed);
      // delete breed from breeds list
      this.removeBreedFromList(breed);
      this.recalculateDisplay();
    },
    removeBreedFromDisplay(breed) {
      this.display = this.display.filter(function(item, arr) {
        return item.breed != breed;
      });
    },
    removeSourceFromDisplay(source) {
      this.display = this.display.filter(function(item, arr) {
        return item.source != source;
      });
    },
    removeBreedFromImageObjects(breed) {
      delete this.imageObjects[breed];
    },
    removeBreedFromList(breed) {
      const breedIndex = this.breeds.indexOf(breed);
      if (breedIndex > -1) {
        this.breeds.splice(breedIndex, 1);
      }
    },
    recalculateDisplay: function() {
      // check if only 1 breed left; show all
      if (this.breeds.length === 1) {
        this.display = this.imageObjects[this.breeds[0]].slice(0, 10);
      }
    },
    checkDisplayBreedCount: function(breed) {
      this.breedsDisplayed = this.display.filter(function(item, arr) {
        return item.breed === breed;
      });
      if (this.breedsDisplayed.length === 0) {
        this.$root.$emit("breed-uncheck", breed);
        this.removeBreedFromImageObjects(breed);
        this.removeBreedFromList(breed);
        this.recalculateDisplay();
      }
    },
    removeImage: function(params) {
      this.removeSourceFromDisplay(params.source);
      this.checkDisplayBreedCount(params.breed);
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>