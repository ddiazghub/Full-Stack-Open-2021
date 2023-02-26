import React, { useImperativeHandle, useState } from "react";

type TogglableRef = React.RefObject<{ toggleVisibility: () => void }>;

interface ITogglableProps {
    buttonLabel: string,
    children: React.ReactNode,
    ref?: TogglableRef
}

const Togglable = React.forwardRef((props: ITogglableProps): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisibility = () => setVisible(!visible);
    
    useImperativeHandle(props.ref, () => ({ toggleVisibility }));

    return (
        <div>
            {visible ? props.children : null}
            <button onClick={toggleVisibility}>{visible ? "cancel" : props.buttonLabel}</button>
        </div>
    );
});

export default Togglable;