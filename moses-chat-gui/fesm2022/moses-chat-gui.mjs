import * as i0 from '@angular/core';
import { Injectable, Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as i3 from '@angular/forms';
import { FormsModule } from '@angular/forms';

class MosesChatGuiService {
    constructor() {
        this.apiKey = '6605285cbe4f50.38875642';
        this.url = 'https://moses-ai.com/moses_AI/documentationAI/mosesAgentConnector.php';
        this.state = '';
        this.choice = -1;
        this.choiceOptions = [];
        this.chatHistory = '';
        this.continueAfterResponse = false;
    }
    async sendMsg(question) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', this.url, true); // async = true --> asynchronous request
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.onload = () => {
                // Connection/server error
                if (request.status < 200 || request.status >= 400)
                    return reject(request.status);
                // reset state and choice
                this.state = '';
                this.choice = -1;
                // parse json string to object
                const res = JSON.parse(request.response);
                console.log(res);
                if (res.error === true)
                    return reject(res.error_msg);
                if (res.error_msg === 'chat') {
                    this.chatHistory = res.answer;
                    this.state = res.state;
                    this.continueAfterResponse = res.continue === true;
                    const answer = this.chatHistory.split('#!').at(-1);
                    if (answer)
                        resolve(answer);
                    else
                        reject('No answer');
                }
            };
            let body = `solved=-1&question=${question}&level=2&api_key=${this.apiKey}&state=${this.state}`;
            if (this.continueAfterResponse === true) {
                // continue after response
                this.chatHistory = ''; // reset chat history (might not be wanted)
                this.continueAfterResponse = false;
                // send request, indicate response_continuation by choice=12
                request.send(body + `&choice=12`);
            }
            else {
                body += `&choice=${this.choice}`;
                if (this.chatHistory.length > 0)
                    body += `&chat_history=${this.chatHistory}`;
                request.send(body);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MosesChatGuiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MosesChatGuiService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MosesChatGuiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

class MessageComponent {
    constructor() {
        this.isLoadIndicator = false;
        this.message = '';
        this.isAnswer = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.3", type: MessageComponent, isStandalone: true, selector: "lib-moses-message", inputs: { isLoadIndicator: "isLoadIndicator", message: "message", isAnswer: "isAnswer" }, ngImport: i0, template: "<div class=\"msg-container\" [ngClass]=\"{'answer': isAnswer}\">\r\n  <img *ngIf=\"isAnswer\" src=\"/assets/molog512.png\" alt=\"Moses Logo\">\r\n  <div *ngIf=\"!isLoadIndicator\" class=\"msg\">{{ message }}</div>\r\n  <div *ngIf=\"isLoadIndicator\" class=\"msg answer load-indicator\">\r\n    <svg version=\"1.1\" id=\"L7\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\r\n      y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\r\n      <path fill=\"#fff\" d=\"M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3\r\n  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z\">\r\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" dur=\"2s\" from=\"0 50 50\"\r\n          to=\"360 50 50\" repeatCount=\"indefinite\" />\r\n      </path>\r\n      <path fill=\"#fff\" d=\"M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7\r\n  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z\">\r\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" dur=\"1s\" from=\"0 50 50\"\r\n          to=\"-360 50 50\" repeatCount=\"indefinite\" />\r\n      </path>\r\n      <path fill=\"#fff\" d=\"M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5\r\n  L82,35.7z\">\r\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" dur=\"2s\" from=\"0 50 50\"\r\n          to=\"360 50 50\" repeatCount=\"indefinite\" />\r\n      </path>\r\n    </svg>\r\n  </div>\r\n</div>", styles: ["@keyframes zoomIn{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.fab-btn{display:block;border-style:solid;border-radius:50%;text-align:center;color:#f0f0f0;box-shadow:0 0 4px #00000024,0 4px 8px #00000047;cursor:pointer;transition:scale .1s ease-out;background:#42a5f5;padding:0;animation:zoomIn .4s ease-in-out}.fab-btn>fa-icon{font-size:2em;line-height:1em}.fab-btn:hover{scale:1.3}.msg-container{display:flex;flex-direction:row-reverse;gap:5px;padding:5px 5px 0;margin:0;animation:zoomIn .3s ease-out}.answer{flex-direction:row}.answer>div{background:#42a5f5;color:#fff}img{width:40px;height:40px}.msg{background:#dfdfdf;color:#4b4b4b;padding:8px 10px;max-width:60%;display:block;word-wrap:break-word;border-radius:3px;clear:both;z-index:999}.answer-container{flex-direction:row}.load-indicator{line-height:0}.load-indicator>svg{width:24px;height:24px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-moses-message', standalone: true, imports: [CommonModule], template: "<div class=\"msg-container\" [ngClass]=\"{'answer': isAnswer}\">\r\n  <img *ngIf=\"isAnswer\" src=\"/assets/molog512.png\" alt=\"Moses Logo\">\r\n  <div *ngIf=\"!isLoadIndicator\" class=\"msg\">{{ message }}</div>\r\n  <div *ngIf=\"isLoadIndicator\" class=\"msg answer load-indicator\">\r\n    <svg version=\"1.1\" id=\"L7\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\r\n      y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\r\n      <path fill=\"#fff\" d=\"M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3\r\n  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z\">\r\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" dur=\"2s\" from=\"0 50 50\"\r\n          to=\"360 50 50\" repeatCount=\"indefinite\" />\r\n      </path>\r\n      <path fill=\"#fff\" d=\"M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7\r\n  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z\">\r\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" dur=\"1s\" from=\"0 50 50\"\r\n          to=\"-360 50 50\" repeatCount=\"indefinite\" />\r\n      </path>\r\n      <path fill=\"#fff\" d=\"M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5\r\n  L82,35.7z\">\r\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" dur=\"2s\" from=\"0 50 50\"\r\n          to=\"360 50 50\" repeatCount=\"indefinite\" />\r\n      </path>\r\n    </svg>\r\n  </div>\r\n</div>", styles: ["@keyframes zoomIn{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.fab-btn{display:block;border-style:solid;border-radius:50%;text-align:center;color:#f0f0f0;box-shadow:0 0 4px #00000024,0 4px 8px #00000047;cursor:pointer;transition:scale .1s ease-out;background:#42a5f5;padding:0;animation:zoomIn .4s ease-in-out}.fab-btn>fa-icon{font-size:2em;line-height:1em}.fab-btn:hover{scale:1.3}.msg-container{display:flex;flex-direction:row-reverse;gap:5px;padding:5px 5px 0;margin:0;animation:zoomIn .3s ease-out}.answer{flex-direction:row}.answer>div{background:#42a5f5;color:#fff}img{width:40px;height:40px}.msg{background:#dfdfdf;color:#4b4b4b;padding:8px 10px;max-width:60%;display:block;word-wrap:break-word;border-radius:3px;clear:both;z-index:999}.answer-container{flex-direction:row}.load-indicator{line-height:0}.load-indicator>svg{width:24px;height:24px}\n"] }]
        }], propDecorators: { isLoadIndicator: [{
                type: Input
            }], message: [{
                type: Input
            }], isAnswer: [{
                type: Input
            }] } });

