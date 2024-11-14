<template>
  <div id="app">
    <h1>Панель управления космическим кораблем</h1>
    <div id="map-container">
      <FlatMap :objects="mapObjects" :currentX="currentX" :currentY="currentY" :viewX="viewX" :viewY="viewY" :fuelBarrels="fuelBarrels" />
    </div>
    <div class="panel">
      <div class="indicators">
        <FuelGauge :fuel="fuelLevel" />
        <ShipHealth :health="shipHealth" />
        <ConnectionStatus :status="connectionStatus" />
      </div>
      <div id="control-panel-container">
        <ControlPanel @move="moveShip" />
      </div>
    </div>

    <div v-if="gameOver" id="game-over">
      <h2>Конец игры</h2>
      <button @click="restartGame">Попробовать снова</button>
    </div>
  </div>
</template>

<script>
import FlatMap from './components/FlatMap.vue';
import FuelGauge from './components/FuelGauge.vue';
import ShipHealth from './components/ShipHealth.vue';
import ConnectionStatus from './components/ConnectionStatus.vue';
import ControlPanel from './components/ControlPanel.vue';
import { locateShip } from './api/spaceApi';

export default {
  components: {
    FlatMap,
    FuelGauge,
    ShipHealth,
    ConnectionStatus,
    ControlPanel,
  },
  data() {
    return {
      mapObjects: [],
      fuelLevel: 100,
      shipHealth: 100,
      connectionStatus: 'Connected',
      currentX: 0,
      currentY: 0,
      viewX: 0,
      viewY: 0,
      width: 1600,
      height: 840,
      gameOver: false,
      fuelBarrels: 0,
    };
  },

  methods: {
    restartGame() {
      this.fuelLevel = 100;
      this.shipHealth = 100;
      this.currentX = 0;
      this.currentY = 0;
      this.viewX = -100;
      this.viewY = -100;
      this.mapObjects = [];
      this.connectionStatus = 'Connected';
      this.gameOver = false;
      this.fuelBarrels = 0;
    },

    async moveShip(direction) {
      if (this.fuelLevel <= 0 || this.shipHealth <= 0) {
        this.gameOver = true;
        return;
      }

      let newX = this.currentX;
      let newY = this.currentY;

      switch (direction) {
        case 'up':
          newY -= 20;
          break;
        case 'down':
          newY += 20;
          break;
        case 'left':
          newX -= 20;
          break;
        case 'right':
          newX += 20;
          break;
      }

      try {
        const response = await locateShip(newX, newY);

        if (response.status === 'success') {
          this.fuelLevel -= 5;
          if (this.fuelLevel <= 0) {
            this.fuelLevel = 0;
            this.gameOver = true;
            return;
          }

          this.mapObjects = response.items;

          this.shipHealth -= response.damage;
          if (this.shipHealth <= 0) {
            this.shipHealth = 0;
            this.gameOver = true;
            return;
          }

          this.currentX = newX;
          this.currentY = newY;

          this.viewX = this.currentX - this.width / 2;
          this.viewY = this.currentY - this.height / 2;

          const fuelBarrelCount = response.items.filter(item => item.type === 'fuel_barrel').length;
          this.fuelBarrels = fuelBarrelCount;

          if (fuelBarrelCount > 0) {
            this.fuelLevel = Math.min(this.fuelLevel + fuelBarrelCount * 5, 100);
          }

          this.connectionStatus = 'Connected';
        } else {
          this.connectionStatus = 'Disconnected';
          alert('Проблемы с соединением. Попытка повторного соединения...');
          await this.moveShip(direction);
        }
      } catch (error) {
        console.error('Ошибка при попытке отправить запрос:', error);
        if (error.response && (error.response.status >= 400 && error.response.status < 600)) {
          this.errorMessage = `Ошибка ${error.response.status}: ${error.response.statusText}. Попробуйте снова.`;
          this.showErrorModal = true;
          this.retryDirection = direction;
        } else {
          this.connectionStatus = 'Disconnected';
          alert('Проблемы с соединением. Попытка повторного соединения...');
          await this.moveShip(direction);
        }
      }
    },

    retryConnection() {
      this.showErrorModal = false;
      if (this.retryDirection) {
        this.moveShip(this.retryDirection);
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  color: white;
  background: url('stars-background.jpg') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  position: relative;
}

#map-container {
  overflow: hidden;
  width: 1600px;
  height: 840px;
  margin: 0 auto;
  border: 3px solid #444;
  border-radius: 10px;
  position: relative;
}

.panel {
  display: flex;
  position: relative;
  width: 100%;
  height: 450px;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
}

.indicators {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

#control-panel-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#game-over {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  background: black;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1000;
}
</style>
