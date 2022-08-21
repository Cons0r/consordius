<script>
  import "../app.css";
  import { Lucia } from "lucia-sveltekit/client"
</script>

<Lucia on:error={console.warn}>
  <slot />
</Lucia>