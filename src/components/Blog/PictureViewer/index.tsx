import React, {useState} from 'react';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

type imageType = {
    url: string,
    height: number,
    width: number,
    format: string,
    size: string,
    crop: string | null,
    is_user_set_cover: boolean,
    image_id: string,
    entity_type: string,
    entity_id: string
}

const PictureViewer = ({ event$ } : { event$: EventEmitter<any> }) => {
    const [viewed, setViewed] = useState(false);
    let images: imageType[] = [];
    event$.useSubscription(params => {
        setViewed(params.viewed)
        images = params.images
        console.log(images)
    });
    const Viewer = () => {
        viewed && setViewed(false)
    };
    return(
        <div className={`absolute top-0 left-0 w-full h-full z-[999] overflow-hidden bg-[#000000] opacity-80 ${viewed?"block":"hidden"}`} onClick={Viewer} onTouchStart={Viewer}>
            <div className="scroll-wrap">
                <div className="scroll-container">
                    {images.map(item => (
                        <div className="scroll__item" key={item.image_id}>
                            <img src={item.url} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default PictureViewer;