// const url =
//   "https://www.fastmock.site/mock/9371d6330f8fc2f273cbfedf9beecd0a/chatbot/api/answer#!method=POST&queryParameters=%5B%5D&body=%7B%22uid%22%3A%22sdhasxuasabjxbzcdufscjz%22%2C+%22question%22%3A+%22%E6%88%91%E6%98%AF%E8%B0%81%EF%BC%9F%22%7D&headers=%5B%5D";

const chatbotWrap = document.querySelector(".chatbotWrap");
const welcomeBox = document.querySelector(".welcomeBox");
chatbotWrap.addEventListener("click", openChatbot);
welcomeBox.addEventListener("click", openChatbot);

// 展开
function openChatbot() {
  window.parent.postMessage('open', "*");   
  chatbotWrap.classList.remove("chatFold");
  welcomeBox.classList.add("hide")
}

document
  .querySelector(".closeChatBot")
  .addEventListener("click", onCloseChatbot);

//关闭
function onCloseChatbot() {
  window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  chatbotWrap.classList.add("chatFold");
  window.parent.postMessage('close', "*");   
}

//点击发送按钮或按下回车
const sendBtn = document.querySelector(".chatbotFoot .send");
const input = document.querySelector(".chatbotFoot .userInput");
const chatbotBody = document.querySelector(".chatbotBody");
let msg = ''
input.onkeyup=()=>{
  msg = input.value;
  console.log(msg)
}
sendBtn.addEventListener("click", ()=>{sendMsg(msg);msg=''});
input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    sendMsg(msg);
    msg=''
  }
});

// 点击初始关键词
const k1 = document.querySelector('#k1')
const k2 = document.querySelector('#k2')
const k3 = document.querySelector('#k3')
const k4 = document.querySelector('#k4')
// k1.onclick=()=>{sendMsg(k1.innerHTML);console.log(1)}
k1.addEventListener('click',()=>{sendMsg(k1.innerHTML);console.log(1)})
k2.onclick=()=>{sendMsg(k2.innerHTML)}
k3.onclick=()=>{sendMsg(k3.innerHTML)}
k4.onclick=()=>{sendMsg(k4.innerHTML)}


// 聊天气泡
class Bubble {
  msg = ''
  class = ''
  constructor(m='', c=userAsk) {
    this.msg = m
    this.class = c
    console.log(msg)
    this.add()
  }
  add() {
    const bubble = document.createElement('div')
    bubble.classList.add(this.class)
    bubble.innerHTML = this.msg
    chatbotBody.appendChild(bubble)
  }
}


