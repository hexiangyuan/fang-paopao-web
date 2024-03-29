import app_icon from '../assets/app-icon.png'
import icon_nb from '../assets/ic_nb.png'
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef } from 'react'

import queryString from 'query-string'
import wxSearch from '../assets/wx_search_tips.jpg'
import wxBg from '../assets/wx-tips.png'
import appStoreDownload from '../assets/apple-store-download.png'
import miniCode from '../assets/mini_program_code.jpg'

import 'animate.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import './AboutUs.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '80%',
    transform: 'translate(-50%, -50%)',
  },
};

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


function checkIsAndroid() {
  const agent = (navigator.userAgent || navigator.vendor || window.opera)

  if (agent != null) {
    const agentName = agent.toLowerCase()

    if (/android/i.test(agentName)) {
      return true
    } if (/iphone/i.test(agentName)) {
      return false
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
      width: '100%'
    }}
    >
      <a href="https://beian.miit.gov.cn/" target="_blank" style={{ color: 'white', fontSize: 12 }}>沪ICP备2021010013号</a>
    </div>
  )
}

function EnterPriceQrCode(props) {
  return <img src={getCustomerCode(props.code)}
    onError={(e) => { e.target.onerror = null; e.target.src = "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/xd0000.jpg" }}
    width={100} height={100} />
}


function getCustomerCode(code) {
  if (code?.includes("xd00")) {
    return "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/" + code + ".jpg"
  } else {
    return "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/xd0000.jpg"
  }
}

function getGzgCode(code) {
  if (code?.includes("xd00")) {
    return "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/gzh-" + code + ".png"
  } else {
    return "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/gzhao_code.jpg"
  }
}


