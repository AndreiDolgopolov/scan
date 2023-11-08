const btnScan    = document.querySelector('.scan-button');
const fldEAN13  = document.querySelector('.input');
const regDigit = /^[0-9]+$/;

btnScan.addEventListener('click', function() {
    console.log('Scan');
    getInfoServer(fldEAN13.value);
  });

function getInfoServer(EAN13) {
    return fetch(`https://1c-new2019.grizzly.su/1c_new2019/hs/Scan/${EAN13}`, {
        method: 'GET',
        //credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
      }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`${res.status}(${res.statusText})`)
        }
    });    
} 

fldEAN13.addEventListener('keyup', function(evt) {
    const value = evt.target.value; 
    if (value.match(regDigit) === null) {
        evt.target.value = value.slice(0, -1);
        return;
    }
    if (value.length > 13) {
        evt.target.value = value.slice(0, 13);    
    } else if (value.length !== 13) {
        return;
    } 
    let aaa = getInfoServer(evt.target.value);
    console.log(aaa);
});


