"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClipboard,
  faDownLeftAndUpRightToCenter,
  faHeadphones,
  faHome,
  faHourglass,
  faImage,
  faMusic,
  faPhone,
  faUpRightAndDownLeftFromCenter,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useNextStep } from "nextstepjs";
import YouTubePlayer from "@/components/youtube/YouTubePlayer/YouTubePlayer";
import PlansTimeline from "@/components/plans/PlansTimeline/PlansTimeline";
import SubjectTimer from "@/components/study/SubjectTimer/SubjectTimer";
import VideoCallController from "@/components/study/VideoCallController/VideoCallController";
import AudioController from "@/components/study/AudioController/AudioController";
import PlaylistModal from "@/components/modals/PlaylistModal/PlaylistModal";
import ThemeSelector from "@/components/themes/ThemeSelector/ThemeSelector";
import MyGroupsViewer from "@/components/groups/MyGroupsViewer/MyGroupsViewer";
import StudyTimelineBar from "@/components/charts/StudyTimelineBar/StudyTimelineBar";
import ChatModalBtn from "@/components/buttons/ChatModalBtn/ChatModalBtn";
import { exitFullscreen } from "@/utils/tools";

function StudyOption({ onClick, children, hoverText, tutorial }) {
  return (
    <div
      className={styles.studyOption}
      onClick={onClick ?? onClick}
      data-tutorial={tutorial}
    >
      {children}
      <div className={`hoverText ${styles.hoverText}`}>{hoverText}</div>
    </div>
  );
}

function StudyModalContainer({
  children,
  id,
  isVisible,
  setStudyOptions,
  headerPosition = "top",
}) {
  return (
    <div
      className={`${styles.StudyModalContainer} ${
        isVisible ? styles.visible : ""
      }`}
      id={styles[id]}
      style={{ flexDirection: headerPosition === "left" ? "row" : "column" }}
    >
      <div className={styles.header}>
        <i
          onClick={() => {
            setStudyOptions((prev) => ({ ...prev, [id]: false }));
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </i>
      </div>
      {children}
    </div>
  );
}

function Study() {
  const router = useRouter();
  const { currentStep, setCurrentStep, isNextStepVisible } = useNextStep();

  const [studyOptions, setStudyOptions] = useState({
    planner: true,
    timer: true,
    groups: true,
    playlists: false,
    audioController: true,
    media: false,
    themeSelector: false,
    zoom: false,
    timeline: true,
  });

  const [videoId, setVideoId] = useState("YQc4WT0yDH4");
  const [volume, setVolume] = useState(0);
  const [link, setLink] = useState([]);

  const handleLinkInput = useCallback(() => {
    setLink(e.target.value);
  }, []);

  const toggleStudyOption = useCallback((key) => {
    setStudyOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  useEffect(() => {
    if (studyOptions.zoom) {
      document.body.requestFullscreen();
    } else {
      exitFullscreen();
    }

    return () => {
      exitFullscreen();
    };
  }, [studyOptions.zoom]);

  useEffect(() => {
    if (currentStep === 13) {
      setTimeout(() => {
        setCurrentStep(14);
      }, 5000);
    }
  }, [currentStep]);

  return (
    <div className={styles.Study}>
      <div className={styles.ytBg} style={{ backgroundColor: videoId }}>
        {videoId[0] !== "#" ? (
          <YouTubePlayer
            height={"100vh"}
            width={"100vw"}
            videoId={videoId}
            volume={volume}
          />
        ) : null}
      </div>
      <div className={styles.studyOptions} data-tutorial={13}>
        <StudyOption
          onClick={() => {
            toggleStudyOption("timer");
          }}
          hoverText={"Timer"}
        >
          <i>
            <FontAwesomeIcon icon={faHourglass} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("planner");
          }}
          hoverText={"Planner"}
        >
          <i>
            <FontAwesomeIcon icon={faClipboard} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("groups");
          }}
          hoverText={"Groups"}
        >
          <i>
            <FontAwesomeIcon icon={faUsers} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("media");
          }}
          hoverText={"Media"}
        >
          <i>
            <FontAwesomeIcon icon={faPhone} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("audioController");
          }}
          hoverText={"Audio"}
        >
          <i>
            <FontAwesomeIcon icon={faHeadphones} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("playlists");
          }}
          hoverText={"Playlists"}
        >
          <i>
            <FontAwesomeIcon icon={faMusic} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("themeSelector");
          }}
          hoverText={"Themes"}
        >
          <i>
            <FontAwesomeIcon icon={faImage} />
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("zoom");
          }}
          hoverText={"Zoom"}
        >
          <i>
            {studyOptions.zoom ? (
              <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
            ) : (
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            )}
          </i>
        </StudyOption>
        <StudyOption
          onClick={() => {
            toggleStudyOption("timeline");
          }}
          hoverText={"Timeline"}
        >
          <i>
            <FontAwesomeIcon icon={faCalendar} />
          </i>
        </StudyOption>
        <StudyOption hoverText={"Chat"}>
          <ChatModalBtn />
        </StudyOption>
        <StudyOption
          onClick={() => {
            if (isNextStepVisible && currentStep === 13) return;
            if (currentStep === 14) {
              router.push("/dashboard/stats");
              return;
            }
            router.push("/dashboard");
          }}
          hoverText={"Home"}
          tutorial={14}
        >
          <i>
            <FontAwesomeIcon icon={faHome} />
          </i>
        </StudyOption>
      </div>
      <StudyModalContainer
        isVisible={studyOptions.timer}
        id={"timer"}
        setStudyOptions={setStudyOptions}
      >
        <SubjectTimer />
      </StudyModalContainer>
      <StudyModalContainer
        isVisible={studyOptions.planner}
        id={"planner"}
        setStudyOptions={setStudyOptions}
      >
        <PlansTimeline
          viewDate={new Date(new Date().setHours(0, 0, 0, 0))}
          viewer={"day"}
          maxHeight="calc(50vh)"
        />
      </StudyModalContainer>
      <StudyModalContainer
        isVisible={studyOptions.media}
        id={"media"}
        setStudyOptions={setStudyOptions}
      >
        <VideoCallController />
      </StudyModalContainer>
      <StudyModalContainer
        isVisible={studyOptions.audioController}
        id={"audioController"}
        setStudyOptions={setStudyOptions}
      >
        <AudioController themeVolume={volume} setThemeVolume={setVolume} />
      </StudyModalContainer>
      <StudyModalContainer
        isVisible={studyOptions.playlists}
        id={"playlists"}
        setStudyOptions={setStudyOptions}
      >
        <PlaylistModal />
      </StudyModalContainer>
      <StudyModalContainer
        isVisible={studyOptions.themeSelector}
        id={"themeSelector"}
        setStudyOptions={setStudyOptions}
      >
        <ThemeSelector
          link={link}
          handleLinkInput={handleLinkInput}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </StudyModalContainer>
      <StudyModalContainer
        isVisible={studyOptions.groups}
        id={"groups"}
        setStudyOptions={setStudyOptions}
      >
        <MyGroupsViewer />
      </StudyModalContainer>
      <div className={styles.StudyTimelineBar}></div>
      <StudyModalContainer
        headerPosition="left"
        isVisible={studyOptions.timeline}
        id={"timeline"}
        setStudyOptions={setStudyOptions}
      >
        <StudyTimelineBar />
      </StudyModalContainer>
    </div>
  );
}

export default Study;
