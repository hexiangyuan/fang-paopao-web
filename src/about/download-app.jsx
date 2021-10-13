import app_icon from '../assets/app-icon.png'
import icon_nb from '../assets/ic_nb.png'
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef } from 'react'

import queryString from 'query-string'
import wxBg from '../assets/wx-tips.png'
import wxQrcode from '../assets/wx_qr_img.png'
import appStoreDownload from '../assets/apple-store-download.png'
import img1 from '../assets/img5_01.jpg'
import img2 from '../assets/img5_02.jpg'
import img3 from '../assets/img5_03.jpg'
import img4 from '../assets/img5_04.jpg'
import img5 from '../assets/img5_05.jpg'
import img6 from '../assets/img5_06.jpg'

import qxXd0000 from "../assets/xd0000.jpg";
import qxXd0001 from "../assets/xd0001.jpg";
import qxXd0011 from "../assets/xd0011.jpg";
import qxXd0012 from "../assets/xd0012.jpg";
import qxXd0013 from "../assets/xd0013.jpg";
import qxXd0014 from "../assets/xd0014.jpg";
import qxXd0018 from "../assets/xd0018.jpg";
import qxXd0019 from "../assets/xd0019.jpg";
import qxXd0020 from "../assets/xd0020.jpg";
import qxXd0021 from "../assets/xd0021.png";
import qxXd0022 from "../assets/xd0022.jpeg";
import qxXd0023 from "../assets/xd0023.jpeg";
import qxXd0031 from "../assets/xd0031.jpg";
import qxXd0032 from "../assets/xd0032.jpg";
import qxXd0033 from "../assets/xd0033.jpg";
import gzhCode from "../assets/gzhao_code.jpg";

import 'animate.css';



// Import Swiper styles
import 'swiper/swiper.scss';
import './AboutUs.css'
import { Alert } from 'antd'


const loginPath = '/api/login/mobile'

const getCodePath = '/api/common/verification-code'

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
    .then((response) => response.json()) // parses response to JSON
}

function getData(url) {
  return fetch(url)
    .then((response) => response.json()) // parses response to JSON
}

function checkIsIOS() {
  const agent = (navigator.userAgent || navigator.vendor || window.opera)

  if (agent != null) {
    const agentName = agent.toLowerCase()

    if (/android/i.test(agentName)) {
      return false
    } if (/iphone/i.test(agentName)) {
      return true
    }
    return false
  }
  return false
}

const IntroImg = (props) => {
  return (<div style={{
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: '100%',
    height: "100%"
  }}>
    <img src={props.src} style={{ width: '100%', height: '100%' }} />
  </div>)
}

function AppIcon(props) {
  return (
    <div className="AppIconDiv">
      <img src={app_icon} className="AppIconImage" height={72} width={72} />
      <text className="AppIconText">方泡泡</text>
    </div>
  )
}

function Icon(props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <img src={icon_nb} width={18} height={18} />
      <text className="commonText" style={{ fontSize: 14 }}>{props.text}</text>
    </div>
  )
}

export function IcpInfo(props) {
  return (
    <div style={{
      flexDirection: 'column',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginTop: 48,
      paddingBottom: 12 + 60,
    }}
    >
      <text style={{ color: 'white', fontSize: 12 }}>上海方和信息技术有限公司</text>
      <a href="https://beian.miit.gov.cn/" target="_blank" style={{ color: 'white', fontSize: 12 }}>沪ICP备2021010013号</a>
    </div>
  )
}

