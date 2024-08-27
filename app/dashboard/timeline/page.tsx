'use client';
import { loadResidencePeriods, loadTravels } from '@/actions/database-actions';
import { loadCountries } from '@/actions/actions';
import { VerticalTimeline } from '@/components/ui/verticalTimeline/verticalTimeline';
import { VerticalTimelineAddItem } from '@/components/ui/verticalTimeline/verticalTimelineAdd';
import { VerticalTimelineResidence } from '@/components/ui/verticalTimeline/verticalTimelineResidence';
import { VerticalTimelineTravel } from '@/components/ui/verticalTimeline/verticalTimelineTravel';
import { Country, Region, ResidencePeriod, Travel } from '@/types/location';
import { useEffect, useState } from 'react';
import CreateTimelineItemModal from '../modals/createModal/createTimeLineItem';
import MapChart from './MapChart';
import { Compass, LucideIcon } from 'lucide-react';
import { HiOutlineGlobeEuropeAfrica } from 'react-icons/hi2';
import { SiUnitednations } from 'react-icons/si';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons/lib';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FaAdjust,
    FaArrowLeft,
    FaAward,
    FaCalendarAlt,
    FaChevronLeft,
    FaChevronRight,
    FaMapMarkedAlt,
} from 'react-icons/fa';
import { FaCalendarDays, FaHouseChimney } from 'react-icons/fa6';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type NormalizedItem = {
    id: string;
    year: number;
    month: number;
    country: Country;
    type: string;
    item: Travel | ResidencePeriod;
};

function normalizeItems(travels: Travel[], residences: ResidencePeriod[]): NormalizedItem[] {
    const normalizedTravels = travels.map((travel) => ({
        id: travel.id,
        year: travel.year,
        month: travel.month,
        country: travel.destination,
        type: 'travel',
        item: travel,
    }));

    const normalizedResidences = residences.map((residence) => ({
        id: residence.id,
        year: residence.startYear,
        month: residence.startMonth,
        country: residence.country,
        type: 'residence',
        item: residence,
    }));

    return [...normalizedTravels, ...normalizedResidences];
}

function sortItems(items: NormalizedItem[]): NormalizedItem[] {
    return items.sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year;
        }
        return b.month - a.month;
    });
}

const regions: Region[] = [
    {
        id: 'world',
        name: 'The World',
        zoomFactor: 1,
        geoJsonName: 'World',
        center: [10, 0],
    },
    {
        id: 'eu',
        name: 'Europe',
        zoomFactor: 5,
        geoJsonName: 'Europe',
        center: [10, 51],
    },
    {
        id: 'na',
        name: 'North America',
        zoomFactor: 2.4,
        geoJsonName: 'North America',
        center: [-90, 37],
    },
    {
        id: 'sa',
        name: 'South America',
        zoomFactor: 2.1,
        geoJsonName: 'South America',
        center: [-65, -20],
    },
    {
        id: 'as',
        name: 'Asia',
        zoomFactor: 1.8,
        geoJsonName: 'Asia',
        center: [90, 27],
    },
    {
        id: 'af',
        name: 'Africa',
        zoomFactor: 1.8,
        geoJsonName: 'Africa',
        center: [15, 3],
    },
    {
        id: 'oc',
        name: 'Oceania',
        zoomFactor: 3,
        geoJsonName: 'Oceania',
        center: [145, -23],
    },
    {
        id: 'ant',
        name: 'Antarctica',
        zoomFactor: 1.7,
        geoJsonName: 'Antarctica',
        center: [10, -45],
    },
];

