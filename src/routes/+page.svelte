<script>
    import {enhance} from '$app/forms'
    let {data} = $props()
</script>

<h1>Todos</h1>

<form method="POST" action='?/add' use:enhance data-sveltekit-noscroll>
    <label title="write todo">
        <input type="text" placeholder="add a todo" name='todo' {@attach (el) => el.focus()}>
    </label>
</form>

<ul>
    {#each data.db as todo (todo.id)}
        <li>
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

            <form method="POST" action="?/delete" use:enhance>
                <input type=hidden name=id value={todo.id}/>
                <button type=submit>delete</button>
            </form>
        </li>
    {/each}
</ul>