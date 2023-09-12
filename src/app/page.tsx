import tracks from "../public/data/tracks";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@/components/Player"), {
    ssr: false
});

function App() {
    return (
        <Player tracks={tracks} />
    )
}

export default App;
