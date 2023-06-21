<!-- components/HelloWorld.vue -->

<template>
  <div class="hello">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </div>
</template>

<script>
// import { routerLink } from 'vue-router';
import { RouterLink } from 'vue-router';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    RouterLink
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.input-container {
  --c-text: rgb(50, 50, 80);
  --c-bg: rgb(252, 252, 252);
  --c-outline: rgb(55, 45 , 190);
  display: grid;
  gap: 1ch;
  position: relative;
  max-width: 190px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: black;
}

.input-field {
  padding: 0.5em 0.75em;
  border-radius: 0.2em;
  border: 1px solid var(--c-border, currentColor);
  color: var(--c-text);
  font-size: 1rem;
  letter-spacing: 0.1ch;
  width: 100%;
}

.input-field:not(:placeholder-shown) + .input-label {
  transform: translateY(-220%);
  opacity: 1;
}

.input-field:invalid {
  --c-border: rgb(230, 85, 60);
  --c-text: rgb(230, 85, 60);
  --c-outline: rgb(230, 85, 60);
}

.input-field:is(:disabled, :read-only) {
  --c-border: rgb(150, 150, 150);
  --c-text: rgb(170, 170, 170);
}

.input-field:is(:focus, :focus-visible) {
  outline: 2px solid var(--c-outline);
  outline-offset: 2px;
}

.input-label {
  --timing: 200ms ease-in;
  position: absolute;
  left: 0;
  top: 50%;
  transition: transform var(--timing),
    opacity var(--timing);
  transform: translateY(-50%);
  opacity: 0;
  color: var(--c-text);
  font-weight: 500;
}

nav {
  background-color: #f0f0f0;
  padding: 10px;
}

nav a {
  margin-right: 10px;
  color: #333;
  text-decoration: none;
}

nav a.router-link-active {
  color: #dc2f55;
  font-weight: bold;
}

</style>