export default function TImelinePage() {
    const [travels, setTravels] = useState<Travel[]>([]);
    const [residences, setResidences] = useState<ResidencePeriod[]>([]);
    const [sortedItems, setSortedItems] = useState<NormalizedItem[]>([]);
    const [mapZoom, setMapZoom] = useState<number>(1);
    const [mapCenter, setMapCenter] = useState<[number, number]>([10, 0]);
    const [previousMapZoom, setPreviousMapZoom] = useState<number>(1);
    const [previousMapCenter, setPreviousMapCenter] = useState<[number, number]>([10, 0]);
    const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

    const [allCountries, setAllCountries] = useState<Country[]>([]);

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const [highlightedCountries, setHighlightedCountries] = useState<Country[]>([]);

    const fetchItems = async () => {
        setTravels(await loadTravels());
        setResidences(await loadResidencePeriods());
        setAllCountries(await loadCountries());
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        updatePreviousPosition(selectedRegion.center, selectedRegion.zoomFactor);
        setMapZoom(selectedRegion.zoomFactor);
        setMapCenter(selectedRegion.center);
    }, [selectedRegion]);

    useEffect(() => {
        setSortedItems(sortItems(normalizeItems(travels, residences)));
    }, [travels, residences]);

    useEffect(() => {
        setHighlightedCountries(sortedItems.map((i) => i.country));
    }, [sortedItems]);

    const handleModalClose = () => {
        fetchItems();
        setCreateModalOpen(false);
    };

    const showCountry = (country: Country) => {
        setHighlightedCountries([country]);
        setMapZoom(country.zoomFactor);
        setMapCenter([country.label_x, country.label_y]);
    };

    const resetMap = () => {
        setHighlightedCountries(sortedItems.map((i) => i.country));
        setMapZoom(previousMapZoom);
        setMapCenter(previousMapCenter);
    };

    const updatePreviousPosition = (coordinates: [number, number], zoom: number) => {
        setPreviousMapZoom(zoom);
        setPreviousMapCenter(coordinates);
    };

    return (
        <div className="flex flex-row h-full overflow-hidden py-4">
            <div className="w-1/2 overflow-x-hidden max-lg:w-full flex justify-center overflow-hidden overflow-y-auto scrollbar-hide">
                <VerticalTimeline className="max-lg:hidden">
                    <VerticalTimelineAddItem onClick={() => setCreateModalOpen(true)} />
                    {sortedItems.map((item) => {
                        if (item.type === 'travel') {
                            return (
                                <VerticalTimelineTravel
                                    key={'travel-' + item.id}
                                    travel={item.item as Travel}
                                    onMouseEnter={() => showCountry(item.country)}
                                    onMouseLeave={resetMap}
                                    onTouchStart={() => showCountry(item.country)}
                                    onTouchEnd={resetMap}
                                    onDelete={fetchItems}
                                    className={
                                        selectedRegion.id !== 'world' &&
                                        !item.country.continents.includes(selectedRegion.geoJsonName)
                                            ? 'opacity-20'
                                            : ''
                                    }
                                />
                            );
                        } else {
                            return (
                                <VerticalTimelineResidence
                                    key={'residence-' + item.id}
                                    residencePeriod={item.item as ResidencePeriod}
                                    onMouseEnter={() => showCountry(item.country)}
                                    onMouseLeave={resetMap}
                                    onTouchStart={() => showCountry(item.country)}
                                    onTouchEnd={resetMap}
                                    onDelete={fetchItems}
                                    className={
                                        selectedRegion.id !== 'world' &&
                                        !item.country.continents.includes(selectedRegion.geoJsonName)
                                            ? 'opacity-20'
                                            : ''
                                    }
                                />
                            );
                        }
                    })}
                </VerticalTimeline>

                <div className="flex-col w-full gap-4 items-center hidden max-lg:flex">
                    <MapChart
                        countryList={highlightedCountries}
                        highlightColor="purple"
                        generateTooltip={(country: Country) => {
                            return <div>{country.name}</div>;
                        }}
                        showTooltip={true}
                        className="w-full max-h-[350px] flex-shrink-0"
                        zoom={mapZoom}
                        center={mapCenter}
                        disableZoom={false}
                        onMove={updatePreviousPosition}
                        region={selectedRegion}
                    />

                    <Tabs
                        defaultValue="timeline"
                        className="w-full overflow-hidden flex flex-col"
                        onValueChange={() => setSelectedRegion(regions[0])}
                    >
                        <div className="items-center w-full">
                            <TabsList>
                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                <TabsTrigger value="stats">Stats</TabsTrigger>
                                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent
                            value="timeline"
                            className="overflow-y-auto scrollbar-hide focus-visible:ring-offset-0 focus-visible:ring-0"
                        >
                            <div className="flex justify-center">
                                <VerticalTimeline>
                                    <VerticalTimelineAddItem onClick={() => setCreateModalOpen(true)} />
                                    {sortedItems.map((item) => {
                                        if (item.type === 'travel') {
                                            return (
                                                <VerticalTimelineTravel
                                                    key={'travel-' + item.id}
                                                    travel={item.item as Travel}
                                                    onMouseEnter={() => showCountry(item.country)}
                                                    onMouseLeave={resetMap}
                                                    onDelete={fetchItems}
                                                />
                                            );
                                        } else {
                                            return (
                                                <VerticalTimelineResidence
                                                    key={'residence-' + item.id}
                                                    residencePeriod={item.item as ResidencePeriod}
                                                    onMouseEnter={() => showCountry(item.country)}
                                                    onMouseLeave={resetMap}
                                                    onDelete={fetchItems}
                                                />
                                            );
                                        }
                                    })}
                                </VerticalTimeline>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="stats"
                            className="flex flex-col justify-center gap-4 focus-visible:ring-offset-0 focus-visible:ring-0 overflow-y-auto"
                        >
                            <RegionSelector region={selectedRegion} onRegionChange={setSelectedRegion} />
                            <TravelStats
                                selectedRegion={selectedRegion}
                                travels={travels}
                                sortedItems={sortedItems}
                                allCountries={allCountries}
                                residences={residences}
                            />
                        </TabsContent>
                        <TabsContent value="achievements"></TabsContent>
                    </Tabs>
                </div>
                <CreateTimelineItemModal isOpen={createModalOpen} closeModal={handleModalClose} />
            </div>
            <div className="w-[2px] mx-2 bg-primary/20 max-h-fit flex-none rounded-full max-lg:hidden"></div>
            <div className="w-1/2 overflow-hidden max-lg:hidden flex items-center flex-col gap-8">
                <div className="flex w-full flex-col items-center gap-2 my-4 overflow-y-auto">
                    <MapChart
                        countryList={highlightedCountries}
                        highlightColor="purple"
                        generateTooltip={(country: Country) => {
                            return <div className="p-3 rounded-lg bg-black">{country.name}</div>;
                        }}
                        showTooltip={true}
                        className="w-[90%] max-h-[350px]"
                        zoom={mapZoom}
                        center={mapCenter}
                        disableZoom={false}
                        onMove={updatePreviousPosition}
                        region={selectedRegion}
                    />
                    <div className="text-xs text-primary/40">Click on a country to add a trip.</div>
                </div>
                <RegionSelector region={selectedRegion} onRegionChange={setSelectedRegion} />
                <TravelStats
                    selectedRegion={selectedRegion}
                    travels={travels}
                    sortedItems={sortedItems}
                    allCountries={allCountries}
                    residences={residences}
                />
            </div>
        </div>
    );
}

