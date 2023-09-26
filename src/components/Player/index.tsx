"use client";
import React, {useEffect, useRef, useState} from "react";
import Title from "./Title";
import Cover from "./Cover";
import Lyric from "./Lyric";
import Progress from "./Progress";
import Controller from "./Controller";
import Search from "./Search";
import "../bundle.css";
import styled from 'styled-components';
import {DBConfig} from "@/app/IDBConfig";
import {initDB, useIndexedDB} from "react-indexed-db-hook";
import tracks0 from "@/public/data/tracks";
import cookie from "react-cookies";
import axios from "axios";
import Md5 from 'crypto-js/md5';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Track, fetchMusicSource } from "./utils";
import PlayList from "@/components/Player/PlayList";

initDB(DBConfig);

// 样式
const MiraiPlayer =
    styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: -apple-system,BlinkMacSystemFont,"SF Pro SC",PingFang SC,Helvetica Neue,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: transparent;
      
      *::selection {
        background-color: rgba(218,218,218,.1);
      }
      
      input {
        border-radius: 0;
        font-size: 15px;
        outline: none;
      }
      
      input, button, ul, li {
        -webkit-appearance: none;
      } 
      
      &::after {
          background: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
          width: 100%;
          height: 100%;
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
        }
    `

const Layout =
    styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0;
      color: white;
      backdrop-filter: blur(8px) brightness(0.9);
      transition: scale .3s ease-in-out;
      
      &.full {
        scale: 1.0;
      }
      
      &.scale {
        scale: 0.9;
      }
      
    `