function EnterPriceQrCode(props) {
  switch (props.code) {
    case "xd0001":
      return (
        <img src={qxXd0001} width={100} height={100} />
      )
    case "xd0011":
      return (
        <img src={qxXd0011} width={100} height={100} />
      )
    case "xd0012":
      return (
        <img src={qxXd0012} width={100} height={100} />
      )
    case "xd0013":
      return (
        <img src={qxXd0013} width={100} height={100} />
      )
    case "xd0014":
      return (
        <img src={qxXd0014} width={100} height={100} />
      )
    case "xd0018":
      return (
        <img src={qxXd0018} width={100} height={100} />
      )
    case "xd0019":
      return (
        <img src={qxXd0019} width={100} height={100} />
      )
    case "xd0020":
      return (
        <img src={qxXd0020} width={100} height={100} />
      )
    case "xd0021":
      return (
        <img src={qxXd0021} width={100} height={100} />
      )
    case "xd0022":
      return (
        <img src={qxXd0022} width={100} height={100} />
      )
    case "xd0023":
      return (
        <img src={qxXd0023} width={100} height={100} />
      )
    case "xd0031":
      return (
        <img src={qxXd0031} width={100} height={100} />
      )
    case "xd0032":
      return (
        <img src={qxXd0032} width={100} height={100} />
      )
    case "xd0033":
      return (
        <img src={qxXd0033} width={100} height={100} />
      )
    default:
      return (
        <img src={qxXd0000} width={100} height={100} />
      )
  }
}

function getKeFu(code) {
  switch (code) {
    case "xd0001":
      return {
        url: "https://w.1yb.co/N11MEwNeKo"
      }
    case "xd0018":
      return {
        url: "https://w.1yb.co/N11MER8jQj"
      }
    case "xd0019":
      return {
        url: "https://w.1yb.co/N119QZoMK8"
      }
    case "xd0020":
      return {
        url: "https://w.1yb.co/N11qEGBdKP"
      }
    case "xd0021":
      return {
        url: "https://w.1yb.co/N11yKqyXKL"
      }
    default:
      return {
        url: "https://w.1yb.co/N115Q54ZVa"
      }
      break;
  }
}

function Slogan(props) {
  return (
    <div style={{
      justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column',
    }}
    >
      <text className="SloganTitle">{props.title}</text>
    </div>
  )
}

function Body(props) {
  return (
    <div className="Header">
      <AppIcon />
      <Slogan
        title="成人情趣  实体娃娃"
        subTitle="APP预约享优惠价"
      />

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px' }}>
        <Icon text="真人大小" />
        <div style={{ width: '3vw' }} />
        <Icon text="绝世容颜" />
        <div style={{ width: '3vw' }} />
        <Icon text="拟人肌肤" />
        <div style={{ width: '3vw' }} />
        <Icon text="智能情趣" />
      </div>

    </div>
  )
}

