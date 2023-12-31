import { styled } from "styled-components";
import React, { SetStateAction } from "react";
import axios from "axios";
import { Track, fetchMusicSource } from "@/components/Player/utils"
import Kugou from "@/public/common/Kugou";
import SearchIcon from "@/public/common/Search";

type resultType = {
    FileName: string,
    FileHash: string,
    AlbumID: string,
    AlbumName: string,
    EMixSongID: string,
    Duration: number,
    OriSongName: string,
    Auxiliary: string
}

const SearchWrap =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-backdrop-filter: blur(8px) contrast(0.5);
      backdrop-filter: blur(8px) contrast(0.5);
      background: rgba(255,255,255,.3);
      z-index: 999;
      content-visibility: auto;
      
      &.show {
        display: block;
      }
    `

const SearchStack =
    styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `

const SearchCard =
    styled.div`
      width: 90vw;
      background: #ffffff;
      height: 90vh;
      border-radius: 0.5rem;
      box-shadow: 1px 2px 4px rgba(0,0,0,.1);
      color: black;
      display: flex;
      flex-direction: column;
      padding: 24px;
      font-size: 16px;
      gap: 16px;
    `

const SearchCardTitle =
    styled.div`
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      gap: 16px;
    `

const SearchGroup =
    styled.div`
      display: flex;
      width: 100%;
      position: relative;
    `