class ChatComponent {
    constructor(service) {
        this.service = service;
        this.customer = 'Customer';
        this.startMessage = 'Zu welcher Metrik, welches Connectors haben Sie eine Frage?';
        this.userInput = '';
        this.hasLoggedIn = this.service.chatHistory.length > 0;
        // Icons
        this.paperPlane = faPaperPlane;
        this.arrowRight = faArrowRight;
    }
    onEnter(event) {
        event.preventDefault();
        this.sendMsg();
    }
    sendMsg() {
        if (this.userInput.trim().length === 0)
            return;
        this.showMsg(this.userInput, false);
        this.showLoadIndicator();
        this.service
            .sendMsg(this.userInput)
            .then((answer) => this.setAnswerToLastMsgEl(answer))
            .catch((err) => this.handleError(err));
        this.userInput = '';
    }
    handleError(err) {
        console.error(err);
        this.lastMsg?.destroy();
    }
    showLoadIndicator() {
        this.lastMsg = this.chatEl.createComponent(MessageComponent);
        this.lastMsg.instance.isAnswer = true;
        this.lastMsg.instance.isLoadIndicator = true;
        this.chatEl.element.nativeElement.appendChild(this.lastMsg.location.nativeElement);
        this.scrollToBottom();
    }
    setAnswerToLastMsgEl(answer) {
        const msg = this.lastMsg?.instance;
        if (msg != null) {
            msg.isLoadIndicator = false;
            msg.message = answer;
        }
        this.scrollToBottom();
    }
    showMsg(msg, isAnswer) {
        this.lastMsg = this.chatEl.createComponent(MessageComponent);
        this.lastMsg.instance.isAnswer = isAnswer;
        this.lastMsg.instance.message = msg;
        this.chatEl.element.nativeElement.appendChild(this.lastMsg.location.nativeElement);
        this.scrollToBottom();
    }
    scrollToBottom() {
        setTimeout(() => {
            const chatEl = this.chatEl.element.nativeElement;
            chatEl.scrollTop = chatEl.scrollHeight;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: ChatComponent, deps: [{ token: MosesChatGuiService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.3", type: ChatComponent, isStandalone: true, selector: "lib-moses-chat", inputs: { customer: "customer" }, viewQueries: [{ propertyName: "chatEl", first: true, predicate: ["chatMessages"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<div class=\"chat\">\r\n  <header>\r\n    <img src=\"/assets/molog512.png\" alt=\"Moses Logo\">\r\n    <h3>Personal Assistant</h3>\r\n    <span>{{ customer }}</span>\r\n  </header>\r\n\r\n  <main #chatMessages>\r\n    <div *ngIf=\"!hasLoggedIn\" class=\"login-container\">\r\n      <button (click)=\"hasLoggedIn = true\" class=\"fab-btn\">\r\n        <fa-icon [icon]=\"arrowRight\"></fa-icon>\r\n      </button>\r\n      <p>\r\n        <b>Hilfe ben\u00F6tigt? Chat starten!</b>\r\n        <br>\r\n        Ihre Angaben werden ausschliesslich zur Bearbeitung Ihres Anliegens genutzt. Detaillierte Informationen\r\n        erhalten Sie in unseren\r\n        <br>\r\n      </p>\r\n      <a href=\"https://moses-ai.com/privacy_policy.html\" target=\"_blank\">Datenschutzhinweisen</a>\r\n    </div>\r\n    <lib-moses-message *ngIf=\"hasLoggedIn\" [message]=\"startMessage\" [isAnswer]=\"true\"></lib-moses-message>\r\n  </main>\r\n\r\n  <footer>\r\n    <ng-container *ngIf=\"hasLoggedIn\">\r\n      <textarea (keydown.enter)=\"onEnter($event)\" [(ngModel)]=\"userInput\" placeholder=\"Schreibe hier..\"></textarea>\r\n      <button (click)=\"sendMsg()\">\r\n        <fa-icon [icon]=\"paperPlane\"></fa-icon>\r\n      </button>\r\n    </ng-container>\r\n  </footer>\r\n</div>", styles: ["@keyframes zoomIn{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.fab-btn{display:block;border-style:solid;border-radius:50%;text-align:center;color:#f0f0f0;box-shadow:0 0 4px #00000024,0 4px 8px #00000047;cursor:pointer;transition:scale .1s ease-out;background:#42a5f5;padding:0;animation:zoomIn .4s ease-in-out}.fab-btn>fa-icon{font-size:2em;line-height:1em}.fab-btn:hover{scale:1.3}.chat{width:300px;font-size:12px;line-height:22px;font-family:Montserrat,Helvetica Neue,Helvetica,Arial,\"sans-serif\";font-weight:500;-webkit-font-smoothing:antialiased;border-radius:10px;transition:all .2s ease-in-out;animation:zoomIn .4s ease-in-out;color:#4b4b4b;background:#fdfdfd}.chat>header{font-size:13px;color:#f3f3f3;height:55px;background:#2e2e2d;padding-top:8px;border-radius:10px 10px 0 0;border:1px solid #8f8c8c;border-bottom:none}.chat>header>img{border-radius:50%;width:55px;height:55px;float:left;margin:-30px 20px 10px;border:4px solid rgba(0,0,0,.21)}.chat>header>h3{margin:0}.chat>header>span{opacity:.4}.chat>main{height:300px;border-left:1px solid #8f8c8c;border-right:1px solid #8f8c8c;display:flex;flex-direction:column;overflow-y:auto;padding-bottom:5px}.chat>main>.login-container{align-content:center;padding:0 40px;text-align:center;height:100%}.chat>main>.login-container>button{margin:10px auto 30px;width:40px;height:40px}.chat>main>.login-container>a{margin:20px auto}.chat>footer{height:46px;display:flex;flex-direction:row;align-items:center;align-content:stretch;padding:4px 4px 0 12px;text-align:center;background:#fff;border:1px solid #8f8c8c;border-top:1px solid #eee;border-radius:0 0 10px 10px}.chat>footer>textarea{color:#4b4b4b;resize:none;font-size:13px;font-weight:400;width:100%;border:none;outline:none;font-family:Montserrat,Helvetica Neue,Helvetica,Arial,\"sans-serif\";align-self:end;height:30px}.chat>footer>button{background:none;border:none;font-size:1.8em;color:#bbb;cursor:pointer;padding:10px;transition:all .1s ease-out;transition-delay:20ms}.chat>footer>button:hover{color:#42a5f5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i4.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "spin", "pulse", "mask", "styles", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "classes", "transform", "a11yRole"] }, { kind: "component", type: MessageComponent, selector: "lib-moses-message", inputs: ["isLoadIndicator", "message", "isAnswer"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: ChatComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-moses-chat', standalone: true, imports: [CommonModule, FormsModule, FontAwesomeModule, MessageComponent], template: "<div class=\"chat\">\r\n  <header>\r\n    <img src=\"/assets/molog512.png\" alt=\"Moses Logo\">\r\n    <h3>Personal Assistant</h3>\r\n    <span>{{ customer }}</span>\r\n  </header>\r\n\r\n  <main #chatMessages>\r\n    <div *ngIf=\"!hasLoggedIn\" class=\"login-container\">\r\n      <button (click)=\"hasLoggedIn = true\" class=\"fab-btn\">\r\n        <fa-icon [icon]=\"arrowRight\"></fa-icon>\r\n      </button>\r\n      <p>\r\n        <b>Hilfe ben\u00F6tigt? Chat starten!</b>\r\n        <br>\r\n        Ihre Angaben werden ausschliesslich zur Bearbeitung Ihres Anliegens genutzt. Detaillierte Informationen\r\n        erhalten Sie in unseren\r\n        <br>\r\n      </p>\r\n      <a href=\"https://moses-ai.com/privacy_policy.html\" target=\"_blank\">Datenschutzhinweisen</a>\r\n    </div>\r\n    <lib-moses-message *ngIf=\"hasLoggedIn\" [message]=\"startMessage\" [isAnswer]=\"true\"></lib-moses-message>\r\n  </main>\r\n\r\n  <footer>\r\n    <ng-container *ngIf=\"hasLoggedIn\">\r\n      <textarea (keydown.enter)=\"onEnter($event)\" [(ngModel)]=\"userInput\" placeholder=\"Schreibe hier..\"></textarea>\r\n      <button (click)=\"sendMsg()\">\r\n        <fa-icon [icon]=\"paperPlane\"></fa-icon>\r\n      </button>\r\n    </ng-container>\r\n  </footer>\r\n</div>", styles: ["@keyframes zoomIn{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.fab-btn{display:block;border-style:solid;border-radius:50%;text-align:center;color:#f0f0f0;box-shadow:0 0 4px #00000024,0 4px 8px #00000047;cursor:pointer;transition:scale .1s ease-out;background:#42a5f5;padding:0;animation:zoomIn .4s ease-in-out}.fab-btn>fa-icon{font-size:2em;line-height:1em}.fab-btn:hover{scale:1.3}.chat{width:300px;font-size:12px;line-height:22px;font-family:Montserrat,Helvetica Neue,Helvetica,Arial,\"sans-serif\";font-weight:500;-webkit-font-smoothing:antialiased;border-radius:10px;transition:all .2s ease-in-out;animation:zoomIn .4s ease-in-out;color:#4b4b4b;background:#fdfdfd}.chat>header{font-size:13px;color:#f3f3f3;height:55px;background:#2e2e2d;padding-top:8px;border-radius:10px 10px 0 0;border:1px solid #8f8c8c;border-bottom:none}.chat>header>img{border-radius:50%;width:55px;height:55px;float:left;margin:-30px 20px 10px;border:4px solid rgba(0,0,0,.21)}.chat>header>h3{margin:0}.chat>header>span{opacity:.4}.chat>main{height:300px;border-left:1px solid #8f8c8c;border-right:1px solid #8f8c8c;display:flex;flex-direction:column;overflow-y:auto;padding-bottom:5px}.chat>main>.login-container{align-content:center;padding:0 40px;text-align:center;height:100%}.chat>main>.login-container>button{margin:10px auto 30px;width:40px;height:40px}.chat>main>.login-container>a{margin:20px auto}.chat>footer{height:46px;display:flex;flex-direction:row;align-items:center;align-content:stretch;padding:4px 4px 0 12px;text-align:center;background:#fff;border:1px solid #8f8c8c;border-top:1px solid #eee;border-radius:0 0 10px 10px}.chat>footer>textarea{color:#4b4b4b;resize:none;font-size:13px;font-weight:400;width:100%;border:none;outline:none;font-family:Montserrat,Helvetica Neue,Helvetica,Arial,\"sans-serif\";align-self:end;height:30px}.chat>footer>button{background:none;border:none;font-size:1.8em;color:#bbb;cursor:pointer;padding:10px;transition:all .1s ease-out;transition-delay:20ms}.chat>footer>button:hover{color:#42a5f5}\n"] }]
        }], ctorParameters: () => [{ type: MosesChatGuiService }], propDecorators: { customer: [{
                type: Input
            }], chatEl: [{
                type: ViewChild,
                args: ['chatMessages', { read: ViewContainerRef }]
            }] } });

class MosesChatGuiComponent {
    constructor() {
        this.isVisibleChat = true;
        // Icons
        this.commentAlt = faCommentAlt;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MosesChatGuiComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.3", type: MosesChatGuiComponent, isStandalone: true, selector: "lib-moses-chat-gui", ngImport: i0, template: "<button (click)=\"isVisibleChat = !isVisibleChat\" id=\"prime\" class=\"fab-btn\" aria-label=\"Toggle Moses chat window\">\r\n  <fa-icon [icon]=\"commentAlt\"></fa-icon>\r\n</button>\r\n<lib-moses-chat *ngIf=\"isVisibleChat\"></lib-moses-chat>", styles: ["@keyframes zoomIn{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.fab-btn{display:block;border-style:solid;border-radius:50%;text-align:center;color:#f0f0f0;box-shadow:0 0 4px #00000024,0 4px 8px #00000047;cursor:pointer;transition:scale .1s ease-out;background:#42a5f5;padding:0;animation:zoomIn .4s ease-in-out}.fab-btn>fa-icon{font-size:2em;line-height:1em}.fab-btn:hover{scale:1.3}#prime{position:fixed;right:15px;bottom:15px;pointer-events:auto;width:56px;height:56px;z-index:998}lib-moses-chat{position:fixed;right:85px;bottom:20px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i4.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "spin", "pulse", "mask", "styles", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "classes", "transform", "a11yRole"] }, { kind: "component", type: ChatComponent, selector: "lib-moses-chat", inputs: ["customer"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: MosesChatGuiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-moses-chat-gui', standalone: true, imports: [CommonModule, FontAwesomeModule, ChatComponent], template: "<button (click)=\"isVisibleChat = !isVisibleChat\" id=\"prime\" class=\"fab-btn\" aria-label=\"Toggle Moses chat window\">\r\n  <fa-icon [icon]=\"commentAlt\"></fa-icon>\r\n</button>\r\n<lib-moses-chat *ngIf=\"isVisibleChat\"></lib-moses-chat>", styles: ["@keyframes zoomIn{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.fab-btn{display:block;border-style:solid;border-radius:50%;text-align:center;color:#f0f0f0;box-shadow:0 0 4px #00000024,0 4px 8px #00000047;cursor:pointer;transition:scale .1s ease-out;background:#42a5f5;padding:0;animation:zoomIn .4s ease-in-out}.fab-btn>fa-icon{font-size:2em;line-height:1em}.fab-btn:hover{scale:1.3}#prime{position:fixed;right:15px;bottom:15px;pointer-events:auto;width:56px;height:56px;z-index:998}lib-moses-chat{position:fixed;right:85px;bottom:20px}\n"] }]
        }] });

/*
 * Public API Surface of moses-chat-gui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MosesChatGuiComponent, MosesChatGuiService };
//# sourceMappingURL=moses-chat-gui.mjs.map
