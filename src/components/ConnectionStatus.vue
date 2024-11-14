<template>
  <div id="connection-status">
    <span class="status" :class="status.toLowerCase()">
      <span class="dot"></span> {{ status === 'Connected' ? 'Соединение установлено' : 'Нет соединения' }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['status'],
};
</script>

<style scoped>
.status {
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}
.connected .dot {
  background: green;
}
.disconnected .dot {
  background: red;
}
</style>
