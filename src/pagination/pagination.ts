import * as ko from "knockout";
import { getConfiguration } from "../shared/config";
import { PaginationIcons, PaginationSize } from "../shared/config/pagination";
import { getCookieByName } from "../shared/helpers";

export interface IPaginationParameters {
    currentPage?: ko.Observable<number> | number;
    currentPageQueryString?: string;
    icons?: PaginationIcons;
    onChange?(page: number, pageSize: number): void;
    pageSize?: ko.Observable<number> | number;
    pageSizeCookieName?: string;
    pageSizeOptions?: number[];
    pageSizeQueryString?: string;
    size?: PaginationSize;
    totalItems?: ko.Observable<number> | number;
    useCookieForPageSize?: boolean;
    useQueryStringParameters?: boolean;
    visiblePagesCount?: number;
}

interface QueryParameter {
    name: string;
    value: string;
}

export class Pagination {
    /**
     * Currently opened page number.
     */
    public currentPage: ko.Observable<number>;

    /**
     * Count of total items needed pagination.
     */
    public totalItems: ko.Observable<number>;

    /**
     * Count of data items on single page.
     */
    public pageSize: ko.Observable<number>;

    /**
     * List of pages that should be shown.
     */
    public pagesList: ko.Computed<number[]>;

    /**
     * Indicates whether change page block is active.
     */
    public isChangePageBlockActive: ko.Computed

    /**
     * Indicates whether move next button should be active.
     */
    public isMoveNextBTNActive: ko.Computed<boolean>;

    /**
     * Indicates whether move previous button should be active.
     */
    public isMovePrevBTNActive: ko.Computed<boolean>;

    /**
     * Caption describes how many item are shown.
     */
    public showingCaption: ko.Computed<string>;

    /**
     * Available page sizes.
     */
    public pageSizeList: number[];

    /**
     * Indicates whether should show customized icons for previous and next buttons.
     */
    public showCustomIcons: boolean;

    /**
     * Class names set for prevoius and next buttons.
     */
    public iconStyles: PaginationIcons | null;

    /**
     * Indicates whether should use small size for component.
     */
    public useSmallSize: boolean;

    private useCookieForPageSize: boolean;

    private useQueryString: boolean;

    constructor(private params: IPaginationParameters) {
        const config = getConfiguration().pagination;
        this.useCookieForPageSize = params.useCookieForPageSize
            || (typeof params.useCookieForPageSize === "undefined" && config.useCookieForPageSize);
        this.useQueryString = params.useQueryStringParameters
            || (typeof params.useQueryStringParameters === "undefined" && config.useQueryStringParameters);
        this.pageSizeList = params.pageSizeOptions ?? config.pageSizeOptions;
        this.iconStyles = params.icons ?? config.icons ?? null;
        this.showCustomIcons = this.iconStyles !== null;
        const size = params.size ?? config.size;
        this.useSmallSize = size === "small";
        this.currentPage = this.getInitialCurrentPage();
        this.totalItems = this.getTotalItemsProperty();
        this.pageSize = this.getInitialPageSize();
        this.pageSize.subscribe((newValue) => {
            this.onPageSizeChanged(newValue);
        });
        const visiblePagesCount = params.visiblePagesCount ?? config.visiblePagesCount;
        this.pagesList = ko.computed(() => {
            return this.getPagesList(this.totalItems(), this.pageSize(), this.currentPage(), visiblePagesCount);
        });
        this.isChangePageBlockActive = ko.computed(() => {
            return this.totalItems() / this.pageSize() > 1;
        });
        this.isMoveNextBTNActive = ko.computed(() => {
            if (!this.isChangePageBlockActive()) {
                return false;
            }

            const lastPage = Math.ceil(this.totalItems() / this.pageSize());
            return this.currentPage() < lastPage;
        });
        this.isMovePrevBTNActive = ko.computed(() => {
            if (!this.isChangePageBlockActive()) {
                return false;
            }

            return this.currentPage() > 1;
        });
        this.showingCaption = ko.computed(() => {
            const page = this.currentPage();
            const totalItems = this.totalItems();
            const pageSize = this.pageSize();
            let start = page * pageSize - pageSize;
            if (page === 1 && totalItems > 0) {
                start = 1;
            }

            let end = page * pageSize;
            if (end > totalItems) {
                end = totalItems;
            }

            const totalItemsFormatted = new Intl.NumberFormat("en-US").format(totalItems);
            const startFormatted = new Intl.NumberFormat("en-US").format(start);
            const endFormatted = new Intl.NumberFormat("en-US").format(end);
            const caption = `Showing ${startFormatted} - ${endFormatted} of ${totalItemsFormatted}`;
            return caption;
        });
    }