function getKeFu(code) {
  switch (code) {
    case "xd0018":
      return {
        url: "weixin://dl/business/?t=OXp3nNR078a"
      }
    case "xd0019":
      return {
        url: "weixin://dl/business/?t=mLCq12aHyaq"
      }
    case "xd0020":
      return {
        url: "weixin://dl/business/?t=znSEfFIEBHa"
      }
    case "xd0021":
      return {
        url: "weixin://dl/business/?t=FJ5L7obKd3s"
      }
    case "xd0040":
      return {
        url: "weixin://dl/business/?t=L1thadqDedr"
      }
    default:
      return {
        url: "weixin://dl/business/?t=PtJLn9qgJTt"
      }
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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [aboutUseIsOpen, setAboutUseIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeAboutUsModal() {
    setAboutUseIsOpen(false);
  }

  const [isWx, setIsWx] = useState(false)
  const [username, setUsername] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [timing, setTiming] = useState(false)
  const [count, setCount] = useState(30000)
  const [isIOS, setIsIos] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasLogin, setHasLogin] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
  const [iframeScrolled, setIframScrlled] = useState(false)
  const [scrollString, setScrollString] = useState("")
  const [isBaiduChannel, setIsBaiduChannel] = useState(false)

  const [miniProgramKeFuSchema, setMiniProgramKeFuSchema] = useState("")

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

  function getCode() {
    fetchCode()
  }


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
        // if (!isIOS) {
        //   // window.location.href = 'https://fanghe.oss-cn-beijing.aliyuncs.com/fangpaopao-android.f10a701e.apk'
        // }
        alert('你好,尊敬的方泡泡用户,欢迎注册。')
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
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("/alioss-raw/www-config/weixin-mini-program-schema.json", requestOptions)
      .then(response => response.json())
      .then(result => result.hasOwnProperty(queryString.parse(location.search).code) ? result[queryString.parse(location.search).code] : result["default"])
      .then(url => {
        console.log(url)
        setMiniProgramKeFuSchema(url)
      })
      .catch(error => console.log('error', error));
  }, [queryString])

  useEffect(() => {
    setIsBaiduChannel("xd0009" == queryString.parse(location.search).code)
  }, [queryString])

  useEffect(() => {
    const isWeiXin = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
    setIsWx(isWeiXin)
    setIsIos(checkIsIOS())
    setIsMobile(checkIsIOS() || checkIsAndroid())
    const query = queryString.parse(location.search)
    console.log(JSON.stringify(query))
  }, [])

  const openBuy = useCallback(() => {
    isMobile && window.open("weixin://dl/business/?t=FSmfjOH2Iws")
  }, [isWx, isMobile])

  const openMiniHome = useCallback(() => {
    window.open("weixin://dl/business/?t=OVoiLVi9kgc")
  }, [isWx])

  function downloadApp() {
    login()
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

          {isWx && <img
            onError={(e) => { e.target.onerror = null; e.target.src = "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/gzhao_code.jpg" }}
            src={getGzgCode(queryString.parse(location.search).code)}
            width={100}
            height={100} />}

          {isWx && <text style={{ marginTop: 5, color: "white" }}>长按二维码关注公众号</text>}

          {!isWx && isMobile &&
            <img
              src={wxSearch}
              width={"80%"}
            />
          }

          {!isMobile && (
            <div style={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
              <div style={{ height: 8 }} />
              <img
                src={miniCode}
                width={100}
                height={100} />
              <div style={{ height: 8 }} />
              <text style={{ marginTop: 8, color: "white" }}>微信扫码添加小程序</text>
              <div style={{ height: 8 }} />
              <img
                onError={(e) => { e.target.onerror = null; e.target.src = "https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/gzhao_code.jpg" }}
                src={getGzgCode(queryString.parse(location.search).code)}
                width={100}
                height={100} />

              <text style={{ marginTop: 8, color: "white" }}>扫码关注公众号</text>
            </div>
          )}

          <div style={{ height: 8 }} />

          {isMobile ? (<div>

            {isWx && <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
              <EnterPriceQrCode
                code={queryString.parse(location.search).code} />
              <a style={{ marginTop: 5, color: "white", textAlign: 'center' }}>长按添加客服微信</a>
            </div>
            }
            <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <a
                style={{ marginTop: 5, color: "white", textAlign: 'center' }}
                href={isWx ? null : miniProgramKeFuSchema}>联系客服查看图片
              </a>
            </div>

            <div class="animate__animated animate__pulse animate__infinite">
              <a
                href={isWx ? null : miniProgramKeFuSchema}
                style={{
                  textAlign: 'center',
                  color: "white",
                  fontSize: 16,
                  paddingLeft: 20,
                  paddingRight: 20
                }}>由于产品过于逼真，细节私密图片请联系客服查看</a>
            </div>

            <div style={{ height: 8 }} />

          </div>) :
            <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
              <EnterPriceQrCode
                code={queryString.parse(location.search).code} />

              <a style={{ marginTop: 5, color: "white", textAlign: 'center' }}>扫码添加客服微信</a>
            </div>
          }



          <div style={{ height: 24 }} />

          <a style={{ color: "white", fontSize: 16, marginBottom: 12 }} href="tel:17521368841">拨打客服电话：17521368841</a>

          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8pt',
          }}
          >
            {!isBaiduChannel ? (isIOS ? (<a href='https://apps.apple.com/cn/app/%E6%96%B9%E6%B3%A1%E6%B3%A1/id1560592820' >
              <img src={appStoreDownload} />
            </a>) : (<button
              className="App-download"
              onClick={downloadApp}
              type="submit"
            > {"   直接下载APP    "}
            </button>)) : (
              <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3251162009&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:3251162009:51" alt="点击联系客服查看产品细节图片" title="点击联系客服查看产品细节图片" /></a>)}


            <div style={{ height: "16pt" }} />
          </div>

          {isBaiduChannel && (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <input
                className="input-mobile"
                type="tel"
                style={{ marginLeft: 16, marginRight: 16 }}
                maxLength={11}
                placeholder="请输入手机号"
                value={username}
                onFocus={() => {
                  setInputFocus(true)
                }}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '16pt',
                marginLeft: 16,
                marginRight: 16,
                flex: 1
              }}
              >
                <input
                  className="input-verification"
                  placeholder="请输入验证码"
                  style={{ flex: 1 }}
                  value={captcha}
                  onChange={(e) => {
                    setCaptcha(e.target.value)
                  }}
                />

                <div
                  className="btn-get-code"
                  style={{
                    minWidth: 64,
                    marginLeft: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}
                  disabled={timing}
                  onClick={getCode}
                >
                  {timing ? `${count / 1000} S` : '验证码'}
                </div>

              </div>

              <button
                className="App-download"
                style={{
                  margin: 16,

                }}
                onClick={downloadApp}
                disabled={!downloadEnable()}
                type="submit"
              >登录
              </button>

              <div style={{ height: 16 }} />

            </div>
          )}

          {isBaiduChannel ? (<div>
            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/image/safe/%E8%AF%A6%E6%83%850610-%E6%8B%B7%E8%B4%9D_04.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />

            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/image/safe/%E8%AF%A6%E6%83%850610-%E6%8B%B7%E8%B4%9D_06.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />
            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/image/safe/%E8%AF%A6%E6%83%850626_08.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />
            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/image/safe/%E8%AF%A6%E6%83%850626_10.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />


          </div>) : (<div>
            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/%E8%AF%A6%E6%83%850711_08.jpg?x-oss-process=image/resize,h_800,m_lfit"}
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

            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/%E8%AF%A6%E6%83%850626_04.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />

            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/02-1_02.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />

            <img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/%E8%AF%A6%E6%83%850815-2_07.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />

            < img src={"https://fangpaopao-pic.oss-cn-shanghai.aliyuncs.com/webAssets/%E8%AF%A6%E6%83%850610-%E6%8B%B7%E8%B4%9D_01.jpg?x-oss-process=image/resize,h_800,m_lfit"}
              style={
                { maxHeight: '100%', width: "100%", display: 'block', margin: 'auto' }
              }
              onClick={openBuy}
            />
          </div>)}
        </div>
      </div>
    </div>
  </div >


  return (
    <div style={{ width: "100vw", overflowY: "scroll", backgroundColor: '#282c34' }} >
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="扫码"
      ><div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
          <img
            src={miniCode}
            width={200}
            height={200} />
          <div style={{ height: 8 }} />
          <text style={{ marginTop: 8, color: "black" }}>微信扫码添加小程序</text>
        </div>
      </Modal>
      <Modal
        isOpen={aboutUseIsOpen}
        onRequestClose={closeAboutUsModal}
        style={customStyles}
        contentLabel="关于我们"
      ><div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
          <img
            src={app_icon}
            width={200}
            height={200} />
          <div style={{ height: 8 }} />
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>东莞市方何信息技术有限公司
          </text>
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>
            方泡泡专注于用技术提升情趣用品的用户体验，为用户提供不一样的情趣体验，经营产品包括实体娃娃、倒模、飞机杯、跳蛋等
          </text>
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>联系我们：微信关注方泡泡公众号
          </text>
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>联系电话：175-2136-8841
          </text>
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>总部：[广东][东莞]东莞市东城街道鸿福东路二号农商银行大厦商务中心十一楼
          </text>
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>上海门店：上海市闵行区顾戴路3009号402;上海市闵行区莘庄镇莘朱路270弄33号-1
          </text>
          <text style={{ marginTop: 8, color: "black", textAlign: 'center' }}>加入我们：qu.pao@outlook.com
          </text>
        </div>
      </Modal>
      {swiper1}
      <div style={{ height: 48, }}></div>
      <div
        onClick={() => { setAboutUseIsOpen(true) }}
        style={{ marginTop: 12, justifyContent: 'center', display: 'flex', alignItems: 'center', width: "100%ßß" }}>
        <text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>关于我们 | 联系我们 | 加入我们</text>
      </div>
      <div style={{ height: 12 }}></div>
      <IcpInfo />
      <div style={{ height: 12 + 48, }}></div>


      <div style={{
        position: "fixed",
        display: 'flex',
        bottom: 0,
        background: "rgb(248,33,54)",
        width: '100%',
        padding: 12,
        justifyContent: 'center', alignContent: 'center',

      }}
        onClick={isMobile ? openMiniHome : openModal}
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

