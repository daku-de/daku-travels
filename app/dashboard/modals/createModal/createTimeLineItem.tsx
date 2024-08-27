import React, { useEffect, useState } from 'react';
import CreateModal from './createModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CountryDropdown, MonthDropdown, YearDropdown } from '../../edit/CustomDropdowns';
import { Country, iconColors, iconMap, IconName, ResidencePeriodInput, TravelInput } from '@/types/location';
import { addResidencePeriod, addTravel } from '@/actions/database-actions';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { VerticalTimelineIcon } from '@/components/ui/verticalTimeline/verticalTimelineItem';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const CreateTimelineItemModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal }) => {
    const [activeTab, setActiveTab] = useState<string>('travel');
    const [country, setCountry] = useState<Country | null>(null);
    const [color, setColor] = useState<string>('flag');
    const [icon, setIcon] = useState<string>('none');
    const [duration, setDuration] = useState<number>(5);
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [countryError, setCountryError] = useState<boolean>(false);
    const [monthError, setMonthError] = useState<boolean>(false);

    const onCreate = () => {
        let hasError = false;
        if (!country) {
            hasError = true;
            setCountryError(true);
        }
        if (!month) {
            hasError = true;
            setMonthError(true);
        }
        if (hasError) return;
        if (activeTab === 'travel') {
            const travel: TravelInput = {
                destination: country as Country,
                year: year,
                month: month as number,
                duration: duration,
                color: color,
                icon: icon,
            };
            addTravel(travel);
        } else if (activeTab === 'residence') {
            const residence: ResidencePeriodInput = {
                city: 'City',
                country: country as Country,
                startYear: year,
                startMonth: month as number,
                color: color,
                icon: icon,
            };
            addResidencePeriod(residence);
        }
        handleClose();
    };

    const handleClose = () => {
        setCountry(null);
        setCountryError(false);
        setMonth(null);
        setMonthError(false);
        setColor('flag');
        setIcon('none');
        setDuration(5);
        setYear(new Date().getFullYear());
        setMonth(null);
        closeModal();
    };

    const handleTabChange = (val: string) => {
        setActiveTab(val);
        setCountryError(false);
        setMonthError(false);
    };

    const handleCountryChange = (c: Country) => {
        setCountry(c);
        setCountryError(false);
    };

    const handleMonthChange = (m: number) => {
        setMonth(m);
        setMonthError(false);
    };

    return (
        <React.Fragment>
            <CreateModal isOpen={isOpen} closeModal={handleClose} header={`Add New Item`} createFunction={onCreate}>
                <div className="w-full flex flex-col p-4 mx-auto">
                    <Tabs defaultValue="travel" onValueChange={handleTabChange}>
                        <FormElement title="Type">
                            <TabsList>
                                <TabsTrigger value="travel">Travel</TabsTrigger>
                                <TabsTrigger value="residence">Residence</TabsTrigger>
                            </TabsList>
                        </FormElement>
                        <TabsContent value="travel" className="min-h-40">
                            <div className="flex flex-wrap gap-4">
                                <FormElement title="Country">
                                    <CountryDropdown
                                        onCountryChange={handleCountryChange}
                                        error={countryError}
                                        country={country}
                                    />
                                </FormElement>
                                <div className="flex flex-row gap-4">
                                    <FormElement title="Color">
                                        <ColorDropdown country={country} onColorChange={setColor} color={color} />
                                    </FormElement>
                                    <FormElement title="Icon">
                                        <IconDropdown color={color} onIconChange={setIcon} type={activeTab} />
                                    </FormElement>
                                </div>
                                <FormElement title="Month">
                                    <MonthDropdown onMonthChange={handleMonthChange} error={monthError} month={month} />
                                </FormElement>
                                <FormElement title="Year">
                                    <YearDropdown onYearChange={setYear} error={false} year={year} />
                                </FormElement>
                                <FormElement title="Duration (days)">
                                    <NumberPicker onNumberChange={setDuration} startNumber={duration} />
                                </FormElement>
                            </div>
                        </TabsContent>
                        <TabsContent value="residence" className="min-h-40">
                            <div className="flex flex-wrap gap-4">
                                <FormElement title="Country">
                                    <CountryDropdown
                                        onCountryChange={handleCountryChange}
                                        error={countryError}
                                        country={country}
                                    />
                                </FormElement>
                                <div className="flex flex-row gap-4">
                                    <FormElement title="Color">
                                        <ColorDropdown country={country} onColorChange={setColor} color={color} />
                                    </FormElement>
                                    <FormElement title="Icon">
                                        <IconDropdown color={color} onIconChange={setIcon} type={activeTab} />
                                    </FormElement>
                                </div>
                                <FormElement title="Month">
                                    <MonthDropdown onMonthChange={handleMonthChange} error={monthError} month={month} />
                                </FormElement>
                                <FormElement title="Year">
                                    <YearDropdown onYearChange={setYear} error={false} year={year} />
                                </FormElement>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </CreateModal>
        </React.Fragment>
    );
};

