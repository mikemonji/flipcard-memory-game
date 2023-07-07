import { memo } from "react";
import { ICardMatch } from "../../../@types/card";

type Props = {
    suprise: ICardMatch
};

const CardSurpise = ({ suprise }: Props) => (
    <img src={`./assets/images/card-${suprise.toLowerCase()}.png`} alt="Covered card" style={{ width: '100%', height: '100%' }} />
);

export default memo(CardSurpise);
