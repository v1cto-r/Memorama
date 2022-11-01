valores = {
  position: {
    t1:0,t2:1,t3:2,t4:3,t5:4,t6:5,t7:6,t8:7,t9:8,t10:9,t11:10,t12:11,t13:12,t14:13,t15:14,t16:15
  },
  tarjetas: ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12","t13","t14","t15","t16"],
  tarjetasnames: ["Carta 1","Carta 2","Carta 3","Carta 4","Carta 5","Carta 6"],
  tarjetasvalues: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  tarjetasused: [],
  tarjetasleft: ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12","t13","t14","t15","t16"],
  tarjetaslength: 8,
  status: 1,
  holder: [],
  playable: true
}
memorama = {
  tarjeta(id) {
    if(valores.playable) {
      valores.playable=false;
      posicion = valores.position[id];
      valor = valores.tarjetasvalues[posicion];
      element = document.getElementById(id);
      if(valores.status==1) {
        element.innerHTML=valor;
        valores.status=2;
        valores.holder=[posicion,valor,id];
      } else if(valores.status==2) {
        element.innerHTML=valor;
        valores.status=1;
        if (valor==valores.holder[1]) {
          index = valores.tarjetasleft.indexOf(id);
          valores.tarjetasleft.splice(index,1);
          index2 = valores.tarjetasleft.indexOf(valores.holder[2]);
          valores.tarjetasleft.splice(index2,1);
          valores.holder=[];
        }
        setTimeout(() => {  this.reset(); }, 1000);
        this.winner();
        return;
      }
      valores.playable=true;
    }
  },
  winner() {
    if(valores.tarjetasleft.length>0) {
      return;
    }
    header = document.getElementById("header");
    header.innerHTML="Winner!"
  },
  reset() {
    for(let i=0;i<valores.tarjetasleft.length;i++) {
      tarjeta = document.getElementById(valores.tarjetasleft[i]);
      position = valores.position[valores.tarjetasleft[i]];
      tarjeta.innerHTML="<img src=\"back.png\" alt=\"Carta"+position+"\">";
    }
    valores.playable=true;
  },
  empezar() {
    for (let i=0;i<8;i++) {
      let card1;
      let card2;
      do {
        card1 = Math.floor(Math.random() * 16)+1;
      } while (valores.tarjetasused.includes(card1));
      valores.tarjetasused.push(card1);
      do {
        card2 = Math.floor(Math.random() * 16)+1;
      } while (valores.tarjetasused.includes(card2));
      valores.tarjetasused.push(card2);
    }
    k=1;
    j=0;
    for (let i=0;i<8;i++) {
      mod1 = valores.tarjetasused[j];
      mod2 = valores.tarjetasused[j+1];
      valores.tarjetasvalues[mod1] = k;
      valores.tarjetasvalues[mod2] = k;
      k++;
      j=j+2;
    }
    valores.tarjetasvalues.splice(0,1);
  }
}