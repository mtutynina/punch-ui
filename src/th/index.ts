import { ITableHeadItemParameters, TableHeadItem } from "./table-head-item";
import * as ko from "knockout";

export function registerTableHeadcomponent(componentName?: string | null) {
    const name = componentName ?? "th-sortable";
    ko.components.register(name, {
        template: require("./table-head-item.html"),
        viewModel: {
            createViewModel: (params: ITableHeadItemParameters, componentInfo: ko.components.ComponentInfo) => {
                const model = new TableHeadItem(params);
                const element = componentInfo.element;
                ko.applyBindingsToNode(element, { click: model.sortTable.bind(model) }, model);
                return model;
            },
        },
    });
}
