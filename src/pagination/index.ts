import { IPaginationParameters, Pagination } from "./pagination";
import * as ko from "knockout";

export function registerPaginationComponent(componentName?: string | null): void {
    const name = componentName ?? "pagination";
    ko.components.register(name, {
        viewModel: {
            createViewModel: (params: IPaginationParameters) => new Pagination(params),
        },
        template: require("./pagination.html"),
    });
}
