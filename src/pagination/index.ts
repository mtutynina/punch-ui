import { IPaginationParameters, Pagination } from "./pagination";
import * as ko from "knockout";

export function registerPaginationComponent(): void {
    ko.components.register("pagination", {
        viewModel: {
            createViewModel: (params: IPaginationParameters) => new Pagination(params),
        },
        template: require("./pagination.html"),
    });
}
