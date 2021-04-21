import { Pagination, IPaginationParameters } from "../src/pagination/pagination";
import * as ko from "knockout";

describe("Pagination tests.", () => {
    describe("Active state tests.", () => {
        it("Move next should be disabled.", () => {
            // Arange
            const pageSize = ko.observable(10);
            const totalItems = ko.observable(26);
            const skipPages = ko.observable(0);
            const params: IPaginationParameters = {
                onPageSizeChanged: (pageSize: number) => { return; },
                onskipPagesChanged: (skipPages: number) => { return; },
                pageSize,
                totalItems,
                skipPages,
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
            const skipPages = ko.observable(0);
            const params: IPaginationParameters = {
                onPageSizeChanged: (pageSize: number) => { return; },
                onskipPagesChanged: (skipPages: number) => { return; },
                skipPages,
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
            const skipPages = ko.observable(0);
            const totalItems = ko.observable(26);
            const params: IPaginationParameters = {
                onPageSizeChanged: (pageSize: number) => { return; },
                onskipPagesChanged: (skipPages: number) => { return; },
                skipPages,
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
            const skipPages = ko.observable(0);
            const totalItems = ko.observable(8);
            const params: IPaginationParameters = {
                onPageSizeChanged: (pageSize: number) => { return; },
                onskipPagesChanged: (skipPages: number) => { return; },
                skipPages,
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
            const skipPages = ko.observable(0);
            const totalItems = ko.observable(0);
            const params: IPaginationParameters = {
                onPageSizeChanged: (pageSize: number) => { return; },
                onskipPagesChanged: (skipPages: number) => { return; },
                skipPages,
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
            const skipPages = ko.observable(0);
            const totalItems = ko.observable(10);
            const params: IPaginationParameters = {
                onPageSizeChanged: (pageSize: number) => { return; },
                onskipPagesChanged: (skipPages: number) => { return; },
                skipPages,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Assert
            expect(pager.showingCaption()).toEqual("Showing 1 - 5 of 10");
        });
    });
});
