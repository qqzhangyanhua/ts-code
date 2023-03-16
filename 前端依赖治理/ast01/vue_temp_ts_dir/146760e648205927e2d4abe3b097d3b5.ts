
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { app } from 'framework';
  
  const onrnpStorageKey = 'basicSettingsskp';
  
  @Component
  export default class Index extends Vue {
    private current = 0;
    private showskp = false;
  
    private get canEditSetting() {
      return this.$acl.data('food_setting_edit_setting');
    }
  
    private hideskp() {
      this.showskp = false;
      app.localStorage.set(onrnpStorageKey, false);
    }
  
    private handleClick(tab: string) {
      this.$router.push(`/portal/settings/basic/${tab}`);
    }
  
    private mounted() {
      const show = app.localStorage.get(onrnpStorageKey);
      const showskp = show === null ? true : show;
      setTimeout(() => {
        this.showskp = showskp;
      }, 1000);
    }
  
    private beforeDestroy() {
      const mm = app.localStorage.get(onrnpStorageKey);
    }
  }
  