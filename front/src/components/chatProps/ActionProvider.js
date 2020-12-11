import theJSON from "../../local/chat.json";
import React, { useEffect, useState } from "react";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.langJSON = theJSON["en"];
        if(navigator.language === "es"){
            this.langJSON = theJSON["es"]
        }else if(navigator.language === "zh"){
            this.langJSON = theJSON["zh"]
        }
    }

    home() {

        const message = this.langJSON.home;
        const homeMessage = this.createChatBotMessage(message);
        this.updateChatbotState(homeMessage);
    }

    inventory() {
        const message = this.langJSON.inventory;
        const inventoryMessage = this.createChatBotMessage(message);
        this.updateChatbotState(inventoryMessage);
    }

    statistics() {
        const message = this.langJSON.statistics;
        const statisticsMessage = this.createChatBotMessage(message);
        this.updateChatbotState(statisticsMessage);
    }

    profile() {
        const message = this.langJSON.profile;
        const profileMessage = this.createChatBotMessage(message);
        this.updateChatbotState(profileMessage);
    }

    transactions() {
        const message = this.langJSON.transactions;
        const transactionMessage = this.createChatBotMessage(message);
        this.updateChatbotState(transactionMessage);
    }

    faq() {
        const message = this.langJSON.faq;
        const faqMessage = this.createChatBotMessage(message);
        this.updateChatbotState(faqMessage);
    }

    vacio() {
        const message = this.langJSON.vacio;
        const vacioMessage = this.createChatBotMessage(message);
        this.updateChatbotState(vacioMessage);
    }

    noEntender() {
        const message = this.langJSON.noEntender;
        const noEntenderMessage = this.createChatBotMessage(message);
        this.updateChatbotState(noEntenderMessage);
    }

    updateChatbotState(message) {
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }));
    };
}

export default ActionProvider;