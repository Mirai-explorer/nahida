import React from "react";
import Play from "@/public/common/Play";
import Pause from "@/public/common/Pause";
import Next from "@/public/common/Next";
import Prev from "@/public/common/Prev";
import SongList from "@/public/common/SongList";
import { styled, keyframes } from "styled-components";
import Loop from "@/public/common/Loop";
import Random from "@/public/common/Random";
import SingleCycle from "@/public/common/SingleCycle";
import Fullscreen from "@/public/common/Fullscreen";

const ControllerWrap =
    styled.div`
      display: flex;
      align-self: flex-end;
      width: 100%;
      height: 100px;
    `

const ControllerInner =
    styled.div`
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      
      button {
        padding: 0;
        border-style: none;
        outline: none;
        background-color: transparent;
      }
    `
const Left =
    styled.div`
      display: flex;
      width: 48px;
      height: 100%;
      align-items: center;
      
      > button {
        width: 24px;
        height: 24px;
      }
    `
const Center =
    styled.div`
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      margin: auto 0;
      height: 60px;
      
      button {
        margin: .75rem;
        background: #ffffff30;
        box-shadow: 0 0 3px #00000016;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .prev, .next {
        width: 40px;
        height: 40px;
      }

      .play, .pause {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .icon-play {
        transform: translateX(3px);
      }
    `

const Right =
    styled(Left)`
    `

const Button =
    styled.button`
      -webkit-appearance: none;
      background: none;
      border: none;
      cursor: pointer;
    `

const setFullscreen = () => {
    document.fullscreenElement !== null ? document.exitFullscreen() : document.documentElement.requestFullscreen()
}

const Controller = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick, onPlayListClick} : {
    isPlaying : boolean,
    onPlayPauseClick: React.Dispatch<React.SetStateAction<boolean>>,
    onPrevClick: React.MouseEventHandler<HTMLButtonElement>,
    onNextClick: React.MouseEventHandler<HTMLButtonElement>,
    onPlayListClick: React.Dispatch<React.SetStateAction<boolean>>
}) => (
    <ControllerWrap>
        <ControllerInner>
            <Left>
                {isPlaying ? (
                    <Button
                        type="button"
                        className="loop"
                        onClick={() => onPlayPauseClick(false)}
                        aria-label="Loop"
                    >
                        <Loop />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        className="random"
                        onClick={() => onPlayPauseClick(true)}
                        aria-label="Random"
                    >
                        <SingleCycle />
                    </Button>
                )}
            </Left>
            <Center>
                <Button
                    type="button"
                    className="prev"
                    aria-label="Previous"
                    onClick={onPrevClick}
                >
                    <Prev fill="#ffffff" />
                </Button>
                {isPlaying ? (
                    <Button
                        type="button"
                        className="pause"
                        onClick={() => onPlayPauseClick(false)}
                        aria-label="Pause"
                    >
                        <Pause />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        className="play"
                        onClick={() => onPlayPauseClick(true)}
                        aria-label="Play"
                    >
                        <Play />
                    </Button>
                )}
                <Button
                    type="button"
                    className="next"
                    aria-label="Next"
                    onClick={onNextClick}
                >
                    <Next />
                </Button>
            </Center>
            <Right>
                <Button
                    type="button"
                    className="songlist"
                    aria-label="SongList"
                    onClick={() => setFullscreen()}
                >
                    <Fullscreen />
                </Button>
                <Button
                    type="button"
                    className="songlist"
                    aria-label="SongList"
                    onClick={() => onPlayListClick(true)}
                >
                    <SongList />
                </Button>
            </Right>
        </ControllerInner>
    </ControllerWrap>
);

export default Controller;