// lib/api.js
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

// Helper function to get coordinates for a city
export const getCoordinates = async (location) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();

    if (data.features?.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lat, lon };
    } else {
      console.warn("No coordinates found for:", location);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

// Fetch popular places using coordinates
export const fetchPopularPlaces = async (location) => {
  if (!location || location.trim() === "") {
    return [];
  }
  
  try {
    // First try to get coordinates
    const coords = await getCoordinates(location);
    
    if (!coords) {
      console.warn("Could not get coordinates for:", location);
      // Fall back to mock data for major Indian locations
      return getFallbackPlaces(location);
    }

    const { lat, lon } = coords;

    // Construct the API URL with broader categories and larger radius for more results
    const apiUrl = `https://api.geoapify.com/v2/places?categories=tourism,tourism.sights,tourism.attraction,accommodation.hotel,catering.restaurant&filter=circle:${lon},${lat},10000&limit=20&apiKey=${apiKey}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Places API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debug log
    
    if (data.features?.length > 0) {
      // Transform and filter out places without names
      const places = data.features
        .filter(feature => feature.properties?.name)
        .map(feature => ({
          name: feature.properties.name,
          country: feature.properties.country || "India", // Default to India for Indian searches
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
          image: getPlaceImage(feature.properties)
        }));
      
      return places.length > 0 ? places : getFallbackPlaces(location);
    } else {
      console.warn("No places found in API response for:", location);
      return getFallbackPlaces(location);
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    return getFallbackPlaces(location);
  }
};

// Get appropriate image for place based on available data
const getPlaceImage = (properties) => {
  // Check for place-specific images from Geoapify
  if (properties.images?.photos?.[0]?.src) {
    return properties.images.photos[0].src;
  }
  
  // Use category-based images
  const categories = properties.categories || [];
  const categoryStr = categories.join(",");
  
  if (categoryStr.includes("tourism.sights") || categoryStr.includes("tourism.attraction")) {
    return "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=350&fit=crop";
  } else if (categoryStr.includes("accommodation.hotel")) {
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=350&fit=crop";
  } else if (categoryStr.includes("catering.restaurant")) {
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=350&fit=crop";
  }
  
  // Default image
  return "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=350&fit=crop";
};

// Fallback data for major Indian locations
const getFallbackPlaces = (location) => {
  // Normalized location for easier comparison
  const normalizedLocation = location.toLowerCase().trim();
  
  // India-specific fallback places
  if (normalizedLocation.includes("india")) {
    return [
      {
        name: "Taj Mahal",
        country: "India",
        lat: 27.1751,
        lon: 78.0421,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=350&fit=crop"
      },
      {
        name: "India Gate",
        country: "India",
        lat: 28.6129,
        lon: 77.2295,
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&h=350&fit=crop"
      },
      {
        name: "Hawa Mahal",
        country: "India",
        lat: 26.9239,
        lon: 75.8267,
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=350&fit=crop"
      },
      {
        name: "Golden Temple",
        country: "India",
        lat: 31.6200,
        lon: 74.8765,
        image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&h=350&fit=crop"
      }
    ];
  }
  
  // Match with specific cities
  if (normalizedLocation.includes("delhi")) {
    return [
      {
        name: "India Gate",
        country: "India",
        lat: 28.6129,
        lon: 77.2295,
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&h=350&fit=crop"
      },
      {
        name: "Red Fort",
        country: "India",
        lat: 28.6562,
        lon: 77.2410,
        image: "https://images.unsplash.com/photo-1592635196078-9fec965a14a4?w=500&h=350&fit=crop"
      },
      {
        name: "Qutub Minar",
        country: "India",
        lat: 28.5245,
        lon: 77.1855,
        image: "https://images.unsplash.com/photo-1565026057757-5a76f27d5c43?w=500&h=350&fit=crop"
      },
      {
        name: "Humayun's Tomb",
        country: "India",
        lat: 28.5933,
        lon: 77.2507,
        image: "https://images.unsplash.com/photo-1586152903422-6cdb52772f1a?w=500&h=350&fit=crop"
      }
    ];
  }
  
  if (normalizedLocation.includes("mumbai")) {
    return [
      {
        name: "Gateway of India",
        country: "India",
        lat: 18.9217,
        lon: 72.8347,
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&h=350&fit=crop"
      },
      {
        name: "Marine Drive",
        country: "India",
        lat: 18.9448,
        lon: 72.8234,
        image: "https://images.unsplash.com/photo-1580581096469-27b7126e9ce0?w=500&h=350&fit=crop"
      },
      {
        name: "Elephanta Caves",
        country: "India",
        lat: 18.9633,
        lon: 72.9315,
        image: "https://images.unsplash.com/photo-1590677197930-c44bdc96a452?w=500&h=350&fit=crop"
      },
      {
        name: "Chhatrapati Shivaji Terminus",
        country: "India",
        lat: 18.9398,
        lon: 72.8354,
        image: "https://images.unsplash.com/photo-1595659432152-53f61097b3d6?w=500&h=350&fit=crop"
      }
    ];
  }
  
  // Default fallback
  return [
    {
      name: "Taj Mahal",
      country: "India",
      lat: 27.1751,
      lon: 78.0421,
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=350&fit=crop"
    },
    {
      name: "Gateway of India",
      country: "India",
      lat: 18.9217,
      lon: 72.8347,
      image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&h=350&fit=crop"
    }
  ];
};