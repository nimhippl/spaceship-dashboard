<template>
  <div id="fuel-gauge">
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        class="fuel-svg"
    >
      <path
          id="fuel_1_"
          d="M26,31.36H6c-1.301,0-2.36-1.059-2.36-2.36V6c0-1.179,0.869-2.159,2-2.333V1c0-0.199,0.161-0.36,0.36-0.36h10
        c0.199,0,0.36,0.161,0.36,0.36v2.64H26c1.302,0,2.36,1.059,2.36,2.36v23C28.36,30.302,27.302,31.36,26,31.36z"
          fill="#444"
      />
      <rect
          x="7"
          :y="31.36 - (fuel / 100) * 25"
          width="18"
          :height="(fuel / 100) * 25"
          :fill="fuelColor"
      />
    </svg>
    <p>Запас топлива: {{ fuel }}%</p>
  </div>
</template>

<script>
export default {
  props: {
    fuel: {
      type: Number,
      required: true
    }
  },
  computed: {
    fuelColor() {
      if (this.fuel <= 20) {
        return 'red';
      } else if (this.fuel <= 60) {
        return 'yellow';
      } else {
        return 'green';
      }
    }
  }
};
</script>

<style scoped>
#fuel-gauge {
  margin: 20px;
  text-align: center;
  color: white;
}
.fuel-svg {
  width: 100px;
  height: 200px;
}
</style>
