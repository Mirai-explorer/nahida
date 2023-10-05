import { styled } from "styled-components";
import Marquee from "react-fast-marquee";
import React, {createRef, useEffect} from "react";

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
      justify-content: space-around;
      width: 100%;
      height: 72px;
      color: white;
      overflow: hidden;
    `

const Line =
    styled.div`
      display: inline-block;
      line-height: 1.5rem;
      overflow: hidden;
      white-space: nowrap;
      
      &.primary {
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 3px 6px rgba(0,0,0,.16);
        letter-spacing: 0.06em;
      }
      
      .secondary {
        font-size: 16px;
        text-shadow: 0 3px 6px rgba(0,0,0,.16);
        letter-spacing: 0.06em;
        color: rgba(255, 255, 255, .9);
      }
      
      .blank_fill {
        display: inline-flex;
        width: 50px;
      }
      
      &.tertiary {
        font-size: 16px;
        letter-spacing: 0.04em;
        color: rgba(255, 255, 255, .8);
      }
    `

const Title = (props: propsType) => {
    const [move1, setMove1] = React.useState(false)
    const [move2, setMove2] = React.useState(false)
    const ref1 = React.createRef<HTMLDivElement>()
    const ref2 = React.createRef<HTMLDivElement>()
    useEffect(() => {
        ref1.current && (ref1.current!.clientWidth > document.documentElement.clientWidth*0.9 ? setMove1(true) : setMove1(false))
        ref2.current && (ref2.current!.clientWidth > document.documentElement.clientWidth*0.9 ? setMove2(true) : setMove2(false))
    }, [ref1, ref2]);
    return (
        <TitleWrap>
            <Line className="primary">
                <Marquee speed={30} delay={3} play={move1}>
                    <div className="content" ref={ref1}>
                        <span>{props.title}</span>
                        <span className="secondary">（{props.subtitle}）</span>
                        <div className="blank_fill"></div>
                    </div>
                </Marquee>
            </Line>
            <Line className="tertiary">
                <Marquee speed={30} delay={3} play={move2}>
                    <div className="content" ref={ref2}>
                        <span>{props.singer}</span>
                        <div className="blank_fill"></div>
                    </div>
                </Marquee>
            </Line>
        </TitleWrap>
    )
}

export default Title;