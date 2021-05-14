import { ITableHeadItemParameters, TableHeadItem } from "../src/th/table-head-item";
import "jest";

describe("Table head component tests.", () => {
    it("Sort arrow should be shown.", () => {
        // Arrange
        const params: ITableHeadItemParameters = {
            columnName: "column1",
            sortColumnName: "column1",
            sortOrder: "ASC",
        };
        const th = new TableHeadItem(params);

        // Act
        expect(th.showSortArrow()).toEqual(true);
    });
    it("Sort arrow should not be shown.", () => {
        // Arrange
        const params: ITableHeadItemParameters = {
            columnName: "column1",
            sortColumnName: "column2",
            sortOrder: "ASC",
        };
        const th = new TableHeadItem(params);

        // Act
        expect(th.showSortArrow()).toEqual(false);
    });
});
