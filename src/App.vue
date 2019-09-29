<template>
  <div id="app">
    <div> <h2>Dog gallery <small>[uses https://dog.ceo/ API]</small></h2></div>
    <div class="row">
    <div class="column-left">
    <breed-list v-bind:selectLimit="2"/>
    </div>
     <div class="column-right">
       <breed-gallery/>
     </div>
  </div>
  </div>
</template>

<script>
import BreedList from './components/BreedList.vue'
import BreedGallery from './components/BreedGallery.vue'
export default {
  name: 'app',
  components: {
    BreedList,
    BreedGallery
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row {
  display: flex;
}

.column-left {
  flex: 33%;
    border-top: 2px solid lightgray;
  border-left: 2px solid lightgray;
}
.column-right {
  border: 2px solid lightgray;;
  flex: 66%;
}
</style>
