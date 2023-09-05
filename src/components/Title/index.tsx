import { styled, keyframes } from "styled-components";

type propsType = {
    title: string;
    subtitle: string;
    singer: string;
}

const TitleWrap =
    styled.div`
      display: flex;
      flex-direction: column;
      width: calc(100vw - 2rem);
      height: fit-content;
      padding: 2rem 1rem;
      color: white;
    `

const transformer =
    keyframes`
      0% { opacity: 0;transform: translateY(10px);zoom: 0;display: none }
      1% { opacity: 0;transform: translateY(10px);zoom: 0;display: flex }
      10% { opacity: 1;transform: translateY(0px);zoom: 1;display: flex }
      90% { opacity: 1;transform: translateY(0px);zoom: 1;display: flex }
      99% { opacity: 0;transform: translateY(-10px);zoom: 0;display: flex }
      100% { opacity: 0;transform: translateY(-10px);zoom: 0;display: none }
    `

const Line =
    styled.div`
      justify-content: center;
      text-align: center;
      line-height: 1.5rem;
      margin: 5px 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      
      &.primary {
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 3px 6px rgba(0,0,0,.16);
        letter-spacing: 0.06em;
        animation: ${transformer} 5s ease-in infinite;
      }

      &.secondary {
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 3px 6px rgba(0,0,0,.16);
        letter-spacing: 0.06em;
        animation: ${transformer} 5s ease-in infinite;
      }
      
      &.tertiary {
        font-size: 16px;
        letter-spacing: 0.04em;
      }
    `

const Title = (props: propsType) => {
    return (
        <TitleWrap>
            <Line className="primary">{props.title}</Line>
            <Line className="secondary">{props.subtitle}</Line>
            <Line className="tertiary">{props.singer}</Line>
        </TitleWrap>
    )
}

export default Title;