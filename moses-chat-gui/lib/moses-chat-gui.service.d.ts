import * as i0 from "@angular/core";
export declare class MosesChatGuiService {
    apiKey: string;
    url: string;
    state: string;
    choice: number;
    choiceOptions: never[];
    chatHistory: string;
    continueAfterResponse: boolean;
    constructor();
    sendMsg(question: string): Promise<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MosesChatGuiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MosesChatGuiService>;
}
