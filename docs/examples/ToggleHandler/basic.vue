<script lang="ts" setup>
import { loadStyleString } from '@vunk-shared/browser'
import { ToggleHandler } from '@vunk-shared/class'
import { onUnmounted } from 'vue'
  
  
class ToggleStyleStringHandler extends ToggleHandler<string> {

  color = 'red'

  get cssRule () {
    return `
    #loadStyleStringDemoNode{
      background: ${this.color};
    }
    `
  }

  constructor (color: string) {
    super()
    this.color = color
  }
  add (e?: string) {

    if (e) {
      this.color = e
    }
  

    this.removeHandler = loadStyleString(this.cssRule)
  }

}
  
  
const toggleStyleStringHandler = new ToggleStyleStringHandler('red')

toggleStyleStringHandler.add()

onUnmounted(() => {
  toggleStyleStringHandler.remove()
})
  
  
</script>
<template>
  <!-- 使用loadStyleString 添加样式 -->
  <div id="loadStyleStringDemoNode" sk-flex="row-center2">
    <el-button 
      @click="() => toggleStyleStringHandler.toggle()"
    >
      toggleLoadStyleStringDemoNodeBg
    </el-button>
    
    <el-button
      @click="() => toggleStyleStringHandler.reset('blue')"
    >
      blue
    </el-button>
  </div>
</template>