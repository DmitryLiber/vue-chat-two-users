<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  tag?: 'section' | 'div' | 'main' | 'nav'
  mods?: string
}

const { tag = 'section', mods = '' } = defineProps<IProps>()
</script>

<template>
  <component :is="tag || 'section'" :class="['container', modifiersJoin(mods, 'container')]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@layer block {
  .container {
    --pad: var(--gap-s);
    --pad-neg: var(--gap-s-neg);

    width: 100%;
    max-width: 1170px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 var(--pad);

    @include mq($m) {
      --pad: var(--gap-m);
      --pad-neg: var(--gap-m-neg);
    }

    @include mq($l) {
      --pad: var(--gap-l);
      --pad-neg: var(--gap-l-neg);
    }

    @include mq($xl) {
      --pad: var(--gap-xl);
      --pad-neg: var(--gap-xl-neg);
    }
  }
}

@layer mod {
  .container--gap-top {
    padding-top: var(--gap-m);

    @include mq($m) {
      padding-top: var(--gap-l);
    }
  }

  .container--gap-bottom {
    padding-bottom: var(--gap-m);

    @include mq($m) {
      padding-bottom: var(--gap-l);
    }
  }
}
</style>
@/shared/utils