const Player = () => {
    const { add, deleteRecord, update, getAll } = useIndexedDB("playlist");
    // State
    const [tracks, setTracks] = useState(tracks0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [rotate, setRotate] = useState("paused");
    const [size, setSize] = useState("mini");
    const [alive, setAlive] = useState(false);
    const [updates, setUpdate] = useState(0);
    const [isShowing, setIsShowing] = useState(false);
    const [playListShowing, setPlayListShowing] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        value: '',
        timestamp: new Date().getTime()
    });

    // Destructure for conciseness
    const {title, subtitle, artist, cover, src, time_length} = tracks[trackIndex];

    // Refs
    const audioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio(src) : undefined
    );
    const intervalRef = useRef(0);
    const isReady = useRef(false);

    // Destructure for conciseness
    const {duration} = audioRef.current || {duration: 0};

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, wheat), color-stop(${currentPercentage}, rgba(255,255,255,.5)))
  `;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            if (audioRef.current!.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current!.currentTime);
            }
        }, 100);
    };

    const onScrub = (value: number) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        //audioRef.current.currentTime = value;
        setTrackProgress(value);
    };

    const onScrubEnd = (value: number) => {
        // If not already playing, start
        console.log(value, time_length);
        if (value < time_length / 1000) {
            audioRef.current!.currentTime = value
        } else {
            audioRef.current!.currentTime = audioRef.current!.currentTime
            setToastMessage({
                value: '超出试听时长',
                timestamp: new Date().getTime()
            })
        }
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    const toPrevTrack = () => {
        trackIndex - 1 < 0 ? setTrackIndex(tracks.length - 1) : setTrackIndex(trackIndex - 1);
    };

    const toNextTrack = () => {
        trackIndex < tracks.length - 1 ? setTrackIndex(trackIndex + 1) : setTrackIndex(0);
    };

    const notify = (string: string) => toast(string);

    const setUpdatedTracks = () => {
        getAll().then((_tracks: Track[]) => {
            console.log('tracks check once again:',_tracks)
            if (_tracks.length > 0) {
                setTracks(_tracks);
                setTrackIndex(trackIndex);
                setAlive(true);
            }
        });
    }

    const switchSearch = () => {
        setIsShowing(true);
    }

    const handleAllUpdates = (tracks: Track[]) => {
        const time = new Date().getTime();
        let uniques: number[] =  [];
        axios.all(
            tracks.map((item: Track) => {
                if (item.timestamp > time) {
                    console.log('skipped',item.unique_index)
                } else {
                    console.log('ready to update',item.unique_index)
                    uniques.push(item.unique_index)
                    return fetchMusicSource(item)
                }
            })
        ).then(axios.spread((...tasks) => {
            uniques.length > 0 && setToastMessage({
                value: '数据更新中，请稍候...',
                timestamp: new Date().getTime()
            })
            tasks.map((res, i) => {
                if (res) {
                    let item = res.data.data;
                    let regex = /^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
                    if (typeof item.play_url === 'string' && regex.test(item.play_url)) {
                        update({
                            title: item.song_name,
                            subtitle: item.album_name,
                            artist: item.author_name,
                            src: item.play_url,
                            cover: item.img,
                            lyric: item.lyrics,
                            album_id: item.album_id,
                            code: item.hash,
                            timestamp: new Date().getTime() + 86400000,
                            unique_index: uniques[i],
                            time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                        }).then(() => {
                            console.log(i,'saved')
                        })
                    } else {
                        throw new Error("Can't fetch the source")
                    }
                }
            })
            setUpdatedTracks()
        }))
    }

    useEffect(() => {
        getAll().then((tracks: Track[]) => {
            console.log('tracks check:',tracks)
            cookie.save('kg_mid', Md5(uuidv4()), { maxAge: 86400 });
            // 若从数据库获取的音轨数等于0则启用预存数据并更新，否则检查获取音轨是否过期
            tracks.length > 0 ? handleAllUpdates(tracks) : handleAllUpdates(tracks0);
        })
    }, []);

    useEffect(() => {
        updates > 0 && tracks.map((data, i) => {
            update(data).then(r => console.log('a piece of data saved'))
        })
    }, [updates]);

    useEffect(() => {
        toastMessage.value !== '' && notify(toastMessage.value)
    }, [toastMessage]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current!.play()
                .then(() => {
                    startTimer();
                    setIsRotating(true);
                    document.title = '正在播放：'+title+' - 云端音乐播放器 - Mirai探索者'
                })
                .catch((e) => {
                    let value = '';
                    if (e.message.includes('no supported sources')) {
                        value = '播放源出错';
                    } else if (e.message.includes('user didn\'t interact')) {
                        value = '当前浏览器禁止自动播放，请手动点击播放';
                    } else {
                        value = '出现不可预知的错误';
                    }
                    setToastMessage({
                        value: value,
                        timestamp: new Date().getTime()
                    });
                    console.error(e.message)
                });
        } else {
            audioRef.current!.pause();
            setIsRotating(false);
            document.title = '暂停中'+' - 云端音乐播放器 - Mirai探索者'
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isRotating) {
            setRotate("running");
        } else {
            setRotate("paused");
        }
    }, [isRotating]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current!.pause();
        audioRef.current = new Audio(src);
        setTrackProgress(audioRef.current.currentTime);
        if (isReady.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    startTimer();
                    document.title = '正在播放：'+title+' - 云端音乐播放器 - Mirai探索者'
                })
                .catch((e) => {
                    let value = '';
                    if (e.message.includes('no supported sources')) {
                        value = '播放源出错';
                    } else if (e.message.includes('user didn\'t interact')) {
                        value = '当前浏览器禁止自动播放，请手动点击播放';
                    } else {
                        value = '出现不可预知的错误';
                    }
                    setToastMessage({
                        value: value,
                        timestamp: new Date().getTime()
                    });
                    console.error(e.message)
                });
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
        console.log("new audio fired")
    }, [trackIndex, alive]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current!.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    const getTime = (type: number) => {
        let timeDisplay = Math.floor(type);
        let min = !Number.isNaN(timeDisplay) ? timeDisplay / 60 : -1;
        let mins: number | string = min | 0;
        if (mins >= 0 && mins < 10) {
            mins = "0" + mins;
        } else if (mins === -1) {
            mins = "--";
        }
        let sec = !Number.isNaN(timeDisplay) ? timeDisplay % 60 : -1;
        let secs: number | string = sec | 0;
        if (secs >= 0 && secs < 10) {
            secs = "0" + secs;
        } else if (secs === -1) {
            secs = "--";
        }
        return mins + ":" + secs;
    };

    const past = getTime(trackProgress);
    const _duration = getTime(duration);

    return (
        <MiraiPlayer className={`bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out`} style={{backgroundImage: `url(${tracks[trackIndex].cover})`}}>
            <Layout className={playListShowing ? 'scale' : 'full'}>
                <Title
                    title={title || "音乐感动生活"}
                    subtitle={subtitle || "Mirai云端播放器"}
                    singer={artist || "未知歌手"}
                />
                <Cover
                    rotate={rotate}
                    url={cover}
                    data-size={size}
                    desc={title}
                    onDoubleClick={switchSearch}
                />
                <Lyric
                    tracks={tracks}
                    trackIndex={trackIndex}
                    trackProgress={trackProgress}
                    isPlaying={isPlaying}
                />
                <Progress
                    past={past}
                    _duration={_duration}
                    trackProgress={trackProgress}
                    duration={duration}
                    onScrub={onScrub}
                    onScrubEnd={onScrubEnd}
                    trackStyling={trackStyling}
                />
                <Controller
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                    onPlayListClick={setPlayListShowing}
                />
                <Search
                    isShowing={isShowing}
                    setIsShowing={setIsShowing}
                    tracks={tracks}
                    setTracks={setTracks}
                    updates={updates}
                    setUpdate={setUpdate}
                    toastMessage={toastMessage}
                    setToastMessage={setToastMessage}
                />
            </Layout>
            <ToastContainer />
            <PlayList
                isShowing={playListShowing}
                setIsShowing={setPlayListShowing}
            />
        </MiraiPlayer>
    )
}

export default Player;