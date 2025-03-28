import sys
import json
import time
import pandas as pd
from pytrends.request import TrendReq

def fetch_trends(cityA, cityB):
    """Fetch Google Trends data for two cities with rate limit handling."""
    try:
        pytrends = TrendReq(hl="en-US", tz=330)

        # Keywords for search trends
        keywords = [cityA, cityB]

        # Build the payload
        pytrends.build_payload(keywords, cat=0, timeframe="today 3-m", geo="IN", gprop="")

        # Prevent rate limiting errors (429 Too Many Requests)
        time.sleep(10)

        # Fetch interest over time
        trends_data = pytrends.interest_over_time()

        if trends_data.empty:
            print(json.dumps({"error": "No trend data found. Try different keywords."}))
            return

        # Extract relevant columns
        trends_data = trends_data[keywords]
        trends_data.reset_index(inplace=True)

        # Convert timestamps to readable date strings
        trends_data["date"] = trends_data["date"].astype(str)

        # Format response as JSON
        result = {
            "dates": trends_data["date"].tolist(),
            "cityA": trends_data[cityA].tolist(),
            "cityB": trends_data[cityB].tolist(),
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Usage: python trends.py <CityA> <CityB>"}))
    else:
        cityA, cityB = sys.argv[1], sys.argv[2]
        fetch_trends(cityA, cityB)
