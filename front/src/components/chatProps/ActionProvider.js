class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }

    home(){
        const message = "Home is a section of our web page that describes the objectives of our application and what are the benefits that small businesses can have when using our website. It also describes what types of businesses can be benefited and some customer reviews that have given us the opportunity. Finally, name each of the team members and how to contact us. Take a look and we will surely convince you ;)";
        const homeMessage = this.createChatBotMessage(message);
        this.updateChatbotState(homeMessage);
    }

    inventory(){
        const message = "Inventory is a section of our web page where you can add, delete or modify a product. You must consider you would be able to delete a product if thw product's quantity is zero."
        const inventoryMessage = this.createChatBotMessage(message);
        this.updateChatbotState(inventoryMessage);
    }

    statistics(){
        const message = "Statistics is a section where you can see how many products the business has, how many actualizations exists and you could check the statistics of the store, how much have the business sold and when did it happened and finally what kind of trasactions the employees did.";
        const statisticsMessage = this.createChatBotMessage(message);
        this.updateChatbotState(statisticsMessage);
    }

    profile(){
        const message = "Profile shows the information of the person who see it. If you are the owner you would be able to see the information of the employee you have, your own information and the information of your business."
        const profileMessage = this.createChatBotMessage(message);
        this.updateChatbotState(profileMessage);
    }

    transactions(){
        const message = "Transactions shows the information of each modification that employees did, such as: Type, Date, Employee, Modification and NIT. In this section the employees or the owner can modify the quantity of each product and for each modification define the type of the transaction";
        const transactionMessage = this.createChatBotMessage(message);
        this.updateChatbotState(transactionMessage);
    }

    faq(){
        const message = "In the FAQ section you could find the most common asked questions, so if you cant resolve a doubt with me, you should take a look to this part."
        const faqMessage = this.createChatBotMessage(message);
        this.updateChatbotState(faqMessage);
    }

    vacio(){
        const message = "You must write something to get an answer";
        const vacioMessage = this.createChatBotMessage(message);
        this.updateChatbotState(vacioMessage);
    }

    noEntender(){
        const message = "Sorry but i only know all the information about Home, Invetory, Satistics, Transactions, Profile, and FAQ sections so ask me only for this information"
        const noEntenderMessage = this.createChatBotMessage(message);
        this.updateChatbotState(noEntenderMessage);
    }

    updateChatbotState(message){
        this.setState(prevState => ({
            ...prevState, messages:[...prevState.messages, message]
        }));
    };
  }
  
  export default ActionProvider;