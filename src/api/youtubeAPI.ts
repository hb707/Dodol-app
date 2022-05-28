import { Platform } from 'react-native';
import axios from 'axios';
import YOUTUBE_KEY_LIST from '../../youtubeKEY';

export interface YoutubeResultAttribute {
  videoId: string;
  title: string;
  thumbnail: string;
}

const YOUTUBE_KEY =
  Platform.OS === 'ios'
    ? YOUTUBE_KEY_LIST.YOUTUBE_IOS_KEY
    : YOUTUBE_KEY_LIST.YOUTUBE_ANDROID_KEY;

const youtubeAPI = async (payload: string) => {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${payload}&key=${YOUTUBE_KEY}&type=video&maxResults=5`;
  const response = await axios.get(url);
  const youtubeResult = response.data.items.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: YoutubeResultAttribute[], cur: any) => {
      const result: YoutubeResultAttribute = {
        videoId: cur.id.videoId,
        title: cur.snippet.title,
        thumbnail: cur.snippet.thumbnails.high.url,
      };
      acc.push(result);
      return acc;
    },
    [],
  );
  return youtubeResult;
};

export default youtubeAPI;
