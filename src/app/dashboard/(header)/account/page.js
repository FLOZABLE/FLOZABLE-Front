"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCamera,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAccount, useAccountGoogle } from "@/hooks/accountHooks";
import { useSpotifyInfo } from "@/hooks/playlistHooks";
import {
  patchAccountImage,
  patchAccountInfo,
  patchAccountPassword,
} from "@/apis/accountApi";
import { postAuthVerify } from "@/apis/authApi";
import Image from "next/image";
import config from "@/utils/config";
import LineInput from "@/components/inputs/LineInput/LineInput";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import SubjectsManager from "@/components/subjects/SubjectsManager/SubjectsManager";
import GoogleLoginBtn from "@/components/buttons/GoogleLoginBtn/GoogleLoginBtn";
import {
  IconGoogleCalendar,
  IconYoutube,
  IconSpotify,
} from "@/components/others/Svgs";
import SpotifyAuthBtn from "@/components/buttons/SpotifyAuthBtn/SpotifyAuthBtn";
import ExtensionSetting from "@/components/extension/ExtensionSetting/ExtensionSetting";
import ShowPasswordBtn from "@/components/buttons/ShowPasswordBtn/ShowPasswordBtn";

function Account() {
  const { accountData, updateUserInfo } = useAccount();

  const { accountGoogleData } = useAccountGoogle();
  const { spotifyInfo } = useSpotifyInfo();

  const [imageSrc, setImageSrc] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    verified: false,
  });

  const [password, setPassword] = useState("");

  const [websites, setWebsites] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    if (!accountData) return;
    const { user_id, name, email, verified } = accountData;

    setImageSrc(`${config.static_server}/img/profile-images/${user_id}.jpeg`);
    setProfile({ name, email, confirmEmail: email, verified });
  }, [accountData]);

  const readURL = useCallback((input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);

      reader.onload = (e) => {
        setImageSrc(e.target.result);
        const formData = new FormData();
        formData.append("image", input.files[0]);

        uploadImage(formData);
      };
    }
  }, []);

  const uploadImage = useCallback(async (formData) => {
    try {
      await patchAccountImage(formData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const submitProfile = useCallback(async () => {
    try {
      const { name, email } = profile;
      const response = await patchAccountInfo(profile);
      if (!response.success) return;

      updateUserInfo((prev) => ({
        ...prev,
        name,
        email,
        verified: response.data.verified,
      }));
    } catch (err) {
      console.log(err);
    }
  }, [profile]);

  const submitPassword = useCallback(async () => {
    try {
      //just confirm it since view password is enabled
      await patchAccountPassword({ password, confirmPassword: password });
    } catch (err) {
      console.log(err);
    }
  }, [password]);

  const validateEmail = useCallback(async () => {
    try {
      await postAuthVerify();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={`page`}>
      <main className={"main"}>
        <div className={styles.container}>
          <div className={styles.layer}>
            <div className="box" id={styles.welcome}>
              <div className={styles.imgSelector}>
                <div className={styles.circle}>
                  {imageSrc ? (
                    <Image
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      src={imageSrc}
                      alt=""
                      width={0}
                      height={0}
                    />
                  ) : null}
                </div>
                <div
                  className={styles.pImage}
                  onClick={() => {
                    inputRef.current.click();
                  }}
                >
                  <i className={styles.uploadBtn}>
                    <FontAwesomeIcon icon={faCamera} />
                  </i>
                  <form>
                    <input
                      className={styles.fileUpload}
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={(e) => readURL(e.target)}
                    />
                  </form>
                </div>
              </div>
              {accountData ? <h2>Welcome, {accountData.name}</h2> : null}
            </div>
          </div>
          <div className={styles.layer} id={styles.update}>
            <div className="box">
              <div className="header">
                <h2>Update Profile</h2>
              </div>
              <form action="">
                <LineInput
                  label={"Name"}
                  type={"name"}
                  value={profile.name}
                  setValue={(name) => setProfile((prev) => ({ ...prev, name }))}
                  icon={<FontAwesomeIcon icon={faUser} />}
                />
                <LineInput
                  label={"Email"}
                  type={"email"}
                  value={profile.email}
                  setValue={(email) =>
                    setProfile((prev) => ({ ...prev, email }))
                  }
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                />
              </form>
              <div className={styles.buttons}>
                <BlobBtn onClick={submitProfile}>Submit</BlobBtn>
                <div
                  id={styles.verifyBtn}
                  className={profile.verified ? styles.hidden : ""}
                >
                  <BlobBtn onClick={validateEmail}>Verify Email</BlobBtn>
                </div>
              </div>
            </div>
            <div className={`box`}>
              <div className="header">
                <h2>Update Password</h2>
              </div>
              <form action={""}>
                <div className={styles.passwordInput}>
                  <LineInput
                    type={isShowPassword ? "text" : "password"}
                    label={"Password"}
                    value={password}
                    setValue={(password) => setPassword(password)}
                    icon={<FontAwesomeIcon icon={faLock} />}
                  />
                  <div className={styles.showPasswordBtn}>
                    <ShowPasswordBtn
                      isShowPassword={isShowPassword}
                      setIsShowPassword={setIsShowPassword}
                    />
                  </div>
                </div>
                <div className={styles.passwordDescription}>
                  <h3>Password requirements</h3>
                  <ul>
                    <li> One special characters</li>
                    <li> Minimum 6 characters</li>
                  </ul>
                </div>
              </form>
              <div className={styles.buttons}>
                <BlobBtn onClick={submitPassword}>Submit</BlobBtn>
              </div>
            </div>
          </div>
          <div className={styles.layer}>
            <div className="box">
              <div className="header">
                <h2>Manage Subjects</h2>
              </div>
              <SubjectsManager />
            </div>
          </div>
          <div className={styles.layer}>
            <div className="box">
              <div
                className={`header ${styles.header}`}
                id={styles.centerHeader}
              >
                <a
                  href="https://chromewebstore.google.com/detail/flozable-tab-monitor/cmbdaanokelibhphiidlikongdoandlj"
                  target="_blank"
                >
                  <h2>Chrome Extension</h2>
                  <i>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </i>
                </a>
                <p className={styles.description}>
                  Set up and manage your chrome extension
                </p>
              </div>
              <ExtensionSetting websites={websites} setWebsites={setWebsites} />
            </div>
          </div>
          <div className={styles.layer}>
            <div className="box">
              <div
                className={`header ${styles.header}`}
                id={styles.centerHeader}
              >
                <h2>Accounts</h2>
                <p className="description">Manage your integration settings</p>
              </div>
              <div className={styles.app} id={styles.googleCalendar}>
                <i className={styles.icon}>
                  <IconGoogleCalendar />
                </i>
                <div className={styles.description}>
                  {!accountGoogleData?.scopes?.some((scope) =>
                    scope.includes("calendar")
                  ) ? (
                    <p>
                      You haven&apos;t connected your Google Calendar yet or you
                      aren&apos;t authorized. Please authorize our application
                      to access your Google Calendar by signing in with your
                      Google account here.
                    </p>
                  ) : (
                    <p>
                      {`You've successfully connected your Google Calendar! Our app now has access to your calendar events, allowing you to seamlessly integrate your schedule with our platform.`}
                    </p>
                  )}
                </div>
                <div className={styles.authBtn}>
                  <GoogleLoginBtn
                    scope={
                      "email profile https://www.googleapis.com/auth/calendar"
                    }
                    required="calendar"
                  />
                </div>
              </div>
              <div className={styles.app} id={styles.youtube}>
                <i className={styles.icon}>
                  <IconYoutube />
                </i>
                <div className={styles.description}>
                  {!accountGoogleData?.scopes?.some((scope) =>
                    scope.includes("youtube")
                  ) ? (
                    <p>
                      You haven&apos;t connected your YouTube Account yet or you
                      aren&apos;t authorized. Please authorize our application
                      to access your YouTube Playlists here.
                    </p>
                  ) : (
                    <p>
                      {`Your YouTube account is now connected! You can now access your playlists directly within our app to enhance your experience with personalized content.`}
                    </p>
                  )}
                </div>
                <div className={styles.authBtn}>
                  <GoogleLoginBtn
                    scope="https://www.googleapis.com/auth/youtube.readonly"
                    required="youtube"
                  />
                </div>
              </div>
              <div className={styles.app} id={styles.spotify}>
                <i className={styles.icon}>
                  <IconSpotify />
                </i>
                <div className={styles.description}>
                  {!spotifyInfo ? (
                    <p>
                      You haven&apos;t connected your Spotify Account yet or you
                      aren&apos;t authorized. Please authorize our application
                      to access your Spotify Playlists here.
                    </p>
                  ) : (
                    <p>
                      Spotify is successfully connected! Enjoy your playlists
                      within our app and set the perfect mood for your tasks.
                    </p>
                  )}
                </div>
                <div className={styles.authBtn}>
                  <SpotifyAuthBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Account;
