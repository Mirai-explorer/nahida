import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {ModalOverlay} from "@/components/Modal/Overlay";
import { useDispatch } from 'react-redux';
import { close } from '@/components/Home/Header/toggleSlice';

const HomeAside = () => {
    const toggle = useSelector((state: RootState) => state.toggle.action)
    const dispatch = useDispatch()
    return(
        <aside>
            <div className={`aside fixed top-0 ${toggle?'left-0':'left-[-300px]'} transition-all bg-white shadow h-full w-[300px] flex justify-center items-center z-[1000]`} />
            <ModalOverlay show={toggle} onClick={() => dispatch(close())}></ModalOverlay>
        </aside>
    )
}

export default HomeAside;