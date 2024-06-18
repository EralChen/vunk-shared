import { CommentRange } from 'ts-morph'
import { parse } from 'comment-parser'
import { NormalObject } from '@vunk/shared'


/**
 * parseCommentFromRanges 
 * @param ranges 
 * @returns 
 */
export function parseCommentFromRanges (
  ranges: CommentRange[],
): NormalObject[] {
  let comment = ''
  for (const range of ranges) {
    const text = range.getText()
    comment += text
  }
  const commentItems = parse(comment)



  return commentItems.map(item => {
    const obj: NormalObject = {
      default: item.description,
    }
    for (const tag of item.tags) {
      obj[tag.tag] = tag.name + (tag.description 
        ? ' ' + `${tag.description}`
        : '')
    }
    return obj
  })

}
