<template>
  <div id="control-panel">
    <div class="buttons">
      <button @click="$emit('move', 'up')">⬆</button>
      <div class="horizontal-buttons">
        <button @click="$emit('move', 'left')">⬅</button>
        <button @click="$emit('move', 'right')">➡</button>
      </div>
      <button @click="$emit('move', 'down')">⬇</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#control-panel {
  position: relative;
  width: 100%;
  height: 100%;
}

.buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.horizontal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  margin: 5px;
  padding: 15px;
  font-size: 20px;
  background: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

button:hover {
  background: #777;
}
</style>
