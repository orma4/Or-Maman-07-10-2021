import Lottie from "react-lottie";
// import animationData from "../../assets/animations/cloud.json";
import animationData from "../../assets/animations/card-bg.json";
import { useMediaQuery } from "@mui/material";

export const CardBg = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={isSmallScreen ? "100%" : 150}
        width={isSmallScreen ? "100%" : 180}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default CardBg;
