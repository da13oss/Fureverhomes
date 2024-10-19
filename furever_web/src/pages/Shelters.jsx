import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Component to update map view when center or zoom changes
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const Shelters = () => {
    // State variables
    const [address, setAddress] = useState(''); // Stores the user's input address
    const [position, setPosition] = useState([51.505, -0.09]); // Default map center (London)
    const [zoom, setZoom] = useState(13); // Default zoom level
    const [searchResult, setSearchResult] = useState(null); // Stores the search result

    // Function to handle address search
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Use OpenStreetMap's Nominatim API for geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                // If results found, update map position and zoom
                const { lat, lon } = data[0];
                setPosition([parseFloat(lat), parseFloat(lon)]);
                setZoom(16); // Zoom in to show the specific location
                setSearchResult(data[0].display_name); // Store the full address for display
            } else {
                setSearchResult('No results found');
            }
        } catch (error) {
            console.error('Error searching for address:', error);
            setSearchResult('Error searching for address');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shelters</h1>

            {/* Search form */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter an address"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Display search result */}
            {searchResult && (
                <p className="mb-4 text-sm text-gray-600">
                    Search result: {searchResult}
                </p>
            )}

            {/* Map container */}
            <MapContainer center={position} zoom={zoom} style={{ height: '400px', width: '100%' }}>
                {/* ChangeView component to update map when position or zoom changes */}
                <ChangeView center={position} zoom={zoom} />

                {/* TileLayer provides the map imagery */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker to show the searched location */}
                <Marker position={position}>
                    <Popup>
                        {searchResult || "Selected location"}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Shelters;