import { IPaginationParameters, Pagination } from "src/pagination/pagination";
import * as ko from "knockout";

export { IPaginationParameters, Pagination } from "src/pagination/pagination";

export function registerPaginationComponent() {
    ko.components.register("pagination", {
        viewModel: {
            createViewModel: (params: IPaginationParameters) => new Pagination(params),
        },
        template: require("src/pagination/pagination.html"),
    });
}
