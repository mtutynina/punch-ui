export interface PaginationIcons {
    prev: string;
    next: string;
}

export type PaginationSize = "default" | "small";

export interface PaginationConfigurationOverride {
    /**
     * Specify the sizeChanger options.
     * Default: [10, 20, 30, 40, 50].
     */
    pageSizeOptions?: number[];

    /**
     * Number of data items per page
     * Default: 10.
     * Note: default value should exist in pageSizeOptions list.
     */
    pageSize?: number;

    /**
     * Indicates whether should take page size.
     * Default: false.
     */
    useCookieForPageSize?: boolean;

    /**
     * Cookie name for page size. Available when useCookieForPageSize is set to true.
     * Default: pageSize.
     */
    pageSizeCookieName?: string;

    /**
     * Indicates whether should get pageSize and currentPage values from query strings, and override it on change.
     * Default: false.
     */
    useQueryStringParameters?: boolean;

    /**
     * Default initial value for current page.
     * Default: 1.
     */
    initialCurrentPage?: number;

    /**
     * Query sting parameter name for current page.
     * Default: currentPage.
     */
    currentPageQueryString?: string;

    /**
     * Query sting parameter name for page size.
     * Default: pageSize.
     */
    pageSizeQueryString?: string;

    /**
     * Icon class names for previous and next buttons.
     * Default: not set.
     */
    icons?: PaginationIcons;

    /**
     * Pagination component size.
     * Values: default or small.
     * Default: default.
     */
    size?: PaginationSize;

    /**
     * Count of buttons to switch pages.
     * Default: 5.
     */
    visiblePagesCount?: number;
}

export interface PaginationConfiguration {
    /**
     * Specify the sizeChanger options.
     * Default: [10, 20, 30, 40, 50].
     */
    pageSizeOptions: number[];

    /**
     * Number of data items per page
     * Default: 10.
     * Note: default value should exist in pageSizeOptions list.
     */
    pageSize: number;

    /**
     * Indicates whether should take page size.
     * Default: false.
     */
    useCookieForPageSize: boolean;

    /**
     * Cookie name for page size. Available when useCookieForPageSize is set to true.
     * Default: pageSize.
     */
    pageSizeCookieName: string;

    /**
     * Indicates whether should get pageSize and currentPage values from query strings, and override it on change.
     * Default: false.
     */
    useQueryStringParameters: boolean;

    /**
     * Default initial value for current page.
     * Default: 1.
     */
    initialCurrentPage: number;

    /**
     * Query sting parameter name for current page.
     * Default: currentPage.
     */
    currentPageQueryString: string;

    /**
     * Query sting parameter name for page size.
     * Default: pageSize.
     */
    pageSizeQueryString: string;

    /**
     * Icon class names for previous and next buttons.
     * Default: not set.
     */
    icons?: PaginationIcons;

    /**
     * Pagination component size.
     * Values: default or small.
     * Default: default.
     */
    size: PaginationSize;

    /**
     * Count of buttons to switch pages.
     * Default: 5.
     */
    visiblePagesCount: number;
}
