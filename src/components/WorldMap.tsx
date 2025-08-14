import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip } from 'react-tooltip';
import { countryCodeMap } from "../lib/translations";
import geoUrl from "../lib/world-110m.json";

function formatGdpForTooltip(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2,
    }).format(value);
}

interface WorldMapProps {
    data?: { countryCode: string; value: number; name: string }[];
}

export function WorldMap({ data }: WorldMapProps) {
    const [tooltipContent, setTooltipContent] = useState('');

    if (!data || data.length === 0) {
        return <div className="text-slate-400">Aguardando dados para o mapa...</div>;
    }

    const maxGdp = Math.max(...data.map(d => d.value).filter(v => v !== null), 0);
    const colorScale = scaleLinear<string>().domain([0, maxGdp]).range(['#475569', '#22c55e']);

    return (
        <>
            <ComposableMap
                data-tooltip-id="map-tooltip"
                projectionConfig={{ scale: 140 }}
                style={{ width: "100%", height: "100%" }}
            >
                <Graticule stroke="#334155" strokeWidth={0.5} />
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const countryNameFromMap = geo.properties.name;

                            const countryCode = countryCodeMap[countryNameFromMap];

                            const d = data.find(s => s.countryCode === countryCode);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={d ? colorScale(d.value) : "#334155"}
                                    stroke="#1e293b"
                                    strokeWidth={0.5}
                                    onMouseEnter={() => {
                                        setTooltipContent(d ? `${d.name}: ${formatGdpForTooltip(d.value)}` : countryNameFromMap);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent('');
                                    }}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#F59E0B", outline: "none", cursor: "pointer" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <Tooltip
                id="map-tooltip"
                content={tooltipContent}
                className="map-tooltip-style" 
            />
        </>
    );
}