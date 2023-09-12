import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Blog from "@/app/blog/page";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Blog">
                <Blog/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;