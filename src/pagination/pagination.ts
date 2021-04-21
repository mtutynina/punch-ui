import * as ko from "knockout";
import { getCookieByName } from "../shared/helpers";

export interface IPaginationParameters {
    skipPages?: ko.Observable<number>;
    totalItems?: ko.Observable<number>;
    initialTotalItems?: number;
    pageSize?: ko.Observable<number>;
    onskipPagesChanged?(skipPages: number): void;
    onPageSizeChanged?(pageSize: number): void;
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
     * Count of pages to skip.
     */
    public skipPages: ko.Observable<number>;

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
    public pageSizeList = [10, 20, 30, 40, 50];

    constructor(private params: IPaginationParameters) {
        const skipPagesInitial = this.getInitialSkipPagesValue();
        const currentPage = skipPagesInitial + 1;
        this.currentPage = ko.observable(currentPage);
        this.skipPages = ko.observable(skipPagesInitial);
        if (params.skipPages) {
            params.skipPages.subscribe((newValue) => {
                if (newValue !== this.skipPages()) {
                    this.skipPages(newValue);
                    this.currentPage(newValue + 1);
                }
            });
        }

        this.skipPages.subscribe((newValue) => {
            if (params.onskipPagesChanged) {
                params.onskipPagesChanged(newValue);
                return;
            }

            this.updateSearchParams("pageSkip", newValue.toString());
        });
        if (params.totalItems) {
            this.totalItems = params.totalItems;
        } else {
            const totalItems = params.initialTotalItems ? params.initialTotalItems : 0;
            this.totalItems = ko.observable(totalItems);
        }

        const initialPageSize = this.getInitialPageSize();
        this.pageSize = ko.observable(initialPageSize);
        this.pageSize.subscribe((newValue) => {
            document.cookie = `pageSize=${newValue};path=/;`;

            if (params.onPageSizeChanged) {
                params.onPageSizeChanged(newValue);
                return;
            }

            this.updateSearchParams("pageSize", newValue.toString());
            this.updateSearchParams("pageSkip", "0");
        });
        const visiblePagesCount = 5;
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

    public moveToPage(pageNumber: number) {
        if (!this.isChangePageBlockActive()) {
            return;
        }

        const skipPages = pageNumber - 1;
        this.skipPages(skipPages);
        this.currentPage(pageNumber);
    }

    public moveNext() {
        if (!this.isMoveNextBTNActive()) {
            return;
        }

        const nextPage = this.currentPage() + 1;
        this.moveToPage(nextPage);
    }

    public movePrev() {
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

    private updateSearchParams(paramName: string, paramValue: string) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(paramName, paramValue);
        const spinner = document.getElementById("loading");
        if (spinner) {
            spinner.classList.remove("d-none");
            spinner.classList.add("d-flex");
        }

        const query = queryParams.toString();
        window.location.href = `${window.location.pathname}?${query}`;
    }

    private getSearchParam(paramName: string) {
        const queryParams = new URLSearchParams(window.location.search);
        const value = queryParams.get(paramName);
        return value;
    }

    private getInitialSkipPagesValue() {
        let skipPagesInitial = 0;
        const searchQuerySkipPages = this.getSearchParam("pageSkip");
        if (searchQuerySkipPages && !this.params.skipPages) {
            skipPagesInitial = parseInt(searchQuerySkipPages, 10);
        }

        if (this.params.skipPages) {
            skipPagesInitial = this.params.skipPages();
        }

        return skipPagesInitial;
    }

    private getInitialPageSize() {
        let pageSize = 10;
        const storedPageSize = getCookieByName("pageSize");
        if (storedPageSize) {
            return parseInt(storedPageSize, 10);
        }

        const searchQuery = this.getSearchParam("pageSize");

        if (searchQuery && !this.params.pageSize) {
            pageSize = parseInt(searchQuery, 10);
        }

        if (this.params.pageSize) {
            pageSize = this.params.pageSize();
        }

        return pageSize;
    }
}
