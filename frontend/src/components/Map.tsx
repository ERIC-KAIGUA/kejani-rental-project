// Map.tsx (updated)
import React, { useRef, useState, useCallback } from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api'
const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

const containerStyle = {
  width: "100%",
  height: "500px",
}

const defaultCenter = { lat: -1.286389, lng: 36.817223 }

type LatLng = { lat: number; lng: number }
type Property = {
  id?: string | number
  location?: string
  coverImage?: string
  rent?: number
  town?: string
  bedrooms?: number
  description?: string
}

interface MapProps {
  location?: LatLng
  properties?: Property[]
}

const Map: React.FC<MapProps> = ({ location = defaultCenter, properties = [] }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:googleKey, 
    libraries: ['places'],
  })

  const mapRef = useRef<google.maps.Map | null>(null)
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  if (loadError) return <div className="font-bitter">Error loading Google Maps</div>
  if (!isLoaded) return <div className="font-bitter">Loading map...</div>


  // icon config - uses an image you must put in /public/markers/house-marker.png
  const markerIcon = {
    url: '/markers/house logo.png', // place file in public/markers/
    // scaledSize / anchor are google.maps.Size / google.maps.Point only available after maps loaded
    scaledSize: new window.google.maps.Size(40, 40),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 40),
  } as google.maps.Icon

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={12}
        onLoad={onLoad}
      >
        {/* Render markers for each property */}
        {properties.map((prop, idx) => {
         if (!prop.lat || !prop.lng) return null;

              const lat = Number(prop.lat);
              const lng = Number(prop.lng);

              if (isNaN(lat) || isNaN(lng)) return null;

              const position = { lat, lng };
          return (
            <Marker
              key={prop.id ?? idx}
              position={position}
              icon={markerIcon}
              onClick={() => setSelectedProperty(prop)}
            />
          )
        })}

        {/* Optional: show a center marker (search result center) */}
        {location && (
          <Marker
            position={location}
          />
        )}

        {/* InfoWindow */}
       {selectedProperty && (
  <>
    {selectedProperty.lat && selectedProperty.lng && (
      <InfoWindow
        position={{
          lat: Number(selectedProperty.lat),
          lng: Number(selectedProperty.lng)
        }}
        onCloseClick={() => setSelectedProperty(null)}
      >
        <div style={{ maxWidth: 220 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <img
              src={selectedProperty.coverImage ?? '/images/placeholder.jpg'}
              alt="Property"
              style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6 }}
            />
            <div>
              <div style={{ fontWeight: 700 }}>
                {selectedProperty.town || selectedProperty.location || 'Property'}
              </div>
              <div>Ksh {selectedProperty.rent?.toLocaleString() || '—'}</div>
              <div>
                {selectedProperty.bedrooms 
                  ? `${selectedProperty.bedrooms} bedroom${selectedProperty.bedrooms > 1 ? 's' : ''}` 
                  : ''}
              </div>
            </div>
          </div>
          {selectedProperty.description && (
            <p style={{ marginTop: 8, fontSize: '0.9em' }}>
              {selectedProperty.description}
            </p>
          )}
        </div>
      </InfoWindow>
    )}
  </>
)}
      </GoogleMap>
    </div>
  )
}

export default Map
