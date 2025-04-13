import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ExtensionSetting.module.css";
import { useExtensionSettings } from "@/hooks/extensionHooks";
import {
  patchExtensionSetting,
  putExtensionSetting,
} from "@/apis/extensionApi";
import { useRouter, useSearchParams } from "next/navigation";
import LineInput from "@/components/inputs/LineInput/LineInput";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import SimpleToggleBtn from "@/components/buttons/SimpleToggleBtn/SimpleToggleBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function ExtensionSetting() {
  const { extensionSettings, extensionSettingsIsLoading } =
    useExtensionSettings();

  const [url, setUrl] = useState("");
  const [settings, setSettings] = useState([]);

  const extensionRef = useRef(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!extensionSettings?.success) return;

    setSettings(extensionSettings.data.settings);
  }, [extensionSettings]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const websiteDomain = searchParams.get("website");
    if (!websiteDomain) return;
    newSearchParams.delete("website");

    const element = document.getElementById(
      websiteDomain.replaceAll(/\./g, "_")
    );

    setTimeout(() => {
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      router.replace(
        `${document.location.pathname}?${newSearchParams.toString()}`,
        {
          scroll: false,
        }
      );
    }, 500);
  }, [settings, searchParams]);

  const onSubmitUrl = useCallback(() => {
    (async () => {
      const response = await putExtensionSetting(url);
      if (response.success) {
        const { setting, domain } = response.data;
        setSettings((prev) => [...prev, setting]);
        setUrl("");

        setTimeout(() => {
          const section = document.querySelector(
            `#${domain.replaceAll(/\./g, "_")}`
          );
          if (!section) return;
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    })();
  }, [url]);

  const settingUpdate = useCallback(
    async (website, mode, value) => {
      try {
        const response = await patchExtensionSetting({ website, mode, value });
        if (!response.success) return;

        const settingIndex = settings.findIndex(
          (setting) => setting.website === website
        );
        if (settingIndex === -1) return;
        const newSettings = [...settings];
        newSettings[settingIndex][mode] = value;
        setSettings(newSettings);
      } catch (err) {
        console.log(err);
      }
    },
    [settings]
  );

  return (
    <div className={styles.ExtensionSetting}>
      <div>
        <div className={styles.inputContainer}>
          <LineInput
            label={"Enter the website URL to manage access while studying."}
            value={url}
            setValue={setUrl}
            type={"text"}
            onEnter={(val) => onSubmitUrl(val)}
            icon={<FontAwesomeIcon icon={faLink} />}
          />
          <div id={styles.submitBtn}>
            <BlobBtn
              onClick={() => {
                onSubmitUrl(url);
              }}
            >
              Add
            </BlobBtn>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.extensionHeader}>
          <div>Websites</div>
          <div>Block</div>
          <div>Block when studying</div>
          <div>Timer</div>
          <div>Timer when studying</div>
        </div>
        <ul ref={extensionRef}>
          {extensionSettingsIsLoading ? (
            <CircularLoading />
          ) : !extensionSettings?.success ? null : (
            settings.map((setting, i) => {
              const { website, timer, study_timer, block, study_block } =
                setting;
              return (
                <li
                  className={styles.websiteOptions}
                  key={i}
                  id={website.replaceAll(/\./g, "_")}
                >
                  <div>
                    <p>{website}</p>
                  </div>
                  <div>
                    <SimpleToggleBtn
                      checked={block}
                      onToggle={() => {
                        settingUpdate(website, "block", !block);
                      }}
                      id={`${website}-block`}
                    />
                  </div>
                  <div>
                    <SimpleToggleBtn
                      checked={study_block}
                      onToggle={() => {
                        settingUpdate(website, "study_block", !study_block);
                      }}
                      id={`${website}-study_block`}
                    />
                  </div>
                  <div>
                    <SimpleToggleBtn
                      checked={timer}
                      onToggle={() => {
                        settingUpdate(website, "timer", !timer);
                      }}
                      id={`${website}-timer`}
                    />
                  </div>
                  <div>
                    <SimpleToggleBtn
                      checked={study_timer}
                      onToggle={() => {
                        settingUpdate(website, "study_timer", !study_timer);
                      }}
                      id={`${website}-study_timer`}
                    />
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default ExtensionSetting;
