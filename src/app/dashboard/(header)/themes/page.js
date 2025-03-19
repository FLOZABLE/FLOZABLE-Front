"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import CreateThemeModal from "@/components/modals/CreateThemeModal/CreateThemeModal";
import ThemePreview from "@/components/themes/ThemePreview/ThemePreview";
import ThemeContainer from "@/components/themes/ThemeContainer/ThemeContainer";
import TagsGenerator from "@/components/inputs/TagsGenerator/TagsGenerator";
import SearchBar from "@/components/inputs/SearchBar/SearchBar";
import DropDownButton from "@/components/buttons/DropDownButton/DropDownButton";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import ThemesContainer from "@/components/themes/ThemesContainer/ThemesContainer";
import { ThemesContext } from "@/components/structure/Providers";

function Themes() {
  const { themes } = useContext(ThemesContext);

  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOpt, setSortOpt] = useState(0);
  const [isCreateThemeModal, setIsCreateThemeModal] = useState(false);
  const [rankedThemes, setRankedThemes] = useState([]);
  const [isThemePreview, setIsThemePreview] = useState(false);

  useEffect(() => {
    if (!themes) return;

    const newThemes = JSON.parse(JSON.stringify(themes));
    newThemes.sort((a, b) => b.likes.length - a.likes.length);
    setRankedThemes(newThemes.slice(0, 4));
  }, [themes]);

  return (
    <div className={`page`}>
      <main className="main">
        <CreateThemeModal
          isOpen={isCreateThemeModal}
          setIsOpen={setIsCreateThemeModal}
        />
        <ThemePreview
          isActive={isThemePreview}
          setIsActive={setIsThemePreview}
        />
        <div className={styles.layer}>
          <div className={`box`}>
            <div className="header">
              <h2>Theme of the Week!</h2>
            </div>
            {rankedThemes.length ? (
              <Swiper
                modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
                navigation={true}
                effect="coverflow"
                coverflowEffect={{
                  rotate: -15,
                  stretch: 1,
                  depth: 100,
                  slideShadows: false,
                }}
                spaceBetween={30}
                pagination={{ clickable: true }}
                slidesPerView={3}
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                speed={500}
                loop={true}
                className={styles.swiper}
              >
                {rankedThemes.map((theme, i) => {
                  return (
                    <SwiperSlide className={styles.Slide} key={i}>
                      <ThemeContainer
                        isSearched={true}
                        key={i}
                        theme={theme}
                        setIsThemePreview={setIsThemePreview}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : null}
          </div>
          <div className={`box`}>
            <div className={styles.header}>
              <TagsGenerator tags={tags} setTags={setTags} />
              <SearchBar
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
              <div>
                <BlobBtn
                  onClick={() => {
                    setIsCreateThemeModal(!isCreateThemeModal);
                  }}
                >
                  <p id={styles.uploadThemeText}>+ Upload theme!</p>
                </BlobBtn>
              </div>
              <DropDownButton
                options={[
                  { value: 0, name: "Sort By: Likes" },
                  { value: 1, name: "Sort By: Usage" },
                ]}
                setValue={setSortOpt}
                value={sortOpt}
              />
            </div>
            <div className="contents customScroll">
              <ThemesContainer
                tags={tags}
                searchQuery={searchQuery}
                sortOpt={sortOpt}
                setIsThemePreview={setIsThemePreview}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Themes;
