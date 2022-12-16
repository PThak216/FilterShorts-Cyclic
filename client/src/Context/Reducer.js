export const LikesReducer = async (state, action) => {
  switch (action.type) {
    case "Like":
      await fetch("/likevalue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });
      return action.payload;

    case "UnLike":
      await fetch("/unlikevalue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });
      return action.payload;

    case "FOLLOW":
      await fetch("/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fusername: action.payload,
        }),
      });

      return action.payload;

    case "UNFOLLOW":
      await fetch("/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          unfusername: action.payload,
        }),
      });

      return action.payload;

    case "Bookmark":
      await fetch("/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });

      return action.payload;
    case "UnBookmark":
      await fetch("/removebookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });
      return action.payload;

    default:
      return state;
  }
};

export const topicsReducer = (state, action) => {
  switch (action.type) {
    case "search":
      return { ...state, query: action.payload };

    default:
      return state;
  }
};
