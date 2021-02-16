import { Filter, RoomFloor, RoomCount, ContractType, BuildingType } from '../filter';

interface FilterFragment extends Omit<Filter, 'bounds' | 'id'> {}
type Bounds = Filter['bounds'];

const TEN_THOUSANDS = 10000;

const commonFilter: Omit<FilterFragment, 'priceRange' | 'contractTypes'> = {
    buildingTypes: [BuildingType.villa, BuildingType.officetel],
    roomFloors: [RoomFloor.lower, RoomFloor.higher],
    roomCounts: [RoomCount.oneRoom, RoomCount.twoRooms],
    shouldIncludeHalfUndergrounds: false,
    shouldIncludeLofts: false,
    shouldIncludeRooftops: false,
};

const jeonseFilter: FilterFragment = {
    ...commonFilter,
    priceRange: {
        deposit: { max: (14000 * TEN_THOUSANDS) + 1 },
        rent: { max: (20 * TEN_THOUSANDS) + 1 },
        shouldIncludeMaintenance: false,
    },
    contractTypes: [ContractType.jeonse, ContractType.rent],
};

const rentFilter: FilterFragment = {
    ...commonFilter,
    priceRange: {
        deposit: { max: (1500 * TEN_THOUSANDS) + 1 },
        rent: { max: (60 * TEN_THOUSANDS) + 1 },
        shouldIncludeMaintenance: false,
    },
    contractTypes: [ContractType.rent],
};

// zoomLevel 16
const sangbong: Bounds = {
    max: { lat: 37.6053173, lng: 127.097494 },
    min: { lat: 37.5882988, lng: 127.0715302 },
};

// zoomLevel 16
const sagajeong: Bounds = {
    max: { lat: 37.5875337, lng: 127.1004981 },
    min: { lat: 37.5705112, lng: 127.0745343 },
};

const candidates: Filter[] = [
    {
        id: '상봉역 센터 16 (전세, 반전세)',
        ...jeonseFilter,
        bounds: sangbong,
    },
    {
        id: '상봉역 센터 16 (월세)',
        ...rentFilter,
        bounds: sangbong,
    },
    {
        id: '사가정역 센터 16 (전세, 반전세)',
        ...jeonseFilter,
        bounds: sagajeong,
    },
    {
        id: '사가정역 센터 16 (월세)',
        ...rentFilter,
        bounds: sagajeong,
    }
];

export default candidates;
