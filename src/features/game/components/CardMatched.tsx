import { memo } from "react";
import { ICardReveal } from "../../../@types/card";

type Props = {
    reveal: ICardReveal
};

const cardIndex = {
    'SKIRT': 1,
    'SHOES': 2,
    'CAP': 3,
    'OVERALLS': 4,
    'T-SHIRT': 5,
};

const CardMatched = ({ reveal }: Props) => (
    <img src={`./assets/images/card-${cardIndex[reveal]}.png`} alt="Covered card" style={{ width: '100%', height: '100%' }} />
);

export default memo(CardMatched);
