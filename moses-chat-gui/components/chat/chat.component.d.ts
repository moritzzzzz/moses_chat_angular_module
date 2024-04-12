import { MosesChatGuiService } from './../../lib/moses-chat-gui.service';
import { ComponentRef, ViewContainerRef } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import * as i0 from "@angular/core";
export declare class ChatComponent {
    private service;
    customer: string;
    startMessage: string;
    chatEl: ViewContainerRef;
    lastMsg?: ComponentRef<MessageComponent>;
    userInput: string;
    hasLoggedIn: boolean;
    paperPlane: import("@fortawesome/fontawesome-common-types").IconDefinition;
    arrowRight: import("@fortawesome/fontawesome-common-types").IconDefinition;
    constructor(service: MosesChatGuiService);
    onEnter(event: Event): void;
    sendMsg(): void;
    private handleError;
    private showLoadIndicator;
    private setAnswerToLastMsgEl;
    showMsg(msg: string, isAnswer: boolean): void;
    private scrollToBottom;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChatComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChatComponent, "lib-moses-chat", never, { "customer": { "alias": "customer"; "required": false; }; }, {}, never, never, true, never>;
}
