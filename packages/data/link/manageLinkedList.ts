import { LinkedNode, LinkedNodeInfo } from '@vunk-shared/types'



export function manageLinkedList<T extends LinkedNode> (
  list: T[],
) {

  const rawMap = new Map<string, T>()

  /**
   * id => prevNode
   */
  const prevRawMap = new Map<string, T>()

  list.forEach(node => {
    rawMap.set(node.id, node)
    if (node.nextId) {
      prevRawMap.set(node.nextId, node)
    }
  })

  const visited = new Set<string>()

  const linkInfo: Map<
    string,
    {
      id: string,
      link: LinkedNode[],
      index: number,
    }
  > = new Map()

  


  // 构建链条的辅助函数
  const buildChain = (startNode: LinkedNode) => {
    const chain: LinkedNode[] = []
    const localVisited = new Set<string>()
    let currentNode: LinkedNode | undefined = startNode
    while (currentNode && !visited.has(currentNode.id)) {
      chain.push(currentNode)
      visited.add(currentNode.id)
      localVisited.add(currentNode.id)
      currentNode = currentNode.nextId 
        ? rawMap.get(currentNode.nextId) 
        : undefined
    }

    return [
      localVisited,
      chain,
    ] as const
  }

  const startNodes = list.filter(node => !prevRawMap.has(node.id))


  function buildChainAndSet (node: LinkedNode) {
    const [ids, chain] = buildChain(node)
    ;[...ids].forEach((id, index) => {
      linkInfo.set(id, {
        id,
        link: chain,
        index,
      })
    })
  }
  startNodes.forEach(buildChainAndSet)

  list.forEach(node => {
    if (visited.has(node.id)) {
      return
    }
    buildChainAndSet(node)
  })


  const dataMap = new Map<string, LinkedNodeInfo<T>>()
  const data: LinkedNodeInfo<T>[] = list.map(node => {
    const info = linkInfo.get(node.id)
    if (!info) {
      throw new Error('No info found')
    }
    const link = info.link
    const doc = {
      isCycle: link[link.length - 1].nextId === link[0].id,
      raw: node,
      id: node.id,
      endId: link[link.length - 1].id,
      startId: link[0].id,
      nextId: node.nextId || '',
      prevId: link[info.index - 1]?.id || '',
    }
    dataMap.set(node.id, doc)
    return doc
  })

  





  




  return {
    rawMap,
    data,
    dataMap,
  }

}

