import React from "react";
import logo from "../imagenes/thebox3.png";
import Carousel from "react-bootstrap/Carousel";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <section id="About" className="sectionAmarillo">
          <div className="container-fluid p-3">
            <h1 className="headerAzul">About</h1>
            <div className="row">
              <div className="col-sm-4">
                <img id="boxPhoto" src={logo} alt="boxImage" />
              </div>
              <div className="col-sm-8">
                <p className="regularText">
                  THEBOX is a tool that allows micro-entrepreneurs to
                  efficiently manage their inventory in an intuitive way and
                  without the need for any add-ons. This application will be
                  able to carry out an analysis of the inventory flow to make
                  business decisions, be aware of the company's data, make easy
                  modifications and will have other basic functionalities such
                  as: product registration, personalized categorization and
                  updates of the storage infrastructure.
                </p>
              </div>
            </div>
          </div>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2019/09/17/18/52/barbershop-4484297_960_720.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="azul">BARBERSHOPS OR HAIRDRESSINGS</h3>
                <p className="azul">
                  Here every small item, every machine, chair or table can be
                  stored. If something is missing you will know when and who was
                  in charge
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2019/11/05/01/48/antiques-4602523_960_720.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 className="azul">ANY ITEM</h3>
                <p className="azul">
                  You will register any type of item, it doesn't matter the
                  color or size. We will tell you where it is, how much has it
                  sold and much more!
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2017/09/12/12/01/wool-2742119_960_720.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 className="azul">ANY QUANTITY</h3>
                <p className="azul">
                  As we like to say, "THEBOX will be as big as you need it to
                  be" no worries about how many items and categories you can fit
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        <section id="Members" className="sectionAmarillo">
          <div className="container-fluid p-3">
            <h1 className="headerAzul">Members</h1>
            <p className="regularText">
              We are six Systems and Computation Engineering students from the
              Universidad de los Andes. We are a very organized team, which is
              always watching over the development and maintenance of the
              application. Feel free to send us any feedback or question through
              our contact section. We are:
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
}
