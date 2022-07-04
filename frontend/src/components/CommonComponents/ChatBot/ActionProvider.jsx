class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }

   greet = () =>{
    const message = this.createChatBotMessage("¡Hola! ¿Cómo estas?");
    this.addMessageToState(message);
   };



   addMessageToState = (message) => {
       this.setState((prevState) =>({
           ...prevState,
           messages:[...prevState.messages,message],
       }))
   }
   handleRegistrarmeQuiz =()=>{
    const message = this.createChatBotMessage(
        "¡Buena suerte, estamos aquí para ayudarte!",
        {
        widget:"Registrarme",
        }
    );
    this.addMessageToState(message);
    
    }
    handleComprarQuiz =()=>{
      const message = this.createChatBotMessage(
          "¡Tu asistente está aquí para ayudarte!",
          {
          widget:"Comprar",
          }
      );
      this.addMessageToState(message);
      
      }
    handlePagarQuiz =()=>{
      const message = this.createChatBotMessage(
          "¡No te preocupes, estamos aquí para ayudarte!",
          {
          widget:"Pagar",
          }
        );
        this.addMessageToState(message);
        
        }
    
 }
 
 export default ActionProvider;