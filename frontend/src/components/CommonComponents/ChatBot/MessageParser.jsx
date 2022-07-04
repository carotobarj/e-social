class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
      parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();

      if(lowercase.includes("hola")){
          this.actionProvider.greet();
      }

      if(lowercase.includes("registrarme"|| "quiero registrarme"||"registarme")){
        this.actionProvider.handleRegistrarmeQuiz();
      }
      if(lowercase.includes("pagar"|| "pago"||"pagos")){
        this.actionProvider.handlePagarQuiz();
    }
    if(lowercase.includes("comprar"|| "compraste"||"compra"||"quiero comprar"||"cómo comprar"||"compra"||"no puedo comprar")){
      this.actionProvider.handleComprarQuiz();
  }
  }
}
  
  export default MessageParser;