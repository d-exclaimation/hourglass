<script lang="ts">
  import type { Palette } from "@d-exclaimation/common/tailwind";
  import { onDestroy } from "svelte";
  import { optional, state } from "./state";
  import { format } from "./time";

  let interval = optional<number>();
  let start = state(new Date());
  let saved = state(0);
  let current = state(0);
  let color = state({
    text: "text-blue-700" as Palette['text'],
    bg: "bg-blue-50" as Palette['bg'] 
  });


  $: timer = ` ${color.text} ${color.bg}`;
  $: active = interval !== undefined;
  $: time = saved + current;

  function onContinue() {
    color = {
      text: "text-green-700",
      bg: "bg-green-50"
    };

    clearInterval(interval);

    interval = setInterval(() => {
      current = (new Date().getTime() - start.getTime()) / 1000;
    }, 100);
  }

  function onPause() {
    color = {
      text: "text-red-700",
      bg: "bg-red-50"
    };
    start = new Date();
    saved += current;
    current = 0;

    clearInterval(interval);
    interval = undefined;
  }

  function onToggle() {
    if (active) {
      onPause();
    } else {
      onContinue();
    }
  }

  function onReset() {
    current = 0;
    saved = 0;
    color = {
      text: "text-blue-700",
      bg: "bg-blue-50"
    };
  }

  onDestroy(() => {
    clearInterval(interval);
  });

</script>

<main class="w-screen h-screen grid place-items-center scroll-m-0 overflow-hidden">
  <div
    class="flex flex-col items-center justify-center"
  >
    <button
      class={`text-[16rem] mb-4 ${active ? "rotate-180" : "rotate-0"} transition-all select-none outline-none shadow-none`}
      on:click={onToggle}
    >
      {active ? "⏳" : "⌛"}
    </button>
    <button 
      class={"mt-4 font-mono text-2xl md:text-xl px-6 py-2 min-w-[9rem] min-h-[3rem] transition-all flex items-center justify-center rounded-md " + timer}
      on:click={onReset}  
    >
      {format(time)}
    </button>
  </div>
</main>