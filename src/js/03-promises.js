import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', handlerFormSubmit);

function createPromise(position, delay) {  
    return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      resolve(`Fullfiled promise ${position} in ${delay}ms`);
    } else {
      reject(`Rejected promise ${position} in ${delay}ms`);
    }
    }, delay);
  });    
}  

function handlerFormSubmit(e) {
  e.preventDefault();
  let delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);     
      
    for (let i = 1; i <= amount; i += 1) {       
    createPromise(i, delay)
      .then(message =>  Notiflix.Notify.success(message))
        .catch(message => Notiflix.Notify.failure(message));     
      delay += step;
  }    
}





