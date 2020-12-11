import { createChatBotMessage } from "react-chatbot-kit";
import theJSON from "../../local/chat.json";

var langJSON = theJSON["en"];
        if(navigator.language === "es"){
            langJSON = theJSON["es"]
        }else if(navigator.language === "zh"){
            langJSON = theJSON["zh"]
        }

const config = {
  initialMessages: [createChatBotMessage(langJSON.welcolme)]
}

export default config

