export const computeFilterUrl = (
    baseUrl: string,
    params: { name: string; value: string }[]
) => {
    const url = new URL(baseUrl)
    if (params.length > 0) {
        params.forEach(({ name, value }) => url.searchParams.set(name, value))
    } else {
        url.searchParams.forEach((_, k) => {
            url.searchParams.delete(k)
        })
    }
    return url
}
