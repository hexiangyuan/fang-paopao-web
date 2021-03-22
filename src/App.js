import bg from './assets/bg.jpg';
import ele1 from './assets/section1-element.png';
import phoneMain from './assets/section-1-main.png';
import wxBg from './assets/wx-tips.png';
import icon from './assets/app-icon.png';
import './App.css';
import {useEffect, useState,useCallback} from "react";
import {useLocation, useParams } from "react-router-dom";
import queryString from 'query-string'
function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
    .then(response => response.json()) // parses response to JSON
}

function getData(url) {
  // Default options are marked with *
  return fetch(url)
    .then(response => response.json()) // parses response to JSON
}


const loginPath = "/login/mobile"

const getCodePath = "/common/verification-code"

function App(props) {

  const location = useLocation();
  const params = useParams();

  const [isWx,setIsWx] = useState(false)
  const [username, setUsername] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [timing, setTiming] = useState(false)
  const [count,setCount] = useState(30000);

  const fetchCode = useCallback(()=>{
    if(username&&username.length === 11){
      getData(getCodePath+"?mobile="+username).then(data=>{
        setTiming(true)
      }).catch(error=>{
        alert("获取验证码失败，请稍候再试")
      })
    }else{
      alert("请输入正确的手机号")
    }

  },[username,captcha])

  const login = useCallback(()=>{
    const {code} = queryString.parse(location.search)
    postData(loginPath,{
      mobile:username,
      verificationCode:captcha,
      invitedCode:code?code:""
    }).then(data=>{

    }).catch(error=>{

    })

  },[username,captcha,location])


  useEffect(()=>{
    let interval
    if(timing){
       interval = setInterval(()=>{
        setCount(pre=> {
          if(pre <= 1000){
            setTiming(false)
            return 30000;
          }
          return pre - 1000;
        })
      },1000)
    }
    return()=> clearInterval(interval);
  },[timing])

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
   const isIOS = checkIsIOS()
    login()
    if(isIOS){
      alert("亲爱的苹果用户，我们暂时不支持苹果 app 的下载。请您用安卓手机更进行体验。")
    }else{
      window.location.href = "https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopao-android.f10a701e.apk"
    }
  }

  function getCode (){
  fetchCode()
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
      {/*<div className="App-phone">*/}
      {/*  <img src={phoneMain} width={"50%"}/>*/}
      {/*</div>*/}
  <div className={"content"}>
      <input
        className={"input-mobile"}
        type={"tel"}
        maxLength={11}
        placeholder="请输入手机号"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div className={"div-code"}>
      <input
        className={"code-input"}
        placeholder="请输入验证码"
        value={captcha}
        onChange={(e) => {
          setCaptcha(e.target.value);
        }}
      />
      <button className={"btn-get-code"} disabled={timing} onClick={getCode}>
        {timing ?  count/1000 +" S": '获取验证码'}
      </button>

      </div>

      <button className="App-download"
              disabled={!username || !captcha}
              type={"submit"}
     onClick={downloadApp}

      >立即下载</button>
    </div>
    </div>
  );
}

export default App;
