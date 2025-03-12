"use client";

import { useContext, useRef, useState } from "react";
import styles from "./SearchUsersModal.module.css";
import SearchBar from "@/components/inputs/SearchBar/SearchBar";
import DraggableModal from "../DraggableModal/DraggableModal";
import { SearchUsersModalContext } from "@/components/structure/ModalProviders";
import SearchUsers from "@/components/users/SearchUsers/SearchUsers";

export default function SearchUsersModal() {
  const { searchUsersModal, setSearchUsersModal } = useContext(
    SearchUsersModalContext
  );
  const [searchQuery, setSearchQuery] = useState("");

  const modalRef = useRef(null);

  return (
    <div className={styles.SearchUsersModal}>
      <DraggableModal
        isOpen={searchUsersModal?.opened}
        setIsOpen={() => {
          setSearchUsersModal((prev) => ({ ...prev, opened: false }));
        }}
        refProp={modalRef}
      >
        <div className={`${styles.inner}`}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <SearchUsers
            searchQuery={searchQuery}
            onClick={searchUsersModal.onClick}
          />
        </div>
      </DraggableModal>
    </div>
  );
}
