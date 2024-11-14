<template>
  <div id="ship-health">
    <div class="health-bar">
      <div class="health-fill" :style="{ width: health + '%' }"></div>
    </div>
    <p>Прочность корабля: {{ health }}%</p>
  </div>
</template>

<script>
export default {
  props: ['health'],
};
</script>

<style scoped>
#ship-health {
  margin: 20px;
  text-align: center;
  color: white;
}
.health-bar {
  width: 300px;
  height: 20px;
  background: #444;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 2px solid #555;
}
.health-fill {
  height: 100%;
  background: linear-gradient(to right, #ff0000, #ff7700);
  position: absolute;
  left: 0;
  transition: width 0.3s ease-in-out;
}
</style>
