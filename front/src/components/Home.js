import React, { useEffect, useState } from "react";
import logo from "../imagenes/thebox3.png";
import Carousel from "react-bootstrap/Carousel";
import TextField from "@material-ui/core/TextField";
import theJSON from "../local/home.json";

export default function Home() {
  const [langJSON, setLangJSON] = useState(() => theJSON["en"]);
  const [localLang, setLocalLang] = useState(() => navigator.language);

  useEffect(() => {
    if (navigator.language.startsWith("es")) {
      setLangJSON(theJSON["es"]);
    } else if (navigator.language.startsWith("zh")) {
      setLangJSON(theJSON["zh"]);
    }
  }, [localLang]);

  return (
    <div>
      <section id="About" className="sectionAmarillo">
        <div className="container-fluid p-3">
          <h1 className="headerAzul" tabIndex="0">
            {langJSON.about}
          </h1>
          <div className="row">
            <div className="col-sm-4 rounded">
              <img id="boxPhoto" src={logo} alt="THEBOX image logo" />
            </div>
            <div className="col-sm-8">
              <p className="regularText">{langJSON.aboutText}</p>
            </div>
          </div>
        </div>
        <Carousel className="carrouselItem">
          <Carousel.Item interval={6000}>
            <div className="w-100 text-center carrouselItem">
              <img
                className="fluid-img carrouselImg"
                src="https://cdn.pixabay.com/photo/2019/09/17/18/52/barbershop-4484297_960_720.jpg"
                alt="An image of a barbershop"
              />
            </div>

            <Carousel.Caption>
              <h2 className="azul rounded">{langJSON.carrouselHeading1}</h2>
              <p className="azul rounded">{langJSON.carrouselText1}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={7500}>
            <div className="w-100 text-center carrouselItem">
              <img
                className="fluid-img carrouselImg"
                src="https://cdn.pixabay.com/photo/2019/11/05/01/48/antiques-4602523_960_720.jpg"
                alt="An image of many wood items and handcrafts"
              />
            </div>
            <Carousel.Caption>
              <h2 className="azul rounded">{langJSON.carrouselHeading2}</h2>
              <p className="azul rounded">{langJSON.carrouselText2}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={6000}>
            <div className="w-100 text-center carrouselItem">
              <img
                className="fluid-img carrouselImg"
                src="https://cdn.pixabay.com/photo/2017/09/12/12/01/wool-2742119_960_720.jpg"
                alt="An image of many wool colors"
              />
            </div>
            <Carousel.Caption>
              <h2 className="azul rounded">{langJSON.carrouselHeading3}</h2>
              <p className="azul rounded">{langJSON.carrouselText3}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <section id="SatisfiedClients" className="sectionAmarillo">
        <div className="container-fluid">
          <h1 className="headerAzul" tabIndex="0">
            {langJSON.satisfied}
          </h1>
          <p className="regularText">{langJSON.satisfiedText}</p>
          <h2>{langJSON.satisfiedSubtitle}</h2>
          <div className="row justify-content-center">
            <div className="column">
              <div className="overlaying">
                <img
                  src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419_960_720.jpg"
                  alt="Image of Steven Stever, a happy customer"
                />
                <h3 className="overlayed rounded"> Steven Stever</h3>
                <p className="overlayed_description rounded">
                  {langJSON.stevenText}
                </p>
              </div>
              <div className="overlaying">
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/14/23/07/confident-3082818_960_720.jpg"
                  alt="Image of Ann Anner, a happy customer"
                />
                <h3 className="overlayed rounded"> Ann Anner</h3>
                <p className="overlayed_description rounded">
                  {langJSON.annText}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="overlaying">
                <img
                  src="https://cdn.pixabay.com/photo/2020/05/14/12/37/barber-5194406_960_720.jpg"
                  alt="Image of Gustaf G, a happy customer owner of a barbershop"
                />
                <h3 className="overlayed rounded"> Gustaf G</h3>
                <p className="overlayed_description rounded">
                  {langJSON.gustafText}
                </p>
              </div>
              <div className="overlaying">
                <img
                  src="https://cdn.pixabay.com/photo/2016/02/19/11/23/women-1209678_960_720.jpg"
                  alt="Image of Marie and Sophie, a happy customer"
                />
                <h3 className="overlayed rounded"> Marie and Sophie</h3>
                <p className="overlayed_description rounded">
                  {langJSON.mariesophieText}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="overlaying">
                <img
                  src="https://cdn.pixabay.com/photo/2019/12/17/17/09/woman-4702060_960_720.jpg"
                  alt="Image of Catherine C, a happy customer"
                />
                <h3 className="overlayed rounded"> Catherine C</h3>
                <p className="overlayed_description rounded">
                  {langJSON.catherineText}
                </p>
              </div>
              <div className="overlaying">
                <img
                  src="https://cdn.pixabay.com/photo/2018/07/25/08/58/business-3560917_960_720.jpg"
                  alt="Image of Alexandra, a happy customer owner of a cafe"
                />
                <h3 className="overlayed rounded"> Alexandra</h3>
                <p className="overlayed_description rounded">
                  {langJSON.alexandra}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="Rate" className="sectionAmarillo">
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-12">
              <h1 className="headerAzul" tabIndex="0">
                {langJSON.rateUs}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="regularText">{langJSON.rateUsText}</p>
            </div>
          </div>
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder={langJSON.rateUsName}
                  aria-label="Name"
                ></input>
              </div>

              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder={langJSON.rateUsMail}
                  aria-label="Mail"
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <p>{langJSON.rateUsComments}</p>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  aria-label="Stars"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div>
  <p>{langJSON.rateUsRating}</p>
                <div className="oscuro">
                  <p className="clasificacion">
                    <input
                      id="radio1"
                      type="radio"
                      name="estrellas"
                      value="5"
                      aria-label="Stars"
                    ></input>
                    <label className="estrella" htmlFor="radio1">
                      ★
                    </label>
                    <input
                      id="radio2"
                      type="radio"
                      name="estrellas"
                      value="4"
                      aria-label="Stars"
                    ></input>
                    <label htmlFor="radio2" className="estrella">
                      ★
                    </label>
                    <input
                      id="radio3"
                      type="radio"
                      name="estrellas"
                      value="3"
                      aria-label="Stars"
                    ></input>
                    <label htmlFor="radio3" className="estrella">
                      ★
                    </label>
                    <input
                      id="radio4"
                      type="radio"
                      name="estrellas"
                      value="2"
                      aria-label="Stars"
                    ></input>
                    <label htmlFor="radio4" className="estrella">
                      ★
                    </label>
                    <input
                      id="radio5"
                      type="radio"
                      name="estrellas"
                      value="1"
                      aria-label="Stars"
                    ></input>
                    <label htmlFor="radio5" className="estrella">
                      ★
                    </label>
                  </p>
                </div>
              </div>
            </div>
            <input type="submit" value={langJSON.rateUsSubmit} aria-label="Envio" />
          </form>
        </div>
      </section>
      <section id="Members" className="sectionAmarillo">
        <div className="container-fluid p-3">
          <h1 className="headerAzul" tabIndex="0">
            {langJSON.members}
          </h1>
          <p className="regularText">
            {langJSON.membersText}
          </p>
          <ul>
            <li className="regularText">David Guillermo Fonseca Ramírez</li>
            <li className="regularText">Andres Felipe Rojas Pinzón</li>
            <li className="regularText">Maria Clara Noguera Echeverri</li>
            <li className="regularText">Santiago Estupiñan Romero</li>
            <li className="regularText">Juan Sebastian González Rojas</li>
            <li className="regularText">Juan Esteban Cañizarez Ortiz</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
