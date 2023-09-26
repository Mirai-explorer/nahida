import {styled} from "styled-components";
import React, {SetStateAction} from "react";

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
      background: #FFFFFF;
      height: 75vh;
      max-height: 600px;
      width: 100%;
      transition: bottom .3s ease-in-out;
      
      .show & {
        bottom: 0;
      }
      
      .hidden & {
        bottom: -75vh;
      }
    `

const Control =
    styled.button`
        
    `

const PlayList = ({isShowing, setIsShowing} : {
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>
}) => {

    return (
        <PlayListWrap className={`${isShowing?'show':'hidden'}`}>
            <PlayListStack>
                <PlayListCard>
                    <Control onClick={() => setIsShowing(false)}>×</Control>
                </PlayListCard>
            </PlayListStack>
        </PlayListWrap>
    )
}

export default PlayList;