function DownloadApp(props) {
  const location = useLocation()

  const [isWx, setIsWx] = useState(false)
  const [username, setUsername] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [timing, setTiming] = useState(false)
  const [count, setCount] = useState(30000)
  const [isIOS, setIsIos] = useState(false)
  const [hasLogin, setHasLogin] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
  const [iframeScrolled, setIframScrlled] = useState(false)
  const [scrollString, setScrollString] = useState("")

  const contentRef = useRef(null);

  const fetchCode = useCallback(() => {
    if (username && username.length === 11) {
      getData(`${getCodePath}?mobile=${username}`).then((data) => {
        setTiming(true)
      }).catch((error) => {
        alert('获取验证码失败，请稍候再试')
      })
    } else {
      alert('请输入正确的手机号')
    }
  }, [username])

  const downloadEnable = useCallback(() => username.length === 11 && captcha.length === 4, [username, captcha])

  const login = useCallback(() => {
    const { code, type } = queryString.parse(location.search)
    postData(loginPath, {
      mobile: username,
      verificationCode: captcha,
      inviteCode: code || '',
      inviteType: type ? type : 1
    }).then((data) => {
      if (data.code === 200) {
        setHasLogin(true)
        if (!isIOS) {
          window.location.href = 'https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopao-android.f10a701e.apk'
        }
      } else {
        alert('验证码验证失败，请重新获取再试。')
      }
    }).catch((error) => {
      alert('验证码验证失败，请重新获取再试。')
    })
  }, [username, captcha, location])

  useEffect(() => {
    let interval
    if (timing) {
      interval = setInterval(() => {
        setCount((pre) => {
          if (pre <= 1000) {
            setTiming(false)
            return 30000
          }
          return pre - 1000
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timing])

  useEffect(() => {
    const isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
    setIsWx(isWeiXin)
    setIsIos(checkIsIOS())
    const query = queryString.parse(location.search)
    console.log(JSON.stringify(query))
  }, [])

  const openBuy = useCallback(() => {
    window.open(isWx ? "https://wxaurl.cn/qE0UcR1TR6s" : "https://shop1699852002.v.weidian.com/item.html?itemID=4423081163&vc_wfr=wechat_gzh&ifr=itemdetail&state=H5WXshareOld&distributorId=1165344788&share_relation=5d4bcf182678fd8f_1165344788_1&wfr=h5direct_wxh5")
  }, [isWx])

  function downloadApp() {
    // if (hasLogin) {
    window.location.href = 'https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopao-android.f10a701e.apk'
    // } else {
    // login()
    // }
  }

  function getCode() {
    fetchCode()
  }

  const swiper1 = <div style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }}
  >
    <div>
      {isWx && inputFocus && !isIOS && (
        <div>
          <img src={wxBg} className="App-wx-img" />
        </div>
      )}

      <Body />
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <div style={{ marginTop: '24px' }} />
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 36
        }}>

          {isWx && <img src={gzhCode} width={100} height={100} />}

          {isWx && <text style={{ marginTop: 5, color: "white" }}>长按二维码添加添加公众号</text>}

          {!isWx && <text style={{ marginTop: 5, color: "white" }}>微信搜索“方泡泡”</text>}

          <div style={{ height: 24 }} />

          <EnterPriceQrCode
            code={queryString.parse(location.search).code} />

          {isWx && <text style={{ marginTop: 5, color: "white" }}>长按二维码添加客服微信</text>}

          {!isWx && <a style={{ marginTop: 5, color: "white" }}
            href={getKeFu(queryString.parse(location.search).code).url}>点击添加客服微信</a>}
          <div style={{ height: 8 }} />

          <div class="animate__animated animate__pulse animate__infinite">
            <text style={{
              textAlign: 'center',
              color: "white",
              fontSize: 16, paddingLeft: 20, paddingRight: 20
            }}>由于产品过于逼真，细节私密图片请联系客服查看</text>
          </div>

          <div style={{ height: 24 }} />

          <text style={{ color: "white", fontSize: 12, marginBottom: 12 }}>客服电话：17521368841</text>

          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8pt',
          }}
          >
            {isIOS ? (<a href='https://apps.apple.com/cn/app/%E6%96%B9%E6%B3%A1%E6%B3%A1/id1560592820' >
              <img src={appStoreDownload} />
            </a>) : (<button
              className="App-download"
              onClick={downloadApp}
              type="submit"
            > {"   直接下载APP    "}
            </button>)}


            <div style={{ height: "16pt" }} />
          </div>


          <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/详情0626_03.jpg?x-oss-process=image/resize,h_800,m_lfit"}
            style={
              { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
            }
            onClick={openBuy}
          />

          <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/详情0711_02.jpg?x-oss-process=image/resize,h_800,m_lfit"}
            style={
              { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
            }
            onClick={openBuy}
          />

        </div>
      </div>
    </div>
  </div >


  return (
    <div style={{ width: "100vw", overflowY: "scroll", backgroundColor: '#282c34' }} >
      {swiper1}
      <div>
        <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/h5cap.jpeg"}
          style={{ width: "100vw", display: 'block', margin: 'auto' }}
          onClick={openBuy}
        />
      </div>
      <IcpInfo />


      <div style={{
        position: "fixed",
        display: 'flex',
        bottom: 0,
        background: "rgb(248,33,54)",
        width: '100%',
        padding: 12,
        justifyContent: 'center', alignContent: 'center',

      }}
        onClick={openBuy}
      >
        <a style={{
          color: 'white',
        }}

        >查看更多</a>
      </div>
    </div>
  )
}

export default DownloadApp