const SearchCardSwitch =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 40px;
      border-radius: 24px 0 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `

const SearchCardInput =
    styled.input`
      border-radius: 999px !important;
      font-size: 16px !important;
      padding: 4px 32px 4px 40px;
      width: 100%;
      transition: all .1s ease-in;
      background: rgba(196, 196, 196, 0.15);
    `

const SearchCardButton =
    styled.button`
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 32px;
    `

const SearchCardContent =
    styled.div`
      display: block;
      overflow: auto;
      flex: 1;
    `

const SearchItem =
    styled.div`
      display: inline-flex;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 12px 0;
    `

const SearchItemLabel =
    styled.label`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      line-height: 24px;
      gap: 8px;
    `

const Search = ({isShowing, setIsShowing, setTracks, tracks, updates, setUpdate, toastMessage, setToastMessage} : {
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>,
    setTracks: React.Dispatch<SetStateAction<Track[]>>,
    tracks: Track[],
    updates: number,
    setUpdate: React.Dispatch<SetStateAction<number>>,
    toastMessage: {
        value: string,
        timestamp: number
    },
    setToastMessage: React.Dispatch<SetStateAction<{
        value: string,
        timestamp: number
    }>>
}) => {
    const [value, setValue] = React.useState('')
    const [result, setResult] = React.useState([{
        FileName: 'null',
        FileHash: 'null',
        AlbumID: 'null',
        AlbumName: 'null',
        EMixSongID: 'null',
        Duration: 0,
        OriSongName: 'null',
        Auxiliary: 'null'
    }])
    const [loading, setLoading] = React.useState(false)

    const watchInputValue = (value:string) => {
        setValue(value)
    }

    const doSearch = (keyword: string) => {
        setLoading(true)
        axios.get('https://bird.ioliu.cn/v1?url=https://songsearch.kugou.com/song_search_v2',{
            params: {
                keyword:keyword,
                page:1,
                pagesize:30,
                userid:-1,
                clientver:'',
                platform:'WebFilter',
                tag:'',
                filter:2,
                iscorrection:1,
                privilege_filter:0
            }})
            .then(res => {
                setLoading(false)
                if (!res.data.err_code) {
                    let list: resultType[] = [];
                    res.data.data.lists.length > 0 && res.data.data.lists.map((item: resultType)=>{
                        list.push({
                            FileName: item.FileName,
                            FileHash: item.FileHash,
                            AlbumID: item.AlbumID,
                            AlbumName: item.AlbumName,
                            EMixSongID: item.EMixSongID,
                            Duration: item.Duration,
                            OriSongName: item.OriSongName,
                            Auxiliary: item.Auxiliary
                        })
                    })
                    list.length !== 0 ? setResult(list) : setResult([])
                } else {
                    throw new Error('an unexpected behavior occurred.')
                }
            })
            .catch(err => {
                setLoading(false)
                setToastMessage({
                    value: '发生不可预知的行为，错误信息：'+err.message,
                    timestamp: new Date().getTime()
                })
                console.error('Please try again later:',err.message)
            })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            doSearch(value)
        }
    }

    const addToTracks = (dataset: DOMStringMap) => {
        let track = {
            code: dataset.hash,
            album_id: dataset.album_id,
            encode_audio_id: dataset.audio_id
        }
        let flag = false
        tracks.map(item => {
            if (track.code === item.code) {
                flag = true
                setToastMessage({
                    value: '不可重复添加',
                    timestamp: new Date().getTime()
                })

            }
        })
        !flag && fetchMusicSource(track).then(res => {
            console.log(res)
            if (!res.data.err_code) {
                let item = res.data.data;
                let track_new: Track = {
                    title: item.song_name,
                    subtitle: item.album_name,
                    artist: item.author_name,
                    src: item.play_url,
                    cover: item.img,
                    lyric: item.lyrics,
                    album_id: item.album_id,
                    encode_audio_id: item.encode_album_audio_id,
                    code: item.hash,
                    timestamp: new Date().getTime() + 86400000,
                    unique_index: tracks.length + 1,
                    time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                };
                console.log([...tracks, track_new])
                setIsShowing(false)
                setTracks([...tracks, track_new])
                setUpdate(updates > 0 ? ++updates : 1)
                setToastMessage({
                    value: item.song_name+' 已加入歌单，可在歌单选取播放',
                    timestamp: new Date().getTime()
                })
            } else {
                throw new Error('an unexpected behavior occurred.')
            }
        }).catch(err => {
            setToastMessage({
                value: '发生不可预知的行为，错误信息：'+err.message,
                timestamp: new Date().getTime()
            })
            console.error('Please try again later:',err.message)
        })
    }

    return(
        <SearchWrap className={`${isShowing?'show':'hidden'}`}>
            <SearchStack>
                <SearchCard>
                    <SearchCardTitle>
                        <div onClick={() => {setIsShowing(false)}}>×</div>
                        <SearchGroup>
                            <SearchCardSwitch>
                                <Kugou />
                            </SearchCardSwitch>
                            <SearchCardInput type="text" autoFocus onChange={e => watchInputValue(e.target.value)} onKeyDown={e => handleKeyDown(e)} />
                            <SearchCardButton name="search" onClick={() => doSearch(value)}>
                                <SearchIcon />
                            </SearchCardButton>
                        </SearchGroup>
                    </SearchCardTitle>
                    <SearchCardContent>
                        {!loading && result.length > 0 && result[0].AlbumID !== 'null' && (
                            result.map((item: resultType, index) => {
                                return(
                                    <SearchItem key={index}>
                                        <SearchItemLabel>
                                            <span className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="p-2 bg-sky-100 checked:bg-sky-300 me-2"
                                                    data-hash={item.FileHash}
                                                    data-album_id={item.AlbumID}
                                                    data-audio_id={item.EMixSongID}
                                                    onClick={ (e) => {
                                                        addToTracks((e.target as HTMLElement).dataset)
                                                    }}
                                                />
                                                {item.FileName}
                                            </span>
                                            <span>{Math.trunc(item.Duration / 60) > 9 ? '' : '0'}{Math.trunc(item.Duration / 60)}:{item.Duration % 60 > 9 ? '' : '0'}{item.Duration % 60}</span>
                                        </SearchItemLabel>
                                    </SearchItem>
                                )
                            })
                        )}
                        {!loading && result.length > 0 && result[0].AlbumID === 'null' && (
                            <div className="flex justify-center">
                                输入歌曲或歌手名称开始搜索吧
                            </div>
                        )}
                        {!loading && result.length === 0 && (
                            <div className="flex justify-center">
                                没有查询到相关结果
                            </div>
                        )}
                        {loading && (
                            <div className="flex justify-center">
                                搜索中，请等待...
                            </div>
                        )}
                    </SearchCardContent>
                </SearchCard>
            </SearchStack>
        </SearchWrap>
    )
}

export default Search;