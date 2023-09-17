"use client"
import HomeHeader from "@/components/Home/Header";
import HomeAside from "@/components/Home/Aside";
import HomeMain from "@/components/Home/Main";
import HomeFooter from "@/components/Home/Footer";
import { store } from './store';
import { Provider } from 'react-redux';


const App = () => {
    return (
        <Provider store={store}>
                <div className="app text-[#171717]">
                    <HomeHeader></HomeHeader>
                    <HomeAside></HomeAside>
                    <HomeMain>

                    </HomeMain>
                    <HomeFooter></HomeFooter>
                </div>
        </Provider>
    )
}

export default App;