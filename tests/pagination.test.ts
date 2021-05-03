import { Pagination, IPaginationParameters } from "../src/pagination/pagination";
import * as ko from "knockout";

describe("Pagination tests.", () => {
    describe("Active state tests.", () => {
        it("Move next should be disabled.", () => {
            // Arange
            const pageSize = ko.observable(10);
            const totalItems = ko.observable(26);
            const currentPage = ko.observable(1);
            const params: IPaginationParameters = {
                onChange: (page: number, pageSize: number) => { return; },
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
                onChange: (page: number, pageSize: number) => { return; },
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
                onChange: (page: number, pageSize: number) => { return; },
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
                onChange: (page: number, pageSize: number) => { return; },
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
                onChange: (page: number, pageSize: number) => { return; },
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
                onChange: (page: number, pageSize: number) => { return; },
                currentPage,
                pageSize,
                totalItems,
            };
            const pager = new Pagination(params);

            // Assert
            expect(pager.showingCaption()).toEqual("Showing 1 - 5 of 10");
        });
    });
});
