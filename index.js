// const url =
//   "https://www.fastmock.site/mock/9371d6330f8fc2f273cbfedf9beecd0a/chatbot/api/answer#!method=POST&queryParameters=%5B%5D&body=%7B%22uid%22%3A%22sdhasxuasabjxbzcdufscjz%22%2C+%22question%22%3A+%22%E6%88%91%E6%98%AF%E8%B0%81%EF%BC%9F%22%7D&headers=%5B%5D";

const chatbotWrap = document.querySelector(".chatbotWrap");
chatbotWrap.addEventListener("click", openChatbot);

// 展开
function openChatbot() {
  window.parent.postMessage('open', "*");   
  chatbotWrap.classList.remove("chatFold");
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
sendBtn.addEventListener("click", sendMsg);
input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    sendMsg();
  }
});





function sendMsg() {
  const msg = input.value;
  if (msg.trim() === "") {
    return false;
  }
  chatbotBody.innerHTML += '<div class="userAsk">' + msg + '</div>';
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
        chatbotBody.innerHTML += 
        '<div class="botResponse">' +
        '这个问题智能小助手还无法回答哦，可以在'+
        '<a target="_blank" href="https://docs.qq.com/form/page/DQXZVUXZJcFdPalVI?_w_tencentdocx_form=1">这里(【腾讯文档】资助机器人问答反馈)<a/>'+
        '反馈你的问题,稍后会有工作人员解答,也可以加入我们的资助系统答疑.'+
        '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
        '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' +
        '</div>';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        return false;
      }

      if (msg === question) {
        chatbotBody.innerHTML +=
          '<div class="botResponse">' +
          answer +
          '<br/><a class="askOther" style="color: cornflowerblue;text-decoration: underline;cursor: pointer;">我想问其他</a></div>';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      } else {
        chatbotBody.innerHTML +=
          '<div class="botResponse">' +
          '你是否想问：\"' + question + '\"?<br/>' + answer +
          '<br/><a class="askOther" style="color: cornflowerblue;text-decoration: underline;cursor: pointer;">我想问其他</a></div>';
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
    chatbotBody.innerHTML +=
      '<div class="botResponse">' +
      '你是否想问：\"' + allData[1].question + '\"?<br/>' + allData[1].answer +
      '</div>';
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }
  if (allData[2].answer.trim() != '') {
    chatbotBody.innerHTML +=
      '<div class="botResponse">' +
      '你是否想问：\"' + allData[2].question + '\"?<br/>' + allData[2].answer +
      '</div>';
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }
  chatbotBody.innerHTML += 
    '<div class="botResponse">' +
    '这个问题智能小助手还无法回答哦，可以在'+
    '<a target="_blank" href="https://docs.qq.com/form/page/DQXZVUXZJcFdPalVI?_w_tencentdocx_form=1">这里(【腾讯文档】资助机器人问答反馈)<a/>'+
    '反馈你的问题,稍后会有工作人员解答,也可以加入我们的资助系统答疑.'+
    '<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=pvxuiMdtRaCsE4ZDNN5t15NhTQzmOqVo&jump_from=webapi">892402887' +
    '<img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="资助答疑群-chatbot" title="资助答疑群-chatbot"></a>' +
    '</div>';
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