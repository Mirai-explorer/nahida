import { styled, keyframes } from "styled-components";
import React, {useEffect, useRef} from "react";

type propsType = {
    title: string;
    subtitle: string;
    singer: string;
    trackIndex: number;
}

const TitleWrap =
    styled.div`
      display: flex;
      flex-direction: column;
      width: 90%;
      height: 72px;
      color: white;
      overflow: hidden;
    `

const carousel =
    keyframes`
      0% {
        transform: translateX(0%);
      }

      20% {
        transform: translateX(0%);
      }

      100% {
        transform: translateX(-100%);
      }
    `

const Line =
    styled.div`
      display: inline-block;
      line-height: 1.5rem;
      margin: 5px 0;
      overflow: hidden;
      white-space: nowrap;
      
      &.primary {
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 3px 6px rgba(0,0,0,.16);
        letter-spacing: 0.06em;
      }
      
      .content {
        animation-name: ${carousel};
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 0s;
      }
      
      .secondary {
        font-size: 16px;
        text-shadow: 0 3px 6px rgba(0,0,0,.16);
        letter-spacing: 0.06em;
        color: rgba(255, 255, 255, .9);
      }
      
      &.tertiary {
        font-size: 16px;
        letter-spacing: 0.04em;
        color: rgba(255, 255, 255, .8);
      }
    `

const Title = (props: propsType) => {
    const ref: React.RefObject<HTMLDivElement> = React.createRef()
    useEffect(() => {
        const el = ref.current
        const speed = el!.scrollWidth / 30
        ref.current!.style.animationDuration = 0+'s'
        if (el!.clientWidth < el!.scrollWidth) {
            ref.current!.style.animationDuration = speed+'s'
        }
    }, [props.trackIndex]);
    return (
        <TitleWrap>
            <Line className="primary">
                <div className="content" ref={ref}>
                    {props.title}
                    <span className="secondary"> （{props.subtitle}）</span>
                </div>
            </Line>
            <Line className="tertiary">
                <div className="content">
                    {props.singer}
                </div>
            </Line>
        </TitleWrap>
    )
}

export default Title;