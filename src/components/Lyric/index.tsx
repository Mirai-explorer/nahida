import React, { useEffect, useState, useRef } from "react";
import tracks from "../../public/data/tracks";
import styled from "styled-components";

const LyricWrap =
    styled.div`
      display: flex;
      align-items: center;
      flex: 1;
      padding: 2rem 0;

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
      width: 100%;
      height: 80px;
      overflow-y: hidden;
      overflow-x: hidden;
    `

const Waterfall =
    styled.div`
      width: 100%;
      height: auto;
      letter-spacing: 0.1em;
      overflow: hidden;
    `

const Line =
    styled.div`
      display: inline-flex;
      line-height: 40px;
      opacity: 0.1;
      visibility: visible;
      font-size: 20px;
      white-space: nowrap;
      transition: font-size 10ms linear, text-shadow 10ms linear;
      margin: 0 8vw;
      width: 84vw;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: 2px;
      
      &.bubble {
        visibility: visible;
        font-weight: 500;
        opacity: 1;
        transition: font-size 150ms,text-shadow 150ms;
        font-size: 25px;
      }
      
      &.await {
        visibility: visible;
        color: #fff;
        opacity: .6;
        transition: font-size 150ms,text-shadow 150ms;
        font-size: 20px;
      }
    `

const Lyric = ({ trackIndex, trackProgress, isPlaying }:{ trackIndex: number, trackProgress: number, isPlaying: boolean }) => {
    const [number, setNumber] = useState(0);
    const target: React.RefObject<HTMLDivElement> = React.createRef();
    const parseLrc = (str: string) => {
        const regex : RegExp = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;
        const lines : string[] | null = str.split("\n");
        const output : [] = [];
        const parseTime = (time: string) => {
            const minsec = time.split(":");
            const min = parseInt(minsec[0]) * 60;
            const sec = parseFloat(minsec[1]);
            return min + sec;
        };
        lines.forEach((line) => {
            const match : RegExpMatchArray | null = line.match(regex);
            if (match === null) return;
            // @ts-ignore
            const { time, text } = match.groups;
            // @ts-ignore
            output.push({
                offset: parseTime(time).toFixed(2),
                text: text.trim()
            });
        });
        return output;
    };

    const lyric = parseLrc(tracks[trackIndex].lyric);

    type lyricType = {
        offset: number,
        text: string
    }

    const syncLyric = (lyrics: [], time: number) => {
        const scores : [] = [];
        lyrics.forEach((lyric : lyricType) => {
            const score = time - lyric.offset;
            if (score >= -0.1) { // @ts-ignore
                scores.push(score);
            }
        });
        if (scores.length === 0) return null;
        const closest : number = Math.min(...scores);
        // @ts-ignore
        return scores.indexOf(closest);
    };

    useEffect(() => {
        setNumber(syncLyric(lyric, trackProgress) as number);
        target.current !== null ? target.current.scrollTop = 40 * number : null;
    }, [trackProgress]);

    return (
        <LyricWrap>
            <Scroll ref={target}>
                <Waterfall>
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
                        <div className="bubble">暂无歌词</div>
                    )}
                </Waterfall>
            </Scroll>
        </LyricWrap>
    );
}

export default Lyric;