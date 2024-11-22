import { render } from 'vike/abort'

export async function guard() {
    throw render(
        import.meta.env.BASE_URL + 'zh-CN/guide/introduction' as `/${string}`
    )
}
