import app_icon from "../assets/app-icon.png"
import icon_nb from "../assets/ic_nb.png"
import mobileExample from "../assets/example_mobile.png"
import './AboutUs.css';


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
    <div>
      <text className={"SloganTitle"}>{props.title}</text>
      <text className={"SloganSubTitle"}>{props.subTitle}</text>
    </div>
  )
}

function Body(props){
  return(
    <div className="Header">
      <AppIcon/>
      <Slogan title={"高端生活 品质服务"}
              subTitle={"上海精品SPA在线预约APP"}/>

      <div style={{display:'flex',flexDirection:"row",marginTop:'3vw'}}>
        <Icon text={"服务周到"}/>
        <div style={{width:"3vw"}}/>
        <Icon text={"技师专业"}/>
        <div style={{width:"3vw"}}/>
        <Icon text={"环境卫生"}/>
      </div>

      <img src={mobileExample}
           width={"50%"}
           style={{
             marginTop:"10vw"
      }}/>

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


function AboutUs(props){
  return (
    <div>
     <Body/>
     <Body2/>
     <Bottom/>
    </div>
  );
}

export default AboutUs;
