import { debounce } from 'lodash-es'


export const debounceC = debounce(() => {
  console.log('debounceC')
}, 1000)