import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Install = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<any>(null);

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
  return visible && <Button onClick={onInstall}>Install this app</Button>;
};

export default Install;
