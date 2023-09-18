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
                        <div>
                            <p>阿伟&nbsp;AUBREY&nbsp;TANG<br />
                                常住地&nbsp;上海•杨浦<br />
                                生日&nbsp;2-26<br />
                                兴趣•爱好•技能•特长<br />
                                •&nbsp;语言<br />
                                -擅长的语言（语言水平）<br />
                                -学习中的语言<br />
                                -学习笔记<br />
                                ＃English&nbsp;＃日本語&nbsp;＃粤语•广州话&nbsp;＃吴语•上海话&nbsp;＃Français<br />
                                →CET-4&nbsp;•&nbsp;IELTS*<br />
                                →N1*<br />
                                →<br />
                                •&nbsp;音乐<br />
                                -喜欢的音乐类型<br />
                                -歌单<br />
                                -尝试：音乐创作<br />
                                古典&nbsp;交响&nbsp;流行&nbsp;电子&nbsp;游戏音乐&nbsp;动漫音乐<br />
                                →酷狗<br />
                                →网易云<br />
                                →QQ音乐<br />
                                →Spotify<br />
                                →Apple&nbsp;Music<br />
                                →Sony&nbsp;Select<br />
                                •&nbsp;电影<br />
                                -喜欢的电影类型<br />
                                -片单<br />
                                -力荐<br />
                                -电影/观影场所挑选手册<br />
                                -我和电影的故事<br />
                                -尝试：电影剪辑<br />
                                →豆瓣<br />
                                •&nbsp;ACG<br />
                                -喜欢的ACG内容<br />
                                -漫展/相关展会活动<br />
                                #BW&nbsp;#ChinaJoy&nbsp;#CP<br />
                                ＃初音未来&nbsp;＃迪士尼&nbsp;＃日漫&nbsp;＃国创<br />
                                →哔哩哔哩<br />
                                →漫音社<br />
                                →天使动漫<br />
                                •&nbsp;阅读<br />
                                →豆瓣<br />
                                •&nbsp;旅行<br />
                                -去过哪些地方<br />
                                -想去哪些地方<br />
                                -喜欢怎样的景色/景观/景物<br />
                                -酒店挑选指南<br />
                                -出行指南<br />
                                →Google地图<br />
                                →百度地图<br />
                                →旅行雷达<br />
                                •&nbsp;技术探索<br />
                                •&nbsp;信息加工<br />
                                •&nbsp;平面设计<br />
                                •&nbsp;摄影•视频创作<br />
                                →Adobe&nbsp;Lightroom<br />
                                →Google相机<br />
                                •&nbsp;美食<br />
                                ＃麦当劳</p>

                            <p>•&nbsp;数码科技<br />
                                -喜欢的数码产品<br />
                                Sony&nbsp;WH-1000XM系列（头戴式无线降噪耳机）<br />
                                HP&nbsp;OMEN&nbsp;暗影精灵系列（高性能游戏本）<br />
                                Samsung&nbsp;Galaxy&nbsp;S系列（ULTRA）<br />
                                Apple&nbsp;iPad&nbsp;Pro系列</p>

                            <p>-关注的数码品牌<br />
                                -喜欢的科技产品<br />
                                -关注的科技公司<br />
                                推荐看<br />
                                →IT之家<br />
                                →酷安<br />
                                •&nbsp;薅羊毛<br />
                                薅羊毛，越薅越快乐<br />
                                推荐看<br />
                                →什么值得买<br />
                                →羊毛撸啊撸（公众号）<br />
                                •&nbsp;公交/地铁/火车/航空迷<br />
                                •&nbsp;天文<br />
                                •&nbsp;历史<br />
                                •&nbsp;游戏<br />
                                -喜欢的游戏类型？<br />
                                -在玩/玩过哪些游戏？<br />
                                -期望的游戏内容/模式/美术表现/音乐<br />
                                -尝试：游戏制作<br />
                                miHoYo&nbsp;IP系列<br />
                                崩坏：星穹铁道&nbsp;原神&nbsp;崩坏3&nbsp;绝区零＊<br />
                                GTA系列<br />
                                生化危机系列<br />
                                刺客信条系列<br />
                                プリンセスコネクト&nbsp;Re:&nbsp;Dive&nbsp;｜&nbsp;公主连结<br />
                                ウマ娘<br />
                                プロジェクト&nbsp;セカイ&nbsp;｜&nbsp;BanG&nbsp;Dream<br />
                                碧蓝航线<br />
                                ブルーアーカイブ<br />
                                ——<br />
                                FGO<br />
                                明日方舟<br />
                                王者荣耀<br />
                                蛋仔派对<br />
                                阴阳师</p>

                            <p>•&nbsp;编程<br />
                                Web开发方向&nbsp;[<br />
                                Next.js&nbsp;on&nbsp;React(Priority)<br />
                                Nuxt.js&nbsp;on&nbsp;Vue.js<br />
                                Vanilla&nbsp;JavaScript[ES2021]+CSS3+HTML5<br />
                                ]<br />
                                原生/桌面/服务器开发方向&nbsp;[<br />
                                Kotlin<br />
                                Swift<br />
                                C<br />
                                C#<br />
                                C++<br />
                                Java<br />
                                Python<br />
                                Golang<br />
                                Lua<br />
                                ]<br />
                                跨平台开发方向&nbsp;[<br />
                                Flutter<br />
                                React&nbsp;Native<br />
                                Electron<br />
                                ]<br />
                                常用IDE&nbsp;[<br />
                                WebStorm<br />
                                IDEA<br />
                                Visual&nbsp;Studio<br />
                                Android&nbsp;Studio<br />
                                VS&nbsp;Code<br />
                                ]</p>

                            <p>Contact&nbsp;with&nbsp;me<br />
                                社交平台<br />
                                QQ/微信&nbsp;1150963042<br />
                                Facebook<br />
                                X（Twitter）<br />
                                Instagram<br />
                                Telegram<br />
                                Discord<br />
                                Skype<br />
                                微博</p>

                            <p>内容社区/创作平台<br />
                                微信公众号<br />
                                豆瓣<br />
                                知乎<br />
                                酷安<br />
                                百度贴吧<br />
                                哔哩哔哩<br />
                                YouTube<br />
                                GitHub<br />
                                Gitee<br />
                                电子邮箱<br />
                                QQ邮箱<br />
                                网易163邮箱<br />
                                Outlook<br />
                                Gmail</p>

                            <p>游戏社区<br />
                                米游社<br />
                                Steam<br />
                                Ubi</p>

                            <p>欢迎赞助<br />
                                支付宝<br />
                                云闪付<br />
                                微信支付<br />
                                PayPal</p>
                        </div>
                    </HomeMain>
                    <HomeFooter></HomeFooter>
                </div>
        </Provider>
    )
}

export default App;