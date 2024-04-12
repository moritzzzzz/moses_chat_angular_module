import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MosesChatGuiService {
    constructor() {
        this.apiKey = '<YOUR_API_KEY>';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9zZXMtY2hhdC1ndWkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21vc2VzLWNoYXQtZ3VpL3NyYy9saWIvbW9zZXMtY2hhdC1ndWkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sbUJBQW1CO0lBUzlCO1FBUkEsV0FBTSxHQUFHLHlCQUF5QixDQUFDO1FBQ25DLFFBQUcsR0FBRyx1RUFBdUUsQ0FBQztRQUM5RSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1osa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBRWYsQ0FBQztJQUVoQixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWdCO1FBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsd0NBQXdDO1lBQzlFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDdEIsY0FBYyxFQUNkLG1DQUFtQyxDQUNwQyxDQUFDO1lBQ0YsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUc7b0JBQy9DLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFaEMseUJBQXlCO2dCQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFakIsOEJBQThCO2dCQUM5QixNQUFNLEdBQUcsR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFakIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUk7b0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVyRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUN2QixJQUFJLENBQUMscUJBQXFCLEdBQUcsR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUM7b0JBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLE1BQU07d0JBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzt3QkFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsSUFBSSxJQUFJLEdBQUcsc0JBQXNCLFFBQVEsb0JBQW9CLElBQUksQ0FBQyxNQUFNLFVBQVUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRS9GLElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLElBQUksRUFBRSxDQUFDO2dCQUN4QywwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsMkNBQTJDO2dCQUNsRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO2dCQUVuQyw0REFBNEQ7Z0JBQzVELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDO1lBQ3BDLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLElBQUksV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDN0IsSUFBSSxJQUFJLGlCQUFpQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0E1RFUsbUJBQW1CO2tIQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMvcmVzcG9uc2UuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb3Nlc0NoYXRHdWlTZXJ2aWNlIHtcclxuICBhcGlLZXkgPSAnNjYwNTI4NWNiZTRmNTAuMzg4NzU2NDInO1xyXG4gIHVybCA9ICdodHRwczovL21vc2VzLWFpLmNvbS9tb3Nlc19BSS9kb2N1bWVudGF0aW9uQUkvbW9zZXNBZ2VudENvbm5lY3Rvci5waHAnO1xyXG4gIHN0YXRlID0gJyc7XHJcbiAgY2hvaWNlID0gLTE7XHJcbiAgY2hvaWNlT3B0aW9ucyA9IFtdO1xyXG4gIGNoYXRIaXN0b3J5ID0gJyc7XHJcbiAgY29udGludWVBZnRlclJlc3BvbnNlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgYXN5bmMgc2VuZE1zZyhxdWVzdGlvbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgdGhpcy51cmwsIHRydWUpOyAvLyBhc3luYyA9IHRydWUgLS0+IGFzeW5jaHJvbm91cyByZXF1ZXN0XHJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcclxuICAgICAgICAnQ29udGVudC1UeXBlJyxcclxuICAgICAgICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gICAgICApO1xyXG4gICAgICByZXF1ZXN0Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAvLyBDb25uZWN0aW9uL3NlcnZlciBlcnJvclxyXG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA8IDIwMCB8fCByZXF1ZXN0LnN0YXR1cyA+PSA0MDApXHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KHJlcXVlc3Quc3RhdHVzKTtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgc3RhdGUgYW5kIGNob2ljZVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnJztcclxuICAgICAgICB0aGlzLmNob2ljZSA9IC0xO1xyXG5cclxuICAgICAgICAvLyBwYXJzZSBqc29uIHN0cmluZyB0byBvYmplY3RcclxuICAgICAgICBjb25zdCByZXM6IElSZXNwb25zZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5lcnJvciA9PT0gdHJ1ZSkgcmV0dXJuIHJlamVjdChyZXMuZXJyb3JfbXNnKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5lcnJvcl9tc2cgPT09ICdjaGF0Jykge1xyXG4gICAgICAgICAgdGhpcy5jaGF0SGlzdG9yeSA9IHJlcy5hbnN3ZXI7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzLnN0YXRlO1xyXG4gICAgICAgICAgdGhpcy5jb250aW51ZUFmdGVyUmVzcG9uc2UgPSByZXMuY29udGludWUgPT09IHRydWU7XHJcbiAgICAgICAgICBjb25zdCBhbnN3ZXIgPSB0aGlzLmNoYXRIaXN0b3J5LnNwbGl0KCcjIScpLmF0KC0xKTtcclxuICAgICAgICAgIGlmIChhbnN3ZXIpIHJlc29sdmUoYW5zd2VyKTtcclxuICAgICAgICAgIGVsc2UgcmVqZWN0KCdObyBhbnN3ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsZXQgYm9keSA9IGBzb2x2ZWQ9LTEmcXVlc3Rpb249JHtxdWVzdGlvbn0mbGV2ZWw9MiZhcGlfa2V5PSR7dGhpcy5hcGlLZXl9JnN0YXRlPSR7dGhpcy5zdGF0ZX1gO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY29udGludWVBZnRlclJlc3BvbnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgLy8gY29udGludWUgYWZ0ZXIgcmVzcG9uc2VcclxuICAgICAgICB0aGlzLmNoYXRIaXN0b3J5ID0gJyc7IC8vIHJlc2V0IGNoYXQgaGlzdG9yeSAobWlnaHQgbm90IGJlIHdhbnRlZClcclxuICAgICAgICB0aGlzLmNvbnRpbnVlQWZ0ZXJSZXNwb25zZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBzZW5kIHJlcXVlc3QsIGluZGljYXRlIHJlc3BvbnNlX2NvbnRpbnVhdGlvbiBieSBjaG9pY2U9MTJcclxuICAgICAgICByZXF1ZXN0LnNlbmQoYm9keSArIGAmY2hvaWNlPTEyYCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYm9keSArPSBgJmNob2ljZT0ke3RoaXMuY2hvaWNlfWA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhdEhpc3RvcnkubGVuZ3RoID4gMClcclxuICAgICAgICAgIGJvZHkgKz0gYCZjaGF0X2hpc3Rvcnk9JHt0aGlzLmNoYXRIaXN0b3J5fWA7XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19