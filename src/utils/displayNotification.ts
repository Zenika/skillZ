export const displayNotification = (
    text: string,
    color: string,
    timeout: number
) =>
    window.dispatchEvent(
        new CustomEvent('notification', {
            detail: { text, color, timeout },
        })
    )
