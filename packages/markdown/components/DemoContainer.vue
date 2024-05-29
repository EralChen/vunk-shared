<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'
import DemoContainerExample from './DemoContainerExample.vue'
import DemoContainerCode from './DemoContainerCode.vue'
import DemoContainerCodes from './DemoContainerCodes.vue'

import { NormalObject } from '@vunk/shared'
import { VkClientOnly } from '@vunk/core/components/client-only'
import { 
  ElDivider, 
  ElIcon, 
  ElTooltip, 
  ElCollapseTransition, 
} from 'element-plus'

interface Props {
  demos: NormalObject
  source: string
  path: string
  rawSource: string
  description?: string
  subsources: string
}
const props = withDefaults(defineProps<Props>(), {
  rawTabsSource: '{}',
  description: '',
}) 


/* tabs  */
const prepath = computed(() => {
  return props.path.split('/')[0] + '/'
})
const tabsSource = computed(() => {
  const jsonStr = decodeURIComponent(props.subsources)
  return JSON.parse(jsonStr)
})
const tabsData = computed(() => {
  return [
    {
      path: props.path.replace(prepath.value, ''),
      source: decodeURIComponent(props.source),
    },
    ...Object.keys(tabsSource.value).map(item => {
      return {
        path: item.replace(prepath.value, ''),
        source: tabsSource.value[item],
      }
    }),
  ]
})
/* tabs end */

const [sourceVisible, toggleSourceVisible] = useToggle()

const sourceCodeRef = ref<HTMLButtonElement>()
const formatPathDemos = computed(() => {
  const demos: NormalObject = {}

  Object.keys(props.demos).forEach((key) => {
    demos[
      key.replace('../../examples/', '')
        .replace('.vue', '')
    ] = props.demos[key]
  })

  return demos
})

const locale = computed(() => {
  return {
    'view-source': 'View source',
    'hide-source': 'Hide source',
    'edit-in-editor': 'Edit in Playground',
    'edit-on-github': 'Edit on GitHub',
    'edit-in-codepen': 'Edit in Codepen.io',
    'copy-code': 'Copy code',
    'switch-button-option-text': 'Switch to Options API',
    'switch-button-setup-text': 'Switch to Composition API',
    'copy-success': 'Copied!',
    'copy-error': 'This browser does not support automatic copy！',
  }
})
const decodedDescription = computed(() =>
  decodeURIComponent(props.description!),
)


const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}



</script>

<template>
  <VkClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p
      v-html="decodedDescription"
    />

    <div class="vunk-shared-demo-container">
      <DemoContainerExample
        :file="path"
        :demo="formatPathDemos[path]"
      />

      <ElDivider class="m-0" />

      <div class="vunk-shared-demo-op-btns">
        <ElTooltip
          :content="locale['view-source']"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <button
            ref="sourceCodeRef"
            :aria-label="
              sourceVisible ? locale['hide-source'] : locale['view-source']
            "
            class="reset-btn el-icon vunk-shared-demo-op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <i-ri-code-line />
            </ElIcon>
          </button>
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <DemoContainerCodes
          v-if="tabsData.length > 1"
          v-show="sourceVisible"
          :data="tabsData"
        />

        <DemoContainerCode
          v-else
          v-show="sourceVisible"
          :source="source"
        />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="vunk-shared-demo-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>{{ locale['hide-source'] }}</span>
        </div>
      </Transition>
    </div>
  </VkClientOnly>
</template>

<style>
.vunk-shared-demo-op-btns{
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
}
.vunk-shared-demo-op-btn {
  margin: 0 0.5rem;
  cursor: pointer;
  color: var(--text-color-lighter);
  transition: 0.2s;
}

.vunk-shared-demo-op-btns.el-icon:hover {
  color: var(--text-color);
}
.vunk-shared-demo-op-btn.github a {
  transition: 0.2s;
  color: var(--text-color-lighter);
}
.vunk-shared-demo-op-btn.github a:hover {
  color: var(--text-color);
}

.vunk-shared-demo-float-control{
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
}

.vunk-shared-demo-float-control span {
  font-size: 14px;
  margin-left: 10px;
}
.vunk-shared-demo-float-control:hover {
  color: var(--el-color-primary);
}

.vunk-shared-demo-container {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);
}
</style>
