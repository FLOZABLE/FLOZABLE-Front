import React from "react";
import styles from "./SearchUsers.module.css";
import { useDebounce } from "use-debounce";
import { useFriendsSearch } from "@/Hooks/friendsHooks";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import UserContainer from "../UserContainer/UserContainer";
import ChatBtn from "@/components/buttons/ChatBtn/ChatBtn";
import FriendRequestBtn from "@/components/buttons/FriendRequestBtn/FriendRequestBtn";
import RecommendedFriendsViewer from "@/components/friends/RecommendedFriendsViewer/RecommendedFriendsViewer";

function SearchUsers({ searchQuery, onClick }) {
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { friendsSearchData, friendsSearchIsLoading, friendsSearchError } =
    useFriendsSearch(debouncedQuery);

  if (friendsSearchIsLoading) {
    return <CircularLoading />;
  }

  if (friendsSearchError) {
    return null;
  }

  return (
    <div className={`customScroll ${styles.SearchUsers}`}>
      {searchQuery.length >= 2 && !friendsSearchIsLoading ? (
        <p>{friendsSearchData.length} results found</p>
      ) : (
        <RecommendedFriendsViewer />
      )}
      {friendsSearchData.map((userInfo, i) => {
        return (
          <UserContainer
            key={i}
            onClick={() => {
              if (onClick) {
                onClick(userInfo);
              }
            }}
            userInfo={userInfo}
          >
            <div>
              <ChatBtn targetInfo={userInfo} padding={"0.3125rem 0.625rem"} />
            </div>
            <div>
              <FriendRequestBtn
                userInfo={userInfo}
                padding={"0.3125rem 0.625rem"}
              />
            </div>
          </UserContainer>
        );
      })}
    </div>
  );
}

export default SearchUsers;
