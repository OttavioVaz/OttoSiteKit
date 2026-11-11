<script>
  let {
    left,
    topRight,
    bottomRight,
    middle,
  } = $props();
</script>

<div class="project-root">
  <div class="pane left">
    {@render left?.()}
  </div>
  <div class="pane top_right">
    {@render topRight?.()}
  </div>
  <div class="pane bottom_right">
    {@render bottomRight?.()}
  </div>
  <div class="pane middle">
    {@render middle?.()}
  </div>
</div>
