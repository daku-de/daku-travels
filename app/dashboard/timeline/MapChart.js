'use client';

import React, { useEffect, useState } from 'react';
import { csv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, Sphere, Graticule, ZoomableGroup, Marker } from 'react-simple-maps';
import Image from 'next/image';
import { countryCodeEmoji } from 'country-code-emoji';
import { cn } from '@/lib/utils';

const geoUrl = '/resources/world-map-with-zoom-factor.json';

const colorScale = scaleLinear().domain([0, 10]).range([1, 5]);

const MapChart = ({
    countryList,
    generateTooltip,
    className,
    showTooltip,
    highlightColor = '',
    zoom = 1,
    center = [10, 0],
    disableZoom = false,
    onMove = (coordinates, zoom) => {},
    region = { name: 'The World', geoJsonName: 'World' },
}) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [displayTooltip, setDisplayTooltip] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [tooltip, setTooltip] = useState();

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
        const country = {
            name: geo.properties.name,
            code: geo.properties.iso_a2_eh !== '-99' ? geo.properties.iso_a2_eh : geo.properties.adm0_a3,
            id: geo.properties.adm0_a3,
        };
        setDisplayTooltip(true);
        setTooltip(generateTooltip(country));
    };

    const handleMouseLeave = () => {
        setDisplayTooltip(false);
        setTooltip(<></>);
    };

    const handleCountryClick = (geo) => {
        console.log(geo.properties);
    };

    return (
        <>
            {showTooltip && (
                <div
                    style={tooltipStyle}
                    className={`fixed z-50 pointer-events-none ${displayTooltip ? 'block' : 'hidden'}`}
                >
                    {tooltip}
                </div>
            )}
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147,
                }}
                className={cn('w-[800px]', className)}
                height={400}
            >
                <ZoomableGroup
                    translateExtent={[
                        [0, 0],
                        [800, 400],
                    ]}
                    maxZoom={100}
                    onMoveStart={() => {
                        setDisplayTooltip(false);
                    }}
                    filterZoomEvent={(ev) => {
                        return !disableZoom && ev.type !== 'dblclick';
                    }}
                    onMove={({ zoom }) => {
                        setScaleFactor(zoom);
                    }}
                    onMoveEnd={({ coordinates, zoom }) => {
                        onMove(coordinates, zoom);
                    }}
                    zoom={zoom}
                    center={center}
                    className="firefox-will-change-transform"
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
                                                pressed: { fill: 'red' },
                                                default: {
                                                    fill: `${countryList.find((x) => x.id === geo.properties.adm0_a3) && highlightColor ? highlightColor : ''}`,
                                                },
                                            }}
                                            className={`outline-none stroke-border stroke-[0.1] cursor-pointer ${region.geoJsonName !== 'World' && !geo.properties.continent.split(', ').find((i) => i === region.geoJsonName) && 'opacity-10'}  ${countryList.find((x) => x.id === geo.properties.adm0_a3) ? 'fill-red-400' : 'fill-primary  hover:fill-blue-700'}`}
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
        </>
    );
};

export default MapChart;
