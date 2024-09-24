import { networkInterfaces } from 'os'


/**
 * 
 * @param serverOptions  -
 *  port?: number,
 *  internal?: boolean,
 *  family?: 'IPv4' | 'IPv6',
 *  protocol?: string
 * @returns - string[]
 */
export function networkServers (serverOptions: {
  port?: number,
  internal?: boolean,
  family?: 'IPv4' | 'IPv6',
  // http or https
  protocol?: string
} = {}): string[] {

  const family = serverOptions.family || 'IPv4'
  const protocol = serverOptions.protocol || 'http'

  const servers: string[] = []

  const faces = networkInterfaces()

  for (const name in faces) {
    const face = faces[name]

    if (!face) continue

    for (const { address, family: addrFamily } of face) {
      if (addrFamily === family) {
        let server = `${protocol}://${address}`
        if (serverOptions.port) server += `:${serverOptions.port}`
        servers.push(server)
      }
    }

  }




  return servers
}