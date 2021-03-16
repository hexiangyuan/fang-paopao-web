import bg from './assets/bg.jpg';
import ele1 from './assets/section1-element.png';
import phoneMain from './assets/section-1-main.png';
import wxBg from './assets/wx-tips.png';
import icon from './assets/app-icon.png';
import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [isWx,setIsWx] = useState(false)

  useEffect(()=>{
    const isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 ? true : false
    setIsWx(isWeiXin)
  },[])

  function checkIsIOS () {
    let agent = (navigator.userAgent || navigator.vendor || window.opera)

    if (agent != null) {

      let agentName = agent.toLowerCase()

      if (/android/i.test(agentName)) {

      return false

      } else if (/iphone/i.test(agentName)) {

       return true

      }
      return false
    }else{
      return false
    }
  }

  function downloadApp () {
   const isIOS =  checkIsIOS()
    if(isIOS){
      alert("亲爱的苹果用户，我们暂时不支持苹果 app 的下载。请您用安卓手机更进行体验。")
    }else{
      window.location.href = "https://gitee.com/yangmeimei123/fang-paopao-web/raw/main/app-release.apk"
    }
  }

  return (
    <div className="App">
      <div className="App-bg">
        <img src={bg} className="App-bg-img"/>
        <img src={ele1} className="bg-ele1"/>
        <div className="App-bg-icon">
          <img src={icon} height={72} width={72}/>
          <p className="p-app-name">方泡泡</p>
        </div>
        {isWx && <img src={wxBg} className="App-wx-img"/>}
      </div>
      <div className="App-phone">
        <img src={phoneMain} width={"50%"}/>
      </div>
      <button className="App-download"
              type={"submit"}
     onClick={downloadApp}
      >立即下载</button>
    </div>
  );
}

export default App;
