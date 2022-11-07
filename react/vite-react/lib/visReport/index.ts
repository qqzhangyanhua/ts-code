//  可視化賣點

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
        this.config ={url:'',matchs:[]}

    }
    private handelAutoReport(ev:MouseEvent){
        console.log('this===',this.config)
        const { matchs} = this.config; //条件上报
    //   for(const match of matchs){
    //     const m =   (ev.target as HTMLElement).getAttribute(match);
    //     if(m){
    //         this.reportTo(m)
    //     }
    //   }
    // 全量上报
    const time = new Date().getTime();
    this.reportTo(JSON.stringify({target:(ev.target as HTMLElement).tagName}))

    }
    //自動上報
    initAuthReport(){
        document.body.addEventListener('click',this.handelAutoReport.bind(this),false);
    }
    //关闭上报
    dispose(){
        document.body.removeEventListener('click',this.handelAutoReport.bind(this),false);

    }

    init(options:any){
        
        this.config =options;
        console.log('options:',this.config);

        this.initAuthReport()
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
    reportTo(msg: any){
        const img = new Image();
        const { url} = this.config
        img.src = `${url}?msg=${msg }&timeStamp=${new Date().getTime()}`
    }
    track(params:any){
        this.reportTo(params)

    }
}
export default new NxReport()