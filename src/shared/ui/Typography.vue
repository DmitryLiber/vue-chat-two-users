<script lang="ts" setup>
import { modifiersJoin } from '@shared/utils'

interface IProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'
  mods?: string
}

const { tag, mods = '' } = defineProps<IProps>()
</script>

<template>
  <component :is="tag" :class="['typography', modifiersJoin(mods, 'typography')]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@layer block {
  .typography {
    @include font(18px, 1, 400);
  }
}

@layer mod {
  .typography {
    &--center {
      text-align: center;
    }

    &--heading1 {
      @include font(32px, 1.19, 700);
    }

    &--heading2 {
      @include font(24px, 1.7, 500);
    }

    &--heading3 {
      @include font(20px, 1.2);
    }
  }
}
</style>
@/shared/utils
