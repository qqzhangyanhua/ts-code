<template>
  <v-form :formData="formData">
    <template slot="nameSlot">
      <el-xxx></el-xxx>
    </template>
  </v-form>
</template>
<script lang="ts" setup>
//法定代表人信息
const LegalRepresentativeFormData = [
  {
    value: "LegalPosbrform",
    tag: "select",
    options: [],
    placeholder: "请选择",
    label: "法定代表人职务产生方式",
    rules: [
      {
        required: true,
        message: "请选择法定代表人职务产生方式",
      },
    ],
    handler: {
      change: () => {
        console.log("change");
      },
      input: () => {
        console.log("input");
      },
    },
  },
  {
    value: "LegalLerepsign",
    tag: "input",
    placeholder: "请输入",
    label: "法定代表人标志",
  },
  {
    value: "LegalAppounit",
    label: "法定代表人任命单位",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "FixedTel",
    label: "法定代表人固定电话",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "IssuingAuthority",
    label: "发证机关",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "Location",
    label: "证件所在地",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "leRepMobilePhone",
    label: "法定代表人移动电话",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "LegalEmail",
    label: "法定代表人电子邮箱",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "LegalDom",
    label: "法定代表人住所",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "Representative",
    label: "法定代表人是否职工代表",
    placeholder: "请选择",
    tag: "select",
    options: [],
  },
  {
    value: "PartnerName",
    label: "执行事务合伙人名称",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "Partnertype",
    label: "执行事务合伙人类型",
    placeholder: "请选择",
    tag: "select",
    options: [],
  },
  {
    value: "DelegateCountry",
    label: "委派代表国别",
    placeholder: "请选择",
    tag: "select",
    options: [],
  },
  {
    value: "PrincipalName",
    label: "委派代表姓名",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "DelegateidNumber",
    label: "委派代表证件号码",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "DelegateMobilephone",
    label: "委派代表移动电话",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "DelegateEmail",
    label: "委派代表电子邮箱",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "ThelegalName",
    label: "单位法定代表人姓名",
    placeholder: "请输入",
    tag: "input",
  },
  {
    value: "mCertificateType",
    label: "单位法定代表人证件类型",
    placeholder: "请选择",
    tag: "select",
    options: [],
  },
  {
    value: "mCertificateNo",
    label: "单位法定代表人证件号码",
    placeholder: "请输入",
    tag: "input",
  },
];
//董事监理高级管理人员信息
const seniorManagementFormData = [
  {
    value: "Executivmembers",
    label: "董事、总经理/经理、财务负责人、监事信息--新增",
    slot: "Executivmembers",
  },
  {
    value: "mProduceWayM",
    placeholder: "请选择",
    label: "是否成立董事会",
    tag: "select",
    options: [],
  },
  {
    value: "appointOrgM",
    placeholder: "请选择",
    label: "其中董事长由xx担任",
    tag: "select",
    options: [],
  },
  {
    value: "positionBringMannerCodeOld",
    placeholder: "请选择",
    label: "董事长通过xx产生",
    tag: "select",
    options: [],
  },
  {
    value: "appointOrgOld",
    placeholder: "请选择",
    label: "副董事长由xx担任，通过xx产生",
    tag: "select",
    options: [],
  },
  {
    value: "apprType",
    placeholder: "请选择",
    label: "副董事通过xx产生",
    tag: "select",
    options: [],
  },
  {
    value: "mName",
    placeholder: "请输入",
    label: "姓名",
    tag: "input",
  },
  {
    value: "mNationalityCode",
    placeholder: "请选择",
    label: "国别(地区)",
    tag: "select",
    options: [],
  },
  {
    value: "mGender",
    placeholder: "请选择",
    label: "性别",
    tag: "select",
    options: [],
  },
  {
    value: "mCertificateType",
    placeholder: "请选择",
    label: "证件类型",
    tag: "select",
    options: [],
  },
  {
    value: "mCertificateNo",
    placeholder: "请输入",
    label: "证件号码",
    tag: "input",
  },
  {
    value: "mPosition",
    placeholder: "请输入",
    label: "职务",
    tag: "input",
  },
  {
    value: "positionBringMannerCodeOld",
    placeholder: "请输入",
    label: "职务产生方式",
    tag: "select",
    options: [],
  },
  {
    value: "isLegalPerson",
    placeholder: "请输入",
    label: "法定代表人标志",
    tag: "input",
  },
  {
    value: "Appounit",
    placeholder: "请输入",
    label: "任命单位",
    tag: "input",
  },
  {
    value: "mPhone",
    placeholder: "请输入",
    label: "移动电话",
    tag: "input",
  },
  {
    value: "email",
    placeholder: "请输入",
    label: "电子邮箱",
    tag: "input",
  },
  {
    value: "signDate",
    placeholder: "请输入",
    label: "证件有效期限止",
    tag: "picker",
  },
  {
    value: "timeLimit",
    placeholder: "请输入",
    label: "任职期限（年）",
    tag: "input",
  },
  {
    value: "positionBringMannerCode",
    placeholder: "请选择",
    label: "任免机构",
    tag: "select",
    options: [],
  },
  {
    value: "mProduceWayM",
    placeholder: "请选择",
    label: "是否设立监视会",
    tag: "select",
    options: [],
  },
  {
    value: "appointOrgM",
    placeholder: "请选择",
    label: "监事会主席由xxx担任",
    tag: "select",
    options: [],
  },
  {
    value: "positionBringMannerCodeOld",
    placeholder: "请选择",
    label: "通过xx产生",
    tag: "select",
    options: [],
  },
];
//联络员信息
const formData3 = [
  {
    value: "Name",
    placeholder: "请输入",
    label: "姓名",
    tag: "input",
  },
  {
    value: "Tel",
    placeholder: "请输入",
    label: "固定电话",
    tag: "input",
  },
  {
    value: "Mobtel",
    placeholder: "请输入",
    label: "移动电话",
    tag: "input",
  },
  {
    value: "Email",
    placeholder: "请输入",
    label: "电子邮箱",
    tag: "input",
  },
  {
    value: "mCertificateType",
    placeholder: "请输入",
    label: "证件类型",
    tag: "select",
    options: [],
  },
  {
    value: "mCertificateType",
    placeholder: "请输入",
    label: "证件类型",
    tag: "select",
    options: [],
  },
  {
    value: "mCertificateNo",
    placeholder: "请输入",
    label: "证件号码",
    tag: "input",
  },
];
//财务负责人信息
const financeFormData = [
  {
    value: "mName",
    placeholder: "请输入",
    label: "财务负责人姓名",
    tag: "input",
  },
  {
    value: "mCertificateType",
    placeholder: "请输入",
    label: "财务负责人证件类型",
    tag: "select",
    options: [],
  },
  {
    value: "mCertificateNo",
    placeholder: "请输入",
    label: "财务负责人证件号码",
    tag: "input",
  },
  {
    value: "mPhone",
    placeholder: "请输入",
    label: "财务负责人移动电话",
    tag: "input",
  },
  {
    value: "email",
    placeholder: "请输入",
    label: "财务负责人电子邮箱",
    tag: "input",
  },
  {
    value: "FinancialForm",
    placeholder: "请输入",
    label: "财务负责人职务产生方式",
    tag: "select",
    options: [],
  },
];
//委托代理人信息
const agentFormData = [
  {
    value: "isDelegated",
    placeholder: "请输入",
    label: "是否选择代理人",
    tag: "select",
    options: [],
  },
  {
    value: "certificateType",
    placeholder: "请输入",
    label: "委托代理人证件类型",
    tag: "select",
    options: [],
  },
  {
    value: "Agentid",
    placeholder: "请输入",
    label: "上传证件",
    tag: "upload",
  },
  {
    value: "AgentName",
    placeholder: "请输入",
    label: "指定代表或者委托代理人",
    tag: "input",
  },
  {
    value: "certificateNo",
    placeholder: "请输入",
    label: "委托代理人证件号码",
    tag: "input",
  },
  {
    value: "phone",
    placeholder: "请输入",
    label: "固定电话",
    tag: "input",
  },
  {
    value: "mobile",
    placeholder: "请输入",
    label: "委托代理人移动电话",
    tag: "input",
  },
  {
    value: "keepEndDate",
    placeholder: "请输入",
    label: "指定或者委托的有效期限",
    tag: "datePick",
  },
  {
    value: "Delegated",
    placeholder: "请输入",
    label: "委托代理人身份证（正面反面）",
    tag: "upload",
  },
];
//公章刻制信息
const sealEngravingFormData=[

]
const created = () => {
  console.log("created");
};
console.log(122, 2222, 333, created());
</script>
<style lang="scss" scoped></style>
