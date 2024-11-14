<template>
  <div id="flat-map">
    <svg :width="width" :height="height" :viewBox="viewBox" style="background: url('@/assets/stars-background.jpg') no-repeat center center / cover;">
      <image
          v-for="object in scaledObjects"
          :key="object.id"
          :x="object.scaledX"
          :y="object.scaledY"
          :href="getObjectIcon(object.type)"
          width="100"
          height="100"
      />
      <text
          v-for="object in scaledObjects"
          :key="'label-' + object.id"
          :x="object.scaledX + 55"
          :y="object.scaledY + 25"
          font-size="14"
          fill="white"
      >
        {{ object.name }}
      </text>
    </svg>
    <div class="fuel-barrel-info" v-if="fuelBarrels > 0">
      <img src="@/assets/icons/fuel-barrel.svg" alt="Fuel Barrel" class="fuel-barrel-icon" />
      <span class="fuel-barrel-count">x {{ fuelBarrels }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['objects', 'currentX', 'currentY', 'fuelBarrels'],
  data() {
    return {
      width: 1600,
      height: 840,
      scaleFactor: 3,
    };
  },

  mounted() {
    console.log('Параметры viewBox:', this.viewBox);
  },

  computed: {
    viewBox() {
      const scaledCenterX = (this.currentX * this.scaleFactor) - this.width / 2;
      const scaledCenterY = (this.currentY * this.scaleFactor) - this.height / 2;

      // Поддерживаем границы области видимости
      const adjustedX = Math.min(0, scaledCenterX);
      const adjustedY = Math.min(0, scaledCenterY);
      console.log(`${this.currentY} ${scaledCenterY} ${adjustedX} ${adjustedY} ${this.width} ${this.height}`)
      return `${adjustedX} ${adjustedY} ${this.width} ${this.height}`;
    },
    viewBoxWidth() {
      return this.width;
    },
    viewBoxHeight() {
      return this.height;
    },
    scaledObjects() {
      return this.objects.map((object) => ({
        ...object,
        scaledX: object.x * this.scaleFactor,
        scaledY: object.y * this.scaleFactor,
      }));
    },
  },
  methods: {
    getObjectIcon(type) {
      switch (type) {
        case 'spaceship': return require('@/assets/icons/spaceship.svg');
        case 'asteroid': return require('@/assets/icons/asteroid.svg');
        default: return '';
      }
    },
  },
};
</script>

<style scoped>
#flat-map {
  margin: 20px auto;
  border: 3px solid #444;
  border-radius: 10px;
  position: relative;
}

.fuel-barrel-info {
  position: absolute;
  bottom: 30px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fuel-barrel-icon {
  width: 50px;
  height: 50px;
}

.fuel-barrel-count {
  font-size: 20px;
  color: white;
}
</style>
