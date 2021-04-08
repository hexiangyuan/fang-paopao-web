import app_icon from "../assets/app-icon.png"
import icon_nb from "../assets/ic_nb.png"
import './AboutUs.css';
import {useLocation} from "react-router-dom";
import {useEffect, useState,useCallback} from "react";

import queryString from 'query-string'
import wxBg from "../assets/wx-tips.png";
import wxQrcode from "../assets/wx_qr_img.png";

const loginPath = "/api/login/mobile"

const getCodePath = "/api/common/verification-code"

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
  return fetch(url)
    .then(response => response.json()) // parses response to JSON
}

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


function AppIcon(props){
  return(
    <div className="AppIconDiv">
      <img src={app_icon} className="AppIconImage" height={72} width={72}/>
      <text className={"AppIconText"}>方泡泡APP</text>
    </div>
  )
}

function Icon(props){
  return (
    <div style={{
      display:'flex',
      alignItems:"center",
    }}>
      <img src={icon_nb} width={36} height={36}/>
      <text className={"commonText"}>{props.text}</text>
    </div>
  )
}

function IcpInfo(props){
  return(
    <div style={{flexDirection:'column',display:"flex",alignItems:"center",width:'100%',marginTop:"50vw",marginBottom:'5vw'}}>
        <text style={{color:"white",fontSize:12}}>上海方和信息技术有限公司</text>
        <a href={"https://beian.miit.gov.cn/"} target={"_blank"} style={{color:"white",fontSize:12}}>沪ICP备2021010013号</a>
    </div>
  )
}

function Slogan(props){
  return (
    <div style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:'column'}}>
      <text className={"SloganTitle"}>{props.title}</text>
      <text className={"SloganSubTitle"}>{props.subTitle}</text>
    </div>
  )
}

function Body(props){
  return(
    <div className="Header">
      <AppIcon/>
      <Slogan title={"高端智能  硅胶娃娃"}
              subTitle={"在线预约APP"}/>

      <div style={{display:'flex',flexDirection:"row",marginTop:'3vw'}}>
        <Icon text={"外观逼真"}/>
        <div style={{width:"3vw"}}/>
        <Icon text={"拟人肌肤"}/>
        <div style={{width:"3vw"}}/>
        <Icon text={"智能语音"}/>
      </div>

    </div>
  )
}

function DownloadApp(props){

  const location = useLocation();

  const [isWx,setIsWx] = useState(false)
  const [username, setUsername] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [timing, setTiming] = useState(false)
  const [count,setCount] = useState(30000);
  const [isIOS,setIsIos] = useState(false);
  const [hasLogin,setHasLogin] = useState(false)

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

  },[username])

  const downloadEnable = useCallback(()=>{
    return username.length === 11&&captcha.length ===4
  },[username,captcha])

  const login = useCallback(()=>{
    const {code} = queryString.parse(location.search)
    postData(loginPath,{
      mobile:username,
      verificationCode:captcha,
      inviteCode:code?code:""
    }).then(data=>{
      if(data.code === 200){
        setHasLogin(true)
        if(!isIOS){
          window.location.href = "https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopao-android.f10a701e.apk"
        }
      }else{
        alert("验证码获取失败，请重新获取再试。")
      }
    }).catch(error=>{
      alert("验证码获取失败，请重新获取再试。")
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
    setIsIos(checkIsIOS())
   const query =  queryString.parse(location.search)
    console.log(JSON.stringify(query))
  },[])


  function downloadApp () {
    if(hasLogin){
      window.location.href = "https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopao-android.f10a701e.apk"
    }else{
      login()
    }
  }

  function getCode (){
    fetchCode()
  }


  return (
    <div style={{
      backgroundColor:"#282c34",
      height:'100%',
      flex:1,
      display:"flex",
      flexDirection:"column"}}>
      <div>
      {isWx && !isIOS &&(
        <div>
         <img src={wxBg} className="App-wx-img"/>}
        </div>
      )}

      <Body/>
      {
          <div style={{width:"100%",
            display:"flex",
            flexDirection:"column"}}>
            <div style={{marginTop:'5vw'}}/>
            { hasLogin ?
            (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"5vw"}}>
              <img src={wxQrcode} className="wx-qrcode-img"/>
              <text className="wx-qrcode-text">{isIOS?"关注微信公众号找客服预约体验，iOS版APP将于近期上线APP Store":"记得关注微信公众号联系我们哦"}</text>
            </div>):
            (<div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
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


              <div style={{display:"flex",
                flexDirection:"row",
                alignItems:"center",
                marginTop:'3vw',
                marginLeft:'10%',
                marginRight:'10%'}}>

                <input
                  className={"input-verification"}
                  placeholder="请输入验证码"
                  value={captcha}
                  onChange={(e) => {
                    setCaptcha(e.target.value);
                  }}
                />

                <button
                  className={"btn-get-code"}
                  disabled={timing}
                  onClick={getCode}>
                  {timing ? count / 1000 + " S" : '验证码'}
                </button>

              </div>

            </div>)}

            <div style={{marginTop:'8vw'}}/>

            {isIOS?(hasLogin?<div/>:<button className="App-download"
                            onClick={downloadApp}
                            disabled={!downloadEnable()}
                            type={"submit"}
              >立即体验</button>)
              :(<button className="App-download"
                     onClick={downloadApp}
                     disabled={!downloadEnable()}
                     type={"submit"}
            >{isIOS ? "立即体验" : "立即下载"}
            </button>) }
          </div>
      }
      </div>
      <IcpInfo/>

    </div>
  );
}

export default DownloadApp;
