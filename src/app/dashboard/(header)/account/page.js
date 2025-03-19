"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCamera,
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
  LogoSpotify,
} from "@/components/others/Svgs";
import SpotifyAuthBtn from "@/components/buttons/SpotifyAuthBtn/SpotifyAuthBtn";
import ExtensionSetting from "@/components/extension/ExtensionSetting/ExtensionSetting";

function Account() {
  const { accountData, updateUserInfo } = useAccount();

  const { accountGoogleData } = useAccountGoogle();
  const { spotifyInfo } = useSpotifyInfo();

  const [imageSrc, setImageSrc] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    verified: false,
  });

  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

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
      await patchAccountPassword(password);
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
        <div className="box">
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
          {accountData ? (
            <div id={styles.welcome}>
              <h2>Welcome, {accountData.name}</h2>
            </div>
          ) : null}
        </div>
        <div className="box">
          <div
            className={`BoxContainer ${styles.boxContainer}`}
            id={styles.profile}
          >
            <div className="Box">
              <div className="header">Profile</div>
              <div className={styles.name}>
                <LineInput
                  title={"Name"}
                  value={profile.name}
                  setValue={(name) => {
                    setProfile((prev) => ({ ...prev, name }));
                  }}
                  type={"text"}
                />
              </div>
              <div className={styles.emails}>
                <LineInput
                  title={"Email"}
                  value={profile.email}
                  setValue={(email) => {
                    setProfile((prev) => ({ ...prev, email }));
                  }}
                  type={"email"}
                />
                <LineInput
                  title={"Confirm Email"}
                  value={profile.confirmEmail}
                  setValue={(confirmEmail) => {
                    setProfile((prev) => ({ ...prev, confirmEmail }));
                  }}
                  type={"email"}
                />
              </div>
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
          </div>
          <div className={`BoxContainer ${styles.boxContainer}`}>
            <div className="Box">
              <div className="header">Password</div>
              <div className={styles.Passwords}>
                <LineInput
                  title={"Password"}
                  value={password.password}
                  setValue={(password) => {
                    setPassword((prev) => ({ ...prev, password }));
                  }}
                  type={"password"}
                />
                <LineInput
                  title={"Confirm Password"}
                  value={password.confirmPassword}
                  setValue={(confirmPassword) => {
                    setPassword((prev) => ({ ...prev, confirmPassword }));
                  }}
                  type={"password"}
                />
                <div className={styles.passwordDescription}>
                  <h3>Password requirements</h3>
                  <ul>
                    <li> One special characters</li>
                    <li> Minimum 6 characters</li>
                  </ul>
                </div>
              </div>
              <div className={styles.buttons}>
                <BlobBtn onClick={submitPassword}>Submit</BlobBtn>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className={`BoxContainer ${styles.boxContainer}`}>
            <div className="Box">
              <div className="header">
                <h3>Manage Subjects</h3>
              </div>
              <SubjectsManager />
            </div>
          </div>
        </div>
        <div className="box">
          <div className={`BoxContainer ${styles.boxContainer}`}>
            <div className="Box">
              <div className={styles.chromeContainer}>
                <div className={`header ${styles.header}`}>
                  <a
                    href="https://chromewebstore.google.com/detail/flozable-tab-monitor/cmbdaanokelibhphiidlikongdoandlj"
                    target="_blank"
                  >
                    <h3>Chrome Extension</h3>
                    <i>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </i>
                  </a>
                </div>
                <p>Set up and manage your chrome extension</p>
              </div>
              <ExtensionSetting websites={websites} setWebsites={setWebsites} />
            </div>
          </div>
        </div>
        <div className="box">
          <div className={`BoxContainer ${styles.boxContainer}`}>
            <div className="Box">
              <div className="header">
                <h3>Accounts</h3>
              </div>
              <div className={styles.AccountExplain}>
                <p>Manage your integration settings</p>
              </div>
              <div className={styles.appWrapper}>
                <div className={styles.app} id="googleCalendar">
                  <div className={styles.icon}>
                    <IconGoogleCalendar />
                  </div>
                  <div className={styles.description}>
                    {!accountGoogleData?.scopes?.some((scope) =>
                      scope.includes("calendar")
                    ) ? (
                      <p>
                        You haven&apos;t connected your Google Calendar yet or
                        you aren&apos;t authorized. Please authorize our
                        application to access your Google Calendar by signing in
                        with your Google account here.
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
                <div className={styles.app} id="Youtube">
                  <div className={styles.icon}>
                    <IconYoutube />
                  </div>
                  <div className={styles.description}>
                    {!accountGoogleData?.scopes?.some((scope) =>
                      scope.includes("youtube")
                    ) ? (
                      <p>
                        You haven&apos;t connected your YouTube Account yet or
                        you aren&apos;t authorized. Please authorize our
                        application to access your YouTube Playlists here.
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
                <div className={styles.app}>
                  <div className={styles.icon}>
                    <LogoSpotify />
                  </div>
                  <div className={styles.description}>
                    {!spotifyInfo ? (
                      <p>
                        You haven&apos;t connected your Spotify Account yet or
                        you aren&apos;t authorized. Please authorize our
                        application to access your Spotify Playlists here.
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
        </div>
      </main>
    </div>
  );
}

export default Account;
