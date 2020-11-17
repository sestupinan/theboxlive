import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/stylePasswordStrength.css";

const PasswordStrength = (props) => {
    const passwordLvl2Msg=(param) =>{
        if (param<=2){
            return "Weak";
        }else if (param<=4){
            return "Getting better";
        }else if (param<=6){
            return "Strong";
        }else if (param>=7){
            return "Very Strong";
        }
    }
    const [myClassName, setMyClassName] = useState("progress-bar bg-danger w-25");
    const theClassName=(param) =>{
        if (param<=2){
            setMyClassName("progress-bar bg-danger w-25")
        }else if (param<=4){
            setMyClassName("progress-bar bg-secondary w-50")
        }else if (param<=6){
            setMyClassName("progress-bar strong w-75")
        }else if (param<=7){
            setMyClassName("progress-bar verystrong w-100")
        }
    }
    useEffect(()=>{theClassName(props.percentage)},[props.percentage]);
  return (
    <div className="progress passwordStrength">
      <div
        className={myClassName}
        role="progressbar"
        aria-valuenow="50"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {passwordLvl2Msg(props.percentage)}
      </div>
    </div>
  );
};

export default PasswordStrength;