const RegionSelector = ({ region, onRegionChange }: { region: Region; onRegionChange: (region: Region) => void }) => {
    const index = regions.findIndex((r) => r.id === region.id);
    const handleNextClick = () => {
        onRegionChange(regions[(index + 1) % regions.length]);
    };

    const handlePreviousClick = () => {
        onRegionChange(regions[(index - 1 + regions.length) % regions.length]);
    };
    return (
        <div className="inline-flex items-center justify-center select-none">
            <div className="text-2xl w-64 text-center px-2 py-1 rounded-2xl border-primary border-2 shadow-sm font-black relative">
                <div
                    className="w-4 h-4 p-2 flex justify-center items-center cursor-pointer absolute left-0 pr-20 box-content"
                    onClick={handlePreviousClick}
                >
                    <FaChevronLeft className="w-full h-full" />
                </div>
                <div
                    className="w-4 h-4 p-2 flex justify-center items-center cursor-pointer absolute right-0 pl-20 box-content"
                    onClick={handleNextClick}
                >
                    <FaChevronRight className="w-full h-full" />
                </div>
                <div>{region.name}</div>
            </div>
        </div>
    );
};

const TravelStats = ({
    travels,
    sortedItems,
    residences,
    selectedRegion,
    allCountries,
}: {
    selectedRegion: Region;
    travels: Travel[];
    residences: ResidencePeriod[];
    sortedItems: NormalizedItem[];
    allCountries: Country[];
}) => {
    const [mostTraveledCountry, setMostTraveledCountry] = useState<{
        country: Country;
        count: number;
    } | null>(null);
    const filteredTravels = travels.filter(
        (i) => selectedRegion.id === 'world' || i.destination.continents.includes(selectedRegion.geoJsonName),
    );
    const filteredSortedItems = sortedItems.filter(
        (i) => selectedRegion.id === 'world' || i.country.continents.includes(selectedRegion.geoJsonName),
    );
    const filteredAllCountries = allCountries.filter(
        (i) => selectedRegion.id === 'world' || i.continents.includes(selectedRegion.geoJsonName),
    );
    const filteredResidences = residences.filter(
        (i) => selectedRegion.id === 'world' || i.country.continents.includes(selectedRegion.geoJsonName),
    );

    const getMostTraveledCountry = () => {
        const destinationCounts: Record<string, number> = {};
        const sortedTravels = filteredTravels.sort((a, b) => {
            if (a.year !== b.year) {
                return b.year - a.year;
            }
            return b.month - a.month;
        });

        sortedTravels.forEach((item) => {
            if (destinationCounts[item.destination.id]) {
                destinationCounts[item.destination.id]++;
            } else {
                destinationCounts[item.destination.id] = 1;
            }
        });

        let mostReferencedDestination: Country | null = null;
        let maxCount = 0;

        for (let i = 0; i < sortedTravels.length; i++) {
            const item = sortedTravels[i];
            const count = destinationCounts[item.destination.id];

            if (
                count > maxCount ||
                (count === maxCount && item.destination === sortedTravels[sortedTravels.length - 1].destination)
            ) {
                maxCount = count;
                mostReferencedDestination = item.destination;
            }
        }

        if (!mostReferencedDestination) {
            setMostTraveledCountry(null);
        } else {
            setMostTraveledCountry({ country: mostReferencedDestination, count: maxCount });
        }
    };

    useEffect(() => {
        getMostTraveledCountry();
    }, [travels, selectedRegion]);

    return (
        <div className="inline-flex gap-4 px-4 w-full justify-center items-center flex-wrap overflow-y-auto scrollbar-hide">
            <div className="inline-flex items-center gap-[inherit] max-[1700px]:flex-row-reverse max-[559px]:flex-col-reverse flex-wrap justify-center overflow-hidden">
                <InfoCard
                    value={filteredTravels
                        .map((t) => t.duration)
                        .reduce((partialSum, a) => partialSum + a, 0)
                        .toString()}
                    info={'Days spent traveling'}
                    className="from-purple-300 to-purple-600 max-w-full"
                    Icon={FaCalendarDays}
                />
                <ProgressCard
                    percentage={
                        isFinite(
                            (new Set(filteredSortedItems.map((i) => i.country.id)).size / allCountries.length) * 100,
                        )
                            ? (new Set(filteredSortedItems.map((i) => i.country.id)).size /
                                  filteredAllCountries.length) *
                              100
                            : 0
                    }
                    info={'of ' + selectedRegion.name}
                />
            </div>
            <InfoCard
                value={mostTraveledCountry?.country.name || 'No travels'}
                info={
                    'Most traveled' + (mostTraveledCountry?.country ? ' (' + mostTraveledCountry.count + ' times)' : '')
                }
                className="from-red-300 to-red-600"
                Icon={FaAward}
            />
            <InfoCard
                value={filteredTravels.length.toString()}
                info={'Trips tracked'}
                className="from-sky-300 to-sky-600"
                Icon={Compass}
            />
            <InfoCard
                value={new Set(filteredSortedItems.map((i) => i.country.id)).size.toString()}
                maximum={filteredAllCountries.length.toString()}
                info={'Countries explored'}
                Icon={SiUnitednations}
                className="from-green-300 to-green-600"
            />
            {selectedRegion.id === 'world' ? (
                <InfoCard
                    value={new Set(
                        sortedItems
                            .flatMap((i) => i.country.continents)
                            .filter((continent) => !continent.includes('seas')),
                    ).size.toString()}
                    maximum={new Set(
                        allCountries.flatMap((c) => c.continents).filter((continent) => !continent.includes('seas')),
                    ).size.toString()}
                    info={'Continents traveled'}
                    Icon={HiOutlineGlobeEuropeAfrica}
                    className="from-amber-300 to-amber-600"
                />
            ) : (
                <InfoCard
                    info={'Countries lived in'}
                    value={new Set(filteredResidences.map((r) => r.country.id)).size.toString()}
                    // maximum={filteredAllCountries.length.toString()}
                    Icon={FaHouseChimney}
                    className="from-amber-300 to-amber-600"
                />
            )}
            {/* <Achievement title={'ACHIEVEMENT'} description={'Achievement description'} tier={'bronze'} /> */}
        </div>
    );
};

