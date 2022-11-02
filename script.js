valores = {
  position: {
    t1:0,t2:1,t3:2,t4:3,t5:4,t6:5,t7:6,t8:7,t9:8,t10:9,t11:10,t12:11,t13:12,t14:13,t15:14,t16:15
  },
  tarjetas: ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12","t13","t14","t15","t16"],
  images: ["imgt1","imgt2","imgt3","imgt4","imgt5","imgt6","imgt7","imgt8","imgt9","imgt10","imgt11","imgt12","imgt13","imgt14","imgt15","imgt16"],
  tarjetasnames: ["Carta 1","Carta 2","Carta 3","Carta 4","Carta 5","Carta 6"],
  tarjetasvalues: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  tarjetasused: [],
  tarjetasleft: ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12","t13","t14","t15","t16"],
  tarjetaslength: 8,
  status: 1,
  holder: [],
  playable: true,
  resets: [],
  mov: 0,
  previous: "",
}

images = {
  inuse: [],
  default: ["img/fruits/","apple.png","banan.png","berry.png","cherry.png","peach.png","pine.png","straw.png","water.png"],
  assignimg() {
    this.inuse = this.default;
    this.loadimg();
  },
  loadimg() {
    loader = document.getElementById("loader");
    for(let i=1;i<this.inuse.length;i++) { 
      loader.innerHTML="<img src=\""+this.inuse[0]+this.inuse[i]+"\">"
    }
  }
}

memorama = {
  tarjeta(id,img) {
    if(valores.playable) {
      if (valores.previous==id) {
        return
      }
      valores.previous=id;
      valores.playable=false;
      posicion = valores.position[id];
      valor = valores.tarjetasvalues[posicion];
      element = document.getElementById(id);
      image = document.getElementById(img);
      image.style.transform="rotateY(90deg)";
      setTimeout(() => { 
        if(valores.status==1) {
          element.innerHTML="<img class=\"innerimg\" id=\"imgt"+posicion+"\" src=\""+images.inuse[0]+images.inuse[valor]+"\" alt=\"Carta"+posicion+"\" style=\"transform: rotateY(0deg);\">";
          element.style.border="black solid 2px";
          valores.status=2;
          valores.holder=[posicion,valor,id];
          valores.resets.push(id);
        } else if(valores.status==2) {
          element.innerHTML="<img class=\"innerimg\" id=\"imgt"+posicion+"\" src=\""+images.inuse[0]+images.inuse[valor]+"\" alt=\"Carta"+posicion+"\" style=\"transform: rotateY(0deg);\">";          element.style.border="black solid 2px";
          valores.status=1;
          valores.resets.push(id);
          if (valor==valores.holder[1]) {
            index = valores.tarjetasleft.indexOf(id);
            valores.tarjetasleft.splice(index,1);
            index2 = valores.tarjetasleft.indexOf(valores.holder[2]);
            valores.tarjetasleft.splice(index2,1);
            valores.holder=[];
            valores.resets=[];
            valores.playable=true;
            this.winner();
            valores.mov+=1;
            return
          }
          valores.mov+=1;
          setTimeout(() => {  this.resetplay(); }, 650);
          return;
        }
        valores.playable=true;
      }, 150)
    }
  },
  winner() {
    if(valores.tarjetasleft.length>0) {
      return;
    }
    header = document.getElementById("header");
    header.innerHTML="Winner!"
  },
  resetplay() {
    for(let i=0;i<valores.resets.length;i++){
      tarjeta = valores.resets[i];
      card = document.getElementById(tarjeta);
      position = tarjeta.replace('t','');
      card.style.border="";
      card.innerHTML="<img id=\"imgt"+position+"\" src=\"back.png\" alt=\"Carta"+position+"\" style=\"transform: rotateY(90deg);\">";
      this.rotateback(position);
    }
    valores.resets=[];
    valores.playable=true;
  },
  reset() {
    for(let i=0;i<valores.tarjetasleft.length;i++) {
      tarjeta = document.getElementById(valores.tarjetasleft[i]);
      position = valores.position[valores.tarjetasleft[i]]+1;
      tarjeta.innerHTML="<img id=\"imgt"+position+"\" src=\"back.png\" alt=\"Carta"+position+"\" style=\"transform: rotateY(90deg);\">";
      image = document.getElementById("imgt"+position);
      this.rotateback(image);
    }
    valores.playable=true;
  },
  rotateback(image) {
    image = document.getElementById("imgt"+position);
    setTimeout(() => {  image.style.transform="rotateY(0deg)"; }, 150);
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
  },
  setimages() {

  }
}