function sendMsg(msg) {
  if (msg.trim() === "") {
    return false;
  }
  console.log(msg)
  new Bubble(msg,'userAsk')
  //用innerHtml加元素会导致页面重载，之前绑定的事件会丢失，要重新获取并绑定
  // chatbotBody.innerHTML += '<div class="userAsk">' + msg + '</div>';
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  // 旧接口
  // axios
  //   .get('https://service-79wvnzqk-1256880247.gz.apigw.tencentcs.com/release/yuyan_version?ask=' + msg)
  //   .then((result) => {
  //     console.log(result);
  //     const answer = result.data.keywords;
  //     if (answer === 'I dont know') {
  //       chatbotBody.innerHTML += '<div class="botResponse">' +
  //         '这个问题智能小助手还无法回答哦，可以添加群艾特管理员提问~ 资助系统答疑群号 ' +
  //         '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
  //         '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' +
  //         '</div>';
  //       chatbotBody.scrollTop = chatbotBody.scrollHeight;
  //       return false;
  //     }
  //     chatbotBody.innerHTML += '<div class="botResponse">' + answer + '</div>';
  //     chatbotBody.scrollTop = chatbotBody.scrollHeight;
  //   })
  //   .catch((err) => {
  //     console.err(err);
  //   });


  axios
    .get('https://ncuqa-api.nspyf.top/search/zzzx?q=' + msg)
    .then((result) => {
      const answer = result.data.data[0].answer;
      const question = result.data.data[0].question;
      const allData = result.data.data
      if (answer.trim() === '') {
        new Bubble(
          '这个问题智能小助手还无法回答哦，可以在'+
          '<a target="_blank" href="https://docs.qq.com/form/page/DQXZVUXZJcFdPalVI?_w_tencentdocx_form=1">这里(【腾讯文档】资助机器人问答反馈)<a/>'+
          '反馈你的问题,稍后会有工作人员解答,也可以加入我们的资助系统答疑.'+
          '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
          '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' ,
          'botResponse'
        )
        
        // chatbotBody.innerHTML += 
        // '<div class="botResponse">' +
        // '这个问题智能小助手还无法回答哦，可以在'+
        // '<a target="_blank" href="https://docs.qq.com/form/page/DQXZVUXZJcFdPalVI?_w_tencentdocx_form=1">这里(【腾讯文档】资助机器人问答反馈)<a/>'+
        // '反馈你的问题,稍后会有工作人员解答,也可以加入我们的资助系统答疑.'+
        // '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
        // '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' +
        // '</div>';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        return false;
      }

      if (msg === question) {
        new Bubble(
          '<div class="botResponse">' +
          answer +
          '<br/><a class="askOther" style="color: cornflowerblue;text-decoration: underline;cursor: pointer;">我想问其他</a>',
          'botResponse'
        )
        // chatbotBody.innerHTML +=
        //   '<div class="botResponse">' +
        //   answer +
        //   '<br/><a class="askOther" style="color: cornflowerblue;text-decoration: underline;cursor: pointer;">我想问其他</a>'+
        //   '</div>';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      } else {
        new Bubble(
          '你是否想问：\"' + question + '\"?<br/>' + answer +
          '<br/><a class="askOther" style="color: cornflowerblue;text-decoration: underline;cursor: pointer;">我想问其他</a>',
          'botResponse'
        )

        // chatbotBody.innerHTML +=
        //   '<div class="botResponse">' +
        //   '你是否想问：\"' + question + '\"?<br/>' + answer +
        //   '<br/><a class="askOther" style="color: cornflowerblue;text-decoration: underline;cursor: pointer;">我想问其他</a>'+
        //   '</div>';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

      }

      const askOther = document.getElementsByClassName('askOther')
      askOther[askOther.length - 1].onclick = () => {
        askOtherFn(allData)
        askOther[askOther.length - 1].style.color = 'gray'
      }
    })
    .catch((err) => {
      console.err(err);
    });



  input.value = "";
}

function askOtherFn(allData) {
  if (allData[1].answer.trim() != '') {
    new Bubble(
      '你是否想问：\"' + allData[1].question + '\"?<br/>' + allData[1].answer ,
      'botResponse'
    )

    // chatbotBody.innerHTML +=
    //   '<div class="botResponse">' +
    //   '你是否想问：\"' + allData[1].question + '\"?<br/>' + allData[1].answer +
    //   '</div>';
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }
  if (allData[2].answer.trim() != '') {
    new Bubble(
      '你是否想问：\"' + allData[2].question + '\"?<br/>' + allData[2].answer +
      'botResponse'
    )

    // chatbotBody.innerHTML +=
    //   '<div class="botResponse">' +
    //   '你是否想问：\"' + allData[2].question + '\"?<br/>' + allData[2].answer +
    //   '</div>';
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  new Bubble(
    '这个问题智能小助手还无法回答哦，可以在'+
    '<a target="_blank" href="https://docs.qq.com/form/page/DQXZVUXZJcFdPalVI?_w_tencentdocx_form=1">这里(【腾讯文档】资助机器人问答反馈)<a/>'+
    '反馈你的问题,稍后会有工作人员解答,也可以加入我们的资助系统答疑.'+
    '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
    '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' ,
    'botResponse'
  )

  // chatbotBody.innerHTML += 
  //   '<div class="botResponse">' +
  //   '这个问题智能小助手还无法回答哦，可以在'+
  //   '<a target="_blank" href="https://docs.qq.com/form/page/DQXZVUXZJcFdPalVI?_w_tencentdocx_form=1">这里(【腾讯文档】资助机器人问答反馈)<a/>'+
  //   '反馈你的问题,稍后会有工作人员解答,也可以加入我们的资助系统答疑.'+
  //   '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
  //   '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' +
  //   '</div>';
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// 测试
// axios.get('https://service-79wvnzqk-1256880247.gz.apigw.tencentcs.com/release/yuyan_version?ask=助贷中心值班时间')
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })