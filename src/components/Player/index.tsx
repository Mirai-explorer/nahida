"use client";
import React, { useState, useEffect, useRef } from "react";
import Title from "@/components/Title";
import Cover from "@/components/Cover";
import Lyric from "@/components/Lyric";
import Progress from "@/components/Progress";
import Controller from "@/components/Controller";
import "../bundle.css";
import styled from 'styled-components';

interface Track {
    title: string,
    subtitle: string,
    artist: string,
    color: string,
    image: string,
    audioSrc: string
}

// 样式
const MiraiPlayer = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
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
`

const Layout = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0;
      color: white;

      &::before {
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

const Player = ({tracks}:{tracks: Track[]}) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    // @ts-ignore
    const [rotate, setRotate] = useState("paused");
    const [size, setSize] = useState("default");

    // Destructure for conciseness
    const { title, subtitle, artist, color, image, audioSrc } = tracks[
        trackIndex
        ];

    // Refs
    const audioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio(audioSrc) : undefined
    );
    const intervalRef = useRef(0);
    const isReady = useRef(false);

    // Destructure for conciseness
    const { duration } = audioRef.current || { duration: 0 };

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
        console.log(value);
        audioRef.current!.currentTime = value;
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    };

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current!.play();
            startTimer();
            setIsRotating(true);
        } else {
            audioRef.current!.pause();
            setIsRotating(false);
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

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [trackIndex]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current!.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    const getTime = (type: number) => {
        let timeDisplay = Math.floor(type);
        let min = timeDisplay / 60;
        // @ts-ignore
        let mins : number | string = parseInt(min);
        if (mins < 10) {
            mins = "0" + mins;
        } else if (isNaN(mins)) {
            mins = "--";
        }
        let sec = timeDisplay % 60;
        let secs : number | string = Math.round(sec);
        if (secs < 10) {
            secs = "0" + secs;
        } else if (isNaN(secs)) {
            secs = "--";
        }
        return mins + ":" + secs;
    };

    const past = getTime(trackProgress);
    const _duration = getTime(duration);

    return(
        <MiraiPlayer>
            <Layout>
                <Title
                    title={title||"音乐感动生活"}
                    subtitle={subtitle||"Mirai云端播放器"}
                    singer={artist||"未知歌手"}
                />
                <Cover
                    rotate={rotate}
                    url={image}
                    size="default"
                    desc="音乐专辑封面"
                />
                <Lyric
                    trackIndex={trackIndex}
                    trackProgress={trackProgress}
                    isPlaying={isPlaying}
                />
                <Progress
                    past = {past}
                    _duration = {_duration}
                    trackProgress = {trackProgress}
                    duration = {duration}
                    onScrub = {onScrub}
                    onScrubEnd = {onScrubEnd}
                    trackStyling = {trackStyling}
                />
                <Controller
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
            </Layout>
        </MiraiPlayer>
    )
}

export default Player;