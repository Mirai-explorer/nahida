import {styled} from "styled-components";
import React, {SetStateAction} from "react";
import axios from "axios";

type resultType = {
    FileName: string,
    FileHash: string,
    AlbumID: string,
    AlbumName: string,
    Duration: number
}

const SearchWrap =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(4px);
      background: rgba(255,255,255,.15);
      
      &.show {
        display: block;
      }
    `

const SearchStack =
    styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `

const SearchCard =
    styled.div`
      width: 90vw;
      background: #ffffff;
      height: 90vh;
      border-radius: 0.5rem;
      box-shadow: 1px 2px 4px rgba(0,0,0,.1);
      color: black;
      display: flex;
      flex-direction: column;
      padding: 24px;
      font-size: 16px;
      gap: 16px;
    `

const SearchCardTitle =
    styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
    `

const SearchCardInput =
    styled.input`
      border-radius: .5rem !important;
      font-size: 16px !important;
      padding: 4px 12px;
      width: 50vw;
      transition: all .1s ease-in;

      &:focus {
        background: rgba(196, 196, 196, 0.15);
      }
    `

const SearchCardButton =
    styled.input`
      padding: 4px 16px;
      border-radius: .5rem;
      letter-spacing: 0.05rem;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    `

const SearchCardContent =
    styled.div`
      display: block;
      overflow: auto;
      flex: 1;
    `

const SearchItem =
    styled.div`
      display: inline-flex;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 12px 0;
    `

const SearchItemLabel =
    styled.label`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      line-height: 24px;
      gap: 8px;
    `

const Search = ({isShowing, setIsShowing} : {isShowing: boolean, setIsShowing: React.Dispatch<SetStateAction<boolean>>}) => {
    const [value, setValue] = React.useState('')
    const [result, setResult] = React.useState([{
        FileName: '',
        FileHash: '',
        AlbumID: '',
        AlbumName: '',
        Duration: 0
    }])

    const watchInputValue = (value:string) => {
        setValue(value)
    }

    const doSearch = (keyword: string) => {
        axios.get('https://bird.ioliu.cn/v1?url=https://songsearch.kugou.com/song_search_v2',{
            params: {
                keyword:keyword,
                page:1,
                pagesize:30,
                userid:-1,
                clientver:'',
                platform:'WebFilter',
                tag:'',
                filter:2,
                iscorrection:1,
                privilege_filter:0
            }})
            .then(res => {
                if (!res.data.error_code) {
                    let list: resultType[] = [];
                    res.data.data.lists.map((item: resultType, index: number, array: [])=>{
                        list.push({
                            FileName: item.FileName,
                            FileHash: item.FileHash,
                            AlbumID: item.AlbumID,
                            AlbumName: item.AlbumName,
                            Duration: item.Duration
                        })
                        if (index === array.length - 1) {
                            setResult(list)
                            console.log("completed.")
                        }
                    })
                }
            })
    }

    return(
        <SearchWrap className={`${isShowing?'show':'hidden'}`}>
            <SearchStack>
                <SearchCard>
                    <SearchCardTitle>
                        <div onClick={() => {setIsShowing(false)}}>×</div>
                        <SearchCardInput type="text" autoFocus onChange={e => watchInputValue(e.target.value)} />
                        <SearchCardButton type="button" name="search" value="🔍" onClick={() => doSearch(value)} />
                    </SearchCardTitle>
                    <SearchCardContent>
                        { result.length ? (
                            result.map((item, index) => {
                                return(
                                    <SearchItem key={index}>
                                        <SearchItemLabel>
                                            <span className="inline-flex items-center">
                                                <input type="checkbox" data-hash="item.FileHash" className="p-2 bg-sky-100 checked:bg-sky-300 me-2" />
                                                {item.FileName}
                                            </span>
                                            <span>{Math.trunc(item.Duration / 60) > 9 ? '' : '0'}{Math.trunc(item.Duration / 60)}:{item.Duration % 60 > 9 ? '' : '0'}{item.Duration % 60}</span>
                                        </SearchItemLabel>
                                    </SearchItem>
                                )
                            })
                        ) : (<div>1</div>)
                        }
                    </SearchCardContent>
                </SearchCard>
            </SearchStack>
        </SearchWrap>
    )
}

export default Search;