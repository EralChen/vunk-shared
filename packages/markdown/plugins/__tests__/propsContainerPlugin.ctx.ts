import { PropType } from 'vue'

export const props = {

  base: {
    type: String,
    required: true
  },


  /**
   * @link https://developer.mozilla.org/docs/Web/API/HTMLDivElement
   * @description The HTMLDivElement interface provides special properties (beyond those of the regular HTMLElement interface it also has available to it by inheritance) for manipulating div elements.
   * @property
   */
  el: {
    type: Object as PropType<HTMLDivElement
    >,
    required: true
  }

}
