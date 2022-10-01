package com.abc.modules.sys.excel;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ColumnWidth;
import com.alibaba.excel.annotation.write.style.ContentRowHeight;
import com.alibaba.excel.annotation.write.style.HeadRowHeight;
import lombok.Data;

import java.util.Date;

/**
 * 白名单
 *
 * @author ayong ayong@gmail.com
 * @since 1.0.0 2022-08-23
 */
@Data
@ContentRowHeight(20)
@HeadRowHeight(20)
@ColumnWidth(25)
public class WhiteIpExcel {
    @ExcelProperty("ID")
    private Long id;
    @ExcelProperty("IP")
    private String ip;
    @ExcelProperty("状态  0：停用   1：正常")
    private Integer status;
    @ExcelProperty("备注")
    private String remark;
    @ExcelProperty("创建者")
    private Long creator;
    @ExcelProperty("创建时间")
    private Date createDate;
    @ExcelProperty("更新者")
    private Long updater;
    @ExcelProperty("更新时间")
    private Date updateDate;

}