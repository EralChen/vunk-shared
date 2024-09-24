import { test } from 'vitest'
import { networkServers } from '../networkServers'

test('readdirAsFlattenedTree', () => {
  const servers = networkServers({
    port: 3000,
  })
  console.log(servers)
})
