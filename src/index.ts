import { registerPaginationComponent } from "./pagination/index";

export { registerPaginationComponent } from "./pagination/index";
export { overrideConfiguration, ComponentsConfigurationOverride } from "./shared/config";

export interface RegistrationConfiguration {
    paginationComponentName?: string;
}

export function registerComponents(config?: RegistrationConfiguration): void {
    const paginationName = config ? config.paginationComponentName : null;
    registerPaginationComponent(paginationName);
}
