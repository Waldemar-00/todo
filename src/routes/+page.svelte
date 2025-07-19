<script>
// @ts-nocheck

    import {enhance} from '$app/forms'
    import { fly, slide } from 'svelte/transition';
    let {data, form} = $props()
    // @ts-ignore
    let localTodosDeletedID = $state([])
</script>
{#if form?.error}
  <div class="error-centered">
    {form.error}
  </div>
{:else}
  <div id="app-container">
    <h1>Todos</h1>
    <form method="POST" action='?/add' use:enhance data-sveltekit-noscroll id="add-form">
        <label title="write todo">
            <!-- svelte-ignore a11y_autofocus -->
            <input type="text" placeholder="add a todo" name='todo' autofocus>
        </label>
    </form>

    <ul>
      {#each data.db.filter(t => !localTodosDeletedID.includes(t.id)) as todo, i (todo.id)}
          <li
            in:fly={{ y: 40, duration: 180, delay: i * 40 }}
            out:slide={{ duration: 160 }}>
              <form method="POST" action="?/toggle" use:enhance>
                  <input type=hidden name=id value={todo.id}/>
                  <label>
                      <input type="checkbox" name=done checked={todo.done} onclick={(e) => {
                          if(e.target instanceof HTMLInputElement) {
                              e.target.form?.requestSubmit()
                          }
                      }
                  }>
                      <span>{todo.text}</span>
                  </label>
              </form>

              <form method="POST" action="?/delete" use:enhance={() => {
                  localTodosDeletedID = [...localTodosDeletedID, todo.id]
                  return async({update}) => {
                    await update()
                    localTodosDeletedID = localTodosDeletedID.filter((id) => id !== todo.id)
                  }
                }
              }>
                  <input type=hidden name=id value={todo.id}/>
                  <button type=submit>delete</button>
              </form>
          </li>
      {/each}
  </ul>
  </div>
{/if}

<style>
:global(body) {
  background: #fff;
  color: #222;
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  margin: 1.5rem 0 1rem 0;
  font-size: 2rem;
  color: rgb(0, 77, 0);
  letter-spacing: 0.02em;
}

#app-container {
  max-width: 1200px;
  margin: 2.5rem auto 0 auto;
  padding: 0 1.5rem 2rem 1.5rem;
  box-sizing: border-box;
}

#app-container h1 {
  margin: 0 0 1.2rem 0;
  text-align: left;
}

#add-form {
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
}

input[type="text"] {
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.15s;
  background: #fafafa;
  color: #222;
}
input[type="text"]:focus {
  border-color: #ff8c00;
  background: #fff;
}

ul {
  width: 100%;
  max-width: 600px;
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #eee;
  background: #fff;
}
li:last-child {
  border-bottom: none;
}

form[method="POST"][action*="toggle"] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1 1 auto;
}

input[type="checkbox"] {
  accent-color: rgb(0, 77, 0);
  width: 1.1em;
  height: 1.1em;
  margin-right: 0.5em;
}
/* input[type="checkbox"]:focus {
  outline: 2px solid #ff8c00;
  outline-offset: 2px;
} */

label > span {
  font-size: 1.05rem;
  color: #222;
  user-select: text;
  display: inline-block;
  max-width: 100%;
  white-space: normal;
  word-break: break-word;
}
input[type="checkbox"]:checked + span {
  color: #888;
}

form[method="POST"][action*="delete"] {
  margin-left: auto;
}

button[type="submit"] {
  background: none;
  border: none;
  color: #b00020;
  border-radius: 5px;
  padding: 0.3rem 0.9rem;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  outline: none;
}
button[type="submit"]:hover,
button[type="submit"]:focus {
  color: #ff1744;
  background: #fff0f0;
}

.error-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  color: #b00020;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  z-index: 1000;
  text-align: center;
}

@media (max-width: 1300px) {
  #app-container {
    max-width: 98vw;
  }
}

@media (max-width: 600px) {
  #app-container {
    padding: 0 0.3rem 1.5rem 0.3rem;
  }
  ul {
    max-width: 100vw;
  }
  #add-form {
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    align-items: center;
    overflow-x: auto;
  }
  #app-container h1 {
    font-size: 1.3rem;
  }
  li {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 0.2rem;
    max-width: 100vw;
  }
  form[method="POST"][action*="delete"] {
    margin-left: auto;
  }
  label > span {
    max-width: 80vw;
  }
  .error-centered {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
}

@media (prefers-color-scheme: dark) {
  :global(body) {
    background: #181818;
    color: #f3f3f3;
  }
  input[type="text"] {
    background: #232323;
    color: #f3f3f3;
    border-color: #444;
  }
  input[type="text"]:focus {
    background: #181818;
    border-color: #ff8c00;
  }
  li {
    background: #232323;
    border-bottom: 1px solid #333;
  }
  label > span {
    color: #f3f3f3;
  }
  input[type="checkbox"]:checked + span {
    color: #888;
  }
  button[type="submit"] {
    background: #2d181a;
    color: #ff5252;
    border-color: #ff5252;
  }
  button[type="submit"]:hover,
  button[type="submit"]:focus {
    background: #3a2326;
    border-color: #ff1744;
    color: #ff1744;
  }
  .error-centered {
    background: #181818;
    color: #ff5252;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
  }
}
</style>