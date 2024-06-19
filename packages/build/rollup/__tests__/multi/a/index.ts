import { debounce } from 'lodash-es'


export const debounceA = debounce(() => {
  console.log('debounceA')
}, 1000)