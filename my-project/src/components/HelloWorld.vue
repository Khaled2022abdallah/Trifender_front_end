<template>

    <!-- <h1>{{ msg }}</h1> -->
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  <div class="hello">
    <h1>Hello world</h1>
    <h3>welcome Mr. Khaled</h3>
  </div>

  <p class="input-container">
    <input type="text" placeholder="Enter your name" name="text" id="text" class="input-field" autocomplete="name">
    <label class="input-label" for="text">Name</label>
</p>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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

</style>
