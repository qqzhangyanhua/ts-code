/**
 * 创建应用
 *
 * @author lyb
 */
 var bankShow = "";
 var repeatPopUpFlag = "0";
 var isCheck = "0";//等于0 需要查询
 var flagIsDisable = "0";//等于置灰
 var billFlag_rmb='';//用来判断  点击确认按钮时候，  1为可以还款 2不用还
 var turn='true';//当变换tab页  只默认请求一次后台  在家还款设置的list
 var pageFlag = Fw.getParameters();//获取从账单查询那边传来的数据
 var initBankFlag = '0';//是否初始化过银行
 var messagePageFlag = 'rmb';
 var nowPage='rmbRepay';//标示在哪个页面
 var checkedCodeKey = ''; //是否校验短信验证码。还款不校验；首次签约校验。
 var dataPageOnce = '0';
 var othbankFlag = '0'; //标志是否是他行卡
 var userCardAuthStatusFlag = '0'; //标志是否授权
 var sureAuthStatusFlag = '0'; //标志是否同意授权
 var ispageP=true; //true是人民币 false是外币
 var bankTpl='{@each BankList as item,index}' +
             '<li class="ui-border-t yui-xyk">' +
                 '<div class="ui-list-thumb-s">' +
                     '<img src="${item.exera1}" class="yui-pic">' +
                 '</div>' +
                 '<div class="ui-list-info yui-list-pic">' +
                     '<label class="ui-nowrap">${item.bankName}</label>' +
                 '</div>' +
             '</li>' +
             '{@/each}';
 var accountTpl = '<li class="padding_l_r16 padding_t_b16" data-cardNo="${item.cardNum}" data-orderNum="${item.orderNum}">'+
                     '<div class="bankName">'+
                         '<img alt="" src="${item.bankIcon}" class="bankflag">'+
                         '<span class="bank">${item.bankName}</span>'+
                     '</div>'+
                     '<p class="bankAccount hidden">${item.cardNum|fmtAcctNo}</p>'+
                     '<p class="bankAccount2">${item.cardNum|fmtAcctNo_hidden}</p>'+
                     '<div class="elect">'+
                         '<img alt="" src="./img/noElect2.png">'+
                     '</div>'+
                  '</li>'+
                  '{@/each}';
 var creditCardTpl = '<li class="padding_l_r16 padding_t_b16" data-orderNum="${item.orderNum}">'+
                     '<div class="bankName">'+
                         '<img alt="" src="./img/icon.png" class="bankflag">'+
                         '<span class="bank">${item.cardName}</span>'+
                     '</div>'+
                     '<p class="bankAccount">${item.cardNum}</p>'+
                     '<div class="elect">'+
                         '<img alt="" src="./img/noElect2.png">'+
                     '</div>'+
                     '</li>'+
                 '{@/each}';
 sessionStorage.setItem('returnPage','/mbank/page/repayment/repay.html');
 var changeVal = false;//修改金额标识
 var changeAmortizeVal = false;//修改分期金额标识符
 var App = {
     /**
      * 应用入口
      */
     singleToken:'',//本次还款token
     requires : ['Fw.Toolbar'],
     loadingImg:[
         {src:"./img/icon-nls.gif"},
         {src:"./img/icon_line.png"},
         {src:"./img/btn_gift.png"},
         {src:"./img/btn_energy.png"},
         {src:"./img/btn_close.png"},
         {src:"./img/bg_secondtitle.png"},
         {src:"./img/icon_stone_s.png"},
         {src:"./img/bg_coupons.png"},
         {src:"./img/bg_popup.png"}
     ],
     init : function() {
         App.pageA = $("#pageA");//tab页面
         App.pageB = $("#pageB");//还款结果页面
         App.pageC = $("#pageC");//人民币还款   外币还款          立即还款、确认页面、结果页面
         App.pageD = $("#pageD");//支持的银行
         App.pageE = $("#pageE");//自动还款协议
         App.pageF = $("#pageF");//人民币常用账号
         App.pageG = $("#pageG");//外币  还款方式
         App.pageH = $("#pageH");//外币还款常用账号
         App.pageK = $("#pageK");//人民币信用卡列表
         App.pageL = $("#pageL");//外币信用卡列表
         App.pageN = $("#pageN");//账单分期成功页面
         App.pageP = $("#pageP");//添加卡片页面
         App.pageO = $("#pageO");//支持银行
         App.initPageA();
         App.initEvent();
         App.visibilityChange();
     },
     initPageA:function(){
         Fw.openWaitPanel();
         App.initAccount();//加载 账户列表
          if (Fw.os == 'iphone') {
             Fw.Client.disableScroll();
             $(".finish").html("");
         }
         Fw.showPageArea(App.pageA, [App.pageB,App.pageC,App.pageD,App.pageE,App.pageF,App.pageG], true);
         App.preloadimages(App.loadingImg);
     },
     initEvent : function(){
         // App.initTab();
         App.pageA.on("click",".close",App.hideSelectAccount)//隐藏选择账号模块
             .on("click",".closeAd",App.closeAd)//关闭广告
             .on('click', '#jumpPage,#jump_Page', App.repaymentCalculator)
             .on('click','.icon-toast',App.annualizedRate)
             .on('click','.icon-interest',App.interest)  //还最低提示
             .on("click","#imageId",App.gotoAdPage)//广告链接
             .on("click",".repaymentModeBar",App.selectRepaymentMode)//选择还款方式
             .on('change','#account',function(){
                 App.changeCardNo_all();
             })//人民币  在变换账户的时候  重新加载信用卡列表 重新加载未还款金额
             .on('change','#account1',function(){
                 App.changeCardNo_all('forC');
             })//外币 在变化账户的时候  重新加载信用卡列表  重新加载未还款金额
             .on('click','#For,#For_H',App.initTab_for)//去还人民币
             .on('click','#Rmb,#Rmb_H',App.initTab_rmb)//去还外币
             .on("click","#rmb_pay .defineRepay .right.font-color .label",App.editDefine)//人民币编辑自定义还款金额
             .on("click","#foreignCurr_pay .defineRepay .right.font-color .label",App.editDefine)//外币编辑自定义还款金额
             .on("click","#rmb_pay .amortizeDetail .label.font-color",App.editAmortize)//人民币编辑分期还款金额
             .on("click","#foreignCurr_pay .amortizeDetail .label.font-color",App.editAmortize)//外币编辑分期还款金额
             .on("touchstart click",".clear",App.clearInput)//清空金额
             .on("blur","#editDefine,#editDefine1",App.finishDefine)
         //	.on("click","#foreignCurr_pay .defineRepay .finish",App.finishDefine)//外币自定义还款完成编辑
             .on("click","#rmb_pay .amortize .finish",App.finishAmortize_rmb)//人民币分期还款完成编辑
             .on("blur","#editAmortize",App.finishAmortize_rmb)
             .on("blur","#editAmortize1",App.finishAmortize_for)
             .on("click","#foreignCurr_pay .amortize .finish",App.finishAmortize_for)//人民币分期还款完成编辑
             .on("click","#agreeRate",App.agreeRate)//同意规则
             .on('click','#rmbBtn',App.confirm1)//人民币还款页面  确认进去 立即还款确认弹框
             .on('click','#forBtn',App.confirm2)//外币还款页面  确认进去 立即还款确认弹框
             /*.on('click','#repayRmb',App.validate_rmb) */   //人民币还款
             /*.on('click','#repayFor',App.validate_for)*/    //外币还款
             .on('click','#repayRmb',function () {
                 Fw.buriedPoint("立即还款页面202012_详情页_确定");
                 App.getUserCardAuthStatus();
             })//人民币还款
             .on('click','#repayFor',function () {
                 Fw.buriedPoint("立即还款页面202012_详情页_确定");
                 // if($("#agreeRepayRule1").attr("data-id")!="1"){
                 // 	Fw.toast("请阅读并同意《信用卡还款服务协议》！");
                 // 	return false;
                 // }
                 App.singleSessionToken('for');
             })//外币还款
             // .on('click','.agreeRepay_rule img',App.agreeRepayRuleFun)//勾选协议
             .on('click','.repaymentAgreement span',App.repaymentAgreementFun)//查看协议
             .on('click','.authorization_btn',App.agreeauthorizationFun)//授权
             .on('click','.authorization_btn_disagree',App.disagreeauthorizationFun)//不授权
             .on('click','#bankSupport',App.initBank)//查看支持的银行
             .on('click','#rmbIcont',App.showCardNo)//展示人民币常用还款账号
             .on('click','#forIcont',App.showCardNo)//展示外币常用还款账号
             .on('click','#repay_method_for',App.showPageG)//展示外币常用还款账号
             .on('blur','#debitCardNo,#debitCardNo1',App.finishEditCardNo)
             .on('input','#debitCardNo',App.handleCardNo)//处理人民币输入的卡号
             .on('focus','#debitCardNo,#debitCardNo1',App.startEditCardNo)//处理输入的卡号
             .on('click','.fmt-debit',App.showDebitCardInput)//显示借记卡输入框
             .on('touchstart click','#debitCardNo+img',App.clearCardNo)//编辑还款账号
             .on('touchstart click','#debitCardNo1+img',App.clearCardNo)//编辑还款账号
             .on('input','#debitCardNo1',App.judgeButton_for)//处理外币输入的卡号
             .on('click','#creditCardRmbBox',App.showpageK)//显示人民币信用卡列表
             .on('click','#creditCardForBox',App.showpageL)//显示外币信用卡列表
             .on('keyup','#editDefine,#editDefine1',function (event) {
                 changeVal = true;
                 App.moneyTips($(event.target).val(),$('.digitTips'),11,$(event.target));
             })
             .on('keyup','#editAmortize,#editAmortize1',function (event) {
                 changeAmortizeVal = true;
                 App.moneyTips($(event.target).val(),$('.digitTips1'),-0.07,$(event.target));
             })
             .on('click','.repay_coupon',App.showCoupon)//显示还款金券列表
             .on('click','#getCoupons',App.goCoupons) //获取还款金活动页
             //分期入口新增事件
             .on('click','.cycle_rate',App.showCycle)//展示期数和费率
             .on('click','.selectCycle .cancle',App.hideCycle)//隐藏期数和费率
             .on('click','.selectCycle_body li',App.changeCycle)//选择期数
             .on('click','#contract_agree,#contract_agree_for',App.agreeContract)//同意合约
             .on('click', '#bank_agreement,#bank_agreement_for', App.showAgreement)//查看协议
             .on('click', '#useRedPacket', App.useRedPacket)//使用红包
             .on('click', '#s-btn', App.okRedPacket)//红包弹框点击确定
             .on('click', '#c-btn', App.cancleRedPacket)//红包弹框点击取消
             .on('keyup', '#redPackets', App.changeRedPackets);//变动红包金额所触发的事件
         App.pageB.on('click','#queryBill',App.billQuery)//跳转账单查询页面
                  .on('click','#billStage',App.billByStage)//跳转账单分期页面
                  .on('click','#goquota',App.goquota)//跳转额度查询页面
                  .on('click','#goRepay',App.pageB_back)//继续还款
                  .on('click','.useRecord',App.useRecord)//还款金券使用记录
                  .on('click','.icon-repaymentMoney',App.addEnergyFun)//领取能量石
                  .on('click','.nls_list_close',App.closeEnergyFun)
                  .on('click','.icon-coupons_p3.able',App.openNewPage)
                  .on('click','.icon-coupons_p3.use',App.openNewPage1)
                  .on('click','.btn_gift,.btn_energy',App.openNewPage2);
         App.queryImgUrl();
         App.pageF.on('click','#rmbCardNoList li[data-delete="0"]',App.selectAccount);//选择常用还款卡号
         App.pageF.on('click','#rmbCardNoList li[data-delete="1"]',App.deleteCardNo);//删除人民币扣款银行账号
         App.pageF.on('click', '.notEditCard-addBtn,#addBankCard', App.addBankCard); //人民币添加银行卡
         App.pageH.on('click', '.notEditCard-addBtn,#addBankCard', App.addBankCard); //外币添加银行卡
         App.pageP.on('click', '.groupcode', App.formatCardNo); //扫描借记卡
         App.pageP.on('click', '#resiveBank', App.initBank1);//展示用户支持银行列表
         App.pageO.on('click', '.yui-xyk', App.changeBank); //用户选择银行名称
         App.pageP.on('click', '#addResiveBankNo', App.addResiveBankNo)//添加卡片页确定按钮
         App.pageH.on('click','#forCardNoList li[data-delete="0"]',App.selectAccount);//选择常用还款卡号
         App.pageH.on('click','#forCardNoList li[data-delete="1"]',App.deleteCardNo);//删除人民币扣款银行账号
         App.pageG.on('click','.forRepayMethod',App.forRepayMethod);//选择外币还款方式
         App.pageK.on('click','#creditListRmb li',App.selectCreditCard);//选中人民币信用卡
         App.pageL.on('click','#creditListFor li',App.selectCreditCard);//选中人民币信用卡
         App.pageN.on('click', '#image3Id', App.gotoAdPage3)//跳转广告页面
         App.pageN.on('click', '.icon-cachMoney', App.goCachMoney); //去还款
         $('body').on('change','select',function(){
             $(this).blur();
         });
         document.querySelector('.repayClose').addEventListener('click',function(){
             $(".shade").hide();
             $("#pageA").css({"position":"static"});
             $(".selectAccount").animate({"bottom":"-100%"},500,function(){
                 $(".selectAccount").addClass("hidden");
             });
         });
         $('.introduce').click(function(event){
             App.hideSelectAccount("1");
             Fw.openNewWebPanel('/mmc/page/threePage/repaymentIntroduce/index.html',{flag:true});
             event.stopPropagation()
         });
         $('#failConfirm').click(function(){
             $('#repayFail').addClass('hidden');
         });
         $('#closeTips,#minBtn').click(function(){
             $('#minRepayTips').addClass('hidden');
         });
         $('#cardNo3').on('keyup', function (e) {
             onceShow = "addNumChange";
             App.cardNoChange(e, $('#cardNo3').val())
         });
         document.getElementById('minRepayTips').addEventListener("touchmove", function (ev) {
             ev.preventDefault();
         });
         document.getElementById('repayFail').addEventListener("touchmove", function (ev) {
             ev.preventDefault();
         });
         
     },
 
     interest:function(){
         $('#minRepayTips').removeClass('hidden');
     },
     
     annualizedRate:function(){
         var applyAmt = "";
         if(nowPage == "rmbRepay"){
             applyAmt = $("#amortizeMoneyRmb").text().substring(1);
         }else if(nowPage == "foreignCurrRepay"){
             applyAmt = $("#amortizeMoneyFor").text();
         }
         var params = {
             stagNum:App.dataNum,
             stagRate:App.dataRate,
             rateList:App.rateList,
             applyAmt: Fw.util.Format.unfmtAmt(applyAmt)
         }
         Fw.openNewWebPanel('../divide/annualizedRate/rate.html',params);
     },
     
     useRecord :function(){
         var url=Fw.dataUrl("credit/thirdLoginMf");
         Fw.ajaxData(url,{},function(data){
             if(data && data.STATUS == '1'){
                 var recordUrl = NS.TRUNK?"https://prefacty.creditcard.cmbc.com.cn/repayment/#/?state=records&channelType=02&usrType=04":"https://test.creditcard.cmbc.com.cn/repayment/#/?state=records&channelType=02&usrType=04";
                 // var recordUrl = "https://test.creditcard.cmbc.com.cn/repaymentV2/#/?state=records&channelType=02&usrType=04";
                 Fw.openNewWebPanel(recordUrl+ "&" + data.reqData.substring(1));
             }
         },Fw.errorAjax);
     },
     moneyTips:function(moneyVal,element,right,_this){
         // span标签作为过渡，用以计算出input中字符的实际占用宽度，并调整tips的位置
         $('.width_calculator').html(moneyVal);
         var spanWidth = $('.width_calculator').width();
         if(element.attr('class') == 'digitTips'){
             element.css('right',(spanWidth-right)/100+'rem');
         }else{
             element.css('left',(right)+'rem');
         }
 
         var val= parseInt(Fw.util.Format.unfmtAmt(moneyVal));
         element.show();
         if (999 < val && val < 10000) {
             element.html('千');
         }else if (10000 <= val && val < 100000){
             element.html('万');
         }else if (100000 <= val && val < 1000000) {
             element.html('十万');
         }else if (1000000 <= val && val < 10000000) {
             element.html('百万');
         }else if (10000000 <= val && val < 100000000) {
             element.html('千万');
         }else {
             element.hide();
         }
         if(moneyVal.length > 0){
             $(_this).parent().find('.clear').removeClass('hidden');
         }else{
             $(_this).parent().find('.clear').addClass('hidden');
         }
     },
     goAddCard: function() {
         Fw.redirect('../cardM/mycard/cardList.html');
     },
     queryBankInfoByKBin:function(){
     //查询对应的银行信息
         var url=Fw.dataUrl("repay/queryBankInfoByKBin");
         if(nowPage=='rmbRepay'){
             var debitDom = $("#debitCardNo");
             var bankLogo = $('.bankLogo.rmb');
             var valSpan = $('.valSpan');
         }else{
             var debitDom = $("#debitCardNo1");
             var bankLogo = $('.bankLogo.for');
             var valSpan = $('.valSpan1');
         }
            var cardNo = debitDom.val();
            cardNo = cardNo.replace(" ","");
 //       	if(billFlag_rmb == "2" ){//未出账单只显示民生银行     2已改变 新
 //       		$("#textBankName").html("中国民生银行");
 //       		$("#billFlag1").show();
 //       		return;
 //       	}
         App.showBankLogo(debitDom,bankLogo,valSpan);
            if(cardNo.length >= 6 && isCheck == "0"){
                isCheck = "1";	
                var cardBin = cardNo.substr(0,6);
                Fw.ajaxData(url, {cardBin:cardBin}, function(data){
                    if(data.STATUS=="1"){
                        if(data.cardBinInfo){
                            flagIsDisable = "0";
                         bankLogo.removeClass('hidden').attr('src',data.cardBinInfo.bankIcon);
                        }else{
                            flagIsDisable = "1";
                            debitDom.val('').removeAttr('data-orderNum');
                             bankLogo.addClass('hidden').removeAttr('src');
                             isCheck = "0";
                            debitDom.blur();
                         Fw.alertinfo('暂不支持该银行卡还款','提示',function(){
                             App.handleCardNo();
                         });
                        }
                        $("#billFlag1").show();
                    }else{
                        Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                    }
                }, Fw.errorAjax);
            }else if(cardNo.length < 6 ){
                flagIsDisable = "0";
                isCheck = "0";
                $("#billFlag1").hide();
            }
     },
     initUsedAccount:function(){
         var url=Fw.dataUrl("repay/queryRepayCardNoList");
         Fw.ajaxData(url, {}, function(data){
             if(data.STATUS=="1"){
                 App.cardListAll = data.cardListAll;
                 App.cardList = data.cardList;
                 if(!Fw.isEmpty(data.cardListAll)){
                     var rmbCardNoTpl = '{@each cardListAll as item,index}' + accountTpl;//人民币常用还款账号
                     $('#rmbCardNoList').html(Fw.template(rmbCardNoTpl,data));
                     $("#debitCardNo").val(Fw.util.Format.fmtAcctNo(data.cardListAll[0].cardNum)).attr('data-orderNum',data.cardListAll[0].orderNum).addClass('hidden');
                     $('#fmtDebitCardNo').text(Fw.util.Format.fmtAcctNo_hidden(data.cardListAll[0].cardNum)).removeClass('hidden');
                     $("#repay_bank").html(data.cardListAll[0].bankName);
                     $('#pageF').attr('data-btnRight','true|编辑|App.editOperate()');
                     $("#rmb_noCardNum").addClass("hidden");
                 }else{
                     $('#pageF').attr('data-btnRight','false||');//列表为空时，编辑按钮隐藏
                     $("#repay_bank").html("");
                     $("#rmb_noCardNum").removeClass("hidden");
                 }
                 if(!Fw.isEmpty(data.cardList)){
                     var forCardNoTpl = '{@each cardList as item,index}' + accountTpl;//外币常用还款账号
                     $('#forCardNoList').html(Fw.template(forCardNoTpl,data));
                     $("#forCardNoList li:first-child .elect img").attr("src","./img/elect2.png");
                     $("#forCardNoList li:first-child").attr("data-flag","1");
                     $("#debitCardNo1").val(Fw.util.Format.fmtAcctNo(data.cardList[0].cardNum)).attr('data-orderNum',data.cardList[0].orderNum).addClass('hidden');
                     $('#fmtDebitCardNo1').text(Fw.util.Format.fmtAcctNo_hidden(data.cardList[0].cardNum)).removeClass('hidden');
                     $('#pageH').attr('data-btnRight','true|编辑|App.editOperate()');
                     $("#for_noCardNum").addClass("hidden");
                 }else{
                     $('#pageH').attr('data-btnRight','false||');
                     $("#for_noCardNum").removeClass("hidden");
                 }
                     
             }else{
                 Fw.alertinfo(data.MSG,'提示');
             }
         }, Fw.errorAjax);
     },
     initBank:function () {
         if(initBankFlag == '0'){
             Fw.openWaitPanel();
             var url=Fw.dataUrl("repay/queryPayBank");
             Fw.ajaxData(url, {}, function(data){
                 Fw.hideWaitPanel();
                 if(data.STATUS=="1"){
                     initBankFlag = '1';
 
                     var cashImgUrl = data.cashImgUrl,data2 = Fw.apply({},data);
 //                	Fw.alertinfo(data.BankList[0].exera1);
                     Fw.each(data2.BankList,function(obj,index){
                         if(obj.agentFlag=='305100000013'){//民生银行
                             data2.BankList = [data2.BankList[index]];
                             return false;
                         }
                     })
 
                     $('#bankList').html(Fw.template(bankTpl,data));     //全部银行
                     $('#bankList_ono').html(Fw.template(bankTpl,data2));//只有民生银行
                     App.bankList_show();//判断显示全部银行   还是   只有民生银行
                     App.handleCloseBtn(false);
                     Fw.showPageArea(App.pageD, [App.pageA], true);
                 }else{
                     Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                 }
             }, Fw.errorAjax);
         }else{
             App.handleCloseBtn(false);
             App.bankList_show();//判断显示全部银行   还是   只有民生银行
             Fw.showPageArea(App.pageD, [App.pageA], true);
         }
     },
     initBank1:function () {
         if(initBankFlag == '0'){
             Fw.openWaitPanel();
             var url=Fw.dataUrl("repay/queryPayBank");
             Fw.ajaxData(url, {}, function(data){
                 console.log('data=====',data);
                 Fw.hideWaitPanel();
                 if(data.STATUS=="1"){
                     initBankFlag = '1';
 
                     var cashImgUrl = data.cashImgUrl,data2 = Fw.apply({},data);
 //                	Fw.alertinfo(data.BankList[0].exera1);
                     Fw.each(data2.BankList,function(obj,index){
                         if(obj.agentFlag=='305100000013'){//民生银行
                             data2.BankList = [data2.BankList[index]];
                             return false;
                         }
                     })
 
                     $('#bankList1').html(Fw.template(bankTpl,data));     //全部银行
                     $('#bankList_ono1').html(Fw.template(bankTpl,data2));//只有民生银行
                     App.bankList_show();//判断显示全部银行   还是   只有民生银行
                     App.handleCloseBtn(false);
                     Fw.showPageArea(App.pageO, [App.pageA,App.pageP], true);
                 }else{
                     Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);	
                 }
             }, Fw.errorAjax);
         }else{
             App.handleCloseBtn(false);
             App.bankList_show();//判断显示全部银行   还是   只有民生银行
             Fw.showPageArea(App.pageO, [App.pageA,App.pageP], true);
         }
     },
     bankList_show:function () {
              //未出或已出账单  展示全部（未出账单现在已支持他行还款）
             $('#bankList').removeClass('hidden');
             $('#bankList_ono').addClass('hidden');
 
     },
     // 去还人民币
     initTab_for:function () {
         App.initTab();
         App.changeTitle1();
         // nowPage='rmbRepay';
         // messagePageFlag = 'rmb'
         $("#rmb_pay").addClass("current");
         $("#foreignCurr_pay").removeClass("current");
     },
     // 去还外币
     initTab_rmb:function () {
         if(App.queryOthBillheadData){
             delete App.queryOthBillheadData;
         } 
         App.initTab1();
         App.changeTitle2();
         // nowPage='foreignCurrRepay';
         // messagePageFlag = 'for'
         $("#rmb_pay").removeClass("current");
         $("#foreignCurr_pay").addClass("current");
     },
     initAccount:function () {//人民币 外币 自动还款 加载账户
          var accNo = window.location.search;
          accNo = accNo.substring(accNo.indexOf("=")+1,accNo.length);
          Fw.accNo_client = accNo;
          App.edict=true;
          if(accNo && accNo.indexOf("=")!=-1){
              accNo = accNo.substr(0,accNo.indexOf("=")-2);
             }
         var url=Fw.dataUrl("repay/queryAcctType");
         Fw.ajaxData(url, {}, function(data){
             if(data.STATUS=="1"){
                 App.initUsedAccount();//加载成功还款的常用账号    
                 App.getImg("0207010000");//广告位展示
                 App.getAmortizeAd();//分期广告
                 Fw.each(data.acctList, function(obj) {// 人民币  外币 
                     $("#account").append(("<option value='"+obj.acctNo+"'data-coin='"+obj.coinType+"' data-cardNo='"+obj.cardNum+"' data-cardType='"+obj.cardType+"'>"+Fw.util.Format.fmtCardName(obj)+"</option>"))
                 });
                 if(accNo && accNo.length == 4){
                     if(App.getIndex(data.acctList,accNo) !== ''){
                         $('#account').val(accNo); 
                         $("#accountNoVal").text($('#account option:selected').text());
                     }else{
                         Fw.confirm('您暂未添加相应的卡片，请先添加','提示',function () {
                             Fw.redirect('../cardM/mycard/cardList.html');
                         },function () {
                             Fw.goBack();
                         },"添加","取消");
                         return;
                     }
                 }
                 //账单分期和灵活账单传递当前账户
                 if(!Fw.isEmpty(Fw.getPassDataFromPrevPanel().acctNo)){
                     $("#account").val(Fw.getPassDataFromPrevPanel().acctNo);
                     $("#accountNoVal").text($('#account option:selected').text());
                     App.initHomepage();//加载 信用卡卡号
                     return;
                 }
 
                 if(pageFlag && pageFlag.accountVal && $(".account option[value='"+pageFlag.accountVal+"']").length!=0){//从账单查询页面跳过来 默认显示账单查询选中的账户
                     if (pageFlag.page_Flag) {  //从分期成功页返回
                         if(pageFlag.page_Flag=="forRepay"){//从账单分期跳过来时，如果分期的是外币，需要加载外币账单
                             $("#account").val(pageFlag.accountVal);
                             $("#accountNoVal").text($('#account option:selected').text());
                             App.initTab1();
                             $("#rmb_pay").removeClass("current");
                             $("#foreignCurr_pay").addClass("current");
                             nowPage='foreignCurrRepay';
                             // App.changeCardNo2();
                         }else{
                             $("#account").val(pageFlag.accountVal);
                             $("#accountNoVal").text($('#account option:selected').text());
                             App.initTab();
                             $("#rmb_pay").addClass("current");
                             $("#foreignCurr_pay").removeClass("current");
                             // App.changeCardNo()
                         }
                     }
                     $("#account").val(pageFlag.accountVal);
                     App.initHomepage();//加载 信用卡卡号
                     // App.initCardNo();//加载 信用卡卡号
                     //App.initAmortize();//加载分期信息
                     // if(pageFlag.page_Flag=="forRepay"){//从账单分期跳过来时，如果分期的是外币，需要加载外币账单
                     // 	App.changeCardNo2();
                     // }else{
                     // 	App.changeCardNo();
                     // }
                     return;
                 }
                 
                 //需要账户  在此加载
                 // App.initCardNo();//加载 信用卡卡号
                 // //App.initAmortize();//加载分期信息
                 // if(pageFlag.page_Flag=="forRepay"){//从账单分期跳过来时，如果分期的是外币，需要加载外币账单
                 // 	App.changeCardNo2();
                 // }
                 // 判断是否是单账户还是多账户，多账户优先显示最低未还够的账户
                 if(data.acctList.length > 1 && accNo.length != 4){ 
                     App.acctNoArr = []   //每个账户的acctNo的值
                     App.acctNoArrIndex = 0;
                     for (j=0; j<=data.acctList.length-1; j++ ) {
                         App.acctNo_ = data.acctList[j].acctNo
                         App.acctNoArr.push(App.acctNo_)
                     }
                     App.initRmb()   //返回所有账户人民币外币的值
                 }else{
                     App.initHomepage();//加载 信用卡卡号  
                 } 
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG,'提示',function(){
                     Fw.goBack();
                 });
             }
         }, function(err){
             Fw.hideWaitPanel();
             Fw.alertinfo(err.msg,'提示',function(){
                 Fw.goBack();
             });
         });
     },
     getIndex:function (v,nowV) {
         var relIndex = '';
         Fw.each(v,function (obj,index) {
             if(obj.acctNo == nowV){
                 relIndex = index;
                 return true;
             }
         });
         return relIndex;
     },
     // 人民币 外币  多账户
     initRmb: function () {
         var url=Fw.dataUrl("credit/queryRmbBillhead");
         var url1=Fw.dataUrl("credit/queryOthBillhead");
         Fw.openWaitPanel();
         var minYesArr = [];   //最低未还够
         
         var param={
             accNo: App.acctNoArr[App.acctNoArrIndex],  //acctNoArr数组每一项acctno的值
             NEXT_KEY:'1',
             PAGE_SIZE:'5'
         }
         Fw.ajaxData(url, param, function(data){
             var dataRmb=data;
             if(data.STATUS=="1"){
                 Fw.ajaxData(url1, param, function(data){  //wai
                     if (data.STATUS=="1") {
                         Fw.hideWaitPanel();
                         if (data.stmMinDux!=0||dataRmb.stmMinDue!=0) {
                             minYesArr.push(App.acctNoArr[App.acctNoArrIndex]);
                             $('#account').val(minYesArr[0]);
                             App.initHomepage();//加载 信用卡卡号  
                         }else{
                             App.acctNoArrIndex ++;
                             if(App.acctNoArrIndex < App.acctNoArr.length){
                                 App.initRmb();
                             }else{
                                 App.initHomepage();//加载 信用卡卡号  
                             }
                         }
                     }else{
                         Fw.hideWaitPanel();
                         Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                     }
                 }, Fw.errorAjax);
             
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
             }
         }, Fw.errorAjax);
     },
     changeCardNo_all:function (coin) {
         $('.digitTips').hide();
         $('.digitTips1').hide();
         changeVal = false;
         changeAmortizeVal = false;
         Fw.openWaitPanel();
         App.initHomepage();
     },
     changeCardNo: function () {
         $('.digitTips').hide();
         $('.digitTips1').hide();
         changeVal = false;
         changeAmortizeVal = false;
         Fw.openWaitPanel();
         App.accountChange = 'rmb';//标识在切换人民币账户
         App.initCardNo('rmb');
     },
     changeCardNo2: function () {
         $('.digitTips').hide();
         $('.digitTips1').hide();
         changeVal = false;
         changeAmortizeVal = false;
         Fw.openWaitPanel();
         App.accountChange = 'forC';//标识在切换外币账户   
         App.initCardNo('forC');
     },
     initCardNo:function(coin){
         $('.tips').hide();
         if( App.accountChange &&  App.accountChange == 'rmb'){//切换人民币账户 查询账单
             App.initMoney();//更改账户重新加载 查询已出账单未出账单
             App.accountChange = null;
             // Fw.inPageBuriedPoint("立即还款页面202004_首页");
             Fw.showPageArea(App.pageA, [App.pageB,App.pageC,App.pageD,App.pageE,App.pageF,App.pageG], true);
         }else if(App.accountChange && App.accountChange == 'forC'){//切换外币账户 查询账单
             App.initForMoney();//更改账户重新加载 查询已出账单未出账单
             App.accountChange = null;
             Fw.showPageArea(App.pageA, [App.pageB,App.pageC,App.pageD,App.pageE,App.pageF,App.pageG], true);
         }else{
             App.initMoney();//加载 本期未还金额 未还最低金额  默认初始化加载的时候
             // App.initHomepage();//判断显示人民币tab还是外币tab
             Fw.showPageArea(App.pageA, [App.pageB,App.pageC,App.pageD,App.pageE,App.pageF,App.pageG], true);
         }
         Fw.inPageBuriedPoint("立即还款页面202012_首页");
         switch (coin){           //区别人民币  和 外币  在变换账户的时候需要重新加载，取得参数和跟着变化的信用卡是不同的
             case 'forC':var id='account1';break;
             default:var id='account';break;
         }
         var url=Fw.dataUrl('repay/queryAllCardByAccNo2');
         var param={
             acctNo:$('#account').val()//账户类型
         }
         if(nowPage=='foreignCurrRepay'){
             param.isOth = '1';
         }
         Fw.ajaxData(url, param, function(data){
             if(data.STATUS=="1"){
                 if(data.cardList&&data.cardList.length!=0){
                     //加载信用卡列表
                     var creditNoTpl = '{@each cardList as item,index}' + creditCardTpl;//人民币信用卡
                     if(nowPage=='rmbRepay'){
                         $('#creditListRmb').html(Fw.template(creditNoTpl,data));
                         if(data.commonCardIndex != -1){//有还过款的信用卡
                             var index = data.commonCardIndex;
                             App.orderNumRmb = index+"";
                             var cardName = data.cardList[index].cardName;
                             var cardNum = data.cardList[index].cardNum;
                             $("#creditCardRmb").html(cardName+"("+cardNum.substr(cardNum.length-4)+")");
                             $("#creditListRmb li").eq(index).find(".elect img").attr("src","./img/elect2.png");
                             if(!Fw.isEmpty($("#debitCardNo").val()) && !Fw.isEmpty($("#creditCardRmb").html())){//判断还款页面按钮是否置灰
                                 $("#repayRmb").removeAttr("disabled");
                                 $("#repayRmb").css({"opacity":1});	 
                             }else{
                                 $("#repayRmb").attr("disabled","disabled");
                                 $("#repayRmb").css({"opacity":0.5});
                             }
                         }else if(data.commonCardIndex == -1){//没有还过款的信用卡
                             $("#creditCardRmb").html("");
                             $("#repayRmb").attr("disabled",true);
                             $("#repayRmb").css({"opacity":0.5});
                         }
 //	                	$("#creditListRmb li:first-child .elect img").attr("src","./img/elect2.png");
                     }else if(nowPage=='foreignCurrRepay'){
                         $('#creditListFor').html(Fw.template(creditNoTpl,data));
                         if(data.commonCardIndex != -1){
                             var index = data.commonCardIndex;
                             App.orderNumFor = index+"";
                             var cardName = data.cardList[index].cardName;
                             var cardNum = data.cardList[index].cardNum;
                             $("#creditCardFor").html(cardName+"("+cardNum.substr(cardNum.length-4)+")");
                             $("#creditListFor li").eq(index).find(".elect img").attr("src","./img/elect2.png");
                         }else if(data.commonCardIndex == -1){
                             $("#creditCardFor").html("");
                             $("#repayFor").attr("disabled",true).css({"opacity":1});
                         }
 //	                	$("#creditListFor li:first-child .elect img").attr("src","./img/elect2.png");
                     } 	
                     
                          
                 }else{
                     if(nowPage=='rmbRepay'){
                         $('#creditListRmb,#creditCardRmb').html("");
                     }else if(nowPage=='foreignCurrRepay'){
                         $('#creditListFor,#creditCardFor').html("");
                     }
                 }
                 
             }
         }, Fw.errorAjax);
        
     },
 
     initMoney: function (coin) {
         var url=Fw.dataUrl("credit/queryRmbBillhead");
         var param={
             accNo:$('#account').val(),
             NEXT_KEY:'1',
             PAGE_SIZE:'5'
         }
         $("#accountNoVal").text($('#account option:selected').text());
         
         Fw.ajaxData(url, param, function(data){
             if(data.STATUS=="1"){
                 App.initMoney_rmb(data,param);//人民币  加载
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
             }
         }, Fw.errorAjax);
         
     },
     repaySubtract:function(subtractor,subtrahend,flag){
         var url=Fw.dataUrl("repay/repaySubtract");
         var param={
                 subtractor:Fw.util.Format.unfmtAmt(subtractor)+"",
                 subtrahend:Fw.util.Format.unfmtAmt(subtrahend)+""
         };
         Fw.ajaxData(url,param, function(data){
           var result = Fw.util.Format.fmtMoney(data.result);
           switch(flag){
               case 1:$("#amortizeLeaveRmb").html("¥"+result);break;//人民币分期后应还金额
               case 2:$("#amortizeLeaveFor").html(Fw.util.Format.fmtCurrType(App.currType)+result);break;//外币分期后应还金额
               case 3:$("#currentNorepay").html("¥"+result);break;//人民币还款后未还金额
               case 4:$("#currentNorepay").html(Fw.util.Format.fmtCurrType(App.currType)+result);break;//外币还款后未还金额
           }
         }, Fw.errorAjax);
     },
     initAmortize: function(){
         Fw.openWaitPanel();
         var url=Fw.dataUrl("bystages/queryCanStag");
         if(Fw.isEmpty(App.AmortizeList)){
             Fw.ajaxData(url,{}, function(data){
                 if(data.STATUS=="1"){
                     App.AmortizeList=data.acctList;
                     App.afterInitAmortize();
                 }
             }, Fw.errorAjax);
         }else{
             App.afterInitAmortize();
         }
     },
     afterInitAmortize:function(){
         for(var i=0;i<App.AmortizeList.length;i++){
             
             if(App.AmortizeList[i].accNo==$('#account').val()){
                 //人民币分期
                 App.initAmortizeRmb(App.AmortizeList[i]);
                 break;
                 //外币分期
 //    			App.initAmortizeFor(App.AmortizeList[i]);
             }else{
                 //隐藏数据2
                 //目前还款和账单分期 有2个不同的数据集，当选择数据存在【还款数据集】中，恰恰不存在分期中
                 //那么这样的数据需要隐藏掉
                 //隐藏人民币分期
                 Fw.hideWaitPanel();
                 $(".amortizeResultData.rmb").addClass("hidden");
                 $(".repaymentModeBar.amortize.rmb").addClass("hidden");
             }
         }
     },
     afterInitAmortizeFor:function(){
          for(var i=0;i<App.AmortizeList.length;i++){
              if(App.AmortizeList[i].accNo==$('#account').val()){
                  App.initAmortizeFor(App.AmortizeList[i]);
                  break;
              }else{
                 //隐藏数据2
                 //目前还款和账单分期 有2个不同的数据集，当选择数据存在【还款数据集】中，恰恰不存在分期中
                 //那么这样的数据需要隐藏掉
                 //隐藏人民币分期
                  Fw.hideWaitPanel();
                 $(".amortizeResultData.for").addClass("hidden");
                 $(".repaymentModeBar.amortize.for").addClass("hidden");
             }
          }
         
     },
     initAmortizeRmb: function(data){
         if(data.canStatus==1){
             App.queryBillDate();//可分期时，查是否有大额额度
             $(".amortizeResultData.amortize.rmb").addClass("hidden");
             App.rmbStm = data.rmbStm;//人民币分期金额
             if(parseFloat(App.rmbStm)>parseFloat(App.sholdRepayment_rmb)){
                 App.rmbStm = App.sholdRepayment_rmb;
             }
             $("#amortizeMoneyRmb").text("¥"+Fw.util.Format.fmtMoney(App.rmbStm));
             $(".amortizeTotalRmb").text("~"+Fw.util.Format.fmtMoney(App.rmbStm));
             App.repaySubtract(App.sholdRepayment_rmb,App.rmbStm,1);
             if(App.sholdRepayment_rmb==0||App.thisBillAmt==0){//账单已还清或者本期账单为0时，只显示自定义还款
                 $(".repaymentModeBar.amortize.rmb").addClass("hidden");
             }else{
                 if(parseFloat(App.rmbStm)>=parseFloat(600)){
                     $(".repaymentModeBar.amortize.rmb").removeClass("hidden");
                 }else{
                     $(".repaymentModeBar.amortize.rmb").addClass("hidden");
                 }
             }
             
             
         }else if(data.canStatus==2){
             $(".repaymentModeBar.amortize.rmb").addClass("hidden");
             $(".amortizeResultData.rmb").removeClass("hidden");
             //最低应还金额不为0时，最低还模块要显示
             if(App.minRepayment_rmb==0){
                 $(".minRepay.rmb").addClass("hidden");
             }else{
                 $(".minRepay.rmb").removeClass("hidden");
             }
             $("#amortizeMoney1").text("¥"+Fw.util.Format.fmtMoney(data.havRmbAmount));
             $("#amortizeLengthRmb").text(data.havRmbNum);
         }else{
             //隐藏数据1
             //后台遍历的是【账单分期的数据集】，当数据不存在与 已分期和可分期的时候，
             //那么这样的数据隐藏掉
             $(".amortizeResultData.amortize.rmb").addClass("hidden");
             $(".repaymentModeBar.amortize.rmb").addClass("hidden");
         }
         Fw.hideWaitPanel();
     },
     initAmortizeFor: function(data){
         
         App.othStm = data.othStm;//外币分期金额最大额度
         App.minAmt = data.minAmt;//外币分期金额最小额度
         if(data.canOthStatus == 1){
             App.initStagNum_for();//查询期数和费率
             if(parseFloat(App.othStm)>parseFloat(App.sholdRepayment_For)){
                 var othStm = App.sholdRepayment_For;
             }else{
                 var othStm = App.othStm;
             }
             $(".amortizeResultData.for").addClass("hidden");
             if(App.thisBillAmt_for==0||App.sholdRepayment_For==0){//账单已还清或者本期账单为0时，只显示自定义还款
                 $(".repaymentModeBar.amortize.for").addClass("hidden");
             }else{
                 if(parseFloat(othStm)>parseFloat(data.minAmt)){
                     $(".repaymentModeBar.amortize.for").removeClass("hidden");
                 }else{
                     $(".repaymentModeBar.amortize.for").addClass("hidden");
                 }
             }
             
             $("#amortizeMoneyFor").text(Fw.util.Format.fmtMoney(othStm));
             $("#amortizeMoneyFor").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
             $(".amortizeMinFor").text('('+Fw.util.Format.fmtCurrType(App.currType)+'):'+Fw.util.Format.fmtMoney(data.minAmt));
             $(".amortizeTotalFor").text("~"+Fw.util.Format.fmtMoney(othStm));
             //需要获取外币的应还金额
             App.repaySubtract(App.sholdRepayment_For,othStm,2);
         }else if(data.canOthStatus == 2){
             
             $(".repaymentModeBar.amortize.for").addClass("hidden");
             $(".amortizeResultData.for").removeClass("hidden");
             //账单分期金额小于最低应还金额，最低还模块要显示
             if(App.minRepayment_for==0){
                 $(".minRepay.for").addClass("hidden");
             }else{
                 $(".minRepay.for").removeClass("hidden");
             }
             $("#amortizeMoney2").text(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.havOthAmount));
             $("#amortizeLengthFor").text(data.havOthNum);
         }else{
             $(".amortizeResultData.for").addClass("hidden");
             $(".repaymentModeBar.amortize.for").addClass("hidden");
         }
         Fw.hideWaitPanel();
     },
 
     initForMoney:function(back){
         if(App.queryOthBillheadData){
             $("#accountNoVal").text($('#account option:selected').text());
             App.initMoney_for(App.queryOthBillheadData);
             return false;
         }
         Fw.openWaitPanel();
          var url=Fw.dataUrl("credit/queryOthBillhead");
          var param={
              accNo:$('#account').val(),
              NEXT_KEY:'1',
              PAGE_SIZE:'5'
          }
          $("#accountNoVal").text($('#account option:selected').text());
          Fw.ajaxData(url, param, function(data){
              
              if(data.STATUS=="1"){
                  Fw.hideWaitPanel();
                  App.initMoney_for(data);//外币    加载
              }else{
                  Fw.hideWaitPanel();
                  Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
              }
          }, Fw.errorAjax);
     },
     initHomepage:function(){
         
         $("#Rmb_H").addClass('hidden');
         $("#Rmb").addClass('hidden');
         $("#For_H").addClass('hidden');
         $("#For").addClass('hidden');
         App.showForLint=false;
         App.showRmbLint=false;
         var url=Fw.dataUrl("credit/queryRmbBillhead");
         Fw.openWaitPanel();
         var param={
             accNo:$('#account').val(),
             NEXT_KEY:'1',
             PAGE_SIZE:'5'
         }
         var url1=Fw.dataUrl("credit/queryOthBillhead");
         Fw.ajaxData(url, param, function(data){
             if(data.STATUS=="1"){
                  App.initMoney_rmb(data,param);//人民币  加载
                 var rmbData = data;
                 Fw.ajaxData(url1, param, function(data){
                     if(data.STATUS=="1"){
                         App.initMyTab();
                         Fw.hideWaitPanel();
                         App.thisBillAmtFor = data.thisBillAmt;
                         App.thisBillAmtSign_for = data.thisBillAmtSign;//外币本期账单正负标示
                         App.sholdRepayment_For = data.sholdRepayment;
                         if(rmbData.sholdRepayment == 0 && data.sholdRepayment == 0){//人民币和外币未出账单都为0
                             $('.hasPaymentAll').removeClass('hidden');
                             $('.hasPaymentSin').addClass('hidden');
                         }else{
                             $('.hasPaymentAll').addClass('hidden');
                             $('.hasPaymentSin').removeClass('hidden');
                         }
                         if(parseFloat(rmbData.thisBillAmt)!=0 && rmbData.thisBillAmtSign == '+'){
                             if (parseFloat(rmbData.sholdRepayment)!=0||rmbData.stmMinDue!=0) {						
                                 // App.rmbCoin='rmb'
                                 nowPage='rmbRepay';
                                 messagePageFlag = 'rmb'
                                 App.changeCardNo()
                                 App.initTab();
                                 $("#rmb_pay").addClass("current");
                                 $("#foreignCurr_pay").removeClass("current");
                                 if (parseFloat(rmbData.sholdRepayment)!=0 && rmbData.stmMinDue==0) {
                                     if (parseFloat(data.sholdRepayment)!=0 && data.stmMinDux!=0) {
                                         //显示外币tab
                                         nowPage='foreignCurrRepay';
                                         messagePageFlag = 'for'
                                         App.changeCardNo2()
                                         App.initTab1();
                                         $("#rmb_pay").removeClass("current");
                                         $("#foreignCurr_pay").addClass("current");
                                     }
                                 }
                                 //显示人民币tab
                                 if (parseFloat(data.thisBillAmt)=="0.00"||(parseFloat(data.thisBillAmt)!="0.00"&&parseFloat(data.sholdRepayment)=="0.00")) {
                                     App.showForLint=true;
                                 }
                             }else {
                                 if(parseFloat(data.thisBillAmt)!="0.00"){
                                     if (parseFloat(data.sholdRepayment)!="0.00"||data.stmMinDux!=0) {
                                             App.showRmbLint=true;
                                             //显示外币tab
                                             nowPage='foreignCurrRepay';
                                             messagePageFlag = 'for'
                                             App.changeCardNo2()
                                             App.initTab1();
                                             $("#rmb_pay").removeClass("current");
                                             $("#foreignCurr_pay").addClass("current");
                                         }else{
                                             //显示人民币tab
                                             // App.initMoney_rmb(data,param)
                                             // App.rmbCoin='rmb'
                                             nowPage='rmbRepay';
                                             messagePageFlag = 'rmb'
                                             App.changeCardNo()
                                             App.initTab();
                                             $("#rmb_pay").addClass("current");
                                             $("#foreignCurr_pay").removeClass("current");
                                         }
                                 }else{
                                     //显示人民币tab
                                     // App.rmbCoin='rmb'
                                     nowPage='rmbRepay';
                                     messagePageFlag = 'rmb'
                                     App.changeCardNo()
                                     App.initTab();
                                     $("#rmb_pay").addClass("current");
                                     $("#foreignCurr_pay").removeClass("current");
                                 }
                             } 
                             
                         }else{
                             if (parseFloat(data.thisBillAmt)!="0.00") {
                                 if (parseFloat(data.sholdRepayment)!="0.00"||data.stmMinDux!=0) {
                                     // App.initMoney_for(data)
                                     //显示外币tab
                                     App.showRmbLint=true;
                                     nowPage='foreignCurrRepay';
                                     messagePageFlag = 'for'
                                     App.queryOthBillheadData=data;
                                     App.changeCardNo2()
                                     App.initTab1();
                                     $("#rmb_pay").removeClass("current");
                                     $("#foreignCurr_pay").addClass("current");
                                 }else{
                                     //显示人民币tab
                                     // App.rmbCoin='rmb'
                                     nowPage='rmbRepay';
                                     messagePageFlag = 'rmb'
                                     App.changeCardNo()
                                     App.initTab();
                                     $("#rmb_pay").addClass("current");
                                     $("#foreignCurr_pay").removeClass("current");
                                 }
                                 
                             }else{
                                 // App.initMoney_rmb(data,param);
                                 //显示人民币tab
                                 // App.rmbCoin='rmb'
                                 nowPage='rmbRepay';
                                 messagePageFlag = 'rmb'
                                 App.changeCardNo()
                                 App.initTab();
                                 $("#rmb_pay").addClass("current");
                                 $("#foreignCurr_pay").removeClass("current");
                             }
                         }
 
                     }else{
                         Fw.hideWaitPanel();
                         Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                     }
                 }, Fw.errorAjax);
 
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
             }
         }, Fw.errorAjax);
     },
     initMoney_rmb:function (data,param) {//人民币 加载
         $('.placeholder-header').addClass('hidden');
         App.setDefaultRepayMethod();//恢复默认还款方式
         App.sholdRepayment_rmb = data.sholdRepayment;//已出账单 本期未还金额
         App.minRepayment_rmb = data.stmMinDue;//人民币最低还款额度
         App.thisBillAmt=data.thisBillAmt;//人民币本期账单总金额
         App.thisBillAmtSign = data.thisBillAmtSign;//人民币本期账单正负标示
         if(App.thisBillAmtSign == '+' && parseFloat(data.thisBillAmt)!=0){  //账单总金额
             if(parseFloat(data.sholdRepayment)!=0){//加载已出账单  人民币
                 billFlag_rmb="1";
                 //人民币  加载
                 $('#sholdRepayment').text(Fw.util.Format.fmtMoney(data.sholdRepayment));//本期未还金额
                 App.maxPay=data.sholdRepayment;//本期未还金额   最大还款额  留着点 确定的时候加以判断
                 $('#repayBal').text('¥'+Fw.util.Format.fmtMoney(data.thisBillAmt));//账单总金额
                 $('#minRepayment').text('¥'+Fw.util.Format.fmtMoney(data.stmMinDue));//未还最低还款额 
                 $("#defineMoney").text('¥'+Fw.util.Format.fmtMoney(data.sholdRepayment));
                 $("#minRepayMony").text('¥'+Fw.util.Format.fmtMoney(data.stmMinDue));
                 $(".minRepay.rmb").removeClass("hidden");
                 $(".bill_bottom.rmb").removeClass("hidden");
                 $(".hasnoBill.rmb").addClass("hidden");
                 $(".noPaymentTitle.rmb").text("本期未还");
                 $('.symbol').removeClass('hidden');
                 $("#noPaymentRmb").removeClass("hidden");
                 $("#hasPaymentRmb").addClass("hidden");
                 $("#nobill_rmb").addClass("hidden");
                 
                  if(data.stmMinDue==0){ 
                      $(".minRepay.rmb").addClass("hidden");//最低还隐藏
                     $("#minRepayment").addClass("hidden");
                     $("#minRepayment").prev().text("已还最低").css({"color":"#1BB465"});
                  }else{
                      $(".minRepay.rmb").removeClass("hidden");//最低还显示
                     $("#minRepayment").removeClass("hidden");
                      $("#minRepayment").prev().text("最低还款额").css({"color":"#1A1A1A"});
                      $('#minRepayment').text('¥'+Fw.util.Format.fmtMoney(data.stmMinDue));//未还最低还款额 
                  }
                 isCheck = "0";
             }else{//已出账单还清
                 billFlag_rmb="2";
                 $('#sholdRepayment').text(Fw.util.Format.fmtMoney(data.thisBillAmt));
                 $(".noPaymentTitle.rmb").text("本期账单");
                 $(".hasnoBill.rmb").removeClass("hidden");
                 $(".bill_bottom.rmb").addClass("hidden");
                 $(".minRepay.rmb").addClass("hidden");
                 $('.symbol').removeClass('hidden');
                 $("#noPaymentRmb").addClass("hidden");
                 $("#hasPaymentRmb").removeClass("hidden");
                 $("#nobill_rmb").removeClass("hidden");
                 //未出账单金额
                  var paramRmb={
                             accNo:$('#account').val(),
                             NEXT_KEY:'1',
                             PAGE_SIZE:'5'
                         }
                  Fw.ajaxData(Fw.dataUrl("credit/unApperQueryBillDetail"), paramRmb, function(data){
                         if(data.STATUS=="1"){
                             App.totalPayRmb = data.totalPay;
                             $("#nobillMoneyRmb").html("¥"+Fw.util.Format.fmtMoney(data.totalPay));
                             $("#defineMoney").html("¥"+Fw.util.Format.fmtMoney(data.totalPay));
                             
                             Fw.hideWaitPanel();  
                         }else{
                             Fw.hideWaitPanel();
                             Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                         }
                     }, Fw.errorAjax)
                 
             }
             $("#noPaymentRmb .noBillImg").addClass("hidden");
         }else{ 
             billFlag_rmb="2";
             // $('#sholdRepayment').text("¥0.00");
             $('#sholdRepayment').text("");
             $("#defineMoney").text("¥0.00");
             if(App.thisBillAmtFor == 0 || App.thisBillAmtSign_for == '-'){
                 var _title = "本期账单无欠款";
             }else{
                 var _title = "本期人民币账单无欠款";
             }
             $(".noPaymentTitle.rmb").text(_title);
             $(".hasnoBill.rmb").addClass("hidden");
             $(".bill_bottom.rmb").addClass("hidden");
             $(".minRepay.rmb").addClass("hidden");
             $('.symbol').addClass('hidden');
             $("#noPaymentRmb .noBillImg").removeClass("hidden");
             $("#nobill_rmb").removeClass("hidden");//显示未出账单
             if(App.thisBillAmtSign_for == '+' && App.sholdRepayment_For == 0){
                 $("#hasPaymentRmb").removeClass("hidden");	
                 $("#noPaymentRmb").addClass("hidden");
             }else{
                 $("#hasPaymentRmb").addClass("hidden");	
                 $("#noPaymentRmb").removeClass("hidden");
             }
             //未出账单金额
                  var paramRmb={
                             accNo:$('#account').val(),
                             NEXT_KEY:'1',
                             PAGE_SIZE:'5'
                         }
                  Fw.ajaxData(Fw.dataUrl("credit/unApperQueryBillDetail"), paramRmb, function(data){
                         if(data.STATUS=="1"){
                             App.totalPayRmb = data.totalPay;
                             $("#nobillMoneyRmb").html("¥"+Fw.util.Format.fmtMoney(data.totalPay));
                             $("#defineMoney").html("¥"+Fw.util.Format.fmtMoney(data.totalPay));
                             
                             Fw.hideWaitPanel();  
                         }else{
                             Fw.hideWaitPanel();
                             Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                         }
                     }, Fw.errorAjax)
         }
         if(App.showRmbLint){
             if (parseFloat(data.thisBillAmt)!="0.00" && App.thisBillAmtSign !='-') {
                 if (parseFloat(data.sholdRepayment)=="0.00") {
                     $("#Rmb_H").removeClass('hidden');
                 }
             }else{
                 $("#Rmb").removeClass('hidden');
             }
         }
         //未出账单以及'0010','0110','0210','0310','0410','0510'以外的账户不支持还款金券，隐藏还款金栏
         var arr = ['0010','0110','0210','0310','0410','0510','0060','0062','0040','1010','1060'];
         var accountType = $("#account").find("option:selected").val();
         if (parseFloat(data.thisBillAmt)==0 || parseFloat(data.sholdRepayment)==0 ||arr.indexOf(accountType) == -1) {
             $(".repay_coupon,#repayCoY").addClass("hidden");
             $("#getCoupons").addClass("hidden");
             App.CanRepayCoupon = false;
         }else {
             App.CanRepayCoupon = true;
             $(".repay_coupon,#repayCoY").removeClass("hidden");
             App.getRepayAdvInfo(function(){
                 $("#getCoupons").removeClass("hidden");
             },function(){
                 $("#getCoupons").addClass("hidden");
             });
         }
         App.initAmortize();//查询人民币分期信息
     },
     initMoney_for:function (data) {
         App.setDefaultRepayMethod();//恢复默认还款方式
         App.currType=$('#account option:selected').attr('data-coin');//外币的币种
         App.for_cardType = $('#account option:selected').attr('data-cardType');
         App.thisBillAmt_for=data.thisBillAmt;
         App.sholdRepayment_For = data.sholdRepayment;//用于判断  如果外币没有账单 报 暂无需还款
         App.minRepayment_for = data.stmMinDux;//外币最低应还金额
         App.thisBillAmtSign_for = data.thisBillAmtSign;//外币本期账单正负标示
         if(App.thisBillAmtSign_for == '+' && parseFloat(data.thisBillAmt)!="0.00"){  //账单总金额
             
             if(parseFloat(data.sholdRepayment)!="0.00"){//加载已出账单  
                 if(App.for_cardType == '1' || App.for_cardType == '4'){//有外币的情况
                     $('.discountWrap.for').removeClass('hidden');
                     $('#sholdRepayment1').text(Fw.util.Format.fmtMoney(data.sholdRepayment));//本期未还金额
                     $('#repayBal1').text(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.thisBillAmt));//账单总金额
                     $('#minRepayment1').text(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.stmMinDux));//未还最低还款额 
                     $("#defineMoney1").text(Fw.util.Format.fmtMoney(data.sholdRepayment));
                     $("#minRepayMony1").text(Fw.util.Format.fmtMoney(data.stmMinDux));
                     $("#defineMoney1").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
                     $("#minRepayMony1").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
                 }else{
                     $('#sholdRepayment1').text(Fw.util.Format.fmtMoney(data.sholdRepayment));//本期未还金额
                     $('#repayBal1').text(Fw.util.Format.fmtMoney(data.thisBillAmt));//账单总金额
                     $('#minRepayment1').text(Fw.util.Format.fmtMoney(data.stmMinDux));//未还最低还款额 
                     $("#defineMoney1").text(Fw.util.Format.fmtMoney(data.sholdRepayment));
                     $("#minRepayMony1").text(Fw.util.Format.fmtMoney(data.stmMinDux));
                     $("#defineMoney1").siblings(".currType").html("");
                     $("#minRepayMony1").siblings(".currType").html("");
                 }
                 $('.symbol1').removeClass('hidden').text(Fw.util.Format.fmtCurrType(App.currType));
                 $(".minRepay.for").removeClass("hidden");
                 $(".bill_bottom.for").removeClass("hidden");
                 $(".hasnoBill.for").addClass("hidden");
                 $(".noPaymentTitle.for").text("本期未还");
                 
                 $("#noPaymentFor").removeClass("hidden");
                 $("#hasPaymentFor").addClass("hidden");
                 $("#nobill_for").addClass("hidden");
                 $(".tipsFor").addClass("hidden");
                 $("#forBtn").removeClass("hidden");
                 $(".repaymentMode.defineRepay.for").removeClass("hidden");
                 if(data.stmMinDux==0){   
                     $(".minRepay.for").addClass("hidden");//最低还隐藏
                     $("#minRepayment1").addClass("hidden");
                     $("#minRepayment1").prev().text("已还最低").css({"color":"#1BB465"});
                 }else{
                     $(".minRepay.for").removeClass("hidden");//最低还显示
                     $("#minRepayment1").removeClass("hidden");
                      $("#minRepayment1").prev().text("最低还款额").css({"color":"#1A1A1A"});
                      $('#minRepayment1').text(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.stmMinDux));//未还最低还款额 
                 }
                 
                 //加载分期信息,如果用户进主页面，直接点“外币”，分期信息可能会没有请求到，App.AmortizeList为undefined,需要再调一下接口
                 var url=Fw.dataUrl("bystages/queryCanStag");
                 Fw.openWaitPanel();
                 if(Fw.isEmpty(App.AmortizeList)){
                     
                     Fw.ajaxData(url,{}, function(data){
                         if(data.STATUS=="1"){
                             App.AmortizeList=data.acctList;
                             App.afterInitAmortizeFor();
                         }
                     }, Fw.errorAjax);
                 }else{
                     App.afterInitAmortizeFor();
                 }
                
                 //    一期加上的，后面要去掉
                 isCheck = "0";
             }else{//已出账单还清
                 if(App.for_cardType == '1' || App.for_cardType == '4'){//有外币的情况
                     $('#sholdRepayment1').text(Fw.util.Format.fmtCurrType(App.currType)+data.thisBillAmt);
                     $("#defineMoney1").text("0.00");
                     $("#defineMoney1").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
                 }else{
                     $('#sholdRepayment1').text(data.thisBillAmt);
                     $("#defineMoney1").siblings(".currType").html("");
                     $("#defineMoney1").text("0.00");
                 }
                 $('.symbol1').addClass('hidden');
                 $(".noPaymentTitle.for").text("本期账单");
                 $(".minRepay.for").addClass("hidden");
                 $(".amortize.for").addClass("hidden");
                 $(".bill_bottom.for").addClass("hidden");
                 $(".hasnoBill.for").removeClass("hidden");
                 $("#noPaymentFor").addClass("hidden");
                 $("#hasPaymentFor").removeClass("hidden");
                 $("#nobill_for").removeClass("hidden");
                 $(".tipsFor").removeClass("hidden");
                 $("#forBtn").addClass("hidden");
                 $(".repaymentMode.defineRepay.for").addClass("hidden");
                 
                 //未出账单金额
                  var paramFor={
                             accNo:$('#account').val(),
                             NEXT_KEY:'1',
                             PAGE_SIZE:'5'
                         }
                  Fw.ajaxData(Fw.dataUrl("credit/unApperQueryBillDetail"), paramFor, function(data){
                         if(data.STATUS=="1"){
                             $("#nobillMoneyFor").html(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.totalPay2));
                             Fw.hideWaitPanel();  
                         }else{
                             Fw.hideWaitPanel();
                             Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                         }
                     }, Fw.errorAjax)
                 
             }
             $("#noPaymentFor .noBillImg").addClass("hidden");
         }else{ 
                 $('.symbol1').addClass('hidden');
                 $('#sholdRepayment1').text("");
                 $("#defineMoney1").text("0.00");
                 $("#defineMoney1").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
                 $("#nobill_for").removeClass("hidden");
                 $(".tipsFor").removeClass("hidden");
                 $("#forBtn").addClass("hidden");
                 $(".repaymentMode.defineRepay.for").addClass("hidden");
                 //未出账单金额
                  var paramFor={
                             accNo:$('#account').val(),
                             NEXT_KEY:'1',
                             PAGE_SIZE:'5'
                         }
                  Fw.ajaxData(Fw.dataUrl("credit/unApperQueryBillDetail"), paramFor, function(data){
                         if(data.STATUS=="1"){
                             $("#nobillMoneyFor").html(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.totalPay2));
                             Fw.hideWaitPanel();  
                         }else{
                             Fw.hideWaitPanel();
                             Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                         }
                     }, Fw.errorAjax)
             if(App.thisBillAmt == 0 || App.thisBillAmtSign == '-'){
                 var _title = "本期账单无欠款";
             }else{
                 var _title = "本期外币账单无欠款";
             }
             $(".noPaymentTitle.for").text(_title);
             $(".minRepay.for").addClass("hidden");
             $(".amortize.for").addClass("hidden");
             $(".bill_bottom.for").addClass("hidden");
             $(".hasnoBill.for").addClass("hidden");
             
             $("#noPaymentFor .noBillImg").removeClass("hidden");
             if(App.thisBillAmtSign == '+' && App.thisBillAmt != 0 && App.sholdRepayment_rmb == 0){
                 $("#hasPaymentFor").removeClass("hidden");	
                 $("#noPaymentFor").addClass("hidden");
             }else{
                 $("#hasPaymentFor").addClass("hidden");	
                 $("#noPaymentFor").removeClass("hidden");
             }
         }  
         if(App.showForLint){
             if (parseFloat(data.thisBillAmt)!="0.00" && App.thisBillAmtSign_for !='-') {
                 if (parseFloat(data.sholdRepayment)=="0.00") {
                     $("#For_H").removeClass('hidden');
                 }
             }else{
                 $("#For").removeClass('hidden');
             }
         }
         App.maxPay2=data.sholdRepayment//本期未还金额   最大还款额  留着点 确定的时候加以判断
     },
     initTab: function () {
         if(Fw.Toolbar){
             var toolbar=  new Fw.Toolbar({
                 contentEl : 'toolbar',
                 spanShow: "1",
                 items : [ {
                     text : '人民币',           //tab内容
                     func : 'App.changeTitle1()',    //点击回调函数
                     active : true,				//是否激活
                     itemActiveCls:'current',  //当前激活tab
                     targetContent:'rmb_pay' //tab对应页面id
                 }, {
                     text : '外币',
                     func : 'App.changeTitle2()',
                     targetContent:'foreignCurr_pay'
                 }]
             });
         }else{
             setTimeout(function(){
                 App.initTab();
             },200);
         }
     },
     initTab1: function () {
         if(Fw.Toolbar){
             var toolbar=  new Fw.Toolbar({
                 contentEl : 'toolbar',
                 spanShow: "1",
                 items : [ {
                     text : '人民币',           //tab内容
                     func : 'App.changeTitle1()',    //点击回调函数
                     targetContent:'rmb_pay' //tab对应页面id
                 }, {
                     text : '外币',
                     func : 'App.changeTitle2()',
                     active : true,				//是否激活
                     itemActiveCls:'current',  //当前激活tab
                     targetContent:'foreignCurr_pay'
                 }]
             });
         }else{
             setTimeout(function(){
                 App.initTab1();
             },200);
         }
     },
     changeTitle1:function(){
 
         // alert('changeTitle1');
         changeAmortizeVal = false;
         changeVal = false;
         $('.digitTips').hide();
         $('.digitTips1').hide();
         //$("#account").val($("#account1").val());//关联账户
         nowPage='rmbRepay';
         messagePageFlag = 'rmb';
         App.changeRmbForTitle();
         App.accountChange = 'rmb';//标识在切换人民币账户
         App.initCardNo('rmb');
         //App.initMoney();
     },
     changeTitle2:function(){
         if(App.queryOthBillheadData){
             delete App.queryOthBillheadData;
         }
         changeAmortizeVal = false;
         changeVal = false;
         $('.digitTips').hide();
         $('.digitTips1').hide();
         //$("#account1").val($("#account").val());//关联账户
         nowPage='foreignCurrRepay';
         messagePageFlag = 'for';
 //    	App.changeRmbForTitle();
         App.accountChange = 'forC';//标识在切换外币账户
         App.initCardNo('forC');
         //App.initForMoney();//加载外币账单
         
     },
     changeRmbForTitle:function(){
         App.pageA.attr('title','立即还款');
         App.initTitle();
     },
     initTitle:function(){//初始化页面标题
         Fw.Client.initPageTitle($("#pageA"));
     },
     //==========新增==========
     showCoupon: function(){
         if(!(App.resp&&App.encryptInfo)){
             Fw.Form.showPinLabel($('.repay_coupon'),'还款金信息暂未查到，请稍后重试',focus);
             return;
         }
         var url = NS.TRUNK?"https://prefacty.creditcard.cmbc.com.cn/repayment/#/?state=appMyCoupons&channelType=02&usrType=04&resp=":"https://test.creditcard.cmbc.com.cn/repayment/#/?state=appMyCoupons&channelType=02&usrType=04&resp=";
         url += (App.resp+'&encryptInfo='+App.encryptInfo);
         Fw.openNewWebPanel(url,{},function () {
             if (Fw.os == 'android') {
                 x5CallNative('setWatiPanel', {
                     "status": "1",
                     success: "",
                     "delay":"0"
                 }, 'UI');
                 setTimeout(function(){
                     App.couponDiscount('1');
                 },1500);
             }else {
                 App.couponDiscount('1');
             }
         });
     },
     couponDiscount :function(_flag){
         Fw.openWaitPanel();
         var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
         var params={
             repayFlag:"2"//存取标识 1存  2 取
         };
         Fw.ajaxData(url,params, function(data1){
             if(data1.STATUS=="1"){
                 var params1 = {
                     billFlag_rmb:billFlag_rmb,
                     accountType:$("#account").find("option:selected").val(),
                     repayBal:data1.RmbMoney+'',
                     serialNum:App.serialNum||""
                 };
                 if (App.orderNumRmb) {
                     params1.cardNo = App.orderNumRmb;
                 }else {
                     return false;
                 }
                 var url2 = Fw.dataUrl('repay/queryRepayCouponList');
                 Fw.ajaxData(url2,params1,function (data) {
                     if (data){
                         if (data.resp && data.encryptInfo) {
                             App.resp = data.resp;
                             App.encryptInfo = data.encryptInfo;
                         }
                         if (data.STATUS == "1"){
                             Fw.hideWaitPanel();
                             $("#discountVal").text("-¥"+Fw.util.Format.fmtMoney(data.couponDiscount));//抵扣金额
                             $('.realMoney').html('实际扣款<span id="realVal">¥'+Fw.util.Format.fmtMoney(data.actualBal)+'</span>');
                             App.serialNum = data.serialNum;
                             App.isUseRepayCoupon = data.isUseRepayCoupon;
                             App.actualBal = data.actualBal;
                             //判断是否是最大优惠
                             if (data.isMaxDiscount && data.isMaxDiscount == true ) {
                                 $('.discountTips').removeClass('hidden');
                             }else{
                                 $('.discountTips').addClass('hidden');
                             }
                             //判断优惠券是否可用
                             if(!_flag){
                                 App.noCoupon = data.noCoupon;
                                 App.couponAvaliable = data.couponAvaliable;
                                 App.hasValidRepayAdv = data.hasValidRepayAdv;
                             }
                             if (App.couponAvaliable && App.noCoupon && App.noCoupon == '1') {//有还款金券并且还款金券不可用
                                 $('.noCoupon').removeClass('hidden');
                                 $('#discountVal,.realMoney,.discountTips').addClass('hidden');
                             }else if(App.couponAvaliable && App.noCoupon && App.noCoupon == '0'){//有还款金券并且还款金券可用
                                 $('.noCoupon').addClass('hidden');
                                 $('#discountVal,.realMoney').removeClass('hidden');
                             }else if(!App.couponAvaliable){//无还款金券
                                 $('.repay_coupon').addClass('hidden');
                             }
                         }else {
                             Fw.hideWaitPanel();
                             $('#discountVal,.realMoney,.discountTips').addClass('hidden');
                             $('.noCoupon').removeClass('hidden');
                         }
                     }
 
                 },Fw.errorAjax);
             }
         }, Fw.errorAjax);
     },
     showSelectAccount1: function(){//人民币选择扣款账号
         App.serialNum = '';//流水号置空，下次还款的时候生产新流水号
         $('.noCoupon').addClass('hidden');
         $("#pageA").css({"position":"fixed","width":"100%"});
         Fw.outPageBuriedPoint("立即还款页面202012_首页");
         Fw.buriedPoint("立即还款页面202012_详情页");
         $(".selectAccount.account").addClass("hidden");
         $(".selectAccount.rmb").removeClass("hidden");
         $(".selectAccount.rmb").animate({"bottom":"0"});
         $("#repay_accountRmb").text($("#account").find("option:selected").text()+"—人民币");
 //        Fw.openWaitPanel();
         var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
         var params={
                 repayFlag:"2"//存取标识 1存  2 取
         };
         Fw.ajaxData(url,params, function(data){
             if(data.STATUS=="1"){
 //            	 Fw.hideWaitPanel();
                 App.couponDiscount2(data);
                 $("#repay_rmbmoney").text("¥"+Fw.util.Format.fmtMoney(data.RmbMoney));
             }
         }, Fw.errorAjax);
         var bankAccount = $($("#rmbCardNoList .bankAccount")[0]).text();
         if(Fw.isEmpty(bankAccount)){
             $("#debitCardNo").removeClass('hidden');
             $("#fmtDebitCardNo").addClass('hidden');
         }else{
             $("#debitCardNo").addClass('hidden');
             $("#fmtDebitCardNo").removeClass('hidden').text(Fw.util.Format.fmtAcctNo_hidden(bankAccount));
         }
         $("#debitCardNo").val(bankAccount);
         if(!Fw.isEmpty($("#debitCardNo").val())){
             App.queryCardBalaRmb();
         }else{
             $("#balance").parent().addClass("hidden");
         }
         if(!Fw.isEmpty($("#debitCardNo").val()) && !Fw.isEmpty($("#creditCardRmb").html())){//如果有常用还款账号，查余额
             $("#repayRmb").removeAttr("disabled");
             $("#repayRmb").css({"opacity":1});
              
         }else{
             $("#repayRmb").attr("disabled","disabled");
             $("#repayRmb").css({"opacity":0.5});
         }
         App.bankCardJudg();
         // App.queryBankInfoByKBin(); 
     },
     showSelectAccount2: function(){
        App.multtiplyRepayRmb();
        App.showSelectAccount_forPage();
     },
     multtiplyRepayRmb: function(){
         if(Fw.isEmpty(App.forrate)){
             setTimeout(function(){
                 App.multtiplyRepayRmb();
             },500);
             return;
         }
         Fw.openWaitPanel();
         var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
         var params={
                 repayFlag:"2"//存取标识 1存  2 取
         };
         Fw.ajaxData(url,params, function(data){
             if(data.STATUS=="1"){
                  Fw.hideWaitPanel();
                  $("#repay_formoney").html(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(data.OthMoney));
                  //外币换算成人民币，从缓存里拿到外币的值
                  var url=Fw.dataUrl('repay/multtiplyRepayRmb');
                      var param={
                              reppayM:Fw.util.Format.unfmtAmt(data.OthMoney),
                              rate:App.forrate
                      };
                  Fw.ajaxData(url,param, function(data){
                      Fw.hideWaitPanel();
                      if(data.STATUS=="1"){
                          App.rateRmb=data.rateRmb;//付款的时候用
                          App.for_h = Fw.util.Format.fmtMoney(App.rateRmb).replace(/,/g, "");
                          $("#virtualMoney").html(Fw.util.Format.fmtMoney(App.rateRmb));
                      }
                  }, Fw.errorAjax);
             }
         }, Fw.errorAjax);
     },
     showSelectAccount_forPage: function(){
         $("#pageA").css({"position":"fixed","width":"100%"});
         Fw.outPageBuriedPoint("立即还款页面202012_首页");
         Fw.buriedPoint("立即还款页面202012_详情页");
         $(".selectAccount.account").addClass("hidden");
         $(".selectAccount.for").removeClass("hidden");
         $(".selectAccount.for").animate({"bottom":"0"});
         var val = $("#account").find("option:selected").text().substr(4,2);
         $("#repay_accountFor").html($("#account").find("option:selected").text()+"—"+val);
         App.methodFlag = $(".forRepayMethod[data-check='1']").attr("data-method");//提前获取外币还款方式标记，用于判断确定按钮是否置灰
         var bankAccount = $($("#forCardNoList .bankAccount")[0]).text();
         if(Fw.isEmpty(bankAccount)){
             $("#debitCardNo1").removeClass('hidden');
             $("#fmtDebitCardNo1").addClass('hidden');
         }else{
             $("#debitCardNo1").addClass('hidden');
             $("#fmtDebitCardNo1").removeClass('hidden').text(Fw.util.Format.fmtAcctNo_hidden(bankAccount));
         }
         $("#debitCardNo1").val(bankAccount);
         if(!Fw.isEmpty($("#debitCardNo1").val())){
             App.queryCardBalaRmb();
         }else{
             $("#balance1").parent().addClass("hidden");
         }
         // App.queryBankInfoByKBin(); 
     },
     hideSelectAccount: function(flag){
         $(".shade").hide();
         $("#pageA").css({"position":"static"});
         $(".selectAccount").animate({"bottom":"-100%"},500,function(){
             $(".selectAccount").addClass("hidden");
         });
         $(".agreeRepay_rule").find("img").attr("src","./img/noElect1.png");
         $(".agreeRepay_rule").attr("data-id","0");
         if(this.className && this.className == 'close'){
             $('#debitCardNo').val('');
             Fw.inPageBuriedPoint("立即还款页面202012_首页");
         }
         isCheck = "0";
     },
     selectRepaymentMode: function(){
         
         $(this).siblings(".repaymentModeBar").find("img.elect").attr("src","./img/noElect2.png");
         $(this).siblings(".repaymentModeBar").find(".edit img").attr("src","./img/noEdit.png");
         $(this).find("img.elect").attr("src","./img/elect2.png");
         $(this).find(".edit img").attr("src","./img/edit.png");
         $(this).siblings(".repaymentModeBar").find(".changeColor").removeClass("font-color");
         $(this).siblings(".repaymentModeBar").find(".changeColor2").removeClass("font-color2");
         $(this).siblings(".repaymentModeBar").find(".changeColor3").removeClass("font-color3");
         $(this).find(".changeColor").addClass("font-color");
         $(this).attr("data-check","1");
         $(this).siblings(".repaymentModeBar").removeAttr("data-check");
         if($(this).hasClass("amortizeRepay")){
             $(this).find(".changeColor2").addClass("font-color2");
             $(this).find(".changeColor3").addClass("font-color3");
             $(this).find(".amortizeDetail").removeClass("hidden");
             $(this).find(".amortizeDetail_new").removeClass("hidden");
             document.scrollingElement.scrollTop = 500;//确保分期详情全屏展示
             var _btn = nowPage=='rmbRepay' ? $('#rmbBtn') : $('#forBtn');
             var redPacketTip = nowPage=='rmbRepay' ? $('.redPacketTip.rmb') : $('.redPacketTip.for');
             if(App.haveRedPacket == '1'){
                 _btn.text('下一步');
                 redPacketTip.removeClass('hidden');
             }else{
                 _btn.text('确定');
                 redPacketTip.addClass('hidden');
             }
         }else{
             $(this).siblings(".repaymentModeBar.amortizeRepay").find(".amortizeDetail").addClass("hidden");
             $(this).siblings(".repaymentModeBar.amortizeRepay").find(".amortizeDetail_new").addClass("hidden");
             $('#rmbBtn,#forBtn').text('确定');
         }
     },
     editDefine: function(){
         $('.digitTips').hide();
         $(this).parent().find(".label").addClass("hidden");
         $(this).parent().find("input").removeClass("hidden").focus().val("");
         $('.tips').hide();
         // $(this).find(".finish").removeClass("hidden");
         $(this).parent().find('.edit').addClass("hidden");
         App.edict=false;
     },
     editAmortize: function(){
         $('.digitTips1').hide();
         $(this).parent().siblings('.edit').addClass("hidden");
         if(nowPage=="rmbRepay"){
             $("#amortizeMoneyRmb").parent().addClass("hidden");
             $("#editAmortize").removeClass("hidden");
             $("#editAmortize").focus();
             $("#editAmortize").val("");
             $("#rmbBtn").css({"opacity":0.5}).attr("disabled","disabled");
        }else if(nowPage=="foreignCurrRepay"){
            $("#amortizeMoneyFor").parent().addClass("hidden");
            $("#editAmortize1").removeClass("hidden");
            $("#editAmortize1").focus();
            $("#editAmortize1").val("");
            $("#forBtn").css({"opacity":0.5}).attr("disabled","disabled");
        }
         App.AmortizeEdict=false;
     },
     finishDefine: function(){
         if(nowPage=="rmbRepay"){
             $("#rmb_pay .defineRepay .right").find(".edit").removeClass("hidden");
             var val = $("#editDefine").val();
             if(val==0){
                 val=App.sholdRepayment_rmb;
                 if(App.sholdRepayment_rmb==0){
                     val = App.totalPayRmb;
                 }
             }
             $("#editDefine,.clear").addClass("hidden");
             $("#defineMoney").html("¥"+Fw.util.Format.fmtAmt(val));
             if(changeVal == true){
                 App.moneyTips(Fw.util.Format.fmtAmt(val),$('.digitTips'),8);
             }
             $("#rmb_pay .defineRepay .right").find(".label").removeClass("hidden");
               
         }else if(nowPage=="foreignCurrRepay"){
             $("#foreignCurr_pay .defineRepay .right").find(".edit").removeClass("hidden");
             var val1 = $("#editDefine1").val();
             if(val1==0){val1=App.sholdRepayment_For}
             $("#editDefine1,.clear").addClass("hidden");
             $("#defineMoney1").html(Fw.util.Format.fmtAmt(val1));
             if(changeVal == true){
                 var _len = Fw.util.Format.fmtCurrType(App.currType).length;
                 var _right = _len == 1 ? 8 : 10;
                 App.moneyTips($("#defineMoney1").html(),$('.digitTips'),_right);
             }
             $("#foreignCurr_pay .defineRepay .right").find(".label").removeClass("hidden");
         }
         App.edict=true;
         App.money = [];
     },
     finishAmortize_rmb:function(){
         var val = Fw.util.Format.unfmtAmt($("#editAmortize").val());
         if(val==0){
             //Fw.alertinfo("请输入您要申请的分期金额");
             $("#rmb_pay .amortize .finish").addClass("hidden");
             $("#rmb_pay .amortize .finish").siblings("img").removeClass("hidden");
             $("#editAmortize").addClass("hidden");
             $("#amortizeMoneyRmb").html("¥"+Fw.util.Format.fmtAmt(App.rmbStm));
             App.repaySubtract(App.sholdRepayment_rmb,App.rmbStm,1);
             $("#amortizeMoneyRmb").parent().removeClass("hidden");
             $("#rmbBtn").css({"opacity":1}).removeAttr("disabled");
             App.AmortizeEdict=true;
         }else if(parseFloat(val)<parseFloat(600)){
              $("#amortizeMoneyRmb").html("¥"+Fw.util.Format.fmtAmt(600));
              $("#amortizeMoneyRmb").parent().removeClass("hidden");
              App.repaySubtract(App.sholdRepayment_rmb,600,1);
              Fw.alertinfo("最低申请金额为¥600.00，已为您更改为最低申请金额","提示");
         }else if(parseFloat(val)>parseFloat(App.rmbStm)){
             $("#amortizeMoneyRmb").html("¥"+Fw.util.Format.fmtAmt(App.rmbStm));
              $("#amortizeMoneyRmb").parent().removeClass("hidden");
              App.repaySubtract(App.sholdRepayment_rmb,App.rmbStm,1);
              Fw.alertinfo("最高申请金额为"+App.rmbStm+"，已为您更改为最高申请金额","提示");
         }else {
               $("#amortizeMoneyRmb").text("¥"+Fw.util.Format.fmtAmt(val));
               $("#amortizeMoneyRmb").parent().removeClass("hidden");
               var val2=$("#editAmortize").val()
               App.repaySubtract(App.sholdRepayment_rmb,val2,1);
         }
         if (changeAmortizeVal == true) {
             App.moneyTips($("#amortizeMoneyRmb").text().replace('¥',''),$('.digitTips1'),0.03);
         }
         App.AmortizeEdict=true;
         $("#rmb_pay .amortize .finish").addClass("hidden");
         $("#rmb_pay .amortize .edit").removeClass("hidden");
         $("#rmb_pay .amortize .clear").addClass("hidden");
         $("#editAmortize").addClass("hidden");
         $("#rmbBtn").css({"opacity":1}).removeAttr("disabled");
         App.refreshStagAmt(); //初始化 每期手续和金额
     },
     finishAmortize_for:function(){
         var val = Fw.util.Format.unfmtAmt($("#editAmortize1").val());
         if(parseFloat(App.othStm)>parseFloat(App.sholdRepayment_For)){
                 var othStm = App.sholdRepayment_For;
             }else{
                 var othStm = App.othStm;
             }
         if(val==0){
             //Fw.alertinfo("请输入您要申请的分期金额");
              $("#amortizeMoneyFor").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
             App.AmortizeEdict=true;
             $("#foreignCurr_pay .amortize .finish").addClass("hidden");
             $("#foreignCurr_pay .amortize .finish").siblings("img").removeClass("hidden");
             $("#editAmortize1").addClass("hidden");
             $("#amortizeMoneyFor").html(Fw.util.Format.fmtAmt(othStm));
             App.repaySubtract(App.sholdRepayment_For,othStm,2);
              $("#amortizeMoneyFor").parent().removeClass("hidden");
             $("#forBtn").css({"opacity":1}).removeAttr("disabled");
             return false;
         }else if(val&&parseFloat(val)<parseFloat(App.minAmt)){
             $("#amortizeMoneyFor").html(Fw.util.Format.fmtAmt(App.minAmt));
             $("#amortizeMoneyFor").parent().removeClass("hidden");
             App.repaySubtract(App.sholdRepayment_For,App.minAmt,2);
             Fw.alertinfo("最低申请金额为"+Fw.util.Format.fmtCurrType(App.currType)+App.minAmt+"，已为您更改为最低申请金额","提示");
         }else if(val&&parseFloat(val)>parseFloat(othStm)){
              $("#amortizeMoneyFor").html(Fw.util.Format.fmtAmt(othStm));
              $("#amortizeMoneyFor").parent().removeClass("hidden");
              App.repaySubtract(App.sholdRepayment_For,othStm,2);
              Fw.alertinfo("最高申请金额为"+Fw.util.Format.fmtCurrType(App.currType)+othStm+"，已为您更改为最高申请金额","提示");
         }else {
               $("#amortizeMoneyFor").text(Fw.util.Format.fmtAmt(val));
               $("#amortizeMoneyFor").parent().removeClass("hidden");
               var val2 = $("#editAmortize1").val();
               App.repaySubtract(App.sholdRepayment_For,val2,2);
         }
         $("#amortizeMoneyFor").siblings(".currType").html(Fw.util.Format.fmtCurrType(App.currType));
         App.AmortizeEdict=true;
         $("#foreignCurr_pay .amortize .finish").addClass("hidden");
         $("#foreignCurr_pay .amortize .edit").removeClass("hidden");
         $("#foreignCurr_pay .amortize .clear").addClass("hidden");
         $("#editAmortize1").addClass("hidden");
         $("#forBtn").css({"opacity":1}).removeAttr("disabled");
         if (changeAmortizeVal == true) {
             var _len = Fw.util.Format.fmtCurrType(App.currType).length;
             var _right = _len == 1 ? 0.03 : 0.15;
             App.moneyTips($("#amortizeMoneyFor").text().replace('¥',''),$('.digitTips1'),_right);
         }
         App.refreshStagAmt(); //初始化 每期手续和金额
     },
     agreeRate: function(){
         $(this).toggleClass("isAgree");
         App.isAgree = $(this).hasClass("isAgree");
         App.judgeButton_for();
         if(App.isAgree){
             $(this).find("img").attr("src","./img/elect1.png");
         }else{
             $(this).find("img").attr("src","./img/noElect1.png");
             $("#repayFor").css({"opacity":"0.5"});
             $("#repayFor").attr("disabled","disabled");
         }
         $("#debitCardNo1").next(".closeImg").addClass("hidden");
     },
     judgeButton_for:function(){//判断外币还款方式页面确定按钮是否置灰
          if(App.methodFlag=="x"&&App.isAgree&& !Fw.isEmpty($("#creditCardFor").html())){
              $("#repayFor").css({"opacity":"1"});
              $("#repayFor").removeAttr("disabled");
          }else if(App.methodFlag=="b"&&App.isAgree && !Fw.isEmpty($("#creditCardFor").html())){
              var minLength = $("#debitCardNo1").attr("data-minlength");
             var account = $("#debitCardNo1").val().replace(/ /g,'').substr(0,20);
             $("#debitCardNo1").val(Fw.util.Format.fmtAcctNo(account));
              if(account&&account.length>=minLength){
                  $("#repayFor").css({"opacity":"1"});
                  $("#repayFor").removeAttr("disabled");
                  App.queryCardBalaRmb();//查余额
              }else{
                  $("#repayFor").css({"opacity":"0.5"});
                  $("#repayFor").attr("disabled","disabled");
                  $("#balance1").parent().addClass("hidden");
              }
          }
          if(App.methodFlag=="b"){//判断余额
              var minLength = $("#debitCardNo1").attr("data-minlength");
             var account = $("#debitCardNo1").val().replace(/ /g,'').substr(0,20);
             $("#debitCardNo1").val(Fw.util.Format.fmtAcctNo(account));
               if(account&&account.length>=minLength){
                   App.queryCardBalaRmb();//查余额
               }else{
                   $("#balance1").parent().addClass("hidden");
               }
             
             if(account&&account.length>0){
                   $("#debitCardNo1").next(".closeImg").removeClass("hidden");
               }else{
                   $("#debitCardNo1").next(".closeImg").addClass("hidden");
               }
             //   App.queryBankInfoByKBin();  
          }
     },
   //====================
     
     
     confirm1:function(){//人民币还款   确认进入子页面
         $('.digitTips1').hide();
         $('.digitTips').hide();
         changeVal = false;	
         changeAmortizeVal = false;
         if(App.edict==true){
             var isAmortize = $(".repaymentModeBar.rmb[data-check='1']").hasClass("amortizeRepay");
             var repayMoney = $(".repaymentModeBar.rmb[data-check='1']").find(".rmbMoney").text().substring(1);
             if(isAmortize){//如果有分期模块，跳转到账单分期页面
                 Fw.buriedPoint("立即还款页面202012_首页_分期还确定");
                 if(App.insType&&App.insType == "X" || App.haveRedPacket == '1'){//大额
                     $("#pageA").attr("data-btnRight",'false|自动还款|App.autoPayment()');
                     Fw.initPageTitle($("#pageA"));
                     Fw.outPageBuriedPoint("立即还款页面202012_首页");
                     Fw.redirect("../divide/bill_bystages/billByStafes.html",{
                         accountVal:$("#account").val(),
                         page_Flag: "rmbRepay",
                         money: $("#amortizeMoneyRmb").text().substring(1),
                         stagNum:App.dataNum
                     });
                 }else{//普通
                     if($("#contract_agree").hasClass("agreeCon")){
                         if(Fw.isEmpty(App.totalSch)){
                             return false;
                         }
                         //申请账单分期逻辑
                         if(navigator.onLine){
                             $(".shade").show();
                         }
                         App.queryBillheadTryAmt();
                     }else{
                         Fw.Form.showPinLabel(App.pageA, "请阅读并勾选协议", false);
                     }
                 }
             }else{
                 if(repayMoney!=0){
                     if ($(".repaymentModeBar.rmb[data-check='1']").hasClass('defineRepay')) {
                         Fw.buriedPoint("立即还款页面202012_首页_还款确定");
                     } else {
                         Fw.buriedPoint("立即还款页面202012_首页_还最低确定");
                     }
                     if(navigator.onLine){
                         $(".shade").show();
                     }
                     Fw.openWaitPanel();
                     var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
                     var params={
                             repayRmbMoney:Fw.util.Format.unfmtAmt(repayMoney)+"",//还款金额
                             repayFlag:"1"//存取标识 1存  2 取
                     };
                     Fw.ajaxData(url,params, function(data){
                         if(data.STATUS=="1"){//存储成功之后再跳转页面
                              Fw.hideWaitPanel();
                              App.checkUsrPayPwdIsOpen(App.showSelectAccount1,function(){
                                  //Fw.redirect("../safetySett/paysett/newPayPass/newPayPassA.html");
                                  Fw.outPageBuriedPoint("立即还款页面202012_首页");
                                 Fw.redirect('/mbank/page/safetySett/payPwd/payPwd.html');
                              })
                         }
                     }, Fw.errorAjax);
                     
                 }else{
                     Fw.Form.showPinLabel(App.pageA,"还款金额必须大于0",focus);
                 }
             }
             
             
         }else{
             Fw.alertinfo("请确定金额")
         }
     },
     validate_rmb:function () {
         Fw.openWaitPanel();
         var url=Fw.dataUrl('repay/queryDebitCardBal');
         var debitCardNo = $('#debitCardNo').val().replace(/ /g,"");
         App.repayParam={
                 billFlag_rmb:billFlag_rmb,
                 debitCardNo:debitCardNo,
                 repayBal:Fw.util.Format.unfmtAmt($(".repaymentModeBar.rmb[data-check='1']").find(".rmbMoney").text().substring(1)),
                 repayType:'rmb',
                 cardNo:App.orderNumRmb,
                 actualRepayBal:App.actualBal
         };
         if(debitCardNo.match(/\*/) && $('#debitCardNo').attr('data-orderNum')){
             App.repayParam.orderNum = $('#debitCardNo').attr('data-orderNum');
             App.repayParam.inputFlag = '0';
             App.repayParam.cardFlag = '1';
         }else{
             App.repayParam.inputFlag = '1';
         }
         if(billFlag_rmb=="1"){
             App.repayParam.sholdRepayment1 = Fw.util.Format.unfmtAmt($("#sholdRepayment").text());
         }else if(billFlag_rmb=="2"){
             App.repayParam.sholdRepayment2 = App.totalPayRmb+"";
         }
         if(Fw.isEmpty(App.repayParam.debitCardNo)){
             return false;
         }
         Fw.ajaxData(url,App.repayParam, function(data){
             if(data.STATUS=="1"){
                  //Fw.hideWaitPanel();
                 //通过这个标志  知道点击验证框上的确认按钮是加载 人民币还是外币 的结果页面
                 App.showSign='rmb';
                 App.financeOrgId = data.financeOrgId;//金融机构号  后台使用
                 App.isNeedSign = data.isNeedSign;//是否需要签约协议快捷支付
                 App.protocolNo = data.protocolNo || "";//协议号
                 App.thirdFlag = data.thirdFlag || "";//第三方标识(SS01富友 SS02通联)
                 if(data.isNeedSign == "1"){
                     Fw.buriedPoint("立即还款页面202012_首次签约");
                     Fw.confirm("1.请确保扣款借记卡账户与信用卡账户的客户信息和预留手机号一致。\n2.本次短信验证码由扣款银行发送。", "提示", function () {
                         App.timer2();
                     }, function () {
                     }, "确定", "取消");
                 }else{
                      App.timer();
                 }
                 Fw.hideWaitPanel();
             }else{
                 Fw.hideWaitPanel();
                 if(data.MSG.match(/不支持|不能超过/)){
                     return;
                 }
                 Fw.alertinfo(data.MSG,'提示');
             }
         }, Fw.errorAjax);
             
     },
     validate_for:function () {
          App.showSign='foregin_curr';
          App.repayParam={
                 repayBal:Fw.util.Format.unfmtAmt($("#virtualMoney").text()),
                 cardNo:App.orderNumFor,
                 repayAmtOth:App.repaymoney_for,
                 ratePrice:App.forrate,
                 coinType:$('#account option:selected').attr('data-coin')
         };
         if(parseFloat(App.repaymoney_for) > parseFloat(App.sholdRepayment_For)){
             App.repaymoney_for = App.sholdRepayment_For;
             var _currtype = Fw.util.Format.fmtCurrType(App.currType);
             Fw.alertinfo("购汇最大还款金额为"+_currtype +Fw.util.Format.fmtMoney(App.sholdRepayment_For) +"，已为您更改为最大金额");
             $("#defineMoney1").text(Fw.util.Format.fmtMoney(App.sholdRepayment_For));
             var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
             var params={
                     repayOthMoney:Fw.util.Format.unfmtAmt(App.sholdRepayment_For)+"",//还款金额
                     repayFlag:"1"//存取标识 1存  2 取
             };
             Fw.ajaxData(url,params, function(data){
                 if(data.STATUS=="1"){//存储成功
                     App.multtiplyRepayRmb();	
                 }
             }, Fw.errorAjax);
             return;
         }
         Fw.openWaitPanel();
         if(App.methodFlag=='x'){//信用卡溢缴款还款方式
             // var urlRel = Fw.dataUrl('repay/queryOtherCoinAmt', false);
             App.repayParam.debitCardNo="";
             App.timer();
             Fw.hideWaitPanel();
         }else if(App.methodFlag=='b'){
             App.repayParam.debitCardNo=$('#debitCardNo1').val().replace(/ /g,"");
             if(Fw.isEmpty(App.repayParam.debitCardNo) || Fw.isEmpty(App.repayParam.repayBal) || Fw.isEmpty(App.repayParam.ratePrice)){
                 return false;
             }
             if(App.repayParam.debitCardNo.match(/\*/) && $('#debitCardNo1').attr('data-orderNum')){
                 App.repayParam.orderNum = $('#debitCardNo1').attr('data-orderNum');
                 App.repayParam.inputFlag = '0';
                 App.repayParam.cardFlag = '2';
             }else{
                 App.repayParam.inputFlag = '1';
             }
             var urlRel = Fw.dataUrl('repay/queryDebitCardBal', false);
             Fw.ajaxData(urlRel,App.repayParam, function(data) {
                 if (data.STATUS == "1") {
                     App.timer();
                 }else{
                     Fw.alertinfo(data.MSG,'提示');
                 }
                 Fw.hideWaitPanel();
             },Fw.errorAjax);
         }
         
 },
     /*
      * 短信验证码 判断上一次发送的短信是否在60s有效期内， 如果不在有效期内或者是第一次调用该接口则直接发送短信
      */
     timer : function() { //去掉短验，直接校验支付密码
         checkedCodeKey = "pwd";
         var cfg = {
             keyBoardType: "PWD",
             pwdCallBack: "App.pwdCallBack",
             alertMsg: "全民生活支付密码为6位数字，非银行卡密码或app登录密码。",
             forgetPWDUrl: "/mbank/page/safetySett/payPwd/payPwd.html"
         };
         Fw.buriedPoint("立即还款页面202012_支付密码");
         App.hideSelectAccount();
         Fw.showPayKeyBoard(cfg);
     },
     timer2 : function() {
         var url = Fw.dataUrl("repay/sendProtocolPayMessage", false);
         Fw.openWaitPanel();
         var params = {
             debitCardNo:App.repayParam.debitCardNo,//扣款账号
             thirdFlag:App.thirdFlag, //第三方标识
             cardNo:App.repayParam.cardNo, //信用卡号
             financeOrgId : App.financeOrgId //金融机构号
         };
         if(App.repayParam.debitCardNo.match(/\*/) && $('#debitCardNo').attr('data-orderNum')){
             params.orderNum = $('#debitCardNo').attr('data-orderNum');
             params.inputFlag = '0';
         }else{
             params.inputFlag = '1';
         }
         Fw.ajaxData(url,params, function(rpdata) {
             if (rpdata && rpdata.STATUS == "1") {
                 App.origReqFlow = rpdata.origReqFlow || "";
                 App.mobile = rpdata.mobile; // 拿到用户手机号
                 // var prompt = "温馨提示\n"+
                 //     "1.请确保扣款借记卡账户与信用卡账户的客户信息和预留手机号一致。\n"+
                 //     "2.本次短信验证码由扣款银行发送。";
                 // 弹客户端键盘 sms
                 checkedCodeKey = "sms";
                 var cfg = {
                     keyBoardType : "SMS|PWD",
                     smsCallBack : "App.smsCallBack2",
                     pwdCallBack : "App.pwdCallBack",
                     mobile : "验证码已发送至" + App.mobile,
                     // purpose: "sign",
                     alertMsg : "全民生活支付密码为6位数字，非银行卡密码或app登录密码。",
                     sendMsgCallBack : "App.sendMsgCallBack2",
                     forgetPWDUrl:"/mbank/page/safetySett/payPwd/payPwd.html"
                 };
                 Fw.showPayKeyBoard(cfg);
                 Fw.buriedPoint("立即还款页面202012_支付密码");
                 App.hideSelectAccount();
                 Fw.hideWaitPanel();
             } else {
                 Fw.hideWaitPanel();
                 Fw.alertinfo(rpdata.MSG);
             }
         }, function(errData) {
             Fw.hideWaitPanel();
             Fw.alertinfo(errData.msg);
         });
 
     },
     smsCallBack2 : function(smscode) {
         // 回调输入完成之后
         var smsParams = {
                 financeOrgId : App.financeOrgId, //金融机构号
                 debitCardNo : App.repayParam.debitCardNo,//扣款账号
                 thirdFlag : App.thirdFlag,//第三方标识
                 origReqFlow : App.origReqFlow, //原请求流水
                 smsCode : smscode + ""
         };
         if(Fw.isEmpty(App.origReqFlow)){
             Fw.alertinfo("请确认温馨提示内容，并点击发送验证码");
             var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "1" // 1短信 2支付密码 3.重新获取短信验证码
                     };
             Fw.paymentRequestCallback(cfg);
             return false;
         }
         App.checkedCode2(smsParams);// 判断输入密码
     },
     pwdCallBack : function(data) {
         var msPayParams;
         if ('string' == typeof data && '{' == data.charAt(0)
                 && '}' == data.charAt(data.length - 1)) {
             data = JSON.parse(data);
         }
         if (checkedCodeKey === "sms") {
             msPayParams = {
                 mode : "3",
                 smsCodeValid : "1",
                 pwd : data.realPwd
             // 输入的支付密码
             };
         } else {
             msPayParams = {
                 mode : "2",
                 pwd : data.realPwd
             // 输入的支付密码
             };
         }
         App.checkedCode(msPayParams);// 判断输入密码
     },
     /*
      * 客户端回调 发送短信
      */
     sendMsgCallBack : function() {
         Fw.openWaitPanel();
         var url = Fw.dataUrl("credit/sendmessageMs", false);
          if(messagePageFlag && messagePageFlag == 'rmb'){
               var param = {
                   "tplVar0":"21"
               }
          }else if(messagePageFlag && messagePageFlag == 'for'){
               var param = {
                   "tplVar0":"29"
               }
          }
         Fw.ajaxData(url,param, function(rpdata) {
 //			Fw.alertinfo(rpdata);
             if (rpdata && rpdata.STATUS == "1") {
                 var cfg = {
                     keyMsg : "1", // 1成功 0失败
                     keyType : "3" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.hideWaitPanel();
             } else {
                 Fw.hideWaitPanel();
                 var cfg = {
                     keyMsg : "0", // 1成功 0失败
                     keyType : "3" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.hideWaitPanel();
             }
         }, function(errData) {
             Fw.hideWaitPanel();
             Fw.alertinfo(errData.msg);
         });
     },
     sendMsgCallBack2 : function() {
 //		Fw.openWaitPanel("0");
         var url = Fw.dataUrl("repay/sendProtocolPayMessage", false);
          var params = {
                     debitCardNo:App.repayParam.debitCardNo,//扣款账号
                     thirdFlag:App.thirdFlag, //第三方标识
                     cardNo:App.repayParam.cardNo, //信用卡号
                     financeOrgId : App.financeOrgId //金融机构号
                 };
         Fw.ajaxData(url,params, function(rpdata) {
             if (rpdata && rpdata.STATUS == "1") {
                 //获取发送协议短信后的原请求流水
                 App.origReqFlow = rpdata.origReqFlow || "";
                 var cfg = {
                     keyMsg : "1", // 1成功 0失败
                     keyType : "3" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.hideWaitPanel();
             } else {
                 Fw.hideWaitPanel();
                 var cfg = {
                     keyMsg : "0", // 1成功 0失败
                     keyType : "3" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.alertinfo(rpdata.MSG,'提示');
                 Fw.hideWaitPanel();
             }
         }, function(errData) {
             Fw.hideWaitPanel();
             Fw.alertinfo(errData.msg);
         });
     },
     /*
      * 输入参数为mode 值为1 校验短信验证码 2 校验支付密码 3 校验短信验证码+支付密码 4 免密不校验## 参数 smsCodeValid 0
      * 校验短信验证码 1 校验支付密码 还要传 如果校验短信要传smscode 如果是支付密码要传pwd
      */
     checkedCode : function(params) {
         Fw.openWaitPanel();
         var url = Fw.dataUrl("credit/msVerify", false);
         Fw.ajaxData(url,params,function(rpdata) {
             if (rpdata && rpdata.STATUS == "1") { // 校验短信验证码成功
                 var cfg = {
                     keyMsg : "1", // 1成功 0失败
                     keyType : "1" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.hideWaitPanel();
             } else if (rpdata && rpdata.STATUS == "2") {// 校验支付验证码成功
             // 支付键盘
                 /*var cfg = {
                     keyMsg : "1", // 1成功 0失败
                     keyType : "2" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);*/
                 App.repayParam.payPwd = params.pwd;
                 App.valiKey();// 去还款
             } else if (rpdata && rpdata.STATUS == "3") { // 短信验证码、支付密码验证成功
                 App.repayParam.payPwd = params.pwd;
                 App.valiKey();// 去还款
             } else if (rpdata && rpdata.STATUS == "5") { // 短信验证码校验失败
                 Fw.aheadOfVersion("5.38", function () {
                     var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "1", // 1短信 2支付密码 3.重新获取短信验证码
                         errorMsg: "短信验证码错误，请重新输入"
                     };
                     Fw.paymentRequestCallback(cfg);
                 }, function () {
                     Fw.alertinfo("短信验证码错误，请重新输入", "验证码错误");
                     var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "1" // 1短信 2支付密码 3.重新获取短信验证码
                     };
                     Fw.paymentRequestCallback(cfg);
                 });
                 Fw.hideWaitPanel();
             } else if (rpdata && rpdata.STATUS == "6") { // 短信验证码已经失效
                 Fw.alertinfo("请重新输入短信验证码", "短信验证码已失效",function(){
                     var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "2", // 1短信 2支付密码 3.重新获取短信验证码
                         msgValid : "false" // 短信验证码失效
                     };
                     Fw.paymentRequestCallback(cfg);
                 },"确定");
                 Fw.hideWaitPanel();
             } else if (rpdata && rpdata.STATUS == "7") { // 支付密码校验未通过
                 var cfg = {
                     keyMsg : "0", // 1成功 0失败
                     keyType : "2" // 1短信 2支付密码 3.重新获取短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.hideWaitPanel();
              }else if(rpdata && rpdata.STATUS == "8"){
                     var cfg = {
                             keyMsg : "1", // 1成功 0失败
                             keyType : "4" // 1短信 2支付密码 3.重新获取短信验证码 4.卡片有效期
                         };
                         Fw.paymentRequestCallback(cfg);
                         Fw.hideWaitPanel();
                         App.timer();
                 }else if(rpdata && rpdata.STATUS == "9"){
 
                     Fw.alertinfo("请重新输入卡片有效期", "卡片有效期输入错误");
                     var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "4" // 1短信 2支付密码 3.重新获取短信验证码 4.卡片有效期
                     };
                     Fw.paymentRequestCallback(cfg);
                     Fw.hideWaitPanel();
                 }
             },function(errData) {
                 Fw.hideWaitPanel();
                 if (errData.code == "24000") {
                     Fw.aheadOfVersion("5.38", function () {
                         var cfg = {
                             keyMsg : "0", // 1成功 0失败
                             keyType : "2", // 1短信 2支付密码 3.重新获取短信验证码
                             errorMsg : errData.msg
                         };
                         Fw.paymentRequestCallback(cfg);
                     }, function () {
                         Fw.alertinfo(errData.msg, "支付密码错误");
                         var cfg = {
                             keyMsg : "0", // 1成功 0失败
                             keyType : "2" // 1短信 2支付密码 3.重新获取短信验证码
                         };
                         Fw.paymentRequestCallback(cfg);
                     });
 
 
                 } else if (errData.code == "24002"|| errData.code == "24005") {
                     Fw.confirm("APP支付密码已锁定","密码已锁定",function() {
                         var param = {};
                         param.redirecturl = "../../repayment/repay.html";
                         Fw.redirect("../safetySett/payPwd/payPwd.html",param);
                     }, function() {
                         
                     }, "找回支付密码", "取消");
                     var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "2", // 1短信 2支付密码 3.重新获取短信验证码
                         PWDLocked : "1" // 1密码已锁定
                     };
                     Fw.paymentRequestCallback(cfg);
                 } else {
                     Fw.alertinfo(errData.msg, "校验失败");
                 }
             });
     },
     checkedCode2 : function(params) {
         Fw.openWaitPanel();
         var url = Fw.dataUrl("repay/signProtocolPay", false);
         Fw.ajaxData(url,params,function(rpdata) {
             if (rpdata && rpdata.STATUS == "1") { // 校验短信验证码成功
                 App.protocolNo = rpdata.protocolNo;
                 var cfg = {
                     keyMsg : "1", // 1成功 0失败
                     keyType : "1" // 1短信 2支付密码 3.重新发送短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.hideWaitPanel();
             }else{
                 if (rpdata.MSG == '验证码错误'){
                     rpdata.MSG = '短信验证码错误，请重新输入';
                     Fw.aheadOfVersion("5.38", function () {
                         var cfg = {
                             keyMsg : "0", // 1成功 0失败
                             keyType : "1", // 1短信 2支付密码 3.重新获取短信验证码
                             errorMsg : rpdata.MSG
                         };
                         Fw.paymentRequestCallback(cfg);
                     }, function () {
                         Fw.alertinfo(rpdata.MSG,'提示');
                         var cfg = {
                             keyMsg : "0", // 1成功 0失败
                             keyType : "1" // 1短信 2支付密码 3.重新获取短信验证码
                         };
                         Fw.paymentRequestCallback(cfg);
                     });
                 } else {
                     Fw.alertinfo(rpdata.MSG,'提示');
                     var cfg = {
                         keyMsg : "0", // 1成功 0失败
                         keyType : "1", // 1短信 2支付密码 3.重新获取短信验证码
                         SMSLocked : "1" //短信验证超限
                     };
                     Fw.paymentRequestCallback(cfg);
                 }
                 Fw.hideWaitPanel();
 
             } 
         },function(data) {
                 Fw.hideWaitPanel();
                 if(null==data||typeof(data)=="undefined"||data.msg.length==0||typeof(data)=="string"){
                     data={};
                     data.msg = "系统异常，请稍候访问";
                 }
                 var cfg = {
                     keyMsg : "0", // 1成功 0失败
                     keyType : "1" // 1短信 2支付密码 3.重新获取短信验证码
                 };
                 Fw.paymentRequestCallback(cfg);
                 Fw.alertinfo(data.msg,'提示');
             });
     },
     confirm2:function () {
         $('.digitTips1').hide();
         $('.digitTips').hide();
         changeVal = false;	
         changeAmortizeVal = false;
          if(App.for_cardType=='2'||App.for_cardType=='3'){//无外币的情况
              Fw.Form.showPinLabel(App.pageA,"此账户不支持外币还款",focus);
              return false;
          }
         if(App.sholdRepayment_For==0||App.thisBillAmt_for==0){//外币本期账单为零或者已还清，无需还款
             Fw.Form.showPinLabel(App.pageA,"暂无需还款",focus);
             return false;
         }
         if(App.edict==true){
             var isAmortize = $(".repaymentModeBar.for[data-check='1']").hasClass("amortizeRepay");
             if(isAmortize){
                 if(App.haveRedPacket == '1'){//有红包
                     $("#pageA").attr("data-btnRight",'false|自动还款|App.autoPayment()');
                     Fw.initPageTitle($("#pageA"));
                     Fw.outPageBuriedPoint("立即还款页面202012_首页");
                     Fw.redirect("../divide/bill_bystages/billByStafes.html",{
                         accountVal:$("#account").val(),
                         page_Flag: "forRepay",
                         money: $("#amortizeMoneyFor").text(),
                         stagNum:App.dataNum,
                         currType: App.currType
                     });
                 }else{
                     if($("#contract_agree_for").hasClass("agreeCon")){
                         
                         //申请账单分期逻辑
                         $(".shade").show();
                         App.queryBillheadTryAmt();
                     }else{
                         Fw.Form.showPinLabel(App.pageA, "请阅读并勾选协议", false);
                     }
                 }
                 Fw.buriedPoint("立即还款页面202012_首页_分期还确定");	
             }else{
                 var _repayForValue = $(".repaymentModeBar.for[data-check='1']").find(".forMoney").text()
                 App.repaymoney_for = Fw.util.Format.unfmtAmt(_repayForValue);
                 if(App.repaymoney_for&&App.repaymoney_for!=0){
                     if ($(".repaymentModeBar.for[data-check='1']").hasClass('defineRepay')) {
                         Fw.buriedPoint("立即还款页面202012_首页_还款确定");
                     } else {
                         Fw.buriedPoint("立即还款页面202012_首页_还最低确定");
                     }
                     $(".shade").show();
                     Fw.openWaitPanel();
                     var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
                     var params={
                             repayOthMoney:App.repaymoney_for,//还款金额
                             repayFlag:"1"//存取标识 1存  2 取
                     };
                     Fw.ajaxData(url,params, function(data){
                         if(data.STATUS=="1"){//存储成功之后再跳转页面
                              Fw.hideWaitPanel();
                              App.initRate();//查汇率
                              App.isAgree = false;
                              $("#agreeRate").removeClass("isAgree");
                              $("#agreeRate").find("img").attr("src","./img/noElect1.png");
                             $("#repayFor").css({"opacity":"0.5"});
                             $("#repayFor").attr("disabled","disabled");
                              App.checkUsrPayPwdIsOpen(App.showSelectAccount2,function(){
                                   //Fw.redirect("../safetySett/paysett/newPayPass/newPayPassA.html");
                                   Fw.outPageBuriedPoint("立即还款页面202012_首页");
                                  Fw.redirect('/mbank/page/safetySett/payPwd/payPwd.html');
                              })
                         }
                     }, Fw.errorAjax);
                 }else{
 //        			Fw.alertinfo("金额不能为0")
                     Fw.Form.showPinLabel(App.pageA,"还款金额必须大于0",focus);
                 }
             }
             
             
         }else{
             Fw.alertinfo("请确定金额")
         }
     },
 
     repaymentCalculator:function(){
         var params = {
             stagNum: App.dataNum,
             stagRate: App.dataRate,
             applyAmt: App.amtPass,
             insType:App.insTypePass,
             totalRate:App.totalRate,
             coinType:App.currType,
             rateList:App.rateList
         }
         Fw.openNewWebPanel('../divide/repaymentCalculator/index.html', params);
     },
     
     //密码验证框   点击确定所要触发的事件   人民币  外币  设置
     valiKey:function(){
         if('rmbRepay'==nowPage){
             App.url_last='repay/repayRmb';
             App.repayParam.financeOrgId = App.financeOrgId;//再传给后台使用
             App.repayParam.protocolNo = App.protocolNo;
             App.repayParam.thirdFlag = App.thirdFlag;
             App.repayParam.acctType = $("#account").val();
 
             App.repayParam.accountType = $("#account").find("option:selected").val();
             App.repayParam.serialNum =App.serialNum;
             App.repayParam.isUseRepayCoupon=App.isUseRepayCoupon;
             App.repayParam.actualRepayBal=App.actualBal;
 
             $("#rmbBtn").attr("disabled",true);
             $("#rmbBtn").css({"opacity":0.5});
         }else if(nowPage=="foreignCurrRepay"){
             App.url_last='repay/repayOtherBill';
             App.repayParam.acctType = $("#account").val();
             $("#forBtn").attr("disabled",true);
             $("#forBtn").css({"opacity":0.5});
         }
         App.repayParam.singleToken = App.singleToken;
         App.submit_last();
         //App.singleSessionToken();
     },
     singleSessionToken: function(flag){
         var url=Fw.dataUrl('credit/singleSessionToken'); //获取会话随机数
         Fw.onceCmbcAjaxData(url, {}, function(data){
             if(data.STATUS=="1"){
                 App.singleToken = data.singleToken;
                 flag === 'rmb' ? App.validate_rmb() : App.validate_for();
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG);
             }
         },Fw.errorAjax);
     },
     submit_last:function(){
         Fw.onceCmbcAjaxData(Fw.dataUrl(App.url_last),App.repayParam, function(data){
             var cfg = {
                 keyMsg : "1", // 1成功 0失败
                 keyType : "2" // 1短信 2支付密码 3.重新发送短信验证码
             };
             Fw.paymentRequestCallback(cfg);
             if(data.STATUS=="1"){
                 if('rmb'==App.showSign){//人民币  
                     App.hideSelectAccount();
                     $("#currentRepay").text("¥"+App.repayParam.repayBal);
                     var saver = App.repayParam.repayBal.replace(/,/g, "")
                     var save = saver*0.001;
                     var save_r = Math.round(save* 100) / 100
                     if(save_r < 0.1) {
                         $("#economize").text('')
                         $('.repayResult .repayExplain').css({"margin-bottom": "0.42rem"})
                     } else {
                         $("#economize").html("<span style='font-size:0.12rem;margin-bottom:0.4rem;text-align: center;display: inline-block;width: 100%;color: #A8ADB2;'>无手续费，比微信、支付宝省"+save_r+"元</span>");
                         $('.repayResult .repayExplain').css({"margin-bottom": "0.05rem"})
                     }
 //                	var currentNorepayRmb= App.subtract(App.repayParam.sholdRepayment,App.repayParam.repayBal);
                     //重新查账单信息，判断“继续还款”按钮是否显示
                     var url=Fw.dataUrl("credit/queryRmbBillhead");
                     var param={
                             accNo:$('#account').val(),
                             NEXT_KEY:'1',
                             PAGE_SIZE:'5'
                         }
                     Fw.ajaxData(url, param, function(data){
                         if(data.STATUS=="1"){
                             var sholdRepayment=data.sholdRepayment;
                             $("#currentNorepay").text("¥"+Fw.util.Format.fmtMoney(sholdRepayment));
                             if(sholdRepayment<=0){
                                 $("#billStage").addClass("hidden");
                                 $("#goRepay").addClass("hidden");
                                 $("#goquota").removeClass("hidden");
                                 $("#queryBill").removeClass("hidden");
                             }else{
                                 var params = {
                                     accNo: $('#account').val(),
                                     coinType: '',
                                     amt: sholdRepayment
                                 };
                                 App.queryCanStagByAccount(params);
                                 $("#goquota").addClass("hidden");
                             }
                         }else{
                             Fw.hideWaitPanel();
                             Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                         }
                     }, Fw.errorAjax);
                     if (data.serialStatus && data.serialStatus == 'fail') {//券码使用状态success or fail
                         $('.repayStatus').addClass('hidden');
                         $('.repayExplain').addClass('hidden');
                         $('.repayFail').removeClass('hidden');
                     }else {
                         $('.repayStatus').removeClass('hidden');
                         $('.repayExplain').removeClass('hidden');
                         $('.repayFail').addClass('hidden');
 
                     }
                     if(userCardAuthStatusFlag =="1"){
                         userCardAuthStatusFlag ="0"
                         sureAuthStatusFlag = '0'
                         var _url = Fw.dataUrl("repay/synUserCardAuthStatus", false);
                         Fw.ajaxData(_url, {}, function (data) {},function (errData) {});
                     }
                     App.queryRepayRmbEnergyVal();
                     Fw.inPageBuriedPoint("立即还款页面202012_还款成功页");
                     $('body').css({background:'#fff'});
                     Fw.showPageArea(App.pageB,[App.pageA,App.pageD,App.pageF,App.pageH,App.pageG,App.pageK,App.pageL],true);
                     $("#rmbBtn").attr("disabled",false);
                     $("#rmbBtn").css({"opacity":1});
                     Fw.hideWaitPanel();
                 }else if('foregin_curr'==App.showSign){//外币 进入成功页面
                     App.hideSelectAccount();
                     $("#currentRepay").text(Fw.util.Format.fmtCurrType(App.currType)+App.repayParam.repayAmtOth);
                     var savef = Number(App.for_h*0.001);
                     var save_f = Math.round(savef* 100) / 100
                     if(save_f < 0.1) {
                         $("#economize").text('')
                         $('.repayResult .repayExplain').css({"margin-bottom": "0.42rem"})
                     } else {
                         $("#economize").html("<span style='font-size:16px;text-align: center;margin-bottom:84px;display: inline-block;width: 100%;color: #A8ADB2;'>无手续费，比微信、支付宝省"+save_f+"元</span>");
                         $('.repayResult .repayExplain').css({"margin-bottom": "0.09rem"})
                     }
                     if(App.methodFlag=="x"){
                         $("#economize").text('')
                         $('.repayResult .repayExplain').css({"margin-bottom": "0.42rem"})
                     }
 //                	var currentNorepayFor= App.subtract(App.sholdRepayment_For,App.repayParam.repayAmtOth);
                     App.repaySubtract(App.sholdRepayment_For,App.repayParam.repayAmtOth,4);
 //                	$("#currentNorepay").text(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(currentNorepayFor));
                      var url=Fw.dataUrl("credit/queryOthBillhead");
                      var param={
                          accNo:$('#account').val(),
                          NEXT_KEY:'1',
                          PAGE_SIZE:'5'
                      }
                      Fw.ajaxData(url, param, function(data){
                          if(data.STATUS=="1"){
                              var sholdRepayment=data.sholdRepayment;
                              $("#currentNorepay").text(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtMoney(sholdRepayment));
                             if(sholdRepayment<=0){
                                  $("#billStage").addClass("hidden");
                                 $("#goRepay").addClass("hidden");
                                 $("#goquota").removeClass("hidden");
                                 $("#queryBill").removeClass("hidden");
                              }else{
                                  var params = {
                                     accNo: $('#account').val(),
                                     coinType: App.currType,
                                     amt: sholdRepayment
                                 };
                                 App.queryCanStagByAccount(params);
                                 $("#goquota").addClass("hidden");
                              }
                          }else{
                              Fw.hideWaitPanel();
                              Fw.alertinfo(data.MSG,'提示',Fw.gotoIndex);
                          }
                      }, Fw.errorAjax);
                     App.queryRepayRmbEnergyVal();
                     $('.repayStatus').removeClass('hidden');
                     $('.repayExplain').removeClass('hidden');
                     Fw.inPageBuriedPoint("立即还款页面202012_还款成功页");
                     $('body').css({background:'#fff'});
                      Fw.showPageArea(App.pageB,[App.pageA,App.pageD,App.pageF,App.pageH,App.pageG,App.pageK,App.pageL],true);
                      $("#forBtn").attr("disabled",false);
                      $("#forBtn").css({"opacity":1});
                    Fw.hideWaitPanel();
                     
                 }
                 //刷新客户端首页数据 
                  Fw.aheadOfVersion("5.41", function () {
                        Fw.Client.refreshUserBillDetailByAcctNo({acctNo:$('#account').val()});
                     }, function () {
                         Fw.reloadClientInfo(); 
                     });
                 $('#repayFail').addClass('hidden');
             }else{
                 Fw.hideWaitPanel();
                 //Fw.alertinfo(data.MSG,'提示');//报后台错误 
                 $('#repayFail').removeClass('hidden');
                 $('#failMsg').text(data.MSG);
                 $("#rmbBtn").attr("disabled",false);
                 $("#rmbBtn").css({"opacity":1});
                 $("#forBtn").attr("disabled",false);
                 $("#forBtn").css({"opacity":1});
                 Fw.buriedPoint("立即还款页面202103_还款失败");
             }
         }, function (data) {
             Fw.hideWaitPanel();
             $("#rmbBtn").attr("disabled",false);
             $("#rmbBtn").css({"opacity":1});
             $("#forBtn").attr("disabled",false);
             $("#forBtn").css({"opacity":1});
             Fw.buriedPoint("立即还款页面202103_还款失败");
             if(null==data||typeof(data)=="undefined"||data.msg.length==0||typeof(data)=="string"){
                 data={};
                 data.msg = "系统异常，请稍候访问";
             }
             // Fw.alertinfo(data.msg,'提示');
             $('#repayFail').removeClass('hidden');
             $('#failMsg').text(data.msg);
             var cfg = {
                 keyMsg : "1", // 1成功 0失败
                 keyType : "2" // 1短信 2支付密码 3.重新发送短信验证码
             };
             Fw.paymentRequestCallback(cfg);
         });
     },
     queryRepayRmbEnergyVal:function () {
         var url = Fw.dataUrl('credit/queryRepayRmbEnergyVal');
         Fw.ajaxData(url, {}, function (reData) {
             if (reData && reData.STATUS=='1') {
                 if(reData.taskStatus && reData.taskStatus=="1"){
                     $(".icon-repaymentMoney").css("display","block").attr("data-taskId",reData.taskId);
                     $(".icon-repaymentMoney_p1").text(reData.energyVal);
                     App.giftShow=reData.giftShow;
                     Fw.buriedPoint("立即还款结果页_能量石按钮_领能量");
                 }
             }else{
                 Fw.alertinfo(reData.MSG);
             }
         }, function (errData) {
             Fw.alertinfo(errData.msg);
         });
     },
     addEnergyFun:function () {
         if (dataPageOnce == "0") {
             dataPageOnce = "1";
             setTimeout(function () {
                 dataPageOnce = "0";
             }, 500)
             App.addEnergyOnceFun();
         }
     },
     addEnergyOnceFun:function () {
         Fw.buriedPoint("立即还款结果页_能量石按钮_领能量_点击");
         Fw.openWaitPanel();
         var url = Fw.dataUrl('credit/addEnergy');
         Fw.onceCmbcAjaxData(url, {taskId:$(".icon-repaymentMoney").attr("data-taskId")}, function (reData) {
             if (reData && reData.STATUS=='1') {
                 App.giftList();
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(reData.MSG);
             }
         }, function (errData) {
             Fw.hideWaitPanel();
             Fw.alertinfo(errData.msg);
         });
     },
     giftList:function () {
         $(".icon-coupons_p").css("marginTop",173*$(document).width()/375);
         var url = Fw.dataUrl('credit/queryEnergyVal');
         Fw.ajaxData(url, {}, function (reData) {
             if (reData && reData.STATUS=='1') {
                 if(reData.energyVal){
                     $(".icon-coupons_p5 span").text(reData.energyVal);
                     $(".icon-coupons_p span").text($(".icon-repaymentMoney_p1").text());
                     if(App.giftShow){
                         var url = Fw.dataUrl('credit/queryRepayRmbGiftList');
                         Fw.ajaxData(url, {}, function (data) {
                             if (data && data.STATUS=='1') {
                                 var str='';
                                 var _length=3;
                                 if (data.repayList && data.repayList.length>0) {
                                 var moneynum=data.repayList[0].advTitle.substring(0,data.repayList[0].advTitle.indexOf("元"));
                                 var moneyTitle=data.repayList[0].advTitle.split("元");
                                         if(parseFloat($(".icon-coupons_p5 span").text())>=parseFloat(data.repayList[0].quality)){
                                             str+='<div class="nls_list">'+
                                             '<img class="nls_list_bg" src="./img/bg_coupons.png" alt="" />'+
                                             '<div class="nls_list1 clearfix">'+
                                                 '<p class="icon-coupons_p0 float_l"><span>'+moneynum+'</span>元</p>'+
                                                 '<p class="icon-coupons_p1 float_l">'+moneyTitle[1]+'</p>'+
                                                 '<div class="icon-coupons_p2 float_r">'+
                                                     '<p class="icon-coupons_p3 able" data-clickUrl="'+data.repayList[0].clickUrl+'">立即兑换</p>'+
                                                     '<p class="icon-coupons_p4"><img src="./img/icon_stone_s.png" alt="" /><span>'+data.repayList[0].quality+'</span></p>'+
                                                 '</div>'+
                                             '</div>'+
                                         '</div>';
                                         }else{
                                             str+='<div class="nls_list">'+
                                             '<img class="nls_list_bg" src="./img/bg_coupons.png" alt="" />'+
                                             '<div class="nls_list1 clearfix">'+
                                                 '<p class="icon-coupons_p0 float_l"><span>'+moneynum+'</span>元</p>'+
                                                 '<p class="icon-coupons_p1 float_l">'+moneyTitle[1]+'</p>'+
                                                 '<div class="icon-coupons_p2 float_r">'+
                                                     '<p class="icon-coupons_p3 disable" data-clickUrl="'+data.repayList[0].clickUrl+'">立即兑换</p>'+
                                                     '<p class="icon-coupons_p4"><img src="./img/icon_stone_s.png" alt="" /><span>'+data.repayList[0].quality+'</span></p>'+
                                                 '</div>'+
                                             '</div>'+
                                         '</div>';
                                         }
                                     _length=2;
                                 }
                                 if (data.otherList && data.otherList.length>0) {
                                     _length>data.otherList.length?_length=data.otherList.length:_length=_length
                                     for(var i=0;i<_length;i++){
                                 var othermoneynum=data.otherList[i].advTitle.substring(0,data.otherList[i].advTitle.indexOf("元"));
                                 var othermoneyTitle=data.otherList[i].advTitle.split("元");
                                         if(parseFloat($(".icon-coupons_p5 span").text())>=parseFloat(data.otherList[i].quality)){
                                             str+='<div class="nls_list">'+
                                             '<img class="nls_list_bg" src="./img/bg_coupons.png" alt="" />'+
                                             '<div class="nls_list1 clearfix">'+
                                                 '<p class="icon-coupons_p0 float_l"><span>'+othermoneynum+'</span>元</p>'+
                                                 '<p class="icon-coupons_p1 float_l">'+othermoneyTitle[1]+'</p>'+
                                                 '<div class="icon-coupons_p2 float_r">'+
                                                     '<p class="icon-coupons_p3 able" data-clickUrl="'+data.otherList[i].clickUrl+'">立即兑换</p>'+
                                                     '<p class="icon-coupons_p4"><img src="./img/icon_stone_s.png" alt="" /><span>'+data.otherList[i].quality+'</span></p>'+
                                                 '</div>'+
                                             '</div>'+
                                         '</div>';
                                         }else{
                                             str+='<div class="nls_list">'+
                                             '<img class="nls_list_bg" src="./img/bg_coupons.png" alt="" />'+
                                             '<div class="nls_list1 clearfix">'+
                                                 '<p class="icon-coupons_p0 float_l"><span>'+othermoneynum+'</span>元</p>'+
                                                 '<p class="icon-coupons_p1 float_l">'+othermoneyTitle[1]+'</p>'+
                                                 '<div class="icon-coupons_p2 float_r">'+
                                                     '<p class="icon-coupons_p3 disable" data-clickUrl="'+data.otherList[i].clickUrl+'">立即兑换</p>'+
                                                     '<p class="icon-coupons_p4"><img src="./img/icon_stone_s.png" alt="" /><span>'+data.otherList[i].quality+'</span></p>'+
                                                 '</div>'+
                                             '</div>'+
                                         '</div>';
                                         }
                                     }
                                 }
                                 $(".nls_list_bar").html(str);
                                 $(".btn_gift").attr("data-clickUrl",data.moreGiftUrl)
                                 $(".btn_energy").attr("data-clickUrl",data.moreEnergyUrl)
                                 if (Fw.os == "android") {
                                     Fw.aheadOfVersion('8.2',function(){
                                         Fw.getUnionPayVersion(function(data){
                                             if(data == '1'){  //是云闪付版本
                                                 $(".btn_energy").attr("data-clickUrl","cmbc://openDreamPage")
                                             }
                                         })
                                     },function(){})		
                                 }
                                 $(".popup-repaymentMoney-bg").css("display","block");
                                 $(".icon-repaymentMoney").css("display","none");
                                 $("body").css("overflow","hidden");
                                 Fw.hideWaitPanel();
                             }else{
                                 Fw.hideWaitPanel();
                                 Fw.alertinfo(data.MSG);
                             }
                         }, function (eData) {
                             Fw.hideWaitPanel();
                             Fw.alertinfo(eData.msg);
                         });
                     }else{
                         $(".btn_gift").attr("data-clickUrl",data.moreGiftUrl)
                         $(".btn_energy").attr("data-clickUrl",data.moreEnergyUrl)
                         if (Fw.os == "android") {
                             Fw.aheadOfVersion('8.2',function(){
                                 Fw.getUnionPayVersion(function(data){
                                     if(data == '1'){  //是云闪付版本
                                         $(".btn_energy").attr("data-clickUrl","cmbc://openDreamPage")
                                     }
                                 })
                             },function(){})		
                         }
                         $(".popup-repaymentMoney-bg").css("display","block");
                         $(".icon-repaymentMoney").css("display","none");
                         $("body").css("overflow","hidden");
                         Fw.hideWaitPanel();
                     }
                 }
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(reData.MSG);
             }
         }, function (errData) {
             Fw.hideWaitPanel();
             Fw.alertinfo(errData.msg);
         });
     },
     closeEnergyFun:function () {
         $(".popup-repaymentMoney-bg").css("display","none");
         $("body").css("overflow","auto");
     },
     openNewPage:function () {
         if (dataPageOnce == "0") {
             dataPageOnce = "1";
             setTimeout(function () {
                 dataPageOnce = "0";
             }, 500)
         App.energyVal=$(".icon-coupons_p5 span").text();
         var _this=$(this);
 var url=Fw.dataUrl("credit/thirdLoginCommon");
 Fw.ajaxData(url, {click_url:$(this).attr("data-clickUrl")}, function(data){
     if(data && data.reqData){
         Fw.openNewWebPanel(data.reqData,'', function(){
             var url = Fw.dataUrl('credit/queryEnergyVal');
             Fw.ajaxData(url, {}, function (reData) {
                 if (reData && reData.STATUS=='1') {
                     if(reData.energyVal){
                         $(".icon-coupons_p5 span").text(reData.energyVal);
                         if(parseFloat(App.energyVal)>parseFloat(reData.energyVal)){ //已兑换
                             for(var i=0;i<$(".nls_list").length;i++){
                                 if(parseFloat(reData.energyVal)<parseFloat($(".nls_list").eq(i).find(".icon-coupons_p4 span").text())){
                                     $(".nls_list").eq(i).find(".icon-coupons_p3").addClass("disable").removeClass("able");
                                 }
                             }
                             if(_this.parents(".nls_list1").find(".icon-coupons_p1").text().indexOf("还款金")!="-1"){
                                 _this.parents(".nls_list1").find(".icon-coupons_p3").text("立即使用").addClass("use").removeClass("able").removeClass("disable");
                             }
                         }
                     }
                 }else{
                     Fw.hideWaitPanel();
                     Fw.alertinfo(reData.MSG);
                 }
             }, function (errData) {
                 Fw.hideWaitPanel();
                 Fw.alertinfo(errData.msg);
             });
         })
     }else{
         Fw.hideWaitPanel();
         Fw.alertinfo(data.MSG);
     }
 }, Fw.errorAjax);
         }
     },
     openNewPage1:function () {
         if (dataPageOnce == "0") {
             dataPageOnce = "1";
             setTimeout(function () {
                 dataPageOnce = "0";
             }, 500)
         App.energyValNow=$(".icon-coupons_p5 span").text();
         var _this=$(this);
         Fw.openNewWebPanel('newRepay.html','', function(){
             if(parseFloat(_this.parents(".nls_list1").find(".icon-coupons_p4 span").text())<=parseFloat(App.energyValNow)){
                 _this.text("立即兑换").addClass("able").removeClass("use");
             }else{
                 _this.text("立即兑换").addClass("disable").removeClass("use");
             }
         })
         }
     },
     openNewPage2:function () {
         if (dataPageOnce == "0") {
             dataPageOnce = "1";
             setTimeout(function () {
                 dataPageOnce = "0";
             }, 500)
         Fw.openNewWebPanel($(this).attr("data-clickUrl"));
         }
     },
     preloadimages:function (arr) {
         var newimages=[], loadedimages=0
         var postaction=function(){}  //默认done处理程序
         var arr=(typeof arr!="object")? [arr] : arr
         function imageloadpost(){
             loadedimages++
             if (loadedimages==arr.length){
                 postaction(newimages)
             }
         }
         for (var i=0; i<arr.length; i++){
             newimages[i]=new Image()
             newimages[i].src=arr[i].src;
             newimages[i].onload=function(){
                 imageloadpost()
             }
             newimages[i].onerror=function(){
                 imageloadpost()
             }
         }
         return {
             done:function(f){
                 postaction=f || postaction
             }
         }
     },
     pageA_back:function () {
         Fw.outPageBuriedPoint("立即还款页面202012_首页");
         if(pageFlag && pageFlag.page_flag == "haveBill"){//从账单查询 已出账单 跳过来的 直接跳回去就行了
             sessionStorage.clear();
             var accountValBill="";
                 accountValBill=$("#account").val()
             if(pageFlag.billPageFlag=='new'){
                 location.href="../billQ/billQuery/billQuery.html?accountVal="+accountValBill;
             }else{
                 location.href="../billQ/billQuery/billQueryPre.html?accountVal="+accountValBill;
             }
         }else if(pageFlag && pageFlag.page_flag == "noBill"){
             sessionStorage.clear();
             var accountValBill="";
                 accountValBill=$("#account").val()
             
             if(pageFlag.billPageFlag=='new'){
                 location.href="../billQ/billQuery/billQuery.html?accountVal="+accountValBill+"&showPage=noBill";
             }else{
                 location.href="../billQ/billQuery/billQueryPre.html?accountVal="+accountValBill+"&showPage=noBill";
             }
         }else if(pageFlag && pageFlag.page_Flag == "wishingWell"){
             Fw.redirect("../../../../mmc/page/threePage/wishingWell/index.html");
         }else if(pageFlag && pageFlag.page_flag == "act_repayment"){//还款节返回
             Fw.redirect("../../../../mmc/page/threePage/activityRepaymentDay/index.html");
         }else if((pageFlag && pageFlag.fromIndex=='myNews') ||  App.GetQueryString('fromIndex') == 'myNews'){
             window.location.href = '../myNews/main.html?pushtype=3';
         }else{
             Fw.goBack();
 
 
         }
     },
     pageB_back:function(){
          Fw.openWaitPanel();
          $(".popup-repaymentMoney-bg").css("display","none");
          $("body").css("overflow","auto");
          App.initUsedAccount();//加载成功还款的常用账号
          switch (App.showSign){
              case 'rmb':
                 //  App.initMoney();//重新查询已出账单未出账单
                      App.initAmortize();//加载分期信息
                      break;
              case 'foregin_curr': 
                 //  App.initForMoney();
                  Fw.openWaitPanel();
                  var url=Fw.dataUrl("bystages/queryCanStag");
                      Fw.ajaxData(url,{}, function(data){
                          Fw.hideWaitPanel();
                          if(data.STATUS=="1"){
                             App.AmortizeList=data.acctList;
                             for(var i=0;i<App.AmortizeList.length;i++){
                                 if(App.AmortizeList[i].accNo==$('#account').val()){
                                     App.initAmortizeFor(App.AmortizeList[i]);
                                     break;
                                 }
                                 
                             }
                          }
                      }, Fw.errorAjax);
                  
                  break;
                  }
          App.initHomepage();
         Fw.outPageBuriedPoint("立即还款页面202012_还款成功页");
         Fw.inPageBuriedPoint("立即还款页面202012_首页");
         $('body').css({background:'#f6f6f6'});
         Fw.showPageArea(App.pageA, [App.pageB], true);
         $("#billStage").addClass("hidden");
         $("#goRepay").addClass("hidden");
     },
     billQuery:function(){
         Fw.outPageBuriedPoint("立即还款页面202012_还款成功页");
         var accountVal= $("#account").val();
         if(App.GetQueryString('billPageFlag') == 'old'){
             location.href="../billQ/billQuery/billQueryPre.html?accountVal="+accountVal;
         }else if(App.GetQueryString('billPageFlag') == 'new'){
             location.href="../billQ/billQuery/billQuery.html?accountVal="+accountVal;
         }else if(pageFlag.billPageFlag=='old'){
             location.href="../billQ/billQuery/billQueryPre.html?accountVal="+accountVal;
         }else{
             Fw.buriedPoint("还款结果页_查询账单");
             location.href="../billQ/billQuery/billQuery.html?accountVal="+accountVal;
         }
     },
     billByStage:function(){
         Fw.outPageBuriedPoint("立即还款页面202012_还款成功页");
         Fw.jumpToThird('/mbank/page/divide/bill_bystages/billByStafes.html',function () {
             Fw.redirect('../divide/bill_bystages/billByStafes.html',{
                 accountVal:$("#account").val()
             });
         });
     },
     goquota:function(){
         Fw.outPageBuriedPoint("立即还款页面202012_还款成功页");
         var accountVal= $("#account").val();
         Fw.openNewWebPanel('/mbank/page/creditm/newHome/home.html',{flag:'repay',accountVal:accountVal});
     },
     pageD_back: function () {
 //    	Fw.outPageBuriedPoint("人民币还款_目前支持的银行卡");
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageD], true);
     },
     redirectCard: function () {
         Fw.redirect('../cardM/mycard/cardManage.html')
     },
     redirectToCreditm: function () {
         if('rmbRepay'==nowPage){
 //    		Fw.buriedPoint("人民币还款_还款成功_查看信用额");
 //    		Fw.outPageBuriedPoint("人民币还款_还款成功");
         }
         Fw.redirect('../creditm/home.html')
     },
     showPageF:function(){
         console.log('-----------------1')
         Fw.showPageArea(App.pageF, [App.pageA], true);
     },
     showPageH:function(){
         Fw.showPageArea(App.pageH, [App.pageA], true);
     },
     showPageG:function(){
         App.handleCloseBtn(false);
         Fw.showPageArea(App.pageG, [App.pageA], true);
     },
     showCardNo:function(){
         App.editBack();
         if(nowPage=='rmbRepay'){
             var cardNo=$("#debitCardNo").val().replace(/ /g,"");//判断手动输入扣款账号时，再跟银行卡列表做比对，如果一致，添加选择标记
             var bankAccountDom = $("#rmbCardNoList .bankAccount");
             Fw.showPageArea(App.pageF, [App.pageA], true);
             if(Fw.isEmpty(App.cardListAll)){
                 $('#pageF').attr('data-btnRight','false||');//列表为空时，编辑按钮隐藏
                 Fw.initPageTitle("#pageF");
             }
         }else if(nowPage=='foreignCurrRepay'){
             var cardNo=$("#debitCardNo1").val().replace(/ /g,"");//判断手动输入扣款账号时，再跟银行卡列表做比对，如果一致，添加选择标记
             var bankAccountDom = $("#forCardNoList .bankAccount");
             Fw.showPageArea(App.pageH, [App.pageA], true); 
             if(Fw.isEmpty(App.cardList)){
                 $('#pageH').attr('data-btnRight','false||');//列表为空时，编辑按钮隐藏
                 Fw.initPageTitle("#pageH");
             }
         }
         for(var i=0;i<bankAccountDom.length;i++){
             var bankAccount =$(bankAccountDom[i]).html().replace(/ /g,"");
             if(cardNo==bankAccount){
                 $(bankAccountDom[i]).siblings(".elect").find("img").attr("src","./img/elect2.png");
                 $(bankAccountDom[i]).parent("li").attr("data-flag","1");
             }else{
                 $(bankAccountDom[i]).siblings(".elect").find("img").attr("src","./img/noElect2.png");
                 $(bankAccountDom[i]).parent("li").removeAttr("data-flag");
             }
         }
         App.handleCloseBtn(false);
     },
     forRepayMethod:function(){//选择外币还款方式
         $(this).siblings().find("img").attr("src","./img/noElect2.png");
         $(this).find("img").attr("src","./img/elect2.png");
         $(this).siblings().removeAttr("data-check");
         $(this).attr("data-check","1");
         var val = $(this).find(".left").text();
         $("#repay_methodVal").html(val);
 //    	Fw.alertinfo($(".forRepayMethod[data-check='1']").attr("data-method"));
         App.methodFlag = $(".forRepayMethod[data-check='1']").attr("data-method");
         if(App.methodFlag=="b"){
             $(".charge_account").removeClass("hidden");//扣款账号模块显示
             
         }else if(App.methodFlag=="x"){
             $(".charge_account").addClass("hidden");
         }
         App.judgeButton_for();
         App.finishEditCardNo();
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageG], true);
     },
     editOperate:function(){
         if(nowPage=="rmbRepay"){
             $("#rmbCardNoList .elect img").attr("src","./img/icon_delete.png");
             $("#rmbCardNoList li").attr("data-delete","1");
             $('#pageF').attr('data-btnRight','true|完成|App.editBack()');
             Fw.initPageTitle("#pageF");
         }else if(nowPage=="foreignCurrRepay"){
             $("#forCardNoList .elect img").attr("src","./img/icon_delete.png");
             $("#forCardNoList li").attr("data-delete","1");
             $('#pageH').attr('data-btnRight','true|完成|App.editBack()');
             Fw.initPageTitle("#pageH");
         }
         
     },
     editBack:function(){
         if(nowPage=="rmbRepay"){
             $("#rmbCardNoList li").attr("data-delete","0");
             $('#pageF').attr('data-btnRight','true|编辑|App.editOperate()');
             Fw.initPageTitle("#pageF");
             var lis = $("#rmbCardNoList li");
         }else if(nowPage=="foreignCurrRepay"){
             $("#forCardNoList li").attr("data-delete","0");
             $('#pageH').attr('data-btnRight','true|编辑|App.editOperate()');
             Fw.initPageTitle("#pageH");
             var lis = $("#forCardNoList li");
         }
         
         for(var i=0;i<lis.length;i++){
             var _this= $(lis[i]);
             if(_this.attr("data-flag")=="1"){
                 _this.find(".elect img").attr("src","./img/elect2.png");
             }else{
                 _this.find(".elect img").attr("src","./img/noElect2.png");
             }
         }
     },
     deleteCardNo:function(){
         
         var cardNo=$(this).attr("data-cardNo");
         var orderNum=$(this).attr("data-orderNum");
         var cardFlag = (nowPage=="rmbRepay") ? '1' : '2';
         $(this).remove();
         var param = {
             cardNo: cardNo,
             orderNum: orderNum,
             cardFlag: cardFlag
         };
         
         var url = Fw.dataUrl('repay/deleteLatestCard', false);
         Fw.ajaxData(url,param , function(data) {
             if (data.STATUS == "1") {
                 //将要删除的账号从请求到的列表中删除
                 if(!Fw.isEmpty(App.cardListAll)){
                     App.cardListAll.forEach(function(item, index){
                         if(cardNo==item.cardNo){
                             App.cardListAll.splice(index,1);
                         }
                     });
                 }
                 if(!Fw.isEmpty(App.cardList)){
                     App.cardList.forEach(function(item, index){
                         if(cardNo==item.cardNo){
                             App.cardList.splice(index,1);
                         }
                     });
                 }
                 if(nowPage=="rmbRepay"){
                     var liDome=$("#rmbCardNoList li");
                     $("#debitCardNo").removeClass('hidden').val("").removeAttr('data-orderNum');
                     $('.bankLogo.rmb').removeAttr('src').addClass('hidden');
                     $('#fmtDebitCardNo').addClass('hidden');
                     $("#balance").parent().addClass("hidden");
                     $("#repay_bank").html("");
                     $("#repayRmb").attr("disabled",true);
                     $("#repayRmb").css({"opacity":0.5});
                     if(liDome.length<1){
                         $('#pageF').attr('data-btnRight','false||');
                         Fw.initPageTitle("#pageF");
                         $("#rmb_noCardNum").removeClass("hidden");
                     }else{
                         $("#rmb_noCardNum").addClass("hidden");
                     }
 
                     //更新一下外币借记卡页面
                     if(!Fw.isEmpty(App.cardList)){
                         var forCardNoTpl = '{@each cardList as item,index}' + accountTpl;//外币常用还款账号
                         $('#forCardNoList').html(Fw.template(forCardNoTpl,{"cardList":App.cardList}));
                         $("#forCardNoList li:first-child .elect img").attr("src","./img/elect2.png");
                         $("#forCardNoList li:first-child").attr("data-flag","1");
                         $("#debitCardNo1").val(Fw.util.Format.fmtAcctNo(App.cardList[0].cardNum)).addClass('hidden');
                         $('#fmtDebitCardNo1').text(Fw.util.Format.fmtAcctNo_hidden(App.cardList[0].cardNum)).removeClass('hidden');
                         $('#pageH').attr('data-btnRight','true|编辑|App.editOperate()');
                         $("#for_noCardNum").addClass("hidden");
                     }else{
                         $('#forCardNoList').html("");
                         $('#pageH').attr('data-btnRight','false||');
                         $("#for_noCardNum").removeClass("hidden");
                         $('#fmtDebitCardNo1').addClass('hidden');
                         $("#debitCardNo1").removeClass('hidden').val("").removeAttr('data-orderNum');
                     }
                 }else if(nowPage=="foreignCurrRepay"){
                     var liDome=$("#forCardNoList li");
                     $("#debitCardNo1").removeClass('hidden').val("").removeAttr('data-orderNum');
                     $('.bankLogo.for').removeAttr('src').addClass('hidden');
                     $('#fmtDebitCardNo1').addClass('hidden');
                     $("#balance1").parent().addClass("hidden");
                     $("#repayFor").attr("disabled",true);
                     $("#repayFor").css({"opacity":0.5});
                     if(liDome.length<1){
                         $('#pageH').attr('data-btnRight','false||');
                         Fw.initPageTitle("#pageH");
                         $("#for_noCardNum").removeClass("hidden");
                     }else{
                         $("#for_noCardNum").addClass("hidden");
                     }
 
                     //更新一下人民币借记卡页面
                     if(!Fw.isEmpty(App.cardListAll)){
                         var rmbCardNoTpl = '{@each cardListAll as item,index}' + accountTpl;//人民币常用还款账号
                         $('#rmbCardNoList').html(Fw.template(rmbCardNoTpl,{"cardListAll":App.cardListAll}));
                         $("#debitCardNo").val(Fw.util.Format.fmtAcctNo(App.cardListAll[0].cardNum)).addClass('hidden');
                         $('#fmtDebitCardNo').text(Fw.util.Format.fmtAcctNo_hidden(App.cardListAll[0].cardNum)).removeClass('hidden');
                         $("#repay_bank").html(App.cardListAll[0].bankName);
                         $('#pageF').attr('data-btnRight','true|编辑|App.editOperate()');
                         $("#rmb_noCardNum").addClass("hidden");
                     }else{
                         $('#rmbCardNoList').html("");
                         $('#pageF').attr('data-btnRight','false||');//列表为空时，编辑按钮隐藏
                         $("#repay_bank").html("");
                         $("#rmb_noCardNum").removeClass("hidden");
                         $("#debitCardNo").removeClass('hidden').val("").removeAttr('data-orderNum');
                         $('#fmtDebitCardNo').addClass('hidden');
                     }
                 }
 
             }
         },Fw.errorAjax);
     },
     addBankCard: function () {
         $("#cardNo3").val("");
         $("#bank2").html("");
         $(".ui-select-bankIcon").removeClass("hidden");
         // if(App.supportOtherBank === "0"){
         //     //收款银行默认显示本行图标
         //     $(".ui-select-bankIcon").addClass("hidden");
         //     $('#bank2').append('<img src="' + '../../css/img/bankImg/CMBCBank.png' + '" class="bankIcon"/>')
         //     $('#bank2').append('<span class="cardBinInfoName">' + '中国民生银行' + '</span>');
         //     $('#bank2').show();
         // }
         if(nowPage=="rmbRepay"){
             ispageP==true;
             Fw.showPageArea(App.pageP, [App.pageA, App.pageB, App.pageD, App.pageF, App.pageH, App.pageG, App.pageK,App.pageL,App.pageN,App.pageO], true);
         }else if(nowPage=="foreignCurrRepay"){
             ispageP==false;
             Fw.showPageArea(App.pageP, [App.pageA, App.pageB, App.pageD, App.pageF, App.pageH, App.pageG, App.pageK,App.pageL,App.pageN,App.pageO], true);
         }
     },
     pageP_back: function () {
         $('#cardNo3').val("");
         $("bank2").html("");
         onceShow = "1";
         App.editBack();
         if(ispageP===true){
             Fw.showPageArea(App.pageF, [App.pageA, App.pageB, App.pageD, App.pageP, App.pageH, App.pageG, App.pageK,App.pageL,App.pageN], true);
         }else if(ispageP===false){
             Fw.showPageArea(App.pageH, [App.pageA, App.pageB, App.pageD, App.pageP, App.pageF, App.pageG, App.pageK,App.pageL,App.pageN], true);
         }
     },
     pageO_back: function () {
         Fw.showPageArea(App.pageP, [App.pageA, App.pageB, App.pageD, App.pageO, App.pageH, App.pageG, App.pageK,App.pageL,App.pageN], true);
     },
     formatCardNo: function () {//扫描卡号
         Fw.readBankCard({}, App.getCard);
     },
     getCard: function (param) {
         var cardNo = param.CARD_NU;
         // 解决扫描卡号后不带空格的问题
         if (cardNo.indexOf(" ") == -1) {//判断卡号不带空格
             var cards = [];
             var cardNoStr = "";
             cards = cardNo.split("");
             for (var i = 0; i < cards.length; i++) {
                 cardNoStr += cards[i];
                 if ((i + 1) % 4 == 0 && (i + 1) != cards.length) {
                     cardNoStr += " ";
                 }
             }
             cardNo = cardNoStr;
         }
         $("#cardNo3").val(cardNo);
         onceShow = "addNumChange";
         App.showBankName(cardNo)
     },
   /*拿到用户选择的
      * 银行和银行编号*/
     changeBank: function () {
     $('#bank2').show();
     $('#bank2').html($(this).html());
     $('#bank2').attr('data-bank', $(this).attr('data-bank'));
     $(".ui-select-bankIcon").addClass("hidden");
     //Fw.inPageBuriedPoint("现金分期1_分期内容页");
     Fw.showPageArea(App.pageP, [App.pageO,App.pageF], true);
     },
     //卡号改变调用返显银行
     cardNoChange: function (e, cardNo) {
         var cardNum = cardNo.replace(" ", "");
         if (cardNum.length >= 8) {
             bankShow = "1";
             App.showBankName(cardNum);
         } else {
             // $('#bank').hide();
             // $('#bankIcon-wrap').html("");
             if(App.supportOtherBank=="1"){
                 $('#bank2').hide();
                 $(".ui-select-bankIcon").removeClass("hidden");
             }
             bankShow = "0";
         }
         if(onceShow === "addNumChange"){
             //处理光标
             var input = document.querySelector("#cardNo3");
             var expectCharIndex;
             var curValue = input.value;
             var selectionStart = input.selectionStart;
             var selectionEnd = input.selectionEnd;
             if (selectionStart != curValue.length) { //当光标在最后时，不需要处理光标
                 var keyCode = e.keyCode;
                 var preCharIndex = curValue.substring(0, selectionStart).length - 1;
                 if (keyCode == 8) {
                     expectCharIndex = selectionStart;
                 } else {
                     switch (selectionStart) {
                         case 5:
                             expectCharIndex = 6;
                             break;
                         case 10:
                             expectCharIndex = 11;
                             break;
                         case 15:
                             expectCharIndex = 16;
                             break;
                         case 20:
                             expectCharIndex = 21;
                             break;
                         default:
                             expectCharIndex = selectionStart;
                             break;
                     }
                 }
                 setTimeout(function () {
                     input.setSelectionRange(expectCharIndex, expectCharIndex);
                 }, 1);
             }
          }
     },
     //返显银行
      showBankName: function (cardNum,orderNum) {
         if(orderNum){
             var param = {
                 orderNum: orderNum,
                 debitCard: "",
                 businessType:"cash"
             }
         }else{
             cardNum = cardNum.replace(" ", "").substring(0, 8);
             if(cardNum.length < 6){return}
             var param = {
                 debitCard: cardNum,
                 orderNum: "",
                 businessType:"cash"
             }
         }
         Fw.ajaxData(Fw.dataUrl('bystages/queryBorrowDebitCardInfo', false),param , function (data) {
             if (data.STATUS == "1") {
                 if(repeatPopUpFlag === "1"){return};
                 // if(data && data.creditCard === "1"){ //是否是信用卡
                 //     $("#cardNo2").blur();
                 //     $("#cardNo3").blur();
                 //     repeatPopUpFlag = "1";
                 //     Fw.alertinfo("仅支持转入借记卡","",function(){
                 //         repeatPopUpFlag = "0";
                 //         $('#bankIcon-wrap').html("");
                 //         $("#cardNo2").val("");
                 //         $("#cardNo2").attr("data-orderNum","");
                 //         $('#cardNo2span').addClass('hidden');
                 //         $('#cardNo2').removeClass('hidden');
                 //         $("#cardNo3").val("");
                 //     },"确定");
                 //     return;
                 // }
                 if (data && data.isSupport === "1") {
                     // $('#bank').html("");
                     $('#bank2').html("");
                     // $('#bankIcon-wrap').html('');
                     // $('#bank').attr('data-bank', data.bankCode);
                     App.bankName = data.bankName;
                     // $('#cardBinBankName').text(data.bankName);
                     // $('#bank').show();
                     // if(onceShow === "1"){
                     //     $('#bankIcon-wrap').removeClass('hidden');
                     //    // App.bankIconTips();
                     //     if($('#bankIcon-wrap>img').length === 0){
                     //         $('#bankIcon-wrap').append('<img src="' + data.headImg + '" class="bankIcon"/>');
                     //     }
                     // }
                     // if (onceShow === "numChange" && bankShow!= "0") {
                     //     $('#bankIcon-wrap').removeClass('hidden');
                     //     App.bankIconTips();
                     //     if($('#bankIcon-wrap>img').length === 0){
                     //         $('#bankIcon-wrap').append('<img src="' + data.headImg + '" class="bankIcon"/>');
                     //     }
                     // }
                     // if (onceShow === "checkCard") {
                     //     $('#bankIcon-wrap').removeClass('hidden');
                     //     if($('#bankIcon-wrap>img').length === 0){
                     //         $('#bankIcon-wrap').append('<img src="' + data.headImg + '" class="bankIcon"/>');
                     //     }
                     // }
                     if (onceShow === "addNumChange") {
                         $(".ui-select-bankIcon").addClass("hidden");
                         $('#bank2').attr('data-bank', data.bankCode);
                         $('#bank2').append('<img src="' + data.headImg + '" class="bankIcon"/>')
                         $('#bank2').append('<span class="cardBinInfoName">' + data.bankName + '</span>');
                         $('#bank2').show();
                     }
                     // App.selfOrOtherBank = data.selfBank; //是否本行 1本行 !=1 他行
                     // if(onceShow === "1"){
                     //     App.handleQuota();
                     // }
                 }else{
                     Fw.hideWaitPanel();
                     var msg = data.MSG;
                     if(repeatPopUpFlag === "1"){return};
                     // if(App.supportOtherBank === "0"){
                     //     msg = "仅支持转入民生借记卡";
                     //     repeatPopUpFlag = "1";
                     // }
                     // $("#cardNo2").blur();
                     $("#cardNo3").blur();
                     repeatPopUpFlag = "1";
                     Fw.alertinfo(msg,"",function(){
                         // $('#bankIcon-wrap').html("");
                         // $("#cardNo2").val("");
                         // $("#cardNo2").attr("data-orderNum","");
                         // $('#cardNo2span').addClass('hidden');
                         // $('#cardNo2').removeClass('hidden');
                         $("#cardNo3").val("");
                         repeatPopUpFlag = "0";
                     },"确定");
                 }
             } else {
                 // $('#bankIcon-wrap').html("");
                 // $("#cardNo2").val("");
                 // $("#cardNo2").attr("data-orderNum","");
                 // $('#cardNo2span').addClass('hidden');
                 // $('#cardNo2').removeClass('hidden');
                 $("#cardNo3").val("");
                 repeatPopUpFlag = "0";
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG);
             }
         }, function (errData) {
             // $('#bankIcon-wrap').html("");
             // $("#cardNo2").val("");
             // $("#cardNo2").attr("data-orderNum","");
             // $('#cardNo2span').addClass('hidden');
             // $('#cardNo2').removeClass('hidden');
             $("#cardNo3").val("");
             repeatPopUpFlag = "0";
             if(errData.code === "INJ001"){
                 errData.msg = "输入文字包含敏感字段，请重新输入";
             }
             Fw.hideWaitPanel();
             Fw.alertinfo(errData.msg, '提示')
         });
     },
     // 确定按钮
     addResiveBankNo: function () {
         if (!Fw.Form.validator(App.pageP)) {
             return;
         }
         if ($('#bank2').attr("data-bank") === '') {
             Fw.Form.showPinLabel('', "收款银行不能为空", false);
             return;
         }
         if(!Fw.isEmpty(App.debitCards)){
             App.checkRepeatAddCard(); //校验重复添加卡片
         }else{
             //判断他行卡授权先弹框 点确定调授权接口 成功走老流程失败退出
             if(!Fw.isEmpty(App.selfOrOtherBank) && App.selfOrOtherBank !=1){
                 //弹窗点确定调授权接口 成功走老流程失败退出
                 initAlertFn({
                     page:'body',
                     agree_url:'../agreement/otherBankAgree.html',
                     cancel_fn:function () {
                         $('#alertHtml').remove();
                     },
                     confirm_fn:function () {
                         if($(".agreeSel").attr("data-flag")!="sel"){
                             Fw.toast("请勾选协议")
                             return;
                         }
                         App.ontherBankAddAccredit();
                     }
                 });
             }
             // else {
             //     App.pageCurrent === 'cash' ? App.changeCashAdd() : App.changeBigAdd();
             // }
         }
     },
     //校验重复添加卡片
     checkRepeatAddCard:function(){
         var flag = false;
         for(var i=0;i<App.debitCards.length;i++){
             if(App.debitCards[i].cardNo === Fw.util.Format.removeSpace($("#cardNo3").val())){
                 Fw.alertinfo("该卡片已添加，无需重复添加","",function(){
                     $("#cardNo3").val("");
                     if(App.supportOtherBank=="1"){
                         $("#bank2").html("");
                         $(".ui-select-bankIcon").removeClass("hidden");
                     }
 
                 },"确定");
                 return;
             }else{
                 flag = true;
             }
         }
         if(flag){
             //添加的不是重复的卡片 他行卡调用授权
             if(!Fw.isEmpty(App.selfOrOtherBank) && App.selfOrOtherBank !=1){
                 initAlertFn({
                     page:'body',
                     agree_url:'../agreement/otherBankAgree.html',
                     cancel_fn:function () {
                         $('#alertHtml').remove();
                     },
                     confirm_fn:function () {
                         if($(".agreeSel").attr("data-flag")!="sel"){
                             Fw.toast("请勾选协议")
                             return;
                         }
                         App.ontherBankAddAccredit();
                     }
                 });
             }
             // else {
             //     App.pageCurrent === 'cash' ? App.changeCashAdd() : App.changeBigAdd();
             // }
         }
     },
     ontherBankAddAccredit:function(){
         Fw.openWaitPanel();
         Fw.ajaxData(Fw.dataUrl("bystages/obtainingAnAuthorizationCode"), {
            cardNo:$("#cardNo3").val().replace(/\s*/g,""),
            orderNum:"",
            insType:insType
         }, function (data) {
             if (data.STATUS == "1") {
                 $('#alertHtml').remove();
                 // App.pageCurrent === 'cash' ? App.changeCashAdd() : App.changeBigAdd();
                 if(ispageP===true){
                     Fw.showPageArea(App.pageF, [App.pageA, App.pageB, App.pageD, App.pageP, App.pageH, App.pageG, App.pageK,App.pageL,App.pageN], true);
                 }else if(ispageP===false){
                     Fw.showPageArea(App.pageH, [App.pageA, App.pageB, App.pageD, App.pageP, App.pageF, App.pageG, App.pageK,App.pageL,App.pageN], true);
                 }
             } else {
                 Fw.alertinfo(data.MSG, '提示',Fw.goBack);
             }
             Fw.hideWaitPanel();
         }, function(errData){
             Fw.hideWaitPanel();
             Fw.alertFlag(errData.msg,'提示',Fw.goBack)
         });
     },
     finishEditCardNo:function(){
         if(nowPage=="rmbRepay"){
             App.bankCardJudg();
             $("#debitCardNo").next(".closeImg").addClass("hidden");
             var _val = $("#debitCardNo").val().replace(/ /g,"");
             if(!Fw.isEmpty(_val) && _val.length > 15){
                 $("#debitCardNo").addClass('hidden');
                 $('#fmtDebitCardNo').removeClass('hidden').text(Fw.util.Format.fmtAcctNo_hidden($("#debitCardNo").val()));
                 if(!$('.bankLogo.rmb').hasClass('hidden')){
                     var _width = $('#fmtDebitCardNo').width() + 30 + 'px';
                     $('.bankLogo.rmb').css({right: _width});
                 }
             }
         }else{
             $("#debitCardNo1").next(".closeImg").addClass("hidden");
             var _val = $("#debitCardNo1").val().replace(/ /g,"");
             if(!Fw.isEmpty(_val) && _val.length > 15){
                 $("#debitCardNo1").addClass('hidden');
                 $('#fmtDebitCardNo1').removeClass('hidden').text(Fw.util.Format.fmtAcctNo_hidden($("#debitCardNo1").val()));
                 if(!$('.bankLogo.for').hasClass('hidden')){
                     var _width = $('#fmtDebitCardNo1').width() + 20 + 'px';
                     $('.bankLogo.for').css({right: _width});
                 }
             }
         }
     },
      startEditCardNo:function(){
          $(this).val('').removeAttr('data-orderNum');
          $(this).parent().siblings('.bankLogo').addClass('hidden').removeAttr('src');
          if(nowPage=="rmbRepay"){
             App.handleCardNo();
          }else{
              App.judgeButton_for();
          }
     },
     handleCardNo:function(){
         var val = $("#debitCardNo").val().replace(/ /g,'');
         var minlength = $("#debitCardNo").attr("data-minlength");
         $("#debitCardNo").val(Fw.util.Format.fmtAcctNo(val.substr(0,20)))
         if(val&&val.length>=minlength&& !Fw.isEmpty($("#creditCardRmb").html())){
             $("#repayRmb").removeAttr("disabled");
             $("#repayRmb").css({"opacity":1});
             App.queryCardBalaRmb();//查余额
         }else{
             $("#repayRmb").attr("disabled","disabled");
             $("#repayRmb").css({"opacity":0.5});
             $("#balance").parent().addClass("hidden");
         }
         if(!Fw.isEmpty(val)){
             $("#debitCardNo").next(".closeImg").removeClass("hidden");
         }else{
             $("#debitCardNo").next(".closeImg").addClass("hidden");
         }
         // App.queryBankInfoByKBin();
     },
     clearCardNo:function(){
         if(nowPage=="rmbRepay"){
             $("#debitCardNo").val("").removeAttr('data-orderNum');
             $("#debitCardNo").focus();
             $("#repay_bank").html("");
             $("#balance").parent().addClass("hidden");
             var btn = $("#repayRmb");
         }else{
             $("#debitCardNo1").val("").removeAttr('data-orderNum');
             $("#debitCardNo1").focus();
             $("#balance1").parent().addClass("hidden");
             var btn = $("#repayFor");
         }
         $(this).addClass("hidden");
         btn.attr("disabled","disabled");
         btn.css({"opacity":0.5});
     },
     selectAccount:function(){
         var thisLi = $(this);
         var cardNo = thisLi.attr("data-cardNo");
         var orderNum = thisLi.attr("data-orderNum");
         var _src = thisLi.find('.bankflag').attr('src');
         if(nowPage=="rmbRepay"){
             $("#debitCardNo").val(Fw.util.Format.fmtAcctNo(cardNo)).attr("data-orderNum",orderNum);
             $("#repay_bank").html(thisLi.find(".bank").html());
             App.handleCardNo();
             $('.bankLogo.rmb').attr('src',_src);
         }else{
             $("#debitCardNo1").val(Fw.util.Format.fmtAcctNo(cardNo)).attr("data-orderNum",orderNum);
             App.judgeButton_for();
             $('.bankLogo.for').attr('src',_src);
         }
         
         App.finishEditCardNo();
 //    	App.queryCardBalaRmb();
         thisLi.siblings("li").find(".elect img").attr("src","./img/noElect2.png");
         thisLi.find(".elect img").attr("src","./img/elect2.png");
         thisLi.attr("data-flag","1");
         thisLi.siblings("li").removeAttr("data-flag");
         Fw.showPageArea(App.pageA, [App.pageF,App.pageH], true);
         isCheck = "0";
         $('.closeImg').addClass('hidden');
         App.handleCloseBtn(true);
     },
     queryCardBalaRmb:function(){
         
         var url = Fw.dataUrl('repay/queryCardBalaRmb', false);
         if(nowPage=="rmbRepay"){
             var debitCardNo = $('#debitCardNo').val().replace(/ /g, "")//扣款账号;
             var balanceDom = $("#balance");
             var debitCardDom = $('#debitCardNo');
         }else{
             var debitCardNo = $('#debitCardNo1').val().replace(/ /g, "")//扣款账号;
             var balanceDom = $("#balance1");
             var debitCardDom = $('#debitCardNo1');
         }
         var param = {
             debitCardNo:debitCardNo	
         };
         if(debitCardNo.match(/\*/) && debitCardDom.attr('data-orderNum')){
             param.inputFlag = '0';
             param.orderNum= debitCardDom.attr('data-orderNum');
             param.cardFlag= (nowPage=="rmbRepay") ? '1' : '2';
         }else{
             param.inputFlag = '1';
         }
         if(!Fw.isEmpty(param.debitCardNo)){
           Fw.ajaxData(url, param, function(data) {
                 if (data.STATUS == "1") {
                     if(!Fw.isEmpty(debitCardDom.val())){//防止查到余额后用户马上清空借记卡
                         balanceDom.parent().removeClass("hidden");
                         balanceDom.text(Fw.util.Format.fmtMoney(data.cardBalaRmb));
                     }else{
                         balanceDom.parent().addClass("hidden");
                     }
                 }else{
                     balanceDom.parent().addClass("hidden");
                 }
             },Fw.errorAjax);
         }
       
     },
     pageF_back:function(){
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageF], true);
     },
     pageH_back:function(){
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageH], true);
     },
     pageG_back:function(){
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageG], true);
     },
     pageF_to_pageA:function(){
         $('#debitCardNo').val(Fw.util.Format.fmtAcctNo($(this).find('.ui-list-info div:last-child').attr('data-cardNo'),false));
         Fw.Form.trigger($("#pageA"),$("#btn1"));
         Fw.showPageArea('#pageA', [App.pageF], true);
         isCheck = "0";
         // App.queryBankInfoByKBin();
     },
     pageG_to_pageA:function () {
         $('#debitCardNo_for').val(Fw.util.Format.fmtAcctNo($(this).find('.ui-list-info div:last-child').attr('data-cardNo'),false));
         Fw.Form.trigger($("#pageA"),$("#btn2"));
         Fw.showPageArea('#pageA', [App.pageG], true);
     },
     gotoback:function(){
 //    	if('rmbRepay'==nowPage){
 //    		Fw.buriedPoint("人民币还款_还款成功_返回首页");
 //    		Fw.outPageBuriedPoint("人民币还款_还款成功");
 //    	}
         Fw.gotoIndex();
     },
     autoPayment:function(){
         if(document.getElementById('minRepayTips').className.indexOf('hidden') == -1){
             return;
         }
         Fw.buriedPoint("立即还款页面202012_首页_自动还款");
         document.getElementById('editDefine').blur();
         document.getElementById('editDefine1').blur();
         App.queryAutoRepay();
         // App.showAutoRepayAlert();
         
         // Fw.redirect("./autoRepay.html");
     },
     getImg:function (pageId) {
         var url=Fw.dataUrl("credit/queryImgsUrl");
         Fw.ajaxData(url, {pageId:pageId}, function(data){  
             if(data.STATUS=="1"){
                 var dataList = data.AdList;
                  if(pageId == '0207010000'){                          
                      if(dataList[0] && !Fw.isEmpty(dataList[0].IMG_URL)){
                          App.ClickUrlHb1 = dataList[0].CLICK_URL;
                         App.AD_NAME_Hb1 = dataList[0].AD_NAME;
                         $("#imageId").attr("src",dataList[0].IMG_URL);
                         $(".adBox").removeClass("hidden");
                          
                      }else{
                          $(".adBox").addClass("hidden");
                      }
                  }
             }
         }, Fw.errorAjax);
     },
     gotoAdPage:function(){
         if((!Fw.isEmpty(App.ClickUrlHb1))){
             Fw.openNewWebPanel(App.ClickUrlHb1);
         }
     },
     refreTitle:function () {
         $('#pageA').attr('data-btnLeft','true|返回|third');
         $('#pageA').attr('data-btnRight','false|返回|');
         Fw.initPageTitle($('#pageA'));
     },
     closeAd:function(){
         $(".adBox").addClass("hidden");
     },
     showpageK:function(){
         App.handleCloseBtn(false);
         Fw.showPageArea(App.pageK, [App.pageA], true);
     },
     pageK_back:function(){
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageK], true);
     },
     showpageL:function(){
         App.handleCloseBtn(false);
         Fw.showPageArea(App.pageL, [App.pageA], true);
     },
     pageL_back:function(){
         App.handleCloseBtn(true);
         Fw.showPageArea(App.pageA, [App.pageL], true);
     },
     selectCreditCard:function(){
         var creditNo = $(this).find(".bankAccount").html();
         var creditName = $(this).find(".bank").html();
         if(nowPage=='rmbRepay'){
             App.orderNumRmb = $(this).attr("data-orderNum");
             $("#creditCardRmb").html(creditName + "(" + creditNo.substr(creditNo.length-4)+")");
             App.handleCardNo();
             $('.closeImg').addClass('hidden');
             App.pageK_back();
         }else if(nowPage=='foreignCurrRepay'){
             App.orderNumFor = $(this).attr("data-orderNum");
             $("#creditCardFor").html(creditName + "(" + creditNo.substr(creditNo.length-4)+")");
             App.judgeButton_for();
             App.pageL_back();
         }
         $(this).find(".elect img").attr("src","./img/elect2.png");
         $(this).siblings().find(".elect img").attr("src","./img/noElect2.png");
         
     },
     //为了适应人民币还款优化，按钮置灰，拿到标示变量，置灰不至于冲突
     /*---------------------------------------------------------------------------*/
     bind : function(panel, button) {
         panel.find("[data-name]").each(function() {
             var elem = this;
             var node = $(elem);
             panel.delegate(node,'input propertychange change', function() {
                 App.trigger(panel, button);
             });
         });
     },
     trigger : function(panel, button) {
         if (App.validatorRequire(panel)) {
             if(flagIsDisable != '1'){   //暂不支持该银行卡还款的情况下 按钮是置灰的
                 button.removeAttr('disabled');
             }
         } else {
             button.attr('disabled', true);
         }
     },
     validatorRequire : function(panel) {
         var rst = true;
         panel.find("[data-name]").each(function() {
             var elem = this;
             var node = $(elem);
             if (node.is(":hidden") === true) {
                 return rst;
             }
             var value = elem.value || node.attr("data-value") || elem.innerHTML;
             var required = node.attr("data-required");
             var req = required == 'true' || required == 'required';
             // 非空验证
             if (value.trim().length == 0 && req) {
                 rst = false;
             }
 
             //其他校验
             var name = node.attr("data-name");
             if(name){
                 var type = node.attr("data-type") || elem.type ||"";
                 if(!App.validatorItem(node,name,type,value,true)){
                     rst = false;
                 }
             }
         });
         return rst;
     },
     validatorItem : function(item, name, dataType, value, focus){
         var required = item.attr("data-required");//是否必输项
         var req = required == 'true' || required == 'required';
 
         var patt_str = /\'|\"|,|=|:|\{|\}|\[|\]$/;//特殊字符
         var jsonType = item.attr("data-json");
         if (jsonType == "db") {
             patt_str = /\'|\"/;
         }
         // 去逗号
         if (dataType == "money" || dataType == "number") {
             value = value.replace(/,/g, "");
         }
         // 去空格
         value = value.replace(/ /g, "");
 
         // 验证最小长度
         var minL = item.attr("data-minlength");
         if (minL && value.length < (minL * 1)) {
             return false;
         }
         // 验证数据长度
         var len = item.attr("data-len");
         if (len && value.length != (len * 1)) {
             return false;
         }
         // 验证最小值
         var min = item.attr("data-min") || null;
         if (min && min * 1 > value * 1) {
             return false;
         }
         return true;
     },
     GetQueryString:function (name) {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
     },
     getAmortizeAd:function(){
         //获取分期相关广告
         var url = Fw.dataUrl('bystages/getLabel');
         Fw.ajaxData(url,{}, function (data) {
             //分期角标
             if(!Fw.isEmpty(data.label1) && data.label1!==" "){
                 var src = NS.URLS + data.label1;
                 $(".activity_img").find(".imgA").removeClass("hidden").attr("src",src);
             }else{
                 $(".activity_img").find(".imgA").addClass("hidden");
             }
                 //分期话术
             if(!Fw.isEmpty(data.label2)){
                 $(".activity_tips").removeClass("hidden").text(data.label2);
             }else{
                 $(".activity_tips").addClass("hidden");
             }
            
         }, Fw.errorAjax);
    },
     queryBillDate: function () {
         var param = {};
         Fw.openWaitPanel();
         var url = Fw.dataUrl("bystages/queryBillDate");
         Fw.ajaxData(url, param, function (data) {
             if (data.STATUS == "1") {
                 if (data.dateLimit == '1') {//在账单分期办理时间内
                     App.checkLargeMount();
                 }
             } else {
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG);
             }
         }, Fw.errorAjax);
     },
    checkLargeMount:function(){
      var accNoVal = $("#account").val();
         var url = Fw.dataUrl('bystages/queryAccCode');
         Fw.ajaxData(url,{}, function (data) {
              for (var i = 0; i < data.acctList.length; i++) {
                 if (data.acctList[i].accNo == accNoVal) {
                     App.acctMap = data.acctList[i];
                     break;
                 }
             }
            App.queryLargeMount();
         }, Fw.errorAjax);
    },
     queryLargeMount: function () {
         var url = Fw.dataUrl('bystages/queryBigQuota');
         var param = {
             allLoan: "1",//0是查客户名下所有卡，1只查一个账户 此时acctNo必传
             acctNo: $('#account').val(),
             _reqBasePageUrl : 'divide/bill_bystages'
         };
         Fw.ajaxData(url, param, function (data) {
             if (data.STATUS == "1") {
                 App.bigSwitch = data.bigSwitch;
                 if (App.bigSwitch == "1"&&App.acctMap.cStmtFlag==0) {//bigSwitch=="1"大额开启，其他情况大额不可用,cStmtFlag==0没有做过大额
                     App.largeData = data.quotaList[0];
                     if (!Fw.isEmpty(App.largeData) && parseFloat(App.largeData.largeMount) >=  parseFloat(App.rmbStm)) {//有大额额度且大额大额额度比账单金额大
                         $("#contractRmb").addClass("hidden");
                         App.insType = "X";//大额标记
                     }else{
                         $("#contractRmb").removeClass("hidden");
                         App.insType = "Y";//非大额标记
                     }
                 }else{//大额不可用
                     $("#contractRmb").removeClass("hidden");
                     App.insType = "Y";//非大额标记
                 }
                 if (App.insType === "Y" && param.acctNo === "0062") {//小微账户特殊处理
                     App.insType = App.insType + '1';
                 }
                 App.initStagNum_rmb();//查询期数和费率
             }
         }, function(err) {
             if(err.code == 'RPA001') {
                 return ;
             } else {
                 Fw.errorAjax();
             }
         });
     },
     initStagNum_rmb:function(){
          var url = Fw.dataUrl('bystages/getRateByInsType');
          var param = {
              insType: App.insType
          };
          Fw.ajaxData(url, param, function (data) {
              
              if (data.STATUS == "1") {
                  $("#selectCycle_body_rmb").html("");
                  App.rateList = data.rateList;
                  if(nowPage=="rmbRepay"){
                   App.loadStagNum(data.rateList);
                  }
              } else {
                  Fw.alertinfo(data.MSG);
              }
          }, Fw.errorAjax);
     },
     initStagNum_for:function(){
         var url = Fw.dataUrl('bystages/getRateByInsType');
         var param = {
             insType: "Y"
         };
         Fw.ajaxData(url, param, function (data) {
             
             if (data.STATUS == "1") {
                 $("#selectCycle_body_for").html("");
                 App.rateList = data.rateList;
                 if(nowPage=="foreignCurrRepay"){
                     App.loadStagNum(data.rateList);
                 }
             } else {
                 Fw.alertinfo(data.MSG);
             }
         }, Fw.errorAjax);
    },
     loadStagNum: function (num) {//查询默认期数
          Fw.openWaitPanel();
         var parms = {insType: "Y"};
         Fw.ajaxData(Fw.dataUrl("bystages/queryDefaultStageNum"), parms, function (data) {
             var j = 0;
             var sexIndex = -1; //处理默认期数不能用时
             $("#selectCycle_body_rmb").html("");
             $("#selectCycle_body_for").html("");
             Fw.each(num, function (obj) {
                  var li_tpl = '<li data-rateYear="' + obj.rateYear + '" data-totalRate="' + obj.totalRate + '" data-isShow="'+obj.isShow+'" class="lineH50 item_cycle border-b '+obj.STAG_NUM+'">'+
                                  '<label class="cycles"><span class="cycle_val">'+obj.STAG_NUM+'</span>期</label>'+
                                  '<label>利率<span class="newRate">'+obj.STAG_RATE+'</span><span class="oldRate">'+obj.STAG_RATE_STAND+'</span></label>'+
                                  '<div class="selected hidden">'+
                                      '<img src="./img/select_card.png">'+
                                  '</div>'+
                              '</li>';
                  var li_dom = $(li_tpl);
                  if(nowPage=="rmbRepay"){
                      $("#selectCycle_body_rmb").append(li_dom);
                  }else if(nowPage=="foreignCurrRepay"){
                      $("#selectCycle_body_for").append(li_dom);
                  }
                  
                 if (obj.isShow == "1") {//显示标准费率还是差异化费率
                     li_dom.find(".oldRate").removeClass("hidden");
                 } else {
                     li_dom.find(".oldRate").addClass("hidden");
                 }
                
                 if (data.STATUS == "1" && obj.STAG_NUM == data.stageNum) {
                     sexIndex = j;
                 }
                 j++;
             });
             if(sexIndex===-1){//默认期数无效
                 sexIndex = App.checkDefStag(num,"12");  //检查接口返回期数包含默认期数
                 if(sexIndex===-1){//判断12不在
                     sexIndex = 0;
                 }
             }
             if(nowPage=="rmbRepay"){
                 var selectCycle_body = $("#selectCycle_body_rmb");
                 var cycleVal = $("#cycleRmb");
                 var cycle_rate = $("#cycle_rate_rmb");
             }else if(nowPage=="foreignCurrRepay"){
                 var selectCycle_body = $("#selectCycle_body_for");
                 var cycleVal = $("#cycleFor");
                 var cycle_rate = $("#cycle_rate_for");
             }
             selectCycle_body.find('.'+num[sexIndex].STAG_NUM).find(".selected").removeClass("hidden");
             cycleVal.text(num[sexIndex].STAG_NUM);
             cycle_rate.find(".rate_new").text(num[sexIndex].STAG_RATE);
             if(num[sexIndex].isShow == "1"){
                 cycle_rate.find(".rate_old").removeClass("hidden").text(num[sexIndex].STAG_RATE_STAND);
                 App.dataRate = num[sexIndex].STAG_RATE_STAND;
             }else{
                 cycle_rate.find(".rate_old").addClass("hidden");
                 App.dataRate = num[sexIndex].STAG_RATE;
             }
             App.dataNum = num[sexIndex].STAG_NUM;
             App.dataRate = num[sexIndex].STAG_RATE;
             App.rateYear = num[sexIndex].rateYear;
             App.totalRate = num[sexIndex].totalRate;
             $("#dataRateYear,#dataRateYearFor").text(App.rateYear);
             App.refreshStagAmt(); //初始化 每期手续和金额
             Fw.hideWaitPanel();
         }, Fw.errorAjax);
     },
     checkDefStag:function(num,stagNum){
         var falg = -1;
         for(var i=0;i<num.length;i++){
             if(num[i].STAG_NUM == stagNum){
                 falg = i;
                 break;
             }
         }
         return falg;
     },
     refreshStagAmt:function(){
          if(nowPage=="rmbRepay"){
              var coinType='156',insType=App.insType,applyAmt=$("#amortizeMoneyRmb").text().substring(1);
          }else if(nowPage=="foreignCurrRepay"){
              var coinType=App.currType,insType='Y',applyAmt=$("#amortizeMoneyFor").text();
          }
          Fw.openWaitPanel();
         var url = Fw.dataUrl('bystages/queryBillSatgTryAmt');
         var param = { //A页面点击list拿到的数据
             applyAmt: Fw.util.Format.unfmtAmt(applyAmt), //申请金额
             stagNum: App.dataNum, //期数
             accNo: $("#account").val(),
             coinType: coinType,
             insType: insType
         };
         App.amtPass = param.applyAmt;
         App.amtPassOth = param.applyAmt;
         App.insTypePass = param.insType;
         App.currType = param.coinType;
         if(Fw.isEmpty(param.applyAmt) || Fw.isEmpty(param.stagNum) || Fw.isEmpty(param.insType)){
             return false;
         }
         Fw.ajaxData(url, param, function (data) {
             if (data.STATUS == "1") {
                 App.totalSch = data.totalSch;//总手续费
                 App.stagAmt = Fw.util.Format.fmtAmt(data.stagAmt);
                 Aoo.stagSch = Fw.util.Format.fmtAmt(data.totalSch / data.stagNum);
                 if(nowPage=="rmbRepay"){
                     App.stagNum =$("#cycleRmb").text();
                     $('#stagAmt_rmb').html(Fw.util.Format.fmtAmt(data.stagAmt))//每期应还本金
                     Fw.hideWaitPanel();
                     $('#everyStagSch_rmb').html(Fw.util.Format.fmtAmt(data.totalSch / data.stagNum));
                 }else if(nowPage=="foreignCurrRepay"){
                     App.stagNum =$("#cycleFor").text();
                     $('#stagAmt_for').html(Fw.util.Format.fmtCurrType(App.currType) + Fw.util.Format.fmtAmt(data.stagAmt))//每期应还本金
                     $('#everyStagSch_for').html(Fw.util.Format.fmtCurrType(App.currType) + Fw.util.Format.fmtAmt(data.totalSch / data.stagNum));
                     Fw.hideWaitPanel();
                 }
                 App.initRedPackets(param);//查询是否有红包
             } else {
                 Fw.hideWaitPanel();
                 if (data.STATUS == "E231364") {
                     Fw.alertinfo(data.MSG, '提示');
                 }
             }
         }, function (data) {
             Fw.hideWaitPanel();
             if (null == data || typeof(data) == "undefined" || data.msg.length == 0 || typeof(data) == "string") {
                 data = {};
                 data.msg = "系统异常，请稍候访问";
             } else if (data.msg && data.msg.errorCode == "INJ001") {
                 data.msg = '您输入的内容存在特殊字符，请重新输入';
             } else if (data.msg && data.msg.errorCode == "503") {//交易人数过多
                 data.msg = data.msg.errorMsg;
             }
             Fw.alertinfo(data.msg, '提示');
         });
     },
     initRedPackets:function(rData){
         Fw.ajaxData(Fw.dataUrl('bystages/queryRedPacket'), {
             redPacketStatus: "1",
             fee:App.totalSch + "" || "",
             stageNum:rData.stagNum,
             stageType:rData.insType,
             coinType: rData.coinType,
             orignPrice: rData.applyAmt, 
             queryType:"0",
             PAGE_SIZE:"1",
             NEXT_KEY:"0",
             isAvailable:"1"
         }, function (data) {
             Fw.hideWaitPanel();
             if(nowPage=='rmbRepay'){
                 var isAmortize = $(".repaymentModeBar.rmb[data-check='1']").hasClass("amortizeRepay");
                 var _btn = $('#rmbBtn');
                 var redPacketTip = $('.redPacketTip.rmb');
             }else{
                 var isAmortize = $(".repaymentModeBar.for[data-check='1']").hasClass("amortizeRepay");
                 var _btn = $('#forBtn');
                 var redPacketTip = $('.redPacketTip.for');
             }
             if (data.STATUS == "1") {
                 if (data.redPacketList.length != 0 && !Fw.isEmpty(data.redPacketList[0].redpacketAmount)) {
                     App.haveRedPacket = '1';//有红包
                     redPacketTip.removeClass('hidden');
                     if(isAmortize){
                         _btn.text('下一步');
                     }else{
                         _btn.text('确定');
                     }
                     if(nowPage=="foreignCurrRepay"){$('#contractFor').addClass('hidden');}
                 } else {//不存在
                     App.haveRedPacket = '0';//无红包
                     _btn.text('确定');
                     redPacketTip.addClass('hidden');
                     if(nowPage=="foreignCurrRepay"){$('#contractFor').removeClass('hidden');}
                 }
             } else {
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG);
                 _btn.text('确定');
                 redPacketTip.addClass('hidden');
             }
         }, Fw.errorAjax);
     },
     showCycle:function(){
         if(nowPage=='rmbRepay'){
             $("#rmb_pay").find(".selectCycle").animate({"bottom":"0%"});
         }else if(nowPage=='foreignCurrRepay'){
             $("#foreignCurr_pay").find(".selectCycle").animate({"bottom":"0%"});
         }
         $(this).find("img.pull").addClass("active1");
         $("#pageA").css({"position":"fixed","width":"100%"});
         $(".shade").show();
     },
     hideCycle:function(){
         if(nowPage=='rmbRepay'){
             $("#rmb_pay").find(".selectCycle").animate({"bottom":"-100%"});
             $("#cycle_rate_rmb").find("img.pull").removeClass("active1");
         }else if(nowPage=='foreignCurrRepay'){
             $("#foreignCurr_pay").find(".selectCycle").animate({"bottom":"-100%"});
             $("#cycle_rate_for").find("img.pull").removeClass("active1");
         }
         $("#pageA").css({"position":"static"});
         $(".shade").hide();
     },
     changeCycle:function(){
         App.hideCycle();
         var cycle = $(this).find(".cycle_val").text();
         var newRate = $(this).find(".newRate").text();
         var oldRate = $(this).find(".oldRate").text();
         var isShow = $(this).attr("data-isShow");
         $(this).siblings("li").find(".selected").addClass("hidden");
         $(this).find(".selected").removeClass("hidden");
         if(nowPage=='rmbRepay'){
             $("#cycleRmb").text(cycle);
             $("#rateRmb").text(newRate);
             var rate_old = $("#cycle_rate_rmb").find(".rate_old");
             $("#cycle_rate_rmb").find("img.pull").removeClass("active1");
         }else if(nowPage=='foreignCurrRepay'){
             $("#cycleFor").text(cycle);
             $("#rateFor").text(newRate);
             var rate_old = $("#cycle_rate_for").find(".rate_old");
             $("#cycle_rate_for").find("img.pull").removeClass("active1");
         }
         App.dataNum = cycle;
         App.dataRate = newRate;
         App.rateYear = $(this).attr('data-rateYear');
         App.totalRate = $(this).attr('data-totalRate');
         $("#dataRateYear,#dataRateYearFor").text(App.rateYear);
         App.refreshStagAmt(); //初始化 每期手续和金额
         isShow == "1"?rate_old.removeClass("hidden").text(oldRate):rate_old.addClass("hidden");
         
     },
     agreeContract:function(){
        $(this).toggleClass("agreeCon");
        var agreeCon = $(this).hasClass("agreeCon");
        if(agreeCon){
            $(this).css({"border":"1px solid #1bb465"});
        }else{
            $(this).css({"border":"1px solid #5f656b"});
        }
     },
     showAgreement: function () {
         // Fw.buriedPoint("账单分期_分期信息", "阅读协议");
         //var urlPrefix = '/mmc/page/threePage/';
         var params = {
             stagNum: App.dataNum,
             dataRate: App.dataRate,
             applyAmt: App.amtPassOth,
             totalFee:App.totalSch,
             coinType:App.currType,
             rateYear:App.rateYear,
             pageFlag:"repayment",
             stagAmt:App.stagAmt,
             stagSch:App.stagSch
         }
         Fw.openNewWebPanel('../divide/agreement/billStaging.html',params);  //普通
     },
     useRedPacket: function () {
         $("#redPackets").val("");
        $(".redpacketBox").removeClass("hidden");
        $("#pageA").css({"position":"fixed","width":"100%"});
        $(".shade").show();
     },
     changeRedPackets: function () {
         var data = $('#redPackets').val() == '' ? '0' : $('#redPackets').val();
         if (parseFloat(data) > parseFloat($('#redpacket_use').html())) {//输入的金额大于最大可用红包，手续费等于总手续费-最大可用红包值
             $('#redPackets').val(Fw.util.Format.fmtAmt($('#redpacket_use').html()));//最大可用红包值
         } else {                                          //输入的金额小于最大可用红包，手续费等于总手续费-输入的红包值
             $('#last_money').html('¥' + Fw.util.Format.fmtAmt(parseFloat(App.totalSch) - parseFloat(data)));
         }
     },
     okRedPacket: function () {
         $(".redpacketBox").addClass("hidden");
         $(".shade").hide();
         $("#pageA").css({"position":"static"});
         $('#redPacketMax').html($('#redPackets').val());//当前选用红包
         var money = "";
         if ($('#redPackets').val() === "") {
             money = parseFloat(App.totalSch) - parseFloat(Fw.util.Format.unfmtAmt($('#redpacket_use').html()));
             $('#redPacketMax').html($('#redpacket_use').html());//用户未输入金额，默认使用最大红包
         } else {
             money = parseFloat(App.totalSch) - parseFloat(Fw.util.Format.unfmtAmt($('#redPackets').val()));
             $('#redPacketMax').html($('#redPackets').val());//当前选用红包
         }
         $('#everyStagSch_rmb').html(Fw.util.Format.fmtAmt(parseFloat(money / $('#cycleRmb').text())));//用过红包后每期手续费
         App.totalMoney = money;
      },
      cancleRedPacket: function () {
          $(".redpacketBox").addClass("hidden");
          $(".shade").hide();
          $("#pageA").css({"position":"static"});
          $('.redPack_input').val('');
       },
     queryBillheadTryAmt:function(){
         if(nowPage=="rmbRepay"){
             var id='account',stagNum=$("#cycleRmb").text(),applyMoney=$("#amortizeMoneyRmb").text().substring(1);
         }else if(nowPage=="foreignCurrRepay"){
             var id='account1',stagNum=$("#cycleFor").text(),applyMoney=$("#amortizeMoneyFor").text();
         }
         
         var url = Fw.dataUrl('bystages/queryBillheadTryAmt');
         var param = { 
             accNo: $("#account").val(),
             stagNum: stagNum,
             applyMoney: Fw.util.Format.unfmtAmt(applyMoney),
             totalFee: App.totalSch
         };
         if(Fw.isEmpty(param.stagNum) || Fw.isEmpty(param.totalFee)){
             $(".shade").hide();
             return false;
         }
         Fw.openWaitPanel();
         Fw.onceCmbcAjaxData(url, param, function (data) {
             if (data.STATUS == "1") {
                 App.initPageN(data.listBillheah, data.tryData[0],param);
             } else {
                 Fw.hideWaitPanel();
                 $(".shade").hide();
                 Fw.alertinfo(data.MSG);
             }
         }, function (data) {
             Fw.hideWaitPanel();
             $(".shade").hide();
             if (null == data || typeof(data) == "undefined" || data.msg.length == 0 || typeof(data) == "string") {
                 data = {};
                 data.msg = "系统异常，请稍候访问";
             } else if (data.msg && data.msg.errorCode == "INJ001") {
                 data.msg = '您输入的内容存在特殊字符，请重新输入';
             } else if (data.msg && data.msg.errorCode == "503") {//交易人数过多
                 data.msg = data.msg.errorMsg;
             }
             Fw.alertinfo(data.msg, '提示');
         });
     },
   initPageN: function (data, tryData,param) {
         App.jsonBill = {};
         App.jsonBill.accNo = param.accNo;//当前账户的 编号
         App.jsonBill.coupon = App.coupon;//红包对应的编码
         App.jsonBill.applyAmt = param.applyMoney;//分期金额
         
         var sholdRepayment = '';
         if (nowPage=="rmbRepay") {//人民币
             sholdRepayment = data[0].sholdRepayment;
             App.jsonBill.coinType = "156";//币种
             App.jsonBill.insType = App.insType; //标志
         } else if(nowPage=="foreignCurrRepay") {//外币
             sholdRepayment = data[1].sholdRepayment;
             App.jsonBill.coinType = App.currType;//币种
             App.jsonBill.insType = "Y"; //标志
         }
         var repayMoney = parseFloat(sholdRepayment) - parseFloat(App.jsonBill.applyAmt);//本期账单还需还款金额
         if (repayMoney < 0) {
             App.repayMoney = "0.00";
         } else {
             App.repayMoney = repayMoney;//还需还款额;
         }
         App.changeD();
         
     },
     changeD: function () {
         // Fw.buriedPoint("账单分期_分期确认", "确认");
         if (App.haveRedPacket && App.haveRedPacket == '1' && $("#redPacketMax").text() !=0) {//有红包
             App.jsonBill.scoreValue = parseInt(Fw.util.Format.unfmtAmt($('#redPacketMax').html())) + '';//红包金额
             App.jsonBill.courseNo = App.courseNo;
             App.jsonBill.totalSch = App.totalSch;//总手续费
         } else {
             App.jsonBill.courseNo = '';
         }
         App.singleSessionToken_bill();
     },
     singleSessionToken_bill: function () {
         var url=Fw.dataUrl('credit/singleSessionToken'); //获取会话随机数
         Fw.onceCmbcAjaxData(url, {}, function(data){
             if(data.STATUS=="1"){
                 App.jsonBill.singleToken = data.singleToken;
                 App.applyBillSatg();
             }else{
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG);
             }
             
         },Fw.errorAjax);
     },
     applyBillSatg: function () {
          var url = Fw.dataUrl('bystages/applyBillSatg');
          Fw.onceCmbcAjaxData(url, App.jsonBill, function (data) {
              Fw.hideWaitPanel();
              if (data.STATUS == "1") {
                  App.queryImgEndPage();//加载结果页广告
                  Fw.reloadClientInfo();//刷新客户端首页数据
                  // Fw.inPageBuriedPoint("账单分期_分期结果");
                  if (App.repayMoney == 0) {
                      $('.icon-cachMoney').addClass('hidden');
                  }
                  App.AmortizeList=[];
                  if (nowPage=="rmbRepay") {//人民币
                      $('#cach_money').html("¥"+Fw.util.Format.fmtAmt(App.repayMoney));//还需还款金额
              
                      $("#rmbBtn").attr("disabled",false);
                  } else if(nowPage=="foreignCurrRepay") {//外币
                      $('#cach_money').html(Fw.util.Format.fmtCurrType(App.currType)+Fw.util.Format.fmtAmt(App.repayMoney));//还需还款金额
                      
                      $("#forBtn").attr("disabled",false);
                  }
                  $(".shade").hide();
                  $('body').css({background:'#fff'});
                  Fw.showPageArea(App.pageN, [App.pageA, App.pageB], true);
                  Fw.outPageBuriedPoint("立即还款页面202012_首页");
                  Fw.inPageBuriedPoint("立即还款页面202012_分期成功页");
                  //刷新客户端首页数据 
                  Fw.aheadOfVersion("5.41", function () {
                     Fw.Client.refreshUserBillDetailByAcctNo({acctNo:$('#account').val()});
                  }, function () {
                      Fw.reloadClientInfo(); 
                  });
              } else {
                  $("#rmbBtn").attr("disabled",false);
                  $("#forBtn").attr("disabled",false);
                  $(".shade").hide();
                  if (!(data.STATUS == "2" && $('#pageN').css('display') == "block")) {
                      Fw.alertinfo(data.MSG);
                  }
              }
          }, function (data) {
              $("#rmbBtn").attr("disabled",false);
              $("#forBtn").attr("disabled",false);
              $(".shade").hide();
              Fw.alertinfo(data.msg);
          });
     },
     /*去还款*/
     goCachMoney: function () {
         App.pageN_back();
     },
     queryImgEndPage: function () {
         var url = Fw.dataUrl("credit/queryImgsUrl");//成功页广告位
         var param = {
             pageId: '0208030200'
         }
         Fw.ajaxData(url, param, function (data) {
             if (data.STATUS == '1') {
                 if (data.AdList.length != 0) {
                     App.AdList = data.AdList;
                     $("#image3Id").attr("src", data.AdList[0].IMG_URL);
                     App.ClickUrl3 = data.AdList[0].CLICK_URL;
                     $('.recommWrap').removeClass('hidden');
                 } else {
                     $('.recommWrap').addClass('hidden');
                 }
             } else {
                 $('.recommWrap').addClass('hidden');
             }
         }, Fw.errorAjax);
     },
     pageN_back: function () {
         Fw.outPageBuriedPoint("立即还款页面202012_分期成功页");
         if(nowPage=="rmbRepay"){
              var flag = 'rmb';
          }else if(nowPage=="foreignCurrRepay"){
              var flag = 'forRepay';
          }
          Fw.redirect('./newRepay.html',{
                 accountVal:$('#account').val(),
                 page_Flag:flag
             });
     },
     setDefaultRepayMethod: function(){
         //默认设置自定义还款模式
         var defineRepay = $(".repaymentModeBar.defineRepay");
         defineRepay.find("img.elect").attr("src","./img/elect2.png");
         defineRepay.attr("data-check","1");
         defineRepay.find(".edit img").attr("src","./img/edit.png");
         defineRepay.siblings(".repaymentModeBar").removeAttr("data-check");
         defineRepay.siblings(".repaymentModeBar").find("img.elect").attr("src","./img/noElect2.png");
         defineRepay.siblings(".repaymentModeBar").find(".edit img").attr("src","./img/noEdit.png");
         defineRepay.siblings(".repaymentModeBar").find(".changeColor").removeClass("font-color");
         defineRepay.find(".changeColor").addClass("font-color");
         //分期详情模块默认收起
         $(".amortizeDetail_new,.amortizeRepay .amortizeDetail").addClass("hidden");
     },
     /*---------------------------------------------------------------------------*/
     queryImgUrl: function () {
         $(".ad-imgs").html("");
         var url = Fw.dataUrl('credit/queryImgsForAll', false);
         var param = {
             pageId: '0207040000',
         };
         Fw.ajaxData(url, param, function (result) {
             if (result && result.STATUS == 1) {
                 if (result.AdList && result.AdList.length > 0) {
                     var advList = result.AdList;
                     var advLen = advList.length;
                     for (var i = 0; i < advLen; i++) {
                         if (advList[i].IMG_URL && advList[i].CLICK_URL) {
                             advList[i].IS_LOGIN = advList[i].IS_LOGIN || 'N';
                             advList[i].LOGIN_URL = advList[i].LOGIN_URL || '';
                             var newText = '<img src="' + advList[i].IMG_URL + '"'
                                 + ' onclick="App.judgeLoginJump(\'' + advList[i].IS_LOGIN + '\',\''
                                 + advList[i].CLICK_URL + '\',\'' + advList[i].LOGIN_URL + '\',\''
                                 + advList[i].AD_NAME_SUB + '\')">';
                             $(".ad-imgs").append(newText);
                         }
                     }
                     $(".ad-recommend").css("display", "block");
                 } else {
                     $('.ad-recommend').css("display", "none");
                 }
             } else {
                 $('.ad-recommend').css("display", "none");
             }
         }, Fw.errorAjax);
     },
     judgeLoginJump: function (login, url, thirdPort, adName) {
         Fw.buriedPoint('还款结果页_为您推荐_' + adName);
         if (login === "Y") {
             var param = {
                 success: function (url, thirdPort) {
                     App.goAdvUrl(url, thirdPort);
                 },
                 forbidReload: true,
             };
             Fw.afterLogin(param);
         } else if (login === "N") {
             App.goAdvUrl(url, thirdPort);
         }
     },
     goAdvUrl: function (url, thirdPort) {
         if (thirdPort) {
             switch (thirdPort) {
                 case 'thirdLoginCommon':
                 case 'thirdLoginWyxy':
                     Fw.ajaxData(Fw.dataUrl("credit/" + thirdPort, false), {click_url: url}, function (rp) {
                         Fw.hideWaitPanel();
                         if (rp && rp.reqData) {
                             Fw.openNewWebPanel(rp.reqData);
                         } else {
                             Fw.errorAjax(rp);
                         }
                     }, Fw.errorAjax);
                     break;
                 default :
                     Fw.ajaxData(Fw.dataUrl("credit/" + thirdPort, false), {}, function (rp) {
                         Fw.hideWaitPanel();
                         if (rp && rp.reqData) {
                             Fw.openNewWebPanel(url + rp.reqData);
                         } else {
                             Fw.errorAjax(rp);
                         }
                     }, Fw.errorAjax);
                     break;
             }
         } else {
             Fw.openNewWebPanel(url);
         }
     },
     bankCardJudg: function () {
         othbankFlag="0";
         sureAuthStatusFlag = '0';
        var debitCardNo = $("#debitCardNo").val().replace(/ /g,"");
        var debitCardNoLen = debitCardNo.length;
        var minLength = $("#debitCardNo").attr("data-minlength");
        if(Fw.isEmpty(debitCardNo) || debitCardNoLen<minLength){
             return false;
        }
        var url = Fw.dataUrl("repay/bankCardJudg");//判断是否是他行卡
        var param = {
         debitCardNo: debitCardNo
        };
        if(debitCardNo.match(/\*/) && $('#debitCardNo').attr('data-orderNum')){
             param.orderNum = $('#debitCardNo').attr('data-orderNum');
             param.inputFlag = '0';
         }else{
             param.inputFlag = '1';
         }
        Fw.ajaxData(url, param, function (data) {
            if (data.STATUS == '1') {
                if(data.repayBank=='othbank'){
                 othbankFlag="1";
                 var repayMoney_fmt = $("#defineMoney").text().substring(1);
                 var repayMoney = Fw.util.Format.unfmtAmt(repayMoney_fmt);//还款金额
                     if(billFlag_rmb=='1'){//已出账单
                         if(parseFloat(repayMoney) > parseFloat(App.sholdRepayment_rmb)){
                             //若还款金额大于本期未还金额，默认置为本期未还金额
                             Fw.alertinfo("他行卡最高还款金额为¥"+Fw.util.Format.fmtMoney(App.sholdRepayment_rmb) +"，已为您更改为最高金额");
                             $("#defineMoney").text('¥'+Fw.util.Format.fmtMoney(App.sholdRepayment_rmb));
                             var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
                             var params={
                                     repayRmbMoney:App.sholdRepayment_rmb,//还款金额
                                     repayFlag:"1"//存取标识 1存  2 取
                             };
                             Fw.ajaxData(url,params, function(data){
                                 if(data.STATUS=="1"){//存储成功
                                     $("#repay_rmbmoney").text("¥"+Fw.util.Format.fmtMoney(App.sholdRepayment_rmb));
                                     $("#balance").parent().addClass("hidden");//他行卡不显示余额
                                     //还款金业务逻辑
                                     App.serialNum = '';//流水号置空，下次还款的时候生产新流水号
                                     $('.noCoupon').addClass('hidden');
                                     App.couponDiscount(0);//计算抵扣金额与实际还款金额
                                 }
                             }, Fw.errorAjax);
                         }
                     }else if(billFlag_rmb=='2'){//未出账单
                         //如果未出账单为0时，单独处理
                         if(App.totalPayRmb==0){
                             Fw.alertinfo("他行卡不支持溢缴款还款，请您输入本行借记卡","提示",function(){
                                 $("#debitCardNo").removeClass('hidden').val("").removeAttr('data-orderNum');
                                 $('#fmtDebitCardNo').addClass('hidden');
                                 $('.bankLogo.rmb').removeAttr('src').addClass('hidden');
                                 App.handleCardNo();
                             });
                             return false;//如果未出账单为0时,不走下面的逻辑
                         }
 
                         if(parseFloat(repayMoney) > parseFloat(App.totalPayRmb)){
                             //若还款金额大于未出账单，默认置为未出账单
                             Fw.alertinfo("他行卡最高还款金额为¥"+Fw.util.Format.fmtMoney(App.totalPayRmb) +"，已为您更改为最高金额");
                             $("#defineMoney").text('¥'+Fw.util.Format.fmtMoney(App.totalPayRmb));
                             var url=Fw.dataUrl('repay/saveRepayMoney');//把金额存到缓存里，防篡改
                             var params={
                                     repayRmbMoney:App.totalPayRmb+"",//还款金额
                                     repayFlag:"1"//存取标识 1存  2 取
                             };
                             Fw.ajaxData(url,params, function(data){
                                 if(data.STATUS=="1"){//存储成功
                                     $("#repay_rmbmoney").text("¥"+Fw.util.Format.fmtMoney(App.totalPayRmb));
                                     $("#balance").parent().addClass("hidden");//他行卡不显示余额
                                     //还款金业务逻辑
                                     App.serialNum = '';//流水号置空，下次还款的时候生产新流水号
                                     $('.noCoupon').addClass('hidden');
                                     App.couponDiscount(0);//计算抵扣金额与实际还款金额
                                 }
                             }, Fw.errorAjax);
                         }
                     }
                }
            }
        }, Fw.errorAjax);
     },
      queryCanStagByAccount: function (param) {
         var url = Fw.dataUrl("bystages/queryCanStagByAccount");//根据账户类型，判断是否可办理分期
         Fw.ajaxData(url, param, function (data) {
             // 1已分期过  2未分期但不满足条件 3未分期且满足条件
             if (data.code == '1' || data.code == '2') {
                 $("#goRepay,#queryBill").removeClass("hidden");
                 $("#billStage").addClass("hidden");
             }else if(data.code == '3'){
                 $("#billStage,#goRepay").removeClass("hidden");
                 $("#queryBill").addClass("hidden");
             }
             
         }, function(){
             $("#goRepay,#queryBill").removeClass("hidden");
             $("#billStage").addClass("hidden");
         });
     },
     visibilityChange: function (param) {
         document.onvisibilitychange = function(){
             var dom = document.querySelectorAll('.selectAccount');
             for(var i=0;i<dom.length;i++){
                 if(document.querySelectorAll('.selectAccount')[i].style.bottom !== '-100%'){
                     return;
                 }else{
                     $('.shade').hide();
                 }
             }
         };
     },
     checkUsrPayPwdIsOpen: function (hasPayCallBack, setPayCallBack) {
         Fw.openWaitPanel();
         Fw.ajaxData('/credit/getUsrNetPayPwdStatus.json', {}, function (reData) {
             Fw.hideWaitPanel();
             if (reData && reData.isOpenPayPwd == "false") {
                 Fw.confirm("您尚未设置支付密码，设置之后可进行交易，是否立即设置", "提示", function () {
                     setPayCallBack && setPayCallBack();
                 }, function () { 
                     $('.shade').hide();
                 }, "立即设置", "取消")
             } else {
                 hasPayCallBack && hasPayCallBack(reData);
             }
         }, function (errData) {
             Fw.hideWaitPanel();
             if (errData.code == "thirdLogin.wechat.error") {
                 Fw.inWechatLoginStateGotoLogin();
             } else {
                 hasPayCallBack && hasPayCallBack(errData);
             }
         });
     },
       // 选择还款方式
       change_reapy: function (e) {
         Fw.outPageBuriedPoint("立即还款页面202012_首页");
           var cur_way = document.querySelector('.repayTitle[data-select]');
           var eventTarget = event.currentTarget.children[0];
         if (!eventTarget.hasAttribute('data-select')) {
             cur_way && cur_way.removeAttribute('data-select');
             eventTarget.setAttribute('data-select', '');
         }
         if(eventTarget.innerHTML === '储蓄卡自动还款'){
             Fw.redirect("./autoRepay.html",{_acctNo: $("#account").val()});
             Fw.buriedPoint("立即还款页面202008_自动还款方式_储蓄卡自动还款");
         }else{ 
             //点击的是财富账户自动还款。需要判断是否开通了财富账户
             Fw.buriedPoint("立即还款页面202008_自动还款方式_财富账户自动还款");
             Fw.openWaitPanel();
             Fw.ajaxData(Fw.dataUrl("credit/queryElectronicInfo", false),{}, function (rpdata) {
                 Fw.hideWaitPanel();
                 if (rpdata.STATUS == '1' ) {
                     if(rpdata.accountStatus == '1' && rpdata.signFlag == '1' && rpdata.bindCardStatus == '1'){
                         Fw.redirect("./autoRepay.html",{reapyByWealth:true,_acctNo: $("#account").val()});
                     }else{
                         Fw.redirect('../usr_info/wallet/index.html',{flag:"1"});
                     }
                 } else {
                     Fw.redirect('../usr_info/wallet/index.html',{flag:"1"});
                 }
             }, function (errData) {
                 Fw.hideWaitPanel();
                 Fw.alertinfo(errData.msg,'',function(){Fw.goBack();});
             });
         }
         
     },
      queryAutoRepay: function () {
           //判断是否设置了自动还款
         if(nowPage=="rmbRepay"){
             var coinType='156';
         }else if(nowPage=="foreignCurrRepay"){
             var coinType=App.currType;
         }
        var url = Fw.dataUrl('repay/queryAutoRepay',false);
        var params = { 
            _reqBasePageUrl:"repayment",
            acctNo: $("#account").val(),
            coinType: coinType,
        };
           Fw.openWaitPanel();
           Fw.ajaxData(url,params, function (rpdata) {
               Fw.hideWaitPanel();
               if (rpdata.STATUS == '1' ) {  //设置了自动还款
                 Fw.outPageBuriedPoint("立即还款页面202012_首页");
                 Fw.redirect("./autoRepay.html",{_acctNo: $("#account").val()});
               } else {
                 App.showAutoRepayAlert() 
               }
           }, function (errData) {
               Fw.hideWaitPanel();
               Fw.alertinfo(errData.msg,'',function(){Fw.goBack();});
           });
       },
       showAutoRepayAlert:function(){
         $('.shade').show();
         $(".selectAccount.rmb").addClass("hidden");
         $(".selectAccount.for").addClass("hidden");
         $(".selectAccount.account").removeClass("hidden");
         $(".selectAccount.account").animate({"bottom":"0"});
         $("#pageA").css({"position":"fixed","width":"100%"});
         
       },
       getRepayAdvInfo : function(success,fail){
         var url = Fw.dataUrl('credit/getRepayAdvInfo');
         Fw.ajaxData(url,{},function (data) {
             if (data.STATUS == '1'){
                 if (data.advList && data.advList.length >0){
                     success && success();
                 }else {
                     fail && fail();
                 }
             }else{
                 fail && fail();
                 Fw.hideWaitPanel();
                 Fw.alertinfo(data.MSG);
             }
         },Fw.errorAjax);
     },
     clearInput: function(){
         $(this).siblings('input').focus().val('');
         $(this).addClass('hidden');
         $(this).parent().find('.digitTips,.digitTips1').hide();
         return false;
     },
     showBankLogo: function (debitDom,bankLogo,valSpan) {
         var _val = debitDom.val();
             valSpan.html(_val);
         var _length = _val.replace(/ /g, "").substring(0, 6).length;
         if(_length < 6){return bankLogo.addClass('hidden').removeAttr('src');};
         setTimeout(function(){
             bankLogo.removeClass('hidden');
             var spanWidth = valSpan.width() + 50 + 'px';
             if(debitDom.hasClass('hidden')){
                 var fmtDom = nowPage == 'rmbRepay' ? $('#fmtDebitCardNo') : $('#fmtDebitCardNo1');
                 bankLogo.css({right: fmtDom.width()+30 + 'px'});
             }else{
                 bankLogo.css({right: spanWidth});
             }
         },100);
     },
     initMyTab: function(){
         var acctNo = $('#account').val();
         var accNoArr = ['0010','0110','0210','0310','0410','0510'];
         if(accNoArr.indexOf(acctNo) != -1){//双币种显示tab
             $('.yt-tab-nav').removeClass('hidden');
             $('.yt-tab').css({backgroundSize:'100% 2.15rem'});
         }else{
             $('.yt-tab-nav').addClass('hidden');
             $('.yt-tab').css({backgroundSize:'100% 1.7rem'});
         }
     },
     gotoAdPage3:function(){
         if((!Fw.isEmpty(App.ClickUrl3))){
             Fw.openNewWebPanel(App.ClickUrl3);
         }
     },
     showDebitCardInput:function(){
         $(this).text('').addClass('hidden');
         $(this).siblings('.editInput').find('input').removeClass().focus().val('').removeAttr('data-orderNum');
     },
     couponDiscount2:function(data1){
         var params1 = {
             billFlag_rmb:billFlag_rmb,
             accountType:$("#account").find("option:selected").val(),
             repayBal:data1.RmbMoney+'',
             serialNum:App.serialNum||""
         };
         if (App.orderNumRmb) {
             params1.cardNo = App.orderNumRmb;
         }else {
             return false;
         }
         var url2 = Fw.dataUrl('repay/queryRepayCouponList');
         Fw.ajaxData(url2,params1,function (data) {
             if (data){
                 if (data.resp && data.encryptInfo) {
                     App.resp = data.resp;
                     App.encryptInfo = data.encryptInfo;
                 }
                 if (data.STATUS == "1"){
                     Fw.hideWaitPanel();
                     $("#discountVal").text("-¥"+Fw.util.Format.fmtMoney(data.couponDiscount));//抵扣金额
                     $('.realMoney').html('实际扣款<span id="realVal">¥'+Fw.util.Format.fmtMoney(data.actualBal)+'</span>');
                     App.serialNum = data.serialNum;
                     App.isUseRepayCoupon = data.isUseRepayCoupon;
                     App.actualBal = data.actualBal;
                     //判断是否是最大优惠
                     if (data.isMaxDiscount && data.isMaxDiscount == true ) {
                         $('.discountTips').removeClass('hidden');
                     }else{
                         $('.discountTips').addClass('hidden');
                     }
                     App.noCoupon = data.noCoupon;
                     App.couponAvaliable = data.couponAvaliable;
                     App.hasValidRepayAdv = data.hasValidRepayAdv;
                     if (App.couponAvaliable && App.noCoupon && App.noCoupon == '1') {//有还款金券并且还款金券不可用
                         $('.noCoupon').removeClass('hidden');
                         $('#discountVal,.realMoney,.discountTips').addClass('hidden');
                     }else if(App.couponAvaliable && App.noCoupon && App.noCoupon == '0'){//有还款金券并且还款金券可用
                         $('.noCoupon').addClass('hidden');
                         $('#discountVal,.realMoney').removeClass('hidden');
                     }else if(!App.couponAvaliable){//无还款金券
                         $('.repay_coupon').addClass('hidden');
                     }
                 }else {
                     Fw.hideWaitPanel();
                     $('.noCoupon').removeClass('hidden');
                 }
             }
 
         },Fw.errorAjax);
     },
     initRate: function () { // 初始化汇率
         var url=Fw.dataUrl('bystages/queryExch');
         var param={ //A页面点击list拿到的数据
             coinTypeCode:App.currType,//币种
             rateType:'6'//后台用于区分的
         }
         Fw.ajaxData(url, param, function(data){
             if(data.STATUS=="1"){
                 var rate=(data.ratePrice).split(".")
                 if(rate[1].substring(2)==0){
                     $('#rate').html(parseFloat(data.ratePrice).toFixed(2));//显示汇率 去除0
                 }else{
                     $('#rate').html(parseFloat(data.ratePrice));//显示汇率 
                 }
                 App.forrate=data.ratePrice;//外币汇率
             }
         }, Fw.errorAjax);
     },
     handleCloseBtn: function(val){
         Fw.aheadOfVersion('7.5', function () {
             Fw.setWebviewCloseIconVisibility({
                 show: val
             });
         }, function () {});
     },
     goCoupons: function(val){
          // var url = NS.TRUNK?"https://rs.creditcard.cmbc.com.cn/":"https://mt.creditcard.cmbc.com.cn/";
          Fw.openNewWebPanel('/mmc/page/threePage/repaymentActivities/index.html',{resp:App.resp,encryptInfo:App.encryptInfo},function(){
             var flag = localStorage.getItem('_lx_goRepay');
             localStorage.removeItem('_lx_goRepay');
             if(flag == '1'){App.hideSelectAccount();return}
             if (Fw.os == 'android') {
                 x5CallNative('setWatiPanel', {
                     "status": "1",
                     success: "",
                     "delay":"0"
                 }, 'UI');
                 setTimeout(function(){
                     App.couponDiscount('1');
                 },1500);
             }else {
                 App.couponDiscount('1');
             }
     });
     },
     // agreeRepayRuleFun: function(){
     //     if($(this).parents(".agreeRepay_rule").attr("data-id")=="0"){
     //         $(this).attr("src","./img/elect1.png");
     // 		$(this).parents(".agreeRepay_rule").attr("data-id","1");
     //     }else{
     //         $(this).attr("src","./img/noElect1.png");
     //         $(this).parents(".agreeRepay_rule").attr("data-id","0");
     //     }
     // },
     repaymentAgreementFun: function(){
         Fw.openNewWebPanel('/mmc/page/threePage/paymentAgreement/index.html');
     },
     agreeauthorizationFun:function(){
         sureAuthStatusFlag = '1';
         if (dataPageOnce == "0") {
             dataPageOnce = "1";
             setTimeout(function () {
                 dataPageOnce = "0";
             }, 500)
             $(".authorization_shade").css("display","none");
             // if($("#agreeRepayRule").attr("data-id")!="1"){
             // 	Fw.toast("请阅读并同意《信用卡还款服务协议》！");
             // 	return false;
             // }
             App.singleSessionToken('rmb');
         }
     },
     
     disagreeauthorizationFun:function(){
         $(".authorization_shade").css("display","none");
     },
     getUserCardAuthStatus: function(){
         if (dataPageOnce == "0") {
             dataPageOnce = "1";
             setTimeout(function () {
                 dataPageOnce = "0";
             }, 500)
             if(othbankFlag=="1" && sureAuthStatusFlag == '0'){
                 App.getUserCardAuthStatusOnce();
             }else{
                 // if($("#agreeRepayRule").attr("data-id")!="1"){
                 // 	Fw.toast("请阅读并同意《信用卡还款服务协议》！");
                 // 	return false;
                 // }
                 App.singleSessionToken('rmb');
             }
         }
     },
     getUserCardAuthStatusOnce: function(){
         Fw.openWaitPanel(); 
         var url = Fw.dataUrl("repay/getUserCardAuthStatus", false);
         if($('#debitCardNo').val().replace(/ /g,"").match(/\*/) && $('#debitCardNo').attr('data-orderNum')){
             var params={
                 "orderNum":$('#debitCardNo').attr('data-orderNum'),
                 "cardFlag":'1',
                 "inputFlag":'0'
             };
         }else{
             var params={
                 "inputFlag":'1',
                 "cardFlag":'1',
                 "cardNo":$('#debitCardNo').val().replace(/ /g,"")
             };
         }
         Fw.ajaxData(url, params, function (rpdata) {
             if (rpdata && rpdata.STATUS == "1") {
                 if(rpdata.authStatus){
                     // if($("#agreeRepayRule").attr("data-id")!="1"){
                     // 	Fw.toast("请阅读并同意《信用卡还款服务协议》！");
                     // 	return false;
                     // }
                     App.singleSessionToken('rmb');
                 }else{
                     userCardAuthStatusFlag = '1';
                     if($(".authorizationLetter").attr('src')==""){
                         $(".authorizationLetter").attr('src','/mmc/page/threePage/authorizationLetter/index.html');
                     }
                     $(".authorization_shade").css("display","block");
                     $(".authorization_content").scrollTop(0);
                     setTimeout(function(){
                         Fw.hideWaitPanel();
                     })
                     document.domain = location.hostname;
                     $(".authorizationLetter").on('load', function () {
                         $(".authorizationLetter").height($(".authorizationLetter").contents().find(".authorizationLetterDiv").height())
                     })
                 }
             }else{
                 userCardAuthStatusFlag = '1';
                 if($(".authorizationLetter").attr('src')==""){
                     $(".authorizationLetter").attr('src','/mmc/page/threePage/authorizationLetter/index.html');
                 }
                 $(".authorization_shade").css("display","block");
                 $(".authorization_content").scrollTop(0);
                 setTimeout(function(){
                     Fw.hideWaitPanel();
                 })
                 document.domain = location.hostname;
                 $(".authorizationLetter").on('load', function () {
                     $(".authorizationLetter").height($(".authorizationLetter").contents().find(".authorizationLetterDiv").height())
                 })
             }
         }, function (errData) {
             userCardAuthStatusFlag = '1';
             if($(".authorizationLetter").attr('src')==""){
                 $(".authorizationLetter").attr('src','/mmc/page/threePage/authorizationLetter/index.html');
             }
             $(".authorization_shade").css("display","block");
             $(".authorization_content").scrollTop(0);
             setTimeout(function(){
                 Fw.hideWaitPanel();
             })
             document.domain = location.hostname;
             $(".authorizationLetter").on('load', function () {
                 $(".authorizationLetter").height($(".authorizationLetter").contents().find(".authorizationLetterDiv").height())
             })
         });
     },
 };
 
 /**
  * 页面加载完毕后，初始化应用
  */
 Fw.onReady(App);