export function initialize(enableLogging: boolean): void {
    const onCustomInitialize = function () {
        if (enableLogging) {
            console.log(`Dispatch custom event 'onCustomInitialize'`);
        }

        const event = new Event("onCustomInitialize");
        document.dispatchEvent(event);
    };

    setTimeout(onCustomInitialize, 500);
}
