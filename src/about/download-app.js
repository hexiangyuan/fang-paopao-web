import app_icon from "../assets/app-icon.png"
import icon_nb from "../assets/ic_nb.png"
import './AboutUs.css';
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState,useCallback} from "react";

import queryString from 'query-string'
import wxBg from "../assets/wx-tips.png";
import wxQrcode from "../assets/wx_qr_img.png";

const loginPath = "/login/mobile"

const getCodePath = "/common/verification-code"

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
              subTitle={"线预约APP"}/>

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

function Body2(props){
  return(<div style={{
    display:'flex',
    flexDirection:'column',
    alignItems:"center"
  }}>
    <text style={{
      color:"#333",
      fontSize:'5vw',
      fontWeight:"bold",
      marginTop:'8vw'
    }}>关于我们</text>

    <text style={{
      color:'#333',
      fontSize:"1.2vw",
      marginLeft:"10vw",
      marginRight:"10vw",
      lineHeight:"2.4vw"
    }}>方泡泡是上海方和信息科技有限公司旗下运营品牌，2020年创办于上海，是中国领先的互联网美业科技公司。
      本着对中国互联网美容新型模式发展的强烈使命感，创新打造美业“第三空间”，方泡泡充分利用移动互联网和大数据技术的“新服务”模式，开拓集互联网智能门店运营、职业培训、化妆品研发、销售为一体的O2O美业服务平台，拓展美业产业链，构建新型美业生态圈，实现“360度运营场景”。发展至今，方泡泡精益求精，致力成为一流的互联网+健康生活体验服务商。</text>
  </div>)
}

function Bottom(props){
  return(<div style={{
    display:'flex',
    flexDirection:'column',
    marginTop:'16vw',
    backgroundColor:"black",
    alignItems:"center",
    height:"5vw"
  }}>
  </div>)
}

function DownloadApp(props){

  const location = useLocation();

  const [isWx,setIsWx] = useState(false)
  const [username, setUsername] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [timing, setTiming] = useState(false)
  const [count,setCount] = useState(30000);
  const [isIOS,setIsIos] = useState(false);

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
      inviteCode:code?code:""
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
    setIsIos(checkIsIOS())
  },[])


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
    <div style={{
      backgroundColor:"#282c34",
      height:'100%',
      flex:1,
      display:"flex",
      flexDirection:"column"}}>
      {isWx && !isIOS &&(
        <div>
         <img src={wxBg} className="App-wx-img"/>}
        </div>
      )}

      <Body/>
      {
        isIOS?(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"5vw"}}>
            <img src={wxQrcode} className="wx-qrcode-img"/>
            <text className="wx-qrcode-text">请添加客服微信预约体验，iOS版将于近期上线APP Store</text>
          </div>
        ):(
          <div style={{width:"100%",
            display:"flex",
            flexDirection:"column"}}>
            <div style={{marginTop:'5vw'}}/>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
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

            </div>

            <div style={{marginTop:'8vw'}}/>

            <button className="App-download"
                    onClick={downloadApp}
                    type={"submit"}
            >立即下载
            </button>
          </div>
        )
      }
    </div>
  );
}

export default DownloadApp;
