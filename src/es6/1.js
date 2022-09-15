function ShowElement(element) {

    App.changeDays = true;

    var oldhtml = element.innerHTML;

    var newobj = document.createElement('input');

    newobj.type = 'tel';

    newobj.value = "";

    newobj.style.color = '#AAAAAA';

    element.style.background = '#FFFFFF';

    newobj.setAttribute("placeholder", "1-30的整数");

    newobj.onblur = function () {

        element.innerHTML = this.value == oldhtml ? oldhtml : this.value;

        if (this.value == "" || parseInt(this.value) == 0) {

            element.innerHTML = "自定义";

            element.style.color = '#AAAAAA';

            element.style.borderColor = '#AAAAAA';

            $("#applyOfDays").text("30");

            $(".ui-maxDay-data").eq(0).css("color", "#55BA68");

            $(".ui-maxDay-data").eq(0).css("border", "0.5px solid #55BA68");

            $(".ui-maxDay-data").eq(0).css("background", "rgba(85,186,104,0.08)");

            $(".ui-maxDay-data").eq(0).append("<span class='choose'></span>");

            App.defaultDays = $("#applyOfDays").text();

            App.overTimeMethod();

            App.getEndDate();

        } else {

            this.value = parseInt(this.value);

            element.style.color = '#55BA68';

            element.style.borderColor = '#55BA68';

            element.innerHTML = this.value + "天";

            var node = document.createElement("span");

            node.setAttribute('class', 'choose');

            element.appendChild(node);

            var num = newobj.value;

            if (parseFloat(num) > parseFloat(App.maxDays)) {

                Fw.toast("不能超过最长天数");

                $("#applyOfDays").text("30");

                $(".ui-maxDay-data").eq(0).css("color", "#55BA68");

                $(".ui-maxDay-data").eq(0).css("border", "0.5px solid #55BA68");

                $(".ui-maxDay-data").eq(0).css("background", "rgba(85,186,104,0.08)");

                $(".ui-maxDay-data").eq(0).append("<span class='choose'></span>");

                element.innerHTML = "自定义";

                element.style.color = '#AAAAAA';

                element.style.borderColor = '#AAAAAA';

                element.style.background = "#FFFFFF";

            } else {

                $("#applyOfDays").text(this.value);

                element.style.background = "rgba(85,186,104,0.08)";

            }

            App.defaultDays = $("#applyOfDays").text(); //默认有效期

            App.overTimeMethod();

            App.getEndDate();

        }

    }

    newobj.style.height = '25px';

    newobj.style.width = '68px';

    newobj.style.fontSize = '13px';

    newobj.style.textAlign = 'center';

    newobj.style.border = 'none';

    newobj.setAttribute("max-length", '2');

    element.innerHTML = '';

    element.appendChild(newobj);

    newobj.setSelectionRange(0, oldhtml.length);

    newobj.focus();

}

var insType = "LA";

var notHaveFlag = false;

