export async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }

   export async function fetchTrackData(trackId?: string) {
      // Use provided trackId or the currently set one
      const id = trackId 
      try {
        const data = await fetchData(`https://api.deezer.com/track/${id}`);
        console.log("Track data fetched:", data.title);
        //console.log("Track Cover", data.album.cover_medium)
        return data;
      } catch (error) {
        console.error("Error fetching track data:", error);
        return null;
      }
  }
