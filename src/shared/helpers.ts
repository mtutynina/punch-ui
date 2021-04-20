/**
 * Get cookie value by name;
 * If cookie not found return null.
 * @param name Name of cookie parameter.
 */
export function getCookieByName(name: string) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
        return match[2];
    }

    return null;
}
