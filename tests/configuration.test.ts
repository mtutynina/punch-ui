import { ComponentsConfigurationOverride, getConfiguration, overrideConfiguration } from "../src/shared/config";
import "jest";

describe("Configuration override.", () => {
    it("Override pagination.", () => {
        // Arrange
        var override: ComponentsConfigurationOverride = {
            pagination: {
                pageSizeOptions: [5, 2],
            },
        };

        // Act 
        overrideConfiguration(override);

        // Assert 
        var expected = {
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

        var actual = getConfiguration().pagination;
        console.log(actual);

        expect(expected).toEqual(actual);
    });
    it("Override nested object.", () => {
        // Arrange
        var override: ComponentsConfigurationOverride = {
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
        var expected = {
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

        var actual = getConfiguration().pagination;
        console.log(actual);

        expect(expected).toEqual(actual);
    });
});