    public moveToPage(pageNumber: number): void {
        if (!this.isChangePageBlockActive()) {
            return;
        }

        this.currentPage(pageNumber);
        this.onCurrentPageChanged(pageNumber);
    }

    public moveNext(): void {
        if (!this.isMoveNextBTNActive()) {
            return;
        }

        const nextPage = this.currentPage() + 1;
        this.moveToPage(nextPage);
    }

    public movePrev(): void {
        if (!this.isMovePrevBTNActive()) {
            return;
        }

        const nextPage = this.currentPage() - 1;
        this.moveToPage(nextPage);
    }

    private getPagesList(totalItems: number, pageSize: number, currentPage: number, visiblePagesCount: number) {
        let pagesCount = Math.ceil(totalItems / pageSize);
        if (pagesCount < 1) {
            pagesCount = visiblePagesCount + 1;
        }

        const pageItems = [...Array(pagesCount + 1).keys()];
        const sliceStart = Math.ceil(currentPage / visiblePagesCount) * visiblePagesCount - visiblePagesCount + 1;
        let sliceEnd = Math.ceil(currentPage / visiblePagesCount) * visiblePagesCount + 1;
        if (pagesCount < visiblePagesCount) {
            sliceEnd = pagesCount + 1;
        }

        const pages = pageItems.slice(sliceStart, sliceEnd);
        return pages;
    }

    private updateSearchParams(params: QueryParameter[]) {
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

    private getNumericalSearchParam(paramName: string): number | null {
        const queryParams = new URLSearchParams(window.location.search);
        const value = queryParams.get(paramName);
        if (value) {
            const numValue = parseInt(value, 10);
            if (numValue) {
                return numValue;
            }

            return null;
        }

        return null;
    }

    private getInitialCurrentPage(): ko.Observable<number> {
        const config = getConfiguration().pagination;
        const params = this.params;
        if (this.useQueryString) {
            const queryName = params.currentPageQueryString ?? config.currentPageQueryString;
            const currentPage = this.getNumericalSearchParam(queryName);
            if (currentPage) {
                return ko.observable(currentPage);
            }
        }

        if (ko.isObservable(params.currentPage)) {
            return params.currentPage;
        }

        const currentPage = config.initialCurrentPage;
        return ko.observable(currentPage);
    }

    private getInitialPageSize(): ko.Observable<number> {
        const config = getConfiguration().pagination;
        const params = this.params;
        if (this.useQueryString) {
            const queryName = params.pageSizeQueryString ?? config.pageSizeQueryString;
            const pageSize = this.getNumericalSearchParam(queryName);
            if (pageSize) {
                return ko.observable(pageSize);
            }
        }

        if (this.useCookieForPageSize) {
            const cookieName = params.pageSizeCookieName ?? config.pageSizeCookieName;
            const storedPageSize = getCookieByName(cookieName);
            if (storedPageSize) {
                const pageSize = parseInt(storedPageSize, 10);
                return ko.observable(pageSize);
            }
        }

        if (ko.isObservable(params.pageSize)) {
            return params.pageSize;
        }

        const pageSize = config.pageSize;
        return ko.observable(pageSize);
    }

    private getTotalItemsProperty(): ko.Observable<number> {
        if (!this.params.totalItems) {
            return ko.observable(0);
        }

        if (ko.isObservable(this.params.totalItems)) {
            return this.params.totalItems;
        }

        return ko.observable(this.params.totalItems);
    }

    private onCurrentPageChanged(currentPage: number) {
        const params = this.params;
        if (params.onChange) {
            const pageSize = this.pageSize();
            params.onChange(currentPage, pageSize);
        }

        if (this.useQueryString) {
            const config = getConfiguration().pagination;
            this.updateSearchParams([{ name: config.currentPageQueryString, value: currentPage.toString() }]);
        }
    }

    private onPageSizeChanged(pageSize: number) {
        const params = this.params;
        const config = getConfiguration().pagination;
        if (this.useCookieForPageSize) {
            document.cookie = `${config.pageSizeCookieName}=${pageSize};path=/;`;
        }

        if (params.onChange) {
            this.currentPage(config.initialCurrentPage);
            params.onChange(config.initialCurrentPage, pageSize);
        }

        if (this.useQueryString) {
            this.updateSearchParams([
                { name: config.pageSizeQueryString, value: pageSize.toString() },
                { name: config.currentPageQueryString, value: config.initialCurrentPage.toString() },
            ]);
        }
    }
}
