import {styled} from "styled-components";
import React, {SetStateAction, useState} from "react";
import {Track, getTime} from "@/components/Player/utils";

const PlayListWrap =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: block;
      transition: background-color .3s ease-in-out, opacity .3s ease-in-out, visibility .3s;

      &.show {
        visibility: visible;
        opacity: 1;
        background-color: rgba(0, 0, 0, .3);
      }

      &.hidden {
        visibility: hidden;
        opacity: 0;
        background-color: transparent;
      }
    `
const PlayListStack =
    styled.div`
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-end;
      justify-content: center;
    `

const PlayListCard =
    styled.div`
      position: fixed;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      border-radius: 2rem 2rem 0 0;
      background: #FFFFFF;
      height: 75vh;
      max-height: 600px;
      width: 100%;
      transition: bottom .1s ease-in;
      
      .show & {
        bottom: 0;
      }
      
      .hidden & {
        bottom: -75vh;
      }
    `
const PlayListCardTitle =
    styled.div`
      display: flex;
      align-items: center;
      width: 100%;
      padding: 24px;
      gap: 16px;
    `

const Control =
    styled.button`
        
    `

const PlayListGroup =
    styled.div`
      display: flex;
      width: 100%;
      position: relative;
      justify-content: center;
    `

const PlayListCardContent =
    styled.div`
      display: block;
      overflow: auto;
      flex: 1;
      padding: 0 12px;
    `

const PlayItem =
    styled.div`
      display: inline-flex;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 12px;
      border-radius: .75rem;
      transition: transform .5s ease-in-out;

      &.highlight {
        background-color: #eceff1;
      }
    `

const PlayItemLabel =
    styled.div`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      line-height: 24px;
      gap: 8px;
    `

const PlayList = ({tracks, trackIndex, setTrackIndex, isShowing, setIsShowing} : {
    tracks: Track[],
    trackIndex: number,
    setTrackIndex: React.Dispatch<SetStateAction<number>>,
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>
}) => {
    const [X, setX] = useState(0)
    const target: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()
    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setX(e.clientX)
        console.log(target)
    }
    const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setX(e.touches[0].clientX)
    }
    const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.clientX - X > -300) {
            target.current !== null ? target.current.style.transform = `translateX(-30px)` : null;
        } else {
            target.current !== null ? target.current.style.transform = `translateX(-300px)` : null;
        }
        console.log(target)
    }
    const onTouch = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches[0].clientX - X > -150) {
            target.current !== null ? target.current.style.transform = `translateX(-15px)` : null;
        } else {
            target.current !== null ? target.current.style.transform = `translateX(-150px)` : null;
        }
    }
    const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        target.current !== null ? target.current.style.transform = `translateX(0px)` : null;
        console.log(e.clientX - X < -300 ? '是否删除？' : null)
        console.log(target)
    }
    const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        target.current !== null ? target.current.style.transform = `translateX(0px)` : null;
        console.log(e.changedTouches[0].clientX - X < -150 ? '是否删除？' : null)
    }
    return (
        <PlayListWrap className={`${isShowing?'show':'hidden'}`}>
            <PlayListStack>
                <PlayListCard>
                    <PlayListCardTitle>
                        <Control onClick={() => setIsShowing(false)}>×</Control>
                        <PlayListGroup>
                            <div className="text-[24px]">播放列表（{tracks.length}）</div>
                        </PlayListGroup>
                    </PlayListCardTitle>
                    <PlayListCardContent>
                        {tracks && (
                            tracks.map((item: Track, index) => {
                                return(
                                    <PlayItem
                                        key={index}
                                        className={index === trackIndex ? 'highlight' : 'normal'}
                                        onClick={() => setTrackIndex(index)}
                                        onDragStart={e => dragStart(e)}
                                        onDragOver={e => onDrag(e)}
                                        onDragEnd={e => dragEnd(e)}
                                        onTouchStart={e => touchStart(e)}
                                        onTouchMove={e => onTouch(e)}
                                        onTouchEnd={e => touchEnd(e)}
                                        ref={target}
                                        draggable
                                    >
                                        <PlayItemLabel>
                                            <img src={item.cover} className="w-12 h-12 rounded-xl" />
                                            <div className="flex flex-col flex-grow overflow-hidden gap-0.5">
                                                <span className="text-ellipsis whitespace-nowrap overflow-hidden text-[18px]">{item.title}</span>
                                                <span className="text-[14px]">{item.artist}</span>
                                            </div>
                                            <span>{getTime(item.time_length/1000)}</span>
                                        </PlayItemLabel>
                                    </PlayItem>
                                )
                            })
                        )}
                        {!tracks && (
                            <div>
                                歌单空空的，先去找找吧
                            </div>
                        )}
                    </PlayListCardContent>
                </PlayListCard>
            </PlayListStack>
        </PlayListWrap>
    )
}

export default PlayList;