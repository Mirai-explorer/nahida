import axios from "axios";
import cookie from "react-cookies";

type Track = {
    title: string,
    subtitle: string,
    artist: string,
    src: string,
    cover: string,
    lyric: string,
    album_id: string,
    code: string,
    timestamp: number,
    unique_index: number,
    time_length: number
}

type sTrack = {
    code: string | undefined,
    album_id: string | undefined
}

const fetchMusicSource = async(data: Track | sTrack) => {
    return axios.get('https://bird.ioliu.cn/v1?url=https://wwwapi.kugou.com/yy/index.php', {
        params: {
            r: 'play/getdata',
            hash: data.code,
            album_id: data.album_id,
            dfid: '0hWg5b0DHEyF0n5Sth36GXer',
            mid: cookie.load('kg_mid'),
            platid: 4
        }
    })
} //[INVOLVE]获取歌曲源

export { fetchMusicSource };
export type { Track };
