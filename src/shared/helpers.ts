export interface QueryParameter {
    name: string;
    value: string;
}

/**
 * Get cookie value by name;
 * If cookie not found return null.
 * @param name Name of cookie parameter.
 */
export function getCookieByName(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) {
        return match[2];
    }

    return null;
}

export function updateSearchParams(params: QueryParameter[]) {
    const queryParams = new URLSearchParams(window.location.search);
    for (const param of params) {
        queryParams.set(param.name, param.value);
    }

    const spinner = document.getElementById("loading");
    if (spinner) {
        spinner.classList.remove("d-none");
        spinner.classList.add("d-flex");
    }

    const query = queryParams.toString();
    window.location.href = `${window.location.pathname}?${query}`;
}
