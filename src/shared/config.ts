import { PaginationConfiguration, PaginationConfigurationOverride } from "src/shared/config/pagination";

export interface ComponentsConfigurationOverride {
    /**
     * Pagination component configuration.
     */
    pagination?: PaginationConfigurationOverride;
}

interface ComponentsConfiguration {
    /**
     * Pagination component configuration.
     */
    pagination: PaginationConfiguration;
}

let config: ComponentsConfiguration = {
    pagination: {
        pageSizeOptions: [10, 20, 30, 40, 50],
        pageSize: 10,
        useCookieForPageSize: false,
        pageSizeCookieName: "pageSize",
        useQueryStringParameters: false,
        initialCurrentPage: 1,
        currentPageQueryString: "currentPage",
        pageSizeQueryString: "pageSize",
        size: "default",
        visiblePagesCount: 5,
    },
};

export function getConfiguration(): ComponentsConfiguration {
    return config;
}

export function overrideConfiguration(override: ComponentsConfigurationOverride): void {
    const newConfig = config;
    for (let key in override) {
        const newValue = { ...newConfig[key], ...override[key]}
        newConfig[key] = newValue;
    }

    config = newConfig;
}
