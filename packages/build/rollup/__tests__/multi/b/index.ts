import { debounce } from 'lodash-es'


export const debounceB = debounce(() => {
  console.log('debounceB')
}, 1000)