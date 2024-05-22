import { useState } from "react";

const usePasswordToggle = (props) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(visible => !visible);

    const Icon = visible ? "images/hide.png" : "images/view.png"


    const InputType = (visible ? "text" : "password");

    return { Icon, InputType, toggleVisibility };
};

export { usePasswordToggle }