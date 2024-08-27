import React, { useEffect, useState } from 'react';
import { csv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Sphere, Graticule, ZoomableGroup, Marker } from 'react-simple-maps';
import Image from 'next/image';
import { countryCodeEmoji } from 'country-code-emoji';
import { loadCountries } from '@/actions/actions';

const geoUrl = '/resources/world-map-countries.json';

const colorScale = scaleLinear().domain([0, 10]).range([1, 5]);

const MapChart = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredCountry, setHoveredCountry] = useState('');
    const [displayTooltip, setDisplayTooltip] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [flagError, setFlagError] = useState(false);

    const [answerResult, setAnswerResult] = useState(null);
    const [countryList, setCountryList] = useState([]);

    const fetchCountries = async () => {
        try {
            setCountryList(await loadCountries());
        } catch (error) {
            console.error('Error fetching country list:', error);
        }
    };

    useEffect(() => {
        setSelectedCountry(countryList[[Math.floor(Math.random() * countryList.length)]]);
    }, [countryList]);

    useEffect(() => {
        const fetchAndSelect = async () => {
            await fetchCountries();
        };
        fetchAndSelect();
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const tooltipStyle = {
        top: mousePos.y + 15,
        left: mousePos.x + 15,
    };

    const handleMouseOver = (geo) => {
        setHoveredCountry(geo.properties.name);
        setDisplayTooltip(true);
    };
    const handleMouseLeave = () => {
        setHoveredCountry('');
        setDisplayTooltip(false);
    };

    const handleCountryClick = (geo) => {
        if (correctGuesses.find((x) => x.id === geo.properties.adm0_a3)) return;
        if (selectedCountry.id === geo.properties.adm0_a3) {
            setAnswerResult(true);
            setCorrectGuesses(correctGuesses.concat(selectedCountry));
            setCountryList(countryList.filter((x) => !correctGuesses.includes(x)));
        } else {
            setAnswerResult(false);
        }
    };

    return (
        <div>
            <div
                className={`w-8 h-8 mb-2 ${answerResult ? 'bg-green-500' : answerResult === false ? 'bg-red-500' : 'bg-gray-400'}`}
            ></div>
            <div>{correctGuesses.length + ' / ' + countryList.length + ' countries found'}</div>
            <div>
                Found:{' '}
                {correctGuesses
                    .map((guess) => {
                        {
                            try {
                                return countryCodeEmoji(guess.code);
                            } catch {
                                return '';
                            }
                        }
                    })
                    .join(' ')}
            </div>
            <Image
                width={64}
                height={120}
                src={
                    !flagError
                        ? `https://flagcdn.com/${selectedCountry?.code.toLowerCase()}.svg`
                        : '/resources/flagFallback.svg'
                }
                onError={() => {
                    setFlagError(true);
                }}
                className="h-24 w-auto"
            />
            <button
                onClick={() => {
                    setSelectedCountry(countryList[[Math.floor(Math.random() * countryList.length)]]);
                    setFlagError(false);
                }}
                className="p-2 bg-gray-700 rounded-lg mt-2"
            >
                Skip!
            </button>
            <div
                style={tooltipStyle}
                className={`fixed p-4 text-white z-50 pointer-events-none rounded-xl bg-black ${displayTooltip ? 'block' : 'hidden'}`}
            >
                {hoveredCountry}
            </div>
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147,
                }}
                className="w-[800px]"
            >
                <ZoomableGroup
                    translateExtent={[
                        [0, 100],
                        [800, 500],
                    ]}
                    maxZoom={100}
                    onMoveStart={() => {
                        setDisplayTooltip(false);
                    }}
                    filterZoomEvent={(ev) => {
                        return ev.type !== 'dblclick';
                    }}
                    onMove={({ zoom }) => setScaleFactor(zoom)}
                >
                    <Graticule stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} />
                    <Sphere stroke="hsl(var(--foreground))" strokeWidth={2} />
                    {
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            onMouseEnter={() => handleMouseOver(geo)}
                                            onMouseLeave={() => handleMouseLeave()}
                                            geography={geo}
                                            style={{
                                                pressed: { fill: '#02A', outline: 'none' },
                                            }}
                                            className={` outline-none stroke-border stroke-[0.1] ${correctGuesses.find((x) => x.id === geo.properties.adm0_a3) ? 'fill-green-400' : 'fill-primary cursor-pointer hover:fill-blue-700'}`}
                                            onClick={() => handleCountryClick(geo)}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    }
                    {/* <Marker coordinates={[-73.968285, 40.785091]}>
                        <circle
                            r={4 / scaleFactor}
                            fill="#F53"
                            className="scale-100 cursor-pointer"
                            onClick={() => console.log('CLICKED MARKER')}
                        />
                    </Marker> */}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default MapChart;
