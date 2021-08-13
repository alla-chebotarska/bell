import React from "react";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    readStatus: {
        marginRight: 17,
        borderRadius: theme.spacing(2),
        padding: "4px 10px",
        backgroundColor: theme.palette.primary.main,
        color: "white",
    }
}));

const UnreadMessageNumber = (props) => {
    const classes = useStyles();
    const { unreadMessagesCount } = props.conversation;

    return (
        <div>
            {unreadMessagesCount > 0 && <Box className={classes.readStatus}>{unreadMessagesCount}</Box>}
        </div>
    );
}

export default UnreadMessageNumber;