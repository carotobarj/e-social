import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./chatComponents/Options/Option";
import Quiz from "./chatComponents/Quizzes/Quizz";
import React from "react";

const config = {
    botName: "E-SOCIAL, tu ChatBot",
    
  initialMessages: [createChatBotMessage(`Hola Booker, bienvenido, soy tu asistente ¿en qué puedo ayudarte?`, {
      widget: "opciones",
  })],
  
  widgets:[
      {
          widgetName:"opciones",
          widgetFunc: (props) => <Options {...props} />,
      },
      {
        widgetName:"Registrarme",
        widgetFunc: (props) => <Quiz {...props} />,
        props: {
            questions:[
            { question : "¿No sabés cómo registrarte?",
              answer: "Debes apretar el botón login, luego hacer click en el botón 'Registrarme' e ingresar tus datos.",
              id: 1,
            },
            {
              question : "¿Querés registrarte con Google?",
              answer: "Debes apretar el botón LOGIN, luego el botón 'Registrarme con Google'. ",
              id: 2,  
          },
            {
                question : "¿Ya te registraste y no podes ingresar?",
                answer: "Debes apretar el botón Ingresar o Ingresar con Google, si seguís teniendo problemas envianos un correo a mejorpfenlahistoria@gmail.com",
                id: 3,  
            },
            
              
          ]
        }
      },{
        widgetName:"Comprar",
        widgetFunc: (props) => <Quiz {...props} />,
        props: {
                  questions:[
                  { question : "¿Tengo que loguearme para poder comprar?",
                    answer: "Si, es necesario ser usuario de E-SOCIAL para poder comprar cualquier libro de la plataforma.",
                    id: 4,
                  },
                  {
                      question : "¿Querés comprar y no podés?",
                      answer: "Para poder hacerlo debes contar con una cuenta en E-SOCIAL, si seguis sin poder hacerlo contactate con nosotros enviando un correo a la cuenta: mejorpfenlahistoria@gmail.com.",
                      id: 5,  
                  },
                  {
                    question : "¿Puedo comprar si soy menor de edad?",
                    answer: "No, deberías pedirle a algun adulto que lo haga por vos.",
                    id: 6,  
                }
        ]
      }},
      {
        widgetName:"Pagar",
        widgetFunc: (props) => <Quiz {...props} />,
        props: {
                  questions:[
                  { question : "¿No sabés cómo podés pagar tus compras?",
                    answer:  "Es fácil y rápido, podes hacerlo mediante cualquier tarjeta a tráves de la plataforma online. ",
                    id: 7,
                  },
                  {
                      question : "¿Con qué medios puedo abonar?",
                      answer:"Podés utilizar tarjetas de crédito o débito. ",
                      id: 8,  
                  },
                  {
                    question : "¿Puedo pagar por transferencia bancaria, Rapipago o efectivo?",
                    answer: "No, solo acepta la plataforma tarjetas de crédito o débito Visa, Mastercard o Amex. ",
                    id: 9,  
                },
                  {
                    question : "¿Tuviste un problema con el pago?",
                    answer: "Escribinos a mejorpfenlahistoria@gmail.com",
                    id: 10,  
                }
        ]
      }},
]

}

export default config

