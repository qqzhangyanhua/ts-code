

interface ReporterBase{
    domain:string;
    title:string;
    referer:string;
    sh: number;
    lang:string;
    ua:string;
    timeStamp:number;
    sw:number;

}
export class NxReport{
    private params: any;
    private config: any;
    constructor(){
      

    }
    initReports(options:any){
        this.config = Object.assign({},options,this.config); 
    }
    initParams(){
        const params:ReporterBase = {
            domain:document.domain||'',
            title:document.title||'',
            referer:document.referrer||'',
            sh: window.screen.height||0,
            ua: navigator.userAgent||'',
            lang: navigator.language||'',
            timeStamp: new Date().getTime(),
            sw:window.screen.width||0,
        }
        this.params = params;

    }
    reportTo(params: any){
        const img = new Image();
        const { url} = this.config
        img.src = `${url}?msg=${JSON.stringify(params)}`
    }
    report(params:any){
        const obj = Object.assign({},params,this.params )
        this.reportTo(obj)

    }
}
export default new NxReport()