import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Location = () => {
    const { id } = useParams();
    const [shelter, setShelter] = useState(null);

    useEffect(() => {
        const fetchShelterDetails = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/shelters/${id}`);
                setShelter(data);
            } catch (error) {
                console.error('Error fetching shelter details:', error);
            }
        };

        if (id) {
            fetchShelterDetails();
        }
    }, [id]);

    useEffect(() => {
        if (shelter) {
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: shelter.location.coordinates,
                zoom: 15
            });

            new mapboxgl.Marker()
                .setLngLat(shelter.location.coordinates)
                .addTo(map);

            return () => map.remove();
        }
    }, [shelter]);

    if (!shelter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{shelter.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p><strong>Address:</strong> {shelter.address}</p>
                    <p><strong>Phone:</strong> {shelter.phone}</p>
                    <p><strong>Hours:</strong> {shelter.hours}</p>
                </div>
                <div id="map" style={{ width: '100%', height: '300px' }}></div>
            </div>
        </div>
    );
};

export default Location;
