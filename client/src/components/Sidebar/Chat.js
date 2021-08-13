import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { setActiveChat } from "../../store/activeConversation";
import { postRead } from "../../store/utils/thunkCreators";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import UnreadMessageNumber from "./UnreadMessageNumber";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    await props.markMessagesAsRead(conversation);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      <UnreadMessageNumber conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markMessagesAsRead: (conversation) => {
      dispatch(postRead(conversation));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
