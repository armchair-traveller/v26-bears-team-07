<!-- _FadeDecorator.svelte -->
<script>
  import { afterPageLoad } from "@roxi/routify";

  import { beforeUrlChange } from "@roxi/routify";
  import { fade } from "svelte/transition";
  import { sleep } from "../utils/utils";

  let isReady = true;
  $beforeUrlChange(async () => {
    isReady = false;
    await sleep(150);
    return true;
  });
  $afterPageLoad(() => {
    isReady = true;
  });
</script>

{#if isReady}
  <div out:fade={{ duration: 150 }} in:fade={{ duration: 200 }}>
    <slot />
  </div>
{/if}
