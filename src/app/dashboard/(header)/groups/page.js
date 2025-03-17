"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useNextStep } from "nextstepjs";
import MyGroupsViewer from "@/components/groups/MyGroupsViewer/MyGroupsViewer";
import TagsGenerator from "@/components/inputs/TagsGenerator/TagsGenerator";
import SearchBar from "@/components/inputs/SearchBar/SearchBar";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import GroupsContainer from "@/components/groups/GroupsContainer/GroupsContainer";

function Groups() {
  const { currentStep, setCurrentStep } = useNextStep();

  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateNewGroup, setIsCreateNewGroup] = useState(false);

  return (
    <div className={`page`}>
      <main className={"main"}>
        <div className={styles.layer}>
          <div
            className={`box ${styles.boxContainer}`}
            style={{ "--textColor": "#000000" }}
          >
            <MyGroupsViewer />
          </div>
        </div>
        <div className={styles.layer}>
          <div className={`BoxContainer ${styles.boxContainer}`}>
            <div className={styles.header}>
              <div className={styles.headerItem} id={styles.Tags}>
                <TagsGenerator tags={tags} setTags={setTags} />
              </div>
              <div className={styles.headerItem} id={styles.SearchBar}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
              <div
                className={styles.headerItem}
                id={styles.CreateGroup}
                data-tutorial={23}
              >
                <BlobBtn
                  onClick={() => {
                    setIsCreateNewGroup(!isCreateNewGroup);
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
