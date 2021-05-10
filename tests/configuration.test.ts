import { ComponentsConfigurationOverride, getConfiguration, overrideConfiguration } from "../src/shared/config";
import "jest";

describe("Configuration override.", () => {
    it("Override pagination.", () => {
        // Arrange
        const override: ComponentsConfigurationOverride = {
            pagination: {
                pageSizeOptions: [5, 2],
            },
        };

        // Act
        overrideConfiguration(override);

        // Assert
        const expected = {
            pageSizeOptions: [5, 2],
            pageSize: 10,
            useCookieForPageSize: false,
            pageSizeCookieName: "pageSize",
            useQueryStringParameters: false,
            initialCurrentPage: 1,
            currentPageQueryString: "currentPage",
            pageSizeQueryString: "pageSize",
            size: "default",
            visiblePagesCount: 5,
        };

        const actual = getConfiguration().pagination;

        expect(expected).toEqual(actual);
    });
    it("Override nested object.", () => {
        // Arrange
        const override: ComponentsConfigurationOverride = {
            pagination: {
                pageSizeOptions: [5, 2],
                icons: {
                    next: "icon",
                    prev: "next-icon",
                },
            },
        };

        // Act
        overrideConfiguration(override);

        // Assert
        const expected = {
            pageSizeOptions: [5, 2],
            pageSize: 10,
            useCookieForPageSize: false,
            pageSizeCookieName: "pageSize",
            useQueryStringParameters: false,
            initialCurrentPage: 1,
            currentPageQueryString: "currentPage",
            pageSizeQueryString: "pageSize",
            size: "default",
            visiblePagesCount: 5,
            icons: {
                next: "icon",
                prev: "next-icon",
            },
        };

        const actual = getConfiguration().pagination;
        expect(expected).toEqual(actual);
    });
});
