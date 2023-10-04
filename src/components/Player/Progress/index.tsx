import { styled } from "styled-components";

type propsType = {
    past: string;
    _duration: string;
    trackProgress: number;
    duration: number;
    onScrub: Function;
    onScrubEnd: Function;
    trackStyling: string;
}

const ProgressWrap =
    styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 40px;
      width: 100%;
      margin: 5px 0;
      align-self: flex-end;
    `

const Digits =
    styled.div`
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0 5%;
      min-height: 32px;
      line-height: 32px;
    `

const Time =
    styled.div`
      letter-spacing: 0.05em;

      &.current, &.duration  {
        font-size: 14px;
        display: inline-flex;
        color: rgba(255, 255, 255, .8);
      }
    `

const ProgressBar =
    styled.div`
      width: 90%;
      height: fit-content;
      margin: 0 auto;
    `

const ProgressBarObject =
    styled.input`
      border-radius: 0;
      font-size: 15px;
      outline: none;

      &[type="range"] {
        height: 4px;
        -webkit-appearance: none;
        width: 100%;
        border-radius: 2px;
        background: #3b7677;
        transition: background 0.2s linear;
        cursor: pointer;
      }

      &[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 0.75rem;
        width: 0.75rem;
        background: #ffffff;
        border-radius: 50%; /*外观设置为圆形*/
        border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
        /*box-shadow: 0 0.125em 0.125em #181c1d; /*添加底部阴影*/
      }
    `

const Progress = (props: propsType) => {
    return (
        <ProgressWrap>
            <ProgressBar>
                <ProgressBarObject
                    type="range"
                    value={props.trackProgress}
                    step="0.5"
                    min="0"
                    max={props.duration ? props.duration : `100`}
                    onChange={(e) => props.onScrub(e.target.value)}
                    onMouseUp={(e) => props.onScrubEnd((e.target as HTMLInputElement).value)}
                    onKeyUp={(e) => props.onScrubEnd((e.target as HTMLInputElement).value)}
                    onTouchEnd={(e) => props.onScrubEnd((e.target as HTMLInputElement).value)}
                    style={{ background: props.trackStyling }}
                />
            </ProgressBar>
            <Digits>
                <Time className="current">{props.past}</Time>
                <Time className="duration">{props._duration}</Time>
            </Digits>
        </ProgressWrap>
    )
}

export default Progress;