const ProgressCard = ({ percentage, info }: { percentage: number; info: string }) => {
    return (
        <div
            className={
                'w-60 max-xl:w-48 max-lg:w-60 box-border circular-gradient-progress p-[6px] rounded-2xl max-w-full'
            }
            style={
                {
                    '--percentage': `${percentage}%`,
                    '--half-percentage': `${percentage / 2}%`,
                } as React.CSSProperties
            }
        >
            <div
                className="circular-gradient-progress p-[1px] rounded-lg bg-foreground h-full"
                style={
                    {
                        '--percentage': `${percentage}%`,
                        '--half-percentage': `${percentage / 2}%`,
                    } as React.CSSProperties
                }
            >
                <div className="rounded-lg bg-card flex justify-center items-center overflow-hidden min-h-20">
                    <div className=" overflow-hidden text-center">
                        <div className="font-black text-4xl">{percentage.toPrecision(3)}%</div>
                        <div className="text-sm flex-wrap">{info}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Achievement = ({ title, description, tier }: { title: string; description: string; tier: string }) => {
    return (
        <div className="min-w-60 w-full max-w-80 h-20 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-lg flex flex-row items-center p-3 shadow-sm border text-white gap-4">
            <div className="rounded-full w-14 h-14 bg-white p-3 text-amber-400">
                <FaAward className="w-full h-full" />
            </div>
            <div className="flex flex-col">
                <div className="text-xl font-black">{title}</div>
                <div className="text-sm">{description}</div>
            </div>
        </div>
    );
};

const InfoCard = ({
    info,
    value,
    className,
    Icon,
    maximum,
}: {
    info: string;
    value: string;
    maximum?: string;
    className?: string;
    Icon: LucideIcon | IconType;
}) => {
    return (
        <div
            className={cn(
                'p-2 rounded-xl w-60 min-h-20 max-xl:w-48 max-lg:w-60 relative overflow-hidden shadow-md border bg-gradient-to-r from-purple-300 to-purple-600 text-white',
                className,
            )}
        >
            <Icon className="absolute left-0 bottom-0 w-28 h-20 -translate-x-1/3 translate-y-3 text-black z-0 opacity-20" />
            <div className="flex relative w-full h-full flex-col justify-between">
                <div className="inline-flex items-end w-full justify-center">
                    <div className="text-4xl font-black relative overflow-hidden inline-flex items-end">
                        <Tooltip>
                            <TooltipTrigger className="overflow-hidden cursor-text">
                                <div className="text-nowrap text-ellipsis overflow-hidden">{value}</div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                className={value.length < 10 ? 'hidden' : 'border-primary font-normal'}
                            >
                                {value}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    {maximum && (
                        <div className="text-xl font-bold opacity-65 overflow-visible w-0 whitespace-nowrap translate-x-2">
                            / {maximum}
                        </div>
                    )}
                </div>
                <div className="flex w-full justify-center text-sm text-center">{info}</div>
            </div>
        </div>
    );
};