var App = {

    applyFlag: false,

    editFlag: false,

    terminateFlag: false,

    changeDays: false,

    init: function () {

        App.pageA = $("#pageA");

        App.pageB = $("#pageB");

        App.pageC = $("#pageC");

        App.pageD = $("#pageD");

        App.initAccount();

        this.initEvent();

        App.handleMoneyCursor(); //处理输入金额光标

    },

    initEvent: function () {
        App.pageA.on('click', '.dowebok li', App.changeBill);
        App.pageA.on('click', '.icon-toast', App.rateToast);
        App.pageA.on('focus', '#pbVal', App.inputFocus);
        App.pageA.on('click', '#confirmA', App.changeC);
        App.pageA.on('click', '#jumpPage', App.repaymentCalculator);

        $(".multiple_accounts_rule").on("click", function () {
            Fw.openNewWebPanel('main.html'); //业务介绍
        });

        $("#goBackBtn,#strutureBtn").on("click", function () {
            Fw.goBack();
        });

        $('.icon-close-btn,.close-popUpWindow').on("click", function () {
            $(".popUpWindow,.cover").addClass("hidden");
        });

        $(".terminate-btn").on("click", function () {
            $(".popUpWindow,.cover").removeClass("hidden");
        });

        $("#goTerminate").on("click", function () { //解约
            App.jsonInput = {};
            App.terminateFlag = true;
            App.singleSessionToken(App.terminateFlag);
        });

        $("#goApplication").on("click", function () {
            App.applyFlag = true;
            App.initAccount(App.applyFlag);
        });

        $("#goEdit").on("click", function () {
            App.editFlag = true;
            $('.dowebok').html("");
            $('.ui-maxDay-data >span').removeClass('choose');
            $(".ui-maxDay-data").css({
                border: "0.5px solid #AAAAAA",
                color: "#AAAAAA",
                background: "#FFFFFF"
            });
            $('#userAccount').text(App.acctName + "账户");
            $('#pbVal').val(Fw.util.Format.fmtAmt(App.stageLineCurrent));
            $("#confirmA").text('确认修改');
            $('#stagNum').text(App.stageNumCurrent + "期 费率");
            $("#stagAmount").text(App.openStagMount);
            $("#rateStand").addClass("hidden");
            $("#stagAmount").css("color", "#AAAAAA");
            $("#dataRateYear").text(App.openRateYear);
            $("#applyOfDays").text(App.openDateNum);
            $("#endDate").text(App.endDateCurrent);
            $("#highestAmount").text("￥" + Fw.util.Format.fmtAmt(App.canAppStagAmt));
            App.defaultDays = $('#applyOfDays').text();
            switch (App.defaultDays) {
                case '30':
                    $(".ui-maxDay-data").eq(0).append('<span class="choose"></span>');
                    $(".ui-maxDay-data").eq(0).css({
                        border: "0.5px solid #55BA68",
                        color: "#55BA68",
                        background: "rgba(85,186,104,0.08)"
                    });
                    break;
                case '20':
                    $(".ui-maxDay-data").eq(1).append('<span class="choose"></span>');
                    $(".ui-maxDay-data").eq(1).css({
                        border: "0.5px solid #55BA68",
                        color: "#55BA68",
                        background: "rgba(85,186,104,0.08)"
                    });
                    break;
                case '10':
                    $(".ui-maxDay-data").eq(2).append('<span class="choose"></span>');
                    $(".ui-maxDay-data").eq(2).css({
                        border: "0.5px solid #55BA68",
                        color: "#55BA68",
                        background: "rgba(85,186,104,0.08)"
                    });
                    break;
                default:
                    $(".changeInput").append('<span class="choose"></span>');
                    $(".changeInput").css({
                        border: "0.5px solid #55BA68",
                        color: "#55BA68",
                        background: "rgba(85,186,104,0.08)"
                    });
                    break;
            }

            var sexIndex = -1;
            var j = 0;
            var stagNumArr = [];
            Fw.each(App.rateList, function (obj) {
                if (obj.isShow == "1") {
                    $(".dowebok").append("<li data-index=" + j + " class=" + obj.STAG_NUM + " data-rateStand=" + obj.STAG_RATE_STAND + " data-totalRate=" + obj.totalRate + " data-rateYear=" + obj.rateYear + " data-rate=" + obj.STAG_RATE + " data-num=" + obj.STAG_NUM + "><p>" + obj.STAG_NUM + "期</p><span class='new_stagRate' style='color: #a8adb2;font-size:13px;'>费率 " + obj.STAG_RATE + "</span><span class='new_stagRateStand' style='text-decoration: line-through;font-size:13px;color: #a8adb2;padding-left: 4px'>" + obj.STAG_RATE_STAND + "</span></li>");
                } else {
                    $(".dowebok").append("<li data-index=" + j + " class=" + obj.STAG_NUM + " data-totalRate=" + obj.totalRate + " data-rateYear=" + obj.rateYear + " data-rate=" + obj.STAG_RATE + " data-num=" + obj.STAG_NUM + "><p>" + obj.STAG_NUM + "期</p><span class='new_stagRate' style='color: #a8adb2;font-size:13px;'>费率 " + obj.STAG_RATE + "</span></li>");
                }
                stagNumArr.push(obj.STAG_NUM);
                if (obj.STAG_NUM == App.stageNumCurrent) {
                    sexIndex = j;
                }
                j++;
            });
            //非白名单无36期选择24期
            if (stagNumArr.indexOf(App.stageNumCurrent) == "-1") {
                sexIndex = "5";
                App.dataNum = "24";
                notHaveFlag = true;
                $('#stagNum').text(App.rateList[sexIndex].STAG_NUM + "期 费率");
                $("#stagAmount").text(App.rateList[sexIndex].STAG_RATE);
                $("#dataRateYear").text(App.rateList[sexIndex].rateYear);
            }
            $('.' + App.rateList[sexIndex].STAG_NUM).css({
                border: "0.5px solid #55BA68",
                color: "#55BA68",
                background: "#E8F7EF"
            });
            $('.' + App.rateList[sexIndex].STAG_NUM).append("<span class='choose'></span>");

            if (App.rateList[sexIndex].isShow === "1") {
                $('.' + App.rateList[sexIndex].STAG_NUM).find(".new_stagRateStand").addClass("hidden");
            }
            notHaveFlag ? $('.' + App.rateList[sexIndex].STAG_NUM).find(".new_stagRate").text("费率 " + App.rateList[sexIndex].STAG_RATE) :
                $('.' + App.rateList[sexIndex].STAG_NUM).find(".new_stagRate").text("费率 " + App.openStagMount);
            $('.' + App.rateList[sexIndex].STAG_NUM).find(".new_stagRate").css("color", '#55BA68');
            App.editIndex = App.rateList[sexIndex];
            App.amtInputVal = Fw.util.Format.unfmtAmt($('#pbVal').val());
            App.totalRate = App.rateList[sexIndex].totalRate;
            if (!Fw.isEmpty(App.rateList[sexIndex].STAG_RATE_STAND)) {
                App.dataRateStand = App.rateList[sexIndex].STAG_RATE_STAND;
            }
            Fw.showPageArea(App.pageA, [App.pageC, App.pageD], true);
        });

        $('#imageId').on('click', function () {
            if (App.ClickUrl != null && App.ClickUrl != '') {
                Fw.openNewWebPanel(App.ClickUrl);
            }
        });

        $('#bank_agreement').on('click', function () {
            var param = {
                applyAmt: Fw.util.Format.unfmtAmt(App.amtInputVal),
                stagNum: App.dataNum,
                rateYear: App.rateYear,
                dataRate: App.dataRate,
                defaultDays: App.defaultDays,
                insType: "LA"
            }
            Fw.openNewWebPanel('/mmc/page/threePage/optimalloanFree/index.html', param);
        })

        $('#image2Id').on('click', function () {
            if (App.ClickUrl2 != null && App.ClickUrl2 != '') {
                Fw.openNewWebPanel(App.ClickUrl2);
            }
        });

        $('#pbVal').on('blur', function () {
            $("#currency").show();
            if (!$('#pbVal').hasClass('flag')) {
                App.changeInputMoney();
            }
        })

        $('#pbVal').on('keyup', function () {
            $("#currency").hide();
            var pbValNum = $('#pbVal').val().replace(" ", "");
            pbValNum.length != 0 ? $('.icon-close-wrap').removeClass('hidden') : $('.icon-close-wrap').addClass('hidden');
        })

        $('.icon-edit').on('click', function () {
            $('.icon-edit').addClass('hidden');
            $('.icon-close-wrap').removeClass('hidden');
            $('#pbVal').focus();
        })

        $('#gobackBtn').on('click', function () {
            Fw.goBack();
        })

        $('.icon-close-wrap').on('click', function () {
            $('#pbVal').val("");
            $('#pbVal').focus();
            if (Fw.os == "android") {
                setTimeout(function () {
                    $('#pbVal').focus();
                    $('.icon-close-wrap').addClass('hidden');
                }, 200)
            } else {
                $('.icon-close-wrap').addClass('hidden');
            }
            $('#pbVal').removeClass('flag');
        })

        $('#mustChecked').on('click', function () {
            App.checkOff();
        })

        $('.icon-close-wrap').on('touchstart', function () {
            $('#pbVal').addClass('flag');
        })

        $('#rediBtn').on('click', function () {
            Fw.openNewWebPanel('../free_bystages/freeByStages.html');
        })

        $('.ui-tab-wrap>span').click(function () {
            var _this = $(this);
            _this.css({
                "opacity": "1",
                "font-size": "15px"
            });
            _this.append("<div class='tab-border-b'></div>");
            _this.siblings('span').css({
                "opacity": "0.6",
                "font-size": "13px"
            });
            _this.siblings('span').children().remove();
            App.advanceFlg = _this.attr("data-flag");
        })

        $(".ui-stagNum-showOrHideWrap").on('click', function () {
            if ($('.yui-list-detail').css('display') == 'block') {
                $('.min-border2').addClass('hidden');
                $('.icon_sj').addClass('hidden');
                $('.icon_xj').removeClass('hidden');
                $('.yui-list-detail').slideUp();
            } else {
                $('.yui-list-detail').slideDown();
                $('.icon_sj').removeClass('hidden');
                $('.icon_xj').addClass('hidden');
                $('.min-border2').removeClass('hidden');
            }
        });

        $(".ui-maxDay-showOrHide").on('click', function () {
            if ($('.yui-list-detail2').css('display') != 'none') {
                $('.icon_sji,.min-border3').addClass('hidden');
                $('.icon_xji').removeClass('hidden');
                $('.yui-list-detail2').slideUp();
            } else {
                $('.yui-list-detail2').slideDown();
                $('.icon_sji,.min-border3').removeClass('hidden');
                $('.icon_xji').addClass('hidden');
            }
        });

        $(".ui-maxDay-wrap>li").on("click", function () {
            App.changeDays = true;
            $(this).css("border", "0.5px #55BA68 solid");
            $(this).css("color", "#55BA68");
            $(this).siblings().css('border', '0.5px solid #AAAAAA');
            $(this).siblings().css('color', '#AAAAAA');
            $(this).siblings().css('background', '#FFFFFF');
            $(this).append("<span class='choose'></span>");
            $(this).siblings().children().remove();
            $("#applyOfDays").text($(this).text().replace("天", ""));
        });

        $(".ui-maxDay-data").click(function () {
            $(this).css("background", "rgba(85,186,104,0.08)");
            App.defaultDays = $("#applyOfDays").text();
            App.overTimeMethod();
            App.getEndDate();
        })
    },

    checkDateChange: function () {
        Fw.onceCmbcAjaxData(Fw.dataUrl('bystages/checkDateChange'), {}, function (data) {
            if (data.STATUS == "1") {
                if (data.isChange == "0") {
                    App.terminateFlag = false;
                    App.singleSessionToken(App.terminateFlag);
                } else {
                    $("#endDate").text(data.endDate);
                    Fw.confirm('新的到期日期为' + data.endDate, '温馨提示', App.singleSessionToken, function () {}, '确定', '取消');
                }
            } else {
                Fw.hideWaitPanel();
                Fw.alertinfo(data.MSG);
            }
        }, Fw.errorAjax);
    },

    repaymentCalculator: function () {
        var params = {
            stagNum: App.dataNum,
            stagRate: App.dataRate,
            applyAmt: "10000.00",
            insType: "E",
            totalRate: App.totalRate,
            coinType: "156",
            rateList: App.rateList
        }
        Fw.openNewWebPanel('../repaymentCalculator/index.html', params);
    },

    checkOff: function () {
        if ($('#mustChecked').is(':checked')) {
            $('.input_check+label').addClass('oncheck');
            $(".ui-apply-btn").attr("disabled", false);
            $(".ui-apply-btn").css("opacity", "1");
        } else {
            $('.input_check+label').removeClass('oncheck');
            $(".ui-apply-btn").attr("disabled", true);
            $(".ui-apply-btn").css("opacity", "0.5");
        }
    },

    inputFocus: function () {
        $("#currency").hide();
        $('.icon-edit').addClass('hidden');
        $('.icon-close-wrap').removeClass('hidden');
        var val = Fw.util.Format.unfmtAmt($(this).val());
        $(this).val(val);
        if (Fw.os == "iphone") {
            $("#pbVal")[0].setSelectionRange(val.length, val.length);
        }
    },

    //修改延长期限使用实时费率 反之使用开通费率
    overTimeMethod: function () {
        if (App.editFlag == true && !Fw.isEmpty(App.editIndex)) {
            if (parseFloat(App.defaultDays) > parseFloat(App.openDateNum)) {
                App.overTimeFlag = "1";
                if (App.isShowFlag == "1") {
                    $('#rateStand').removeClass("hidden");
                    $('#stagAmount').css("color", "#ff941b");
                    if (App.editFlag == true && (App.dataNum == App.editIndex.STAG_NUM)) { //当前操作期数为开通期数
                        $("#stagAmount").text(App.editIndex.STAG_RATE);
                        $('#rateStand').html(App.editIndex.STAG_RATE_STAND);
                        $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").css("color", "#55BA68");
                    } else {
                        $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").css("color", "#a8adb2");
                    }
                    $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").removeClass("hidden");
                    // $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").css("right","5px");
                } else {
                    $('#stagAmount').css("color", "#AAAAAA");
                    $('#rateStand').addClass("hidden");
                    if (App.editFlag == true && (App.dataNum == App.editIndex.STAG_NUM)) { //当前操作期数为开通期数
                        $("#stagAmount").text(App.editIndex.STAG_RATE);
                    }
                    App.editIndex.isShow == "1" ? $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").removeClass("hidden") :
                        $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").addClass("hidden");
                }
                $('.' + App.editIndex.STAG_NUM).find(".new_stagRate").text("费率 " + App.editIndex.STAG_RATE);
                $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").text(App.editIndex.STAG_RATE_STAND);
            } else {
                if (App.isShowFlag == "1") {
                    $('#rateStand').removeClass("hidden");
                    $('#stagAmount').css("color", "#ff941b");
                } else {
                    $('#stagAmount').css("color", "#AAAAAA");
                    $('#rateStand').addClass("hidden");

                }
                if (App.editFlag == true && (App.dataNum == App.editIndex.STAG_NUM)) {
                    $('#stagAmount').text(App.openStagMount);
                    $('#stagAmount').css("color", "#AAAAAA");
                    $('#rateStand').addClass("hidden");
                }
                $('.' + App.editIndex.STAG_NUM).find(".new_stagRate").text("费率 " + App.openStagMount);
                $('.' + App.editIndex.STAG_NUM).find(".new_stagRateStand").addClass("hidden");
            }
        }
    },

    initAccount: function (applyFlag) {
        Fw.ajaxData(Fw.dataUrl("bystages/getOrderHappyQuota"), {
            configType: "subscribeHappy",
            insType: insType
        }, function (data) {
            if (data.STATUS == "1") {
                Fw.hideWaitPanel();
                App.acctName = data.acctName; //账户名称
                App.maxDays = data.config.maxDays; //最长有效期
                App.canAppStagAmt = data.orderHappyQuota; //最高可分期金额
                App.orderHappy = data.orderHappyQuota;
                App.minAmount = data.config.minAmount; //起始金额
                App.defaultPeriod = data.config.defaultPeriod; //默认期数
                App.acctNo = data.acctNo;
                $("#applyOfDays").text(data.config.defaultDays);
                $('#userAccount,#userAccount2').text(data.acctName + "账户");
                $("#highestAmount,#highAmount").text("￥" + Fw.util.Format.fmtAmt(data.orderHappyQuota));
                App.defaultDays = $("#applyOfDays").text(); //默认有效期
                $('#pbVal').val(Fw.util.Format.fmtAmt(App.minAmount));
                $('#userInfoAmount').val("￥" + Fw.util.Format.fmtAmt(App.minAmount));
                App.amtInputVal = Fw.util.Format.unfmtAmt($('#pbVal').val());
                switch (App.defaultDays) {
                    case '30':
                        $(".ui-maxDay-data").eq(0).append('<span class="choose"></span>');
                        $(".ui-maxDay-data").eq(0).css({
                            border: "0.5px solid #55BA68",
                            color: "#55BA68",
                            background: "rgba(85,186,104,0.08)"
                        });
                        break;
                    case '20':
                        $(".ui-maxDay-data").eq(1).append('<span class="choose"></span>');
                        $(".ui-maxDay-data").eq(1).css({
                            border: "0.5px solid #55BA68",
                            color: "#55BA68",
                            background: "rgba(85,186,104,0.08)"
                        });
                        break;
                    case '10':
                        $(".ui-maxDay-data").eq(2).append('<span class="choose"></span>');
                        $(".ui-maxDay-data").eq(2).css({
                            border: "0.5px solid #55BA68",
                            color: "#55BA68",
                            background: "rgba(85,186,104,0.08)"
                        });
                        break;
                    default:
                        $(".changeInput").append('<span class="choose"></span>');
                        $(".changeInput").css({
                            border: "0.5px solid #55BA68",
                            color: "#55BA68",
                            background: "rgba(85,186,104,0.08)"
                        });
                        break;
                }
                if (applyFlag == true) { //继续申请
                    App.initStagNum();
                    Fw.showPageArea(App.pageA, [App.pageC, App.pageD], true);
                    return;
                }
                if (data.openInfo.openStatus == "1") { //1开通 
                    $(".ui-open-status").text("已开通");
                    $(".user-openInfo").text("已开通信息");
                    $(".ui-open-txt").text("您已开通预约全民乐分期-自由分期");
                    $(".ui-openinfo-btnWrap").removeClass("hidden");
                    $(".ui-overdue-btnWrap,.ui-success-btnWrap").addClass("hidden");
                    if (data.openInfo.available == "1") { //已过期
                        $(".ui-open-status").text("已过期");
                        $(".user-openInfo").text("历史开通信息");
                        $(".ui-open-txt").text("您预约的全民乐分期-自由分期已到期");
                        $(".ui-overdue-btnWrap,.icon-available").removeClass("hidden");
                        $(".ui-openinfo-btnWrap,.ui-success-btnWrap,.icon-open").addClass("hidden");
                    }
                    //用户设置过的参数
                    App.amtInputVal = Fw.util.Format.unfmtAmt($('#pbVal').val());
                    App.stageNumCurrent = data.openInfo.stageNumCurrent; //期数
                    App.dataNum = App.stageNumCurrent;
                    App.openDateNum = data.openInfo.dayNumCurrent;
                    App.endDateCurrent = data.openInfo.endDateCurrent;
                    App.stageLineCurrent = data.openInfo.stageLineCurrent;
                    $("#userInfoMaxDate").text(App.openDateNum + "天");
                    $("#userInfoEndDate").text(App.endDateCurrent);
                    $('#userInfoAmount').text("￥" + Fw.util.Format.fmtAmt(App.stageLineCurrent));
                    App.queryRealTimeRate();
                    Fw.showPageArea(App.pageC, [App.pageA, App.pageD], true);
                } else { //未开通
                    App.initStagNum(); //查询期数和费率
                    Fw.showPageArea(App.pageA, [App.pageC, App.pageD], true);
                }
            } else { //无额度缺省页
                Fw.hideWaitPanel();
                App.queryImgUrl('noBillPage');
                $("body,html,#pageD").css("background", "#FFFFFF");
                $(".structure-page-dis").css({
                    margin: "0 auto",
                    width: "82%"
                });
                $(".structure-page-txt").text("当前暂无法办理");
                $(".structure-page-dis").text("额度由系统评测，随您的用卡情况变化，请后续关注额度更新。");
                $(".struture-btn").text("返回");
                var img = document.getElementById("icon-unable");
                img.src = "img/icon-nounable.png";
                $(".multiple_accounts_accNoWrap").addClass("hidden");
                Fw.showPageArea(App.pageD, [App.pageA, App.pageC], true);
            }
        }, function (data) {
            Fw.hideWaitPanel();
            Fw.alertinfo(data.msg, '提示');
        });
    },

    rateToast: function () {
        Fw.confirm('页面试算费用为您该笔分期需支付的手续费费用。如需了解年化利率，可点击相应按钮进行了解。', '', App.annualizedRate, function () {}, '折算年化利率', '取消');
    },

    annualizedRate: function () {
        var params = {
            stagNum: App.dataNum,
            stagRate: App.dataRate,
            rateList: App.rateList,
            applyAmt: Fw.util.Format.unfmtAmt($('#pbVal').val())
        }
        Fw.openNewWebPanel('../annualizedRate/rate.html', params);
    },

    preventTouch: function (event) {
        event.preventDefault();
    },

    getEndDate: function () {
        Fw.openWaitPanel();
        Fw.ajaxData(Fw.dataUrl('bystages/getEndDate'), {
            dayNum: App.defaultDays
        }, function (data) {
            if (data.STATUS == "1") {
                Fw.hideWaitPanel();
                $("#endDate").text(data.endDate);
            } else {
                Fw.hideWaitPanel();
                Fw.alertinfo(data.MSG, '提示');
            }
        }, function (data) {
            Fw.hideWaitPanel();
            Fw.alertinfo(data.msg, '提示');
        });
    },

    changeInputMoney: function () {
        if ($('#pbVal').val() == "" || $('#pbVal').val() == "0.00") {
            $('#pbVal').val('600.00');
        }
        if (parseFloat(Fw.util.Format.unfmtAmt($('#pbVal').val())) > parseFloat(App.canAppStagAmt)) {
            Fw.toast("不能高于最高分期金额");
            $('#pbVal').val('600.00');
        }
        if (parseFloat(Fw.util.Format.unfmtAmt($('#pbVal').val())) < parseFloat(App.minAmount)) {
            Fw.toast("不能低于最小起始金额");
            $('#pbVal').val('600.00');
        }
        $('.icon-edit').removeClass('hidden');
        $('.icon-close-wrap').addClass('hidden');
        App.amtInputVal = Fw.util.Format.unfmtAmt($('#pbVal').val());
    },

    changeBill: function () {
        App.dataNum = $(this).attr('data-num');
        App.dataRate = $(this).attr('data-rate');
        App.rateYear = $(this).attr('data-rateYear');
        App.totalRate = $(this).attr('data-totalRate');
        if (!Fw.isEmpty($(this).attr("data-rateStand"))) {
            App.dataRateStand = $(this).attr("data-rateStand");
        }
        var index = $(this).attr("data-index");
        $("#dataRateYear").text(App.rateYear);
        $('.dowebok li').children().parent().css('border', '0.5px solid #AAAAAA');
        $('.dowebok li').children().parent().css('color', '#1A1C1E');
        $('.dowebok li').children().css('color', '#a8adb2');
        $('.dowebok li').children('.choose').remove();
        $(this).append("<span class='choose'></span>");
        $(this).css("border", '0.5px solid #55BA68');
        $(this).css("color", '#55BA68');
        $(this).css("background", '#e8f7ef');
        $(this).children().css("color", '#55BA68');
        $(this).siblings().css('background', '#fff');
        $('#stagNum').html(App.rateList[index].STAG_NUM + "期 费率");
        $('#stagAmount').html(App.rateList[index].STAG_RATE);
        if (App.rateList[index].isShow == "1") {
            $('#rateStand').removeClass("hidden");
            $('#stagAmount').css("color", "#ff941b");
            $('#rateStand').html(App.rateList[index].STAG_RATE_STAND);
            App.isShowFlag = "1";
        } else {
            $('#stagAmount').css("color", "#AAAAAA");
            $('#rateStand').addClass("hidden");
            App.isShowFlag = "0";
        }

        if (App.editFlag == true && (App.dataNum == App.editIndex.STAG_NUM)) {
            $('#stagAmount').css("color", "#AAAAAA");
            $('#rateStand').addClass("hidden");
            if (App.isShowFlag === "1") {
                if (App.overTimeFlag === "1") {
                    $('#stagAmount').text(App.rateList[index].STAG_RATE)
                } else {
                    notHaveFlag ? $('#stagAmount').text(App.rateList[index].STAG_RATE) : $('#stagAmount').text(App.openStagMount);
                }
            } else {
                notHaveFlag ? $('#stagAmount').text(App.rateList[index].STAG_RATE) : $('#stagAmount').text(App.openStagMount);
            }

        }
        $('.stagNum').children().css("display", "inline-block");
        $('.stagNum').find("span.choose").remove();
        $('.stagNum').attr('data-stag', $(this).attr('data-num'));
    },

    queryImgUrl: function (noBillPage) {
        Fw.ajaxData(Fw.dataUrl("credit/queryImgsUrl"), {
            pageId: '0208030045'
        }, function (data) {
            if (data.STATUS == '1') {
                Fw.hideWaitPanel();
                if (data.AdList.length != 0) {
                    App.AdList = data.AdList;
                    App.AdList.length = data.AdList.length;
                    $("#imageId").attr("src", data.AdList[0].IMG_URL);
                    App.ClickUrl = data.AdList[0].CLICK_URL;
                    $('.recommWrap').removeClass('hidden');
                    $('#imageId').removeClass('hidden');
                    if (data.AdList[1] != null && noBillPage == 'noBillPage') {
                        $("#image2Id").attr("src", data.AdList[1].IMG_URL);
                        App.ClickUrl2 = data.AdList[1].CLICK_URL;
                        $("#image2Id").removeClass('hidden');
                    }
                } else {
                    $('.recommWrap').addClass('hidden');
                }
            } else {
                $('.recommWrap').addClass('hidden');
            }
        }, Fw.errorAjax);
    },

    changeC: function () {
        if (!Fw.Form.validator(App.pageA)) {
            return;
        } else if (!$('#mustChecked').is(':checked')) {
            Fw.Form.showPinLabel(App.pageA, "请阅读并勾选协议", false);
            return;
        } else {
            App.jsonInput = {};
            App.jsonInput = Fw.Form.getFormJson(App.pageA, {});
            App.jsonInput.stageLine = Fw.util.Format.unfmtAmt($('#pbVal').val());
            App.jsonInput.insType = insType;
            App.jsonInput.dayNum = App.defaultDays;
            App.jsonInput.stageNum = App.dataNum;
            App.jsonInput.totalRate = App.totalRate;
            App.editFlag == true ? App.jsonInput.opCode = "2" : App.jsonInput.opCode = "1";
            if (App.editFlag == true && App.changeDays == true) {
                Fw.confirm('新的到期日期为' + $("#endDate").text(), '温馨提示', App.checkDateChange, function () {}, '确定', '取消');
                return;
            }
            App.checkDateChange();
        }
    },

    //获取会话随机数
    singleSessionToken: function (terminateFlag) {
        Fw.ajaxData(Fw.dataUrl('credit/singleSessionToken'), {}, function (data) {
            if (data.STATUS == "1") {
                App.jsonInput.singleToken = data.singleToken;
                terminateFlag == true ? App.submit_terminate() : App.submit_last();
            } else {
                Fw.hideWaitPanel();
                Fw.alertinfo(data.MSG);
            }
        }, Fw.errorAjax);
    },

    submit_terminate: function () {
        App.jsonInput.opCode = "3";
        Fw.onceCmbcAjaxData(Fw.dataUrl('bystages/applyOrderHappyFree'), App.jsonInput, function (data) {
            Fw.hideWaitPanel();
            if (data.STATUS == "1") {
                //解约结果页
                App.queryImgUrl('noBillPage');
                $("body,html,#pageD").css("background", "#FFFFFF");
                $(".structure-page-txt").text("已取消");
                $(".structure-page-dis").css({
                    "text-align": "center",
                    "width": "100%"
                });
                $(".structure-page-dis").text("您的预约全民乐分期-自由分期已取消。");
                $(".struture-btn").text("完成");
                $(".multiple_accounts_accNoWrap").removeClass("hidden");
                $("#userAccount3").text(App.acctName + "账户");
                var img = document.getElementById("icon-unable");
                img.src = "img/icon-qxSuccess.png";
                Fw.showPageArea(App.pageD, [App.pageA, App.pageC], true);
            } else {
                Fw.alertinfo(data.MSG, '提示');
            }
        }, function (data) {
            Fw.alertinfo(data.msg, '提示', Fw.gotoIndex);
        });
    },

    initStagNum: function () {
        Fw.openWaitPanel();
        Fw.ajaxData(Fw.dataUrl('bystages/getRateByInsType'), {
            insType: "E"
        }, function (data) {
            $('.dowebok').html("");
            if (data.STATUS == "1") {
                App.rateList = data.rateList;
                App.loadStagNum(data.rateList);
            } else {
                Fw.hideWaitPanel();
                Fw.alertinfo(data.MSG, '提示', Fw.gotoIndex);
            }
        }, Fw.errorAjax);
    },

    //检查接口返回期数包含默认期数
    checkDefStag: function (num, stagNum) {
        var falg = -1;
        for (var i = 0; i < num.length; i++) {
            if (num[i].STAG_NUM == stagNum) {
                falg = i;
                break;
            }
        }
        if (falg === -1) { //判断默认期数无效取第一个
            falg = 0;
        }
        return falg;
    },

    //期数默认加载
    loadStagNum: function (num) {
        Fw.ajaxData(Fw.dataUrl("bystages/queryDefaultStageNum"), {
            insType: "E"
        }, function (data) {
            $('.dowebok').html("");
            var j = 0;
            var sexIndex = -1;
            var count = 0; //优惠期数的个数
            var lastIndex = 0; //最后一个优惠期数的index
            var stagNumArr = [];
            Fw.each(num, function (obj) {
                if (obj.isShow == "1") {
                    $(".dowebok").append("<li data-index=" + j + " class=" + obj.STAG_NUM + " data-rateStand=" + obj.STAG_RATE_STAND + " data-totalRate=" + obj.totalRate + " data-rateYear=" + obj.rateYear + " data-rate=" + obj.STAG_RATE + " data-num=" + obj.STAG_NUM + ">" + obj.STAG_NUM + "期<p style='color: #a8adb2;font-size:13px;position: relative;top: 1.5px'>费率 " + obj.STAG_RATE + "<span style='text-decoration: line-through;padding-left: 4px'>" + obj.STAG_RATE_STAND + "</span></p></li>");
                    count++;
                    lastIndex = j;
                } else {
                    $(".dowebok").append("<li data-index=" + j + " class=" + obj.STAG_NUM + " data-totalRate=" + obj.totalRate + " data-rateYear=" + obj.rateYear + " data-rate=" + obj.STAG_RATE + " data-num=" + obj.STAG_NUM + ">" + obj.STAG_NUM + "期<p style='color: #a8adb2;font-size:13px;position: relative;top: 1.5px'>费率 " + obj.STAG_RATE + "</p></li>");
                }
                stagNumArr.push(obj.STAG_NUM);
                if (data.STATUS == "1" && obj.STAG_NUM == data.stageNum) { //展示默认期费率
                    sexIndex = j;
                }
                j++;
            });

            if (sexIndex != -1) { //有默认期数
                if (sexIndex === -1) { //默认期数无效
                    sexIndex = App.checkDefStag(num, "12");
                }
                if (count > 0) { //有优惠期数
                    sexIndex = lastIndex;
                } else {
                    if (!Fw.isEmpty(data.stageNum) && stagNumArr.indexOf(data.stageNum) != "-1") {
                        sexIndex = App.checkDefStag(num, Fw.isEmpty(data.stageNum) ? "12" : data.stageNum);
                    } else {
                        sexIndex = App.checkDefStag(num, "12");
                    }
                }
            } else if (sexIndex == -1) {
                sexIndex = App.checkDefStag(num, "12");
            }
            $('.' + num[sexIndex].STAG_NUM).css({
                border: "0.5px solid #55BA68",
                color: "#55BA68",
                background: "rgba(85,186,104,0.08)"
            });
            $('.' + num[sexIndex].STAG_NUM).children().css("color", "#55BA68");
            $('.' + num[sexIndex].STAG_NUM).append(("<span class='choose'></span>"));
            if (num[sexIndex].isShow == "1") {
                $("#userInfoRate").css("color", "#ff9416");
                $('#stagAmount').css("color", "#ff941b");
                $("#rateStand").removeClass("hidden");
                $("#rateStand").text(num[sexIndex].STAG_RATE_STAND);
                App.isShowFlag = "1";
            } else {
                $("#userInfoRate").css("color", "#737373");
                $('#stagAmount').css("color", "#AAAAAA");
                $("#rateStand").addClass("hidden");
                App.isShowFlag = "0";
            }
            $('#stagNum').text(num[sexIndex].STAG_NUM + '期 费率');
            $('#stagAmount').text(num[sexIndex].STAG_RATE);
            App.dataNum = num[sexIndex].STAG_NUM; //期数
            App.dataRate = num[sexIndex].STAG_RATE; //费率
            App.rateYear = num[sexIndex].rateYear; //年化
            App.totalRate = num[sexIndex].totalRate; //总费率
            if (!Fw.isEmpty(num[sexIndex].STAG_RATE_STAND)) {
                App.dataRateStand = num[sexIndex].STAG_RATE_STAND;
            }
            $("#dataRateYear").text(App.rateYear);
            App.getEndDate(); //获取最大失效时间      
        }, Fw.errorAjax);
    },

    queryRealTimeRate: function () {
        Fw.openWaitPanel();
        Fw.ajaxData(Fw.dataUrl('bystages/queryOpenedFree'), {
            accNo: App.acctNo
        }, function (data) {
            if (data.STATUS == "1") {
                App.openStagMount = data.mpfeecd;
                App.openRateYear = data.annualizdRate;
                $("#userInfoStagNum").text(App.stageNumCurrent + "期 ");
                $("#userInfoRate").text(data.mpfeecd + "/期");
                $("#userInfoRateYear").text(data.annualizdRate);
                $("#userInfoRate").css("color", "#737373");
                App.overPageGetRate();
            } else {
                Fw.alertinfo(data.MSG, '提示');
            }
        }, function (data) {
            Fw.alertinfo(data.msg, '提示', Fw.goBack);
        });
    },

    overPageGetRate: function () {
        Fw.ajaxData(Fw.dataUrl('bystages/getRateByInsType'), {
            insType: "E"
        }, function (data) {
            if (data.STATUS == "1") {
                Fw.hideWaitPanel();
                var index = -1;
                var j = 0;
                Fw.each(data.rateList, function (obj) {
                    if (obj.STAG_NUM == App.stageNumCurrent) {
                        index = j;
                    }
                    j++;
                });
                App.rateList = data.rateList;
                data.rateList[index].isShow == "1" ? App.isShowFlag = "1" : App.isShowFlag = "0";
            } else {
                Fw.hideWaitPanel();
                Fw.alertinfo(data.MSG, '提示');
            }
        }, Fw.errorAjax);
    },

    //申请提交
    submit_last: function () {
        Fw.onceCmbcAjaxData(Fw.dataUrl('bystages/applyOrderHappyFree'), App.jsonInput, function (data) {
            Fw.hideWaitPanel();
            if (data.STATUS == "1") {
                Fw.hideWaitPanel();
                $("#userAccount2").text(App.acctName + "账户");
                $("#userInfoMaxDate").text(App.defaultDays + "天");
                $("#userInfoStagNum").text(App.dataNum + "期 ");
                $("#userInfoRate").text($("#stagAmount").text() + "/期");
                if (App.isShowFlag == "1") {
                    $("#userRateStand").removeClass("hidden");
                    $("#userInfoRate").css("color", "#ff941b");
                    var flag = App.editFlag == true && (App.dataNum == App.editIndex.STAG_NUM);
                    if (flag) {
                        App.overTimeFlag === "1" ? $("#userInfoRate").css("color", "#ff941b") : $("#userInfoRate").css("color", "#737373");
                    }
                    $("#userRateStand").text($("#rateStand").text());
                } else {
                    $("#userRateStand").addClass("hidden");
                    $("#userInfoRate").css("color", "#737373");
                }
                $("#userInfoRateYear").text(App.rateYear);
                $('#userInfoAmount').text("￥" + Fw.util.Format.fmtAmt(App.amtInputVal));
                $("#userInfoEndDate").text($("#endDate").text());
                $(".ui-openinfo-btnWrap,.ui-overdue-btnWrap").addClass("hidden");
                $(".ui-success-btnWrap").removeClass("hidden");
                $(".ui-open-status").text("已开通");
                $(".ui-open-txt").text("您已开通预约全民乐分期-自由分期");
                $(".user-openInfo").text("已开通信息");
                Fw.showPageArea(App.pageC, [App.pageA, App.pageD], true);
            } else {
                Fw.alertinfo(data.MSG, '提示');
            }
        }, function (data) {
            if (data.code == "quota.not.ample") {
                Fw.alertinfo(data.msg, '提示', Fw.gotoIndex); //分期额度不足
            } else {
                Fw.alertinfo(data.msg, '提示');
            }
        });
    },

    handleMoneyCursor: function () {
        var input = document.querySelector("#pbVal");
        var expectCharIndex;
        input.onkeydown = function (e) {
            var curValue = this.value;
            var selectionStart = this.selectionStart;
            var selectionEnd = this.selectionEnd;
            var keyCode = e.keyCode;
            var preCharIndex = curValue.substring(0, selectionStart).length - 1;
            if (keyCode == 8) {
                expectCharIndex = selectionStart - 1;
            } else {
                expectCharIndex = selectionStart + 1
            }
        };
        input.onkeyup = function () {
            setTimeout(function () {
                input.setSelectionRange(expectCharIndex, expectCharIndex);
            }, 10);
        };
    },

    //已开通已过期页面返回
    pageC_back: function () {
        Fw.goBack();
    },

    //结果页
    pageD_back: function () {
        Fw.goBack();
    },

    //操作主页面返回
    homeBack: function () {
        Fw.goBack();
    }

};

Fw.onReady(App);
