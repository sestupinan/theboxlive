import Chatbot from 'react-chatbot-kit';
import React from "react";
import "../css/chat.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import ActionProvider from './chatProps/ActionProvider';
import MessageParser from './chatProps/MessageParser';
import config from './chatProps/configChat';
import OutsideClickHandler from 'react-outside-click-handler';
import Icon from '@material-ui/core/Icon';

class Chat extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.debeCerrar = false;
    }


    openSlider = () => {
        document.getElementById('mostrarBoton').id = "ocultoBoton"
        document.getElementById('ocultoChat').id = "mostrarChat"
        this.debeCerrar = true;
    }

    handleClickOutside(event) {
        if (this.debeCerrar && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            document.getElementById('ocultoBoton').id = "mostrarBoton"
            document.getElementById('mostrarChat').id = "ocultoChat"
            this.debeCerrar = false;
        }
    }

    render() {



        return (



            <OutsideClickHandler onOutsideClick={this.handleClickOutside}>
                <div className="App">
                    <Button id="mostrarBoton" onClick={this.openSlider}>
                        CHATBOX
                    </Button>


                    <header id="ocultoChat" className="App-header" ref={this.wrapperRef}>
                        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
                    </header>

                </div>
            </OutsideClickHandler>




        );
    };


}






export default Chat;