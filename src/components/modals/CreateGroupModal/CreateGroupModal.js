"use client";

import React, { useCallback, useState } from "react";
import styles from "./CreateGroupModal.module.css";
import { putGroup } from "@/apis/groupsApi";
import { useGroups } from "@/hooks/groupsHook";
import { useAccount } from "@/hooks/accountHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { ACTIVE_GROUP_DEBOUNCE, DEFAULT_GROUP } from "@/utils/constants";
import DraggableModal from "../DraggableModal/DraggableModal";
import ModalLayer from "../ModalLayer/ModalLayer";
import CustomInput from "@/components/inputs/CustomInput/CustomInput";
import TextEditor from "@/components/inputs/TextEditor/TextEditor";
import ColorPalette from "@/components/inputs/ColorPalette/ColorPalette";
import SliderAnimation from "@/components/inputs/SliderAnimation/SliderAnimation";
import TagsGenerator from "@/components/inputs/TagsGenerator/TagsGenerator";
import OptionToggleBtn from "@/components/buttons/OptionToggleBtn/OptionToggleBtn";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";

function CreateGroupModal({ isOpen, setIsOpen }) {
  const { updateGroupsData } = useGroups();
  const { updateUserInfo } = useAccount();

  const [newGroup, setNewGroup] = useState(DEFAULT_GROUP);

  const [isSelectColor, setIsSelectColor] = useState(false);

  const submit = useCallback(async () => {
    try {
      const response = await putGroup(newGroup);
      if (!response.success) return;

      const { data } = response;

      setIsOpen(false);
      setNewGroup(DEFAULT_GROUP);

      const groupId = data.group.group_id;
      updateUserInfo((prev) => ({
        ...prev,
        groups: [...prev.groups, groupId],
      }));
      updateGroupsData((prev) => [...prev, data.group]);

      setTimeout(() => {
        MittInstance.emit("moveMyGroupsViewer", { groupId });
      }, ACTIVE_GROUP_DEBOUNCE);

      document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.log(err);
    }
  }, [newGroup]);

  return (
    <div className={styles.CreateGroupModal}>
      <DraggableModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={`${styles.inner} customScroll`}>
          <ModalLayer>
            <CustomInput
              input={newGroup.name}
              handleInput={(e) => {
                const name = e.target.value;
                setNewGroup((prev) => ({ ...prev, name }));
              }}
              placeHolder={"Study Group Name"}
              type={"text"}
            />
          </ModalLayer>
          <ModalLayer hoverText={"Description"}>
            <TextEditor
              setValue={(description) => {
                setNewGroup((prev) => ({ ...prev, description }));
              }}
              value={newGroup.description}
            />
          </ModalLayer>
          <ModalLayer hoverText={"Color"}>
            <ColorPalette
              setSelectedColor={(color) => {
                setNewGroup((prev) => ({ ...prev, color }));
              }}
              selectedColor={newGroup.color}
              isSelectColor={isSelectColor}
              setIsSelectColor={setIsSelectColor}
            />
          </ModalLayer>
          <ModalLayer
            hoverText={"Max Members"}
            icon={<FontAwesomeIcon icon={faUserGroup} />}
          >
            <SliderAnimation
              min={0}
              max={100}
              step={1}
              sliderValue={newGroup.max_members}
              setSliderValue={(max_members) => {
                setNewGroup((prev) => ({ ...prev, max_members }));
              }}
            />
          </ModalLayer>
          <ModalLayer hoverText={"Tags"}>
            <TagsGenerator
              tags={newGroup.tags}
              setTags={(tags) => {
                setNewGroup((prev) => ({ ...prev, tags }));
              }}
              maxTags={10}
            />
          </ModalLayer>
          <ModalLayer hoverText={"Visibility"}>
            <OptionToggleBtn
              opt1={{ val: 0, name: "PRIVATE" }}
              opt2={{ val: 1, name: "PUBLIC" }}
              value={newGroup.visibility}
              setValue={(visibility) => {
                setNewGroup((prev) => ({ ...prev, visibility }));
              }}
              id="80w9er8w9"
            />
            <div
              className={`${styles.inputArea} ${
                newGroup.visibility ? "" : styles.open
              }`}
            >
              <CustomInput
                input={newGroup.password}
                handleInput={(e) => {
                  const password = e.target.value;
                  setNewGroup((prev) => ({ ...prev, password }));
                }}
                placeHolder={"Enter Password"}
                type={"text"}
              />
            </div>
          </ModalLayer>
          <ModalLayer
            icon={<FontAwesomeIcon icon={faStopwatch} />}
            hoverText={"Group's Goal"}
          >
            <SliderAnimation
              min={0}
              max={10}
              step={1}
              sliderValue={newGroup.goal_hr}
              setSliderValue={(goal_hr) => {
                setNewGroup((prev) => ({ ...prev, goal_hr }));
              }}
            />
          </ModalLayer>
          <div className={styles.buttons}>
            <BlobBtn onClick={submit}>SUBMIT</BlobBtn>
          </div>
        </div>
      </DraggableModal>
    </div>
  );
}

export default CreateGroupModal;
