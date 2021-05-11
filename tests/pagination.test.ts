import { Pagination, IPaginationParameters } from "../src/pagination/pagination";
import * as ko from "knockout";
import "jest";
import { overrideConfiguration } from "../src/shared/config";

describe("Pagination tests.", () => {
    describe("Active state tests.", () => {
        it("Move next should be disabled.", () => {
            // Arange
            const pageSize = ko.observable(10);
            const totalItems = ko.observable(26);
            const currentPage = ko.observable(1);
            const params: IPaginationParameters = {
                pageSize,
                totalItems,
                currentPage,
            };
            const pager = new Pagination(params);

            // Act
            pager.moveToPage(3);

            // Assert
            expect(pager.isMoveNextBTNActive()).toEqual(false);
        });
        it("Move next should be enabled.", () => {
            // Arange
            const pageSize = ko.observable(10);
            const totalItems = ko.observable(26);
            const currentPage = ko.observable(1);
            const params: IPaginationParameters = {
                currentPage,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Act
            pager.moveToPage(2);

            // Assert
            expect(pager.isMoveNextBTNActive()).toEqual(true);
        });
    });
    describe("Pages list tests.", () => {
        it("Last page block should cover all entired items.", () => {
            // Arange
            const pageSize = ko.observable(10);
            const currentPage = ko.observable(1);
            const totalItems = ko.observable(26);
            const params: IPaginationParameters = {
                currentPage,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Act
            pager.moveToPage(2);

            // Assert
            expect(pager.pagesList()).toEqual([1, 2, 3]);
        });
    });
    describe("Pagination caption tests.", () => {
        it("Pagination should end should not be more than items length", () => {
            // Arange
            const pageSize = ko.observable(5);
            const currentPage = ko.observable(1);
            const totalItems = ko.observable(8);
            const params: IPaginationParameters = {
                currentPage,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Act
            pager.moveToPage(2);

            // Assert
            expect(pager.showingCaption()).toEqual("Showing 5 - 8 of 8");
        });
        it("Pagination should show 0 if items array length is 0.", () => {
            // Arange
            const pageSize = ko.observable(5);
            const currentPage = ko.observable(1);
            const totalItems = ko.observable(0);
            const params: IPaginationParameters = {
                currentPage,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Assert
            expect(pager.showingCaption()).toEqual("Showing 0 - 0 of 0");
        });
        it("Pagination should not start with 0 if items length more than 0.", () => {
            // Arange
            const pageSize = ko.observable(5);
            const currentPage = ko.observable(1);
            const totalItems = ko.observable(10);
            const params: IPaginationParameters = {
                currentPage,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Assert
            expect(pager.showingCaption()).toEqual("Showing 1 - 5 of 10");
        });
    });
    describe("Page size query string name", () => {
        it("Use default configuration if not specified.", () => {
            // Arange
            const component = new Pagination({ totalItems: 100, currentPage: 1 });

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["pageSizeQueryString"]).toEqual("pageSize");
        });
        it("Use name from parameters.", () => {
            // Arange
            const component = new Pagination(
                {
                    totalItems: 100,
                    currentPage: 1,
                    pageSizeQueryString: "size"
                }
            );

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["pageSizeQueryString"]).toEqual("size");
        });
        it("Override name in global configuration.", () => {
            // Arange
            overrideConfiguration({ pagination: { pageSizeQueryString: "size" } });
            const component = new Pagination({ totalItems: 100, currentPage: 1 });

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["pageSizeQueryString"]).toEqual("size");
        });
    });
    describe("Current page query string name", () => {
        it("Use default configuration if not specified.", () => {
            // Arange
            const component = new Pagination({ totalItems: 100, currentPage: 1 });

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["currentPageQueryString"]).toEqual("currentPage");
        });
        it("Use name from parameters.", () => {
            // Arange
            const component = new Pagination(
                {
                    totalItems: 100,
                    currentPage: 1,
                    currentPageQueryString: "page"
                }
            );

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["currentPageQueryString"]).toEqual("page");
        });
        it("Override name in global configuration.", () => {
            // Arange
            overrideConfiguration({ pagination: { currentPageQueryString: "page" } });
            const component = new Pagination({ totalItems: 100, currentPage: 1 });

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["currentPageQueryString"]).toEqual("page");
        });
    });
    describe("Page size cookie name", () => {
        it("Use default configuration if not specified.", () => {
            // Arange
            const component = new Pagination({ totalItems: 100, currentPage: 1 });

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["pageSizeCookieName"]).toEqual("pageSize");
        });
        it("Use name from parameters.", () => {
            // Arange
            const component = new Pagination(
                {
                    totalItems: 100,
                    currentPage: 1,
                    pageSizeCookieName: "pageSizeCookie"
                }
            );

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["pageSizeCookieName"]).toEqual("pageSizeCookie");
        });
        it("Override name in global configuration.", () => {
            // Arange
            overrideConfiguration({ pagination: { pageSizeCookieName: "pageSizeCookie" } });
            const component = new Pagination({ totalItems: 100, currentPage: 1 });

            // Assert
            // eslint-disable-next-line dot-notation
            expect(component["pageSizeCookieName"]).toEqual("pageSizeCookie");
        });
    });
});
