import React, {useEffect} from "react";
import Faq from "react-faq-component";
import fblogo from "../imagenes/fb.png";
import walogo from "../imagenes/wa.png";
import mailogo from "../imagenes/mail.png";
import "../css/FAQ.css";
import {IntlProvider,FormattedMessage} from 'react-intl';
import localeEsMessages from '../local/FAQEs.json';
import localeZhMessages from '../local/FAQZh.json';

// Contenido del FAQ

let data = {
    title:  "",

    rows: [
        {
            title: "How can I add a new product?",
            content: 'To add a product just go to the inventory section and click on "Add".',
        },
        {
            title: "How many Stores can I have? ",
            content:
                "There is no maximum on the number of stores that you can have in The Box.",
        },
        {
            title: "If an employee resigns, can I remove him?  ",
            content: "Yes, you can remove an employee whenever you want.",
        },
        {
            title: "Why are you so cool?",
            content: "I don't know, programmers",
        },
    ],
};
if(!navigator.language.startsWith("en")){
  if(navigator.language.startsWith("es")){
    data = {
      title:  "",
  
      rows: [
          {
              title: "¿Cómo puedo agregar un nuevo producto?",
              content: 'Para agregar un nuevo producto tienes que ir a la pestaña de inventario. Desde allí podras agregar un nuevo producto con el botón "Añadir producto"',
          },
          {
              title: "¿Cuántas tiendas puedo tener? ",
              content:
                  "No existe un máximo de tiendas en The Box, puedes tener todas las tiendas que quieras",
          },
          {
              title: "Si un empleado renunció ¿Cómo puedo removerlo?",
              content: "Para remover un empleado tienes que ir a tu perfil. Una vez estes alli te aparecerá la lista de todos los empleados con los que cuentas.  Cada empleado tendrá un botón eliminar",
          },
          {
              title: "¿Por qué son tan cool?",
              content: "No lo sé",
          },
      ],
      };
  } 
  else{
    data = {
      title:  "",
  
      rows: [
          {
              title: "如何添加新产品？",
              content: '要添加新产品，您必须转到库存标签。在这里，您可以使用“添加产品”按钮添加新产品',
          },
          {
              title: "¿我可以有几家商店? ",
              content:
                  "The Box没有最大数量的商店，您可以拥有所有想要的商店",
          },
          {
              title: "如果员工辞职，我该如何解雇他？",
              content: "要删除员工，您必须转到您的个人资料。到达那里后，将显示您拥有的所有员工的列表。每个员工都有一个删除按钮",
          },
          {
              title: "他们为什么这么酷？",
              content: "我不知道",
          },
      ],
      };

  }
}
//Estilo del FAQ
const styles = {
    //bgColor: rgb(221, 167, 95), 
    //titleTextColor: "blue",
    //rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};
//Configuracion del FAQ
const config = {
    animate: true,
    //arrowIcon: "",
    tabFocus: true
};
//Componente para la visualizacion de FAQ
function FAQ(){
  let messages ={"Null":"null"};
  if(!navigator.language.startsWith("en")){
    if(navigator.language.startsWith("es")){
      messages = localeEsMessages;
    }
    else{
      messages = localeZhMessages;
    }
  }
    useEffect(() => {
        refreshErr();
    })
    return (
        <IntlProvider locale={navigator.language} messages ={messages} >
        <div className="container-fluid justify-content-center contenedor col-8">
            <h1 className="headerAzul2"><FormattedMessage id= "Title" defaultMessage="Frequently Asked Questions"/> </h1>
            <Faq data={data} styles={styles} config={config} />
            <p className="headerAzul2 contact-US"><FormattedMessage id= "Extra" defaultMessage="Didn't get what you wanted?"/></p>
            <div className="container-fluid justify-content-center text-center contenedor">
                <p className="headerAzul2 contact-US"><FormattedMessage id= "Contact" defaultMessage="Contact Us!"/></p>

                <a
                  className="colorBox"
                  href="https://www.facebook.com/andres.rojas.1297/"
                  target="_blank"
                  aria-label="Find more info at our facebook page"
                >
                  <img src={fblogo} className="logo" alt="Facebook logo"></img>
                </a>
                <a
                  className="colorBox"
                  href="mailto:thebox_inventario@outlook.com"
                  target="_blank"
                  aria-label="Find more info at our mail page"
                >
                  <img src={mailogo} className="logo" alt="Facebook logo"></img>
                </a>
                <a
                  className="colorBox"
                  href="https://api.whatsapp.com/send?phone=3002164037"
                  target="_blank"
                  aria-label="Find more info at our whatsapp"
                >
                  <img src={walogo} className="logo" alt="Facebook logo"></img>
                </a>
              </div>
            
            
            {refreshErr()}

        </div>
        </IntlProvider>       
    );
}

function refreshErr() {
    let section = document.getElementsByClassName("styles_row-body__1NvUo");
    if(section[0]){
        section[0].removeAttribute("role");
    }
    



    let ayuda = document.getElementsByClassName(
      "styles_faq-row__2YF3c"
    );
    for (let index = 0; index < ayuda.length; index++) {
      ayuda[index].setAttribute("aria-label", "section"+index);
      ayuda[index].removeAttribute("role");
      let ayuda2 = ayuda[index].children;
      for (let j = 0; j < ayuda2.length; j++) {
        ayuda2[j].setAttribute("aria-label", "section"+index+""+j+"");
        ayuda2[j].removeAttribute("role");
      }

    }
  } 
export default FAQ; 