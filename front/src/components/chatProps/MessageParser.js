class MessageParser{
    constructor(actionProvider, state){
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message){
        const lowerCaseMessage = message.toLowerCase();

        if(lowerCaseMessage.includes('home'))
        {
            this.actionProvider.home();
        }
        else if(lowerCaseMessage.includes('inventory')){
            this.actionProvider.inventory();
        }
        else if(lowerCaseMessage.includes('statistics')){
            this.actionProvider.statistics();
        }
        else if(lowerCaseMessage.includes('profile')){
            this.actionProvider.profile();
        }
        else if(lowerCaseMessage.includes('transactions')){
            this.actionProvider.transactions();
        }
        else if(lowerCaseMessage.includes('faq')){
            this.actionProvider.faq();
        }
        else if(lowerCaseMessage.trim() === ""){
            this.actionProvider.vacio();
        }
        else{
            this.actionProvider.noEntender();
        }
        console.log(message);
    }
}

export default MessageParser;