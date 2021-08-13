import React from "react";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    readStatus: {
        marginRight: 17,
        borderRadius: theme.spacing(2),
        padding: "4px 10px",
        backgroundColor: "#3A8DFF",
        color: "white",
    }
}));

const UnreadMessageNumber = (props) => {
    const classes = useStyles();
    const { unreadMessagesCount } = props.conversation;

    if (unreadMessagesCount >= 1) {
        return <Box className={classes.readStatus}>{unreadMessagesCount}</Box>;
    }
    return null;
}

export default UnreadMessageNumber;