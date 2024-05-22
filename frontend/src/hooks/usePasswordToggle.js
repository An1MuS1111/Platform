import { useState } from "react";

const usePasswordToggle = () => {
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => setVisibility(visibility => !visibility);

    const Icon = <img src={visibility ? "images/hide.png" : "images/view.png"} height="20px" width="20px" alt="Show/Hide Password" onClick={toggleVisibility} />


    const InputType = (visibility ? "text" : "password");

    return { Icon, InputType };
};

export default usePasswordToggle;


// I don't get it. why this code not working