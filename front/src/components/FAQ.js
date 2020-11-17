import React, {useEffect} from "react";
import Faq from "react-faq-component";
import fblogo from "../imagenes/fb.png";
import walogo from "../imagenes/wa.png";
import mailogo from "../imagenes/mail.png";
import "../css/FAQ.css";

// Contenido del FAQ
const data = {
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
            content: <p>I don't know, programmers</p>,
        },
    ],
};
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
    return (
        <div className="justify-content-center">
            <h1 className="headerAzul2">Frequently Asked Questions</h1>
            <Faq data={data} styles={styles} config={config} />
            <h3 className="headerAzul2">Didn't get what you wanted?</h3>
            <div className="justify-content-center text-center">
                <p className="headerAzul2 contact-US">Contact Us!</p>
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