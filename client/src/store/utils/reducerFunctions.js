import moment from "moment";

export const AddSortedMessagesToStore = (conversations) => {
  const compareMessages = (m1, m2) => moment(m1.createdAt) - moment(m2.createdAt);
  conversations.forEach(conversation => conversation.messages.sort(compareMessages));
  conversations.forEach(conversation => {
    conversation.unreadMessagesCount = countUnreadMessages(conversation);
  })
  return conversations;
}

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadMessagesCount = countUnreadMessages(newConvo);
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.unreadMessagesCount = countUnreadMessages(convoCopy);
      return convoCopy;
    } else {
      return convo;
    }
  });
};

const countUnreadMessages = (conversation) => {
  let count = 0;
  conversation.messages.forEach(message => {
    if (!message.isRead && message.senderId === conversation.otherUser.id) {
      count++;
    }
  });
  return count;
}

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo }
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const markMessagesAsReadInStore = (state, conversation) => {
  return state.map((convo) => {
    if (convo.id === conversation.id) {
      const convoCopy = { ...convo }
      convoCopy.messages.forEach(message => {
        if (!message.isRead && message.senderId === convoCopy.otherUser.id) {
          message.isRead = true;
        }
      });
      convoCopy.unreadMessagesCount = countUnreadMessages(convoCopy);
      return convoCopy;
    } else {
      return convo;
    }
  });
}