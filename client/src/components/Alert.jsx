import React from "react";
import cn from "classnames";
import { Alert } from "react-bootstrap";

import store from "../store";
import alertAction from "../store/actions/alert.action";

const MessageAlert = ({ severity, message }) => {
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(!open);
        }, 4000);
        if (!open) {
            store.dispatch(alertAction.clear());
        }
        return () => {
            clearTimeout(timer);
        };
    }, [open]);

    const alertHandler = () => setOpen(!open);

    const classAlert = cn({
        'danger': severity === 'error',
        'warning': severity === 'warning',
        'info': severity === 'info',
        'success': severity === 'success'
    });

    return (
      <Alert variant={classAlert} show={open} onClose={alertHandler} dismissible>
          {message}
      </Alert>
    )
}

export default MessageAlert;
