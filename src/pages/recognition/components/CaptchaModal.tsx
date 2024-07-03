import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components";

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleOpenChange = (value: boolean) => {
    if (!value) onClose();
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleButtonClick = () => {
    if (recaptchaToken) {
      onSuccessfulSolvedCaptcha(recaptchaToken);
    } else {
      alert("Please solve the reCAPTCHA");
    }
  };

  useEffect(() => {
    if (isShow) {
      setRecaptchaToken(null);
    }
  }, [isShow]);

  return (
    <Dialog open={isShow} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[708px]">
        <div className="grid grid-cols-1 place-items-center items-center gap-5">
          <ReCAPTCHA
            sitekey="6LfkwAcqAAAAAG0hUbFuDsRD784LJdWiJzrmxMFs"
            onChange={handleRecaptchaChange}
          />
          <Button className="input font-deja-vu-sans" onClick={handleButtonClick}>
            Отправить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
