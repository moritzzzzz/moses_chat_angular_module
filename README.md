# Moses Chat Gui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Use the library package locally in external project

1. **Copy** `moses-chat-gui` folder somewhere you want (e.g. `C:/repos/moses-chat-gui`)
2. **Add Dependenies to your project in which you want to integrate the library:**

```json
"@fortawesome/angular-fontawesome": "^0.14.1",
"@fortawesome/fontawesome-svg-core": "^6.5.2",
"@fortawesome/free-regular-svg-icons": "^6.5.2",
"@fortawesome/free-solid-svg-icons": "^6.5.2"
```

4. **Copy** content of `modes-chat-gui/assets` into `assets` of your project
5. **Run** `npm install` in your project
6. **Implementation example:**

_app.component.html_:

```html
<lib-moses-chat-gui></lib-moses-chat-gui>
```

_app.component.ts_:

```ts
import { MosesChatGuiComponent } from "../../../repos/moses-chat-gui";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MosesChatGuiComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
```

## Configure the Chat GUI for agent and appearance
### Agent
To point the chat GUI to an agent, identified by an `api_key` change the following 2 files.

Exchange `<YOUR_API_KEY>` by the api key identifying your Moses Agent.

- `moses_chat_gui\dist\moses-chat-gui\fesm2022\moses-chat-gui.mjs`
- `moses_chat_gui\moses_chat_gui\dist\moses-chat-gui\esm2022\lib\moses-chat-gui.service.mjs`

### Appearance
Change the `Customer` field, to label the chat GUI to your brand by changing the following 2 files:

- `moses_chat_gui\moses_chat_gui\dist\moses-chat-gui\fesm2022\moses-chat-gui.mjs`
- `moses_chat_gui\moses_chat_gui\dist\moses-chat-gui\esm2022\components\chat\chat.component.mjs`