interface FormElementProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
}

const FormElement = ({ title, children }: FormElementProps) => {
    return (
        <div className="flex flex-col w-fit">
            <div className="text-xs text-foreground/50 px-1">{title}</div>
            {children}
        </div>
    );
};

const ColorDropdown = ({
    country,
    onColorChange,
    color,
}: {
    country: Country | null;
    onColorChange: (color: string) => void;
    color: string;
}) => {
    const [selectedColor, setSelectedColor] = useState<string>('');

    useEffect(() => {
        if (!color) {
            setSelectedColor('flag');
        } else {
            setSelectedColor(color);
        }
    }, [color]);

    const handleColorSelect = (col: string) => {
        setSelectedColor(col);
        onColorChange(col);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                <div className={`flex flex-row items-center gap-1 w-fit h-fit border rounded-lg p-1`}>
                    <VerticalTimelineIcon selectedColor={selectedColor} country={country} />
                    <ChevronDown className="h-4 w-4 text-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-fit min-w-0 max-w-32 max-h-96 overflow-y-auto scrollbar-hide z-[10000] flex flex-row flex-wrap justify-center"
            >
                {iconColors.map((col) => {
                    return (
                        <DropdownMenuItem key={col} onClick={() => handleColorSelect(col)} className="p-0">
                            <VerticalTimelineIcon selectedColor={col} country={country} className="h-7 w-7 p-1 m-1" />
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const IconDropdown = ({
    color,
    onIconChange,
    type,
}: {
    color: string;
    onIconChange: (icon: string) => void;
    type: string;
}) => {
    const [selectedIcon, setSelectedIcon] = useState<IconName>('none');
    const normalizedType = type === 'residence' || type === 'travel' ? type : 'travel';

    const getIconWithClass = (IconComponent: IconType) => (
        <IconComponent className="w-full h-full text-primary-foreground" />
    );

    useEffect(() => {
        setSelectedIcon('none');
    }, []);

    useEffect(() => {
        if (color === 'flag') {
            setSelectedIcon('none');
        }
    }, [color]);

    useEffect(() => {
        onIconChange(selectedIcon);
    }, [onIconChange, selectedIcon]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                <div className={`flex flex-row items-center gap-1 w-fit h-fit border rounded-lg p-1`}>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                        <div className="rounded-full border border-foreground/50 shadow-lg bg-primary w-8 h-8 hover:cursor-pointer p-1">
                            {iconMap[normalizedType][selectedIcon] &&
                                getIconWithClass(iconMap[normalizedType][selectedIcon])}
                        </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-fit min-w-0 max-w-32 max-h-96 overflow-y-auto scrollbar-hide z-[10000] flex flex-row gap-1 flex-wrap justify-center"
            >
                {Object.entries(iconMap[normalizedType]).map(([key, IconComponent]: [string, IconType | null]) => {
                    return (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => {
                                if (color !== 'flag' || key === 'none') setSelectedIcon(key as IconName);
                            }}
                            disabled={color === 'flag' && key !== 'none'}
                            className="p-0"
                        >
                            <div
                                className={`${color === 'flag' && key !== 'none' ? 'text-primary-foreground/30 hover:cursor-default' : 'text-primary-foreground hover:cursor-pointer'} rounded-full border border-foreground/50 shadow-lg bg-primary w-7 h-7 m-1 p-1`}
                            >
                                {IconComponent && <IconComponent className="w-full h-full" />}
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const NumberPicker = ({
    onNumberChange,
    startNumber,
}: {
    onNumberChange: (number: number) => void;
    startNumber: number;
}) => {
    const [number, setNumber] = useState<number>(startNumber);
    const minimum = 1;
    const maximum = 365;

    useEffect(() => {
        onNumberChange(number);
    }, [number, onNumberChange]);

    const handleIncrement = () => {
        if (number < maximum) {
            setNumber(number + 1);
        }
    };
    const handleDecrement = () => {
        if (number > minimum) {
            setNumber(number - 1);
        }
    };
    return (
        <div className="inline-flex gap-[3px] items-center py-1 border border-transparent">
            <button
                onClick={handleDecrement}
                className="triangle-left h-8 bg-primary text-primary-foreground font-bold flex justify-end items-center select-none text-sm pr-[1px]"
            ></button>
            <input
                value={number}
                type="number"
                min={minimum}
                max={maximum}
                className="flex p-1 rounded-lg text-center outline-none w-11 bg-primary text-primary-foreground font-black"
                onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setNumber(value);
                }}
                onBlur={() => {
                    if (number < minimum || isNaN(number)) {
                        setNumber(minimum);
                    } else if (number > maximum) {
                        setNumber(maximum);
                    }
                }}
            ></input>
            <button
                onClick={handleIncrement}
                className="triangle-right h-8 bg-primary text-primary-foreground font-bold flex justify-start items-center select-none text-sm pl-[1px]"
            ></button>
        </div>
    );
};

export default CreateTimelineItemModal;
