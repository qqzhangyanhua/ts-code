var arr = [{
    A: [1, 2],
    B: [3, 4]
}, {
    C: [2, 3],
    D: [4, 5]
}]
const checkOverlaps=()=>{
    var psb_lines_arr = math.diff(this.ends_arr,0);
    this.psb_lines_arr = psb_lines_arr;
    var real_lines_arr = [];
    var real_lines_idx = [];
    for (var i = 0; i<psb_lines_arr._data.length;i++){
        if (this.cnx_arr._data[i]==1){
            real_lines_arr.push(psb_lines_arr._data[i]);
            real_lines_idx.push(i);
        }
    }
    
    real_lines_arr = math.matrix(real_lines_arr);
    var num_real_lines = real_lines_idx.length;
    console.log(real_lines_arr)
    return 
    var ref_json_index_old=-1;
    for (var i=0;i<num_real_lines-1;i++){
        var ref_line = math.row(real_lines_arr,i)._data[0];
        var ref_line_idx = real_lines_idx[i];
        var tgt_lines = math.subset(real_lines_arr,math.index(math.range(i+1,num_real_lines),[0,1]));
        var tgt_lines_idx = math.subset(real_lines_idx,math.index(math.range(i+1,num_real_lines)));
        var ratio_arr = math.subtract(math.multiply(math.column(tgt_lines,0),ref_line[1]),math.multiply(math.column(tgt_lines,1),ref_line[0]));
        var scale_ = math.add(math.abs(ref_line),this.EPS);
        var scale = scale_[0]*scale_[1];
        var ratio_arr = math.dotDivide(ratio_arr,scale);
        var mask = math.compare(math.abs([ratio_arr]),this.TOL); // 超出阈值的为1；否则为0或-1
        mask = math.add(mask,-1); //超出阈值的为0；否则为-1或-2
        mask = math.flatten(mask);
        var ref_point1 = this.ends_arr._data[ref_line_idx];
        var ref_point2 = this.ends_arr._data[ref_line_idx+1];
        var ref_json_index = this.ends_idx_in_lines._data[ref_line_idx];


        // 试一下这个位置
        if (ref_json_index!=ref_json_index_old){
            if (ref_json_index_old!=-1){
                if (line_info.geometry.paths.length!=0){
                    line_info.errorType="线重叠";
                    this.output_lines.features.push(line_info);
                    console.log([i,ref_json_index,ref_json_index_old]);
                }
                }
            ref_json_index_old = ref_json_index;
            var line_info = deepCopy(this.json_lines["features"][ref_json_index]);
            line_info.geometry.paths = [];
            }




        for (var j=0;j<tgt_lines._data.length;j++){
            if (mask[j]) {//非0即为true
                var psb_overlap_idx = tgt_lines_idx[j];
                var psb_point1 = this.ends_arr._data[psb_overlap_idx];
                var psb_point2 = this.ends_arr._data[psb_overlap_idx+1];
                var json_index = this.ends_idx_in_lines._data[psb_overlap_idx];

                //console.log([i,ref_json_index,ref_json_index_old]);
                if (math.abs(ref_line[0])>this.EPS){
                    var AB_NOTPAR_Y = true;
                    var flag1 = (ref_point1[0]<ref_point2[0]);
                    var flag2 = (psb_point1[0]<psb_point2[0]);
                }
                else{
                    var AB_NOTPAR_Y = false;
                    var flag1 = (ref_point1[1]<ref_point2[1]);
                    var flag2 = (psb_point1[1]<psb_point2[1]);
                }
                var A = math.add(math.multiply(ref_point1,flag1),math.multiply(ref_point2,1-flag1));
                var B = math.add(math.multiply(ref_point1,1-flag1),math.multiply(ref_point2,flag1));
                var C = math.add(math.multiply(psb_point1,flag2),math.multiply(psb_point2,1-flag2));
                var D = math.add(math.multiply(psb_point1,1-flag2),math.multiply(psb_point2,flag2));
                var AB = math.subtract(B,A);
                var AC = math.subtract(C,A);
                var outProd = AB[0]*AC[1]-AB[1]*AC[0];
                outProd=outProd/scale;

                var A_LEFT_TO_C = (A[0]<=C[0]);
                var mask1 = (math.abs(outProd)<this.TOL);
                var mask2 = ((B[0]>C[0])*AB_NOTPAR_Y + (B[1]>C[1])*(1-AB_NOTPAR_Y))*A_LEFT_TO_C+((D[0]>A[0])*AB_NOTPAR_Y + (D[1]>A[1])*(1-AB_NOTPAR_Y))*(1-A_LEFT_TO_C);
                if (mask1*mask2){
                    if (A_LEFT_TO_C){
                        var left = B;
                        var right = C;
                    }
                    else{
                        var left = D;
                        var right = A;
                    }
                    line_info.geometry.paths.push([left,right]);
                    this.overlap_ends_list.push(left);
                    this.overlap_ends_list.push(right);
                }
            }
        }
    }
return 
}