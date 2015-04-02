(function(){
 var host='http://a.dangdang.com/'
 ,picHost='http://img4.ddimg.cn/daimage/'
 ,cpcUrl='cpc.php'
 ,cpmUrl='cpm.php'
 ,cpcCatUrl='cpc_category_top.php'
 ,cptUrl='cpt.php';
 var lazyShowLogUrl='http://per.dangdang.com/';
 var LAZY_CPC=true
 ,LAZY_CPM=true
 ,LAZY_CPT=true;
 var intervalTime=5000;
 var window=this,undefined;
 function ie6(){return window.navigator.userAgent.indexOf("MSIE 6.0")>0}
 function $(id){return document.getElementById(id)}
 function $C(elem){return document.createElement(elem)}
 function $A(a,b){if(typeof b == 'string'){ a.parentNode.innerHTML=b; } else {a.appendChild(b);} return b;}
 function bind(elem,type,callback){if(elem.addEventListener){elem.addEventListener(type,callback,false)}else if(elem.attachEvent){elem.attachEvent('on'+type,callback)}}
 function ready(f){bind(window,'load',f)}
 function init(){
     LAZY.boxModel();
 }
 function loadCSS(src){
     var head=document.getElementsByTagName('HEAD')[0],link=$C('LINK'); 
     link.rel="stylesheet";
     link.type="text/css";
     link.href=src;
     $A(head,link)
 }
 function loadJS(src,callback){
     var head = document.getElementsByTagName('HEAD')[0],script=$C('SCRIPT'),args = Array.prototype.slice.call(arguments, 2);
     script.src=src;script.async=true;
     if(typeof(callback) != 'undefined') {
         script.onload = function() {callback.apply(DD_ADSMART,args)};
         script.onreadystatechange = function() {
             if((ie = !-[1,])&&(this.readyState == 'complete' || this.readyState == 'loaded')) {
                 callback.apply(DD_ADSMART,args);
             }
         }
     }
     $A(head,script)
 }
// function productImg(pid,size,img_num){img_num=((typeof img_num=='undefined')||img_num<1)?'1':img_num; size=(typeof size=='undefined'?'l':size);return 'http://img3'+pid%10+'.ddimg.cn/'+pid%99+'/'+pid%37+'/'+pid+'-'+img_num+'_'+size+'.jpg'}
 function productImg(pid,size,img_num){
        img_num=((typeof img_num=='undefined')||img_num<1)?'1':img_num;
        if(img_num>1000){
            var img_version = parseInt(img_num%1000);
            img_num = parseInt(img_num/1000);
            size=(typeof size=='undefined'?'l':size);return 'http://img3'+pid%10+'.ddimg.cn/'+pid%99+'/'+pid%37+'/'+pid+'-'+img_num+'_'+size+'_'+img_version+'.jpg'
        }else{
            size=(typeof size=='undefined'?'l':size);return 'http://img3'+pid%10+'.ddimg.cn/'+pid%99+'/'+pid%37+'/'+pid+'-'+img_num+'_'+size+'.jpg'
        }
 }
 var LAZY={box:false
     ,boxModel:function(){if(LAZY_CPC||LAZY_CPM||LAZY_CPT){$(function(){
             var d=$C('DIV'),res;d.style.width=d.style.paddingLeft='1px';$A(document.body,d);res=(d.offsetWidth==2);document.body.removeChild(d).style.display='none';LAZY.box=res})}}
     ,width:function(elem){
         return elem==window?document.compatMode=='CSS1Compat'&&document.documentElement["clientWidth"]||document.body["clientWidth"]:elem==document?Math.max(document.documentElement["clientWidth"],document.body["scrollWidth"],document.documentElement["scrollWidth"],document.body["offsetWidth"],document.documentElement["offsetWidth"]):(elem.offsetWidth-elem.style.paddingRight-elem.style.paddingLeft-elem.style.borderRight-elem.style.borderLeft)
     }
     ,height:function(elem){
         return elem==window?document.compatMode=='CSS1Compat'&&document.documentElement["clientHeight"]||document.body["clientHeight"]:elem==document?Math.max(document.documentElement["clientHeight"],document.body["scrollHeight"],document.documentElement["scrollHeight"],document.body["offsetHeight"],document.documentElement["offsetHeight"]):(elem.offsetHeight-elem.style.paddingTop-elem.style.paddingBottom-elem.style.borderTop-elem.style.borderBottom)
     }
     ,offset:function(elem){
         if(!elem)return {top:0,left:0}
         if(elem.getBoundingClientRect){
             var box=elem.getBoundingClientRect(),doc=elem.ownerDocument,body=doc.body,docElem=doc.documentElement,
                 clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,
                 top=box.top+(self.pageYOffset||LAZY.box&&docElem.scrollTop||body.scrollTop)-clientTop,
                 left=box.left+(self.pageXOffset||LAZY.box&&docElem.scrollLeft||body.scrollLeft)-clientLeft;
             return {top:top,left:left};
         }else{  
         }return {top:0,left:0}
     }
     ,scrollLeft:function(){return window['pageXOffset']||LAZY.box&&document.documentElement.scrollLeft||document.body.scrollLeft}
     ,scrollTop:function(){return window['pageYOffset']||LAZY.box&&document.documentElement.scrollTop||document.body.scrollTop}
     ,appear:function(elem){var off=LAZY.offset(elem);return ((LAZY.width(window)+LAZY.scrollLeft())>off.left)&&(LAZY.height(window)+LAZY.scrollTop()>off.top)}
     ,lazy:function(elem,callback){
         var args=Array.prototype.slice.call(arguments,2);
         function a(){if(LAZY.appear(elem)){if(!elem.load){callback.apply(LAZY,args);elem.load=true }}}
         a();
         bind(window,'scroll',function(){if(LAZY.appear(elem)){a()}});
     }
 };
 if(typeof(window.DDAD_RDM) == 'undefined') {
     window.DDAD_RDM = (new Date().getTime()).toString() + parseInt(Math.random()*(999999999-100000000)+100000000);
 }
 window.DD_ADSMART=DD_ADSMART={cpc:null,cpm:[],cpc_ad:[],cpm_ad:[],cpt_ad:[],cptSlide:{},cptSlideTimer:{},cpc_category:[],cpt_dl_idset:[]
     ,getFullImageURL:function(imgURL){
        return (imgURL.search('http://') === 0)?imgURL:picHost+imgURL.substr(0,2)+'/'+imgURL
    }
    ,recordCpcShow:function(pos,seq,ad_id,extra,extra_org,ip,permanent_id,rdm,style,showdiv,ab,sflag){
         var elem = $('seq_'+seq);
         LAZY.lazy(elem,loadJS,lazyShowLogUrl+'logurl.htm?tp=1&seq='+seq+'&pos='+pos+'&ad_id='+ad_id+'&extra='+extra+'&extra_org='+extra_org+'&ip='+ip+'&permanent_id='+permanent_id+'&rdm='+rdm+'&style='+style+'&showdiv='+showdiv+'&ab=1&sflag=0');
     }
     ,recordCpcShow2:function(pos,seqs,ad_ids,extra,extra_org,ip,permanent_id,rdm,style,showdiv,ab,sflag){
         loadJS(lazyShowLogUrl+'logurl.htm?tp=2&seq='+seqs+'&pos='+pos+'&ad_id='+ad_ids+'&extra='+extra+'&extra_org='+extra_org+'&ip='+ip+'&permanent_id='+permanent_id+'&rdm='+rdm+'&style='+style+'&showdiv='+showdiv+'&ab=1&sflag=0');
     }
     ,fetchCPCCat:function(extra,page,guanid,display_style,pos,wide){
         if(typeof display_style=='undefined'){
            display_style=0;
         }
         if(display_style==0){
             loadCSS(host+'smart.css');
         }
         if(typeof pos=='undefined'){
            pos=5;
         }
         var size = (wide==1)?4:3;
         if(typeof guanid=='undefined') {
             DD_ADSMART.cpc_category[extra]=[];
             loadJS(host+cpcCatUrl+'?pos='+pos+'&page='+page+'&extra='+extra+'&size='+size+'&rdm='+window.DDAD_RDM,DD_ADSMART.showCPCCat,extra,page,guanid,display_style,pos,wide);
         }else {
             DD_ADSMART.cpc_category[extra]=[];
             loadJS(host+cpcCatUrl+'?pos='+pos+'&page='+page+'&extra='+extra+'&guan='+guanid+'&size='+size+'&rdm='+window.DDAD_RDM,DD_ADSMART.showCPCCat,extra,page,guanid,display_style,pos,wide);
         }
     }
     ,showCPCCat:function(id,page,guanid,display_style,pos,wide){
        var c=$('cpc_cat_'+id),o=DD_ADSMART,catDat=o.cpc_category;
         var ccc = [];
         var tmp,rdm;
        ccc[id] = catDat[id].data;
        rdm = catDat[id].rdm;
        while (tmp = c.firstChild) {
           c.removeChild(tmp);
        }
        var pagesize = (wide==1)?4:3;
        if(ccc[id]&&ccc[id].length==3 && display_style==0){
            var cm=$C('DIV'),cl=$C('DIV'),cc=$C('DIV'),cr=$C('DIV'),bak=false;
            cm.className='slide_panel';cl.className='slide_panel_left';
            cc.className='slide_panel_content';cr.className='slide_panel_right';
            var seqs ='',ad_ids='',extra_orgs='',sflags='';
            for(var i=0;i<3;i++){
                var cItem=$C('DIV'),cPic=$C('DIV'),aPic=$C('A'),img=$C('IMG'),cDetail=$C('DIV'),cTitle=$C('DIV'),aProd=$C('A'),cTip=$C('DIV'),aShop=$C('A'),cPrice=$C('DIV'),sPriceM=$C('SPAN'),sPriceD=$C('SPAN');
                cItem.className='slideitem';cPic.className='pic';cDetail.className='detail';cTitle.className='title';
                cTip.className='tip';cPrice.className='price';sPriceM.className='price_m';sPriceD.className='price_d';
                var pUrl=(ccc[id][i].url.indexOf('http://')<0)?host+ccc[id][i].url:ccc[id][i].url;
                if(ccc[id][i].url==pUrl){
                    bak=true;
                }
                aPic.target=aProd.target=aShop.target='_blank';
                aPic.href=aProd.href=pUrl;aShop.href=(ccc[id][i].shop_id==0)?'http://www.dangdang.com':'http://shop.dangdang.com/'+ccc[id][i].shop_id;
                aPic.rel='nofollow';
                aPic.title=aProd.title=(aProd.innerHTML=ccc[id][i].name).replace('<br>',' ');
                aShop.innerHTML=aShop.title=ccc[id][i].shop_name;
                img.src=productImg(ccc[id][i].pid,'s',ccc[id][i].img);
                var mPrice=parseFloat(ccc[id][i].market_price),dPrice=parseFloat(ccc[id][i].price);
                mPrice=mPrice<100?mPrice.toFixed(2):(mPrice<1000?mPrice.toFixed(1):mPrice);
                dPrice=dPrice<100?dPrice.toFixed(2):(dPrice<1000?dPrice.toFixed(1):dPrice);
		if(mPrice!=0.00)
                sPriceM.innerHTML='￥<span>'+mPrice+'</span>';
                sPriceD.innerHTML='￥<span>'+dPrice+'</span>';
                $A(aPic,img);$A(cPic,aPic);
                $A(cTitle,aProd);$A(cTip,aShop);$A(cTitle,cTip);$A(cPrice,sPriceD);$A(cPrice,sPriceM);
                $A(cDetail,cTitle);$A(cDetail,cPrice);
                $A(cItem,cPic);$A(cItem,cDetail);
                if(i>1){
                    cItem.className='slideitem lastitem';
                }
                seqs +=ccc[id][i].pos_num+',';
                ad_ids +=ccc[id][i].ad_id+',';
                extra_orgs += (ccc[id][i].extra_org+',');
                sflags += "0,";
                $A(cc,cItem);
            }
            var ip = ccc[id][0].ip;
            var permanent_id = ccc[id][0].permanent_id;
            var extra = ccc[id][0].extra;

            DD_ADSMART.recordCpcShow2(pos,seqs,ad_ids,extra,'',ip,permanent_id,rdm,'old','cpc_cat',1,sflags);
            var al=(page<1)?$C('SPAN'):$C('A'),ar=bak?$C('SPAN'):$C('A'),ci=$C('DIV');
            ci.className='slide_icon';al.className=(page<1)?'btn_left bof':'btn_left';al.title='上一页';
            ar.className=bak?'btn_right eof':'btn_right';ar.title='下一页';
            al.id='prev_page';
            ar.id='next_page';
            $A(cr,ar);
            if(page>0){
                al.href="#";
                al.onclick=function(){
                    o.fetchCPCCat(id,page-1,guanid,display_style,pos,wide);
                    return false
                }
            }
            if(!bak){
                ar.href="#";
                ar.onclick=function(){
                    o.fetchCPCCat(id,page+1,guanid,display_style,pos,wide);
                    return false
                }
            }
            $A(cl,al);$A(c,cm);$A(cm,cl);$A(cm,cc);$A(cm,cr);if(ie6()){$A(cm,$C('DIV'))};$A(cm,ci);
        }else if(ccc[id]&&ccc[id].length==pagesize) {
             var cm=$C('DIV'),cl=$C('A'),cr=$C('A'),bak=false;
             cm.className='slide_ad_content clearfix';
            cl.id='prev_page';
            cr.id='next_page';
             $A(cl,$C('SPAN'));
             cl.title='上一页';
             $A(cm,cl);
             cl.className='btn_prev bof';
             if(page>0){cl.href="#";cl.className='btn_prev';cl.onclick=function(){o.fetchCPCCat(id,page-1,guanid,display_style,pos,wide);return false}}

             var seqs ='',ad_ids='',extra_orgs='',sflags='';
             for(var i=0;i<pagesize;i++){
                 var cItem=$C('DIV'),cPic=$C('DIV'),aPic=$C('A'),img=$C('IMG'),cDetail=$C('DIV'),cTitle=$C('P'),aProd=$C('A'),aShop=$C('A'),cPrice=$C('P'),cPriceNew=$C('P'),sPriceM=$C('SPAN'),sPriceD=$C('SPAN');
                 cItem.className='slideitem clearfix';
                 cPic.className='pic';
                 cDetail.className='detail';
                 cTitle.className='title';
                 cPrice.className='price';
                 cPriceNew.className='price';
                 sPriceM.className='price_m';
                 sPriceD.className='price_d';
                 var pUrl=(ccc[id][i].url.indexOf('http://')<0)?host+ccc[id][i].url:ccc[id][i].url;
                 if(ccc[id][i].url==pUrl)bak=true;
                 aPic.target=aProd.target=aShop.target='_blank';
                 aPic.href=aProd.href=pUrl;
                 aPic.rel='nofollow';
                 aPic.title=aProd.title=(aProd.innerHTML=ccc[id][i].name).replace('<br>',' ');
                 if(pos==5){
                    aShop.href=(ccc[id][i].shop_id==0)?'http://www.dangdang.com':'http://shop.dangdang.com/'+ccc[id][i].shop_id;
                    aShop.innerHTML=aShop.title=ccc[id][i].shop_name;
                 }else if(pos==7){
                    aShop.href=pUrl;
                    aShop.innerHTML=aShop.title=ccc[id][i].author_name;
                 }
                 aShop.className='tip';
                 img.src=productImg(ccc[id][i].pid,'p',ccc[id][i].img);
                 var mPrice=ccc[id][i].market_price,dPrice=ccc[id][i].price;
                 var mPrice_len = mPrice.length,dPrice_len = dPrice.length;
                 if(parseInt(mPrice_len)>6) {//价格>1000的处理小数位 
                    var trim_mprice = mPrice.split('.');
                    var t_mprice1 = parseInt(trim_mprice[1]);
                    if(t_mprice1 == 0){
                        mPrice = trim_mprice[0];
                    }else if(t_mprice1 > 9 && t_mprice1%10 == 0 ){
                        mPrice = trim_mprice[0]+'.'+ t_mprice1/10;
                    }
                 }
                 if(parseInt(dPrice_len)>6) {//价格>1000的处理小数位 
                    var trim_dprice = dPrice.split('.');
                    var t_dprice1 = parseInt(trim_dprice[1]);
                    if(t_dprice1 == 0){
                        dPrice = trim_dprice[0];
                    }else if(t_dprice1 > 9 && t_dprice1%10 == 0 ){
                        dPrice = trim_dprice[0]+'.'+ t_dprice1/10;
                    }
                 }
                 //mPrice=mPrice<100?mPrice.toFixed(2):(mPrice<1000?mPrice.toFixed(1):mPrice);
                 //dPrice=dPrice<100?dPrice.toFixed(2):(dPrice<1000?dPrice.toFixed(1):dPrice);
		 if(mPrice!=0.00)
                 sPriceM.innerHTML='&yen;'+mPrice;
                 sPriceD.innerHTML='&yen;'+dPrice;
                 $A(aPic,img);
                 $A(cPic,aPic);
                 $A(cTitle,aProd);
                 $A(cTitle,aShop);
                 $A(cPrice,sPriceM);
                 $A(cPriceNew,sPriceD);
                 $A(cDetail,cTitle);
                 $A(cDetail,cPrice);
                 $A(cDetail,cPriceNew);
                 $A(cItem,cPic);
                 $A(cItem,cDetail);
                 if(i == 0){cItem.className = 'slideitem clearfix first'}
                 seqs +=ccc[id][i].pos_num+',';
                 ad_ids +=ccc[id][i].ad_id+',';
                 extra_orgs += (ccc[id][i].extra_org+',');
                 sflags += "0,";
                 $A(cm,cItem);
             }
            var ip = ccc[id][0].ip;
            var permanent_id = ccc[id][0].permanent_id;
            var extra = ccc[id][0].extra;

            DD_ADSMART.recordCpcShow2(pos,seqs,ad_ids,extra,'',ip,permanent_id,rdm,'old','cpc_cat',1,sflags);

             $A(cr,$C('SPAN'));
             cr.title='下一页';
             $A(cm,cr);
             cr.className='btn_next eof';
             if(!bak){cr.href="#";cr.className='btn_next';cr.onclick=function(){o.fetchCPCCat(id,page+1,guanid,display_style,pos,wide);return false}}

             var wrapper = $C("DIV");
             wrapper.className = 'slide_ad';
             $A(wrapper, cm);
             var tmp = $C("DIV");
             tmp.className = 'icon';
             $A(wrapper, tmp);

             tmp = $C("SPAN");
             tmp.className = 'corner left_top imageElement';
             $A(wrapper, tmp);

             tmp = $C("SPAN");
             tmp.className = 'corner right_top imageElement';
             $A(wrapper, tmp);

             tmp = $C("SPAN");
             tmp.className = 'corner left_bottom imageElement';
             $A(wrapper, tmp);

             tmp = $C("SPAN");
             tmp.className = 'corner right_bottom imageElement';
             $A(wrapper, tmp);

             $A(c,wrapper);
         }
     }
     ,fetchCPM:function(pos,type){
         if(LAZY_CPM){
             var img_type = 0;
             if(type == 'top_1') img_type = 1;
             LAZY.lazy($('ad_cpm_'+pos),loadJS,host+cpmUrl+'?pos='+pos+'&img_type='+img_type,DD_ADSMART.showCPM,pos,type);
         }else{
             loadJS(host+cpmUrl+'?pos='+pos,DD_ADSMART.showCPM,pos,type);
         }
     }
     ,showCPM:function(pos,type) {
         if(DD_ADSMART.cpm_ad[pos]){
             var c = $('ad_cpm_'+pos);
             c.innerHTML='';
             $A(c,DD_ADSMART.createCPM(pos,type))
         }
     }
     ,createCPM:function(pos,type) {
	if(type=="top_1" || type=="top"){
         var a=$C('A'),img=$C('IMG'),src=DD_ADSMART.cpm_ad[pos].img; 
         var div=$C('div');
         var div2=$C('div');
         if(type == "top") div.className="narrow_page";
         div2.className="top_pic";
         img.src=(src.substr(0,8)=='dangdang')?host+'static/images/'+src:this.getFullImageURL(src);
         a.href=(src.substr(0,8)=='dangdang')?DD_ADSMART.cpm_ad[pos].url:host+DD_ADSMART.cpm_ad[pos].url;
         a.target='_blank';
         a.rel='nofollow';
         $A(a,img);
         $A(div2,a);
         $A(div,div2);
         return div;
	} else if(type=="new"){
         var a=$C('A'),img=$C('IMG'),src=DD_ADSMART.cpm_ad[pos].img; 
         var div=$C('div');
         div.className="top_banner";
         var p=$C('p');
         img.src=(src.substr(0,8)=='dangdang')?host+'static/images/'+src:this.getFullImageURL(src);
         a.href=(src.substr(0,8)=='dangdang')?DD_ADSMART.cpm_ad[pos].url:host+DD_ADSMART.cpm_ad[pos].url;
         a.target='_blank';
         a.rel='nofollow';
         $A(a,img);
         $A(p,a);
         $A(div,p);
         return div;
	}else{
         var a=$C('A'),img=$C('IMG'),src=DD_ADSMART.cpm_ad[pos].img;
         img.src=(src.substr(0,8)=='dangdang')?host+'static/images/'+src:this.getFullImageURL(src);
         a.href=(src.substr(0,8)=='dangdang')?DD_ADSMART.cpm_ad[pos].url:host+DD_ADSMART.cpm_ad[pos].url;
         a.target='_blank';$A(a,img);
         a.rel='nofollow';
         return a;

	}
     }
     ,fetchCPT:function(pos,type,style,inner,name,wide) {
         if(typeof(type)=='undefined'){type=0}
         if(typeof(style)=='undefined'){style=0}
         if(typeof(inner)=='undefined'){inner=false}
         if(typeof(name)=='undefined'){name=""}
         if(typeof(wide)=='undefined'){wide=0}
         if(LAZY_CPT){
             LAZY.lazy($('ad_cpt_'+pos),loadJS,host+cptUrl+'?pos='+pos+"&type="+type,DD_ADSMART.showCPT,pos,style,inner,name,wide);
         }else{
             loadJS(host+cptUrl+'?pos='+pos+"&type="+type,DD_ADSMART.showCPT,pos,style,inner,name,wide);
         }
     }
     ,fetchCPTCat:function(catid,style) {
         if(typeof(style)=='undefined'){style="cat_slider"}
         if(LAZY_CPT){
             LAZY.lazy($('ad_cpt_'+catid),loadJS,host+cptUrl+'?catid='+catid,DD_ADSMART.showCPTCat,catid,style);
         }else{
             loadJS(host+cptUrl+'?catid='+catid,DD_ADSMART.showCPTCat,catid,style);
         }
     }
     ,showCPTCat:function(catid,style){
         var id=catid;
         var c = $('ad_cpt_'+id);
         var pos='pos_'+id;
         c.innerHTML='';
         if(DD_ADSMART.cptSlide[pos].length>0){
             loadCSS(host+'smart.css');
             c.className = "category_circlepic";
             if(DD_ADSMART.cptSlide[pos].length>1){
                 bind(c,'mouseout',DD_ADSMART.cptSlideSetInterval(pos,style));
                 bind(c,'mouseover',DD_ADSMART.cptSlideClearInterval(pos,style));
             }   
             if(style=='cat_slider'){
                     var left_arrow = $C('a');
                     left_arrow.className = "up";
                     left_arrow.href = "javascript:void(0)";
                     var right_arrow = $C('a');
                     right_arrow.className = "down";
                     right_arrow.href = "javascript:void(0)";
                     var img_div = $C('div');
                     img_div.className = 'category_circlepic_box';
                     img_div.id = "show_img";
                     $A(c,left_arrow);
                     $A(c,right_arrow);
                     if(typeof(inner)=='undefined'){inner=false}
                     for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                             if(k==0){$A(img_div,DD_ADSMART.createCPTSlideContent(pos,k,"inline",style,inner));}
                             else{$A(img_div,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner));}
                     }
                     $A(c,img_div);
                     if(DD_ADSMART.cptSlide[pos].length>1){
                             bind(right_arrow, 'click', DD_ADSMART.loopShow(img_div,'right'));
                             bind(left_arrow, 'click', DD_ADSMART.loopShow(img_div,'left'))
                     }
             }
             DD_ADSMART.cptSlideSetInterval(pos,style)();
         }else{
             c.style.display='none';
         }
     }
     ,fetchCPTSlide:function(pos1,pos2,pos3,pos4,type,style,inner,wide) {
         if(typeof(type)=='undefined'){type=0}
         if(typeof(inner)=='undefined'){inner=false}
         if(LAZY_CPT){
             LAZY.lazy($('ad_cpt_'+pos1+'_'+pos2+'_'+pos3+'_'+pos4),loadJS,host+cptUrl+'?pos1='+pos1+'&pos2='+pos2+'&pos3='+pos3+'&pos4='+pos4+'&type='+type,DD_ADSMART.showCPTSlide,pos1,pos2,pos3,pos4,style,inner,wide);
         }else{
             loadJS(host+cptUrl+'?pos1='+pos1+'&pos2='+pos2+'&pos3='+pos3+'&pos4='+pos4+'&type='+type,DD_ADSMART.showCPTSlide,pos1,pos2,pos3,pos4,style,inner,wide);
         }
     }
     ,showCPT:function(pos,style,inner,name,wide) {
         var c = $('ad_cpt_'+pos);
         c.innerHTML='';
         if(DD_ADSMART.cpt_ad[pos]&&(DD_ADSMART.cpt_ad[pos].ad_content.length>0)){
             type = DD_ADSMART.cpt_ad[pos].type;
             $A(c,DD_ADSMART.createCPT(pos,type,style,inner,name,wide))
         }else{
             c.style.display='none';	
	     } 
     }
     ,showCPTSlide:function(pos1,pos2,pos3,pos4,style,inner,wide){
         var id=pos1+'_'+pos2+'_'+pos3+'_'+pos4,c = $('ad_cpt_'+id);
         var pos='pos_'+id;
         c.innerHTML='';
         if((DD_ADSMART.cptSlide[pos].length>0)&&(DD_ADSMART.cptSlide[pos][0].ad_content.length>0)){
             if(DD_ADSMART.cptSlide[pos][0].ad_content[0].ad_label==1){
                 inner = 0;
             }else{
                 inner = 1;
             }
             DD_ADSMART.cptSlide[pos].sort(function(a,b){return Math.random()>.5 ? -1 : 1;});
             if(DD_ADSMART.cptSlide[pos].length>1){
                 bind(c,'mouseout',DD_ADSMART.cptSlideSetInterval(pos,style));
                 bind(c,'mouseover',DD_ADSMART.cptSlideClearInterval(pos,style));
             }
             if(style=='home'){
                 var div=$C('div');
                 div.className="homepage_advlist_box";
                 $A(div,DD_ADSMART.createCPTHomeSlideTitle(pos,style));
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){$A(div,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));}else{$A(div,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));}
                 }
                 $A(c,div);
             }else if(style=='s_slide'){
                var pic_div=$C("div");
                pic_div.className="content";	
                var head_div = $C("div");
                ul = DD_ADSMART.createCPTHomeSlideTitle(pos,style);
                $A(head_div,ul);
                head_div.className = 'head';
                if((typeof head_div!='undefined'))
                {
                    $A(c,head_div);
                }
                for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                    if(k==0){
                        $A(pic_div,DD_ADSMART.createCPTSlideContent(pos,k,"block",style,inner,wide));
                    }else{
                        $A(pic_div,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                    }
                }
                $A(c,pic_div);
             }else if(style=='search'){
                 $A(c,DD_ADSMART.createCPTSearchSlideTitle(pos,style));
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(c,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(c,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
             }else if(style=='dp'){
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(c,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(c,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $('bottom_ad_banner').style.display="";
             }else if(style=='ndp'){
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(c,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(c,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $('bottom_ad_banner').style.display="";
             }else if(style=='newsearch'){
                 var div=$C('div');
                 div.className="skyscraper_ad";
                 $A(div,DD_ADSMART.createCPTSearchSlideTitle(pos,style));
                 holder=$C("div");holder.className="placeholder";$A(div,holder);
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){$A(div,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));}else{$A(div,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));}
                 }
                 span1=$C("span");span1.className="corner left_bottom imageElement";
                 span2=$C("span");span2.className="corner right_bottom imageElement";
                 $A(div,span1);
                 $A(div,span2);
                 $A(c,div);
             }else if (style == 'newstyle'){
                 var div=$C('div');
		 div.className="schleft_tabad";
                 $A(div,DD_ADSMART.createCPTSearchSlideTitle(pos,style));
                 var d=$C('div');
		 holder=$C("div");
		 holder.className="schleft_tabad_cont";
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(d,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(d,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $A(holder,d);
                 $A(div,holder);
                 $A(c,div);
	     }else if(style == 'newliststyle'){
                 var div=$C('div');
		 div.className="schleft_tabad";
                 $A(div,DD_ADSMART.createCPTSearchSlideTitle(pos,style));
                 var d=$C('div');
		 holder=$C("div");
		 holder.className="schleft_tabad_cont";
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(d,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(d,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $A(holder,d);
		 $A(div,holder);
                 $A(c,div);
	     }else if(style=='multysearch'){
                 var div=$C('div');
                 div.className="bottom_ad";
                 var p = $A(div,DD_ADSMART.createCPTSearchSlideTitle(pos,style));
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){$A(p,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));}else{$A(p,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));}
                 }
                 span1=$C("span");span1.className="corner left_top imageElement";
                 span2=$C("span");span2.className="corner right_top imageElement";
                 span3=$C("span");span3.className="corner left_bottom imageElement";
                 span4=$C("span");span4.className="corner right_bottom imageElement";
                 $A(div,p);
                 $A(div,span1);
                 $A(div,span2);
                 $A(div,span3);
                 $A(div,span4);
                 $A(c,div);
             }else if(style=='newmultysearch'){
                 var div=$C('div');
                 div.className="search_tabad";
                 var d=$C('div');
                 holder=$C("div");
                 holder.className="schleft_tabad_cont";
                 $A(div,DD_ADSMART.createCPTSearchSlideTitle(pos,style));
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
		         $A(d,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
		     }else{
		         $A(d,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
		     }
                 }
                 $A(div,d);
                 $A(c,div);
             }else if(style=='home_alter'){
                 var div=$C("div");
                 var title_div = DD_ADSMART.createCPTHomeSlideTitle(pos,style);
                 if((typeof title_div!='undefined'))
                 {
                     $A(div,title_div);
                 }
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(div,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(div,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $A(c,div);
             }else if(style=='group_buying'){
                 var pic_div=$C("div");
                 pic_div.className="ad_topbanner_cont";
                 var title_div = DD_ADSMART.createCPTHomeSlideTitle(pos,style);
                 if((typeof title_div!='undefined'))
                 {
                     $A(c,title_div);
                 }
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(pic_div,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(pic_div,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $A(c,pic_div);
             }else if(style=='slide_banner'){
                 var out_div=$C("div"),pic_div=$C("div");
                 out_div.className="tab_c";
                 pic_div.className="content";
                 var title_ul = DD_ADSMART.createCPTHomeSlideTitle(pos,style);
                 if((typeof title_ul!='undefined')){
                     $A(c,title_ul);
                 }
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){
                         $A(pic_div,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));
                     }else{
                         $A(pic_div,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));
                     }
                 }
                 $A(out_div,pic_div);
                 $A(c,out_div);
             }else if(style=='newhome'){
                 var div_top=$C('div');
                 div_top.className="homepage_outbanner_top";
                 var div_bottom=$C('div');
                 div_bottom.className="homepage_outbanner_bottom";
                 var div=$C('div');
                 div.className="homepage_outbanner_box";
                 var span=$C("span");
                 var title_div = DD_ADSMART.createCPTHomeSlideTitle(pos,style);
                 if((typeof title_div!='undefined'))
                 {
                     $A(div,title_div);
                 }
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){$A(span,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));}else{$A(span,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));}
                 }
                 $A(div,span);
                 $A(c,div_top);
                 $A(c,div);
                 $A(c,div_bottom);
             }else if(style=='newhome_inner'){
		 var div=$C('div'); 
		 div.className="homepage_insidebanner_nei";
                 var title_div = DD_ADSMART.createCPTHomeSlideTitle(pos,style);
                 if((typeof title_div!='undefined'))
                 {
                     $A(div,title_div);
                 }
                 var span=$C("span");
		 span.className='icon_ad_pos';
                 for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                     if(k==0){$A(span,DD_ADSMART.createCPTSlideContent(pos,k,"",style,inner,wide));}else{$A(span,DD_ADSMART.createCPTSlideContent(pos,k,"none",style,inner,wide));}
                 }
                 $A(div,span);
		 $A(c,div);
             }else if(style == 'ebook'){
                for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                    var a = $C('A');
                    a.href = host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url
                    a.title = DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                    a.target= "_blank";
                    var img = $C("IMG");
                    var src = (wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img
                    img.src = this.getFullImageURL(src);
                    $A(a,img);
                    $A(c,a);
                }
             }else if(style == 'ddhome_one'){
                var float_pic=$C('DIV');
                var outer = $C('SPAN');
                var span = $C('SPAN');
                var a = $C('A');
                var close = $C('A');
                var i = $C('I');
                var float_pic_tmp=$C('DIV');
                float_pic_tmp.className='float_pic_tmp';
                float_pic.className='float_pic';
                close.className='ad_closeicon';
                close.href="javascript:void(0)";
                i.className='icon_ad';
                a.href = host+DD_ADSMART.cptSlide[pos][0].ad_content[0].ad_url
                a.rel = 'nofollow';
                a.title = DD_ADSMART.cptSlide[pos][0].ad_content[0].ad_des;
                a.target= "_blank";
                var img = $C("IMG");
                var src = ( wide==1)? DD_ADSMART.cptSlide[pos][0].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][0].ad_content[0].ad_img
                img.src = this.getFullImageURL(src);

                close.onclick=function(){return bottom_ad_banner_hide()};
                $A(a,img);
                $A(span,a);
                $A(outer,span);
                $A(outer,close);
                if(!inner){
                    $A(outer,i);
                }
                $A(float_pic,outer);
                $A(c,float_pic_tmp);
                $A(c,float_pic);
             }
             DD_ADSMART.cptSlideSetInterval(pos,style)();
         }else{
	     if (style == 'newstyle' || style == 'newliststyle' || style == 'newsearch' || style == 'newmultysearch'|| style == 's_slide'){
	         document.getElementById(c.id).style.display="none";
	     }
	     if (style == 'ndp' ){ 
	         var   bSpan   =   document.getElementById('bottom_ad_banner_show');
		 var   bParent   =   bSpan.parentNode;
	         bParent.removeChild(bSpan); 
	     }

	 }
     }
     ,loopShow:function(e,point){
	     return function() {
		     var img_nodes = e.childNodes;
		     var length = e.childNodes.length;
		     for(var i=0;i<length;i++){
			     if(img_nodes.item(i).style.display == "inline"){ 
				     if(point == 'right'){
					     if( i == length-1 ){
						     e.firstChild.style.display = "inline";
						     jQuery("#show_img").stop(true,false);
						     e.style.left = 0;
						     e.lastChild.style.display = "";
					     }else{
						     img_nodes.item(i).nextSibling.style.display = "inline";
						     var next = i + 1;
		     				     jQuery("#show_img").stop(true,false).animate({left: -760*next}, 1000);
						     img_nodes.item(i).style.display = "";
					     }    
				     }else{
					     if( i == 0 ){ 
						     e.lastChild.style.display = "inline";
						     jQuery("#show_img").stop(true,false);
						     e.style.left = -760*(length-1)+"px";
						     e.firstChild.style.display = "";
					     }else{
						     img_nodes.item(i).previousSibling.style.display = "inline";
						     var previous = i - 1;
		     				     jQuery("#show_img").stop(true,false).animate({left: -760*previous}, 1000);
						     img_nodes.item(i).style.display = "";
					     }    

				     }    
				     break;
			     }    
		     }    
	     };   
     }   
     ,cptSlideClearInterval:function(pos,style){
         return function(){if(DD_ADSMART.cptSlideTimer[pos]!=null){clearInterval(DD_ADSMART.cptSlideTimer[pos])}}
     }
     ,cptSlideSetInterval:function(pos,style){
	 if(style == "cat_slider") { intervalTime = 3000;}
	 if(style == "group_buying") { intervalTime = 4000;}
         return function(){DD_ADSMART.cptSlideTimer[pos]=setInterval(DD_ADSMART.timeoutGo(pos,style),intervalTime);}
     }
     ,timeoutGo:function(pos,style){
         return function(){
             if(style=="home"){
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='now'||item.className=='other now')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="search"){
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='first first_active'||item.className=='last last_active'||item.className=='active')){
                         break;
                     }
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){
                     DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);
                 }else{
                     DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);
                 }
             }else if(style=="dp"){
                 DD_ADSMART.cptSlideGo(pos,"notusing",style);
             }else if(style=="ndp"){
                 DD_ADSMART.cptSlideGo(pos,"notusing",style);
             }else if(style=="newsearch"){
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='active')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style == 'newstyle'){
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='first first_active'||item.className=='last last_active'||item.className=='active')){
                         break;
                     }
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){
                     DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);
                 }else{
                     DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);
                 }
	     }else if(style == 'newliststyle'){
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='first first_active'||item.className=='last last_active'||item.className=='active')){
                         break;
                     }
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){
                     DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);
                 }else{
                     DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);
                 }
	     }else if(style=="multysearch"){
		 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='active')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="newmultysearch"){
		 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='active')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="home_alter"){
                 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='active')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="group_buying"){ 
                 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='active')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
              }else if(style == "s_slide"){
                 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='on')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="slide_banner"){
                 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='on')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="newhome" || style=="newhome_inner"){
                 if(DD_ADSMART.cptSlide[pos].length==1)return;
                 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                     var item=$("ad_title_"+pos+'_'+k);
                     if((typeof item.className!='undefined') && (item.className=='now'||item.className=='other now')){break;}
                 }
                 if(k==DD_ADSMART.cptSlide[pos].length-1){DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_0'),style);}else{DD_ADSMART.cptSlideGo(pos,$("ad_title_"+pos+'_'+(k+1)),style);}
             }else if(style=="cat_slider"){
		 if(DD_ADSMART.cptSlide[pos].length==1)return;
            	 var k=0;
                 for(;k<DD_ADSMART.cptSlide[pos].length;k++){
                      var item=$("ad_pic_"+pos+'_'+k);
		      if(item.style.display == 'inline'){break;}
                 }
                     if(k==DD_ADSMART.cptSlide[pos].length-1){
			     var p = $("ad_pic_"+pos+'_'+k).parentNode;
			     p.firstChild.style.display = "inline";
			     p.style.left = 0;
			     p.lastChild.style.display = "";
			     
		     }
		     else{DD_ADSMART.cptSlideGo(pos,$("ad_pic_"+pos+'_'+(k+1)),style);}
             }
         }
     }
     ,cptSlideGo:function(pos,e,style){
         if(style=="search" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 var item=$("ad_title_"+pos+"_"+k);
                 if("ad_title_"+pos+'_'+k != e.id){
                     item_pic.style.display="none";
                     if(item.className=="active"){
                         item.className="";
                     }else if(item.className=="first first_active"){ 
                         item.className="first";
                     }else if(item.className=="last last_active"){
                         item.className="last";
                     }
                 }else{
                     item_pic.style.display="";
                 }
             }
             if(typeof e.className=='undefined' || e.className==""){
                 e.className="active"
             }else if(e.className=="first"){
                 e.className="first first_active";
             }else if(e.className=="last"){
                 e.className="last last_active";
             }
         }else if(style=="dp" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if (item_pic.style.display == "") {
                     item_pic.style.display = "none";
                     k = (k == DD_ADSMART.cptSlide[pos].length - 1) ? 0 : (k+1);
                     $("ad_pic_"+pos+"_"+k).style.display = "";
                     break;
                 }
             }
         }else if(style=="ndp" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if (item_pic.style.display == "") {
                     item_pic.style.display = "none";
                     k = (k == DD_ADSMART.cptSlide[pos].length - 1) ? 0 : (k+1);
                     $("ad_pic_"+pos+"_"+k).style.display = "";
                     break;
                 }
             }
         }else if(style=="newsearch" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 var item=$("ad_title_"+pos+"_"+k);
                 if("ad_title_"+pos+'_'+k != e.id){
                     item_pic.style.display="none";
                     if(item.className=="active"){
                         item.className="";
                     }
                 }else{
                     item_pic.style.display="";
                 }
             }
             if(typeof e.className=='undefined' || e.className==""){e.className="active"}
         }else if(style=="newstyle" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 var item=$("ad_title_"+pos+"_"+k);
                 if("ad_title_"+pos+'_'+k != e.id){
                     item_pic.style.display="none";
                     if(item.className=="active"){ 
                         item.className="";
		     }else if(item.className=="first first_active"){ 
                         item.className="first";
                     }else if(item.className=="last last_active"){
                         item.className="last";
                     }

                 }else{
                     item_pic.style.display="";
                 }
             }
             if(typeof e.className=='undefined' || e.className==""){
                 e.className="active"
             }
	     else if(e.className=="first"){
                 e.className="active";
             }else if(e.className=="last"){
                 e.className="active";
             }
	 }else if(style=="newliststyle" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 var item=$("ad_title_"+pos+"_"+k);
                 if("ad_title_"+pos+'_'+k != e.id){
                     item_pic.style.display="none";
                     if(item.className=="active"){
                         item.className="";
                     }else if(item.className=="first first_active"){ 
                         item.className="first";
                     }else if(item.className=="last last_active"){
                         item.className="last";
                     }
                 }else{
                     item_pic.style.display="";
                 }
             }
             if(typeof e.className=='undefined' || e.className==""){
                 e.className="active"
             }else if(e.className=="first"){
                 e.className="active";
             }else if(e.className=="last"){
                 e.className="active";
             }
	 }else if(style=="home" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item=$("ad_title_"+pos+"_"+k);
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_title_"+pos+"_"+k != e.id){
                     item_pic.style.display='none';
                     if(item.className=='now'){
                         item.className='';
                     }else if(item.className=='other now'){
                         item.className='other';
                     }
                 }else{
                     item_pic.style.display='';
                 }
             }
             if(typeof e.className=='undefined' || e.className==''){e.className='now'}else if(e.className=='other'){e.className='other now';}
         }else if(style=="multysearch" && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 var item=$("ad_title_"+pos+"_"+k);
                 if("ad_title_"+pos+'_'+k != e.id){
                     item_pic.style.display="none";
                     if(item.className=="active"){
                         item.className="";
                     }
                 }else{
                     item_pic.style.display="";
                 }
             }
             if(typeof e.className=='undefined' || e.className==""){e.className="active"}
         }else if((style=="newmultysearch") && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 var item=$("ad_title_"+pos+"_"+k);
                 if("ad_title_"+pos+'_'+k != e.id){
                     item_pic.style.display="none";
                     if(item.className=="active"){
                         item.className="";
                     }
                 }else{
                     item_pic.style.display="";
                 }
             }
             if(typeof e.className=='undefined' || e.className==""){e.className="active"}
         }else if((style=="home_alter") && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item=$("ad_title_"+pos+"_"+k);
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_title_"+pos+"_"+k != e.id){
                     item_pic.style.display='none';
                     item.className='';
                 }else{
                     item_pic.style.display='';
                     item.className='active';
                 }
             }
             //if(typeof e.className=='undefined' || e.className==''){e.className='now'}else if(e.className=='other'){e.className='other now';}
         }else if((style=="group_buying") && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item=$("ad_title_"+pos+"_"+k);
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_title_"+pos+"_"+k != e.id){
                     item_pic.style.display='none';
                     item.className='';
                 }else{
                     item_pic.style.display='';
                     item.className='active';
                 }
             }
         }else if((style=="s_slide") && DD_ADSMART.cptSlide[pos].length>1){ 
            for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item=$("ad_title_"+pos+"_"+k);
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_title_"+pos+"_"+k != e.id){
                     item_pic.style.display='none';
                     item.className='';
                 }else{
                     item_pic.style.display='block';
                     item.className='on';
                 }
            }
         }else if((style=="slide_banner") && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item=$("ad_title_"+pos+"_"+k);
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_title_"+pos+"_"+k != e.id){
                     item_pic.style.display='none';
                     item.className='';
                 }else{
                     item_pic.style.display='';
                     item.className='on';
                 }
             }
             
         }else if((style=="newhome" || style=="newhome_inner") && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item=$("ad_title_"+pos+"_"+k);
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_title_"+pos+"_"+k != e.id){
                     item_pic.style.display='none';
                     if(item.className=='now'){
                         item.className='';
                     }else if(item.className=='other now'){
                         item.className='other';
                     }
                 }else{
                     item_pic.style.display='';
                 }
             }
             if(typeof e.className=='undefined' || e.className==''){e.className='now'}else if(e.className=='other'){e.className='other now';}
         }else if((style=="cat_slider") && DD_ADSMART.cptSlide[pos].length>1){
             for(var k=0;k<DD_ADSMART.cptSlide[pos].length;k++){
                 var item_pic=$("ad_pic_"+pos+"_"+k);
                 if("ad_pic_"+pos+"_"+k != e.id){
                     item_pic.style.display='';
                 }else{
                     item_pic.style.display='inline';
		     jQuery("#show_img").stop(true,false).animate({left: -760*k}, 1000);
                 }
             }
         }
     }
     ,cptSlideGoTo:function(pos,e,style){
         return function(){return DD_ADSMART.cptSlideGo(pos,e,style);}
     }
     ,createCPTpromt:function(){
         var h2=$C("H2"),span=$C('SPAN');
         span.innerHTML="广告";$A(h2,span);
         return h2
     }
     ,createCPTHomeSlideTitle:function(pos,style) {
         if(DD_ADSMART.cptSlide[pos].length>0){
         if (style == 'home_alter') {
             if(DD_ADSMART.cptSlide[pos].length==1){return;}
             else{
                     var ul = $C("UL");
                     switch(DD_ADSMART.cptSlide[pos].length)
                     {    
                             case 2:ul.className="leveltab_title";break;
                             case 3:ul.className="leveltab_title leveltab_title_three";break;
                             case 4:
                             default:break;
                     }    
             }
		     for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                 var titlewrap=$C("LI");
                 var src=DD_ADSMART.cptSlide[pos][i].ad_content[0].ad_img;
                 if (DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info != undefined) {
                     var titleA=$C("A");
                     titleA.href="javascript:void(0)";
                     titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                     titleA.id="ad_title_"+pos+'_'+i;
                     if(i==0){titleA.className="active";}else{titleA.className=""}
                     if(DD_ADSMART.cptSlide[pos].length>1){bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'home_alter'))}
                     $A(titlewrap,titleA);
                 }
                 $A(ul,titlewrap);
		     }   
             return ul;
         }else if (style == 'group_buying') {
             if(DD_ADSMART.cptSlide[pos].length==1){
                 return;
             }else{
                 var div = $C("div");
                 div.className="ad_topbanner_num";
             }
             for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                 var title_a=$C("a");
                 if (DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info != undefined) {
                     //var titleA=$C("A");
                     title_a.href="javascript:void(0)";
                     title_a.innerHTML=i+1;
                     title_a.id="ad_title_"+pos+'_'+i;
                     if(i==0){title_a.className="active";}else{title_a.className=""}
                     if(DD_ADSMART.cptSlide[pos].length>1){bind(title_a, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,title_a,'group_buying'))}
                     $A(div,title_a);
                 }
             }
             return div;
         }else if(style == 's_slide'){
             var st_num = DD_ADSMART.cptSlide[pos].length;
             var ul = $C('ul');
             ul.className = 'tab_'+st_num.toString();
             for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                var li = $C('li');
                li.innerHTML = DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info; 
                li.id = "ad_title_"+pos+'_'+i;
                if(i==0){li.className="on";}else{li.className="";}
                if(DD_ADSMART.cptSlide[pos].length>1){bind(li, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,li,'s_slide'))}
                $A(ul,li);
             }
             return ul;
         }else if(style == 'slide_banner'){
             if(DD_ADSMART.cptSlide[pos].length==1){
                 return;
             }else{
                 var ul = $C("ul");
                 ul.className="tab";
             }
             for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                 var title_li=$C("li");
                 if (DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info != undefined) {
                     title_li.innerHTML = DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                     title_li.id="ad_title_"+pos+'_'+i;
                     if(i==0){title_li.className="on";}else{title_li.className=""}
                     if(DD_ADSMART.cptSlide[pos].length>1){bind(title_li, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,title_li,'slide_banner'))}
                     $A(ul,title_li);
                 }
             }
             return ul;
         
         }else if(style=='home'){
		     var h2=$C("H2");
		     switch(DD_ADSMART.cptSlide[pos].length){
			 case 1:h2.className="column1";break;
			 case 2:h2.className="column2";break;
			 case 3:h2.className="column3";break;
			 case 4:default:break;
		     }   
		     for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
			 var titleA=$C("A");
			 var src=DD_ADSMART.cptSlide[pos][i].ad_content[0].ad_img;
			 titleA.href="javascript:void(0)";
			 titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
			 titleA.id="ad_title_"+pos+'_'+i;
			 if(DD_ADSMART.cptSlide[pos].length==1){titleA.className="other now";}else{
			     if(i==0){titleA.className="now";}else if(i==DD_ADSMART.cptSlide[pos].length-1){titleA.className="other";}
			 }   
			 if(DD_ADSMART.cptSlide[pos].length>1){bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'home'))}
			 $A(h2,titleA);
		     }   
		     return h2; 
	     }
	     else
             {
        	     if(DD_ADSMART.cptSlide[pos].length==1)
        			return ;
        	     else{
			     var div=$C("div");
			     switch(DD_ADSMART.cptSlide[pos].length)
			     {
				 case 2:div.className="homepage_outbanner_tab homepage_outbanner_tab2";break;
				 case 3:div.className="homepage_outbanner_tab homepage_outbanner_tab3";break;
				 case 4:
				 default:break;
			     }
        	     }
	             for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
	                 var titleA=$C("A");
	                 titleA.href="javascript:void(0)";
	                 titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
	                 titleA.id="ad_title_"+pos+'_'+i;
	                 if(i==0){titleA.className="now";}
	                 else{titleA.className="";}
	                 if(DD_ADSMART.cptSlide[pos].length>1){bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,style))}
	                 $A(div,titleA);
	             }
	             return div;
             }

         }
     }
     ,createCPTSearchSlideTitle:function(pos,style){
         if(DD_ADSMART.cptSlide[pos].length>0){
             if(style=="search"){
                var ul=$C("ul");
                switch(DD_ADSMART.cptSlide[pos].length){
                    case 1:ul.className="column1";break;
                    case 2:ul.className="column2";break;
                    case 3:ul.className="column3";break;
                    case 4:default:ul.className="column4";break;
                }
                for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                    var titleA=$C("a");
                    var titleLi=$C("li");
                    var src=DD_ADSMART.cptSlide[pos][i].ad_content[0].ad_img;
                    titleA.href="javascript:void(0)";
                    titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                    titleLi.id="ad_title_"+pos+'_'+i;
                    if(DD_ADSMART.cptSlide[pos].length==1){
                        titleLi.className="first";
                    }else{
                        if(i==0){
                            titleLi.className="first first_active";
                        }else if(i==DD_ADSMART.cptSlide[pos].length-1){
                            titleLi.className="last";
                        }
                    }
                    if(DD_ADSMART.cptSlide[pos].length>1){
                        bind(titleLi, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleLi,'search'));
                    }
                    $A(titleLi,titleA);$A(ul,titleLi);
                }
                return ul;
             }else if(style=="newsearch"){
                 var div=$C("div");
                 switch(DD_ADSMART.cptSlide[pos].length){
                     case 1:div.className="tab_panel clearfix panel1";break;
                     case 2:div.className="tab_panel clearfix panel2";break;
                     case 3:div.className="tab_panel clearfix panel3";break;
                     case 4:default:div.className="tab_panel clearfix panel4";break;
                 }
                 for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                     var titleA=$C("a");
                     var titleH2=$C("h2");
                     var src=DD_ADSMART.cptSlide[pos][i].ad_content[0].ad_img;
                     titleA.href="javascript:void(0)";
                     titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                     titleA.id="ad_title_"+pos+'_'+i;
                     if(DD_ADSMART.cptSlide[pos].length==1){titleH2.className="first";titleA.className="active"}else{
                         if(i==0){
			     titleH2.className="first";
			     titleA.className="active"
			 }else if(i==DD_ADSMART.cptSlide[pos].length-1){
			     titleH2.className="last"
			 }
                     }
                     if(DD_ADSMART.cptSlide[pos].length>1){bind(titleH2, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'search'))}
                     $A(titleH2,titleA);$A(div,titleH2);
                 }
                 return div;
             }else if(style == 'newstyle'){
                var ul=$C("ul");
                switch(DD_ADSMART.cptSlide[pos].length){
                    case 1:ul.className="schleft_tabad_title clearfix";break;
                    case 2:ul.className="schleft_tabad_title schleft_tabad2 clearfix";break;
                    case 3:ul.className="schleft_tabad_title schleft_tabad3 clearfix";break;
                    case 4:default:ul.className="schleft_tabad_title schleft_tabad4 clearfix";break;
                }
                for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                    var titleA=$C("a");
                    var titleLi=$C("li");
		    if(i == 0){
		        if(DD_ADSMART.cptSlide[pos].length == 2 || DD_ADSMART.cptSlide[pos].length == 4){
			    titleLi.className="tabad_first";
			}
		    }
                    var src=DD_ADSMART.cptSlide[pos][i].ad_content[0].ad_img;
                    titleA.href="###";
                    titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                    titleA.id="ad_title_"+pos+'_'+i;
                    if(DD_ADSMART.cptSlide[pos].length==1){
                        titleA.className="first";
                    }else{
                        if(i==0){
                            titleA.className="active";
                        }else if(i==DD_ADSMART.cptSlide[pos].length-1){
                            titleA.className="last";
                        }
                    }
                    if(DD_ADSMART.cptSlide[pos].length>1){
                        bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'newstyle'));
                    }
                    $A(titleLi,titleA);
		    $A(ul,titleLi);
                }

                return ul; 
	     }else if(style=="newliststyle"){
                var ul=$C("ul");
                switch(DD_ADSMART.cptSlide[pos].length){
                    case 1:ul.className="schleft_tabad_title clearfix";break;
                    case 2:ul.className="schleft_tabad_title schleft_tabad2 clearfix";break;
                    case 3:ul.className="schleft_tabad_title schleft_tabad3 clearfix";break;
                    case 4:default:ul.className="schleft_tabad_title schleft_tabad4 clearfix";break;
                }
                for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                    var titleA=$C("a");
                    var titleLi=$C("li");
		    if(i == 0){
		        if(DD_ADSMART.cptSlide[pos].length == 2 || DD_ADSMART.cptSlide[pos].length == 4){
			    titleLi.className="tabad_first";
			}
		    }
                    var src=DD_ADSMART.cptSlide[pos][i].ad_content[0].ad_img;
                    titleA.href="###";
                    titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                    titleA.id="ad_title_"+pos+'_'+i;
                    if(DD_ADSMART.cptSlide[pos].length==1){
                        titleA.className="first";
                    }else{
                        if(i==0){
                            titleA.className="active";
                        }else if(i==DD_ADSMART.cptSlide[pos].length-1){
                            titleA.className="last";
                        }
                    }
                    if(DD_ADSMART.cptSlide[pos].length>1){
                        bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'newliststyle'));
                    }
                    $A(titleLi,titleA);
		    $A(ul,titleLi);
                }

                return ul; 
	     }else if(style=="newmultysearch"){
                 var p=$C("ul");
		 p.className="leveltab_title";
		 if(DD_ADSMART.cptSlide[pos].length==1)return p;
                 for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                     var span=$C("li");
                     var titleA=$C("a");
                     titleA.href="javascript:void(0)";
                     titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                     titleA.id="ad_title_"+pos+'_'+i;
                     if(DD_ADSMART.cptSlide[pos].length==1)
                     {
                    	 titleA.className="active";
                     }
                     else
                     {
                         if(i==0)
                         {
				titleA.className="active";
			 }
                         else 
                         {
                        	 titleA.className="";
                         }
                     }
                     if(DD_ADSMART.cptSlide[pos].length>1){bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'multysearch'))}
                     $A(span,titleA);
                     $A(p,span);
                 }
                 return p;
	     }else if(style=="multysearch"){
                 var p=$C("p");
		 if(DD_ADSMART.cptSlide[pos].length==1)return p;
                 var span=$C("span");
                 for(var i=0;i<DD_ADSMART.cptSlide[pos].length; i++){
                     var titleA=$C("a");
                     titleA.href="javascript:void(0)";
                     titleA.innerHTML=DD_ADSMART.cptSlide[pos][i].ad_content[0].tag_info;
                     titleA.id="ad_title_"+pos+'_'+i;
                     if(DD_ADSMART.cptSlide[pos].length==1)
                     {
                    	 titleA.className="active";
                     }
                     else
                     {
                         if(i==0)
                         {
				titleA.className="active";
			 }
                         else 
                         {
                        	 titleA.className="";
                         }
                     }
                     if(DD_ADSMART.cptSlide[pos].length>1){bind(titleA, 'mouseover', DD_ADSMART.cptSlideGoTo(pos,titleA,'multysearch'))}
                     $A(span,titleA);
                 }
                 $A(p,span);
                 return p;
             }
         }
     }
     ,createCPTSlideContent:function(pos,k,className,style,inner,wide){
         if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_label==1){
             inner = 0;
         }else{
             inner = 1;
         }
         if(style=="home" || style=="search"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var div=$C("div"),i=$C("i"),a=$C("a"),img=$C("img");
                 var src= (wide==1) ? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 div.style.display=className;
                 div.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 //i.innerHTML="广告";
                 i.className="icon_ad";
                 a.target="_blank";
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 a.rel = 'nofollow';
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     $A(a,i);
                 }
                 $A(div,a);
                 return div;
             }
        }else if(style=="dp"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var div=$C("div"),i=$C("i"),a=$C("a"),img=$C("img");
                 var src=(wide == 1) ? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 div.style.display=className; 
                 div.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 i.className="icon_ad";
                 //i.innerHTML="Hello world";
                 a.target="_blank";
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 a.rel = 'nofollow';
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner) {
                     $A(a,i);
                 }
                 $A(div,a);
                 return div;
             }
        }else if(style=="ndp"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var div=$C("div"),a=$C("a"),img=$C("img");
                 var src=(wide ==1) ? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.target="_blank";
                 a.style.display=className; 
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 a.rel = 'nofollow';
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     $i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 $A(div,a);
                 return a;
             }

        }else if(style=="newsearch"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var p=$C("p"),a=$C("a"),img=$C("img");
                 var src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 p.style.display=className;
                 p.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 $A(p,a);
                 return p;
             }
         }else if(style=="newstyle"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var div=$C("div"),i=$C("i"),a=$C("a"),img=$C("img");
                 var src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 div.style.display=className;
                 div.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 //i.innerHTML="广告";
                 i.className="icon_ad";
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     $A(a,i);
                 }
                 $A(div,a);
                 return a;
             }
         }else if(style=="newliststyle"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var div=$C("div"),i=$C("i"),a=$C("a"),img=$C("img");
                 var src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 div.style.display=className;
                 div.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 $A(div,a);
                 return a;
             }
	 }else if(style=="multysearch"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var a=$C("a"),
                 img=$C("img"),
                 src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.style.display=className;
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 return a;
             }
         }else if(style=="newmultysearch"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 var a=$C("a"),
                 img=$C("img"),
                 src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.style.display=className;
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 return a;
             }
         }else if(style=="home_alter"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 a=$C("a"),
                 img=$C("img"),
                 src=(wide == 1) ? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.style.display=className;
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 return a;
             }
         }else if(style == "group_buying"){
              if(DD_ADSMART.cptSlide[pos].length>0){
                 a=$C("a"),
                 img=$C("img"),
                 src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.style.display=className;
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 return a;
             }                     
         }else if(style == "s_slide"){
              if(DD_ADSMART.cptSlide[pos].length>0){
		  wn = window.screen.width > 1024;
		  div = $C("div");
		  a = $C("a");
                  div.style.display=className;
                  img = $C("img");
                  src = wn&&(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big!="")? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
	          div.className = wn ?"wide_ad":"narrow_ad";
		  div.setAttribute('id',"ad_pic_"+pos+'_'+k);
                  a.target="_blank";
                  a.rel = 'nofollow';
                  a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
		  img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
		  $A(a,img);
		  $A(div,a);
		  return div;
	      }

         }else if(style == "slide_banner"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 a=$C("a"),
                 img=$C("img"),
                 src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.style.display=className;
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 return a;
             } 
         }else if(style=="newhome" || style=="newhome_inner" || style=="cat_slider"){
             if(DD_ADSMART.cptSlide[pos].length>0){
                 a=$C("a"),
                 img=$C("img"),
                 src=(wide == 1)? DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img_big : DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_img;
                 a.style.display=className;
                 a.setAttribute('id',"ad_pic_"+pos+'_'+k);
                 a.target="_blank";
                 a.rel = 'nofollow';
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url:host+DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_url;
                 a.rel = 'nofollow';
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 if(DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des.length>0){
                     img.alt=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                     a.title=DD_ADSMART.cptSlide[pos][k].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(!inner){
                     var i=$C("i");
                     i.className="icon_ad";
                     $A(a,i);
                 }
                 return a;
             }
         }
     }
     ,createCPT:function(pos,type,style,inner,name,wide) {
         if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_label==1){
             inner = 0;
         }else{
             inner = 1;
         }
         if(DD_ADSMART.cpt_ad[pos].cpt_type==0 || DD_ADSMART.cpt_ad[pos].cpt_type==2){
             if(style==1){
                 var a=$C('A'),img=$C('IMG');
                 var src= (wide==1)? DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img_big : DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                 img.src = (/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url:host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                 a.target='_blank';
                 a.rel = 'nofollow';
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des.length>0){
                     img.alt = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                     a.title = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 var p=$C('p');
                 if(!inner){
                     var i=$C('i');
                     i.className="icon_ad";
                     $A(p,i);
                 }
                 $A(p,a);
                 var div=$C('DIV');div.className=name;
                 $A(div,p);
                 if(name=="bottom_ad" ||name=="skyscraper_ad"){
                     var span1=$C('span');span1.className="corner left_top imageElement";
                     var span2=$C('span');span2.className="corner right_top imageElement";
                     var span3=$C('span');span3.className="corner left_bottom imageElement";
                     var span4=$C('span');span4.className="corner right_bottom imageElement";
                     $A(div,span1);$A(div,span2);$A(div,span3);$A(div,span4);
                 }
                 return div
             }
             else if (style=='huge') {
                 var outer=$C('DIV'),a=$C('A'),img=$C('IMG'),close=$C('A'),iclose=$C('IMG');
                 var src= (wide==1) ? DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img_big : DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                 img.src=(/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url:host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                 a.target='_blank';
                 a.rel = 'nofollow';
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des.length>0){
                     img.alt = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                     a.title = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                 }
                 if(!inner){
                    i=$C('i');
                    i.className="icon_ad";
                    $A(outer,i);
                 }

                 iclose.src='images/btn_close.gif';
                 close.className='close';
                 close.href='javascript:ObjClose();';
                 $A(a,img);
                 $A(outer,a);
                 $A(close,iclose);
                 $A(outer,close);
                 return outer
             }
             else if (style=='with_close') {
                 var outer=$C('DIV');div=$C('DIV'),a=$C('A'),close=$C('A'),img=$C('IMG');
                 var src= (wide==1) ? DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img_big : DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                 img.src = (/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url:host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                 a.target='_blank';
                 a.rel = 'nofollow';
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des.length>0){
                     img.alt = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                     a.title = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 $A(div,a);
                 $A(outer,div);
                 if(!inner){
                     var i = $C('i');
                     i.className="icon_ad";
                     $A(outer,i);
                 }
                 close.className='ad_closeicon';
	         	 close.href="javascript:void(0)";
                 $A(outer,close);
                 close.onclick=function(e){
                     outer.className="dd_ad_dl_hide";
                 };
                 return outer
             }else if(style == 'listleftad'){ 
                 var a=$C('A'),img=$C('IMG');
                 var src= (wide==1) ? DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img_big : DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                 img.src = (/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url:host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                 a.target='_blank';
                 a.rel = 'nofollow';
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des.length>0){
                     img.alt = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                     a.title = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(style==2){
                     if($('bottom_ad_banner')!=undefined)
                     $('bottom_ad_banner').style.display="";
                     return a;
                 }  
                 var div=$C('DIV');
                 var d=$C('DIV');
                 d.className="list_left_ad";
                 //if(type==0||type ==""){
                 if(!inner){
                    var i = $C('i');
                    i.className="icon_ad";
                    $A(div,i);
                 }
                 $A(div,a);
                 $A(d,div);
                 return d;
             }else { 
                 var a=$C('A'),img=$C('IMG');
                 var src = (wide==1) ? DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img_big : DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                 img.src = (/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
                 a.href=(/^\d_/.test(src))?DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url:host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                 a.target='_blank';
                 a.rel = 'nofollow';
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des.length>0){
                     img.alt = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                     a.title = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                 }
                 $A(a,img);
                 if(style==2){
                     if($('bottom_ad_banner')!=undefined)
                         $('bottom_ad_banner').style.display="";
                     return a;
                 }  
                 var div=$C('DIV');
                 //if(type==0||type ==""){
                if(!inner){
                    var i = $C('i');
                    a.className="icon_ad_pos";
                    i.className="icon_ad";
                    $A(a,i);
                }
                $A(div,a);
                return div
            }
         }else if(DD_ADSMART.cpt_ad[pos].cpt_type==1){
         	if(DD_ADSMART.cpt_ad[pos].type = 'mobile_ad_tag'){
         		var a=$C('A');
                a.target='_blank';
                a.className = 'phone_icon';             
         		a.href = host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                a.rel = 'nofollow';
                var span = '';
                if(style == 'new_mobile'){
                    span = "<span class=\'icon icon_phone\'></span>";
                }
                a.innerHTML = span + DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
         		return a;
         	}else{
         		var ul=$C('UL');
	             for(var i=0;i<DD_ADSMART.cpt_ad[pos].ad_content.length;i++){
	                 var li=$C('LI'),a=$C('A');
	                 a.target='_blank';
	                 a.href=host+DD_ADSMART.cpt_ad[pos].ad_content[i].ad_url;
                     a.rel = 'nofollow';
	                 a.innerHTML=DD_ADSMART.cpt_ad[pos].ad_content[i].ad_des;
	                 $A(li,a);$A(ul,li)
	             }
	             var div=$C('DIV');
	             div.className='list';
	             $A(div,ul);
	             var divmain=$C('DIV');
	             $A(divmain,DD_ADSMART.createCPTpromt());$A(divmain,div);
	             return divmain
         	}            
         }else if(DD_ADSMART.cpt_ad[pos].cpt_type==3){ 
             var ul=$C('UL');
             for(var i=0;i<DD_ADSMART.cpt_ad[pos].ad_content.length;i++){
                 var li=$C('LI');
                 var p_pic=$C('P');
                 p_pic.className='pic';
                 var a_pic=$C('A');
                 a_pic.target='_blank';
                 a_pic.href=host+DD_ADSMART.cpt_ad[pos].ad_content[i].ad_url;
                 a_pic.title=DD_ADSMART.cpt_ad[pos].ad_content[i].ad_des;
                 a_pic.rel = 'nofollow';
                 var img=$C('IMG');
                 img.src=DD_ADSMART.cpt_ad[pos].ad_content[i].ad_img;//图文广告不不用做处理，直接取用的就是URL
                 img.alt=DD_ADSMART.cpt_ad[pos].ad_content[i].ad_des;
                 img.border="0";
                 $A(a_pic,img);
                 $A(p_pic,a_pic);
                 var span_pic=$C('SPAN');
                 span_pic.className="label";
                 $(p_pic,span_pic);
                 var p_name=$C('P');
                 p_name.className="name";
                 var a_name=$C('A');
                 a_name.href=host+DD_ADSMART.cpt_ad[pos].ad_content[i].ad_url;
                 a_name.target='_blank';
                 a_name.title=DD_ADSMART.cpt_ad[pos].ad_content[i].ad_des;
                 a_name.rel = 'nofollow';
                 a_name.innerHTML=DD_ADSMART.cpt_ad[pos].ad_content[i].ad_des;
                 $A(p_name,a_name);
                 var p_price=$C('P');
                 p_price.className="price";
                 var span_price_m=$C('SPAN');
                 span_price_m.className="price_m";
                 span_price_m.innerHTML="&yen;"+DD_ADSMART.cpt_ad[pos].ad_content[i].ad_market_price;
                 var span_price_d=$C('SPAN');
                 span_price_d.className="price_d";
                 span_price_d.innerHTML="&yen;"+DD_ADSMART.cpt_ad[pos].ad_content[i].ad_price;
                 $A(p_price,span_price_m);
                 $A(p_price,span_price_d);
                 $A(li,p_pic);
                 $A(li,p_name);
                 $A(li,p_price);
                 $A(ul,li);
             }
             return ul.innerHTML;
         }else if(DD_ADSMART.cpt_ad[pos].cpt_type==4){//前台管样式
            var a=$C('A'),img=$C('IMG');
            var src = (wide==1)? DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img_big : DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
            img.src = (/^\d_/.test(src))?host+'static/images/'+src:this.getFullImageURL(src);
            a.href=(/^\d_/.test(src))?DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url:host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
            a.target='_blank';
            a.rel = 'nofollow';
            if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des.length>0){
            	img.alt = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
            	a.title = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
            }
            
            $A(a,img);
            return a;
         }else if (DD_ADSMART.cpt_ad[pos].cpt_type==5) {
             if ((DD_ADSMART.cpt_ad[pos].ad_content == undefined) || (DD_ADSMART.cpt_ad[pos].ad_content == undefined)) {
                 return div;
             }

             if (style=="popup") {
                 //the popup ads
                 var div=$C('DIV'),popup=$C('DIV'),over=$C('DIV'),close=$C('SPAN'),a=$C('A'),ob=$C('DIV');

                 ob_uri = DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;

                 var dd_ad_pop_url=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;

                 //build the popup ad
                 a.href=host + dd_ad_pop_url;
                 a.target="_blank";  
                 a.rel = 'nofollow';
                 a.innerHTML='<img class="dd_ad_pop_over_trans" src="http://a.dangdang.com/static/images/transparent.gif" />';

                 close.className=(inner=="left")?"dd_ad_pop_close_icon_left":"dd_ad_pop_close_icon";
                 close.id="message_close";
                 ob.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(ob_uri),340,256);
		 
                 i=$C("i");
                 i.innerHTML="广告";
                 i.className=(inner=="left")?"dd_ad_pop_i_left":"dd_ad_i";
                 over.className="dd_ad_pop_over";
                 ob.className="dd_ad_pop_ob";
                 popup.className="dd_ad_pop";
                 div.className="ddhome_tcad";
                 $A(over, close);
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_label==1){
                     $A(over, i);
                 }
                 $A(over, a);
                 $A(popup, over);
                 $A(popup, ob);

                 //close.onclick=function(e){
                 //    console.log("clicked popup");
                 //    div.className="dd_ad_pop_hide";
                 //    DD_ADSMART.stopPropagation(e);
                 //}
                 $A(div,popup);
                 return div
             }
             else if (style == "flip") {
                 //the flip ads
                 var div=$C('DIV'),div_big=$C('DIV'),div_small=$C('DIV'),b_ob=$C('DIV'),s_ob=$C('DIV');
                 div_small.className="dd_ad_flip_hide";

                 if (DD_ADSMART.cpt_ad[pos].ad_content[0].style == 0) {
                     var object_big=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                     var object_small=DD_ADSMART.cpt_ad[pos].ad_content[1].ad_img;
                 } else {
                     var object_small=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                     var object_big=DD_ADSMART.cpt_ad[pos].ad_content[1].ad_img;
                 }

                 //build the two flash
                 b_ob.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_big),300,250,"dd1");
                 b_ob.className="dd_ad_flip_ob_big";
                 $A(div_big, b_ob);
                 s_ob.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_small),150,150,"dd2");
                 s_ob.className="dd_ad_flip_ob_small";
                 $A(div_small, s_ob);

                 $A(div,div_big);
                 $A(div,div_small);
                 //now bind events
                 //the init state of couple ads
                 return div
             }
             else if(style == "fush"){//拉幕

                 var div=$C('DIV'),big_f=$C('DIV'),big_s=$C('DIV'),big_ob=$C('DIV'),small_ob=$C('DIV'),backtop=$C('DIV'),close_mini=$C('DIV'),close_b=$C('A'),close_w=$C('SPAN'),closed_w=$C('A'),closed_play=$C('A'),closed_closed=$C('A'),big_a=$C('A');
                 if (DD_ADSMART.cpt_ad[pos].ad_content[0].style == 0) {
                     var object_big=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                     var object_small=DD_ADSMART.cpt_ad[pos].ad_content[1].ad_img;
                 } else {
                     var object_small=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                     var object_big=DD_ADSMART.cpt_ad[pos].ad_content[1].ad_img;
                 
                 }
                 backtop.className="backtop";
                 close_mini.className="window_suspend";
                 closed_closed.className="close";
                 closed_w.target="_blank";
                 closed_w.href=host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                 closed_w.rel='nofollow';
                 closed_w.innerHTML=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_des;
                 closed_play.className="play";
                 $A(close_mini,closed_closed);
                 $A(close_mini,closed_w);
                 $A(close_mini,closed_play);
                 $A(backtop,close_mini);
                 $A(div,backtop);
                 $A(document.getElementById("returntop"),backtop);
                 backtop.style.display = "none";

                 if ( DD_ADSMART.detectScreen() > 1024) {
                     big_ob.className="pop_up_ad";
                     big_a.target="_blank";
                     big_a.href=host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                     big_a.rel = 'nofollow';
                     big_a.innerHTML='<img  src="http://a.dangdang.com/static/images/transparent.gif" border="0" width="1200px" height="520px" style="z-index:20;position:absolute;" />';
                     close_b.className="close";
                     close_b.innerHTML="<span></span>关闭";
                     big_f.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_big),1200,520);
                     $A(big_s,big_a);
                     $A(big_ob,big_s);
                     $A(big_ob,big_f);
                     $A(big_ob,close_b);
                     $A(div,big_ob);
                     
                     var secon = 5;
                     function re_time(){
                            secon-=1;
                        if(secon<1) {
                         big_ob.style.display = "none";
                         $("ad_cpt_"+pos).style.height="0px";
                         backtop.style.display = "block";
                          window.clearInterval(terval);
                        }
                     }
                     var terval = window.setInterval(re_time, 1000);
                     function show(){
                         big_ob.style.display = "none";
                         window.clearInterval(terval);
                     }
                     close_b.onclick=function(e){
                         backtop.style.display = "block";
                         big_ob.style.display = "none";
                         $("ad_cpt_"+pos).style.height="0px";
                         window.clearInterval(terval);
                     }
                     closed_closed.onclick=function(e){
                         backtop.style.display = "none";
                         $("ad_cpt_"+pos).style.height="0px";
                         window.clearInterval(terval);
                     }
                     closed_play.onclick=function(e){
                         big_ob.className="pop_up_ad";
                         big_a.target="_blank";
                         big_a.href=host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                         big_a.rel = 'nofollow';
                         big_a.innerHTML='<img  src="http://a.dangdang.com/static/images/transparent.gif" border="0" width="1200px" height="520px" style="z-index:20;position:absolute;" />';
                         close_b.className="close";
                         close_b.innerHTML="<span></span>关闭";
                         big_f.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_big),1200,520);
                         $A(big_s,big_a);
                         $A(big_ob,big_s);
                         $A(big_ob,big_f);
                         $A(big_ob,close_b);
                         $A(div,big_ob);
                         backtop.style.display = "none";
                         big_ob.style.display="block";
                         secon = 5;
                         terval = window.setInterval(re_time, 1000);
                     }
                
                 }else{
                     small_ob.className="pop_up_ad";
                     big_a.target="_blank";
                     big_a.href=host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                     big_a.rel = 'nofollow';
                     big_a.innerHTML='<img src="http://a.dangdang.com/static/images/transparent.gif" border="0" width="1200px" height="520px" style="z-index:20;position:absolute;" />';
                     close_b.className="close";
                     close_b.innerHTML="<span></span>关闭";
                     big_f.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_small),960,520);
                     $A(big_s,big_a);
                     $A(small_ob,big_s);
                     $A(small_ob,big_f);
                     $A(small_ob,close_b);
                     $A(div,small_ob);
                     var second = 5;
                     function remain_time(){
                            second-=1;
                        if(second<1) {
                         small_ob.style.display = "none";
                         $("ad_cpt_"+pos).style.height="0px";
                         backtop.style.display = "block";
                        window.clearInterval(interval);
                        }
                     }
                     var interval = window.setInterval(remain_time, 1000);
                     function show(){
                         backtop.style.display = "block";
                         small_ob.style.display = "none";
                         $("ad_cpt_"+pos).style.height="0px";
                         window.clearInterval(interval);
                     }
                     close_b.onclick=function(e){
                         backtop.style.display = "block";
                         small_ob.style.display = "none";
                         $("ad_cpt_"+pos).style.height="0px";
                         window.clearInterval(interval);
                     }
                     closed_closed.onclick=function(e){
                         backtop.style.display = "none";
                         window.clearInterval(interval);
                     }
                     closed_play.onclick=function(e){
                         small_ob.className="pop_up_ad";
                         big_a.target="_blank";
                         big_a.href=host+DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;
                         big_a.rel = 'nofollow';
                         big_a.innerHTML='<img src="http://a.dangdang.com/static/images/transparent.gif" border="0" width="1200px" height="520px" style="z-index:20;position:absolute;" />';
                         close_b.className="close";
                         close_b.innerHTML="<span></span>关闭";
                         big_f.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_small),960,520);
                         $A(big_s,big_a);
                         $A(small_ob,big_s);
                         $A(small_ob,big_f);
                         $A(small_ob,close_b);
                         $A(div,small_ob);
                         small_ob.style.display = "block";
                         backtop.style.display = "none";
                         second = 5;
                         interval = window.setInterval(remain_time, 1000);
                     }
                 }
        
                 return div
             }
             else {
                 //the couple ads
                 var div=$C('DIV'),div_wide=$C('DIV'),div_narrow=$C('DIV'),w_over=$C('DIV'),n_over=$C('DIV'),w_close=$C('SPAN'),n_close=$C('SPAN'),w_a=$C('A'),n_a=$C('A'),w_ob=$C('DIV'),n_ob=$C('DIV'),w_i=$C("i"),n_i=$C("i");
                 div_narrow.className="dd_ad_dl_hide";

                 if (DD_ADSMART.cpt_ad[pos].ad_content[0].style == 0) {
                     var object_wide=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                     var object_narrow=DD_ADSMART.cpt_ad[pos].ad_content[1].ad_img;
                 } else {
                     var object_narrow=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_img;
                     var object_wide=DD_ADSMART.cpt_ad[pos].ad_content[1].ad_img;
                 }
                 var dd_ad_dl_url=DD_ADSMART.cpt_ad[pos].ad_content[0].ad_url;

                 //build the wide couple ad
                 w_a.href=host + dd_ad_dl_url;
                 w_a.rel = 'nofollow';
                 w_a.target="_blank";
                 w_a.innerHTML='<img class="dd_ad_dl_over_trans" src="http://a.dangdang.com/static/images/transparent.gif" border="0" width="110px"height="300px" />';

                 w_close.className=(inner=="left")?"dd_ad_dl_close_icon_left":"dd_ad_dl_close_icon";
                 w_ob.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_wide),110,300);
		 w_i.innerHTML="广告";
                 w_i.className=(inner=="left")?"dd_ad_dl_i_left":"dd_ad_dl_i";
                 w_over.className="dd_ad_dl_over";
                 w_ob.className="dd_ad_dl_ob";
                 $A(w_over, w_close);
                 if(DD_ADSMART.cpt_ad[pos].ad_content[0].ad_label==1){
                     $A(w_over, w_i);
                 }
                 $A(w_over, w_a);
                 $A(div_wide, w_over);
                 $A(div_wide, w_ob);

                 //build the narrow couple ad
                 n_a.href=host + dd_ad_dl_url;
                 n_a.target="_blank";
                 n_a.rel = 'nofollow';
                 n_a.innerHTML='<img class="dd_ad_dl_over_trans" src="http://a.dangdang.com/static/images/transparent.gif" border="0" width="20px"height="300px" />';

                 n_close.className=(inner=="left")?"dd_ad_dl_close_icon_left":"dd_ad_dl_close_icon";
                 n_ob.innerHTML=DD_ADSMART.generateFlash(this.getFullImageURL(object_narrow),20,300);

                 n_over.className="dd_ad_dl_over";
                 n_ob.className="dd_ad_dl_ob";
                 $A(n_over, n_close);
                 //$A(n_over, n_i);
                 $A(n_over, n_a);
                 $A(div_narrow, n_over);
                 $A(div_narrow, n_ob);


                 $A(div,div_wide);
                 $A(div,div_narrow);
                 //now bind events
                 //the init state of couple ads
                 if ( DD_ADSMART.detectScreen() > 1024) {
                     div_wide.className="dd_ad_dl_wide";
                     div_narrow.className="dd_ad_dl_hide";
                 } else {
                     div_wide.className="dd_ad_dl_hide";
                     div_narrow.className="dd_ad_dl_narrow";
                 }
                 //mouse over/out events of wide close icon
                 w_close.onmouseover=function(e){
                     w_close.className+="_hover";
                     DD_ADSMART.stopPropagation(e);
                 }
                 w_close.onmouseout=function(e){
                     var tmp=w_close.className.split("_");
                     tmp.pop();
                     tmp = tmp.join("_");
                     w_close.className=tmp;
                     DD_ADSMART.stopPropagation(e);
                 }
                 w_close.onclick=function(e){
                     //todo  do not affect the other ads
                     for (var i = 0; i < DD_ADSMART.cpt_dl_idset.length; i++) {
                         dl_tmp = document.getElementById("ad_cpt_"+DD_ADSMART.cpt_dl_idset[i]).firstChild;
                         dl_tmp.firstChild.className=dl_tmp.lastChild.className="dd_ad_dl_hide";
                     };
                     div_wide.className=div_narrow.className="dd_ad_dl_hide";
                     DD_ADSMART.stopPropagation(e);
                 }
                 //mouse over/out events of narrow close icon
                 n_close.onmouseover=function(e){
                     n_close.className+="_hover";
                     DD_ADSMART.stopPropagation(e);
                 }
                 n_close.onmouseout=function(e){
                     var tmp=n_close.className.split("_");
                     tmp.pop();
                     tmp = tmp.join("_");
                     n_close.className=tmp;
                     DD_ADSMART.stopPropagation(e);
                 }
                 n_close.onclick=function(e){
                     for (var i = 0; i < DD_ADSMART.cpt_dl_idset.length; i++) {
                         dl_tmp = document.getElementById("ad_cpt_"+DD_ADSMART.cpt_dl_idset[i]).firstChild;
                         dl_tmp.firstChild.className=dl_tmp.lastChild.className="dd_ad_dl_hide";
                     };
                     div_wide.className=div_narrow.className="dd_ad_dl_hide";
                     DD_ADSMART.stopPropagation(e);
                 }
                 //mouse over/out events of flash
                 div_wide.onmouseout=function(){
                     for (var i = 0; i < DD_ADSMART.cpt_dl_idset.length; i++) {
                         dl_tmp = document.getElementById("ad_cpt_"+DD_ADSMART.cpt_dl_idset[i]).firstChild;
                         dl_tmp.firstChild.className="dd_ad_dl_hide";
                         dl_tmp.lastChild.className="dd_ad_dl_narrow";
                     };
                 }
                 div_narrow.onmouseover=function(){
                     for (var i = 0; i < DD_ADSMART.cpt_dl_idset.length; i++) {
                         dl_tmp = document.getElementById("ad_cpt_"+DD_ADSMART.cpt_dl_idset[i]).firstChild;
                         dl_tmp.firstChild.className="dd_ad_dl_wide";
                         dl_tmp.lastChild.className="dd_ad_dl_hide";
                     };
                 }
                 DD_ADSMART.cpt_dl_idset.push(pos);
                 return div
             }
         }
     }
     ,generateFlash:function(uri,width,height,id) {
         var flash="";
         if (id == undefined) {id = "noname"}
         flash='<object width="'+width+'" height="'+height+'" align="middle" id="'+id+'" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" src="' + uri + '">\
               <param value="always" name="allowScriptAccess">\
               <param value="all" name="allowNetworking">\
               <param value="' + uri + '" name="movie">\
               <param value="high" name="quality">\
               <param value="transparent" name="wmode">\
               <param name="flashvars" value="_iCAST_domain=myhome2010.dangdang.com%2chead.dangdang.com">\
               <embed width="'+width+'" height="'+height+'" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" name="'+id+'" id="'+id+'" swliveconnect="true" wmode="transparent" quality="high" flashvars="_iCAST_domain=myhome2010.dangdang.com%2chead.dangdang.com" allownetworking="all" src="' + uri + '">\
               </object>';
         return flash;
     }
     ,detectScreen:function() {
         return document.body.clientWidth;
     }
     ,stopPropagation:function(e) {
         e = e || window.event;
         if(e.stopPropagation) {
             e.stopPropagation();
         } else {
             e.cancelBubble = true;
         }
     }
     ,createCPC:function(node, display_type) {
         var i=$C('DIV'),i1=$C('DIV'),i2=$C('DIV'),i3=$C('DIV'),a1=$C('A'),a2=$C('A'),img=$C('IMG'),jump=host+node.url;
         a1.target=a2.target='_blank';a1.href=a2.href=jump;
         a1.rel = 'nofollow';
         a2.rel = 'nofollow';
         i.className='item';i1.className='pic';i2.className='price';
         i3.className='name';
         if (parseInt(display_type)==1)
         {
             //the new display style
             img.setAttribute('src',productImg(node.pid, 'f',node.img));
             i3.className += ' detail';
             i2.innerHTML='<span class="price_d">&yen;<em>'+node.price+'</em></span>';
         }
         else if(parseInt(display_type)==2) {
        	 img.setAttribute('src',productImg(node.pid,'l',node.img));
             i2.innerHTML='&yen;<span class="num">'+node.price+'</span>'
         }
         else if(parseInt(display_type)==3) {
             var price = node.price;
             var price_len = price.length;
             if(parseInt(price_len)>6) {//价格>1000的处理小数位 
                var trim_price = price.split('.');
                var t_price1 = parseInt(trim_price[1]);
                if(t_price1 == 0){
                    price = trim_price[0];
                }else if(t_price1 > 9 && t_price1%10 == 0 ){
                    price = trim_price[0]+'.'+ t_price1/10;
                }
             }
             img.setAttribute('src',productImg(node.pid,'l',node.img));
             i2.innerHTML='&yen;<span class="num">'+price+'</span>'
         }
         else {
             img.setAttribute('src',productImg(node.pid,'l',node.img));
             i2.innerHTML='&yen;<span class="num">'+node.price+'</span>';
         }
         $A(a1,img);$A(i1,a1);
         a2.innerHTML=node.name;$A(i3,a2);$A(i,i1);
         if(parseInt(display_type)==3){
            $A(i,i3);$A(i,i2);
         }else{
            $A(i,i2);$A(i,i3);
         }
         return i;
     }
     ,createNewCPC:function(node){
         var li=$C('li'),a1=$C('a'),img=$C('img'),p=$C('p'),a2=$C('a'),span=$C('span'),jump=host+node.url;
         li.id = 'seq_' + node.pos_num;
         a1.target=a2.target='_blank';a1.href=a2.href=jump;
         img.src = productImg(node.pid, 'l',node.img);//img.width=img.height=150;
         a1.className = 'pic';
         p.className = 'data';
         span.className = 'd_price';
         $A(a1,img);
         a2.innerHTML = node.name;
         $A(p,a2);
         span.innerHTML = '&yen;'+node.price;
         $A(li,a1);$A(li,p);$A(li,span);
         return li;
     }
     ,insertCPC:function(node, display_type) {
         var item=$C('LI'),s=this.createCPC(node, display_type);
         item.id = 'seq_' + node.pos_num;
         $A(item,s);
         if ((parseInt(display_type) && (this.cpc.childNodes.length == 0)))
         {
             item.className = 'first';
         }
         else
         {
             item.onmouseover=function(){this.className='current'}
             item.onmouseout=function(){this.className=''}
         }
         this.cpc.appendChild(item);
     }
 }
 init();
})();

