import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

Chart.register(LineController, Tooltip, LineElement, PointElement, LinearScale, Title, CategoryScale);

//Type Decalaration
interface CountryData {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
    };
    active: number;
    recovered: number;
    deaths: number;
}
interface WorldData {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
    };
    active: number;
    recovered: number;
    deaths: number;
}

interface GraphData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
        tension: number;
    }[];
    cases: {
        [date: string]: number;
    };
}

interface WorldData {
    cases: number;
    recovered: number;
    deaths: number;
}


const ChartAndMap: React.FC = () => {

    //State Decalaration
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [countryData, setCountryData] = useState<CountryData[]>([]);
    const [worldData, setWorldData] = useState<WorldData | null>(null);
    const [center, setCenter] = useState<[number, number]>([0, 0]);


    //UseEffect  hook with setInterval of Interval 3ms to featch data every 3ms to give realtime analytics
    useEffect(() => {
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);


    //Function to calling all fetch function together
    const fetchData = () => {
        fetchWorldData();
        fetchCountryData();
        fetchGraphData();
    }

    //UseEffect hook to update center of map according to recieved  lat, long from data
    useEffect(() => {
        if (countryData && countryData.length > 0) {
            const { lat, long } = countryData[0].countryInfo;
            setCenter([lat, long]);
        }
    }, [countryData]);

    //UseEffect hook to fix issue occuring in map marker
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIconRetina,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });
    }, []);

    //Function to fetch WorldData  from respective api
    const fetchWorldData = async () => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://disease.sh/v3/covid-19/all');
                const data = await response.json();
                setWorldData(data);
            } catch (error) {
                console.error('Error fetching world data:', error);
            }
        }, 1000);
    };

    //Function to fetch CountryData  from respective api
    const fetchCountryData = async () => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://disease.sh/v3/covid-19/countries');
                const data = await response.json();
                setCountryData(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        }, 1000);
    };

    //Function to fetch WorldData  from respective api
    const fetchGraphData = async () => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
                const data = await response.json();
                setGraphData(data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        }, 2000);
    };




    //Function for generating  graph data with labels and datasets values
    const generateLineGraphData = (graphData: GraphData) => {
        const { cases } = graphData;

        //When no cases  exist
        if (!cases) {
            return null;
        }
        const data = {
            labels: Object.keys(cases),
            datasets: [
                {
                    label: 'Cases',
                    data: Object.values(cases),
                    fill: false,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    tension: 0.3,
                },
            ],
        };

        return data;
    };

    //Function to generate label and MapMarker of fetched data
    const generateMapMarkers = () => {
        if (countryData) {
            return (countryData?.map((country) => {
                if (country?.countryInfo && country?.countryInfo.lat && country?.countryInfo?.long) {
                    const { lat, long } = country?.countryInfo;
                    return (
                        <Marker key={country?.country} position={[country?.countryInfo.lat, country?.countryInfo?.long]}>
                            <Popup>
                                <div>
                                    <h3>{country?.country}</h3>
                                    <p>Total Active Cases: {country?.active}</p>
                                    <p>Total Recovered Cases: {country?.recovered}</p>
                                    <p>Total Deaths: {country?.deaths}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                }
                return null;
            }))
        }
        return null;
    };


    //Lineoption properties to format LineGraph
    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Cases Fluctuations Chart',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <div className="w-[90vw] flex flex-col  gap-y-20">
            {/* WorldWide Analtytics */}
            <div className="section-map">
                <div className="font-bold text-xl text-gray-600 mb-2">Worldwide Cases</div>
                <hr />
                {
                    worldData && worldData ? (
                        <div>
                            <p className='text-blue-700 border-b-2'><span className='font-semibold text-lg '>Active Cases: </span>{worldData?.active}</p>
                            <p className='text-green-700 border-b-2'><span className='font-semibold text-lg '>Total Recovered Cases: </span>{worldData?.recovered}</p>
                            <p className='text-red-700 border-b-2'><span className='font-semibold text-lg '>Total Deaths Cases: </span>{worldData?.deaths}</p>
                        </div>
                    ) : (<div>
                        <p className='text-blue-700 border-b-2'><span className='font-semibold text-lg '>Active Cases: </span>Loading...</p>
                        <p className='text-green-700 border-b-2'><span className='font-semibold text-lg '>Total Recovered Cases:</span>Loading... </p>
                        <p className='text-red-700 border-b-2'><span className='font-semibold text-lg '>Total Deaths Cases: </span>Loading...</p>
                    </div>)
                }
            </div>

            {/* Graph of Cases Fluctuations */}
            <div className="section-graph">
                <div className="font-bold text-xl text-gray-600 mb-2">Line Graph - Cases Fluctuations</div>
                <hr />
                {
                    graphData ? (
                        <div className='border-2 flex  justify-center items-center  rounded-md' style={{ height: '400px', width: '100%' }}>
                            <Line data={generateLineGraphData(graphData) as any} options={lineOptions} />
                        </div>
                    ) :
                        (<div className='border-2 flex rounded-md bg-gray-200 text-xl font-bold justify-center items-center text-gray-500' style={{ height: '400px', width: '100%' }}>
                            Graph Data is loading....
                        </div>
                        )
                }
            </div>

            {/* Map with respective country marker and popups */}
            <div className="section-map mb-64">
                <div className="font-bold text-xl text-gray-600 mb-2">Map - Country-wise Cases</div>
                {countryData?.length > 0 ? (<div className='border-2  overflow-y-scroll rounded-lg' style={{ height: '400px', width: '100%' }}>
                    {countryData && <MapContainer style={{ height: '100%', width: '100%' }} center={center} zoom={1} scrollWheelZoom={false} >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {generateMapMarkers()}
                    </MapContainer>}
                </div>
                ) : (
                    <div className='border-2 flex  overflow-y-scroll rounded-md bg-gray-200 text-xl font-bold justify-center items-center text-gray-500' style={{ height: '400px', width: '100%' }}> Map Data is loading....</div>
                )}
            </div>
        </div>
    )
};

export default ChartAndMap;