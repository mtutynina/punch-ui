import { QueryParameter } from "../helpers";

export interface TableHeadConfiguration {

    /**
     * Current sort order.
     */
    initialSortOrder: string;

    /**
     * Current sort column name.
     */
    initialSortColumnName: string;

    /**
     * Icon class name for ascending order.
     */
    ascOrderIcon: string;

    /**
     * Icon class name for descending order.
     */
    descOrderIcon: string;

    /**
     * Indicates whether should chnage query string on change.
     */
    useQueryStringParameters: boolean;

    /**
     * Query string name for sort order parameter.
     */
    sortOrderQueryString: string;

    /**
     * Query string name for sort column parameter.
     */
    sortColumnQueryString: string;

    additionalParametersDefaultValues?: QueryParameter[];

    /**
     * Default initial sort order.
     */
    defaultSortOrder: string;
}

export type TableHeadConfigurationOverride = Partial<TableHeadConfiguration>;
