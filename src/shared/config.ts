import { TableHeadConfiguration, TableHeadConfigurationOverride } from "./config/table-head";
import { PaginationConfiguration, PaginationConfigurationOverride } from "./config/pagination";

export interface ComponentsConfigurationOverride {
    // eslint-disable-next-line lines-around-comment
    /**
     * Pagination component configuration.
     */
    pagination?: PaginationConfigurationOverride;

    /**
     * Table head component configuration.
     */
    th?: TableHeadConfigurationOverride;
}

interface ComponentsConfiguration {
    // eslint-disable-next-line lines-around-comment
    /**
     * Pagination component configuration.
     */
    pagination: PaginationConfiguration;

    /**
     * Table head component configuration.
     */
    th: TableHeadConfiguration;
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
    th: {
        initialSortColumnName: "",
        initialSortOrder: "",
        ascOrderIcon: "bi bi-arrow-up",
        descOrderIcon: "bi bi-arrow-down",
        useQueryStringParameters: false,
        sortColumnQueryString: "sortColumn",
        sortOrderQueryString: "sortOrder",
    }
};

export function getConfiguration(): ComponentsConfiguration {
    return config;
}

export function overrideConfiguration(override: ComponentsConfigurationOverride): void {
    const newConfig = config;
    for (const key in override) {
        const newValue = { ...newConfig[key], ...override[key] };
        newConfig[key] = newValue;
    }

    config = newConfig;
}
