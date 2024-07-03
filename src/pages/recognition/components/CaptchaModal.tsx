import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components";
import { Button } from "@/components";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface CaptchaModalProps {
  isShow: boolean;
  onClose: () => void;
  onSuccessfulSolvedCaptcha: (token: string) => void;
}

export const CaptchaModal = ({
  isShow,
  onClose,
  onSuccessfulSolvedCaptcha,
}: CaptchaModalProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleOpenChange = (value: boolean) => {
    if (!value) onClose();
  };

  const handleButtonClick = async () => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("action_name");
    if (token) {
      onSuccessfulSolvedCaptcha(token);
    } else {
      alert("reCAPTCHA verification failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isShow && executeRecaptcha) {
      executeRecaptcha("action_name").then((token: string) => {
        if (token) {
          onSuccessfulSolvedCaptcha(token);
        }
      });
    }
  }, [isShow, executeRecaptcha, onSuccessfulSolvedCaptcha]);

  return (
    <Dialog open={isShow} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[708px]">
        <div className="grid place-items-center items-center gap-5">
          <Button
            className="input font-deja-vu-sans"
            onClick={handleButtonClick}
          >
            Отправить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
