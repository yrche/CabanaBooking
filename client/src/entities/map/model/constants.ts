import {Icons} from "@/features/get-map/model/interfaces/icon.interface.ts";
import arrowEnd from "@/shared/assets/arrowEnd.png";
import arrowStraight from "@/shared/assets/arrowStraight.png";
import arrowCornerSquare from "@/shared/assets/arrowCornerSquare.png";
import arrowSplit from "@/shared/assets/arrowSplit.png";
import arrowCrossing from "@/shared/assets/arrowCrossing.png";

export const PATH_TILES: Record<number, Icons> = {
    0: { img: arrowEnd, rotate: 0 },
    1: { img: arrowEnd, rotate: 0 },
    2: { img: arrowEnd, rotate: 270 },
    4: { img: arrowEnd, rotate: 180 },
    8: { img: arrowEnd, rotate: 90 },
    5: { img: arrowStraight, rotate: 0 },
    10: { img: arrowStraight, rotate: 90 },
    3: { img: arrowCornerSquare, rotate: 0 },
    6: { img: arrowCornerSquare, rotate: 90 },
    12: { img: arrowCornerSquare, rotate: 180 },
    9: { img: arrowCornerSquare, rotate: 270 },
    7: { img: arrowSplit, rotate: 0 },
    14: { img: arrowSplit, rotate: 90 },
    13: { img: arrowSplit, rotate: 180 },
    11: { img: arrowSplit, rotate: 270 },
    15: { img: arrowCrossing, rotate: 0 },
};

// TODO: WAVE_TILES, POOL_TILES