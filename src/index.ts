import { registerPaginationComponent } from "./pagination";
import { registerTableHeadcomponent } from "./th";

export { registerPaginationComponent } from "./pagination";
export { registerTableHeadcomponent } from "./th";
export { ComponentsConfigurationOverride, overrideConfiguration } from "./shared/config";

export interface RegistrationConfiguration {
    paginationComponentName?: string;
    tableHeadComponentName?: string;
}

export function registerComponents(config?: RegistrationConfiguration): void {
    const paginationName = config ? config.paginationComponentName : null;
    registerPaginationComponent(paginationName);

    const thName = config ? config.tableHeadComponentName : null;
    registerTableHeadcomponent(thName);
}
