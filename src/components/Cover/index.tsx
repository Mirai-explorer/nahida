import Image from "next/image";
import { styled, keyframes } from "styled-components";

type propsType = {
    rotate: string,
    url: string,
    ['data-size']: string,
    desc: string
};

const rotate = keyframes`
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    `

const CoverWrap = styled.div`
      border-radius: 50%;
      box-shadow: 0 3px 6px rgba(0,0,0,.16);
      animation: ${rotate} 15s linear infinite;
      animation-play-state: paused;
      transition: box-shadow 1s ease-out;

      &:hover {
        box-shadow: 0 0 6px 8px rgba(255,255,255,.5), 0 0 6px 2px rgba(255,255,255,.5) inset;
        cursor: wait;
      }
      
      .source {
        min-width: 240px;
        min-height: 240px;
        max-width: 320px;
        max-height: 320px;
        border-radius: inherit;
      }

      .source[data-size="large"] {
        width: 75vw;
        height: 75vw;
      }

      .source[data-size="default"] {
        width: 50vw;
        height: 50vw;
      }

      .source[data-size="mini"] {
        width: 25vw;
        height: 25vw;
      }
    `

const Cover = (props: propsType) => {
    return (
        <CoverWrap style={{ animationPlayState: `${props.rotate}`}}>
            <Image
                className="source"
                src={props.url}
                data-size={props["data-size"]}
                alt={props.desc}
                width="320"
                height="320"
            />
        </CoverWrap>
    )
};

export default Cover;
