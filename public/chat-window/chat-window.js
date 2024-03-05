const token = localStorage.getItem('token');

setInterval(getChat, 1000);
window.addEventListener('DOMContentLoaded', getChat);
function saveMessage(e){
    e.preventDefault();
    const message = document.getElementById('mssgInput').value;

    axios.post('/chat/message', {message: message}, { headers: { "Authorization": token }})
    .then((response)=>{
        console.log(response)
        showOnScreenForCurrentUser(response.data.message.message);
    })
    .catch((err)=>{
        console.log(err);
    })
}


// function showOnScreen(message){
//     const mssgBox = document.querySelector('.container');
//     const div = document.createElement('div');
//     div.className = 'message left';
//     div.innerHTML = `<b>You:</b> ${message}`
//     mssgBox.appendChild(div);

//     document.getElementById('mssgInput').value = null;
// }


async function getChat(){
//     const response = await axios.all([axios.get('/chat/messages', { headers : {"Authorization" : token}}),
//     axios.get('/chat/get-user', {headers : {"Authorization":token
//     }})
// ]);
const response = await axios.all([axios.get('/chat/messages', { headers: {"Authorization": token}}),
    axios.get('/chat/get-user', { headers: {"Authorization": token}})]);
const messages = response[0].data;
const currentUsername= response[1].data.username;
 messages.forEach(mssgObj =>{
    showOnScreen2(mssgObj, currentUsername);
 })

}

function showOnScreenForCurrentUser(message){
    const mssgBox = document.querySelector('.container');
    const div = document.createElement('div');
    div.className = 'message left';
    div.innerHTML = `<b>You:</b> ${message}`
    mssgBox.appendChild(div);

    document.getElementById('mssgInput').value = null;
}

function showOnScreen2(mssgObj, currentUsername){
    const mssgBox = document.querySelector('.container');
    const div = document.createElement('div');
    if(mssgObj.user.username === currentUsername){
        div.className = 'message left';
        div.innerHTML = `<b>You:</b> ${mssgObj.message}`
    }
    else{
        div.className='message right';
        div.innerHTML=`<b> ${mssgObj.user.username}:</b> ${mssgObj.message}`
    }

    mssgBox.appendChild(div);
    mssgBox.scrollTop = mssgBox.scrollHeight;
}