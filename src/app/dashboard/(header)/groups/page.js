"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useNextStep } from "nextstepjs";
import MyGroupsViewer from "@/components/groups/MyGroupsViewer/MyGroupsViewer";
import TagsGenerator from "@/components/inputs/TagsGenerator/TagsGenerator";
import SearchBar from "@/components/inputs/SearchBar/SearchBar";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import GroupsContainer from "@/components/groups/GroupsContainer/GroupsContainer";
import { useCreateGroupModal } from "@/components/structure/ModalProviders";

function Groups() {
  const { setCreateGroupModal, createGroupModal } = useCreateGroupModal();

  const { currentStep, setCurrentStep } = useNextStep();

  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(createGroupModal);
  return (
    <div className={`page`}>
      <main className={"main"}>
        <div className={styles.layer}>
          <div
            className={`box ${styles.box}`}
            style={{ "--text-color": "#000000" }}
          >
            <MyGroupsViewer />
          </div>
        </div>
        <div className={styles.layer}>
          <div className={`box ${styles.box}`}>
            <div className={styles.header}>
              <div className={styles.headerItem} id={styles.tags}>
                <TagsGenerator tags={tags} setTags={setTags} />
              </div>
              <div className={styles.headerItem} id={styles.searchBar}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
              <div
                className={styles.headerItem}
                id={styles.createGroupBtn}
                data-tutorial={23}
              >
                <BlobBtn
                  onClick={() => {
                    console.log(setCreateGroupModal);
                    setCreateGroupModal((prev) => !prev);
                    if (currentStep === 23) {
                      setCurrentStep(24);
                    }
                  }}
                >
                  + Create new group
                </BlobBtn>
              </div>
            </div>
            <GroupsContainer searchQuery={searchQuery} tags={tags} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Groups;
