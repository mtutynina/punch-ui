import { registerPaginationComponent } from "./pagination";

export { registerPaginationComponent } from "./pagination";
export { overrideConfiguration } from "./shared/config";

export function registerComponents(): void {
    registerPaginationComponent();
}
