import { AnyFunc, ReturnVoid } from '@vunk-shared/types'



export interface Toggle {
  add: AnyFunc
  remove: () => ReturnVoid
  toggle: AnyFunc
  reset: AnyFunc
}



export abstract class ToggleHandler<V = any> implements Toggle  {
  protected removeHandler: AnyFunc | null = null

  abstract add(e?: V) :void

  async remove () {
    await this.removeHandler?.()
    this.removeHandler = null
  }

  async toggle (e?: V) {
   
    if (this.removeHandler) {
      this.remove()
    } else {
      this.add(e)
    }

  }

  async reset (e?: V) {
    await this.remove()
    await this.add(e)
  }
  
}