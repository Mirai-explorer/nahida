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
      backdrop-filter: blur(4px);
      background: rgba(255,255,255,.15);
      
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

const Search = ({isShowing, setIsShowing, setTracks, tracks, updates, setUpdate} : {isShowing: boolean, setIsShowing: React.Dispatch<SetStateAction<boolean>>, setTracks: React.Dispatch<SetStateAction<Track[]>>, tracks: Track[], updates: number, setUpdate: React.Dispatch<SetStateAction<number>>}) => {
    const [value, setValue] = React.useState('')
    const [result, setResult] = React.useState([{
        FileName: 'null',
        FileHash: 'null',
        AlbumID: 'null',
        AlbumName: 'null',
        Duration: 0,
        OriSongName: 'null',
        Auxiliary: 'null'
    }])

    const watchInputValue = (value:string) => {
        setValue(value)
    }

    const doSearch = (keyword: string) => {
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
                if (!res.data.error_code) {
                    let list: resultType[] = [];
                    res.data.data.lists.map((item: resultType)=>{
                        list.push({
                            FileName: item.FileName,
                            FileHash: item.FileHash,
                            AlbumID: item.AlbumID,
                            AlbumName: item.AlbumName,
                            Duration: item.Duration,
                            OriSongName: item.OriSongName,
                            Auxiliary: item.Auxiliary
                        })
                    })
                    setResult(list)
                }
            })
            .catch(err => {
                console.error('Please try again later')
            })
    }

    const addToTracks = (dataset: DOMStringMap) => {
        let track = {
            code: dataset.hash,
            album_id: dataset.album_id
        }
        let flag = false
        tracks.map(item => {
            if (track.code === item.code) {
                flag = true
                console.log('不可重复添加！')

            }
        })
        !flag && fetchMusicSource(track).then(res => {
            let item = res.data.data;
            let track_new: Track = {
                title: item.song_name,
                subtitle: item.album_name,
                artist: item.author_name,
                src: item.play_url,
                cover: item.img,
                lyric: item.lyrics,
                album_id: item.album_id,
                code: item.hash,
                timestamp: new Date().getTime() + 86400000,
                unique_index: tracks.length + 1,
                time_length: item.timelength
            };
            console.log([...tracks, track_new])
            setTracks([...tracks, track_new])
            setUpdate(updates + 1)
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
                            <SearchCardInput type="text" autoFocus onChange={e => watchInputValue(e.target.value)} />
                            <SearchCardButton name="search" onClick={() => doSearch(value)}>
                                <SearchIcon />
                            </SearchCardButton>
                        </SearchGroup>
                    </SearchCardTitle>
                    <SearchCardContent>
                        { result[0].AlbumID !== 'null' ? (
                            result.map((item: resultType, index) => {
                                return(
                                    <SearchItem key={index}>
                                        <SearchItemLabel>
                                            <span className="inline-flex items-center">
                                                <input type="checkbox" className="p-2 bg-sky-100 checked:bg-sky-300 me-2" data-hash={item.FileHash} data-album_id={item.AlbumID} onClick={(e) => {addToTracks((e.target as HTMLElement).dataset)}} />
                                                {item.FileName}
                                            </span>
                                            <span>{Math.trunc(item.Duration / 60) > 9 ? '' : '0'}{Math.trunc(item.Duration / 60)}:{item.Duration % 60 > 9 ? '' : '0'}{item.Duration % 60}</span>
                                        </SearchItemLabel>
                                    </SearchItem>
                                )
                            })
                        ) : (
                            <div>
                                输入歌曲或歌手名称开始搜索吧
                            </div>
                        )
                        }
                    </SearchCardContent>
                </SearchCard>
            </SearchStack>
        </SearchWrap>
    )
}

export default Search;