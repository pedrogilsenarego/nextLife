import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2Icon } from "@radix-ui/react-icons";
import { userAgent } from "next/server";
import { useEffect, useState } from "react";

const Install = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleIos, setVisibleIos] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    if (isIos() && !isInStandaloneMode()) {
      setVisibleIos(true);
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        setVisible(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const onInstall = () => {
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("accepted");
        } else {
          console.log("Cancelled");
        }
        setPrompt(null);
      });
    }
  };
  return (
    <>
      {visible && <Button onClick={onInstall}>Install this app</Button>}
      {visibleIos && !visible && (
        <Card className="flex items-center flex-col gap-2 rounded-none p-2">
          <p className="w-full text-center">
            To install this app on your phone click on
          </p>
          <Share2Icon style={{ width: "30px", height: "30px" }} />
          <p className="w-full text-center">and then</p>
          <p className="w-full text-center">
            <b>Add to Homescreen</b>
          </p>
        </Card>
      )}
    </>
  );
};

export default Install;
