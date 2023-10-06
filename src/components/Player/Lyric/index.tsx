import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Track} from "@/components/Player/utils";

type lyricType = {
    offset: number,
    text: string
}

const LyricWrap =
    styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      flex: 1;

      ::-webkit-scrollbar {
        width: 8px;
        height: 100%;
        opacity: 0;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        width: 10px;
        height: 30px;
        background-color: rgba(255,255,255,.3);
        border-radius: 4px;
        cursor: pointer;
      }
    `

const Scroll =
    styled.div`
      width: 90%;
      height: 64px;
      overflow-y: hidden;
      overflow-x: hidden;
    `

const Waterfall =
    styled.div`
      width: 100%;
      height: auto;
      letter-spacing: 0.1em;
      overflow: hidden;
      position: relative;
      display: grid;
      grid-auto-rows: 32px;
      transition: transform 120ms linear;
      transform: translateY(0px);
      will-change: transform;
    `

const Line =
    styled.div`
      display: inline-grid;
      text-align: center;
      align-items: center;
      opacity: .01;
      font-size: 16px;
      font-weight: 500;
      width: 100%;
      white-space: nowrap;
      overflow: scroll;
      letter-spacing: 2px;
      will-change: opacity, font-size, font-weight;
      transition: all 100ms ease;
      
      &.bubble {
        font-weight: 700;
        opacity: 1;
        font-size: 20px;
      }
      
      &.await {
        opacity: .6;
      }
    `

const Lyric = ({ tracks, trackIndex, trackProgress, isPlaying }:{ tracks: Track[], trackIndex: number, trackProgress: number, isPlaying: boolean }) => {
    const [number, setNumber] = useState(0);
    const target: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    const parseLrc = (str: string) => {
        const regex: RegExp = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;
        const lines: string[] | null = str.split("\n");
        const output: lyricType[] = [];
        const parseTime = (time: string) => {
            const minsec = time.split(":");
            const min = parseInt(minsec[0]) * 60;
            const sec = parseFloat(minsec[1]);
            return min + sec;
        };
        lines.forEach((line) => {
            const match: RegExpMatchArray | null = line.match(regex);
            if (match && match.groups) {
                const { time, text } = match.groups;
                output.push({
                    offset: Number(parseTime(time).toFixed(2)),
                    text: text.trim()
                });
            }
        });
        return output;
    };

    const lyric = parseLrc(tracks[trackIndex].lyric);

    const syncLyric = (lyrics: lyricType[], time: number) => {
        const scores : number[] = [];
        lyrics.map((lyric : lyricType) => {
            const score = time - lyric.offset;
            if (score >= -0.3) {
                scores.push(score);
            }
        });
        if (scores.length === 0) return null;
        const closest : number = Math.min(...scores);
        return scores.indexOf(closest);
    };

    useEffect(() => {
        setNumber(syncLyric(lyric, trackProgress) as number);
        target.current !== null ? target.current.style.transform = `translateY(${-(32 * number)}px)` : null;
    }, [trackProgress]);

    return (
        <LyricWrap>
            <Scroll>
                <Waterfall ref={target}>
                    {lyric.length ? (
                        lyric.map((item: lyricType, index : number) => {
                            return (
                                <Line
                                    key={index}
                                    className={
                                        number === index
                                            ? "bubble"
                                            : number === index - 1
                                                ? "await"
                                                : ""
                                    }
                                    data-time={item.offset}
                                    style={number === index ? {} : {}}
                                >
                                    {item.text}
                                </Line>
                            );
                        })
                    ) : (
                        <Line className="bubble">暂无歌词</Line>
                    )}
                </Waterfall>
            </Scroll>
        </LyricWrap>
    );
}

export default Lyric;