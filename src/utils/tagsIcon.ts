import {
    faSeedling,
    faLeaf,
    faWheatAwn,
    faCubesStacked,
    faDumbbell,
    faBone,
    faDna,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export const tagsIcons: {
    [index: string]:IconDefinition } = {
    vegan: faSeedling,
    vegetarian: faLeaf,
    withoutGluten: faWheatAwn,
    withoutSugar: faCubesStacked,
    iron: faDumbbell,
    calcium: faBone,
    protein: faDna,
};
