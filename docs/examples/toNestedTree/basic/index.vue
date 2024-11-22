<script lang="ts" setup>
import { data } from './data'
import { toNestedTree } from '@vunk-shared/data'
const toData = toNestedTree(data)

</script>
<template>
  <div sk-flex>
    <div class="flex-1">
      {{  data  }}
    </div>
    <div class="flex-1">
      {{  toData  }}
    </div>
  </div>
</template>
