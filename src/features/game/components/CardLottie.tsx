import { memo } from "react";
import Lottie from 'react-lottie';

type Props = {
    animationData: any
};

const CardLottie = ({ animationData }: Props) => {

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Lottie 
            options={defaultOptions}
            height={'100%'}
            width={'100%'}
            style={{
                // borderRadius: 20
            }}
        />
    );

}

export default memo(CardLottie);