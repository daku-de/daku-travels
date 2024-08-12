import React, { useEffect, useState } from 'react';
import { csv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Sphere, Graticule, ZoomableGroup, Marker } from 'react-simple-maps';
import Image from 'next/image';

const geoUrl = '/resources/features.json';

const colorScale = scaleLinear().domain([0.29, 0.68]).range(['#ffedea', '#ff5233']);

const MapChart = () => {
    const [data, setData] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredCountry, setHoveredCountry] = useState('');
    const [displayTooltip, setDisplayTooltip] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [correctGuesses, setCorrectGuesses] = useState([]);

    const [answerResult, setAnswerResult] = useState(null);
    const [countryList, setCountryList] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,ccn3');
            if (!response.ok) {
                throw new Error('Restcountries API response is not ok');
            }
            const countries = await response.json();

            const countrylist = countries.map((country) => ({
                name: country.name.common,
                code: country.cca2,
                ccn3Code: country.ccn3,
            }));

            setCountryList(countrylist);
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

    useEffect(() => {
        csv(`/vulnerability.csv`).then((data) => {
            setData(data);
        });
    }, []);

    const handleMouseOver = (geo) => {
        setHoveredCountry(geo.properties.name);
        setDisplayTooltip(true);
    };
    const handleMouseLeave = () => {
        setHoveredCountry('');
        setDisplayTooltip(false);
    };

    const handleCountryClick = (geo) => {
        if (correctGuesses.find((x) => x.ccn3Code === geo.id)) return;
        if (selectedCountry.ccn3Code === geo.id) {
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
            <Image src={`https://flagcdn.com/${selectedCountry?.code?.toLowerCase()}.svg`} width={64} height={120} />
            <button
                onClick={() => {
                    setSelectedCountry(countryList[[Math.floor(Math.random() * countryList.length)]]);
                }}
                className="p-2 bg-gray-700 rounded-lg mt-2"
            >
                Skip!
            </button>
            <div
                style={tooltipStyle}
                className={`fixed p-4 text-white z-50 pointer-events-none rounded-xl bg-black ${displayTooltip ? 'block' : 'hidden'} hidden`}
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
                    {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = data.find((s) => s.ISO3 === geo.id);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            onMouseEnter={() => handleMouseOver(geo)}
                                            onMouseLeave={() => handleMouseLeave()}
                                            geography={geo}
                                            style={{
                                                pressed: { fill: '#02A', outline: 'none' },
                                            }}
                                            className={` outline-none stroke-border stroke-[0.1] ${correctGuesses.find((x) => x.ccn3Code === geo.id) ? 'fill-green-400' : 'fill-primary cursor-pointer hover:fill-blue-700'}`}
                                            onClick={() => handleCountryClick(geo)}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}
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
