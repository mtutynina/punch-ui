import * as ko from "knockout";
import { QueryParameter, updateSearchParams } from "../shared/helpers";
import { getConfiguration } from "../shared/config";

export interface ITableHeadItemParameters {

    /**
     * Additional query string parameters to update on change.
     */
    additionalParametersDefaultValues?: QueryParameter[];

    /**
     * Icon class name for ascending order.
     */
    ascOrderIcon?: string;

    /**
     * Column name.
     */
    columnName: string;

    /**
     * Icon class name for descending order.
     */
    descOrderIcon?: string;

    /**
     * Change handler.
     */
    onChange?: (columnName: string, order: string) => void;

    /**
     * Column name by which the table is sorted.
     */
    sortColumnName?: string | ko.Observable<string>;

    /**
     * Current sort order.
     */
    sortOrder?: string | ko.Observable<string>;

    /**
     * Query string name for sort order parameter.
     */
    sortOrderQueryString?: string;

    /**
     * Query string name for sort column parameter.
     */
    sortColumnQueryString?: string;

    /**
     * Indicates whether should apply changes to query string.
     */
    useQueryStringParameters?: boolean;

    /**
     * Default sort order.
     */
    defaultSortOrder?: string;
}

export class TableHeadItem {
    /**
     * Order of table sorting.
     */
    public sortOrder: ko.Observable<string>;

    /**
     * Column name by which should sort list.
     */
    public sortColumnName: ko.Observable<string>;

    /**
     * Current column name.
     */
    public columnName: string;

    /**
     * Indicates whether should show sort arrow.
     */
    public showSortArrow: ko.Computed<boolean>;

    /**
     * Icon class name for ascending order.
     */
    public ascOrderIcon: string;

    /**
     * Icon class name for descending order.
     */
    public descOrderIcon: string;

    /**
     * Initial sort order after th click.
     */
    public initialSortOrder: string;

    constructor(private params: ITableHeadItemParameters) {
        const config = getConfiguration().th;
        this.ascOrderIcon = params.ascOrderIcon ?? config.ascOrderIcon;
        this.descOrderIcon = params.descOrderIcon ?? config.descOrderIcon;
        this.sortOrder = this.getInitialSortOrder();
        this.sortColumnName = this.getInitialSortColumn();
        this.columnName = params.columnName;
        this.showSortArrow = ko.computed(() => {
            return this.columnName === this.sortColumnName();
        });
        this.initialSortOrder = params.defaultSortOrder ?? config.defaultSortOrder;
    }

    public sortTable() {
        if (this.columnName === this.sortColumnName()) {
            let newSortOrder = "ASC";
            if (this.sortOrder() === newSortOrder) {
                newSortOrder = "DESC";
            }

            this.sortOrder(newSortOrder);
            this.onChange(this.sortColumnName(), newSortOrder);
        } else {
            const sortOrder = this.initialSortOrder;
            this.sortOrder(sortOrder);
            this.sortColumnName(this.columnName);
            this.onChange(this.columnName, sortOrder);
        }
    }

    private onChange(sortColumn: string, sortOrder: string) {
        const params = this.params;
        if (params.onChange) {
            params.onChange(sortColumn, sortOrder);
        }

        const config = getConfiguration().th;
        const useQueryString = params.useQueryStringParameters
            || (typeof params.useQueryStringParameters === "undefined" && config.useQueryStringParameters);
        if (!useQueryString) {
            return;
        }

        let query: QueryParameter[] = [
            { name: params.sortOrderQueryString ?? config.sortOrderQueryString, value: sortOrder },
            { name: params.sortColumnQueryString ?? config.sortColumnQueryString, value: sortColumn },
        ];
        const additionalQuery = params.additionalParametersDefaultValues ?? config.additionalParametersDefaultValues;
        if (additionalQuery) {
            query = [...query, ...additionalQuery];
        }

        updateSearchParams(query);
    }

    private getInitialSortOrder() {
        const params = this.params;
        const config = getConfiguration().th;
        if (!params.sortOrder) {
            return ko.observable(config.initialSortOrder);
        }

        if (ko.isObservable(params.sortOrder)) {
            return params.sortOrder;
        }

        return ko.observable(params.sortOrder);
    }

    private getInitialSortColumn() {
        const params = this.params;
        const config = getConfiguration().th;
        if (!params.sortColumnName) {
            return ko.observable(config.initialSortColumnName);
        }

        if (ko.isObservable(params.sortColumnName)) {
            return params.sortColumnName;
        }

        return ko.observable(params.sortColumnName);
    }
}
