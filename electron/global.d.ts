import {CanMessage} from "@fklab/candongle-interface";

declare global {
    interface Window {
        electron: {
            goOnBus: () => void;
            goOffBus: () => void;
            setCanMsgCallback: (callback: (msg: CanMessage) => void) => void;
        };
    }
}

export {};
