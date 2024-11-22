import { redirect } from 'vike/abort'

export async function data() {
    throw redirect(import.meta.env.BASE_URL + 'zh-CN/guide/introduction')
}
